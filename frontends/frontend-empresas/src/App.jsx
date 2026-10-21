import { useState } from "react";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import DashboardEmpresa from "./pages/Dashboard/Dashboard-Empresa.jsx";
import EditarPerfil from "./pages/Dashboard/EditarPerfil.jsx";
import { obtenerSesion, cerrarSesion } from "./api/sesion.js";
import "./pages/Dashboard/Dashboard-shell.css";

const AUTH_APP_URL =
  import.meta.env.VITE_AUTH_APP_URL || "http://localhost:5173";

function AppShell({ sesionInicial }) {
  const [usuario, setUsuario] = useState(sesionInicial);
  const [mostrarPerfil, setMostrarPerfil] = useState(false);

  // Se llama cuando EditarPerfil actualiza con exito los datos comunes de la
  // cuenta (nombre/correo), para que el header refleje el cambio sin tener
  // que volver a iniciar sesion.
  async function handlePerfilActualizado() {
    const sesion = await obtenerSesion();
    if (sesion) setUsuario(sesion);
  }

  async function handleLogout() {
    await cerrarSesion();
    window.location.href = AUTH_APP_URL;
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="dashboard-brand">
          <div className="brand-icon">TG</div>
          <div>
            <span className="brand-name">TrabajoGrado</span>
            <span className="brand-subtitle">Portal de empresas</span>
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
          <DashboardEmpresa />
        )}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ProtectedRoute rol="EMPRESA">
      {(sesion) => <AppShell sesionInicial={sesion} />}
    </ProtectedRoute>
  );
}
