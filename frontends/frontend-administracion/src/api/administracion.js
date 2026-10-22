const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

async function solicitar(ruta, opciones = {}) {
  const respuesta = await fetch(`${API_URL}${ruta}`, {
    ...opciones,
    credentials: "include",
    headers: {
      ...(opciones.body ? { "Content-Type": "application/json" } : {}),
      ...opciones.headers,
    },
  });

  if (!respuesta.ok) {
    const cuerpo = await respuesta.json().catch(() => null);
    const mensaje = cuerpo?.message || `Error ${respuesta.status}`;
    const error = new Error(
      Array.isArray(mensaje) ? mensaje.join(", ") : mensaje,
    );
    error.status = respuesta.status;
    throw error;
  }

  if (respuesta.status === 204) return null;
  return respuesta.json();
}

// { usuarios: [...], resumen: { total, activos, inactivos, porRol } }
export function obtenerUsuarios() {
  return solicitar("/administracion/usuarios");
}

// tipo: coordinadores | docentes | estudiantes | empresas
export function crearUsuario(tipo, datos) {
  return solicitar(`/administracion/usuarios/${tipo}`, {
    method: "POST",
    body: JSON.stringify(datos),
  });
}

export function cambiarEstadoUsuario(id, activo) {
  return solicitar(
    `/administracion/usuarios/${encodeURIComponent(id)}/estado`,
    { method: "PATCH", body: JSON.stringify({ activo }) },
  );
}

export function cambiarMiContrasena(passwordActual, password) {
  return solicitar("/auth/perfil", {
    method: "PATCH",
    body: JSON.stringify({ passwordActual, password }),
  });
}
