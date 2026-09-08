import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div className="home">
      <nav className="navbar">
        <div className="logo">TrabajoGrado</div>
        <div className="nav-buttons">
          <Link to="/login" className="btn btn-outline">
            Iniciar sesión
          </Link>
          <Link to="/registro" className="btn btn-primary">
            Registrarse
          </Link>
        </div>
      </nav>

      <section className="hero">
        <h1>Gestiona tu Trabajo de Grado en un solo lugar</h1>
        <p>
          La plataforma que conecta a estudiantes, empresas y coordinación
          académica durante todo el proceso de grado.
        </p>
      </section>

      <section className="servicios">
        <h2>¿Eres estudiante? Elige tu camino</h2>
        <div className="cards">
          <div className="card">
            <h3>Trabajo de Investigación</h3>
            <p>
              Desarrolla tu proyecto dentro de un grupo de investigación
              registrado.
            </p>
          </div>
          <div className="card">
            <h3>Diplomado</h3>
            <p>Valida un curso o diplomado externo como tu opción de grado.</p>
          </div>
          <div className="card">
            <h3>Prácticas Profesionales</h3>
            <p>
              Aplica a ofertas de la universidad o reporta una práctica propia.
            </p>
          </div>
        </div>
      </section>

      <section className="empresas">
        <h2>¿Eres una empresa?</h2>
        <p>
          Publica tus vacantes, define el perfil que buscas, y conecta
          directamente con estudiantes en proceso de grado listos para el mundo
          laboral.
        </p>
        <br />
        <Link to="/registro" className="btn btn-primary">
          Publicar una oferta
        </Link>
      </section>

      <footer className="footer">
        <p>© 2026 TrabajoGrado — Proyecto académico</p>
      </footer>
    </div>
  );
}
