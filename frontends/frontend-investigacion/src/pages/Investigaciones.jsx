import { useEffect, useState } from "react";
import {
  cancelarInvestigacion,
  misInvestigaciones,
  proponerInvestigacion,
} from "../api/investigacionApi.js";
import "./Investigaciones.css";
import "./Modalidad-Grados.css";

const ETIQUETAS_ESTADO = {
  PENDIENTE: "Pendiente de aprobación",
  APROBADA: "Aprobada",
  RECHAZADA: "Rechazada",
  CANCELADA: "Cancelada",
};

function formatearFecha(fechaISO) {
  return fechaISO?.slice(0, 10);
}

function FormularioPropuesta({ onProponer, enviando, error }) {
  const [form, setForm] = useState({
    nombre: "",
    duracionMeses: 6,
    metodologia: "",
    objetivos: "",
    sector: "",
    resumen: "",
  });

  function actualizar(campo, valor) {
    setForm((prev) => ({ ...prev, [campo]: valor }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onProponer(form);
  }

  return (
    <form className="propuesta-form" onSubmit={handleSubmit}>
      <label>
        <span>Nombre de la investigación</span>
        <input
          type="text"
          required
          value={form.nombre}
          onChange={(e) => actualizar("nombre", e.target.value)}
        />
      </label>

      <label>
        <span>Duración (meses)</span>
        <input
          type="number"
          min="1"
          required
          value={form.duracionMeses}
          onChange={(e) => actualizar("duracionMeses", Number(e.target.value))}
        />
      </label>

      <label>
        <span>Sector al que va dirigido</span>
        <input
          type="text"
          required
          value={form.sector}
          onChange={(e) => actualizar("sector", e.target.value)}
        />
      </label>

      <label>
        <span>Metodología</span>
        <textarea
          required
          value={form.metodologia}
          onChange={(e) => actualizar("metodologia", e.target.value)}
        />
      </label>

      <label>
        <span>Objetivos</span>
        <textarea
          required
          value={form.objetivos}
          onChange={(e) => actualizar("objetivos", e.target.value)}
        />
      </label>

      <label>
        <span>Resumen</span>
        <textarea
          required
          value={form.resumen}
          onChange={(e) => actualizar("resumen", e.target.value)}
        />
      </label>

      {error && <p className="convocatoria-error">{error}</p>}

      <button
        type="submit"
        className="convocatoria-card-boton"
        disabled={enviando}
      >
        {enviando ? "Enviando..." : "Enviar propuesta"}
      </button>
    </form>
  );
}

function TarjetaInvestigacion({ investigacion, onCancelar, cancelando }) {
  const [expandido, setExpandido] = useState(false);

  return (
    <li className="postulacion-card postulacion-card-investigacion">
      <div>
        <h4>{investigacion.nombre}</h4>
        <p className="convocatoria-card-descripcion">
          {investigacion.sector} · {investigacion.duracionMeses} meses
        </p>
        <p className="convocatoria-card-descripcion">
          Propuesta el {formatearFecha(investigacion.createdAt)}
        </p>

        <button
          type="button"
          className="ver-detalles-toggle"
          onClick={() => setExpandido((prev) => !prev)}
        >
          {expandido ? "Ocultar detalles ▲" : "Ver detalles ▼"}
        </button>

        {expandido && (
          <div className="investigacion-detalles">
            <div>
              <span className="convocatoria-card-meta-label">Metodología</span>
              <p>{investigacion.metodologia}</p>
            </div>
            <div>
              <span className="convocatoria-card-meta-label">Objetivos</span>
              <p>{investigacion.objetivos}</p>
            </div>
            <div>
              <span className="convocatoria-card-meta-label">Resumen</span>
              <p>{investigacion.resumen}</p>
            </div>
          </div>
        )}
      </div>

      <div className="postulacion-card-acciones">
        <span
          className={`postulacion-estado postulacion-estado-${investigacion.estado.toLowerCase()}`}
        >
          {ETIQUETAS_ESTADO[investigacion.estado] ?? investigacion.estado}
        </span>

        {investigacion.estado === "PENDIENTE" && (
          <button
            type="button"
            className="postulacion-quitar"
            disabled={cancelando}
            onClick={() => onCancelar(investigacion.id)}
          >
            {cancelando ? "Cancelando..." : "Cancelar propuesta"}
          </button>
        )}
      </div>
    </li>
  );
}

function Informacion() {
  return (
    <div className="modalidad-page">
      <div className="modalidad-hero">
        <div>
          <span className="modalidad-label">Modalidad de grado</span>
          <h1>Trabajo de Investigación</h1>
          <p>
            Desarrolla tu trabajo de grado mediante una propuesta de
            investigación vinculada a un grupo de investigación.
          </p>
        </div>
        <div className="modalidad-number">01</div>
      </div>

      <div className="modalidad-grid">
        <article className="modalidad-card">
          <div className="modalidad-card-heading">
            <span className="modalidad-card-icon">✓</span>
            <div>
              <span className="modalidad-card-small">Antes de comenzar</span>
              <h2>Requisitos</h2>
            </div>
          </div>

          <ul className="modalidad-list">
            <li>Tener matriculada la asignatura Trabajo de Grado.</li>
            <li>Pertenecer previamente a un grupo de investigación.</li>
            <li>Tener definida una idea o propuesta de investigación.</li>
            <li>
              Contar con disponibilidad para desarrollar el proyecto durante el
              semestre académico.
            </li>
          </ul>
        </article>

        <article className="modalidad-card modalidad-summary">
          <span className="modalidad-card-small">Estado de la modalidad</span>
          <h2>¿Qué debes hacer?</h2>
          <p>
            Completa el formulario en la pestaña "Proponer" con la información
            de tu investigación. El coordinador revisará y aprobará o rechazará
            tu propuesta.
          </p>
        </article>
      </div>

      <section className="proceso-section">
        <div className="proceso-heading">
          <span>Ruta académica</span>
          <h2>Proceso durante el semestre</h2>
          <p>Estas son las etapas generales que debe seguir el estudiante.</p>
        </div>

        <div className="proceso-timeline">
          <article className="proceso-step">
            <span className="proceso-number">1</span>
            <div>
              <h3>Verificar requisitos</h3>
              <p>Confirma que haces parte de un grupo de investigación.</p>
            </div>
          </article>
          <article className="proceso-step">
            <span className="proceso-number">2</span>
            <div>
              <h3>Definir la propuesta</h3>
              <p>Establece la idea o temática a desarrollar.</p>
            </div>
          </article>
          <article className="proceso-step">
            <span className="proceso-number">3</span>
            <div>
              <h3>Presentar la propuesta</h3>
              <p>Envíala desde la pestaña "Proponer" para su revisión.</p>
            </div>
          </article>
          <article className="proceso-step">
            <span className="proceso-number">4</span>
            <div>
              <h3>Realizar seguimiento</h3>
              <p>
                Una vez aprobada, desarrolla el proyecto durante el semestre.
              </p>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}

export default function Investigaciones({ onVolver }) {
  const [vista, setVista] = useState("proponer");
  const [investigaciones, setInvestigaciones] = useState(null);
  const [error, setError] = useState(null);
  const [enviando, setEnviando] = useState(false);
  const [cancelandoId, setCancelandoId] = useState(null);

  async function cargar() {
    try {
      setInvestigaciones(await misInvestigaciones());
    } catch {
      setInvestigaciones([]);
    }
  }

  useEffect(() => {
    cargar();
  }, []);

  const tieneActiva = (investigaciones ?? []).some(
    (i) => i.estado === "PENDIENTE" || i.estado === "APROBADA",
  );

  async function handleProponer(datos) {
    setError(null);
    setEnviando(true);
    try {
      await proponerInvestigacion(datos);
      await cargar();
      setVista("mias");
    } catch (err) {
      setError(err.message || "No se pudo enviar la propuesta.");
    } finally {
      setEnviando(false);
    }
  }

  async function handleCancelar(id) {
    const confirmado = window.confirm("¿Cancelar esta propuesta?");
    if (!confirmado) return;

    setCancelandoId(id);
    try {
      await cancelarInvestigacion(id);
      await cargar();
    } catch (err) {
      setError(err.message || "No se pudo cancelar la propuesta.");
    } finally {
      setCancelandoId(null);
    }
  }

  return (
    <section className="convocatorias-disponibles">
      <div className="convocatorias-disponibles-header">
        <button type="button" className="volver" onClick={onVolver}>
          ← Volver
        </button>
        <h2>Trabajo de Investigación</h2>
      </div>

      <div className="convocatorias-disponibles-tabs">
        <button
          type="button"
          className={vista === "proponer" ? "activo" : ""}
          onClick={() => setVista("proponer")}
        >
          Proponer
        </button>
        <button
          type="button"
          className={vista === "mias" ? "activo" : ""}
          onClick={() => setVista("mias")}
        >
          Mis investigaciones
        </button>
        <button
          type="button"
          className={vista === "info" ? "activo" : ""}
          onClick={() => setVista("info")}
        >
          Información
        </button>
      </div>

      {error && vista !== "proponer" && (
        <p className="convocatoria-error">{error}</p>
      )}

      {vista === "proponer" ? (
        tieneActiva ? (
          <p className="convocatoria-estado-vacio">
            Ya tienes una propuesta pendiente o aprobada. Revisa su estado en
            "Mis investigaciones".
          </p>
        ) : (
          <FormularioPropuesta
            onProponer={handleProponer}
            enviando={enviando}
            error={error}
          />
        )
      ) : vista === "mias" ? (
        investigaciones === null ? (
          <p className="convocatoria-estado-vacio">Cargando...</p>
        ) : investigaciones.length === 0 ? (
          <p className="convocatoria-estado-vacio">
            Todavía no has propuesto ninguna investigación.
          </p>
        ) : (
          <ul className="convocatoria-lista">
            {investigaciones.map((inv) => (
              <TarjetaInvestigacion
                key={inv.id}
                investigacion={inv}
                onCancelar={handleCancelar}
                cancelando={cancelandoId === inv.id}
              />
            ))}
          </ul>
        )
      ) : (
        <Informacion />
      )}
    </section>
  );
}
