const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

async function manejarRespuesta(res) {
  if (!res.ok) {
    const cuerpo = await res.json().catch(() => null);
    const mensaje = cuerpo?.message || `Error ${res.status}`;
    throw new Error(Array.isArray(mensaje) ? mensaje.join(", ") : mensaje);
  }
  return res.json();
}

// Devuelve { usuario, token }. La redirección al frontend que corresponda
// según el rol la decide quien llama a esta función (ver Login.jsx).
export async function iniciarSesion(credenciales) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credenciales),
  });
  return manejarRespuesta(res);
}

export async function registrarse(datos) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });
  return manejarRespuesta(res);
}
