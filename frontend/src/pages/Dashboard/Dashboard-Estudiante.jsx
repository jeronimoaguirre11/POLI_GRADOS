/*import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardEmpresa from "./Dashboard-Empresa.jsx";
import ConvocatoriasDisponibles from "./Convocatorias-Disponibles.jsx";
import "./Dashboard-Estudiante.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const [vistaEstudiante, setVistaEstudiante] = useState("inicio");

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/");
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div>
          <h1>Hola, {usuario?.nombre}</h1>
          <p className="rol-badge">{usuario?.rol}</p>
        </div>
        <button onClick={handleLogout} className="btn-logout">
          Cerrar sesión
        </button>
      </header>

      {usuario?.rol === "ESTUDIANTE" &&
        (vistaEstudiante === "practicas" ? (
          <ConvocatoriasDisponibles onVolver={() => setVistaEstudiante("inicio")} />
        ) : (
          <section className="servicios">
            <h2>Elige tu modalidad de trabajo de grado</h2>
            <div className="cards">
              <div className="card">
                <h3>Trabajo de Investigación</h3>
                <p>Únete o continúa con tu grupo de investigación.</p>
              </div>
              <div className="card">
                <h3>Diplomado</h3>
                <p>Reporta el diplomado o curso que estás tomando.</p>
              </div>
              <div
                className="card card-clicable"
                role="button"
                tabIndex={0}
                onClick={() => setVistaEstudiante("practicas")}
                onKeyDown={(e) => {
                  if (e.key === "Enter") setVistaEstudiante("practicas");
                }}
              >
                <h3>Prácticas Profesionales</h3>
                <p>Explora ofertas o reporta tu práctica independiente.</p>
              </div>
            </div>
          </section>
        ))}

      {usuario?.rol === "EMPRESA" && <DashboardEmpresa />}

      {usuario?.rol !== "ESTUDIANTE" && usuario?.rol !== "EMPRESA" && (
        <p>Vista para el rol "{usuario?.rol}" — pendiente de construir.</p>
      )}
    </div>
  );
}*/

/*si el codigo siguiente funciona bien, eliminar todo el que esta comentado*/

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardEmpresa from "./Dashboard-Empresa.jsx";
import ConvocatoriasDisponibles from "./Convocatorias-Disponibles.jsx";
import Investigacion from "./Investigacion.jsx";
import Diplomado from "./Diplomado.jsx";
import "./Dashboard-Estudiante.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const [vistaEstudiante, setVistaEstudiante] = useState("inicio");

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/");
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
            <span className="dashboard-user-name">
              {usuario?.nombre}
            </span>

            <span className="rol-badge">
              {usuario?.rol}
            </span>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="btn-logout"
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      <main className="dashboard-main">
        {usuario?.rol === "ESTUDIANTE" &&
          (vistaEstudiante === "investigacion" ? (
            <Investigacion
              onVolver={() => setVistaEstudiante("inicio")}
            />
          ) : vistaEstudiante === "diplomado" ? (
            <Diplomado
              onVolver={() => setVistaEstudiante("inicio")}
            />
          ) : vistaEstudiante === "practicas" ? (
            <ConvocatoriasDisponibles
              onVolver={() => setVistaEstudiante("inicio")}
            />
          ) : (
            <>
              <section className="bienvenida">
                <div>
                  <span className="bienvenida-etiqueta">
                    Portal del estudiante
                  </span>

                  <h1>
                    Hola, {usuario?.nombre?.split(" ")[0]}
                  </h1>

                  <p>
                    Consulta las diferentes modalidades disponibles
                    para realizar tu trabajo de grado y conoce el
                    proceso correspondiente a cada una.
                  </p>
                </div>
              </section>

              <section className="servicios">
                <div className="servicios-header">
                  <div>
                    <h2>Modalidades de trabajo de grado</h2>

                    <p>
                      Selecciona la opción que deseas consultar.
                    </p>
                  </div>
                </div>

                <div className="cards">
                  <article className="card modalidad-investigacion">
                    <div className="card-icon">01</div>

                    <div className="card-content">
                      <span className="card-tipo">
                        Investigación
                      </span>

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
                      <span className="card-tipo">
                        Formación
                      </span>

                      <h3>Diplomado</h3>

                      <p>
                        Consulta los requisitos para presentar un
                        diplomado o curso como modalidad de trabajo
                        de grado.
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
                        Explora las convocatorias publicadas por las
                        empresas y postúlate a oportunidades
                        disponibles.
                      </p>
                    </div>

                    <button
                      type="button"
                      className="card-action card-action-active"
                      onClick={() =>
                        setVistaEstudiante("practicas")
                      }
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
                    Revisa cuidadosamente los requisitos de cada
                    modalidad antes de iniciar tu proceso de trabajo
                    de grado.
                  </p>
                </div>
              </section>
            </>
          ))}

        {usuario?.rol === "EMPRESA" && (
          <DashboardEmpresa />
        )}

        {usuario?.rol !== "ESTUDIANTE" &&
          usuario?.rol !== "EMPRESA" && (
            <p>
              Vista para el rol "{usuario?.rol}" — pendiente de
              construir.
            </p>
          )}
      </main>
    </div>
  );
}