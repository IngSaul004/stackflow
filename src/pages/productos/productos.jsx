import { useState, useEffect } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import './Productos.css'

function Productos() {
  const [productos, setProductos] = useState(() => {
  const guardados = localStorage.getItem('productos')
  return guardados ? JSON.parse(guardados) : []
})
  const [formulario, setFormulario] = useState({ nombre: '', cantidad: '', categoria: '' })
  const [editandoId, setEditandoId] = useState(null)
  const [error, setError] = useState('')

  // Guardar productos en localStorage cada vez que cambien
  useEffect(() => {
    localStorage.setItem('productos', JSON.stringify(productos))
  }, [productos])

  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value })
  }

  const handleGuardar = () => {
    if (!formulario.nombre || !formulario.cantidad || !formulario.categoria) {
      setError('Todos los campos son obligatorios')
      return
    }

    if (editandoId !== null) {
      // Editar producto existente
      setProductos(productos.map(p =>
        p.id === editandoId ? { ...formulario, id: editandoId } : p
      ))
      setEditandoId(null)
    } else {
      // Agregar nuevo producto
      const nuevo = { ...formulario, id: Date.now() }
      setProductos([...productos, nuevo])
    }

    setFormulario({ nombre: '', cantidad: '', categoria: '' })
    setError('')
  }

  const handleEditar = (producto) => {
    setFormulario({ nombre: producto.nombre, cantidad: producto.cantidad, categoria: producto.categoria })
    setEditandoId(producto.id)
  }

  const handleEliminar = (id) => {
    setProductos(productos.filter(p => p.id !== id))
  }

  const handleCancelar = () => {
    setFormulario({ nombre: '', cantidad: '', categoria: '' })
    setEditandoId(null)
    setError('')
  }

  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <h1>📦 Productos</h1>

        {/* Formulario */}
        <div className="form-card">
          <h2>{editandoId ? 'Editar producto' : 'Agregar producto'}</h2>

          <div className="form-grid">
            <input
              type="text"
              name="nombre"
              placeholder="Nombre del producto"
              value={formulario.nombre}
              onChange={handleChange}
            />
            <input
              type="number"
              name="cantidad"
              placeholder="Cantidad"
              value={formulario.cantidad}
              onChange={handleChange}
            />
            <input
              type="text"
              name="categoria"
              placeholder="Categoría"
              value={formulario.categoria}
              onChange={handleChange}
            />
          </div>

          {error && <p className="error">{error}</p>}

          <div className="form-botones">
            <button className="btn-guardar" onClick={handleGuardar}>
              {editandoId ? '💾 Actualizar' : '➕ Agregar'}
            </button>
            {editandoId && (
              <button className="btn-cancelar" onClick={handleCancelar}>
                Cancelar
              </button>
            )}
          </div>
        </div>

        {/* Tabla */}
        <div className="tabla-card">
          <h2>Inventario</h2>
          {productos.length === 0 ? (
            <p className="sin-datos">No hay productos registrados aún.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Cantidad</th>
                  <th>Categoría</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map(p => (
                  <tr key={p.id}>
                    <td>{p.nombre}</td>
                    <td>{p.cantidad}</td>
                    <td>{p.categoria}</td>
                    <td>
                      <button className="btn-editar" onClick={() => handleEditar(p)}>✏️ Editar</button>
                      <button className="btn-eliminar" onClick={() => handleEliminar(p.id)}>🗑️ Eliminar</button>
                    </td>
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

export default Productos