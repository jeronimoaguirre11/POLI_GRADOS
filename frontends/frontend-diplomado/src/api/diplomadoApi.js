const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

async function manejarRespuesta(res) {
  if (!res.ok) {
    const cuerpo = await res.json().catch(() => null);
    const mensaje = cuerpo?.message || `Error ${res.status}`;
    throw new Error(Array.isArray(mensaje) ? mensaje.join(", ") : mensaje);
  }
  return res.json();
}

export async function listarDiplomados() {
  const res = await fetch(`${API_URL}/diplomados`, {
    credentials: "include",
  });
  return manejarRespuesta(res);
}

export async function misInscripciones() {
  const res = await fetch(`${API_URL}/diplomados/mias`, {
    credentials: "include",
  });
  return manejarRespuesta(res);
}

export async function inscribirse(diplomadoId) {
  const res = await fetch(
    `${API_URL}/diplomados/${diplomadoId}/inscripciones`,
    {
      method: "POST",
      credentials: "include",
    },
  );
  return manejarRespuesta(res);
}

export async function cancelarInscripcion(diplomadoId) {
  const res = await fetch(
    `${API_URL}/diplomados/${diplomadoId}/inscripciones`,
    {
      method: "DELETE",
      credentials: "include",
    },
  );
  return manejarRespuesta(res);
}
