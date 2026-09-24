const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function obtenerPanelCoordinador() {
  const token = localStorage.getItem("token");
  const respuesta = await fetch(`${API_URL}/coordinadores/panel`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!respuesta.ok) {
    const cuerpo = await respuesta.json().catch(() => null);
    const mensaje = cuerpo?.message || `Error ${respuesta.status}`;
    const error = new Error(
      Array.isArray(mensaje) ? mensaje.join(", ") : mensaje,
    );
    error.status = respuesta.status;
    throw error;
  }

  return respuesta.json();
}
