import { useState } from "react";
import { cambiarMiContrasena } from "../api/administracion.js";
import { validarPassword } from "../roles.js";
import Modal from "./Modal.jsx";

// Pensado sobre todo para el primer ingreso: el super administrador inicial
// se crea con la contrasena de docker-compose y conviene cambiarla.
export default function CambiarContrasena({ onCerrar, onCambiada }) {
  const [actual, setActual] = useState("");
  const [nueva, setNueva] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);

  const errorNueva = validarPassword(nueva);
  const errorConfirmar =
    confirmar && confirmar !== nueva ? "Las contraseñas no coinciden" : "";

  async function enviar(e) {
    e.preventDefault();
    setError("");
    if (errorNueva || errorConfirmar || !nueva) return;

    setEnviando(true);
    try {
      await cambiarMiContrasena(actual, nueva);
      onCambiada();
    } catch (err) {
      setError(err.message || "No fue posible cambiar la contraseña.");
      setEnviando(false);
    }
  }

  return (
    <Modal titulo="Cambiar contraseña" onCerrar={onCerrar}>
      <form className="form" onSubmit={enviar}>
        <div className="grid una-columna">
          <div className="campo">
            <label htmlFor="passwordActual">Contraseña actual</label>
            <input
              id="passwordActual"
              type="password"
              value={actual}
              onChange={(e) => setActual(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          <div className="campo">
            <label htmlFor="passwordNueva">Nueva contraseña</label>
            <input
              id="passwordNueva"
              type="password"
              value={nueva}
              onChange={(e) => setNueva(e.target.value)}
              required
              maxLength={15}
              autoComplete="new-password"
              aria-invalid={Boolean(errorNueva)}
            />
            {errorNueva ? (
              <small className="campo-error">{errorNueva}</small>
            ) : (
              <small>8 a 15 caracteres, una mayúscula y un número.</small>
            )}
          </div>
          <div className="campo">
            <label htmlFor="passwordConfirmar">Confirmar nueva contraseña</label>
            <input
              id="passwordConfirmar"
              type="password"
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
            disabled={enviando || Boolean(errorNueva) || Boolean(errorConfirmar)}
          >
            {enviando ? "Guardando…" : "Guardar contraseña"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
