import { useState } from "react";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Investigacion from "./pages/Dashboard/Investigacion.jsx";
import Diplomado from "./pages/Dashboard/Diplomado.jsx";
import EditarPerfil from "./pages/Dashboard/EditarPerfil.jsx";
import "./pages/Dashboard/Dashboard-Estudiante.css";

const AUTH_APP_URL =
  import.meta.env.VITE_AUTH_APP_URL || "http://localhost:5173";
const POSTULACIONES_APP_URL =
  import.meta.env.VITE_POSTULACIONES_APP_URL || "http://localhost:5176";

function obtenerUsuarioInicial() {
  try {
    const crudo = localStorage.getItem("usuario");
    return crudo ? JSON.parse(crudo) : null;
  } catch {
    return null;
  }
}

function AppShell() {
  const [usuario, setUsuario] = useState(obtenerUsuarioInicial);
  const [vistaEstudiante, setVistaEstudiante] = useState("inicio");
  const [mostrarPerfil, setMostrarPerfil] = useState(false);

  // Se llama cuando EditarPerfil actualiza con exito los datos comunes de la
  // cuenta (nombre/correo), para que el header refleje el cambio sin tener
  // que volver a iniciar sesion.
  function handlePerfilActualizado(usuarioActualizado) {
    const usuarioCompleto = { ...usuario, ...usuarioActualizado };
    setUsuario(usuarioCompleto);
    localStorage.setItem("usuario", JSON.stringify(usuarioCompleto));
  }

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    window.location.href = AUTH_APP_URL;
  }

  // "Practicas Profesionales" vive en su propia app (otro origen), asi que
  // saltamos pasando el token y el usuario por la URL, igual que hace
  // frontend-auth al redirigir tras el login.
  function irAPracticas() {
    const token = localStorage.getItem("token");
    const usuarioGuardado = localStorage.getItem("usuario");
    const params = new URLSearchParams({
      token: token ?? "",
      usuario: usuarioGuardado ?? "",
    });
    window.location.href = `${POSTULACIONES_APP_URL}/?${params.toString()}`;
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
        ) : vistaEstudiante === "investigacion" ? (
          <Investigacion onVolver={() => setVistaEstudiante("inicio")} />
        ) : vistaEstudiante === "diplomado" ? (
          <Diplomado onVolver={() => setVistaEstudiante("inicio")} />
        ) : (
          <>
            <section className="bienvenida">
              <div>
                <span className="bienvenida-etiqueta">
                  Portal del estudiante
                </span>

                <h1>Hola, {usuario?.nombre?.split(" ")[0]}</h1>

                <p>
                  Consulta las diferentes modalidades disponibles para
                  realizar tu trabajo de grado y conoce el proceso
                  correspondiente a cada una.
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
                      Desarrolla tu proyecto dentro de un grupo de
                      investigación y realiza el proceso académico
                      correspondiente.
                    </p>
                  </div>

                  <button
                    type="button"
                    className="card-action card-action-active"
                    onClick={() => setVistaEstudiante("investigacion")}
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
                    onClick={() => setVistaEstudiante("diplomado")}
                  >
                    Ver modalidad
                    <span>→</span>
                  </button>
                </article>

                <article className="card modalidad-practicas">
                  <div className="card-icon">03</div>

                  <div className="card-content">
                    <span className="card-tipo">
                      Experiencia profesional
                    </span>
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
                  Revisa cuidadosamente los requisitos de cada modalidad
                  antes de iniciar tu proceso de trabajo de grado.
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
    <ProtectedRoute>
      <AppShell />
    </ProtectedRoute>
  );
}
