import { useState, useEffect } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import './Salidas.css'

function Salidas() {
  const [productos, setProductos] = useState(() => {
    const guardados = localStorage.getItem('productos')
    return guardados ? JSON.parse(guardados) : []
  })

  const [salidas, setSalidas] = useState(() => {
    const guardadas = localStorage.getItem('salidas')
    return guardadas ? JSON.parse(guardadas) : []
  })

  const [formulario, setFormulario] = useState({
    productoId: '',
    cantidad: '',
    motivo: ''
  })

  const [error, setError] = useState('')
  const [exito, setExito] = useState('')

  useEffect(() => {
    localStorage.setItem('salidas', JSON.stringify(salidas))
  }, [salidas])

  useEffect(() => {
    localStorage.setItem('productos', JSON.stringify(productos))
  }, [productos])

  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value })
  }

  const handleRegistrarSalida = () => {
    setError('')
    setExito('')

    if (!formulario.productoId || !formulario.cantidad || !formulario.motivo) {
      setError('Todos los campos son obligatorios')
      return
    }

    const cantidad = parseInt(formulario.cantidad)

    if (cantidad <= 0) {
      setError('La cantidad debe ser mayor a 0')
      return
    }

    const producto = productos.find(p => p.id === parseInt(formulario.productoId))

    if (!producto) {
      setError('Producto no encontrado')
      return
    }

    if (cantidad > parseInt(producto.cantidad)) {
      setError(`Stock insuficiente. Solo hay ${producto.cantidad} unidades disponibles`)
      return
    }

    // Descontar del inventario (HU10)
    const productosActualizados = productos.map(p =>
      p.id === parseInt(formulario.productoId)
        ? { ...p, cantidad: parseInt(p.cantidad) - cantidad }
        : p
    )
    setProductos(productosActualizados)

    // Registrar la salida (HU9)
    const nuevaSalida = {
      id: Date.now(),
      productoNombre: producto.nombre,
      cantidad,
      motivo: formulario.motivo,
      fecha: new Date().toLocaleDateString('es-MX'),
      hora: new Date().toLocaleTimeString('es-MX')
    }
    setSalidas([...salidas, nuevaSalida])

    setFormulario({ productoId: '', cantidad: '', motivo: '' })
    setExito(`✅ Salida registrada correctamente. Stock restante: ${parseInt(producto.cantidad) - cantidad}`)
  }

  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <h1>📤 Registrar Salida</h1>

        <div className="form-card">
          <h2>Nueva salida</h2>

          <div className="form-grid">
            <select
              name="productoId"
              value={formulario.productoId}
              onChange={handleChange}
            >
              <option value="">Selecciona un producto</option>
              {productos.map(p => (
                <option key={p.id} value={p.id}>
                  {p.nombre} — Stock: {p.cantidad}
                </option>
              ))}
            </select>

            <input
              type="number"
              name="cantidad"
              placeholder="Cantidad a retirar"
              value={formulario.cantidad}
              onChange={handleChange}
            />

            <input
              type="text"
              name="motivo"
              placeholder="Motivo de salida"
              value={formulario.motivo}
              onChange={handleChange}
            />
          </div>

          {error && <p className="error">{error}</p>}
          {exito && <p className="exito">{exito}</p>}

          <button className="btn-guardar" onClick={handleRegistrarSalida}>
            📤 Registrar Salida
          </button>
        </div>

        {/* Historial reciente */}
        <div className="tabla-card">
          <h2>Salidas recientes</h2>
          {salidas.length === 0 ? (
            <p className="sin-datos">No hay salidas registradas aún.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Motivo</th>
                  <th>Fecha</th>
                  <th>Hora</th>
                </tr>
              </thead>
              <tbody>
                {[...salidas].reverse().map(s => (
                  <tr key={s.id}>
                    <td>{s.productoNombre}</td>
                    <td>{s.cantidad}</td>
                    <td>{s.motivo}</td>
                    <td>{s.fecha}</td>
                    <td>{s.hora}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}

export default Salidas