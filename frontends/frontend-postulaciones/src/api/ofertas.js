const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

async function manejarRespuesta(res) {
  if (!res.ok) {
    const cuerpo = await res.json().catch(() => null)
    const mensaje = cuerpo?.message || `Error ${res.status}`
    throw new Error(Array.isArray(mensaje) ? mensaje.join(', ') : mensaje)
  }
  return res.json()
}

function tokenHeader() {
  const token = localStorage.getItem('token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export async function listarOfertasAbiertas() {
  const res = await fetch(`${API_URL}/ofertas`, {
    headers: tokenHeader(),
  })
  return manejarRespuesta(res)
}

// Se envia como multipart/form-data porque la hoja de vida es un archivo.
// No se fija 'Content-Type' a mano: el navegador arma el boundary correcto.
export async function postularse(ofertaId, hojaVida) {
  const formData = new FormData()
  formData.append('ofertaId', ofertaId)
  if (hojaVida) {
    formData.append('hojaVida', hojaVida)
  }

  const res = await fetch(`${API_URL}/postulaciones`, {
    method: 'POST',
    headers: tokenHeader(),
    body: formData,
  })
  return manejarRespuesta(res)
}

export async function misPostulaciones() {
  const res = await fetch(`${API_URL}/postulaciones/mias`, {
    headers: tokenHeader(),
  })
  return manejarRespuesta(res)
}

export async function cancelarPostulacion(id) {
  const res = await fetch(`${API_URL}/postulaciones/${id}`, {
    method: 'DELETE',
    headers: tokenHeader(),
  })
  return manejarRespuesta(res)
}
