import { useEffect, useState } from "react";
import { obtenerSesion } from "../api/sesion.js";

const AUTH_APP_URL =
  import.meta.env.VITE_AUTH_APP_URL || "http://localhost:5173";

// Se exporta porque otros archivos la usan al detectar una sesión inválida.
// Ya no toca localStorage: la sesión vive en una cookie httpOnly.
function irAlLogin() {
  window.location.replace(`${AUTH_APP_URL}/login`);
}

export default function ProtectedRoute({ rol, children }) {
  const [sesion, setSesion] = useState({ comprobando: true, usuario: null });

  useEffect(() => {
    let cancelado = false;

    obtenerSesion().then((usuario) => {
      if (cancelado) return;

      if (!usuario || (rol && usuario.rol !== rol)) {
        irAlLogin();
        return;
      }
      setSesion({ comprobando: false, usuario });
    });

    return () => {
      cancelado = true;
    };
  }, [rol]);

  if (sesion.comprobando) {
    return (
      <main className="session-loading" aria-live="polite">
        <span className="loader" aria-hidden="true" />
        <p>Validando sesión…</p>
      </main>
    );
  }

  return children(sesion.usuario);
}

export { irAlLogin };
