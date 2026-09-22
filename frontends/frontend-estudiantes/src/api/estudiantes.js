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

export async function obtenerPerfilEstudiante() {
  const res = await fetch(`${API_URL}/estudiantes/perfil`, {
    headers: tokenHeader(),
  })
  return manejarRespuesta(res)
}

export async function actualizarPerfilEstudiante(datos) {
  const res = await fetch(`${API_URL}/estudiantes/perfil`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...tokenHeader() },
    body: JSON.stringify(datos),
  })
  return manejarRespuesta(res)
}
