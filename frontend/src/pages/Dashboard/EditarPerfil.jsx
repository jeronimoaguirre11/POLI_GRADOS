import { useEffect, useState } from "react";
import { actualizarPerfil as actualizarPerfilAuth } from "../../api/auth.js";
import {
  actualizarPerfilEmpresa,
  obtenerPerfilEmpresa,
} from "../../api/empresas.js";
import {
  actualizarPerfilEstudiante,
  obtenerPerfilEstudiante,
} from "../../api/estudiantes.js";
import "./EditarPerfil.css";

const PROGRAMAS = [
  { value: "TECNOLOGIA_AGROPECUARIA", label: "Tecnología Agropecuaria" },
  {
    value: "ADMINISTRACION_EMPRESAS_AGROPECUARIAS",
    label: "Administración de Empresas Agropecuarias",
  },
  { value: "INGENIERO_AGROPECUARIO", label: "Ingeniero Agropecuario" },
];

export default function EditarPerfil({ usuario, onVolver, onActualizado }) {
  const esEmpresa = usuario?.rol === "EMPRESA";
  const esEstudiante = usuario?.rol === "ESTUDIANTE";

  const [form, setForm] = useState({
    nombre: usuario?.nombre ?? "",
    email: usuario?.email ?? "",
    passwordNueva: "",
    passwordNuevaConfirmar: "",
    passwordActual: "",
    nombreEmpresa: "",
    sector: "",
    programa: "",
    semestre: "",
  });
  const [cargandoPerfil, setCargandoPerfil] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");
  const [mensajeExito, setMensajeExito] = useState("");

  useEffect(() => {
    async function cargarPerfilRol() {
      try {
        if (esEmpresa) {
          const perfil = await obtenerPerfilEmpresa();
          setForm((f) => ({
            ...f,
            nombreEmpresa: perfil.nombreEmpresa ?? "",
            sector: perfil.sector ?? "",
          }));
        } else if (esEstudiante) {
          const perfil = await obtenerPerfilEstudiante();
          setForm((f) => ({
            ...f,
            programa: perfil.programa ?? "",
            semestre: perfil.semestre ?? "",
          }));
        }
      } catch (err) {
        setError(err.message || "No se pudo cargar tu perfil.");
      } finally {
        setCargandoPerfil(false);
      }
    }
    cargarPerfilRol();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setMensajeExito("");

    const emailCambio = form.email.trim() !== (usuario?.email ?? "");
    const quierePassword = form.passwordNueva.trim().length > 0;

    if (quierePassword && form.passwordNueva !== form.passwordNuevaConfirmar) {
      setError("La confirmación de la nueva contraseña no coincide.");
      return;
    }

    if ((emailCambio || quierePassword) && !form.passwordActual) {
      setError(
        "Debes escribir tu contraseña actual para cambiar el correo o la contraseña.",
      );
      return;
    }

    setGuardando(true);
    try {
      // 1. Datos comunes de la cuenta (nombre, correo, contraseña).
      const cambiosComunes = {};
      if (form.nombre.trim() !== (usuario?.nombre ?? "")) {
        cambiosComunes.nombre = form.nombre.trim();
      }
      if (emailCambio) {
        cambiosComunes.email = form.email.trim();
      }
      if (quierePassword) {
        cambiosComunes.password = form.passwordNueva;
      }
      if (Object.keys(cambiosComunes).length > 0) {
        cambiosComunes.passwordActual = form.passwordActual;
      }

      let usuarioActualizado = null;
      if (Object.keys(cambiosComunes).length > 0) {
        usuarioActualizado = await actualizarPerfilAuth(cambiosComunes);
      }

      // 2. Datos propios del rol.
      if (esEmpresa) {
        const cambiosEmpresa = {};
        if (form.nombreEmpresa.trim()) cambiosEmpresa.nombreEmpresa = form.nombreEmpresa.trim();
        if (form.sector.trim()) cambiosEmpresa.sector = form.sector.trim();
        if (Object.keys(cambiosEmpresa).length > 0) {
          await actualizarPerfilEmpresa(cambiosEmpresa);
        }
      } else if (esEstudiante) {
        const cambiosEstudiante = {};
        if (form.programa) cambiosEstudiante.programa = form.programa;
        if (form.semestre !== "") cambiosEstudiante.semestre = Number(form.semestre);
        if (Object.keys(cambiosEstudiante).length > 0) {
          await actualizarPerfilEstudiante(cambiosEstudiante);
        }
      }

      if (usuarioActualizado) {
        onActualizado?.(usuarioActualizado);
      }

      setForm((f) => ({
        ...f,
        passwordNueva: "",
        passwordNuevaConfirmar: "",
        passwordActual: "",
      }));
      setMensajeExito("Tus datos se actualizaron correctamente.");
    } catch (err) {
      setError(err.message || "No se pudo actualizar tu perfil.");
    } finally {
      setGuardando(false);
    }
  }

  return (
    <section className="editar-perfil">
      <div className="editar-perfil-header">
        <button type="button" className="volver" onClick={onVolver}>
          ← Volver
        </button>
        <h2>Editar mi perfil</h2>
      </div>

      {cargandoPerfil ? (
        <p className="editar-perfil-estado">Cargando tus datos...</p>
      ) : (
        <form className="perfil-form" onSubmit={handleSubmit}>
          {error && <p className="perfil-error">{error}</p>}
          {mensajeExito && <p className="perfil-exito">{mensajeExito}</p>}

          <h3>Datos de la cuenta</h3>

          <label>Nombre</label>
          <input type="text" name="nombre" value={form.nombre} onChange={handleChange} required />

          <label>Correo</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required />

          <div className="perfil-form-grid">
            <div>
              <label>Nueva contraseña (opcional)</label>
              <input
                type="password"
                name="passwordNueva"
                value={form.passwordNueva}
                onChange={handleChange}
                minLength={6}
                placeholder="Dejar en blanco para no cambiarla"
              />
            </div>
            <div>
              <label>Confirmar nueva contraseña</label>
              <input
                type="password"
                name="passwordNuevaConfirmar"
                value={form.passwordNuevaConfirmar}
                onChange={handleChange}
                minLength={6}
              />
            </div>
          </div>

          <label>Contraseña actual</label>
          <input
            type="password"
            name="passwordActual"
            value={form.passwordActual}
            onChange={handleChange}
            placeholder="Solo si cambias tu correo o contraseña"
          />

          {esEmpresa && (
            <>
              <h3>Datos de la empresa</h3>

              <label>Nombre de la empresa</label>
              <input
                type="text"
                name="nombreEmpresa"
                value={form.nombreEmpresa}
                onChange={handleChange}
                required
              />

              <label>Sector</label>
              <input
                type="text"
                name="sector"
                value={form.sector}
                onChange={handleChange}
                required
              />
            </>
          )}

          {esEstudiante && (
            <>
              <h3>Datos académicos</h3>

              <label>Programa</label>
              <select name="programa" value={form.programa} onChange={handleChange} required>
                <option value="" disabled>
                  Selecciona tu programa
                </option>
                {PROGRAMAS.map((programa) => (
                  <option key={programa.value} value={programa.value}>
                    {programa.label}
                  </option>
                ))}
              </select>

              <label>Semestre (opcional)</label>
              <input
                type="number"
                name="semestre"
                value={form.semestre}
                onChange={handleChange}
                min={1}
                max={12}
                placeholder="8"
              />
            </>
          )}

          <button type="submit" disabled={guardando}>
            {guardando ? "Guardando..." : "Guardar cambios"}
          </button>
        </form>
      )}
    </section>
  );
}
