import { useState } from "react";
import { restablecerContrasenaUsuario } from "../api/administracion.js";
import { ETIQUETAS_ROL, validarPassword } from "../roles.js";
import Modal from "./Modal.jsx";

// Genera una contrasena que cumple la politica (10 caracteres, con
// mayuscula, minuscula y numero). Evita caracteres que se confunden (0/O, 1/l).
function generarContrasena() {
  const mayusculas = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const minusculas = "abcdefghijkmnpqrstuvwxyz";
  const numeros = "23456789";
  const todos = mayusculas + minusculas + numeros;
  const azar = (texto) => {
    const indice = crypto.getRandomValues(new Uint32Array(1))[0] % texto.length;
    return texto[indice];
  };
  const letras = [azar(mayusculas), azar(minusculas), azar(numeros)];
  while (letras.length < 10) letras.push(azar(todos));
  // Mezcla para que la mayuscula y el numero no queden siempre al inicio.
  for (let i = letras.length - 1; i > 0; i--) {
    const j = crypto.getRandomValues(new Uint32Array(1))[0] % (i + 1);
    [letras[i], letras[j]] = [letras[j], letras[i]];
  }
  return letras.join("");
}

// El super administrador asigna una contrasena nueva a otra cuenta, por
// ejemplo cuando la persona la olvido. No necesita la contrasena anterior.
export default function RestablecerContrasena({
  cuenta,
  onCerrar,
  onCambiada,
  onSesionInvalida,
}) {
  const [nueva, setNueva] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);

  const errorNueva = validarPassword(nueva);
  const errorConfirmar =
    confirmar && confirmar !== nueva ? "Las contraseñas no coinciden" : "";

  function generar() {
    const clave = generarContrasena();
    setNueva(clave);
    setConfirmar(clave);
    setVisible(true);
  }

  async function enviar(e) {
    e.preventDefault();
    setError("");
    if (!nueva || errorNueva || errorConfirmar || nueva !== confirmar) return;

    setEnviando(true);
    try {
      await restablecerContrasenaUsuario(cuenta.id, nueva);
      onCambiada(cuenta, nueva);
    } catch (err) {
      if (!(err.status === 401 && onSesionInvalida(err))) {
        setError(err.message || "No fue posible cambiar la contraseña.");
      }
      setEnviando(false);
    }
  }

  return (
    <Modal
      titulo="Cambiar contraseña de la cuenta"
      descripcion={`${cuenta.nombre} · ${cuenta.email} · ${ETIQUETAS_ROL[cuenta.rol] ?? cuenta.rol}`}
      onCerrar={onCerrar}
    >
      <form className="form" onSubmit={enviar}>
        <div className="grid una-columna">
          <div className="campo">
            <div className="campo-cabecera">
              <label htmlFor="claveNueva">Nueva contraseña</label>
              <button type="button" className="link-button" onClick={generar}>
                Generar una segura
              </button>
            </div>
            <div className="con-boton">
              <input
                id="claveNueva"
                type={visible ? "text" : "password"}
                value={nueva}
                onChange={(e) => setNueva(e.target.value)}
                required
                maxLength={15}
                autoComplete="new-password"
                aria-invalid={Boolean(errorNueva)}
              />
              <button
                type="button"
                className="ver"
                onClick={() => setVisible((v) => !v)}
                aria-label={visible ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {visible ? "Ocultar" : "Mostrar"}
              </button>
            </div>
            {errorNueva ? (
              <small className="campo-error">{errorNueva}</small>
            ) : (
              <small>8 a 15 caracteres, una mayúscula y un número.</small>
            )}
          </div>
          <div className="campo">
            <label htmlFor="claveConfirmar">Confirmar contraseña</label>
            <input
              id="claveConfirmar"
              type={visible ? "text" : "password"}
              value={confirmar}
              onChange={(e) => setConfirmar(e.target.value)}
              required
              maxLength={15}
              autoComplete="new-password"
              aria-invalid={Boolean(errorConfirmar)}
            />
            {errorConfirmar && (
              <small className="campo-error">{errorConfirmar}</small>
            )}
          </div>
        </div>

        <p className="nota">
          Comunícale la contraseña nueva a la persona. Podrá cambiarla después
          desde su perfil.
        </p>

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
            disabled={
              enviando || !nueva || Boolean(errorNueva) || nueva !== confirmar
            }
          >
            {enviando ? "Guardando…" : "Guardar contraseña"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
