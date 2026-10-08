import { useEffect, useMemo, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import { obtenerMiPerfil, obtenerMisEstudiantes } from './api/docentes'
import './pages/Dashboard/Dashboard-Docente.css'

function formatearTexto(valor) {
  if (!valor) return 'No registrado'

  return String(valor)
    .toLowerCase()
    .split('_')
    .map((palabra) => palabra.charAt(0).toUpperCase() + palabra.slice(1))
    .join(' ')
}

function etiquetaModalidad(tipo) {
  const etiquetas = {
    PRACTICAS: 'Prácticas',
    DIPLOMADO: 'Diplomado',
    INVESTIGACION: 'Investigación',
  }

  return etiquetas[tipo] || formatearTexto(tipo)
}

function ModalidadesEstudiante({ estudiante }) {
  const modalidades = Array.isArray(estudiante.modalidades)
    ? estudiante.modalidades
    : []
  const serviciosNoDisponibles = Array.isArray(
    estudiante.serviciosModalidadNoDisponibles,
  )
    ? estudiante.serviciosModalidadNoDisponibles
    : []

  return (
    <div className="modalidades-lista">
      {modalidades.map((modalidad, indice) => (
        <div
          className={`modalidad-item modalidad-${String(modalidad.tipo).toLowerCase()}`}
          key={`${modalidad.tipo}-${modalidad.titulo}-${indice}`}
        >
          <div className="modalidad-cabecera">
            <span className="modalidad-tipo">
              {etiquetaModalidad(modalidad.tipo)}
            </span>
            <span className="modalidad-estado">
              {formatearTexto(modalidad.estado)}
            </span>
          </div>
          <strong>{modalidad.titulo || 'Proceso sin nombre'}</strong>
          {modalidad.detalle && <small>{modalidad.detalle}</small>}
        </div>
      ))}

      {modalidades.length === 0 && serviciosNoDisponibles.length === 0 && (
        <span className="modalidad-vacia">Sin modalidad activa</span>
      )}

      {serviciosNoDisponibles.length > 0 && (
        <span className="modalidad-advertencia">
          No fue posible verificar:{' '}
          {serviciosNoDisponibles.map(etiquetaModalidad).join(', ')}.
        </span>
      )}
    </div>
  )
}

function DashboardDocente() {
  const [perfil, setPerfil] = useState(null)
  const [estudiantes, setEstudiantes] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  const usuario = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('usuario') || '{}')
    } catch {
      return {}
    }
  }, [])

  useEffect(() => {
    async function cargarDatos() {
      try {
        setCargando(true)
        setError('')

        const [perfilDocente, estudiantesAsignados] = await Promise.all([
          obtenerMiPerfil(),
          obtenerMisEstudiantes(),
        ])

        setPerfil(perfilDocente)
        setEstudiantes(
          Array.isArray(estudiantesAsignados) ? estudiantesAsignados : [],
        )
      } catch (err) {
        setError(err.message || 'No fue posible cargar la informacion del docente')
      } finally {
        setCargando(false)
      }
    }

    cargarDatos()
  }, [])

  function cerrarSesion() {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')

    const authUrl =
      import.meta.env.VITE_AUTH_URL || 'http://localhost:5173'

    window.location.href = authUrl
  }

  return (
    <div className="docente-app">
      <header className="docente-header">
        <div className="marca">
          <div className="marca-icono">TG</div>

          <div>
            <h1>TrabajoGrado</h1>
            <span>Portal academico</span>
          </div>
        </div>

        <div className="usuario-header">
          <div className="usuario-datos">
            <strong>{usuario.nombre || 'Docente'}</strong>
            <span>DOCENTE</span>
          </div>

          <button type="button" className="boton-salir" onClick={cerrarSesion}>
            Cerrar sesion
          </button>
        </div>
      </header>

      <main className="docente-contenido">
        <section className="bienvenida">
          <span className="etiqueta">PORTAL DEL DOCENTE</span>

          <h2>Hola, {usuario.nombre || 'Docente'}</h2>

          <p>
            Consulta tu informacion academica y los estudiantes que tienes
            asignados para acompañamiento de trabajo de grado.
          </p>
        </section>

        {cargando && (
          <div className="estado-mensaje">
            Cargando informacion del docente...
          </div>
        )}

        {!cargando && error && (
          <div className="estado-mensaje estado-error">{error}</div>
        )}

        {!cargando && !error && perfil && (
          <>
            <section className="tarjeta">
              <div className="tarjeta-encabezado">
                <div>
                  <span className="subtitulo">MI PERFIL</span>
                  <h3>Informacion del docente</h3>
                </div>
              </div>

              <div className="perfil-grid">
                <div className="dato">
                  <span>Identificacion</span>
                  <strong>{perfil.identificacion || 'No registrada'}</strong>
                </div>

                <div className="dato">
                  <span>Programa</span>
                  <strong>{formatearTexto(perfil.programa)}</strong>
                </div>

                <div className="dato">
                  <span>Especialidad</span>
                  <strong>{formatearTexto(perfil.especialidad)}</strong>
                </div>
              </div>
            </section>

            <section className="tarjeta">
              <div className="tarjeta-encabezado">
                <div>
                  <span className="subtitulo">ACOMPAÑAMIENTO</span>
                  <h3>Estudiantes asignados</h3>
                </div>

                <div className="contador-estudiantes">
                  {estudiantes.length}
                </div>
              </div>

              {estudiantes.length === 0 ? (
                <div className="sin-estudiantes">
                  Actualmente no tienes estudiantes asignados.
                </div>
              ) : (
                <div className="tabla-contenedor">
                  <table>
                    <thead>
                      <tr>
                        <th>Codigo</th>
                        <th>Programa</th>
                        <th>Semestre</th>
                        <th>Proceso academico</th>
                      </tr>
                    </thead>

                    <tbody>
                      {estudiantes.map((estudiante) => (
                        <tr key={estudiante.id}>
                          <td>{estudiante.codigo || 'No registrado'}</td>
                          <td>{formatearTexto(estudiante.programa)}</td>
                          <td>
                            {estudiante.semestre ?? 'No registrado'}
                          </td>
                          <td>
                            <ModalidadesEstudiante estudiante={estudiante} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ProtectedRoute>
        <DashboardDocente />
      </ProtectedRoute>
    </BrowserRouter>
  )
}
