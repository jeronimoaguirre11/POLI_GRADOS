import { useEffect, useState } from "react";
import {
  actualizarCuentaUsuario,
  actualizarPerfilUsuario,
  obtenerPerfilUsuario,
} from "../api/administracion.js";
import { ETIQUETAS_ROL, PROGRAMAS } from "../roles.js";
import Modal from "./Modal.jsx";

// Campos del perfil por rol. El coordinador no tiene perfil propio.
const CAMPOS_PERFIL = {
  ESTUDIANTE: ["codigo", "programa", "semestre"],
  DOCENTE: ["identificacion", "programa", "especialidad"],
  EMPRESA: ["nombreEmpresa", "nit", "sector"],
};

function aTexto(valor) {
  return valor === null || valor === undefined ? "" : String(valor);
}

// El super administrador corrige nombre, correo y los datos del perfil de
// una cuenta. Solo envia lo que cambio.
export default function EditarCuenta({ cuenta, onCerrar, onGuardada, onSesionInvalida }) {
  const rol = cuenta.rol;
  const camposPerfil = CAMPOS_PERFIL[rol] ?? [];

  const [cargando, setCargando] = useState(camposPerfil.length > 0);
  const [original, setOriginal] = useState(null);
  const [form, setForm] = useState({ nombre: cuenta.nombre, email: cuenta.email });
  const [error, setError] = useState("");
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    if (camposPerfil.length === 0) {
      setOriginal({ nombre: cuenta.nombre, email: cuenta.email });
      return;
    }
    let cancelado = false;
    obtenerPerfilUsuario(cuenta.id)
      .then(({ perfil }) => {
        if (cancelado) return;
        const datos = { nombre: cuenta.nombre, email: cuenta.email };
        for (const campo of camposPerfil) datos[campo] = aTexto(perfil?.[campo]);
        setOriginal(datos);
        setForm(datos);
      })
      .catch((err) => {
        if (cancelado) return;
        if (!(err.status === 401 && onSesionInvalida(err))) {
          setError(err.message || "No se pudo cargar el perfil.");
        }
      })
      .finally(() => !cancelado && setCargando(false));
    return () => {
      cancelado = true;
    };
    // Solo al abrir la ventana.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cuenta.id]);

  function cambiar(e) {
    setForm((actual) => ({ ...actual, [e.target.name]: e.target.value }));
  }

  async function guardar(e) {
    e.preventDefault();
    setError("");
    if (!original) return;

    const cambiosCuenta = {};
    if (form.nombre.trim() !== original.nombre) cambiosCuenta.nombre = form.nombre.trim();
    if (form.email.trim() !== original.email) cambiosCuenta.email = form.email.trim();

    const cambiosPerfil = {};
    for (const campo of camposPerfil) {
      const valor = aTexto(form[campo]).trim();
      if (valor === aTexto(original[campo]).trim()) continue;
      if (campo === "semestre") {
        if (valor) cambiosPerfil.semestre = Number(valor);
      } else {
        cambiosPerfil[campo] = valor;
      }
    }

    if (!Object.keys(cambiosCuenta).length && !Object.keys(cambiosPerfil).length) {
      onCerrar();
      return;
    }

    setGuardando(true);
    try {
      if (Object.keys(cambiosCuenta).length) {
        await actualizarCuentaUsuario(cuenta.id, cambiosCuenta);
      }
      if (Object.keys(cambiosPerfil).length) {
        await actualizarPerfilUsuario(cuenta.id, cambiosPerfil);
      }
      onGuardada({ ...cuenta, ...cambiosCuenta });
    } catch (err) {
      if (!(err.status === 401 && onSesionInvalida(err))) {
        setError(err.message || "No fue posible guardar los cambios.");
      }
      setGuardando(false);
    }
  }

  return (
    <Modal
      titulo="Editar cuenta"
      descripcion={`${ETIQUETAS_ROL[rol] ?? rol} · los cambios se aplican de inmediato`}
      onCerrar={onCerrar}
    >
      {cargando ? (
        <div className="state-card" aria-live="polite">
          <span className="loader" aria-hidden="true" />
          <p>Cargando datos…</p>
        </div>
      ) : (
        <form className="form" onSubmit={guardar}>
          <div className="grid">
            <Campo label="Nombre completo" name="nombre">
              <input id="nombre" name="nombre" value={form.nombre} onChange={cambiar} required maxLength={50} />
            </Campo>
            <Campo label="Correo" name="email">
              <input id="email" name="email" type="email" value={form.email} onChange={cambiar} required maxLength={50} />
            </Campo>

            {rol === "ESTUDIANTE" && original && (
              <>
                <Campo label="Código" name="codigo">
                  <input id="codigo" name="codigo" value={form.codigo} onChange={cambiar} required maxLength={20} />
                </Campo>
                <Campo label="Semestre" name="semestre">
                  <input id="semestre" name="semestre" type="number" min={1} max={12} value={form.semestre} onChange={cambiar} />
                </Campo>
                <Campo label="Programa" name="programa" ancho>
                  <select id="programa" name="programa" value={form.programa} onChange={cambiar} required>
                    <option value="" disabled>
                      Selecciona el programa
                    </option>
                    {PROGRAMAS.map((p) => (
                      <option key={p.value} value={p.value}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                </Campo>
              </>
            )}

            {rol === "DOCENTE" && original && (
              <>
                <Campo label="Identificación" name="identificacion">
                  <input id="identificacion" name="identificacion" value={form.identificacion} onChange={cambiar} required maxLength={20} />
                </Campo>
                <Campo label="Programa" name="programa">
                  <input id="programa" name="programa" value={form.programa} onChange={cambiar} maxLength={100} />
                </Campo>
                <Campo label="Especialidad" name="especialidad" ancho>
                  <input id="especialidad" name="especialidad" value={form.especialidad} onChange={cambiar} maxLength={100} />
                </Campo>
              </>
            )}

            {rol === "EMPRESA" && original && (
              <>
                <Campo label="Nombre de la empresa" name="nombreEmpresa" ancho>
                  <input id="nombreEmpresa" name="nombreEmpresa" value={form.nombreEmpresa} onChange={cambiar} required maxLength={150} />
                </Campo>
                <Campo label="NIT" name="nit">
                  <input id="nit" name="nit" value={form.nit} onChange={cambiar} required maxLength={20} />
                </Campo>
                <Campo label="Sector" name="sector">
                  <input id="sector" name="sector" value={form.sector} onChange={cambiar} required maxLength={30} />
                </Campo>
              </>
            )}
          </div>

          {rol === "COORDINADOR" && (
            <p className="nota">Los coordinadores no tienen datos de perfil adicionales.</p>
          )}

          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}

          <div className="form-actions">
            <button type="button" onClick={onCerrar} disabled={guardando}>
              Cancelar
            </button>
            <button type="submit" className="primario" disabled={guardando || !original}>
              {guardando ? "Guardando…" : "Guardar cambios"}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}

function Campo({ label, name, ancho, children }) {
  return (
    <div className={`campo ${ancho ? "ancho" : ""}`}>
      <label htmlFor={name}>{label}</label>
      {children}
    </div>
  );
}
