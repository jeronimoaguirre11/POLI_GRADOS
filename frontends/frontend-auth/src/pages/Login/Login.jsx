import { useState } from "react";
import { Link } from "react-router-dom";
import { iniciarSesion } from "../../api/auth.js";
import { obtenerSesion, cerrarSesion } from "../../api/sesion.js";
import "./Login.css";

// A donde mandar a cada rol despues de iniciar sesion. La sesion vive en una
// cookie httpOnly que comparten todas las apps (el navegador no aisla las
// cookies por puerto), asi que basta con redirigir: cada app consulta
// /auth/me por su cuenta.

const DESTINOS_POR_ROL = {
  EMPRESA: import.meta.env.VITE_EMPRESAS_APP_URL || "http://localhost:5174",
  ESTUDIANTE:
    import.meta.env.VITE_ESTUDIANTES_APP_URL || "http://localhost:5175",
  COORDINADOR:
    import.meta.env.VITE_COORDINADORES_APP_URL || "http://localhost:5177",
  DOCENTE: import.meta.env.VITE_DOCENTES_APP_URL || "http://localhost:5180",
};

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setCargando(true);

    try {
      await iniciarSesion(form);

      const sesion = await obtenerSesion();
      if (!sesion) {
        throw new Error("No se pudo iniciar la sesión, intenta de nuevo.");
      }

      const destino = DESTINOS_POR_ROL[sesion.rol];
      if (!destino) {
        await cerrarSesion();
        throw new Error(
          `Tu cuenta tiene el rol "${sesion.rol}", que todavía no tiene un panel propio.`,
        );
      }

      window.location.href = destino;
    } catch (err) {
      setError(err.message);
      setCargando(false);
    }
  }

  return (
    <div className="auth-page">
      <section className="auth-info">
        <Link to="/" className="auth-brand">
          <div className="auth-brand-icon">TG</div>

          <div>
            <strong>TrabajoGrado</strong>
            <span>Portal académico</span>
          </div>
        </Link>

        <div className="auth-info-content">
          <span className="auth-info-label">Gestión académica</span>

          <h2>Todo tu proceso de grado en un solo lugar.</h2>

          <p>
            Consulta modalidades, procesos, convocatorias y realiza el
            seguimiento de tu trabajo de grado desde una plataforma
            centralizada.
          </p>

          <div className="auth-benefits">
            <div>
              <span>✓</span>
              <p>Consulta tus modalidades de grado</p>
            </div>

            <div>
              <span>✓</span>
              <p>Accede a oportunidades de práctica</p>
            </div>

            <div>
              <span>✓</span>
              <p>Mantén organizado tu proceso académico</p>
            </div>
          </div>
        </div>

        <p className="auth-info-footer">Proyecto académico · 2026</p>
      </section>

      <section className="auth-form-section">
        <div className="auth-form-container">
          <Link to="/" className="auth-back">
            ← Volver al inicio
          </Link>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-form-header">
              <span>Bienvenido de nuevo</span>

              <h1>Iniciar sesión</h1>

              <p>Ingresa tus datos para acceder a tu cuenta.</p>
            </div>

            {error && <p className="error">{error}</p>}

            <div className="form-group">
              <label htmlFor="email">Correo electrónico</label>

              <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="nombre@correo.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña</label>

              <input
                id="password"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Ingresa tu contraseña"
                required
              />
            </div>

            <button type="submit" className="auth-submit" disabled={cargando}>
              {cargando ? "Ingresando..." : "Iniciar sesión"}
            </button>

            <p className="switch-auth">
              ¿No tienes una cuenta? <Link to="/registro">Regístrate</Link>
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}
