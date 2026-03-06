const overlayEl = document.getElementById('overlay');
const titleEl = document.getElementById('overlay-title');
const subtitleEl = document.getElementById('overlay-subtitle');
const descEl = document.getElementById('overlay-desc');
const tagsEl = document.getElementById('overlay-tags');
const linkEl = document.getElementById('overlay-link');

export function showOverlay(project) {
  titleEl.textContent = project.title;
  subtitleEl.textContent = project.subtitle;
  descEl.textContent = project.description;

  tagsEl.innerHTML = '';
  for (const tag of project.tags) {
    const span = document.createElement('span');
    span.className = 'tag';
    span.textContent = tag;
    tagsEl.appendChild(span);
  }

  linkEl.href = project.link;
  linkEl.textContent = project.link === '#' ? 'Coming soon' : (project.linkText || 'View Project');

  overlayEl.classList.add('visible');
}

export function hideOverlay() {
  overlayEl.classList.remove('visible');
}

export function isOverlayVisible() {
  return overlayEl.classList.contains('visible');
}
