import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login/Login'
import Dashboard from './pages/Dashboard/Dashboard'
import Productos from './pages/Productos/Productos'
import Salidas from './pages/Salidas/Salidas'
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
      </Routes>
    </BrowserRouter>
  )
}

export default App