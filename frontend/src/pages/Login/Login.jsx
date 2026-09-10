import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
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
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Error al iniciar sesión");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("usuario", JSON.stringify(data.usuario));

      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }

  /*return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1>Iniciar sesión</h1>

        {error && <p className="error">{error}</p>}

        <label>Correo</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label>Contraseña</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={cargando}>
          {cargando ? "Ingresando..." : "Ingresar"}
        </button>

        <p className="switch-auth">
          ¿No tienes cuenta? <Link to="/registro">Regístrate</Link>
        </p>
      </form>
    </div>
  );*/

  /*si el codigo siguiente funciona bien, eliminar todo el que esta comentado*/

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
          <span className="auth-info-label">
            Gestión académica
          </span>

          <h2>
            Todo tu proceso de grado en un solo lugar.
          </h2>

          <p>
            Consulta modalidades, procesos, convocatorias y realiza el
            seguimiento de tu trabajo de grado desde una plataforma centralizada.
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

        <p className="auth-info-footer">
          Proyecto académico · 2026
        </p>
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

              <p>
                Ingresa tus datos para acceder a tu cuenta.
              </p>
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

            <button
              type="submit"
              className="auth-submit"
              disabled={cargando}
            >
              {cargando ? "Ingresando..." : "Iniciar sesión"}
            </button>

            <p className="switch-auth">
              ¿No tienes una cuenta?{" "}
              <Link to="/registro">
                Regístrate
              </Link>
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}