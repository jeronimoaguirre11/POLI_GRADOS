import { useEffect, useState } from 'react'
import { crearOferta, ingresarEmpresa, listarOfertas } from '../api/empresas.js'
import './EmpresaPortal.css'

const EMPRESA_STORAGE_KEY = 'poligrados_empresa'

function leerEmpresaGuardada() {
  try {
    const guardada = localStorage.getItem(EMPRESA_STORAGE_KEY)
    return guardada ? JSON.parse(guardada) : null
  } catch {
    return null
  }
}

function guardarEmpresa(empresa) {
  try {
    localStorage.setItem(EMPRESA_STORAGE_KEY, JSON.stringify(empresa))
  } catch {
    // localStorage no disponible: no es critico, solo se pierde la sesion al recargar
  }
}

function IngresoEmpresa({ onIngreso }) {
  const [email, setEmail] = useState('')
  const [nombre, setNombre] = useState('')
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setCargando(true)
    try {
      const empresa = await ingresarEmpresa({ email, nombre })
      onIngreso(empresa)
    } catch (err) {
      setError(err.message || 'No se pudo ingresar. Verifica que el backend este corriendo.')
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className="empresa-portal">
      <div className="empresa-card">
        <h1>Portal de empresas</h1>
        <p className="empresa-subtitle">
          Ingresa con el correo de tu empresa para publicar ofertas de practica.
        </p>
        <form onSubmit={handleSubmit} className="empresa-form">
          <label>
            Correo de la empresa
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="contacto@empresa.com"
            />
          </label>
          <label>
            Nombre de la empresa
            <input
              type="text"
              required
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Empresa S.A.S."
            />
          </label>
          {error && <p className="empresa-error">{error}</p>}
          <button type="submit" disabled={cargando}>
            {cargando ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
        <p className="empresa-note">
          Nota: este ingreso es temporal, mientras el equipo construye el login real con contraseña.
        </p>
      </div>
    </div>
  )
}

function FormularioOferta({ empresaId, onCreada }) {
  const [titulo, setTitulo] = useState('')
  const [perfilBuscado, setPerfilBuscado] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setCargando(true)
    try {
      await crearOferta(empresaId, { titulo, perfilBuscado, descripcion })
      setTitulo('')
      setPerfilBuscado('')
      setDescripcion('')
      onCreada()
    } catch (err) {
      setError(err.message || 'No se pudo publicar la oferta.')
    } finally {
      setCargando(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="empresa-form empresa-form-oferta">
      <h2>Publicar nueva oferta</h2>
      <label>
        Titulo de la oferta
        <input
          type="text"
          required
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Practicante de desarrollo de software"
        />
      </label>
      <label>
        Perfil que buscan
        <textarea
          required
          rows={3}
          value={perfilBuscado}
          onChange={(e) => setPerfilBuscado(e.target.value)}
          placeholder="Estudiante de ultimos semestres, conocimientos en..."
        />
      </label>
      <label>
        Descripcion (opcional)
        <textarea
          rows={3}
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Funciones, horario, modalidad..."
        />
      </label>
      {error && <p className="empresa-error">{error}</p>}
      <button type="submit" disabled={cargando}>
        {cargando ? 'Publicando...' : 'Publicar oferta'}
      </button>
    </form>
  )
}

function ListaOfertas({ ofertas }) {
  if (ofertas === null) return <p className="empresa-subtitle">Cargando ofertas...</p>
  if (ofertas.length === 0) {
    return <p className="empresa-subtitle">Todavia no has publicado ninguna oferta.</p>
  }

  return (
    <ul className="empresa-lista-ofertas">
      {ofertas.map((oferta) => (
        <li key={oferta.id}>
          <div className="empresa-lista-ofertas-header">
            <strong>{oferta.titulo}</strong>
            <span className={`empresa-estado empresa-estado-${oferta.estado.toLowerCase()}`}>
              {oferta.estado}
            </span>
          </div>
          <p>{oferta.perfilBuscado}</p>
        </li>
      ))}
    </ul>
  )
}

function DashboardEmpresa({ empresa, onSalir }) {
  const [ofertas, setOfertas] = useState(null)

  async function cargarOfertas() {
    try {
      const data = await listarOfertas(empresa.id)
      setOfertas(data)
    } catch {
      setOfertas([])
    }
  }

  useEffect(() => {
    cargarOfertas()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [empresa.id])

  return (
    <div className="empresa-portal">
      <div className="empresa-dashboard">
        <header className="empresa-dashboard-header">
          <div>
            <h1>{empresa.nombre}</h1>
            <p className="empresa-subtitle">{empresa.email}</p>
          </div>
          <button type="button" onClick={onSalir} className="empresa-salir">
            Salir
          </button>
        </header>

        <div className="empresa-dashboard-grid">
          <FormularioOferta empresaId={empresa.id} onCreada={cargarOfertas} />
          <div>
            <h2>Tus ofertas publicadas</h2>
            <ListaOfertas ofertas={ofertas} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function EmpresaPortal() {
  const [empresa, setEmpresa] = useState(leerEmpresaGuardada)

  function handleIngreso(nuevaEmpresa) {
    setEmpresa(nuevaEmpresa)
    guardarEmpresa(nuevaEmpresa)
  }

  function handleSalir() {
    setEmpresa(null)
    try {
      localStorage.removeItem(EMPRESA_STORAGE_KEY)
    } catch {
      // no es critico
    }
  }

  return empresa ? (
    <DashboardEmpresa empresa={empresa} onSalir={handleSalir} />
  ) : (
    <IngresoEmpresa onIngreso={handleIngreso} />
  )
}
