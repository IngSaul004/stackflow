import { useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import './Historial.css'

function Historial() {
  const [salidas] = useState(() => {
    const guardadas = localStorage.getItem('salidas')
    return guardadas ? JSON.parse(guardadas) : []
  })

  const [filtroFecha, setFiltroFecha] = useState('')

  const salidasFiltradas = filtroFecha
    ? salidas.filter(s => s.fecha === new Date(filtroFecha + 'T00:00:00').toLocaleDateString('es-MX'))
    : salidas

  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <h1>📋 Historial de Salidas</h1>

        {/* Filtro por fecha */}
        <div className="filtro-card">
          <label>Filtrar por fecha:</label>
          <input
            type="date"
            value={filtroFecha}
            onChange={(e) => setFiltroFecha(e.target.value)}
          />
          {filtroFecha && (
            <button className="btn-limpiar" onClick={() => setFiltroFecha('')}>
              ✖ Limpiar filtro
            </button>
          )}
        </div>

        {/* Tabla */}
        <div className="tabla-card">
          <h2>
            {filtroFecha
              ? `Salidas del ${new Date(filtroFecha + 'T00:00:00').toLocaleDateString('es-MX')}`
              : 'Todas las salidas'}
            <span className="total"> — {salidasFiltradas.length} registro(s)</span>
          </h2>

          {salidasFiltradas.length === 0 ? (
            <p className="sin-datos">No hay salidas para esta fecha.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Motivo</th>
                  <th>Fecha</th>
                  <th>Hora</th>
                </tr>
              </thead>
              <tbody>
                {[...salidasFiltradas].reverse().map((s, index) => (
                  <tr key={s.id}>
                    <td>{salidasFiltradas.length - index}</td>
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

export default Historial