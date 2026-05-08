import { useState } from 'react'
import { registrarMaterial } from '../../services/almacen'
import './views.css'

const CATEGORIAS = ['Plomería', 'Eléctrico', 'Construcción', 'Ferretería', 'Herramientas', 'Otro']
const EMPTY = { nombre: '', categoria: '', stock: '', unidad: '', stockMinimo: '' }

export default function RegistrarMaterial() {
  const [form, setForm]       = useState(EMPTY)
  const [mensaje, setMensaje] = useState(null)

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const result = registrarMaterial(form)
    if (result.ok) {
      setMensaje({ tipo: 'success', texto: `Material registrado: ${result.material.codigo} — ${result.material.nombre}` })
      setForm(EMPTY)
    } else {
      setMensaje({ tipo: 'error', texto: result.error })
    }
  }

  return (
    <div className="view">
      <h2 className="view-title">Registrar Material</h2>

      {mensaje && (
        <div className={`alert alert--${mensaje.tipo}`}>
          {mensaje.texto}
          <button className="alert-close" onClick={() => setMensaje(null)}>✕</button>
        </div>
      )}

      <div className="form-card">
        <form onSubmit={handleSubmit} className="view-form">
          <div className="form-group">
            <label>Nombre del Material</label>
            <input
              type="text" name="nombre" value={form.nombre}
              onChange={handleChange} required placeholder='Ej. Tubo PVC 2"'
            />
          </div>

          <div className="form-group">
            <label>Categoría</label>
            <select name="categoria" value={form.categoria} onChange={handleChange} required>
              <option value="">Seleccionar categoría...</option>
              {CATEGORIAS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Stock Inicial</label>
              <input
                type="number" name="stock" value={form.stock}
                onChange={handleChange} min="0" required placeholder="0"
              />
            </div>
            <div className="form-group">
              <label>Unidad</label>
              <input
                type="text" name="unidad" value={form.unidad}
                onChange={handleChange} required placeholder="pzas, mts, kg..."
              />
            </div>
          </div>

          <div className="form-group">
            <label>Stock Mínimo (alerta)</label>
            <input
              type="number" name="stockMinimo" value={form.stockMinimo}
              onChange={handleChange} min="0" placeholder="10"
            />
          </div>

          <button type="submit" className="btn-submit">Registrar Material</button>
        </form>
      </div>
    </div>
  )
}
