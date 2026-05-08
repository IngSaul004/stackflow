import { getEstadisticas, getSalidas } from '../../services/almacen'
import './views.css'
import './Inicio.css'

export default function Inicio({ usuario }) {
  const stats  = getEstadisticas()
  const salidas = getSalidas().slice(0, 5)

  const cards = [
    { label: 'Total Materiales', value: stats.totalMateriales,    icon: '📦', color: 'blue'   },
    { label: 'Salidas Hoy',      value: stats.salidasHoy,         icon: '🚚', color: 'green'  },
    { label: 'Salidas del Mes',  value: stats.salidasMes,         icon: '📋', color: 'purple' },
    { label: 'Stock Crítico',    value: stats.materialesCriticos,  icon: '⚠️', color: 'red'    },
  ]

  const fechaHoy = new Date().toLocaleDateString('es-MX', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  })

  return (
    <div className="view inicio">
      <div className="inicio-header">
        <h2>Bienvenido, {usuario.nombre}</h2>
        <p className="inicio-fecha">{fechaHoy}</p>
      </div>

      <div className="stat-grid">
        {cards.map(card => (
          <div key={card.label} className={`stat-card stat-card--${card.color}`}>
            <span className="stat-icon">{card.icon}</span>
            <div>
              <div className="stat-value">{card.value}</div>
              <div className="stat-label">{card.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div>
        <h3 className="section-heading">Últimas Salidas</h3>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Folio</th>
                <th>Material</th>
                <th>Cantidad</th>
                <th>Solicitante</th>
                <th>Área</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {salidas.length === 0 ? (
                <tr className="empty-row"><td colSpan={6}>Sin salidas registradas</td></tr>
              ) : salidas.map(s => (
                <tr key={s.id}>
                  <td><span className="tag-folio">{s.folio}</span></td>
                  <td>{s.material?.nombre ?? '—'}</td>
                  <td>{s.cantidad} {s.material?.unidad ?? ''}</td>
                  <td>{s.solicitante}</td>
                  <td>{s.area}</td>
                  <td>{s.fecha}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
