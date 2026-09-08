const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

async function manejarRespuesta(res) {
  if (!res.ok) {
    const cuerpo = await res.json().catch(() => null)
    const mensaje = cuerpo?.message || `Error ${res.status}`
    throw new Error(Array.isArray(mensaje) ? mensaje.join(', ') : mensaje)
  }
  return res.json()
}

function headersAutenticados() {
  const token = localStorage.getItem('token')
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

export async function crearOferta({ titulo, perfilBuscado, descripcion }) {
  const res = await fetch(`${API_URL}/empresas/ofertas`, {
    method: 'POST',
    headers: headersAutenticados(),
    body: JSON.stringify({ titulo, perfilBuscado, descripcion }),
  })
  return manejarRespuesta(res)
}

export async function listarOfertas() {
  const res = await fetch(`${API_URL}/empresas/ofertas`, {
    headers: headersAutenticados(),
  })
  return manejarRespuesta(res)
}
