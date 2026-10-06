const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

function obtenerToken() {
  return localStorage.getItem('token')
}

async function procesarRespuesta(response) {
  if (!response.ok) {
    let mensaje = 'Ocurrio un error al procesar la solicitud'

    try {
      const data = await response.json()
      mensaje = data.message || mensaje
    } catch {
      // La respuesta no contenia JSON.
    }

    throw new Error(mensaje)
  }

  return response.json()
}

export async function obtenerMiPerfil() {
  const response = await fetch(`${API_URL}/docentes/me`, {
    headers: {
      Authorization: `Bearer ${obtenerToken()}`,
    },
  })

  return procesarRespuesta(response)
}

export async function obtenerMisEstudiantes() {
  const response = await fetch(`${API_URL}/docentes/me/estudiantes`, {
    headers: {
      Authorization: `Bearer ${obtenerToken()}`,
    },
  })

  return procesarRespuesta(response)
}