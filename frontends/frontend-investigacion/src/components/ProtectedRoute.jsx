import { useEffect, useState } from "react";

const AUTH_APP_URL =
  import.meta.env.VITE_AUTH_APP_URL || "http://localhost:5173";

// Esta app vive en su propio origen (puerto distinto a frontend-auth), asi
// que localStorage no se comparte entre ambas. Cuando frontend-estudiantes
// redirige aca (boton "Practicas Profesionales"), pasa el token y el usuario
// por la URL; aca los guardamos en el localStorage propio de esta app y
// limpiamos la URL para que no quede el token visible en el historial.
export default function ProtectedRoute({ children }) {
  const [listo, setListo] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenQS = params.get("token");
    const usuarioQS = params.get("usuario");

    if (tokenQS) {
      localStorage.setItem("token", tokenQS);
      if (usuarioQS) {
        localStorage.setItem("usuario", usuarioQS);
      }

      const url = new URL(window.location.href);
      url.searchParams.delete("token");
      url.searchParams.delete("usuario");
      window.history.replaceState({}, "", url.toString());
    }

    setListo(true);
  }, []);

  if (!listo) return null;

  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = `${AUTH_APP_URL}/login`;
    return null;
  }

  return children;
}
