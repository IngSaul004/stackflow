import { useState } from 'react'
import './App.css'
import logoimg from './assets/logo.png'
import Dashboard from './Dashboard'
import { login, logout, getSession } from './services/auth'

function App() {
  const [usuario, setUsuario]         = useState(() => getSession())
  const [usernameInput, setUsername]  = useState('')
  const [passwordInput, setPassword]  = useState('')
  const [error, setError]             = useState('')
  const [loading, setLoading]         = useState(false)

  function inicioSesion(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Pequeño delay para simular validación
    setTimeout(() => {
      const result = login(usernameInput, passwordInput)
      if (result.ok) {
        setUsuario(result.user)
      } else {
        setError(result.error)
      }
      setLoading(false)
    }, 400)
  }

  function cerrarSesion() {
    logout()
    setUsuario(null)
    setUsername('')
    setPassword('')
    setError('')
  }

  if (usuario) {
    return <Dashboard usuario={usuario} onLogout={cerrarSesion} />
  }

  return (
    <div className="login-wrapper">
      <div className="inicioSesion">
        <img src={logoimg} alt="Logo STACKFLOW" />
        <h1>STACKFLOW</h1>
        <p className="login-subtitle">Control de Salidas de Almacén</p>

        {error && <div className="login-error">{error}</div>}

        <form onSubmit={inicioSesion}>
          <input
            type="text"
            placeholder="Usuario"
            value={usernameInput}
            onChange={e => setUsername(e.target.value)}
            autoComplete="username"
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={passwordInput}
            onChange={e => setPassword(e.target.value)}
            autoComplete="current-password"
            disabled={loading}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Verificando...' : 'Iniciar Sesión'}
          </button>
        </form>

        <p className="login-hint">
          admin / admin123 &nbsp;·&nbsp; almacenista / almacen2024
        </p>
      </div>
    </div>
  )
}

export default App
