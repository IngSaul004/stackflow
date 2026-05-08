import { useState } from 'react'
import Sidebar from './components/Sidebar/Sidebar'
import Inicio from './components/views/Inicio'
import RegistrarMaterial from './components/views/RegistrarMaterial'
import Reportes from './components/views/Reportes'
import GenerarSalida from './components/views/GenerarSalida'
import RegistrarUsuario from './components/views/RegistrarUsuario'
import './Dashboard.css'

const VIEWS = {
  inicio:   Inicio,
  material: RegistrarMaterial,
  reportes: Reportes,
  salida:   GenerarSalida,
  usuario:  RegistrarUsuario,
}

export default function Dashboard({ usuario, onLogout }) {
  const [activeView, setActiveView] = useState('inicio')
  const ViewComponent = VIEWS[activeView] ?? Inicio

  return (
    <div className="dashboard-layout">
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        onLogout={onLogout}
        usuario={usuario}
      />
      <main className="dashboard-main">
        <ViewComponent usuario={usuario} />
      </main>
    </div>
  )
}
