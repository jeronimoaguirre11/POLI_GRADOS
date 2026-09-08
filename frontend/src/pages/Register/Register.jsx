import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";

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
  });
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const esEmpresa = form.rol === "EMPRESA";

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

  return (
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
  );
}
