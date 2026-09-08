const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

async function manejarRespuesta(res) {
  if (!res.ok) {
    const cuerpo = await res.json().catch(() => null)
    const mensaje = cuerpo?.message || `Error ${res.status}`
    throw new Error(Array.isArray(mensaje) ? mensaje.join(', ') : mensaje)
  }
  return res.json()
}

export async function ingresarEmpresa({ email, nombre }) {
  const res = await fetch(`${API_URL}/empresas/ingresar`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, nombre }),
  })
  return manejarRespuesta(res)
}

export async function crearOferta(empresaId, { titulo, perfilBuscado, descripcion }) {
  const res = await fetch(`${API_URL}/empresas/${empresaId}/ofertas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ titulo, perfilBuscado, descripcion }),
  })
  return manejarRespuesta(res)
}

export async function listarOfertas(empresaId) {
  const res = await fetch(`${API_URL}/empresas/${empresaId}/ofertas`)
  return manejarRespuesta(res)
}
