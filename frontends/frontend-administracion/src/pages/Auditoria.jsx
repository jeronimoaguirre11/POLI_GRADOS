import { useEffect, useState } from "react";
import { descargarAuditoriaCsv, obtenerEventos } from "../api/administracion.js";
import { ETIQUETAS_ROL } from "../roles.js";

const LIMITE = 25;
const FILTROS_VACIOS = {
  usuario: "",
  rol: "",
  accion: "",
  resultado: "",
  desde: "",
  hasta: "",
};

const formatoFecha = new Intl.DateTimeFormat("es-CO", {
  timeZone: "America/Bogota",
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

const ROLES_FILTRO = ["SUPERADMIN", "COORDINADOR", "DOCENTE", "ESTUDIANTE", "EMPRESA"];

// Historial de acciones de todos los usuarios (auditoria-service). Solo lo
// ve el super administrador.
export default function Auditoria({ onSesionInvalida }) {
  const [filtros, setFiltros] = useState(FILTROS_VACIOS);
  // Los campos de texto se aplican medio segundo despues de dejar de escribir.
  const [filtrosAplicados, setFiltrosAplicados] = useState(FILTROS_VACIOS);
  const [pagina, setPagina] = useState(1);
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [exportando, setExportando] = useState(false);
  const [recarga, setRecarga] = useState(0);

  useEffect(() => {
    const temporizador = setTimeout(() => {
      setFiltrosAplicados((actual) => {
        if (JSON.stringify(actual) === JSON.stringify(filtros)) return actual;
        setPagina(1);
        return filtros;
      });
    }, 450);
    return () => clearTimeout(temporizador);
  }, [filtros]);

  useEffect(() => {
    let cancelado = false;
    setCargando(true);
    setError("");
    obtenerEventos({ ...filtrosAplicados, pagina, limite: LIMITE })
      .then((respuesta) => !cancelado && setDatos(respuesta))
      .catch((err) => {
        if (cancelado) return;
        if (!onSesionInvalida(err)) {
          setError(err.message || "No fue posible cargar la auditoría.");
        }
      })
      .finally(() => !cancelado && setCargando(false));
    return () => {
      cancelado = true;
    };
  }, [filtrosAplicados, pagina, recarga, onSesionInvalida]);

  function cambiar(e) {
    setFiltros((actual) => ({ ...actual, [e.target.name]: e.target.value }));
  }

  async function exportar() {
    setExportando(true);
    setError("");
    try {
      const archivo = await descargarAuditoriaCsv(filtrosAplicados);
      const url = URL.createObjectURL(archivo);
      const enlace = document.createElement("a");
      enlace.href = url;
      enlace.download = `auditoria-poli-grados-${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(enlace);
      enlace.click();
      enlace.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      if (!onSesionInvalida(err)) {
        setError(err.message || "No fue posible exportar la auditoría.");
      }
    } finally {
      setExportando(false);
    }
  }

  const total = datos?.total ?? 0;
  const paginas = Math.max(1, Math.ceil(total / LIMITE));
  const hayFiltros = Object.values(filtros).some(Boolean);

  return (
    <section>
      <div className="auditoria-encabezado">
        <div>
          <h1>Auditoría</h1>
          <p>
            Quién hizo qué, cuándo y desde dónde: inicios de sesión y todas las
            acciones que modifican datos. Nunca se guardan contraseñas.
          </p>
        </div>
        <div className="botones-fila">
          <button type="button" className="boton-secundario" onClick={() => setRecarga((n) => n + 1)}>
            Actualizar
          </button>
          <button
            type="button"
            className="boton-secundario"
            onClick={exportar}
            disabled={exportando || total === 0}
          >
            {exportando ? "Exportando…" : "Exportar CSV"}
          </button>
        </div>
      </div>

      <section className="table-card">
        <div className="toolbar">
          <div className="search">
            <label htmlFor="filtro-usuario" className="sr-only">
              Usuario
            </label>
            <input
              id="filtro-usuario"
              name="usuario"
              type="search"
              placeholder="Buscar por correo del usuario"
              value={filtros.usuario}
              onChange={cambiar}
            />
          </div>
          <div className="search">
            <label htmlFor="filtro-accion" className="sr-only">
              Acción
            </label>
            <input
              id="filtro-accion"
              name="accion"
              type="search"
              placeholder="Buscar acción (p. ej. contraseña, crear, postular)"
              value={filtros.accion}
              onChange={cambiar}
            />
          </div>
          <label>
            <span>Rol</span>
            <select name="rol" value={filtros.rol} onChange={cambiar}>
              <option value="">Todos</option>
              {ROLES_FILTRO.map((rol) => (
                <option key={rol} value={rol}>
                  {ETIQUETAS_ROL[rol]}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>Resultado</span>
            <select name="resultado" value={filtros.resultado} onChange={cambiar}>
              <option value="">Todos</option>
              <option value="exito">Exitosos</option>
              <option value="error">Fallidos</option>
            </select>
          </label>
          <label>
            <span>Desde</span>
            <input type="date" name="desde" value={filtros.desde} onChange={cambiar} />
          </label>
          <label>
            <span>Hasta</span>
            <input type="date" name="hasta" value={filtros.hasta} onChange={cambiar} />
          </label>
          {hayFiltros && (
            <button type="button" className="link-button" onClick={() => setFiltros(FILTROS_VACIOS)}>
              Limpiar filtros
            </button>
          )}
        </div>

        <p className="result-count">
          {cargando ? "Cargando…" : `${total} ${total === 1 ? "evento" : "eventos"}`}
        </p>

        {error ? (
          <div className="state-card error" role="alert">
            <strong>No pudimos cargar la auditoría</strong>
            <p>{error}</p>
            <button type="button" onClick={() => setRecarga((n) => n + 1)}>
              Reintentar
            </button>
          </div>
        ) : !cargando && (datos?.eventos ?? []).length === 0 ? (
          <div className="empty">
            {hayFiltros
              ? "No hay eventos que coincidan con los filtros."
              : "Todavía no hay eventos registrados."}
          </div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Usuario</th>
                  <th>Acción</th>
                  <th>Resultado</th>
                  <th>IP</th>
                </tr>
              </thead>
              <tbody>
                {(datos?.eventos ?? []).map((evento) => (
                  <tr key={evento.id}>
                    <td className="fecha">{formatoFecha.format(new Date(evento.fecha))}</td>
                    <td className="evento-usuario">
                      <strong>{evento.email || "Sin sesión"}</strong>
                      {evento.rol && (
                        <span className={`badge rol-${evento.rol.toLowerCase()}`}>
                          {ETIQUETAS_ROL[evento.rol] ?? evento.rol}
                        </span>
                      )}
                    </td>
                    <td className="evento-accion">
                      <strong>{evento.accion}</strong>
                      <code>
                        {evento.metodo} {evento.ruta}
                      </code>
                      {evento.detalle && <div className="evento-detalle">{evento.detalle}</div>}
                    </td>
                    <td>
                      <span className={`estado ${evento.exito ? "on" : "off-error"}`}>
                        {evento.exito ? "Exitoso" : "Fallido"} · {evento.estado}
                      </span>
                    </td>
                    <td className="fecha">{evento.ip || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {total > LIMITE && (
          <div className="paginacion">
            <button type="button" disabled={pagina <= 1 || cargando} onClick={() => setPagina((p) => p - 1)}>
              Anterior
            </button>
            <span>
              Página {pagina} de {paginas}
            </span>
            <button type="button" disabled={pagina >= paginas || cargando} onClick={() => setPagina((p) => p + 1)}>
              Siguiente
            </button>
          </div>
        )}
      </section>
    </section>
  );
}
