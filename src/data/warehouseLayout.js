export const warehouseLayout = {
  zones: [
    {
      id: 'A',
      name: 'โซน A - สินค้าทั่วไป',
      color: '#3b82f6',
      rows: 5,
      shelves: 4,
      slots: 6,
      position: { gridRow: 1, gridCol: 1 }
    },
    {
      id: 'B',
      name: 'โซน B - อิเล็กทรอนิกส์',
      color: '#22c55e',
      rows: 5,
      shelves: 4,
      slots: 6,
      position: { gridRow: 1, gridCol: 2 }
    },
    {
      id: 'C',
      name: 'โซน C - สินค้าขนาดใหญ่',
      color: '#f97316',
      rows: 5,
      shelves: 4,
      slots: 6,
      position: { gridRow: 2, gridCol: 1 }
    },
    {
      id: 'D',
      name: 'โซน D - สินค้าพิเศษ',
      color: '#8b5cf6',
      rows: 5,
      shelves: 4,
      slots: 6,
      position: { gridRow: 2, gridCol: 2 }
    }
  ]
}

export function getZoneOccupancy(parcels, zoneId) {
  const zone = warehouseLayout.zones.find(z => z.id === zoneId)
  if (!zone) return { total: 0, used: 0, percentage: 0 }
  const total = zone.rows * zone.shelves * zone.slots
  const used = parcels.filter(p => p.location && p.location.zone === zoneId && p.status !== 'shipped').length
  return { total, used, percentage: Math.round((used / total) * 100) }
}

export function getParcelsInShelf(parcels, zone, row, shelf) {
  return parcels.filter(p =>
    p.location &&
    p.location.zone === zone &&
    p.location.row === row &&
    p.location.shelf === shelf &&
    p.status !== 'shipped'
  )
}
