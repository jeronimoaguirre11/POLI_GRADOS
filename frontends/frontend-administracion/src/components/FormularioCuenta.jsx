import { useState } from "react";
import { crearUsuario } from "../api/administracion.js";
import {
  ETIQUETAS_ROL,
  PROGRAMAS,
  TIPOS_CUENTA,
  validarPassword,
} from "../roles.js";
import Modal from "./Modal.jsx";

const VACIO = {
  nombre: "",
  email: "",
  password: "",
  confirmarPassword: "",
  identificacion: "",
  programa: "",
  especialidad: "",
  codigo: "",
  semestre: "",
  nombreEmpresa: "",
  nit: "",
  sector: "",
};

// Arma el body que espera administracion-service para cada tipo de cuenta.
// Los campos opcionales vacios no se envian.
function construirCuerpo(rol, form) {
  const base = {
    nombre: form.nombre.trim(),
    email: form.email.trim(),
    password: form.password,
  };
  const opcional = (clave, valor) =>
    valor.trim() ? { [clave]: valor.trim() } : {};

  switch (rol) {
    case "DOCENTE":
      return {
        ...base,
        identificacion: form.identificacion.trim(),
        ...opcional("programa", form.programa),
        ...opcional("especialidad", form.especialidad),
      };
    case "ESTUDIANTE":
      return {
        ...base,
        codigo: form.codigo.trim(),
        programa: form.programa,
        ...(form.semestre ? { semestre: Number(form.semestre) } : {}),
      };
    case "EMPRESA":
      return {
        ...base,
        nombreEmpresa: form.nombreEmpresa.trim(),
        nit: form.nit.trim(),
        sector: form.sector.trim(),
      };
    default:
      return base;
  }
}

export default function FormularioCuenta({ onCerrar, onCreada, onSesionInvalida }) {
  const [tipo, setTipo] = useState(TIPOS_CUENTA[0]);
  const [form, setForm] = useState(VACIO);
  const [errorPassword, setErrorPassword] = useState("");
  const [errorConfirmar, setErrorConfirmar] = useState("");
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);

  const rol = tipo.rol;

  function cambiar(e) {
    const { name, value } = e.target;
    const nuevo = { ...form, [name]: value };
    setForm(nuevo);

    if (name === "password") {
      setErrorPassword(validarPassword(value));
      if (nuevo.confirmarPassword) {
        setErrorConfirmar(
          value === nuevo.confirmarPassword ? "" : "Las contraseñas no coinciden",
        );
      }
    }
    if (name === "confirmarPassword") {
      setErrorConfirmar(
        value === nuevo.password ? "" : "Las contraseñas no coinciden",
      );
    }
  }

  function elegirTipo(nuevoTipo) {
    setTipo(nuevoTipo);
    setError("");
    // El programa significa cosas distintas para docente (texto libre) y
    // estudiante (lista cerrada), asi que se limpia al cambiar de tipo.
    setForm((actual) => ({ ...actual, programa: "" }));
  }

  async function enviar(e) {
    e.preventDefault();
    setError("");

    const fallaPassword = validarPassword(form.password);
    if (fallaPassword) {
      setErrorPassword(fallaPassword);
      return;
    }
    if (form.password !== form.confirmarPassword) {
      setErrorConfirmar("Las contraseñas no coinciden");
      return;
    }

    setEnviando(true);
    try {
      const creada = await crearUsuario(tipo.ruta, construirCuerpo(rol, form));
      onCreada({ ...creada, rol: creada.rol ?? rol });
    } catch (err) {
      if (!(err.status === 401 && onSesionInvalida(err))) {
        setError(err.message || "No fue posible crear la cuenta.");
      }
      setEnviando(false);
    }
  }

  return (
    <Modal
      titulo="Crear cuenta"
      descripcion="La persona podrá iniciar sesión de inmediato con el correo y la contraseña que definas."
      onCerrar={onCerrar}
    >
      <form className="form" onSubmit={enviar} noValidate={false}>
        <fieldset className="tipos">
          <legend>Tipo de cuenta</legend>
          {TIPOS_CUENTA.map((opcion) => (
            <label
              key={opcion.rol}
              className={`tipo ${opcion.rol === rol ? "activo" : ""}`}
            >
              <input
                type="radio"
                name="tipo"
                value={opcion.rol}
                checked={opcion.rol === rol}
                onChange={() => elegirTipo(opcion)}
              />
              <strong>{ETIQUETAS_ROL[opcion.rol]}</strong>
              <span>{opcion.descripcion}</span>
            </label>
          ))}
        </fieldset>

        <div className="grid">
          <Campo label="Nombre completo" name="nombre">
            <input
              id="nombre"
              name="nombre"
              value={form.nombre}
              onChange={cambiar}
              required
              maxLength={50}
              autoComplete="off"
            />
          </Campo>
          <Campo label="Correo" name="email">
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={cambiar}
              required
              maxLength={50}
              autoComplete="off"
              placeholder="nombre@elpoli.edu.co"
            />
          </Campo>
          <Campo
            label="Contraseña"
            name="password"
            error={errorPassword}
            ayuda="8 a 15 caracteres, una mayúscula y un número."
          >
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={cambiar}
              required
              minLength={8}
              maxLength={15}
              autoComplete="new-password"
              aria-invalid={Boolean(errorPassword)}
            />
          </Campo>
          <Campo
            label="Confirmar contraseña"
            name="confirmarPassword"
            error={errorConfirmar}
          >
            <input
              id="confirmarPassword"
              name="confirmarPassword"
              type="password"
              value={form.confirmarPassword}
              onChange={cambiar}
              required
              maxLength={15}
              autoComplete="new-password"
              aria-invalid={Boolean(errorConfirmar)}
            />
          </Campo>

          {rol === "DOCENTE" && (
            <>
              <Campo label="Identificación" name="identificacion">
                <input
                  id="identificacion"
                  name="identificacion"
                  value={form.identificacion}
                  onChange={cambiar}
                  required
                  maxLength={20}
                />
              </Campo>
              <Campo label="Programa (opcional)" name="programa">
                <input
                  id="programa"
                  name="programa"
                  value={form.programa}
                  onChange={cambiar}
                  maxLength={100}
                />
              </Campo>
              <Campo label="Especialidad (opcional)" name="especialidad" ancho>
                <input
                  id="especialidad"
                  name="especialidad"
                  value={form.especialidad}
                  onChange={cambiar}
                  maxLength={100}
                />
              </Campo>
            </>
          )}

          {rol === "ESTUDIANTE" && (
            <>
              <Campo label="Código" name="codigo">
                <input
                  id="codigo"
                  name="codigo"
                  value={form.codigo}
                  onChange={cambiar}
                  required
                  maxLength={20}
                />
              </Campo>
              <Campo label="Semestre (opcional)" name="semestre">
                <input
                  id="semestre"
                  name="semestre"
                  type="number"
                  min={1}
                  max={12}
                  value={form.semestre}
                  onChange={cambiar}
                />
              </Campo>
              <Campo label="Programa" name="programa" ancho>
                <select
                  id="programa"
                  name="programa"
                  value={form.programa}
                  onChange={cambiar}
                  required
                >
                  <option value="" disabled>
                    Selecciona el programa
                  </option>
                  {PROGRAMAS.map((p) => (
                    <option key={p.value} value={p.value}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </Campo>
            </>
          )}

          {rol === "EMPRESA" && (
            <>
              <Campo label="Nombre de la empresa" name="nombreEmpresa" ancho>
                <input
                  id="nombreEmpresa"
                  name="nombreEmpresa"
                  value={form.nombreEmpresa}
                  onChange={cambiar}
                  required
                  maxLength={150}
                />
              </Campo>
              <Campo label="NIT" name="nit">
                <input
                  id="nit"
                  name="nit"
                  value={form.nit}
                  onChange={cambiar}
                  required
                  maxLength={20}
                  placeholder="900123456-7"
                />
              </Campo>
              <Campo label="Sector" name="sector">
                <input
                  id="sector"
                  name="sector"
                  value={form.sector}
                  onChange={cambiar}
                  required
                  maxLength={30}
                />
              </Campo>
            </>
          )}
        </div>

        {rol === "SUPERADMIN" && (
          <p className="nota">
            Un super administrador tiene acceso total a este panel, incluido
            crear y desactivar otras cuentas.
          </p>
        )}

        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}

        <div className="form-actions">
          <button type="button" onClick={onCerrar} disabled={enviando}>
            Cancelar
          </button>
          <button
            type="submit"
            className="primario"
            disabled={enviando || Boolean(errorPassword) || Boolean(errorConfirmar)}
          >
            {enviando ? "Creando…" : `Crear ${ETIQUETAS_ROL[rol].toLowerCase()}`}
          </button>
        </div>
      </form>
    </Modal>
  );
}

function Campo({ label, name, error, ayuda, ancho, children }) {
  return (
    <div className={`campo ${ancho ? "ancho" : ""}`}>
      <label htmlFor={name}>{label}</label>
      {children}
      {error ? (
        <small className="campo-error">{error}</small>
      ) : (
        ayuda && <small>{ayuda}</small>
      )}
    </div>
  );
}
