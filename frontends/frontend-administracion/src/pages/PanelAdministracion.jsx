import { useCallback, useEffect, useMemo, useState } from "react";
import {
  cambiarEstadoUsuario,
  obtenerUsuarios,
} from "../api/administracion.js";
import { cerrarSesion as cerrarSesionApi } from "../api/sesion.js";
import { irAlLogin } from "../components/ProtectedRoute.jsx";
import FormularioCuenta from "../components/FormularioCuenta.jsx";
import CambiarContrasena from "../components/CambiarContrasena.jsx";
import { ETIQUETAS_ROL, PLURALES_ROL, ROLES } from "../roles.js";
import "./PanelAdministracion.css";

const AUTH_APP_URL =
  import.meta.env.VITE_AUTH_APP_URL || "http://localhost:5173";

const formatoFecha = new Intl.DateTimeFormat("es-CO", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

function normalizar(texto) {
  return (texto || "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

export default function PanelAdministracion({ usuario }) {
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [filtroRol, setFiltroRol] = useState("TODOS");
  const [filtroEstado, setFiltroEstado] = useState("TODOS");
  const [formularioAbierto, setFormularioAbierto] = useState(false);
  const [contrasenaAbierta, setContrasenaAbierta] = useState(false);
  const [aviso, setAviso] = useState("");
  // Confirmacion en linea: id de la fila que esta pidiendo confirmar.
  const [confirmandoId, setConfirmandoId] = useState(null);
  const [cambiandoId, setCambiandoId] = useState(null);
  const [errorFila, setErrorFila] = useState({ id: null, mensaje: "" });

  const manejarErrorSesion = useCallback((err) => {
    if (err.status === 401 || err.status === 403) {
      irAlLogin();
      return true;
    }
    return false;
  }, []);

  const cargar = useCallback(async () => {
    setError("");
    try {
      setDatos(await obtenerUsuarios());
    } catch (err) {
      if (!manejarErrorSesion(err)) {
        setError(err.message || "No fue posible cargar los usuarios.");
      }
    } finally {
      setCargando(false);
    }
  }, [manejarErrorSesion]);

  useEffect(() => {
    cargar();
  }, [cargar]);

  useEffect(() => {
    if (!aviso) return undefined;
    const temporizador = setTimeout(() => setAviso(""), 5000);
    return () => clearTimeout(temporizador);
  }, [aviso]);

  const usuariosFiltrados = useMemo(() => {
    const termino = normalizar(busqueda.trim());
    return (datos?.usuarios ?? []).filter((u) => {
      if (filtroRol !== "TODOS" && u.rol !== filtroRol) return false;
      if (filtroEstado === "ACTIVOS" && !u.activo) return false;
      if (filtroEstado === "INACTIVOS" && u.activo) return false;
      if (!termino) return true;
      return (
        normalizar(u.nombre).includes(termino) ||
        normalizar(u.email).includes(termino)
      );
    });
  }, [datos, busqueda, filtroRol, filtroEstado]);

  async function cerrarSesion() {
    await cerrarSesionApi();
    window.location.href = AUTH_APP_URL;
  }

  async function confirmarCambioEstado(fila) {
    setCambiandoId(fila.id);
    setErrorFila({ id: null, mensaje: "" });
    try {
      await cambiarEstadoUsuario(fila.id, !fila.activo);
      setAviso(
        `La cuenta de ${fila.nombre} quedó ${fila.activo ? "desactivada" : "activa"}.`,
      );
      setConfirmandoId(null);
      await cargar();
    } catch (err) {
      if (!manejarErrorSesion(err)) {
        setErrorFila({ id: fila.id, mensaje: err.message });
      }
    } finally {
      setCambiandoId(null);
    }
  }

  function alCrear(cuenta) {
    setFormularioAbierto(false);
    setAviso(
      `Se creó la cuenta de ${cuenta.nombre} (${ETIQUETAS_ROL[cuenta.rol] ?? cuenta.rol}).`,
    );
    cargar();
  }

  const resumen = datos?.resumen;
  const hayFiltros =
    busqueda.trim() || filtroRol !== "TODOS" || filtroEstado !== "TODOS";

  return (
    <div className="admin-panel">
      <header className="dashboard-header">
        <div className="brand">
          <div className="brand-icon">TG</div>
          <div>
            <strong>TrabajoGrado</strong>
            <span>Administración de la plataforma</span>
          </div>
        </div>

        <div className="account">
          <div>
            <strong>{usuario?.nombre || "Administración"}</strong>
            <span>SUPER ADMINISTRADOR</span>
          </div>
          <button
            type="button"
            className="ghost"
            onClick={() => setContrasenaAbierta(true)}
          >
            Cambiar contraseña
          </button>
          <button type="button" onClick={cerrarSesion}>
            Cerrar sesión
          </button>
        </div>
      </header>

      <main className="dashboard-main">
        <section className="hero">
          <div>
            <span className="hero-label">Super administrador</span>
            <h1>Cuentas de la plataforma</h1>
            <p>
              Crea las cuentas de coordinadores, docentes, estudiantes y
              empresas. Desactiva una cuenta para bloquear su acceso sin
              perder su información.
            </p>
          </div>
          <button
            type="button"
            className="hero-button"
            onClick={() => setFormularioAbierto(true)}
          >
            <span aria-hidden="true">+</span> Crear cuenta
          </button>
        </section>

        {aviso && (
          <div className="toast" role="status">
            {aviso}
            <button
              type="button"
              aria-label="Cerrar aviso"
              onClick={() => setAviso("")}
            >
              ×
            </button>
          </div>
        )}

        {cargando ? (
          <div className="state-card" aria-live="polite">
            <span className="loader" aria-hidden="true" />
            <p>Cargando cuentas…</p>
          </div>
        ) : error ? (
          <div className="state-card error" role="alert">
            <strong>No pudimos cargar las cuentas</strong>
            <p>{error}</p>
            <button type="button" onClick={cargar}>
              Reintentar
            </button>
          </div>
        ) : (
          <>
            <section className="stats" aria-label="Resumen de cuentas">
              <article className="stat principal">
                <span>Cuentas</span>
                <strong>{resumen.total}</strong>
                <small>
                  {resumen.activos} {resumen.activos === 1 ? "activa" : "activas"} ·{" "}
                  {resumen.inactivos}{" "}
                  {resumen.inactivos === 1 ? "inactiva" : "inactivas"}
                </small>
              </article>
              {ROLES.map((rol) => (
                <button
                  key={rol}
                  type="button"
                  className={`stat rol-${rol.toLowerCase()} ${filtroRol === rol ? "seleccionado" : ""}`}
                  onClick={() =>
                    setFiltroRol((actual) => (actual === rol ? "TODOS" : rol))
                  }
                  aria-pressed={filtroRol === rol}
                >
                  <span>{PLURALES_ROL[rol]}</span>
                  <strong>{resumen.porRol[rol] ?? 0}</strong>
                </button>
              ))}
            </section>

            <section className="table-card">
              <div className="toolbar">
                <div className="search">
                  <label htmlFor="busqueda" className="sr-only">
                    Buscar por nombre o correo
                  </label>
                  <input
                    id="busqueda"
                    type="search"
                    placeholder="Buscar por nombre o correo"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                  />
                </div>
                <label>
                  <span>Rol</span>
                  <select
                    value={filtroRol}
                    onChange={(e) => setFiltroRol(e.target.value)}
                  >
                    <option value="TODOS">Todos</option>
                    {ROLES.map((rol) => (
                      <option key={rol} value={rol}>
                        {ETIQUETAS_ROL[rol]}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  <span>Estado</span>
                  <select
                    value={filtroEstado}
                    onChange={(e) => setFiltroEstado(e.target.value)}
                  >
                    <option value="TODOS">Todos</option>
                    <option value="ACTIVOS">Activas</option>
                    <option value="INACTIVOS">Inactivas</option>
                  </select>
                </label>
                {hayFiltros && (
                  <button
                    type="button"
                    className="link-button"
                    onClick={() => {
                      setBusqueda("");
                      setFiltroRol("TODOS");
                      setFiltroEstado("TODOS");
                    }}
                  >
                    Limpiar filtros
                  </button>
                )}
              </div>

              <p className="result-count">
                {usuariosFiltrados.length} de {resumen.total} cuentas
              </p>

              {usuariosFiltrados.length === 0 ? (
                <div className="empty">
                  No hay cuentas que coincidan con los filtros.
                </div>
              ) : (
                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>Usuario</th>
                        <th>Rol</th>
                        <th>Estado</th>
                        <th>Creada</th>
                        <th className="acciones">Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {usuariosFiltrados.map((fila) => {
                        const esYo = fila.email === usuario?.email;
                        const confirmando = confirmandoId === fila.id;
                        return (
                          <tr key={fila.id} className={fila.activo ? "" : "inactiva"}>
                            <td>
                              <div className="user-cell">
                                <span className="avatar" aria-hidden="true">
                                  {(fila.nombre || "?").trim().charAt(0).toUpperCase()}
                                </span>
                                <div>
                                  <strong>
                                    {fila.nombre}
                                    {esYo && <em className="tag-yo">Tú</em>}
                                  </strong>
                                  <span>{fila.email}</span>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span className={`badge rol-${fila.rol.toLowerCase()}`}>
                                {ETIQUETAS_ROL[fila.rol] ?? fila.rol}
                              </span>
                            </td>
                            <td>
                              <span className={`estado ${fila.activo ? "on" : "off"}`}>
                                {fila.activo ? "Activa" : "Inactiva"}
                              </span>
                            </td>
                            <td className="fecha">
                              {fila.createdAt
                                ? formatoFecha.format(new Date(fila.createdAt))
                                : "—"}
                            </td>
                            <td className="acciones">
                              {esYo ? (
                                <span className="muted">Tu cuenta</span>
                              ) : confirmando ? (
                                <div className="confirmar">
                                  <span>
                                    ¿{fila.activo ? "Desactivar" : "Activar"}?
                                  </span>
                                  <button
                                    type="button"
                                    className={fila.activo ? "peligro" : "primario"}
                                    disabled={cambiandoId === fila.id}
                                    onClick={() => confirmarCambioEstado(fila)}
                                  >
                                    {cambiandoId === fila.id ? "…" : "Sí"}
                                  </button>
                                  <button
                                    type="button"
                                    disabled={cambiandoId === fila.id}
                                    onClick={() => {
                                      setConfirmandoId(null);
                                      setErrorFila({ id: null, mensaje: "" });
                                    }}
                                  >
                                    No
                                  </button>
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  className={fila.activo ? "accion-off" : "accion-on"}
                                  onClick={() => {
                                    setConfirmandoId(fila.id);
                                    setErrorFila({ id: null, mensaje: "" });
                                  }}
                                >
                                  {fila.activo ? "Desactivar" : "Activar"}
                                </button>
                              )}
                              {errorFila.id === fila.id && (
                                <p className="error-fila" role="alert">
                                  {errorFila.mensaje}
                                </p>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </>
        )}
      </main>

      {formularioAbierto && (
        <FormularioCuenta
          onCerrar={() => setFormularioAbierto(false)}
          onCreada={alCrear}
          onSesionInvalida={manejarErrorSesion}
        />
      )}

      {contrasenaAbierta && (
        <CambiarContrasena
          onCerrar={() => setContrasenaAbierta(false)}
          onCambiada={() => {
            setContrasenaAbierta(false);
            setAviso("Tu contraseña se actualizó correctamente.");
          }}
        />
      )}
    </div>
  );
}
