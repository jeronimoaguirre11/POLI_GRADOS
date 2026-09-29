const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

async function manejarRespuesta(res) {
  if (!res.ok) {
    const cuerpo = await res.json().catch(() => null);
    const mensaje = cuerpo?.message || `Error ${res.status}`;
    throw new Error(Array.isArray(mensaje) ? mensaje.join(", ") : mensaje);
  }
  return res.json();
}

function tokenHeader() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function listarDiplomados() {
  const res = await fetch(`${API_URL}/diplomados`, {
    headers: tokenHeader(),
  });
  return manejarRespuesta(res);
}

export async function misInscripciones() {
  const res = await fetch(`${API_URL}/diplomados/mias`, {
    headers: tokenHeader(),
  });
  return manejarRespuesta(res);
}

export async function inscribirse(diplomadoId) {
  const res = await fetch(
    `${API_URL}/diplomados/${diplomadoId}/inscripciones`,
    {
      method: "POST",
      headers: tokenHeader(),
    },
  );
  return manejarRespuesta(res);
}

export async function cancelarInscripcion(diplomadoId) {
  const res = await fetch(
    `${API_URL}/diplomados/${diplomadoId}/inscripciones`,
    {
      method: "DELETE",
      headers: tokenHeader(),
    },
  );
  return manejarRespuesta(res);
}
