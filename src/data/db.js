const STORAGE_KEY = 'stackflow_db'

const defaultData = {
  usuarios: [
    { id: 1, username: 'admin',       password: 'admin123',    nombre: 'Administrador', rol: 'admin' },
    { id: 2, username: 'almacenista', password: 'almacen2024', nombre: 'Juan López',    rol: 'almacenista' },
  ],
  materiales: [
    { id: 1, codigo: 'MAT-001', nombre: 'Tubo PVC 2"',   categoria: 'Plomería',      stock: 150, unidad: 'pzas',   stockMinimo: 20  },
    { id: 2, codigo: 'MAT-002', nombre: 'Cable 14 AWG',  categoria: 'Eléctrico',     stock: 500, unidad: 'mts',    stockMinimo: 100 },
    { id: 3, codigo: 'MAT-003', nombre: 'Cinta Aislar',  categoria: 'Eléctrico',     stock: 12,  unidad: 'rollos', stockMinimo: 15  },
    { id: 4, codigo: 'MAT-004', nombre: 'Cemento Gris',  categoria: 'Construcción',  stock: 80,  unidad: 'bultos', stockMinimo: 30  },
    { id: 5, codigo: 'MAT-005', nombre: 'Varilla 3/8"',  categoria: 'Construcción',  stock: 8,   unidad: 'pzas',   stockMinimo: 25  },
    { id: 6, codigo: 'MAT-006', nombre: 'Llave de Paso', categoria: 'Plomería',      stock: 45,  unidad: 'pzas',   stockMinimo: 10  },
  ],
  salidas: [
    { id: 1, folio: 'SAL-2024-001', materialId: 2, cantidad: 50, solicitante: 'Carlos Ruiz',    area: 'Mantenimiento', fecha: '2024-12-01', entregadoPor: 'admin'       },
    { id: 2, folio: 'SAL-2024-002', materialId: 1, cantidad: 10, solicitante: 'Ana García',     area: 'Operaciones',   fecha: '2024-12-02', entregadoPor: 'almacenista' },
    { id: 3, folio: 'SAL-2024-003', materialId: 4, cantidad: 5,  solicitante: 'Luis Torres',    area: 'Construcción',  fecha: '2024-12-03', entregadoPor: 'admin'       },
    { id: 4, folio: 'SAL-2024-004', materialId: 3, cantidad: 3,  solicitante: 'María Soto',     area: 'Eléctrica',     fecha: '2024-12-04', entregadoPor: 'almacenista' },
    { id: 5, folio: 'SAL-2024-005', materialId: 6, cantidad: 8,  solicitante: 'Roberto Vega',   area: 'Plomería',      fecha: '2024-12-05', entregadoPor: 'admin'       },
  ],
}

export function getDB() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored)
  } catch {}
  return JSON.parse(JSON.stringify(defaultData))
}

export function saveDB(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {}
}
