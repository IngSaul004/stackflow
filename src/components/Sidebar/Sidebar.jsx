import { useNavigate } from 'react-router-dom'
import './Sidebar.css'

function Sidebar() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('usuario')
    navigate('/')
  }

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <h2>STACKFLOW</h2>
      </div>

      <nav className="sidebar-nav">
        <button onClick={() => navigate('/dashboard')}>🏠 Dashboard</button>
        <button onClick={() => navigate('/productos')}>📦 Productos</button>
        <button onClick={() => navigate('/salidas')}>📤 Salidas</button>
        <button onClick={() => navigate('/historial')}>📋 Historial</button>
        <button onClick={() => navigate('/reportes')}>📊 Reportes</button>
      </nav>

      <div className="sidebar-footer">
        <button onClick={handleLogout} className="logout-btn">🚪 Cerrar sesión</button>
      </div>
    </div>
  )
}

export default Sidebar