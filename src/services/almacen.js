import { getDB, saveDB } from '../data/db'

export function getMateriales() {
  return getDB().materiales
}

export function getSalidas() {
  const db = getDB()
  return db.salidas
    .map(s => ({ ...s, material: db.materiales.find(m => m.id === s.materialId) }))
    .reverse()
}

export function getEstadisticas() {
  const db = getDB()
  const hoy = new Date().toISOString().split('T')[0]
  const mesActual = hoy.substring(0, 7)

  return {
    totalMateriales:    db.materiales.length,
    salidasHoy:         db.salidas.filter(s => s.fecha === hoy).length,
    salidasMes:         db.salidas.filter(s => s.fecha.startsWith(mesActual)).length,
    materialesCriticos: db.materiales.filter(m => m.stock <= m.stockMinimo).length,
  }
}

export function registrarSalida({ materialId, cantidad, solicitante, area, entregadoPor }) {
  const db = getDB()
  const material = db.materiales.find(m => m.id === Number(materialId))
  if (!material) return { ok: false, error: 'Material no encontrado' }
  if (material.stock < Number(cantidad)) {
    return { ok: false, error: `Stock insuficiente (disponible: ${material.stock} ${material.unidad})` }
  }

  const folio = `SAL-${new Date().getFullYear()}-${String(db.salidas.length + 1).padStart(3, '0')}`
  const nuevaSalida = {
    id: db.salidas.length + 1,
    folio,
    materialId: Number(materialId),
    cantidad:   Number(cantidad),
    solicitante,
    area,
    fecha:        new Date().toISOString().split('T')[0],
    entregadoPor,
  }

  material.stock -= Number(cantidad)
  db.salidas.push(nuevaSalida)
  saveDB(db)
  return { ok: true, salida: nuevaSalida }
}

export function registrarMaterial({ nombre, categoria, stock, unidad, stockMinimo }) {
  const db = getDB()
  const codigo = `MAT-${String(db.materiales.length + 1).padStart(3, '0')}`
  const nuevo = {
    id: db.materiales.length + 1,
    codigo,
    nombre,
    categoria,
    stock:      Number(stock),
    unidad,
    stockMinimo: Number(stockMinimo) || 10,
  }
  db.materiales.push(nuevo)
  saveDB(db)
  return { ok: true, material: nuevo }
}

export function registrarUsuario({ username, password, nombre, rol }) {
  const db = getDB()
  if (db.usuarios.find(u => u.username === username)) {
    return { ok: false, error: 'El nombre de usuario ya existe' }
  }
  db.usuarios.push({ id: db.usuarios.length + 1, username, password, nombre, rol })
  saveDB(db)
  return { ok: true }
}
