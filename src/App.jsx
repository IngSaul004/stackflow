import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login/Login'
import Dashboard from './pages/dashboard/dashboard'
import Productos from './pages/productos/productos'
import Salidas from './pages/salidas/salidas'
import Historial from './pages/historial/historial'
import Reportes from './pages/reportes/reportes'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        } />
        <Route path="/productos" element={
          <ProtectedRoute><Productos /></ProtectedRoute>
        } />
        <Route path="/salidas" element={
          <ProtectedRoute><Salidas /></ProtectedRoute>
        } />
        <Route path="/historial" element={
          <ProtectedRoute><Historial /></ProtectedRoute>
        } />
        <Route path="/reportes" element={
          <ProtectedRoute><Reportes /></ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App