// Project data and door coordinates
// Door coords are tile positions (col, row) in the map

export const PROJECTS = [
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
    doorCol: 6,
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
    doorCol: 14,
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
    doorCol: 22,
    doorRow: 9,
  },
];

// Get project by door tile position
export function getProjectAtDoor(col, row) {
  return PROJECTS.find(p => p.doorCol === col && p.doorRow === row) || null;
}
