import { useNavigate } from "react-router-dom";
import DashboardEmpresa from "./Dashboard-Empresa.jsx";
import "./Dashboard-Estudiante.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario"));

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

      {usuario?.rol === "ESTUDIANTE" && (
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
            <div className="card">
              <h3>Prácticas Profesionales</h3>
              <p>Explora ofertas o reporta tu práctica independiente.</p>
            </div>
          </div>
        </section>
      )}

      {usuario?.rol === "EMPRESA" && <DashboardEmpresa />}

      {usuario?.rol !== "ESTUDIANTE" && usuario?.rol !== "EMPRESA" && (
        <p>Vista para el rol "{usuario?.rol}" — pendiente de construir.</p>
      )}
    </div>
  );
}
