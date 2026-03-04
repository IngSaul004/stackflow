import { useState } from "react";
import "./Sidebar.css";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <button className="toggle-btn" onClick={() => setCollapsed(!collapsed)}>
        ☰
      </button>

      <ul>
  <li><span>Registrar Material</span></li>
  <li><span>Reportes</span></li>
  <li><span>Generar Salida</span></li>
  <li><span>Registrar Usuario</span></li>
  <li className="logout"><span>Cerrar sesión</span></li>
</ul>
    </div>
  );
}