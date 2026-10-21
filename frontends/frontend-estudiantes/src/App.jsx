import { useState } from "react";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import EditarPerfil from "./pages/Dashboard/EditarPerfil.jsx";
import { obtenerSesion, cerrarSesion } from "./api/sesion.js";
import "./pages/Dashboard/Dashboard-Estudiante.css";

const AUTH_APP_URL =
  import.meta.env.VITE_AUTH_APP_URL || "http://localhost:5173";
const POSTULACIONES_APP_URL =
  import.meta.env.VITE_POSTULACIONES_APP_URL || "http://localhost:5176";
const DIPLOMADO_APP_URL =
  import.meta.env.VITE_DIPLOMADO_APP_URL || "http://localhost:5178";
const INVESTIGACION_APP_URL =
  import.meta.env.VITE_INVESTIGACION_APP_URL || "http://localhost:5179";

function AppShell({ sesionInicial }) {
  const [usuario, setUsuario] = useState(sesionInicial);
  const [vistaEstudiante, setVistaEstudiante] = useState("inicio");
  const [mostrarPerfil, setMostrarPerfil] = useState(false);

  // Se llama cuando EditarPerfil actualiza con exito los datos de la cuenta.
  // El backend ya no devuelve el usuario al actualizar, asi que se vuelve a
  // pedir a /auth/me para que el header refleje el cambio.
  async function handlePerfilActualizado() {
    const sesion = await obtenerSesion();
    if (sesion) setUsuario(sesion);
  }

  async function handleLogout() {
    await cerrarSesion();
    window.location.href = AUTH_APP_URL;
  }

  // Cada modalidad vive en su propia app. La cookie de sesion ya viaja sola
  // entre ellas, asi que solo hay que redirigir.
  function irAPracticas() {
    window.location.href = POSTULACIONES_APP_URL;
  }

  function irADiplomado() {
    window.location.href = DIPLOMADO_APP_URL;
  }

  function irAInvestigacion() {
    window.location.href = INVESTIGACION_APP_URL;
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="dashboard-brand">
          <div className="brand-icon">TG</div>

          <div>
            <span className="brand-name">TrabajoGrado</span>
            <span className="brand-subtitle">Portal académico</span>
          </div>
        </div>

        <div className="dashboard-user">
          <div className="dashboard-user-info">
            <span className="dashboard-user-name">{usuario?.nombre}</span>
            <span className="rol-badge">{usuario?.rol}</span>
          </div>

          <button
            type="button"
            onClick={() => setMostrarPerfil(true)}
            className="btn-editar-perfil"
          >
            Editar perfil
          </button>

          <button type="button" onClick={handleLogout} className="btn-logout">
            Cerrar sesión
          </button>
        </div>
      </header>

      <main className="dashboard-main">
        {mostrarPerfil ? (
          <EditarPerfil
            usuario={usuario}
            onVolver={() => setMostrarPerfil(false)}
            onActualizado={handlePerfilActualizado}
          />
        ) : (
          <>
            <section className="bienvenida">
              <div>
                <span className="bienvenida-etiqueta">
                  Portal del estudiante
                </span>

                <h1>Hola, {usuario?.nombre?.split(" ")[0]}</h1>

                <p>
                  Consulta las diferentes modalidades disponibles para realizar
                  tu trabajo de grado y conoce el proceso correspondiente a cada
                  una.
                </p>
              </div>
            </section>

            <section className="servicios">
              <div className="servicios-header">
                <div>
                  <h2>Modalidades de trabajo de grado</h2>
                  <p>Selecciona la opción que deseas consultar.</p>
                </div>
              </div>

              <div className="cards">
                <article className="card modalidad-investigacion">
                  <div className="card-icon">01</div>

                  <div className="card-content">
                    <span className="card-tipo">Investigación</span>
                    <h3>Trabajo de Investigación</h3>
                    <p>
                      Desarrolla tu proyecto dentro de un grupo de investigación
                      y realiza el proceso académico correspondiente.
                    </p>
                  </div>

                  <button
                    type="button"
                    className="card-action card-action-active"
                    onClick={irAInvestigacion}
                  >
                    Ver modalidad
                    <span>→</span>
                  </button>
                </article>

                <article className="card modalidad-diplomado">
                  <div className="card-icon">02</div>

                  <div className="card-content">
                    <span className="card-tipo">Formación</span>
                    <h3>Diplomado</h3>
                    <p>
                      Consulta los requisitos para presentar un diplomado o
                      curso como modalidad de trabajo de grado.
                    </p>
                  </div>

                  <button
                    type="button"
                    className="card-action card-action-active"
                    onClick={irADiplomado}
                  >
                    Ver modalidad
                    <span>→</span>
                  </button>
                </article>

                <article className="card modalidad-practicas">
                  <div className="card-icon">03</div>

                  <div className="card-content">
                    <span className="card-tipo">Experiencia profesional</span>
                    <h3>Prácticas Profesionales</h3>
                    <p>
                      Explora las convocatorias publicadas por las empresas y
                      postúlate a oportunidades disponibles.
                    </p>
                  </div>

                  <button
                    type="button"
                    className="card-action card-action-active"
                    onClick={irAPracticas}
                  >
                    Ver modalidad
                    <span>→</span>
                  </button>
                </article>
              </div>
            </section>

            <section className="dashboard-info">
              <div className="info-icon">i</div>

              <div>
                <h3>Antes de comenzar</h3>
                <p>
                  Revisa cuidadosamente los requisitos de cada modalidad antes
                  de iniciar tu proceso de trabajo de grado.
                </p>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ProtectedRoute rol="ESTUDIANTE">
      {(sesion) => <AppShell sesionInicial={sesion} />}
    </ProtectedRoute>
  );
}
