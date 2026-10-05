import { useEffect, useState } from "react";

const AUTH_APP_URL =
  import.meta.env.VITE_AUTH_APP_URL || "http://localhost:5173";

function leerUsuario(crudo) {
  try {
    return crudo ? JSON.parse(crudo) : null;
  } catch {
    return null;
  }
}

function irAlLogin() {
  localStorage.removeItem("token");
  localStorage.removeItem("usuario");
  window.location.replace(`${AUTH_APP_URL}/login`);
}

export default function ProtectedRoute({ children }) {
  const [sesion, setSesion] = useState({ comprobando: true, usuario: null });

  useEffect(() => {
    const parametros = new URLSearchParams(window.location.search);
    const tokenRecibido = parametros.get("token");
    const usuarioRecibido = parametros.get("usuario");

    if (tokenRecibido) {
      localStorage.setItem("token", tokenRecibido);
      if (usuarioRecibido) {
        localStorage.setItem("usuario", usuarioRecibido);
      }

      const urlLimpia = new URL(window.location.href);
      urlLimpia.searchParams.delete("token");
      urlLimpia.searchParams.delete("usuario");
      window.history.replaceState({}, "", urlLimpia.toString());
    }

    const token = localStorage.getItem("token");
    const usuario = leerUsuario(localStorage.getItem("usuario"));

    if (!token || usuario?.rol !== "COORDINADOR") {
      irAlLogin();
      return;
    }

    setSesion({ comprobando: false, usuario });
  }, []);

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
