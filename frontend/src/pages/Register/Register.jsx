import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
/*import "./Register.css";*/
import "../Login/Login.css";

const PROGRAMAS = [
  { value: "TECNOLOGIA_AGROPECUARIA", label: "Tecnología Agropecuaria" },
  {
    value: "ADMINISTRACION_EMPRESAS_AGROPECUARIAS",
    label: "Administración de Empresas Agropecuarias",
  },
  { value: "INGENIERO_AGROPECUARIO", label: "Ingeniero Agropecuario" },
];

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    rol: "ESTUDIANTE",
    nombreEmpresa: "",
    nit: "",
    sector: "",
    codigo: "",
    programa: "",
  });
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const esEmpresa = form.rol === "EMPRESA";
  const esEstudiante = form.rol === "ESTUDIANTE";

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setCargando(true);

    try {
      const body = {
        nombre: form.nombre,
        email: form.email,
        password: form.password,
        rol: form.rol,
        ...(esEmpresa && {
          nombreEmpresa: form.nombreEmpresa,
          nit: form.nit,
          sector: form.sector,
        }),
        ...(esEstudiante && {
          codigo: form.codigo,
          programa: form.programa,
        }),
      };

      const res = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        const mensaje = Array.isArray(data.message)
          ? data.message.join(", ")
          : data.message;
        throw new Error(mensaje || "Error al registrarse");
      }

      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }

  /*return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1>Crear cuenta</h1>

        {error && <p className="error">{error}</p>}

        <label>Nombre completo</label>
        <input
          type="text"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          required
        />

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
          minLength={6}
        />

        <label>Tipo de cuenta</label>
        <select name="rol" value={form.rol} onChange={handleChange}>
          <option value="ESTUDIANTE">Estudiante</option>
          <option value="EMPRESA">Empresa</option>
        </select>

        {esEstudiante && (
          <>
            <label>Código estudiantil</label>
            <input
              type="text"
              name="codigo"
              value={form.codigo}
              onChange={handleChange}
              required
              placeholder="20231234"
            />

            <label>Programa</label>
            <select
              name="programa"
              value={form.programa}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Selecciona tu programa
              </option>
              {PROGRAMAS.map((programa) => (
                <option key={programa.value} value={programa.value}>
                  {programa.label}
                </option>
              ))}
            </select>

          </>
        )}

        {esEmpresa && (
          <>
            <label>Nombre de la empresa</label>
            <input
              type="text"
              name="nombreEmpresa"
              value={form.nombreEmpresa}
              onChange={handleChange}
              required
              placeholder="Empresa S.A.S."
            />

            <label>NIT</label>
            <input
              type="text"
              name="nit"
              value={form.nit}
              onChange={handleChange}
              required
              placeholder="900123456-7"
            />

            <label>Sector</label>
            <input
              type="text"
              name="sector"
              value={form.sector}
              onChange={handleChange}
              required
              placeholder="Tecnología, construcción, salud..."
            />
          </>
        )}

        <button type="submit" disabled={cargando}>
          {cargando ? "Creando cuenta..." : "Registrarme"}
        </button>

        <p className="switch-auth">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </form>
    </div>
  );*/

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
            Crea tu cuenta
          </span>

          <h2>
            Comienza tu proceso dentro de la plataforma.
          </h2>

          <p>
            Regístrate como estudiante o empresa y accede a las herramientas
            disponibles para gestionar procesos académicos, modalidades de grado
            y oportunidades profesionales.
          </p>

          <div className="auth-benefits">
            <div>
              <span>✓</span>
              <p>Acceso personalizado según tu tipo de cuenta</p>
            </div>

            <div>
              <span>✓</span>
              <p>Consulta y gestión de procesos académicos</p>
            </div>

            <div>
              <span>✓</span>
              <p>Conexión entre estudiantes y empresas</p>
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
              <span>Registro</span>

              <h1>Crear cuenta</h1>

              <p>
                Completa tus datos para ingresar a TrabajoGrado.
              </p>
            </div>

            {error && <p className="error">{error}</p>}

            <div className="form-group">
              <label htmlFor="nombre">Nombre completo</label>

              <input
                id="nombre"
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Tu nombre completo"
                required
              />
            </div>

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
                placeholder="Mínimo 6 caracteres"
                required
                minLength={6}
              />
            </div>

            <div className="form-group">
              <label htmlFor="rol">Tipo de cuenta</label>

              <select
                id="rol"
                name="rol"
                value={form.rol}
                onChange={handleChange}
              >
                <option value="ESTUDIANTE">Estudiante</option>
                <option value="EMPRESA">Empresa</option>
              </select>
            </div>

            {esEstudiante && (
              <>
                <div className="form-group">
                  <label htmlFor="codigo">Código estudiantil</label>

                  <input
                    id="codigo"
                    type="text"
                    name="codigo"
                    value={form.codigo}
                    onChange={handleChange}
                    required
                    placeholder="20231234"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="programa">Programa</label>

                  <select
                    id="programa"
                    name="programa"
                    value={form.programa}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Selecciona tu programa
                    </option>

                    {PROGRAMAS.map((programa) => (
                      <option
                        key={programa.value}
                        value={programa.value}
                      >
                        {programa.label}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}

            {esEmpresa && (
              <>
                <div className="form-group">
                  <label htmlFor="nombreEmpresa">
                    Nombre de la empresa
                  </label>

                  <input
                    id="nombreEmpresa"
                    type="text"
                    name="nombreEmpresa"
                    value={form.nombreEmpresa}
                    onChange={handleChange}
                    required
                    placeholder="Empresa S.A.S."
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="nit">NIT</label>

                  <input
                    id="nit"
                    type="text"
                    name="nit"
                    value={form.nit}
                    onChange={handleChange}
                    required
                    placeholder="900123456-7"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="sector">Sector</label>

                  <input
                    id="sector"
                    type="text"
                    name="sector"
                    value={form.sector}
                    onChange={handleChange}
                    required
                    placeholder="Tecnología, agricultura, construcción..."
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              className="auth-submit"
              disabled={cargando}
            >
              {cargando ? "Creando cuenta..." : "Crear cuenta"}
            </button>

            <p className="switch-auth">
              ¿Ya tienes cuenta?{" "}
              <Link to="/login">
                Inicia sesión
              </Link>
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}
