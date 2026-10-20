const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

async function manejarRespuesta(res) {
  if (!res.ok) {
    const cuerpo = await res.json().catch(() => null);
    const mensaje = cuerpo?.message || `Error ${res.status}`;
    throw new Error(Array.isArray(mensaje) ? mensaje.join(", ") : mensaje);
  }
  return res.json();
}

export async function listarOfertasAbiertas() {
  const res = await fetch(`${API_URL}/ofertas`, {
    credentials: "include",
  });
  return manejarRespuesta(res);
}

// Se envia como multipart/form-data porque la hoja de vida es un archivo.
// No se fija 'Content-Type' a mano: el navegador arma el boundary correcto.
export async function postularse(ofertaId, hojaVida) {
  const formData = new FormData();
  formData.append("ofertaId", ofertaId);
  if (hojaVida) {
    formData.append("hojaVida", hojaVida);
  }

  const res = await fetch(`${API_URL}/postulaciones`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });
  return manejarRespuesta(res);
}

export async function misPostulaciones() {
  const res = await fetch(`${API_URL}/postulaciones/mias`, {
    credentials: "include",
  });
  return manejarRespuesta(res);
}

export async function cancelarPostulacion(id) {
  const res = await fetch(`${API_URL}/postulaciones/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  return manejarRespuesta(res);
}
