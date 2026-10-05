import { useCallback, useEffect, useMemo, useState } from "react";
import { obtenerPanelCoordinador } from "../api/coordinadores.js";
import { irAlLogin } from "../components/ProtectedRoute.jsx";
import "./DashboardCoordinador.css";

const AUTH_APP_URL =
  import.meta.env.VITE_AUTH_APP_URL || "http://localhost:5173";

const PROGRAMAS = {
  TECNOLOGIA_AGROPECUARIA: "Tecnología Agropecuaria",
  ADMINISTRACION_EMPRESAS_AGROPECUARIAS:
    "Administración de Empresas Agropecuarias",
  INGENIERO_AGROPECUARIO: "Ingeniería Agropecuaria",
};

const ESTADOS = [
  { value: "PENDIENTE", label: "Pendiente" },
  { value: "EN_REVISION", label: "En revisión" },
  { value: "PRESELECCIONADO", label: "Preseleccionado" },
  { value: "RECHAZADO", label: "Rechazado" },
  { value: "SELECCIONADO", label: "Seleccionado" },
];

function etiquetaPrograma(programa) {
  return PROGRAMAS[programa] || programa || "Sin programa";
}

function etiquetaEstado(estado) {
  return ESTADOS.find((item) => item.value === estado)?.label || estado;
}

function fechaLegible(fecha) {
  if (!fecha) return "Sin fecha";
  const valor = new Date(fecha);
  if (Number.isNaN(valor.getTime())) return "Sin fecha";
  return new Intl.DateTimeFormat("es-CO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(valor);
}

function textoBusqueda(valor) {
  return String(valor ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function normalizarPanel(datos) {
  const estudiantes = Array.isArray(datos?.estudiantes)
    ? datos.estudiantes.map((estudiante) => ({
        ...estudiante,
        nombre: estudiante.nombre || "Nombre no disponible",
        email: estudiante.email || "Correo no disponible",
        postulaciones: Array.isArray(estudiante.postulaciones)
          ? estudiante.postulaciones.map((postulacion) => ({
              ...postulacion,
              fecha: postulacion.fecha || postulacion.fechaPostulacion || null,
              oferta: postulacion.oferta || null,
            }))
          : [],
      }))
    : [];

  const resumenRecibido = datos?.resumen || {};
  const conPostulaciones = estudiantes.filter(
    (estudiante) => estudiante.postulaciones.length > 0,
  ).length;

  return {
    resumen: {
      totalEstudiantes: resumenRecibido.totalEstudiantes ?? estudiantes.length,
      conPostulaciones: resumenRecibido.conPostulaciones ?? conPostulaciones,
      sinPostulaciones:
        resumenRecibido.sinPostulaciones ??
        Math.max(0, estudiantes.length - conPostulaciones),
      conteosPorEstado: resumenRecibido.conteosPorEstado || {},
    },
    estudiantes,
  };
}

function EstadoBadge({ estado }) {
  return (
    <span className={`estado estado-${estado?.toLowerCase()}`}>
      {etiquetaEstado(estado)}
    </span>
  );
}

function Resumen({ resumen }) {
  return (
    <>
      <section className="summary-grid" aria-label="Resumen de estudiantes">
        <article className="summary-card summary-total">
          <span className="summary-icon" aria-hidden="true">
            ∑
          </span>
          <div>
            <span>Total de estudiantes</span>
            <strong>{resumen.totalEstudiantes}</strong>
          </div>
        </article>

        <article className="summary-card summary-active">
          <span className="summary-icon" aria-hidden="true">
            ✓
          </span>
          <div>
            <span>Con postulaciones</span>
            <strong>{resumen.conPostulaciones}</strong>
          </div>
        </article>

        <article className="summary-card summary-pending">
          <span className="summary-icon" aria-hidden="true">
            —
          </span>
          <div>
            <span>Sin postulaciones</span>
            <strong>{resumen.sinPostulaciones}</strong>
          </div>
        </article>
      </section>

      <section className="status-summary" aria-label="Postulaciones por estado">
        <div>
          <h2>Estado de las postulaciones</h2>
          <p>Distribución actual del proceso de selección.</p>
        </div>
        <div className="status-summary-list">
          {ESTADOS.map((estado) => (
            <span key={estado.value}>
              <i className={`status-dot dot-${estado.value.toLowerCase()}`} />
              {estado.label}
              <strong>{resumen.conteosPorEstado[estado.value] ?? 0}</strong>
            </span>
          ))}
        </div>
      </section>
    </>
  );
}

function Filtros({
  busqueda,
  setBusqueda,
  programa,
  setPrograma,
  estado,
  setEstado,
  programas,
  cantidad,
  total,
}) {
  const hayFiltros = busqueda || programa !== "TODOS" || estado !== "TODOS";

  function limpiar() {
    setBusqueda("");
    setPrograma("TODOS");
    setEstado("TODOS");
  }

  return (
    <section className="students-section">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Seguimiento académico</span>
          <h2>Estudiantes</h2>
          <p>
            Mostrando {cantidad} de {total} estudiantes registrados.
          </p>
        </div>
        {hayFiltros && (
          <button type="button" className="clear-button" onClick={limpiar}>
            Limpiar filtros
          </button>
        )}
      </div>

      <div className="filters">
        <label className="search-field">
          <span>Buscar estudiante</span>
          <div>
            <span aria-hidden="true">⌕</span>
            <input
              type="search"
              value={busqueda}
              onChange={(event) => setBusqueda(event.target.value)}
              placeholder="Nombre, correo o código"
            />
          </div>
        </label>

        <label>
          <span>Programa</span>
          <select
            value={programa}
            onChange={(event) => setPrograma(event.target.value)}
          >
            <option value="TODOS">Todos los programas</option>
            {programas.map((item) => (
              <option key={item} value={item}>
                {etiquetaPrograma(item)}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>Estado</span>
          <select
            value={estado}
            onChange={(event) => setEstado(event.target.value)}
          >
            <option value="TODOS">Todos los estados</option>
            <option value="SIN_POSTULACIONES">Sin postulaciones</option>
            {ESTADOS.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </section>
  );
}

function TablaEstudiantes({ estudiantes, seleccionadoId, onSeleccionar }) {
  return (
    <div className="students-table-wrap">
      <table className="students-table">
        <thead>
          <tr>
            <th>Estudiante</th>
            <th>Código</th>
            <th>Programa</th>
            <th>Semestre</th>
            <th>Postulaciones</th>
            <th>
              <span className="sr-only">Acciones</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {estudiantes.map((estudiante) => (
            <tr
              key={estudiante.id}
              className={seleccionadoId === estudiante.id ? "selected-row" : ""}
            >
              <td>
                <strong>{estudiante.nombre}</strong>
                <span>{estudiante.email}</span>
              </td>
              <td>{estudiante.codigo}</td>
              <td>{etiquetaPrograma(estudiante.programa)}</td>
              <td>{estudiante.semestre ?? "—"}</td>
              <td>
                <span className="application-count">
                  {estudiante.postulaciones.length}
                </span>
              </td>
              <td>
                <button
                  type="button"
                  className="detail-button"
                  onClick={() => onSeleccionar(estudiante.id)}
                  aria-expanded={seleccionadoId === estudiante.id}
                >
                  {seleccionadoId === estudiante.id ? "Ocultar" : "Ver detalle"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TarjetasEstudiantes({ estudiantes, seleccionadoId, onSeleccionar }) {
  return (
    <div className="student-cards">
      {estudiantes.map((estudiante) => (
        <article
          className={`student-card ${
            seleccionadoId === estudiante.id ? "student-card-selected" : ""
          }`}
          key={estudiante.id}
        >
          <div className="student-card-heading">
            <div>
              <h3>{estudiante.nombre}</h3>
              <p>{estudiante.email}</p>
            </div>
            <span className="application-count">
              {estudiante.postulaciones.length}
            </span>
          </div>
          <dl>
            <div>
              <dt>Código</dt>
              <dd>{estudiante.codigo}</dd>
            </div>
            <div>
              <dt>Programa</dt>
              <dd>{etiquetaPrograma(estudiante.programa)}</dd>
            </div>
            <div>
              <dt>Semestre</dt>
              <dd>{estudiante.semestre ?? "—"}</dd>
            </div>
          </dl>
          <button
            type="button"
            className="detail-button"
            onClick={() => onSeleccionar(estudiante.id)}
            aria-expanded={seleccionadoId === estudiante.id}
          >
            {seleccionadoId === estudiante.id
              ? "Ocultar seguimiento"
              : "Ver seguimiento"}
          </button>
        </article>
      ))}
    </div>
  );
}

function DetalleEstudiante({ estudiante, onCerrar }) {
  return (
    <section className="student-detail" aria-label="Detalle del estudiante">
      <div className="detail-heading">
        <div>
          <span className="eyebrow">Detalle de seguimiento</span>
          <h2>{estudiante.nombre}</h2>
          <p>
            {estudiante.codigo} · {etiquetaPrograma(estudiante.programa)}
          </p>
        </div>
        <button type="button" onClick={onCerrar} aria-label="Cerrar detalle">
          ×
        </button>
      </div>

      {estudiante.postulaciones.length === 0 ? (
        <div className="detail-empty">
          <span aria-hidden="true">○</span>
          <div>
            <h3>Sin postulaciones</h3>
            <p>
              Este estudiante todavía no ha iniciado un proceso con una empresa.
            </p>
          </div>
        </div>
      ) : (
        <div className="applications-list">
          {estudiante.postulaciones.map((postulacion) => (
            <article className="application-card" key={postulacion.id}>
              <div className="application-heading">
                <div>
                  <span>Oferta</span>
                  <h3>
                    {postulacion.oferta?.titulo || "Oferta no disponible"}
                  </h3>
                </div>
                <EstadoBadge estado={postulacion.estado} />
              </div>
              <dl>
                <div>
                  <dt>Empresa</dt>
                  <dd>
                    {postulacion.oferta?.empresa?.nombreEmpresa ||
                      "Empresa no disponible"}
                  </dd>
                </div>
                <div>
                  <dt>Sector</dt>
                  <dd>
                    {postulacion.oferta?.empresa?.sector || "Sin registrar"}
                  </dd>
                </div>
                <div>
                  <dt>Fecha de postulación</dt>
                  <dd>{fechaLegible(postulacion.fecha)}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

function LoadingState() {
  return (
    <main className="dashboard-main" aria-live="polite">
      <div className="skeleton skeleton-hero" />
      <div className="skeleton-grid">
        <div className="skeleton skeleton-card" />
        <div className="skeleton skeleton-card" />
        <div className="skeleton skeleton-card" />
      </div>
      <div className="skeleton skeleton-content" />
      <p className="loading-label">Cargando información académica…</p>
    </main>
  );
}

export default function DashboardCoordinador({ usuario }) {
  const [panel, setPanel] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [programa, setPrograma] = useState("TODOS");
  const [estado, setEstado] = useState("TODOS");
  const [seleccionadoId, setSeleccionadoId] = useState(null);

  const cargarPanel = useCallback(async () => {
    setCargando(true);
    setError("");
    try {
      const datos = await obtenerPanelCoordinador();
      setPanel(normalizarPanel(datos));
    } catch (err) {
      if (err.status === 401 || err.status === 403) {
        irAlLogin();
        return;
      }
      setError(
        err.message || "No fue posible cargar el panel de coordinación.",
      );
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    cargarPanel();
  }, [cargarPanel]);

  const programas = useMemo(
    () =>
      [...new Set((panel?.estudiantes || []).map((item) => item.programa))]
        .filter(Boolean)
        .sort((a, b) =>
          etiquetaPrograma(a).localeCompare(etiquetaPrograma(b), "es"),
        ),
    [panel],
  );

  const estudiantesFiltrados = useMemo(() => {
    const termino = textoBusqueda(busqueda);
    return (panel?.estudiantes || []).filter((estudiante) => {
      const coincideBusqueda =
        !termino ||
        [estudiante.nombre, estudiante.email, estudiante.codigo].some((valor) =>
          textoBusqueda(valor).includes(termino),
        );
      const coincidePrograma =
        programa === "TODOS" || estudiante.programa === programa;
      const coincideEstado =
        estado === "TODOS" ||
        (estado === "SIN_POSTULACIONES"
          ? estudiante.postulaciones.length === 0
          : estudiante.postulaciones.some(
              (postulacion) => postulacion.estado === estado,
            ));
      return coincideBusqueda && coincidePrograma && coincideEstado;
    });
  }, [busqueda, estado, panel, programa]);

  const estudianteSeleccionado = estudiantesFiltrados.find(
    (estudiante) => estudiante.id === seleccionadoId,
  );

  function alternarDetalle(id) {
    setSeleccionadoId((actual) => (actual === id ? null : id));
  }

  function cerrarSesion() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    window.location.href = AUTH_APP_URL;
  }

  return (
    <div className="coordinator-dashboard">
      <header className="dashboard-header">
        <div className="brand">
          <div className="brand-icon">TG</div>
          <div>
            <strong>TrabajoGrado</strong>
            <span>Panel de coordinación</span>
          </div>
        </div>

        <div className="account">
          <div>
            <strong>{usuario?.nombre || "Coordinación"}</strong>
            <span>COORDINADOR</span>
          </div>
          <button type="button" onClick={cerrarSesion}>
            Cerrar sesión
          </button>
        </div>
      </header>

      {cargando ? (
        <LoadingState />
      ) : error ? (
        <main className="dashboard-main">
          <section className="feedback-card error-card" role="alert">
            <span aria-hidden="true">!</span>
            <div>
              <h1>No pudimos cargar el panel</h1>
              <p>{error}</p>
              <button type="button" onClick={cargarPanel}>
                Intentar de nuevo
              </button>
            </div>
          </section>
        </main>
      ) : (
        <main className="dashboard-main">
          <section className="hero">
            <div>
              <span className="hero-label">Vista institucional</span>
              <h1>Seguimiento de estudiantes</h1>
              <p>
                Consulta el avance de las postulaciones y acompaña el proceso
                académico de los estudiantes desde un solo lugar.
              </p>
            </div>
            <div className="hero-mark" aria-hidden="true">
              <span>CO</span>
              <small>Coordinación</small>
            </div>
          </section>

          <Resumen resumen={panel.resumen} />

          <Filtros
            busqueda={busqueda}
            setBusqueda={setBusqueda}
            programa={programa}
            setPrograma={setPrograma}
            estado={estado}
            setEstado={setEstado}
            programas={programas}
            cantidad={estudiantesFiltrados.length}
            total={panel.estudiantes.length}
          />

          {panel.estudiantes.length === 0 ? (
            <section className="feedback-card empty-card">
              <span aria-hidden="true">◎</span>
              <div>
                <h2>Aún no hay estudiantes registrados</h2>
                <p>
                  Los estudiantes aparecerán aquí cuando existan perfiles
                  creados.
                </p>
              </div>
            </section>
          ) : estudiantesFiltrados.length === 0 ? (
            <section className="feedback-card empty-card">
              <span aria-hidden="true">⌕</span>
              <div>
                <h2>No encontramos resultados</h2>
                <p>Prueba con otro nombre, programa o estado.</p>
              </div>
            </section>
          ) : (
            <>
              <TablaEstudiantes
                estudiantes={estudiantesFiltrados}
                seleccionadoId={seleccionadoId}
                onSeleccionar={alternarDetalle}
              />
              <TarjetasEstudiantes
                estudiantes={estudiantesFiltrados}
                seleccionadoId={seleccionadoId}
                onSeleccionar={alternarDetalle}
              />
              {estudianteSeleccionado && (
                <DetalleEstudiante
                  estudiante={estudianteSeleccionado}
                  onCerrar={() => setSeleccionadoId(null)}
                />
              )}
            </>
          )}
        </main>
      )}
    </div>
  );
}
