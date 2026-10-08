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

export async function misInvestigaciones() {
  const res = await fetch(`${API_URL}/investigaciones/mias`, {
    headers: tokenHeader(),
  });
  return manejarRespuesta(res);
}

export async function proponerInvestigacion(datos) {
  const res = await fetch(`${API_URL}/investigaciones`, {
    method: "POST",
    headers: { ...tokenHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });
  return manejarRespuesta(res);
}

export async function cancelarInvestigacion(id) {
  const res = await fetch(`${API_URL}/investigaciones/${id}`, {
    method: "DELETE",
    headers: tokenHeader(),
  });
  return manejarRespuesta(res);
}
