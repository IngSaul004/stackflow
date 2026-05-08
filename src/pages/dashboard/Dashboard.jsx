import { useNavigate } from 'react-router-dom'
import Sidebar from '../../components/Sidebar/Sidebar'
import './Dashboard.css'

function Dashboard() {
  const usuario = localStorage.getItem('usuario')
  const navigate = useNavigate()

  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <h1>Bienvenido, {usuario} 👋</h1>
        <p>Selecciona un módulo del menú lateral para comenzar.</p>

        <div className="cards">
          <div className="card" onClick={() => navigate('/productos')}>📦 Productos</div>
          <div className="card" onClick={() => navigate('/salidas')}>📤 Salidas</div>
          <div className="card" onClick={() => navigate('/historial')}>📋 Historial</div>
          <div className="card" onClick={() => navigate('/reportes')}>📊 Reportes</div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard