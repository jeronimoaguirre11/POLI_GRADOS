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

// Actualiza los datos comunes de la cuenta (nombre, correo, contraseña).
// Los datos propios del rol (empresa/estudiante) se actualizan en sus
// propios endpoints: ver api/empresas.js y api/estudiantes.js.
export async function actualizarPerfil(datos) {
  const res = await fetch(`${API_URL}/auth/perfil`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...tokenHeader() },
    body: JSON.stringify(datos),
  })
  return manejarRespuesta(res)
}
