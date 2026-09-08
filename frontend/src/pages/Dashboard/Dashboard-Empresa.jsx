import { useEffect, useState } from "react";
import { crearOferta, listarOfertas } from "../../api/empresas.js";
import "./Dashboard-Empresa.css";

function FormularioOferta({ onCreada }) {
  const [titulo, setTitulo] = useState("");
  const [perfilBuscado, setPerfilBuscado] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setCargando(true);
    try {
      await crearOferta({ titulo, perfilBuscado, descripcion });
      setTitulo("");
      setPerfilBuscado("");
      setDescripcion("");
      onCreada();
    } catch (err) {
      setError(err.message || "No se pudo publicar la oferta.");
    } finally {
      setCargando(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="empresa-form">
      <h3>Publicar nueva oferta</h3>

      <label>
        Título de la oferta
        <input
          type="text"
          required
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Practicante de desarrollo de software"
        />
      </label>

      <label>
        Perfil que buscan
        <textarea
          required
          rows={3}
          value={perfilBuscado}
          onChange={(e) => setPerfilBuscado(e.target.value)}
          placeholder="Estudiante de últimos semestres, conocimientos en..."
        />
      </label>

      <label>
        Descripción
        <textarea
          required
          rows={3}
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Funciones, horario, modalidad..."
        />
      </label>

      {error && <p className="empresa-error">{error}</p>}

      <button type="submit" disabled={cargando}>
        {cargando ? "Publicando..." : "Publicar oferta"}
      </button>
    </form>
  );
}

function ListaOfertas({ ofertas }) {
  if (ofertas === null) return <p>Cargando ofertas...</p>;
  if (ofertas.length === 0) {
    return <p>Todavía no has publicado ninguna oferta.</p>;
  }

  return (
    <ul className="empresa-lista-ofertas">
      {ofertas.map((oferta) => (
        <li key={oferta.id}>
          <div className="empresa-lista-ofertas-header">
            <strong>{oferta.titulo}</strong>
            <span
              className={`empresa-estado empresa-estado-${oferta.estado.toLowerCase()}`}
            >
              {oferta.estado}
            </span>
          </div>
          <p>{oferta.perfilBuscado}</p>
        </li>
      ))}
    </ul>
  );
}

export default function DashboardEmpresa() {
  const [ofertas, setOfertas] = useState(null);
  const [errorCarga, setErrorCarga] = useState(null);

  async function cargarOfertas() {
    try {
      const data = await listarOfertas();
      setOfertas(data);
      setErrorCarga(null);
    } catch (err) {
      setOfertas([]);
      setErrorCarga(err.message || "No se pudieron cargar las ofertas.");
    }
  }

  useEffect(() => {
    cargarOfertas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="dashboard-empresa">
      <h2>Publica y gestiona tus ofertas de práctica</h2>
      <div className="dashboard-empresa-grid">
        <FormularioOferta onCreada={cargarOfertas} />
        <div>
          <h3>Tus ofertas publicadas</h3>
          {errorCarga && <p className="empresa-error">{errorCarga}</p>}
          <ListaOfertas ofertas={ofertas} />
        </div>
      </div>
    </section>
  );
}
