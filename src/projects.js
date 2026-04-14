// Project data and door coordinates
// Door coords are tile positions (col, row) in the map

export const PROJECTS = [
  // Commenting out this Project Title Card for future use, just in case
  //{
  //  id: 'my-home',
  //  title: 'Chez Luke Whitaker',
  //  subtitle: 'Where my important information lives',
  //  description: 'This is where I keep my most important documents like my resume, CV, diplomas, certificates, family photos, etc.',
  //  tags: ['resume', 'home', 'certifications'],
  //  link: '#',
  //  doorCol: 42,
  //  doorRow: 9,
  //},
  // Labs now have interiors — their doors are in MAP_DOORS below
];

// Doors that trigger a map transition instead of an overlay
export const MAP_DOORS = [
  { doorCol: 42, doorRow: 9, targetMap: 'home' },
  { doorCol: 66, doorRow: 9, targetMap: 'stats-lab' },
  { doorCol: 74, doorRow: 9, targetMap: 'ling-lab' },
  { doorCol: 82, doorRow: 9, targetMap: 'dev-lab' },
];

// Check if a tile is a map-transition door
export function getMapDoorAt(col, row) {
  return MAP_DOORS.find(d => d.doorCol === col && d.doorRow === row) || null;
}

// Get project by door tile position (only non-map-door projects)
export function getProjectAtDoor(col, row) {
  // Skip doors that are handled as map transitions
  if (getMapDoorAt(col, row)) return null;
  return PROJECTS.find(p => p.doorCol === col && p.doorRow === row) || null;
}
