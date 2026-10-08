const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

async function solicitar(ruta, opciones = {}) {
  const token = localStorage.getItem("token");
  const respuesta = await fetch(`${API_URL}${ruta}`, {
    ...opciones,
    headers: {
      ...(opciones.body ? { "Content-Type": "application/json" } : {}),
      Authorization: `Bearer ${token}`,
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

export function obtenerPanelCoordinador() {
  return solicitar("/coordinadores/panel");
}

export function obtenerGestionDocentes() {
  return solicitar("/coordinadores/docentes");
}

export function crearDocente(datos) {
  return solicitar("/coordinadores/docentes", {
    method: "POST",
    body: JSON.stringify(datos),
  });
}

export function asignarDocente(datos, esReasignacion = false) {
  return solicitar("/coordinadores/asignaciones-docentes", {
    method: esReasignacion ? "PUT" : "POST",
    body: JSON.stringify(datos),
  });
}

export function retirarAsignacionDocente(estudianteId) {
  return solicitar(
    `/coordinadores/asignaciones-docentes/${encodeURIComponent(estudianteId)}`,
    { method: "DELETE" },
  );
}
