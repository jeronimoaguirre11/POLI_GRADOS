import { useEffect, useState } from "react";
import { obtenerSesion } from "../api/sesion.js";

const AUTH_APP_URL =
  import.meta.env.VITE_AUTH_APP_URL || "http://localhost:5173";

// La sesion vive en una cookie httpOnly que pone auth-service al iniciar
// sesion. Aqui no se guarda nada: se pregunta a /auth/me quien es el usuario
// y se entrega a los hijos como funcion. Si no hay sesion, o el rol no
// corresponde a este panel, se manda al login.
export default function ProtectedRoute({ rol, children }) {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    let cancelado = false;

    obtenerSesion().then((sesion) => {
      if (cancelado) return;

      if (!sesion || (rol && sesion.rol !== rol)) {
        window.location.href = `${AUTH_APP_URL}/login`;
        return;
      }
      setUsuario(sesion);
    });

    return () => {
      cancelado = true;
    };
  }, [rol]);

  if (!usuario) return null;

  return children(usuario);
}
