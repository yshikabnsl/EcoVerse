// Mock data for EcoVerse demo - all pages use this for consistency

export const MOCK_USER = {
  name: 'Tanya',
  points: 1240,
  wasteClassified: 24,
  pickupsCompleted: 3,
  co2SavedKg: 12,
}

export const MOCK_PICKUPS = [
  { id: '1', date: '2025-03-22', time: '9:00 AM', type: 'Mixed (Organic + Recyclable)', address: '123 Green Street, Apt 4B', status: 'scheduled' as const },
  { id: '2', date: '2025-03-20', time: '12:00 PM', type: 'Organic', address: '456 Eco Lane, Unit 12', status: 'in-progress' as const },
  { id: '3', date: '2025-03-18', time: '9:00 AM', type: 'Recyclable', address: '78 Recycle Road, Block A', status: 'completed' as const },
  { id: '4', date: '2025-03-15', time: '3:00 PM', type: 'Mixed (Organic + Recyclable)', address: '123 Green Street, Apt 4B', status: 'completed' as const },
]

export const MOCK_POINT_HISTORY = [
  { action: 'Waste classification (Organic)', points: 10, date: '2025-03-19' },
  { action: 'Waste classification (Recyclable)', points: 10, date: '2025-03-18' },
  { action: 'Scheduled pickup completed', points: 25, date: '2025-03-18' },
  { action: 'Waste classification (Organic)', points: 10, date: '2025-03-17' },
  { action: 'On-time segregation bonus', points: 5, date: '2025-03-15' },
  { action: 'Scheduled pickup completed', points: 25, date: '2025-03-15' },
]

export const MOCK_ROUTE_STOPS = [
  { id: 1, address: 'Depot — 10 Municipal Way', waste: 'Start', status: 'completed' },
  { id: 2, address: '123 Green Street', waste: 'Mixed', status: 'completed' },
  { id: 3, address: '45 Eco Lane', waste: 'Organic', status: 'in-progress' },
  { id: 4, address: '78 Recycle Road', waste: 'Recyclable', status: 'pending' },
  { id: 5, address: '22 Sustainability Ave', waste: 'Mixed', status: 'pending' },
  { id: 6, address: '91 Green Street', waste: 'Organic', status: 'pending' },
]

export const MOCK_ROUTE_STATS = {
  stopsToday: 8,
  estimatedTime: '~52 min',
  optimizedDistance: '14.2 km',
  fuelSaved: '23%',
}

// Sample image as base64 for demo (1x1 green pixel - placeholder for "organic waste" demo)
export const SAMPLE_WASTE_IMAGE = 'data:image/svg+xml,' + encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
  <rect fill="%236b8e23" width="200" height="200"/>
  <text x="100" y="95" text-anchor="middle" fill="white" font-size="14" font-family="sans-serif">Organic</text>
  <text x="100" y="115" text-anchor="middle" fill="rgba(255,255,255,0.8)" font-size="11" font-family="sans-serif">Food scraps</text>
</svg>
`)
