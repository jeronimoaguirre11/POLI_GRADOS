import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registrarse } from "../../api/auth.js";
import "../Login/Login.css";

const PROGRAMAS = [
  { value: "TECNOLOGIA_AGROPECUARIA", label: "Tecnología Agropecuaria" },
  {
    value: "ADMINISTRACION_EMPRESAS_AGROPECUARIAS",
    label: "Administración de Empresas Agropecuarias",
  },
  { value: "INGENIERO_AGROPECUARIO", label: "Ingeniero Agropecuario" },
];

// Misma regla que en el backend (RegisterDto): al menos una mayuscula y un numero.
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d).+$/;

// Valida la contraseña sola (largo + complejidad). Se usa tanto mientras
// la persona escribe como al enviar el formulario, para no duplicar reglas.
function validarPassword(password) {
  if (!password) return "";
  if (password.length < 8) return "Debe tener al menos 8 caracteres";
  if (password.length > 15) return "No puede tener más de 15 caracteres";
  if (!PASSWORD_REGEX.test(password)) {
    return "Debe incluir al menos una mayúscula y un número";
  }
  return "";
}

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmarPassword: "",
    rol: "ESTUDIANTE",
    nombreEmpresa: "",
    nit: "",
    sector: "",
    codigo: "",
    programa: "",
  });
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [confirmarPasswordError, setConfirmarPasswordError] = useState("");

  const esEmpresa = form.rol === "EMPRESA";
  const esEstudiante = form.rol === "ESTUDIANTE";

  function handleChange(e) {
    const { name, value } = e.target;
    const nuevoForm = { ...form, [name]: value };
    setForm(nuevoForm);

    // Validación en vivo: se muestra apenas la persona escribe, sin
    // esperar a que le dé click a "Crear cuenta".
    if (name === "password") {
      setPasswordError(validarPassword(value));
      if (nuevoForm.confirmarPassword) {
        setConfirmarPasswordError(
          value === nuevoForm.confirmarPassword
            ? ""
            : "Las contraseñas no coinciden",
        );
      }
    }

    if (name === "confirmarPassword") {
      setConfirmarPasswordError(
        value === nuevoForm.password ? "" : "Las contraseñas no coinciden",
      );
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const errorPassword = validarPassword(form.password);
    if (errorPassword) {
      setPasswordError(errorPassword);
      setError(errorPassword);
      return;
    }
    if (form.password !== form.confirmarPassword) {
      setConfirmarPasswordError("Las contraseñas no coinciden");
      setError("Las contraseñas no coinciden");
      return;
    }

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

      await registrarse(body);

      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
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
                maxLength={50}
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
                maxLength={50}
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
                placeholder="Entre 8 y 15 caracteres, con mayúscula y número"
                required
                minLength={8}
                maxLength={15}
              />
              {passwordError && (
                <p className="field-error">{passwordError}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="confirmarPassword">Confirmar contraseña</label>

              <input
                id="confirmarPassword"
                type="password"
                name="confirmarPassword"
                value={form.confirmarPassword}
                onChange={handleChange}
                placeholder="Repite tu contraseña"
                required
                minLength={8}
                maxLength={15}
              />
              {confirmarPasswordError && (
                <p className="field-error">{confirmarPasswordError}</p>
              )}
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
                    maxLength={20}
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
                    maxLength={150}
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
                    maxLength={20}
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
                    maxLength={30}
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
