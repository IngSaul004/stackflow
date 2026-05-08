import { getDB } from '../data/db'

const SESSION_KEY = 'stackflow_session'

export function login(username, password) {
  const db = getDB()
  const user = db.usuarios.find(u => u.username === username && u.password === password)
  if (!user) return { ok: false, error: 'Usuario o contraseña incorrectos' }

  const { password: _pw, ...safeUser } = user
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(safeUser))
  return { ok: true, user: safeUser }
}

export function logout() {
  sessionStorage.removeItem(SESSION_KEY)
}

export function getSession() {
  try {
    const stored = sessionStorage.getItem(SESSION_KEY)
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
}
