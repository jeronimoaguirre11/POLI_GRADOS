import { useEffect, useRef } from "react";

// Ventana modal accesible: cierra con Escape o clic en el fondo, y enfoca el
// primer campo al abrir.
export default function Modal({ titulo, descripcion, onCerrar, children }) {
  const contenedor = useRef(null);
  // Se guarda en una ref para que el efecto corra solo al abrir: si
  // dependiera de onCerrar, el foco saltaria al primer campo en cada render.
  const cerrarRef = useRef(onCerrar);
  cerrarRef.current = onCerrar;

  useEffect(() => {
    function alPresionar(e) {
      if (e.key === "Escape") cerrarRef.current();
    }
    document.addEventListener("keydown", alPresionar);
    document.body.style.overflow = "hidden";
    contenedor.current
      ?.querySelector("input, select, button:not(.modal-close)")
      ?.focus();
    return () => {
      document.removeEventListener("keydown", alPresionar);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className="modal-fondo"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onCerrar();
      }}
    >
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-titulo"
        ref={contenedor}
      >
        <div className="modal-head">
          <div>
            <h2 id="modal-titulo">{titulo}</h2>
            {descripcion && <p>{descripcion}</p>}
          </div>
          <button
            type="button"
            className="modal-close"
            aria-label="Cerrar"
            onClick={onCerrar}
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
