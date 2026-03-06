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
  {
    id: 'stats-lab',
    title: 'The Future of Language Education',
    subtitle: 'Zimotti, Frances & Whitaker · Technology in Language Teaching & Learning · 2024',
    description:
      'A survey of 100+ language teachers on their perceptions of AI writing tools like ChatGPT — ' +
      'framed as the next evolution of the academic integrity challenges introduced by Google Translate in 2006. ' +
      'Teachers reported mixed attitudes: concern about job security alongside optimism about the technology\'s potential. ' +
      'The article offers practical guidance on classroom policy and assignment design for navigating AI in language education. ' +
      'Role: Co-author & primary Data Analyst.',
    tags: ['Generative AI', 'CALL', 'Applied Linguistics', 'Data Analysis'],
    link: 'https://doi.org/10.29140/tltl.v6n2.1136',
    linkText: 'Read Article',
    doorCol: 66,
    doorRow: 9,
  },
  {
    id: 'ling-lab',
    title: 'French Interrogatives in Context',
    subtitle: 'MA Thesis · University of Iowa · 2021',
    description:
      'An empirical study examining whether Heritage French speakers are as sensitive as native speakers ' +
      'to the social and contextual factors that govern different question forms in French. ' +
      'Participants judged the acceptability of interrogative structures across formal and informal registers, ' +
      'revealing nuanced patterns in how heritage speakers navigate syntactic variation in their non-dominant language.',
    tags: ['Syntax', 'Discourse', 'French', 'Heritage Linguistics'],
    link: 'https://iro.uiowa.edu/esploro/outputs/graduate/French-interrogatives-in-context/9984096974302771',
    linkText: 'Read Thesis',
    doorCol: 74,
    doorRow: 9,
  },
  {
    id: 'dev-lab',
    title: 'This Portfolio Site',
    subtitle: 'Vanilla JS · GitHub Pages · 2025–present',
    description:
      'The site you\'re currently exploring. A Pokémon-inspired RPG portfolio built entirely with ' +
      'vanilla JavaScript, HTML, and CSS — no frameworks, no build tools, no dependencies. ' +
      'Features procedurally generated pixel art, a walkable overworld, building interiors, ' +
      'NPC dialogue, and full mobile touch support.',
    tags: ['JavaScript', 'HTML/CSS', 'GitHub Pages', 'Game Design'],
    link: 'https://github.com/luke-whitaker/portfolio-site',
    linkText: 'View on GitHub',
    doorCol: 82,
    doorRow: 9,
  },
];

// Doors that trigger a map transition instead of an overlay
export const MAP_DOORS = [
  { doorCol: 42, doorRow: 9, targetMap: 'home' },
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
