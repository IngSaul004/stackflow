import { useState } from 'react'
import { registrarUsuario } from '../../services/almacen'
import './views.css'

const EMPTY = { username: '', password: '', nombre: '', rol: 'almacenista' }

export default function RegistrarUsuario({ usuario }) {
  const [form, setForm]       = useState(EMPTY)
  const [mensaje, setMensaje] = useState(null)

  if (usuario.rol !== 'admin') {
    return (
      <div className="view">
        <h2 className="view-title">Registrar Usuario</h2>
        <div className="alert alert--error">Solo los administradores pueden registrar nuevos usuarios.</div>
      </div>
    )
  }

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const result = registrarUsuario(form)
    if (result.ok) {
      setMensaje({ tipo: 'success', texto: `Usuario "${form.username}" registrado correctamente.` })
      setForm(EMPTY)
    } else {
      setMensaje({ tipo: 'error', texto: result.error })
    }
  }

  return (
    <div className="view">
      <h2 className="view-title">Registrar Usuario</h2>

      {mensaje && (
        <div className={`alert alert--${mensaje.tipo}`}>
          {mensaje.texto}
          <button className="alert-close" onClick={() => setMensaje(null)}>✕</button>
        </div>
      )}

      <div className="form-card">
        <form onSubmit={handleSubmit} className="view-form">
          <div className="form-group">
            <label>Nombre Completo</label>
            <input
              type="text" name="nombre" value={form.nombre}
              onChange={handleChange} required placeholder="Nombre y apellido"
            />
          </div>

          <div className="form-group">
            <label>Nombre de Usuario</label>
            <input
              type="text" name="username" value={form.username}
              onChange={handleChange} required placeholder="usuario123"
              autoComplete="off"
            />
          </div>

          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password" name="password" value={form.password}
              onChange={handleChange} required placeholder="••••••••"
              autoComplete="new-password"
            />
          </div>

          <div className="form-group">
            <label>Rol</label>
            <select name="rol" value={form.rol} onChange={handleChange}>
              <option value="almacenista">Almacenista</option>
              <option value="admin">Administrador</option>
            </select>
          </div>

          <button type="submit" className="btn-submit">Registrar Usuario</button>
        </form>
      </div>
    </div>
  )
}
