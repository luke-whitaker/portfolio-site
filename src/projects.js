// Project data and door coordinates
// Door coords are tile positions (col, row) in the map

export const PROJECTS = [
  {
    id: 'my-home',
    title: 'Chez Luke Whitaker',
    subtitle: 'Where my important information lives',
    description: 'This is where I keep my most important documents like my resume, CV, diplomas, certificates, family photos, etc.',
    tags: ['resume', 'home', 'certifications'],
    link: '#',
    doorCol: 43, 
    doorRow: 9,
  },
  {
    id: 'stats',
    title: 'Stats Web App',
    subtitle: 'Data tools for quantitatively literate non-experts',
    description:
      'An interactive statistics toolkit that makes quantitative analysis accessible. ' +
      'Built for researchers and students who need reliable statistical tools without ' +
      'the steep learning curve of R or SPSS.',
    tags: ['Python', 'Statistics', 'Web App'],
    link: '#',
    doorCol: 66,
    doorRow: 9,
  },
  {
    id: 'corpus',
    title: 'Corpus Analysis Explorer',
    subtitle: 'Linguistic profile tool with curated metrics',
    description:
      'A text analysis platform that generates rich linguistic profiles from any corpus. ' +
      'Computes curated metrics spanning lexical diversity, syntactic complexity, and ' +
      'discourse structure.',
    tags: ['NLP', 'Linguistics', 'Python'],
    link: '#',
    doorCol: 74,
    doorRow: 9,
  },
  {
    id: 'notebooks',
    title: 'Jupyter Notebook Series',
    subtitle: 'Mini-papers on linguistic datasets',
    description:
      'A collection of computational essays exploring linguistic datasets. Each notebook ' +
      'is a self-contained mini-paper with reproducible analysis, visualisations, and ' +
      'narrative discussion.',
    tags: ['Jupyter', 'Data Science', 'Linguistics'],
    link: '#',
    doorCol: 82,
    doorRow: 9,
  },
];

// Doors that trigger a map transition instead of an overlay
export const MAP_DOORS = [
  { doorCol: 43, doorRow: 9, targetMap: 'home' },
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
