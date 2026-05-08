import { useState } from 'react'
import { getMateriales, registrarSalida } from '../../services/almacen'
import './views.css'

const EMPTY = { materialId: '', cantidad: '', solicitante: '', area: '' }

export default function GenerarSalida({ usuario }) {
  const [materiales] = useState(() => getMateriales())
  const [form, setForm]       = useState(EMPTY)
  const [mensaje, setMensaje] = useState(null)

  const materialSel = materiales.find(m => m.id === Number(form.materialId))

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const result = registrarSalida({ ...form, entregadoPor: usuario.username })
    if (result.ok) {
      setMensaje({ tipo: 'success', texto: `Salida registrada con folio ${result.salida.folio}` })
      setForm(EMPTY)
    } else {
      setMensaje({ tipo: 'error', texto: result.error })
    }
  }

  return (
    <div className="view">
      <h2 className="view-title">Generar Salida</h2>

      {mensaje && (
        <div className={`alert alert--${mensaje.tipo}`}>
          {mensaje.texto}
          <button className="alert-close" onClick={() => setMensaje(null)}>✕</button>
        </div>
      )}

      <div className="form-card">
        <form onSubmit={handleSubmit} className="view-form">
          <div className="form-group">
            <label>Material</label>
            <select name="materialId" value={form.materialId} onChange={handleChange} required>
              <option value="">Seleccionar material...</option>
              {materiales.map(m => (
                <option key={m.id} value={m.id}>
                  {m.codigo} — {m.nombre} (Stock: {m.stock} {m.unidad})
                </option>
              ))}
            </select>
          </div>

          {materialSel && (
            <div className="info-box">
              <span>Stock disponible</span>
              <strong>{materialSel.stock} {materialSel.unidad}</strong>
            </div>
          )}

          <div className="form-group">
            <label>Cantidad</label>
            <input
              type="number" name="cantidad" value={form.cantidad}
              onChange={handleChange} min="1" required placeholder="0"
            />
          </div>

          <div className="form-group">
            <label>Solicitante</label>
            <input
              type="text" name="solicitante" value={form.solicitante}
              onChange={handleChange} required placeholder="Nombre completo"
            />
          </div>

          <div className="form-group">
            <label>Área / Departamento</label>
            <input
              type="text" name="area" value={form.area}
              onChange={handleChange} required placeholder="Ej. Mantenimiento, Construcción..."
            />
          </div>

          <button type="submit" className="btn-submit">Registrar Salida</button>
        </form>
      </div>
    </div>
  )
}
