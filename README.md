# Luke's Portfolio

An interactive portfolio website styled as a Pokemon Leaf Green-era RPG. Visitors control a character walking through a pixel-art village where each building represents a portfolio project.

**[Visit the live site](https://luke-whitaker.github.io/portfolio-site/)**

## How It Works

- **Arrow keys / WASD** — move your character
- **ENTER** — talk to NPCs near buildings
- **Walk into a door** — view project details
- **ESC** — return to the overworld

## Architecture

The entire site is a single HTML page with an HTML5 Canvas game rendered in vanilla JavaScript (ES modules). No frameworks, no build tools, no dependencies — just static files served by GitHub Pages.

### File Structure

```
portfolio-site/
├── index.html              # Entry point
├── style.css               # UI overlay styling
├── src/
│   ├── main.js             # Boot, game state, update/render loop
│   ├── constants.js        # Tile size, colour palette, player config
│   ├── canvas.js           # Canvas initialisation
│   ├── game-loop.js        # Fixed-timestep requestAnimationFrame loop
│   ├── input.js            # Keyboard state tracker
│   ├── camera.js           # Viewport follow + edge clamping
│   ├── tileset.js          # Procedural 16x16 tile generation
│   ├── sprites.js          # Procedural player + NPC sprite generation
│   ├── map-data.js         # 30x20 tile grid + collision map
│   ├── map-renderer.js     # Draws visible tiles each frame
│   ├── player.js           # Movement, collision, animation
│   ├── npc.js              # NPC positions, proximity, dialogue lines
│   ├── overlay.js          # HTML overlay show/hide logic
│   └── projects.js         # Project data (titles, descriptions, links)
└── assets/
    └── README.md           # Notes on replacing generated art
```

### Key Design Decisions

| Area | Approach |
|------|----------|
| Rendering | Direct-to-canvas in layer order: tiles → NPCs → player → UI |
| Art | All tiles and sprites generated procedurally via `fillRect` — no image files |
| Palette | Pokemon Leaf Green-inspired full-colour GBA palette |
| Collision | Per-axis rejection with a player hitbox smaller than the tile for smooth wall-sliding |
| Overlays | Pure HTML/CSS positioned over the canvas with CSS transitions |
| Game loop | Fixed-timestep (60 fps) with delta-time accumulator |

## Featured Projects

| Building | Project | Description |
|----------|---------|-------------|
| 1 | **Stats Web App** | Data tools for quantitatively literate non-experts |
| 2 | **Corpus Analysis Explorer** | Linguistic profile tool with curated metrics |
| 3 | **Jupyter Notebook Series** | Mini-papers on linguistic datasets |

## Roadmap

### Near-term
- [ ] Add real project URLs to `src/projects.js`
- [ ] Add project screenshots or pixel-art previews to the overlay cards
- [ ] Replace procedural sprites with hand-drawn pixel art (Aseprite / Piskel)
- [ ] Add mobile touch controls (on-screen D-pad + action button)

### Medium-term
- [ ] Add more buildings as new projects are completed
- [ ] Interior rooms — walk through a door into a detailed project scene
- [ ] Ambient sound effects (footsteps, door open, dialogue blip)
- [ ] Background music (chiptune, toggleable)
- [ ] Day/night cycle with palette shifts
- [ ] Save player position to localStorage

### Long-term
- [ ] Custom tilemap editor for faster map iteration
- [ ] Animated NPC walk cycles and patrol paths
- [ ] Particle effects (e.g. falling leaves, rain)
- [ ] Custom domain setup
- [ ] Analytics integration to track which projects visitors explore

Then open http://localhost:8080.

## License

This project is open source. Feel free to fork it and adapt it for your own portfolio.
