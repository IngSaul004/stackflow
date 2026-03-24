import './App.css'
import logoimg from './assets/logo.png'
import Dashboard from './dashboard'
import { useState } from 'react'

function App() {
  const [usuario, setUsuario] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [logueado, setLogueado] = useState(false)

  function inicioSesion(e) {
    e.preventDefault() 

    const usuarioValido = 'admin'
    const contrasenaValida = 'admin123'

    if (
      usuario === usuarioValido &&
      contrasena === contrasenaValida
    ) {
      setLogueado(true) 
    } else {
      alert('Usuario o contraseña incorrectos')
    }
  }

  return (
    <>
      {logueado ? (
        <Dashboard />
      ) : (
        <div className='inicioSesion'>
          <img src={logoimg} alt="Logo" />
          <h1>Salidas Almacen</h1>
          <h2>Bienvenid@</h2>

          <form onSubmit={inicioSesion}>
            <input
              type="text"
              placeholder="Usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />

            <input
              type="password"
              placeholder="Contraseña"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
            />

            <button type="submit">Iniciar Sesión</button>
          </form>
        </div>
      )}
    </>
  )
}

export default App
