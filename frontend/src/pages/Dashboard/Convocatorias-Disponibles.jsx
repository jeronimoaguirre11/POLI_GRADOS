import { useEffect, useState } from "react";
import {
  cancelarPostulacion,
  listarOfertasAbiertas,
  misPostulaciones,
  postularse,
} from "../../api/ofertas.js";
import "./Convocatorias-Disponibles.css";

const PERFILES_BUSCADOS = [
  { value: "TECNOLOGIA_AGROPECUARIA", label: "Tecnología Agropecuaria" },
  {
    value: "ADMINISTRACION_EMPRESAS_AGROPECUARIAS",
    label: "Administración de Empresas Agropecuarias",
  },
  { value: "INGENIERO_AGROPECUARIO", label: "Ingeniero Agropecuario" },
];

const MODALIDADES_CONTRATACION = [
  { value: "CONTRATO_SENA", label: "Contrato Sena" },
  { value: "CONVENIO", label: "Convenio" },
  { value: "VOLUNTARIA", label: "Voluntaria" },
];

function etiquetaPerfil(valor) {
  return PERFILES_BUSCADOS.find((p) => p.value === valor)?.label ?? valor;
}

function etiquetaModalidad(valor) {
  return MODALIDADES_CONTRATACION.find((m) => m.value === valor)?.label ?? valor;
}

function TarjetaConvocatoria({ oferta, yaPostulado, onPostularse, cargando }) {
  const [hojaVida, setHojaVida] = useState(null);

  function handleArchivo(e) {
    setHojaVida(e.target.files?.[0] ?? null);
  }

  return (
    <li className="convocatoria-card">
      <div className="convocatoria-card-avatar" aria-hidden="true">
        {oferta.empresa?.nombreEmpresa?.charAt(0)?.toUpperCase() ?? "?"}
      </div>

      <div className="convocatoria-card-body">
        <p className="convocatoria-card-empresa">{oferta.empresa?.nombreEmpresa}</p>
        <h4>{oferta.titulo}</h4>

        <div className="convocatoria-card-chips">
          <span className="chip chip-perfil">{etiquetaPerfil(oferta.perfilBuscado)}</span>
          <span className="chip chip-modalidad">
            {etiquetaModalidad(oferta.modalidadContratacion)}
          </span>
        </div>

        {oferta.descripcion && (
          <p className="convocatoria-card-descripcion">{oferta.descripcion}</p>
        )}

        <div className="convocatoria-card-meta">
          <div>
            <span className="convocatoria-card-meta-label">Ubicación</span>
            <span className="convocatoria-card-meta-valor">{oferta.ubicacion}</span>
          </div>
          <div>
            <span className="convocatoria-card-meta-label">Duración</span>
            <span className="convocatoria-card-meta-valor">
              {oferta.duracionMeses} meses
            </span>
          </div>
          <div>
            <span className="convocatoria-card-meta-label">Cierra</span>
            <span className="convocatoria-card-meta-valor">
              {oferta.fechaFinConvocatoria?.slice(0, 10)}
            </span>
          </div>
          <div>
            <span className="convocatoria-card-meta-label">Inicio práctica</span>
            <span className="convocatoria-card-meta-valor">
              {oferta.fechaInicioPractica?.slice(0, 10)}
            </span>
          </div>
        </div>

        {!yaPostulado && (
          <label className="convocatoria-card-hoja-vida">
            <span>Hoja de vida (PDF o Word)</span>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleArchivo}
            />
            {hojaVida && (
              <span className="convocatoria-card-hoja-vida-nombre">{hojaVida.name}</span>
            )}
          </label>
        )}

        <button
          type="button"
          className="convocatoria-card-boton"
          disabled={yaPostulado || cargando || !hojaVida}
          onClick={() => onPostularse(oferta.id, hojaVida)}
        >
          {yaPostulado
            ? "Ya te postulaste"
            : cargando
              ? "Enviando..."
              : "Postularme"}
        </button>
      </div>
    </li>
  );
}

function ListaDisponibles({ ofertas, idsPostulados, onPostularse, postulandoId }) {
  if (ofertas === null) {
    return <p className="convocatoria-estado-vacio">Cargando convocatorias...</p>;
  }
  if (ofertas.length === 0) {
    return (
      <p className="convocatoria-estado-vacio">
        No hay convocatorias abiertas por ahora. Vuelve a revisar más tarde.
      </p>
    );
  }

  return (
    <ul className="convocatoria-lista">
      {ofertas.map((oferta) => (
        <TarjetaConvocatoria
          key={oferta.id}
          oferta={oferta}
          yaPostulado={idsPostulados.has(oferta.id)}
          cargando={postulandoId === oferta.id}
          onPostularse={onPostularse}
        />
      ))}
    </ul>
  );
}

function ListaMisPostulaciones({ postulaciones, onCancelar, cancelandoId }) {
  if (postulaciones === null) {
    return <p className="convocatoria-estado-vacio">Cargando tus postulaciones...</p>;
  }
  if (postulaciones.length === 0) {
    return (
      <p className="convocatoria-estado-vacio">
        Todavía no te has postulado a ninguna convocatoria.
      </p>
    );
  }

  return (
    <ul className="convocatoria-lista">
      {postulaciones.map((postulacion) => (
        <li key={postulacion.id} className="postulacion-card">
          <div>
            <p className="convocatoria-card-empresa">
              {postulacion.oferta?.empresa?.nombreEmpresa}
            </p>
            <h4>{postulacion.oferta?.titulo}</h4>
            <p className="convocatoria-card-descripcion">
              Postulado el {postulacion.fecha?.slice(0, 10)}
            </p>
          </div>

          <div className="postulacion-card-acciones">
            <span className={`postulacion-estado postulacion-estado-${postulacion.estado.toLowerCase()}`}>
              {postulacion.estado}
            </span>
            <button
              type="button"
              className="postulacion-quitar"
              disabled={cancelandoId === postulacion.id}
              onClick={() => onCancelar(postulacion.id)}
            >
              {cancelandoId === postulacion.id ? "Quitando..." : "Quitar postulación"}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function ConvocatoriasDisponibles({ onVolver }) {
  const [vista, setVista] = useState("disponibles");
  const [ofertas, setOfertas] = useState(null);
  const [postulaciones, setPostulaciones] = useState(null);
  const [error, setError] = useState(null);
  const [postulandoId, setPostulandoId] = useState(null);
  const [cancelandoId, setCancelandoId] = useState(null);

  async function cargarOfertas() {
    try {
      setOfertas(await listarOfertasAbiertas());
    } catch (err) {
      setOfertas([]);
      setError(err.message || "No se pudieron cargar las convocatorias.");
    }
  }

  async function cargarPostulaciones() {
    try {
      setPostulaciones(await misPostulaciones());
    } catch (err) {
      setPostulaciones([]);
    }
  }

  useEffect(() => {
    cargarOfertas();
    cargarPostulaciones();
  }, []);

  const idsPostulados = new Set((postulaciones ?? []).map((p) => p.ofertaId));

  async function handlePostularse(ofertaId, hojaVida) {
    setError(null);
    setPostulandoId(ofertaId);
    try {
      await postularse(ofertaId, hojaVida);
      await cargarPostulaciones();
    } catch (err) {
      setError(err.message || "No se pudo enviar la postulación.");
    } finally {
      setPostulandoId(null);
    }
  }

  async function handleCancelar(postulacionId) {
    const confirmado = window.confirm(
      "¿Quitar esta postulación? Podrás volver a postularte más tarde si la convocatoria sigue abierta.",
    );
    if (!confirmado) return;

    setError(null);
    setCancelandoId(postulacionId);
    try {
      await cancelarPostulacion(postulacionId);
      await cargarPostulaciones();
    } catch (err) {
      setError(err.message || "No se pudo quitar la postulación.");
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
        <h2>Convocatorias de práctica</h2>
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
          Mis postulaciones
        </button>
      </div>

      {error && <p className="convocatoria-error">{error}</p>}

      {vista === "disponibles" ? (
        <ListaDisponibles
          ofertas={ofertas}
          idsPostulados={idsPostulados}
          onPostularse={handlePostularse}
          postulandoId={postulandoId}
        />
      ) : (
        <ListaMisPostulaciones
          postulaciones={postulaciones}
          onCancelar={handleCancelar}
          cancelandoId={cancelandoId}
        />
      )}
    </section>
  );
}
