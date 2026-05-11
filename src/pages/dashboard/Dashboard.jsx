import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../components/Sidebar/Sidebar'
import './Dashboard.css'

function Dashboard() {
  const navigate = useNavigate()
  const usuario = localStorage.getItem('usuario')

  const [productos] = useState(() => {
    const guardados = localStorage.getItem('productos')
    return guardados ? JSON.parse(guardados) : []
  })

  const [salidas] = useState(() => {
    const guardadas = localStorage.getItem('salidas')
    return guardadas ? JSON.parse(guardadas) : []
  })

  // Estadísticas calculadas
  const totalProductos = productos.length
  const totalUnidades = productos.reduce((acc, p) => acc + parseInt(p.cantidad), 0)
  const totalSalidas = salidas.length

  const productoMasSolicitado = () => {
    if (salidas.length === 0) return 'Sin registros'
    const conteo = {}
    salidas.forEach(s => {
      conteo[s.productoNombre] = (conteo[s.productoNombre] || 0) + s.cantidad
    })
    return Object.entries(conteo).sort((a, b) => b[1] - a[1])[0][0]
  }

  const stockBajo = productos.filter(p => parseInt(p.cantidad) <= 3)

  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">

        {/* Bienvenida */}
        <div className="bienvenida">
          <h1>Bienvenido, {usuario} 👋</h1>
          <p>Panel de control — STACKFLOW</p>
        </div>

        {/* Tarjetas de estadísticas */}
        <div className="stats-grid">
          <div className="stat-card azul">
            <div className="stat-icono">📦</div>
            <div className="stat-info">
              <span className="stat-numero">{totalProductos}</span>
              <span className="stat-label">Productos registrados</span>
            </div>
          </div>

          <div className="stat-card verde">
            <div className="stat-icono">🔢</div>
            <div className="stat-info">
              <span className="stat-numero">{totalUnidades}</span>
              <span className="stat-label">Unidades en inventario</span>
            </div>
          </div>

          <div className="stat-card naranja">
            <div className="stat-icono">📤</div>
            <div className="stat-info">
              <span className="stat-numero">{totalSalidas}</span>
              <span className="stat-label">Salidas registradas</span>
            </div>
          </div>

          <div className="stat-card morado">
            <div className="stat-icono">🏆</div>
            <div className="stat-info">
              <span className="stat-numero-sm">{productoMasSolicitado()}</span>
              <span className="stat-label">Producto más solicitado</span>
            </div>
          </div>
        </div>

        {/* Alerta stock bajo */}
        {stockBajo.length > 0 && (
          <div className="alerta-stock">
            <span>⚠️ Productos con stock bajo (3 o menos unidades):</span>
            <ul>
              {stockBajo.map(p => (
                <li key={p.id}><strong>{p.nombre}</strong> — {p.cantidad} unidad(es)</li>
              ))}
            </ul>
          </div>
        )}

        {/* Accesos rápidos */}
        <h2 className="seccion-titulo">Accesos rápidos</h2>
        <div className="cards">
          <div className="card" onClick={() => navigate('/productos')}>
            <span className="card-icono">📦</span>
            <span>Productos</span>
          </div>
          <div className="card" onClick={() => navigate('/salidas')}>
            <span className="card-icono">📤</span>
            <span>Salidas</span>
          </div>
          <div className="card" onClick={() => navigate('/historial')}>
            <span className="card-icono">📋</span>
            <span>Historial</span>
          </div>
          <div className="card" onClick={() => navigate('/reportes')}>
            <span className="card-icono">📊</span>
            <span>Reportes</span>
          </div>
        </div>

        {/* Últimas salidas */}
        <h2 className="seccion-titulo">Últimas salidas</h2>
        <div className="tabla-card">
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
                </tr>
              </thead>
              <tbody>
                {[...salidas].reverse().slice(0, 5).map(s => (
                  <tr key={s.id}>
                    <td>{s.productoNombre}</td>
                    <td>{s.cantidad}</td>
                    <td>{s.motivo}</td>
                    <td>{s.fecha}</td>
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

export default Dashboard