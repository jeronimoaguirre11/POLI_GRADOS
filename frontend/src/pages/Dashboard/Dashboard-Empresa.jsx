import { useEffect, useState } from "react";
import {
  actualizarOferta,
  crearOferta,
  eliminarOferta,
  listarOfertas,
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

  useEffect(() => {
    setForm(datosIniciales(ofertaExistente));
    setImagen(null);
    setPreviewImagen(ofertaExistente ? urlImagen(ofertaExistente.imagenUrl) : null);
    setError(null);
  }, [ofertaExistente]);

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
      <h3>{editando ? "Editar convocatoria" : "Publicar nueva convocatoria"}</h3>

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

function ListaOfertas({ ofertas, onEditar, onEliminar }) {
  if (ofertas === null) {
    return <p className="dashboard-empresa-estado-vacio">Cargando convocatorias...</p>;
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
                <p className="oferta-card-publicada">Publicada el {publicada}</p>
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
                  <span className="oferta-card-meta-valor">{oferta.ubicacion}</span>
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
                  <span className="oferta-card-meta-label">Inicio práctica</span>
                  <span className="oferta-card-meta-valor">
                    {oferta.fechaInicioPractica?.slice(0, 10)}
                  </span>
                </div>
              </div>

              <div className="empresa-lista-ofertas-acciones">
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

export default function DashboardEmpresa() {
  const [perfil, setPerfil] = useState(null);
  const [ofertas, setOfertas] = useState(null);
  const [errorCarga, setErrorCarga] = useState(null);
  const [vista, setVista] = useState("ver");
  const [ofertaEnEdicion, setOfertaEnEdicion] = useState(null);

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
    cargarOfertas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function irAVerConvocatorias() {
    setOfertaEnEdicion(null);
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
        <h2>{perfil ? `Convocatorias de ${perfil.nombreEmpresa}` : "Convocatorias"}</h2>
        <p>Publica, edita y da seguimiento a tus convocatorias de práctica.</p>
      </div>

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

      {vista === "crear" ? (
        <FormularioOferta
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
          />
        </div>
      )}
    </section>
  );
}
