import { useState } from 'react'
import { getSalidas } from '../../services/almacen'
import './views.css'

export default function Reportes() {
  const salidas = getSalidas()
  const [filtro, setFiltro] = useState('')

  const filtradas = filtro
    ? salidas.filter(s =>
        s.folio.toLowerCase().includes(filtro.toLowerCase()) ||
        s.material?.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
        s.solicitante.toLowerCase().includes(filtro.toLowerCase()) ||
        s.area.toLowerCase().includes(filtro.toLowerCase())
      )
    : salidas

  return (
    <div className="view">
      <h2 className="view-title">Reportes de Salidas</h2>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar por folio, material, solicitante o área..."
          value={filtro}
          onChange={e => setFiltro(e.target.value)}
        />
        <span className="results-count">{filtradas.length} registros</span>
      </div>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Folio</th>
              <th>Material</th>
              <th>Cantidad</th>
              <th>Solicitante</th>
              <th>Área</th>
              <th>Entregó</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {filtradas.length === 0 ? (
              <tr className="empty-row"><td colSpan={7}>Sin resultados</td></tr>
            ) : filtradas.map(s => (
              <tr key={s.id}>
                <td><span className="tag-folio">{s.folio}</span></td>
                <td>{s.material?.nombre ?? '—'}</td>
                <td>{s.cantidad} {s.material?.unidad ?? ''}</td>
                <td>{s.solicitante}</td>
                <td>{s.area}</td>
                <td>{s.entregadoPor}</td>
                <td>{s.fecha}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
