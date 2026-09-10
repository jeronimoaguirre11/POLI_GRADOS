import "./Modalidad-Grado.css";

export default function Investigacion({ onVolver }) {
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

          <h1>Trabajo de Investigación</h1>

          <p>
            Desarrolla tu trabajo de grado mediante una propuesta de
            investigación vinculada a un grupo de investigación.
          </p>
        </div>

        <div className="modalidad-number">
          01
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
              Pertenecer previamente a un grupo de investigación.
            </li>

            <li>
              Tener definida una idea o propuesta de investigación.
            </li>

            <li>
              Contar con disponibilidad para desarrollar el proyecto
              durante el semestre académico.
            </li>
          </ul>
        </article>

        <article className="modalidad-card modalidad-summary">
          <span className="modalidad-card-small">
            Estado de la modalidad
          </span>

          <h2>¿Qué debes hacer?</h2>

          <p>
            Verifica primero que cumples los requisitos académicos.
            Posteriormente deberás presentar la propuesta correspondiente
            para iniciar formalmente el proceso.
          </p>

          <div className="summary-status">
            <span></span>

            Registro del proceso próximamente
          </div>
        </article>
      </div>

      <section className="proceso-section">
        <div className="proceso-heading">
          <span>Ruta académica</span>

          <h2>Proceso durante el semestre</h2>

          <p>
            Estas son las etapas generales que debe seguir el estudiante.
          </p>
        </div>

        <div className="proceso-timeline">
          <article className="proceso-step">
            <span className="proceso-number">1</span>

            <div>
              <h3>Verificar requisitos</h3>

              <p>
                Confirma que tienes matriculada la asignatura y haces
                parte de un grupo de investigación.
              </p>
            </div>
          </article>

          <article className="proceso-step">
            <span className="proceso-number">2</span>

            <div>
              <h3>Definir la propuesta</h3>

              <p>
                Establece la idea, problema o temática que deseas
                desarrollar durante el semestre.
              </p>
            </div>
          </article>

          <article className="proceso-step">
            <span className="proceso-number">3</span>

            <div>
              <h3>Presentar la propuesta</h3>

              <p>
                Entrega la información correspondiente para su revisión
                académica.
              </p>
            </div>
          </article>

          <article className="proceso-step">
            <span className="proceso-number">4</span>

            <div>
              <h3>Realizar seguimiento</h3>

              <p>
                Una vez aprobado el proceso, desarrolla el proyecto con
                el acompañamiento académico asignado.
              </p>
            </div>
          </article>
        </div>
      </section>
    </section>
  );
}