import { useEffect, useState } from "react";
import { actualizarPerfil as actualizarPerfilAuth } from "../../api/auth.js";
import {
  actualizarPerfilEmpresa,
  obtenerPerfilEmpresa,
} from "../../api/empresas.js";
import "./EditarPerfil.css";

// Misma regla que en el backend (RegisterDto/ActualizarPerfilDto): al menos
// una mayuscula y un numero.
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d).+$/;

// Valida la contraseña sola (largo + complejidad). Se usa tanto mientras
// la persona escribe como al enviar el formulario, para no duplicar reglas.
function validarPassword(password) {
  if (!password) return "";
  if (password.length < 8) return "Debe tener al menos 8 caracteres";
  if (password.length > 15) return "No puede tener más de 15 caracteres";
  if (!PASSWORD_REGEX.test(password)) {
    return "Debe incluir al menos una mayúscula y un número";
  }
  return "";
}

export default function EditarPerfil({ usuario, onVolver, onActualizado }) {
  const [form, setForm] = useState({
    nombre: usuario?.nombre ?? "",
    email: usuario?.email ?? "",
    passwordNueva: "",
    passwordNuevaConfirmar: "",
    passwordActual: "",
    nombreEmpresa: "",
    sector: "",
  });
  const [cargandoPerfil, setCargandoPerfil] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");
  const [mensajeExito, setMensajeExito] = useState("");
  const [passwordNuevaError, setPasswordNuevaError] = useState("");
  const [passwordConfirmarError, setPasswordConfirmarError] = useState("");

  useEffect(() => {
    async function cargarPerfilEmpresa() {
      try {
        const perfil = await obtenerPerfilEmpresa();
        setForm((f) => ({
          ...f,
          nombreEmpresa: perfil.nombreEmpresa ?? "",
          sector: perfil.sector ?? "",
        }));
      } catch (err) {
        setError(err.message || "No se pudo cargar tu perfil.");
      } finally {
        setCargandoPerfil(false);
      }
    }
    cargarPerfilEmpresa();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    const nuevoForm = { ...form, [name]: value };
    setForm(nuevoForm);

    // Validación en vivo: se muestra apenas la persona escribe, sin
    // esperar a que le dé click a "Guardar cambios".
    if (name === "passwordNueva") {
      setPasswordNuevaError(validarPassword(value));
      if (nuevoForm.passwordNuevaConfirmar) {
        setPasswordConfirmarError(
          value === nuevoForm.passwordNuevaConfirmar
            ? ""
            : "Las contraseñas no coinciden",
        );
      }
    }

    if (name === "passwordNuevaConfirmar") {
      setPasswordConfirmarError(
        value === nuevoForm.passwordNueva ? "" : "Las contraseñas no coinciden",
      );
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setMensajeExito("");

    const emailCambio = form.email.trim() !== (usuario?.email ?? "");
    const quierePassword = form.passwordNueva.trim().length > 0;

    if (quierePassword) {
      const errorPassword = validarPassword(form.passwordNueva);
      if (errorPassword) {
        setPasswordNuevaError(errorPassword);
        setError(errorPassword);
        return;
      }
    }

    if (quierePassword && form.passwordNueva !== form.passwordNuevaConfirmar) {
      setPasswordConfirmarError("Las contraseñas no coinciden");
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

      // 2. Datos propios de la empresa.
      const cambiosEmpresa = {};
      if (form.nombreEmpresa.trim())
        cambiosEmpresa.nombreEmpresa = form.nombreEmpresa.trim();
      if (form.sector.trim()) cambiosEmpresa.sector = form.sector.trim();
      if (Object.keys(cambiosEmpresa).length > 0) {
        await actualizarPerfilEmpresa(cambiosEmpresa);
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
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            required
            maxLength={50}
          />

          <label>Correo</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            maxLength={50}
          />

          <div className="perfil-form-grid">
            <div>
              <label>Nueva contraseña (opcional)</label>
              <input
                type="password"
                name="passwordNueva"
                value={form.passwordNueva}
                onChange={handleChange}
                minLength={8}
                maxLength={15}
                placeholder="8 a 15 caracteres, con mayúscula y número"
              />
              {passwordNuevaError && (
                <p className="field-error">{passwordNuevaError}</p>
              )}
            </div>
            <div>
              <label>Confirmar nueva contraseña</label>
              <input
                type="password"
                name="passwordNuevaConfirmar"
                value={form.passwordNuevaConfirmar}
                onChange={handleChange}
                minLength={8}
                maxLength={15}
              />
              {passwordConfirmarError && (
                <p className="field-error">{passwordConfirmarError}</p>
              )}
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

          <h3>Datos de la empresa</h3>

          <label>Nombre de la empresa</label>
          <input
            type="text"
            name="nombreEmpresa"
            value={form.nombreEmpresa}
            onChange={handleChange}
            required
            maxLength={150}
          />

          <label>Sector</label>
          <input
            type="text"
            name="sector"
            value={form.sector}
            onChange={handleChange}
            required
            maxLength={30}
          />

          <button type="submit" disabled={guardando}>
            {guardando ? "Guardando..." : "Guardar cambios"}
          </button>
        </form>
      )}
    </section>
  );
}
