import { useState } from 'react'
import './Sidebar.css'

const MENU = [
  { id: 'inicio',    label: 'Inicio',             icon: '⊞' },
  { id: 'material',  label: 'Registrar Material',  icon: '📦' },
  { id: 'reportes',  label: 'Reportes',            icon: '📋' },
  { id: 'salida',    label: 'Generar Salida',       icon: '🚚' },
  { id: 'usuario',   label: 'Registrar Usuario',    icon: '👤' },
]

export default function Sidebar({ activeView, setActiveView, onLogout, usuario }) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <button
        className="toggle-btn"
        onClick={() => setCollapsed(c => !c)}
        title="Colapsar menú"
      >
        ☰
      </button>

      {!collapsed && (
        <div className="sidebar-user">
          <div className="sidebar-avatar">{usuario.nombre[0].toUpperCase()}</div>
          <div className="sidebar-user-info">
            <span className="sidebar-user-name">{usuario.nombre}</span>
            <span className="sidebar-user-role">{usuario.rol}</span>
          </div>
        </div>
      )}

      <ul>
        {MENU.map(item => (
          <li
            key={item.id}
            className={activeView === item.id ? 'active' : ''}
            onClick={() => setActiveView(item.id)}
            title={collapsed ? item.label : ''}
          >
            <span className="item-icon">{item.icon}</span>
            <span className="item-label">{item.label}</span>
          </li>
        ))}

        <li className="logout" onClick={onLogout} title={collapsed ? 'Cerrar sesión' : ''}>
          <span className="item-icon">🚪</span>
          <span className="item-label">Cerrar sesión</span>
        </li>
      </ul>
    </div>
  )
}
