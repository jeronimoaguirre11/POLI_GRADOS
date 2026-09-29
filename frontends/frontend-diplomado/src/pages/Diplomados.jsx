import { useEffect, useState } from "react";
import {
  cancelarInscripcion,
  inscribirse,
  listarDiplomados,
  misInscripciones,
} from "../api/diplomadoApi.js";
import "./Diplomados.css";
import "./Modalidad-Grados.css";

function formatearFecha(fechaISO) {
  return fechaISO?.slice(0, 10);
}

function TarjetaDiplomado({ diplomado, yaInscrito, onInscribirse, cargando }) {
  const sinCupos = diplomado.cuposDisponibles === 0;

  return (
    <li className="convocatoria-card">
      <div className="convocatoria-card-avatar" aria-hidden="true">
        {diplomado.nombre.charAt(0).toUpperCase()}
      </div>

      <div className="convocatoria-card-body">
        <h4>{diplomado.nombre}</h4>

        <div className="convocatoria-card-chips">
          <span className="chip chip-perfil">
            {diplomado.duracionHoras} horas
          </span>
          <span className="chip chip-modalidad">
            Inicia {formatearFecha(diplomado.fechaInicio)}
          </span>
        </div>

        <p className="convocatoria-card-descripcion">{diplomado.descripcion}</p>

        <div className="convocatoria-card-meta convocatoria-card-meta-single">
          <div>
            <span className="convocatoria-card-meta-label">
              Cupos disponibles
            </span>
            <span className="convocatoria-card-meta-valor">
              {diplomado.cuposDisponibles} / {diplomado.cuposTotales}
            </span>
          </div>
        </div>

        <button
          type="button"
          className="convocatoria-card-boton"
          disabled={yaInscrito || sinCupos || cargando}
          onClick={() => onInscribirse(diplomado.id)}
        >
          {yaInscrito
            ? "Ya estás inscrito"
            : sinCupos
              ? "Sin cupos disponibles"
              : cargando
                ? "Inscribiendo..."
                : "Inscribirme"}
        </button>
      </div>
    </li>
  );
}

function ListaDisponibles({
  diplomados,
  idsInscritos,
  onInscribirse,
  inscribiendoId,
}) {
  if (diplomados === null) {
    return <p className="convocatoria-estado-vacio">Cargando diplomados...</p>;
  }
  if (diplomados.length === 0) {
    return (
      <p className="convocatoria-estado-vacio">
        No hay diplomados activos por ahora. Vuelve a revisar más tarde.
      </p>
    );
  }

  return (
    <ul className="convocatoria-lista">
      {diplomados.map((diplomado) => (
        <TarjetaDiplomado
          key={diplomado.id}
          diplomado={diplomado}
          yaInscrito={idsInscritos.has(diplomado.id)}
          cargando={inscribiendoId === diplomado.id}
          onInscribirse={onInscribirse}
        />
      ))}
    </ul>
  );
}

function ListaMisInscripciones({ inscripciones, onCancelar, cancelandoId }) {
  if (inscripciones === null) {
    return (
      <p className="convocatoria-estado-vacio">Cargando tus inscripciones...</p>
    );
  }
  if (inscripciones.length === 0) {
    return (
      <p className="convocatoria-estado-vacio">
        Todavía no te has inscrito a ningún diplomado.
      </p>
    );
  }

  return (
    <ul className="convocatoria-lista">
      {inscripciones.map((inscripcion) => (
        <li key={inscripcion.id} className="postulacion-card">
          <div>
            <h4>{inscripcion.diplomado.nombre}</h4>
            <p className="convocatoria-card-descripcion">
              Inscrito el {formatearFecha(inscripcion.fechaInscripcion)}
            </p>
          </div>

          <div className="postulacion-card-acciones">
            <button
              type="button"
              className="postulacion-quitar"
              disabled={cancelandoId === inscripcion.diplomadoId}
              onClick={() => onCancelar(inscripcion.diplomadoId)}
            >
              {cancelandoId === inscripcion.diplomadoId
                ? "Cancelando..."
                : "Cancelar inscripción"}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

function Informacion() {
  return (
    <div className="modalidad-page">
      <div className="modalidad-hero">
        <div>
          <span className="modalidad-label">Modalidad de grado</span>
          <h1>Diplomado</h1>
          <p>
            Realiza un diplomado, curso o estudio complementario como opción
            para cumplir con tu proceso de trabajo de grado.
          </p>
        </div>
        <div className="modalidad-number">02</div>
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
            <li>
              Buscar un diplomado, curso o estudio relacionado con tu formación
              académica.
            </li>
            <li>
              Verificar que el programa sea ofrecido por una institución
              reconocida.
            </li>
            <li>Reportar la información del diplomado al coordinador.</li>
            <li>
              Esperar la aprobación antes de continuar formalmente con esta
              modalidad.
            </li>
          </ul>
        </article>

        <article className="modalidad-card modalidad-summary">
          <span className="modalidad-card-small">Estado de la modalidad</span>
          <h2>¿Qué debes hacer?</h2>
          <p>
            Revisa el catálogo en la pestaña "Disponibles" e inscríbete al
            diplomado que corresponda a tu proceso de trabajo de grado.
          </p>
        </article>
      </div>

      <section className="proceso-section">
        <div className="proceso-heading">
          <span>Ruta académica</span>
          <h2>Proceso durante el semestre</h2>
          <p>
            Estas son las etapas generales para realizar un diplomado como
            opción de grado.
          </p>
        </div>

        <div className="proceso-timeline">
          <article className="proceso-step">
            <span className="proceso-number">1</span>
            <div>
              <h3>Buscar un diplomado</h3>
              <p>
                Identifica un programa relacionado con tu área de formación.
              </p>
            </div>
          </article>

          <article className="proceso-step">
            <span className="proceso-number">2</span>
            <div>
              <h3>Inscribirte</h3>
              <p>Reserva tu cupo desde la pestaña "Disponibles".</p>
            </div>
          </article>

          <article className="proceso-step">
            <span className="proceso-number">3</span>
            <div>
              <h3>Reportar al coordinador</h3>
              <p>
                Presenta la información para revisión del coordinador del
                proceso de grado.
              </p>
            </div>
          </article>

          <article className="proceso-step">
            <span className="proceso-number">4</span>
            <div>
              <h3>Realizar el diplomado</h3>
              <p>Continúa con el programa durante el semestre académico.</p>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}

export default function Diplomados({ onVolver }) {
  const [vista, setVista] = useState("disponibles");
  const [diplomados, setDiplomados] = useState(null);
  const [inscripciones, setInscripciones] = useState(null);
  const [error, setError] = useState(null);
  const [inscribiendoId, setInscribiendoId] = useState(null);
  const [cancelandoId, setCancelandoId] = useState(null);

  async function cargarInscripciones() {
    try {
      setInscripciones(await misInscripciones());
    } catch {
      setInscripciones([]);
    }
  }

  useEffect(() => {
    let activo = true;

    listarDiplomados()
      .then((data) => {
        if (activo) setDiplomados(data);
      })
      .catch((err) => {
        if (activo) {
          setDiplomados([]);
          setError(err.message || "No se pudieron cargar los diplomados.");
        }
      });

    misInscripciones()
      .then((data) => {
        if (activo) setInscripciones(data);
      })
      .catch(() => {
        if (activo) setInscripciones([]);
      });

    return () => {
      activo = false;
    };
  }, []);

  const idsInscritos = new Set((inscripciones ?? []).map((i) => i.diplomadoId));

  async function handleInscribirse(diplomadoId) {
    setError(null);
    setInscribiendoId(diplomadoId);
    try {
      await inscribirse(diplomadoId);
      await cargarInscripciones();
      const actualizados = await listarDiplomados();
      setDiplomados(actualizados);
    } catch (err) {
      setError(err.message || "No se pudo completar la inscripción.");
    } finally {
      setInscribiendoId(null);
    }
  }

  async function handleCancelar(diplomadoId) {
    const confirmado = window.confirm(
      "¿Cancelar esta inscripción? El cupo quedará disponible de nuevo.",
    );
    if (!confirmado) return;

    setError(null);
    setCancelandoId(diplomadoId);
    try {
      await cancelarInscripcion(diplomadoId);
      await cargarInscripciones();
      const actualizados = await listarDiplomados();
      setDiplomados(actualizados);
    } catch (err) {
      setError(err.message || "No se pudo cancelar la inscripción.");
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
        <h2>Diplomados</h2>
      </div>

      <div className="convocatorias-disponibles-tabs">
        <button
          type="button"
          className={vista === "disponibles" ? "activo" : ""}
          onClick={() => setVista("disponibles")}
        >
          Disponibles
        </button>
        <button
          type="button"
          className={vista === "mis" ? "activo" : ""}
          onClick={() => setVista("mis")}
        >
          Mis inscripciones
        </button>
        <button
          type="button"
          className={vista === "info" ? "activo" : ""}
          onClick={() => setVista("info")}
        >
          Información
        </button>
      </div>

      {error && <p className="convocatoria-error">{error}</p>}

      {vista === "disponibles" ? (
        <ListaDisponibles
          diplomados={diplomados}
          idsInscritos={idsInscritos}
          onInscribirse={handleInscribirse}
          inscribiendoId={inscribiendoId}
        />
      ) : vista === "mis" ? (
        <ListaMisInscripciones
          inscripciones={inscripciones}
          onCancelar={handleCancelar}
          cancelandoId={cancelandoId}
        />
      ) : (
        <Informacion />
      )}
    </section>
  );
}
