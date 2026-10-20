const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Devuelve { nombre, email, rol } si hay sesión, o null si no.
export async function obtenerSesion() {
  try {
    const res = await fetch(`${API_URL}/auth/me`, { credentials: "include" });
    return res.ok ? await res.json() : null;
  } catch {
    return null;
  }
}

export async function cerrarSesion() {
  try {
    await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
  } catch {
    // Si falla la red, igual seguimos con la redirección.
  }
}
