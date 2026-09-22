import "./Modalidad-Grado.css";

export default function Diplomado({ onVolver }) {
  return (
    <section className="modalidad-page">
      <button
        type="button"
        className="modalidad-back"
        onClick={onVolver}
      >
        ← Volver al dashboard
      </button>

      <div className="modalidad-hero">
        <div>
          <span className="modalidad-label">
            Modalidad de grado
          </span>

          <h1>Diplomado</h1>

          <p>
            Realiza un diplomado, curso o estudio complementario como opción
            para cumplir con tu proceso de trabajo de grado.
          </p>
        </div>

        <div className="modalidad-number">
          02
        </div>
      </div>

      <div className="modalidad-grid">
        <article className="modalidad-card">
          <div className="modalidad-card-heading">
            <span className="modalidad-card-icon">✓</span>

            <div>
              <span className="modalidad-card-small">
                Antes de comenzar
              </span>

              <h2>Requisitos</h2>
            </div>
          </div>

          <ul className="modalidad-list">
            <li>
              Tener matriculada la asignatura Trabajo de Grado.
            </li>

            <li>
              Buscar un diplomado, curso o estudio relacionado con tu
              formación académica.
            </li>

            <li>
              Verificar que el programa sea ofrecido por una institución
              reconocida.
            </li>

            <li>
              Reportar la información del diplomado al coordinador.
            </li>

            <li>
              Esperar la aprobación antes de continuar formalmente con esta
              modalidad.
            </li>
          </ul>
        </article>

        <article className="modalidad-card modalidad-summary">
          <span className="modalidad-card-small">
            Estado de la modalidad
          </span>

          <h2>¿Qué debes hacer?</h2>

          <p>
            Selecciona un diplomado, reúne la información correspondiente y
            presenta la solicitud para revisión y aprobación académica.
          </p>

          <div className="summary-status">
            <span></span>
            Registro de solicitud próximamente
          </div>
        </article>
      </div>

      <section className="proceso-section">
        <div className="proceso-heading">
          <span>Ruta académica</span>

          <h2>Proceso durante el semestre</h2>

          <p>
            Estas son las etapas generales para realizar un diplomado como
            opción de grado.
          </p>
        </div>

        <div className="proceso-timeline">
          <article className="proceso-step">
            <span className="proceso-number">1</span>

            <div>
              <h3>Buscar un diplomado</h3>

              <p>
                Identifica un programa relacionado con tu área de formación y
                que pueda ser presentado como opción de grado.
              </p>
            </div>
          </article>

          <article className="proceso-step">
            <span className="proceso-number">2</span>

            <div>
              <h3>Reunir la información</h3>

              <p>
                Registra el nombre del programa, institución, duración,
                modalidad y demás información relevante.
              </p>
            </div>
          </article>

          <article className="proceso-step">
            <span className="proceso-number">3</span>

            <div>
              <h3>Reportar al coordinador</h3>

              <p>
                Presenta la información para que sea revisada por el
                coordinador del proceso de grado.
              </p>
            </div>
          </article>

          <article className="proceso-step">
            <span className="proceso-number">4</span>

            <div>
              <h3>Esperar aprobación</h3>

              <p>
                La institución revisará la solicitud antes de autorizar esta
                modalidad.
              </p>
            </div>
          </article>

          <article className="proceso-step">
            <span className="proceso-number">5</span>

            <div>
              <h3>Realizar el diplomado</h3>

              <p>
                Una vez aprobado, podrás continuar con el programa durante el
                semestre académico.
              </p>
            </div>
          </article>
        </div>
      </section>
    </section>
  );
}