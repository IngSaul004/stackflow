import { useState, useMemo } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import * as XLSX from 'xlsx'
import './Reportes.css'

function Reportes() {
  const [salidas] = useState(() => {
    const guardadas = localStorage.getItem('salidas')
    return guardadas ? JSON.parse(guardadas) : []
  })

  const [fechaInicio, setFechaInicio] = useState('')
  const [fechaFin, setFechaFin] = useState('')
  const [error, setError] = useState('')

  const parsearFecha = (fechaStr) => {
    const partes = fechaStr.split('/')
    return new Date(`${partes[2]}-${partes[1].padStart(2, '0')}-${partes[0].padStart(2, '0')}`)
  }

  // ✅ useMemo calcula la preview sin tocar el estado
  const salidasPreview = useMemo(() => {
    if (!fechaInicio || !fechaFin) return []

    const inicio = new Date(fechaInicio + 'T00:00:00')
    const fin = new Date(fechaFin + 'T23:59:59')

    if (inicio > fin) return []

    return salidas.filter(s => {
      const fecha = parsearFecha(s.fecha)
      return fecha >= inicio && fecha <= fin
    })
  }, [fechaInicio, fechaFin, salidas])

  // ✅ Validación solo al exportar
  const validar = () => {
    if (!fechaInicio || !fechaFin) {
      setError('Selecciona un rango de fechas')
      return false
    }

    const inicio = new Date(fechaInicio + 'T00:00:00')
    const fin = new Date(fechaFin + 'T23:59:59')

    if (inicio > fin) {
      setError('La fecha de inicio no puede ser mayor a la fecha fin')
      return false
    }

    if (salidasPreview.length === 0) {
      setError('No hay salidas en el rango de fechas seleccionado')
      return false
    }

    setError('')
    return true
  }

  const exportarPDF = () => {
    if (!validar()) return

    const doc = new jsPDF()

    doc.setFontSize(18)
    doc.setTextColor(26, 115, 232)
    doc.text('STACKFLOW', 14, 20)

    doc.setFontSize(12)
    doc.setTextColor(80, 80, 80)
    doc.text('Reporte de Salidas de Almacén', 14, 28)
    doc.text(`Período: ${new Date(fechaInicio + 'T00:00:00').toLocaleDateString('es-MX')} — ${new Date(fechaFin + 'T00:00:00').toLocaleDateString('es-MX')}`, 14, 35)
    doc.text(`Total de registros: ${salidasPreview.length}`, 14, 42)

    autoTable(doc, {
      startY: 50,
      head: [['#', 'Producto', 'Cantidad', 'Motivo', 'Fecha', 'Hora']],
      body: salidasPreview.map((s, i) => [
        i + 1,
        s.productoNombre,
        s.cantidad,
        s.motivo,
        s.fecha,
        s.hora
      ]),
      headStyles: { fillColor: [26, 115, 232] },
      alternateRowStyles: { fillColor: [245, 248, 255] },
      styles: { fontSize: 9 }
    })

    doc.save(`reporte_salidas_${fechaInicio}_${fechaFin}.pdf`)
  }

  const exportarExcel = () => {
    if (!validar()) return

    const datos = salidasPreview.map((s, i) => ({
      '#': i + 1,
      'Producto': s.productoNombre,
      'Cantidad': s.cantidad,
      'Motivo': s.motivo,
      'Fecha': s.fecha,
      'Hora': s.hora
    }))

    const hoja = XLSX.utils.json_to_sheet(datos)
    const libro = XLSX.utils.book_new()

    hoja['!cols'] = [
      { wch: 5 },
      { wch: 25 },
      { wch: 10 },
      { wch: 35 },
      { wch: 15 },
      { wch: 15 }
    ]

    XLSX.utils.book_append_sheet(libro, hoja, 'Salidas')
    XLSX.writeFile(libro, `reporte_salidas_${fechaInicio}_${fechaFin}.xlsx`)
  }

  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <h1>📊 Reportes</h1>

        <div className="filtro-card">
          <h2>Selecciona el rango de fechas</h2>
          <div className="filtro-grid">
            <div className="filtro-campo">
              <label>Fecha inicio</label>
              <input
                type="date"
                value={fechaInicio}
                onChange={(e) => { setFechaInicio(e.target.value); setError('') }}
              />
            </div>
            <div className="filtro-campo">
              <label>Fecha fin</label>
              <input
                type="date"
                value={fechaFin}
                onChange={(e) => { setFechaFin(e.target.value); setError('') }}
              />
            </div>
          </div>

          {error && <p className="error">{error}</p>}

          <div className="botones">
            <button className="btn-pdf" onClick={exportarPDF}>
              📄 Exportar PDF
            </button>
            <button className="btn-excel" onClick={exportarExcel}>
              📊 Exportar Excel
            </button>
          </div>
        </div>

        {/* Vista previa */}
        {fechaInicio && fechaFin && (
          <div className="tabla-card">
            <h2>
              Vista previa
              <span className="total"> — {salidasPreview.length} registro(s)</span>
            </h2>

            {salidasPreview.length === 0 ? (
              <p className="sin-datos">No hay registros para el rango seleccionado.</p>
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
                  {salidasPreview.map((s, i) => (
                    <tr key={s.id}>
                      <td>{i + 1}</td>
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
        )}
      </div>
    </div>
  )
}

export default Reportes