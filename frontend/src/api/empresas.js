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

function aFormData({ imagen, ...campos }) {
  const formData = new FormData()
  Object.entries(campos).forEach(([clave, valor]) => {
    formData.append(clave, valor)
  })
  if (imagen) {
    formData.append('imagen', imagen)
  }
  return formData
}

export async function obtenerPerfilEmpresa() {
  const res = await fetch(`${API_URL}/empresas/perfil`, {
    headers: tokenHeader(),
  })
  return manejarRespuesta(res)
}

// Se envia como multipart/form-data porque "imagen" (opcional) es un archivo.
// No se fija 'Content-Type' a mano: el navegador arma el boundary correcto.
export async function crearOferta(datos) {
  const res = await fetch(`${API_URL}/empresas/ofertas`, {
    method: 'POST',
    headers: tokenHeader(),
    body: aFormData(datos),
  })
  return manejarRespuesta(res)
}

export async function listarOfertas() {
  const res = await fetch(`${API_URL}/empresas/ofertas`, {
    headers: tokenHeader(),
  })
  return manejarRespuesta(res)
}

export async function actualizarOferta(id, datos) {
  const res = await fetch(`${API_URL}/empresas/ofertas/${id}`, {
    method: 'PATCH',
    headers: tokenHeader(),
    body: aFormData(datos),
  })
  return manejarRespuesta(res)
}

export async function eliminarOferta(id) {
  const res = await fetch(`${API_URL}/empresas/ofertas/${id}`, {
    method: 'DELETE',
    headers: tokenHeader(),
  })
  return manejarRespuesta(res)
}
