import { useEffect, useState } from "react";
import {
  actualizarPostulacion,
  actualizarOferta,
  crearOferta,
  descargarHojaVida,
  eliminarOferta,
  listarOfertas,
  listarPostulantesOferta,
  obtenerPerfilEmpresa,
} from "../../api/empresas.js";
import "./Dashboard-Empresa.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

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

const ESTADOS_POSTULACION = [
  { value: "PENDIENTE", label: "Pendiente" },
  { value: "EN_REVISION", label: "En revisión" },
  { value: "PRESELECCIONADO", label: "Preseleccionado" },
  { value: "RECHAZADO", label: "Rechazado" },
  { value: "SELECCIONADO", label: "Seleccionado" },
];

function etiquetaPrograma(programa) {
  return (
    PERFILES_BUSCADOS.find((item) => item.value === programa)?.label ?? programa
  );
}

function etiquetaEstado(estado) {
  return (
    ESTADOS_POSTULACION.find((item) => item.value === estado)?.label ?? estado
  );
}

function fechaLegible(fecha) {
  if (!fecha) return "Sin fecha";
  return new Intl.DateTimeFormat("es-CO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(fecha));
}

const FORM_INICIAL = {
  titulo: "",
  descripcion: "",
  perfilBuscado: PERFILES_BUSCADOS[0].value,
  modalidadContratacion: MODALIDADES_CONTRATACION[0].value,
  ubicacion: "",
  funciones: "",
  fechaInicioConvocatoria: "",
  fechaFinConvocatoria: "",
  fechaInicioPractica: "",
  duracionMeses: 4,
};

function urlImagen(imagenUrl) {
  return imagenUrl ? `${API_URL}${imagenUrl}` : null;
}

function datosIniciales(oferta) {
  if (!oferta) return FORM_INICIAL;
  return {
    titulo: oferta.titulo,
    descripcion: oferta.descripcion,
    perfilBuscado: oferta.perfilBuscado,
    modalidadContratacion: oferta.modalidadContratacion,
    ubicacion: oferta.ubicacion,
    funciones: oferta.funciones,
    fechaInicioConvocatoria: oferta.fechaInicioConvocatoria?.slice(0, 10) ?? "",
    fechaFinConvocatoria: oferta.fechaFinConvocatoria?.slice(0, 10) ?? "",
    fechaInicioPractica: oferta.fechaInicioPractica?.slice(0, 10) ?? "",
    duracionMeses: oferta.duracionMeses,
  };
}

function FormularioOferta({ ofertaExistente, onGuardada, onCancelar }) {
  const editando = Boolean(ofertaExistente);
  const [form, setForm] = useState(() => datosIniciales(ofertaExistente));
  const [imagen, setImagen] = useState(null);
  const [previewImagen, setPreviewImagen] = useState(
    editando ? urlImagen(ofertaExistente.imagenUrl) : null,
  );
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "duracionMeses" ? Number(value) : value,
    }));
  }

  function handleImagenChange(e) {
    const archivo = e.target.files?.[0] ?? null;
    setImagen(archivo);
    if (archivo) setPreviewImagen(URL.createObjectURL(archivo));
  }

  function quitarImagenNueva(e) {
    e.preventDefault();
    setImagen(null);
    setPreviewImagen(editando ? urlImagen(ofertaExistente.imagenUrl) : null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setCargando(true);
    try {
      if (editando) {
        await actualizarOferta(ofertaExistente.id, { ...form, imagen });
      } else {
        await crearOferta({ ...form, imagen });
        setForm(FORM_INICIAL);
        setImagen(null);
        setPreviewImagen(null);
      }
      onGuardada();
    } catch (err) {
      setError(err.message || "No se pudo guardar la convocatoria.");
    } finally {
      setCargando(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="empresa-form">
      <h3>
        {editando ? "Editar convocatoria" : "Publicar nueva convocatoria"}
      </h3>

      <label>
        Título de la convocatoria
        <input
          type="text"
          name="titulo"
          required
          value={form.titulo}
          onChange={handleChange}
          placeholder="Practicante agropecuario"
        />
      </label>

      <label>
        Perfil que requieren
        <select
          name="perfilBuscado"
          value={form.perfilBuscado}
          onChange={handleChange}
        >
          {PERFILES_BUSCADOS.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
      </label>

      <label>
        Descripción
        <textarea
          name="descripcion"
          required
          rows={3}
          value={form.descripcion}
          onChange={handleChange}
          placeholder="Información adicional sobre la convocatoria..."
        />
      </label>

      <label>
        Modalidad de contratación
        <select
          name="modalidadContratacion"
          value={form.modalidadContratacion}
          onChange={handleChange}
        >
          {MODALIDADES_CONTRATACION.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>
      </label>

      <label>
        Ubicación donde se realiza la práctica
        <input
          type="text"
          name="ubicacion"
          required
          value={form.ubicacion}
          onChange={handleChange}
          placeholder="Municipio, departamento..."
        />
      </label>

      <div className="empresa-form-fechas">
        <label>
          Inicio de la convocatoria
          <input
            type="date"
            name="fechaInicioConvocatoria"
            required
            value={form.fechaInicioConvocatoria}
            onChange={handleChange}
          />
        </label>

        <label>
          Fin de la convocatoria
          <input
            type="date"
            name="fechaFinConvocatoria"
            required
            min={form.fechaInicioConvocatoria || undefined}
            value={form.fechaFinConvocatoria}
            onChange={handleChange}
          />
        </label>
      </div>

      <div className="empresa-form-fechas">
        <label>
          Inicio de la práctica
          <input
            type="date"
            name="fechaInicioPractica"
            required
            value={form.fechaInicioPractica}
            onChange={handleChange}
          />
        </label>

        <label>
          Duración de la práctica (meses)
          <select
            name="duracionMeses"
            value={form.duracionMeses}
            onChange={handleChange}
          >
            <option value={4}>4 meses</option>
            <option value={5}>5 meses</option>
            <option value={6}>6 meses</option>
          </select>
        </label>
      </div>

      <label>
        Funciones a desarrollar
        <textarea
          name="funciones"
          required
          rows={3}
          value={form.funciones}
          onChange={handleChange}
          placeholder="Actividades y responsabilidades del practicante..."
        />
      </label>

      <label>
        Foto (logo de la empresa o de la convocatoria) — opcional
        <input
          type="file"
          accept="image/png, image/jpeg, image/webp"
          onChange={handleImagenChange}
        />
      </label>

      {previewImagen && (
        <div className="empresa-imagen-preview">
          <img src={previewImagen} alt="Vista previa" />
          {imagen && (
            <button type="button" onClick={quitarImagenNueva}>
              Deshacer nueva foto
            </button>
          )}
        </div>
      )}

      {error && <p className="empresa-error">{error}</p>}

      <div className="empresa-form-acciones">
        <button type="submit" disabled={cargando}>
          {cargando
            ? "Guardando..."
            : editando
              ? "Guardar cambios"
              : "Publicar convocatoria"}
        </button>
        {editando && (
          <button type="button" className="secundario" onClick={onCancelar}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

function ListaOfertas({ ofertas, onEditar, onEliminar, onVerPostulantes }) {
  if (ofertas === null) {
    return (
      <p className="dashboard-empresa-estado-vacio">
        Cargando convocatorias...
      </p>
    );
  }
  if (ofertas.length === 0) {
    return (
      <div className="dashboard-empresa-estado-vacio">
        <p>Todavía no has publicado ninguna convocatoria.</p>
      </div>
    );
  }

  return (
    <ul className="empresa-lista-ofertas">
      {ofertas.map((oferta) => {
        const perfil = PERFILES_BUSCADOS.find(
          (p) => p.value === oferta.perfilBuscado,
        );
        const modalidad = MODALIDADES_CONTRATACION.find(
          (m) => m.value === oferta.modalidadContratacion,
        );
        const imagenSrc = urlImagen(oferta.imagenUrl);
        const publicada = oferta.fechaPublicacion?.slice(0, 10);

        return (
          <li key={oferta.id} className="oferta-card">
            <div className="oferta-card-avatar">
              {imagenSrc ? (
                <img src={imagenSrc} alt={oferta.titulo} />
              ) : (
                <span aria-hidden="true">
                  {oferta.titulo?.charAt(0)?.toUpperCase() ?? "?"}
                </span>
              )}
            </div>

            <div className="oferta-card-body">
              <span
                className={`empresa-estado empresa-estado-${oferta.estado.toLowerCase()}`}
              >
                {oferta.estado}
              </span>

              <h4>{oferta.titulo}</h4>

              {publicada && (
                <p className="oferta-card-publicada">
                  Publicada el {publicada}
                </p>
              )}

              <div className="empresa-lista-ofertas-chips">
                <span className="chip chip-perfil">
                  {perfil?.label ?? oferta.perfilBuscado}
                </span>
                <span className="chip chip-modalidad">
                  {modalidad?.label ?? oferta.modalidadContratacion}
                </span>
              </div>

              {oferta.descripcion && (
                <p className="oferta-card-descripcion">{oferta.descripcion}</p>
              )}

              <div className="oferta-card-meta">
                <div>
                  <span className="oferta-card-meta-label">Ubicación</span>
                  <span className="oferta-card-meta-valor">
                    {oferta.ubicacion}
                  </span>
                </div>
                <div>
                  <span className="oferta-card-meta-label">Duración</span>
                  <span className="oferta-card-meta-valor">
                    {oferta.duracionMeses} meses
                  </span>
                </div>
                <div>
                  <span className="oferta-card-meta-label">Convocatoria</span>
                  <span className="oferta-card-meta-valor">
                    {oferta.fechaInicioConvocatoria?.slice(0, 10)} –{" "}
                    {oferta.fechaFinConvocatoria?.slice(0, 10)}
                  </span>
                </div>
                <div>
                  <span className="oferta-card-meta-label">
                    Inicio práctica
                  </span>
                  <span className="oferta-card-meta-valor">
                    {oferta.fechaInicioPractica?.slice(0, 10)}
                  </span>
                </div>
              </div>

              <div className="empresa-lista-ofertas-acciones">
                <button
                  type="button"
                  className="postulantes"
                  onClick={() => onVerPostulantes(oferta)}
                >
                  Postulantes ({oferta._count?.postulaciones ?? 0})
                </button>
                <button type="button" onClick={() => onEditar(oferta)}>
                  Editar
                </button>
                <button
                  type="button"
                  className="peligro"
                  onClick={() => onEliminar(oferta.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function TarjetaPostulante({ postulacion, onActualizada }) {
  const [estado, setEstado] = useState(postulacion.estado);
  const [observaciones, setObservaciones] = useState(
    postulacion.observacionesEmpresa ?? "",
  );
  const [guardando, setGuardando] = useState(false);
  const [descargando, setDescargando] = useState(false);
  const [mensaje, setMensaje] = useState(null);
  const estudiante = postulacion.estudiante;
  const usuario = estudiante.usuario;
  const hayCambios =
    estado !== postulacion.estado ||
    observaciones !== (postulacion.observacionesEmpresa ?? "");

  async function handleGuardar() {
    setGuardando(true);
    setMensaje(null);
    try {
      const actualizada = await actualizarPostulacion(postulacion.id, {
        estado,
        observacionesEmpresa: observaciones,
      });
      setEstado(actualizada.estado);
      setObservaciones(actualizada.observacionesEmpresa ?? "");
      onActualizada(actualizada);
      setMensaje({ tipo: "ok", texto: "Cambios guardados." });
    } catch (err) {
      setMensaje({
        tipo: "error",
        texto: err.message || "No se pudo actualizar la postulación.",
      });
    } finally {
      setGuardando(false);
    }
  }

  async function handleDescargar() {
    setDescargando(true);
    setMensaje(null);
    try {
      const { archivo, nombre } = await descargarHojaVida(postulacion.id);
      const enlace = document.createElement("a");
      const url = URL.createObjectURL(archivo);
      enlace.href = url;
      enlace.download = nombre;
      document.body.appendChild(enlace);
      enlace.click();
      enlace.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      setMensaje({
        tipo: "error",
        texto: err.message || "No se pudo descargar la hoja de vida.",
      });
    } finally {
      setDescargando(false);
    }
  }

  return (
    <article className="postulante-card">
      <div className="postulante-card-encabezado">
        <div className="postulante-avatar" aria-hidden="true">
          {usuario.nombre?.charAt(0)?.toUpperCase() ?? "?"}
        </div>
        <div>
          <h4>{usuario.nombre}</h4>
          <p>{etiquetaPrograma(estudiante.programa)}</p>
        </div>
        <span
          className={`postulante-estado postulante-estado-${estado.toLowerCase()}`}
        >
          {etiquetaEstado(estado)}
        </span>
      </div>

      <dl className="postulante-datos">
        <div>
          <dt>Código</dt>
          <dd>{estudiante.codigo}</dd>
        </div>
        <div>
          <dt>Semestre</dt>
          <dd>{estudiante.semestre ?? "No registrado"}</dd>
        </div>
        <div>
          <dt>Correo</dt>
          <dd>{usuario.email}</dd>
        </div>
        <div>
          <dt>Postulación</dt>
          <dd>{fechaLegible(postulacion.fecha)}</dd>
        </div>
      </dl>

      <div className="postulante-contacto">
        <a href={`mailto:${usuario.email}`}>Enviar correo</a>
        <button
          type="button"
          onClick={handleDescargar}
          disabled={descargando || !postulacion.tieneHojaVida}
        >
          {descargando ? "Descargando..." : "Descargar hoja de vida"}
        </button>
      </div>

      <div className="postulante-gestion">
        <label>
          Estado del proceso
          <select
            value={estado}
            onChange={(event) => setEstado(event.target.value)}
          >
            {ESTADOS_POSTULACION.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>

        <label>
          Observaciones internas
          <textarea
            value={observaciones}
            onChange={(event) => setObservaciones(event.target.value)}
            rows={4}
            maxLength={2000}
            placeholder="Notas privadas para el seguimiento de este candidato..."
          />
          <span className="postulante-contador">
            {observaciones.length}/2000
          </span>
        </label>

        <div className="postulante-guardar-fila">
          {mensaje && (
            <span
              className={`postulante-mensaje postulante-mensaje-${mensaje.tipo}`}
              role="status"
            >
              {mensaje.texto}
            </span>
          )}
          <button
            type="button"
            className="postulante-guardar"
            onClick={handleGuardar}
            disabled={guardando || !hayCambios}
          >
            {guardando ? "Guardando..." : "Guardar seguimiento"}
          </button>
        </div>
      </div>
    </article>
  );
}

function PanelPostulantes({ oferta, onVolver }) {
  const [postulaciones, setPostulaciones] = useState(null);
  const [error, setError] = useState(null);
  const [filtroEstado, setFiltroEstado] = useState("TODOS");
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    let activo = true;

    listarPostulantesOferta(oferta.id)
      .then((data) => {
        if (activo) setPostulaciones(data);
      })
      .catch((err) => {
        if (activo) {
          setPostulaciones([]);
          setError(err.message || "No se pudieron cargar los postulantes.");
        }
      });

    return () => {
      activo = false;
    };
  }, [oferta.id]);

  function handleActualizada(actualizada) {
    setPostulaciones((actuales) =>
      actuales.map((item) =>
        item.id === actualizada.id ? { ...item, ...actualizada } : item,
      ),
    );
  }

  const termino = busqueda.trim().toLocaleLowerCase("es");
  const postulacionesVisibles = (postulaciones ?? []).filter((postulacion) => {
    const coincideEstado =
      filtroEstado === "TODOS" || postulacion.estado === filtroEstado;
    const texto = [
      postulacion.estudiante.usuario.nombre,
      postulacion.estudiante.usuario.email,
      postulacion.estudiante.codigo,
      postulacion.estudiante.programa,
    ]
      .join(" ")
      .toLocaleLowerCase("es");
    return coincideEstado && (!termino || texto.includes(termino));
  });

  return (
    <section className="postulantes-panel">
      <div className="postulantes-panel-header">
        <button type="button" className="postulantes-volver" onClick={onVolver}>
          ← Volver a convocatorias
        </button>
        <div>
          <span>Gestión de candidatos</span>
          <h3>{oferta.titulo}</h3>
          <p>
            {postulaciones?.length ?? 0}{" "}
            {(postulaciones?.length ?? 0) === 1 ? "postulante" : "postulantes"}
          </p>
        </div>
      </div>

      {error && <p className="empresa-error">{error}</p>}

      {postulaciones === null ? (
        <p className="dashboard-empresa-estado-vacio">
          Cargando postulantes...
        </p>
      ) : postulaciones.length === 0 ? (
        <p className="dashboard-empresa-estado-vacio">
          Esta convocatoria todavía no tiene postulantes.
        </p>
      ) : (
        <>
          <div className="postulantes-filtros">
            <label>
              Buscar candidato
              <input
                type="search"
                value={busqueda}
                onChange={(event) => setBusqueda(event.target.value)}
                placeholder="Nombre, correo o código"
              />
            </label>
            <label>
              Filtrar por estado
              <select
                value={filtroEstado}
                onChange={(event) => setFiltroEstado(event.target.value)}
              >
                <option value="TODOS">Todos los estados</option>
                {ESTADOS_POSTULACION.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {postulacionesVisibles.length === 0 ? (
            <p className="dashboard-empresa-estado-vacio">
              No hay candidatos que coincidan con los filtros.
            </p>
          ) : (
            <div className="postulantes-lista">
              {postulacionesVisibles.map((postulacion) => (
                <TarjetaPostulante
                  key={postulacion.id}
                  postulacion={postulacion}
                  onActualizada={handleActualizada}
                />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default function DashboardEmpresa() {
  const [perfil, setPerfil] = useState(null);
  const [ofertas, setOfertas] = useState(null);
  const [errorCarga, setErrorCarga] = useState(null);
  const [vista, setVista] = useState("ver");
  const [ofertaEnEdicion, setOfertaEnEdicion] = useState(null);
  const [ofertaConPostulantes, setOfertaConPostulantes] = useState(null);

  async function cargarOfertas() {
    try {
      const data = await listarOfertas();
      setOfertas(data);
      setErrorCarga(null);
    } catch (err) {
      setOfertas([]);
      setErrorCarga(err.message || "No se pudieron cargar las convocatorias.");
    }
  }

  useEffect(() => {
    obtenerPerfilEmpresa()
      .then(setPerfil)
      .catch(() => setPerfil(null));

    listarOfertas()
      .then((data) => {
        setOfertas(data);
        setErrorCarga(null);
      })
      .catch((err) => {
        setOfertas([]);
        setErrorCarga(
          err.message || "No se pudieron cargar las convocatorias.",
        );
      });
  }, []);

  function irAVerConvocatorias() {
    setOfertaEnEdicion(null);
    setOfertaConPostulantes(null);
    setVista("ver");
    cargarOfertas();
  }

  function irAGenerarConvocatoria() {
    setOfertaEnEdicion(null);
    setVista("crear");
  }

  function handleEditar(oferta) {
    setOfertaEnEdicion(oferta);
    setVista("crear");
  }

  function handleVerPostulantes(oferta) {
    setOfertaConPostulantes(oferta);
    setVista("postulantes");
  }

  async function handleEliminar(id) {
    const confirmado = window.confirm(
      "¿Seguro que quieres eliminar esta convocatoria? Esta acción no se puede deshacer.",
    );
    if (!confirmado) return;

    try {
      await eliminarOferta(id);
      cargarOfertas();
    } catch (err) {
      window.alert(err.message || "No se pudo eliminar la convocatoria.");
    }
  }

  return (
    <section className="dashboard-empresa">
      <div className="dashboard-empresa-banner">
        <h2>
          {perfil
            ? `Convocatorias de ${perfil.nombreEmpresa}`
            : "Convocatorias"}
        </h2>
        <p>Publica, edita y da seguimiento a tus convocatorias de práctica.</p>
      </div>

      {vista !== "postulantes" && (
        <div className="dashboard-empresa-tabs">
          <button
            type="button"
            className={vista === "ver" ? "activo" : ""}
            onClick={irAVerConvocatorias}
          >
            Ver convocatorias
          </button>
          <button
            type="button"
            className={vista === "crear" ? "activo" : ""}
            onClick={irAGenerarConvocatoria}
          >
            Generar convocatoria
          </button>
        </div>
      )}

      {vista === "postulantes" && ofertaConPostulantes ? (
        <PanelPostulantes
          oferta={ofertaConPostulantes}
          onVolver={irAVerConvocatorias}
        />
      ) : vista === "crear" ? (
        <FormularioOferta
          key={ofertaEnEdicion?.id ?? "nueva-oferta"}
          ofertaExistente={ofertaEnEdicion}
          onGuardada={irAVerConvocatorias}
          onCancelar={irAVerConvocatorias}
        />
      ) : (
        <div className="dashboard-empresa-lista">
          {errorCarga && <p className="empresa-error">{errorCarga}</p>}
          <ListaOfertas
            ofertas={ofertas}
            onEditar={handleEditar}
            onEliminar={handleEliminar}
            onVerPostulantes={handleVerPostulantes}
          />
        </div>
      )}
    </section>
  );
}
