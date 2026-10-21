const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

async function manejarRespuesta(res) {
  if (!res.ok) {
    const cuerpo = await res.json().catch(() => null);
    const mensaje = cuerpo?.message || `Error ${res.status}`;
    throw new Error(Array.isArray(mensaje) ? mensaje.join(", ") : mensaje);
  }
  return res.json();
}

function aFormData({ imagen, ...campos }) {
  const formData = new FormData();
  Object.entries(campos).forEach(([clave, valor]) => {
    formData.append(clave, valor);
  });
  if (imagen) {
    formData.append("imagen", imagen);
  }
  return formData;
}

export async function obtenerPerfilEmpresa() {
  const res = await fetch(`${API_URL}/empresas/perfil`, {
    credentials: "include",
  });
  return manejarRespuesta(res);
}

export async function actualizarPerfilEmpresa(datos) {
  const res = await fetch(`${API_URL}/empresas/perfil`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(datos),
  });
  return manejarRespuesta(res);
}

// Se envia como multipart/form-data porque "imagen" (opcional) es un archivo.
// No se fija 'Content-Type' a mano: el navegador arma el boundary correcto.
export async function crearOferta(datos) {
  const res = await fetch(`${API_URL}/empresas/ofertas`, {
    method: "POST",
    credentials: "include",
    body: aFormData(datos),
  });
  return manejarRespuesta(res);
}

export async function listarOfertas() {
  const res = await fetch(`${API_URL}/empresas/ofertas`, {
    credentials: "include",
  });
  return manejarRespuesta(res);
}

export async function actualizarOferta(id, datos) {
  const res = await fetch(`${API_URL}/empresas/ofertas/${id}`, {
    method: "PATCH",
    credentials: "include",
    body: aFormData(datos),
  });
  return manejarRespuesta(res);
}

export async function eliminarOferta(id) {
  const res = await fetch(`${API_URL}/empresas/ofertas/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  return manejarRespuesta(res);
}

export async function listarPostulantesOferta(ofertaId) {
  const res = await fetch(
    `${API_URL}/empresas/ofertas/${ofertaId}/postulaciones`,
    {
      credentials: "include",
    },
  );
  return manejarRespuesta(res);
}

export async function actualizarPostulacion(postulacionId, datos) {
  const res = await fetch(
    `${API_URL}/empresas/postulaciones/${postulacionId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(datos),
    },
  );
  return manejarRespuesta(res);
}

export async function descargarHojaVida(postulacionId) {
  const res = await fetch(
    `${API_URL}/empresas/postulaciones/${postulacionId}/hoja-vida`,
    { credentials: "include" },
  );

  if (!res.ok) {
    const cuerpo = await res.json().catch(() => null);
    const mensaje = cuerpo?.message || `Error ${res.status}`;
    throw new Error(Array.isArray(mensaje) ? mensaje.join(", ") : mensaje);
  }

  const disposition = res.headers.get("Content-Disposition") || "";
  const nombre = disposition.match(/filename="?([^";]+)"?/i)?.[1];

  return {
    archivo: await res.blob(),
    nombre: nombre || "hoja-de-vida",
  };
}
