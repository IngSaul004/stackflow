import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { productosSemilla, salidasSemilla } from './datos.js'

// Cargar datos semilla solo si no hay datos previos
if (!localStorage.getItem('productos')) {
  localStorage.setItem('productos', JSON.stringify(productosSemilla))
}

if (!localStorage.getItem('salidas')) {
  localStorage.setItem('salidas', JSON.stringify(salidasSemilla))
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)