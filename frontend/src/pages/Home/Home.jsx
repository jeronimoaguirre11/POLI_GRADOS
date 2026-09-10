/*import { Link } from "react-router-dom";
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
}*/

/*si el codigo siguiente funciona bien, eliminar todo el que esta comentado*/

import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div className="home">
      <nav className="navbar">
        <div className="home-container navbar-content">
          <Link to="/" className="home-brand">
            <div className="home-brand-icon">TG</div>

            <div className="home-brand-text">
              <span>TrabajoGrado</span>
              <small>Portal académico</small>
            </div>
          </Link>

          <div className="nav-buttons">
            <Link to="/login" className="btn btn-outline">
              Iniciar sesión
            </Link>

            <Link to="/registro" className="btn btn-primary">
              Registrarse
            </Link>
          </div>
        </div>
      </nav>

      <main>
        <section className="hero-home">
          <div className="home-container hero-grid">
            <div className="hero-content">
              <span className="hero-badge">
                Gestión académica de trabajo de grado
              </span>

              <h1>
                Tu proceso de grado,
                <span> más claro y organizado.</span>
              </h1>

              <p>
                Una plataforma que conecta estudiantes, empresas y coordinación
                académica para centralizar las diferentes modalidades de trabajo
                de grado.
              </p>

              <div className="hero-actions">
                <Link to="/registro" className="btn btn-primary btn-large">
                  Comenzar ahora
                </Link>

                <Link to="/login" className="btn btn-secondary btn-large">
                  Ya tengo una cuenta
                </Link>
              </div>

              <div className="hero-details">
                <div>
                  <strong>3</strong>
                  <span>Modalidades de grado</span>
                </div>

                <div>
                  <strong>1</strong>
                  <span>Plataforma centralizada</span>
                </div>

                <div>
                  <strong>100%</strong>
                  <span>Proceso académico</span>
                </div>
              </div>
            </div>

            <div className="hero-visual">
              <div className="visual-card main-visual-card">
                <div className="visual-card-header">
                  <span className="visual-dot"></span>
                  <span>Portal del estudiante</span>
                </div>

                <h3>Elige tu modalidad</h3>

                <div className="mini-option">
                  <span className="mini-number">01</span>

                  <div>
                    <strong>Investigación</strong>
                    <p>Desarrolla una propuesta académica.</p>
                  </div>
                </div>

                <div className="mini-option">
                  <span className="mini-number">02</span>

                  <div>
                    <strong>Diplomado</strong>
                    <p>Valida formación complementaria.</p>
                  </div>
                </div>

                <div className="mini-option active-option">
                  <span className="mini-number">03</span>

                  <div>
                    <strong>Prácticas Profesionales</strong>
                    <p>Explora oportunidades laborales.</p>
                  </div>
                </div>
              </div>

              <div className="floating-card floating-card-top">
                <span className="floating-icon">✓</span>

                <div>
                  <strong>Proceso organizado</strong>
                  <p>Consulta requisitos y pasos.</p>
                </div>
              </div>

              <div className="floating-card floating-card-bottom">
                <span className="floating-icon">↗</span>

                <div>
                  <strong>Conecta con empresas</strong>
                  <p>Encuentra oportunidades.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="modalidades-section">
          <div className="home-container">
            <div className="section-heading">
              <span className="section-label">Para estudiantes</span>

              <h2>Elige la modalidad que se adapte a tu proceso</h2>

              <p>
                Consulta los requisitos, pasos e información correspondiente a
                cada opción de trabajo de grado.
              </p>
            </div>

            <div className="home-cards">
              <article className="home-card">
                <div className="home-card-number">01</div>

                <span className="home-card-label">Investigación</span>

                <h3>Trabajo de Investigación</h3>

                <p>
                  Desarrolla tu proyecto dentro de un grupo de investigación y
                  realiza el seguimiento académico correspondiente.
                </p>

                <span className="home-card-footer">
                  Proyecto académico
                </span>
              </article>

              <article className="home-card">
                <div className="home-card-number">02</div>

                <span className="home-card-label">Formación</span>

                <h3>Diplomado</h3>

                <p>
                  Presenta un diplomado o curso como alternativa para cumplir
                  con tu modalidad de trabajo de grado.
                </p>

                <span className="home-card-footer">
                  Formación complementaria
                </span>
              </article>

              <article className="home-card">
                <div className="home-card-number">03</div>

                <span className="home-card-label">
                  Experiencia profesional
                </span>

                <h3>Prácticas Profesionales</h3>

                <p>
                  Consulta convocatorias de empresas o reporta una práctica
                  conseguida de manera independiente.
                </p>

                <span className="home-card-footer">
                  Experiencia laboral
                </span>
              </article>
            </div>
          </div>
        </section>

        <section className="empresa-section">
          <div className="home-container empresa-content">
            <div>
              <span className="empresa-label">Para empresas</span>

              <h2>Encuentra estudiantes para tus oportunidades laborales</h2>

              <p>
                Publica convocatorias de práctica, define el perfil que buscas
                y gestiona las postulaciones recibidas.
              </p>
            </div>

            <Link to="/registro" className="btn empresa-button">
              Registrar empresa
              <span>→</span>
            </Link>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="home-container footer-content">
          <div>
            <strong>TrabajoGrado</strong>
            <span>Proyecto académico</span>
          </div>

          <p>© 2026 TrabajoGrado</p>
        </div>
      </footer>
    </div>
  );
}
