import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ConvocatoriasDisponibles from "./pages/Convocatorias-Disponibles.jsx";
import "./pages/Dashboard-shell.css";

const AUTH_APP_URL =
  import.meta.env.VITE_AUTH_APP_URL || "http://localhost:5173";
const ESTUDIANTES_APP_URL =
  import.meta.env.VITE_ESTUDIANTES_APP_URL || "http://localhost:5175";

function obtenerUsuario() {
  try {
    const crudo = localStorage.getItem("usuario");
    return crudo ? JSON.parse(crudo) : null;
  } catch {
    return null;
  }
}

function AppShell() {
  const usuario = obtenerUsuario();

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    window.location.href = AUTH_APP_URL;
  }

  function handleVolver() {
    window.location.href = ESTUDIANTES_APP_URL;
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="dashboard-brand">
          <div className="brand-icon">TG</div>
          <div>
            <span className="brand-name">Trabajo de Grado</span>
            <span className="brand-subtitle">Prácticas Profesionales</span>
          </div>
        </div>

        <div className="dashboard-user">
          <div className="dashboard-user-info">
            <span className="dashboard-user-name">
              {usuario?.nombre ?? "Estudiante"}
            </span>
            <span className="rol-badge">{usuario?.rol ?? "ESTUDIANTE"}</span>
          </div>
          <button type="button" className="btn-logout" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </header>

      <main className="dashboard-main">
        <ConvocatoriasDisponibles onVolver={handleVolver} />
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
