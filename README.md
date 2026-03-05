# Luke's Portfolio

An interactive portfolio website styled as a Pokemon Leaf Green-era RPG. Visitors control a character walking through a pixel-art village where each building represents a portfolio project.

**[Visit the live site](https://luke-whitaker.github.io/portfolio-site/)**

## How It Works

**Desktop**
- **Arrow keys** — move your character
- **ENTER** — talk to NPCs / interact
- **Walk into a door** — view project details or enter a building interior
- **ESC** — close a project card / exit dialogue

**Mobile**
- **D-pad** (bottom-left) — move your character
- **A button** (bottom-right) — talk to NPCs / interact
- **Walk into a door** — view project details or enter a building interior
- **Tap outside the card** — close a project card
- **Tap the screen** — advance dialogue

## Architecture

The entire site is a single HTML page with an HTML5 Canvas game rendered in vanilla JavaScript (ES modules). No frameworks, no build tools, no dependencies — just static files served by GitHub Pages.

### File Structure

```
portfolio-site/
├── index.html              # Entry point + mobile D-pad controls
├── style.css               # UI overlay + mobile controls styling
├── src/
│   ├── main.js             # Boot, game state, update/render loop
│   ├── constants.js        # Tile size, colour palette, player config
│   ├── canvas.js           # Canvas initialisation
│   ├── game-loop.js        # Fixed-timestep requestAnimationFrame loop
│   ├── input.js            # Keyboard + touch input state
│   ├── camera.js           # Viewport follow + edge clamping
│   ├── tileset.js          # Procedural 16x16 tile generation
│   ├── sprites.js          # Procedural player + NPC sprite generation
│   ├── map-data.js         # 90x20 overworld tile grid + collision map
│   ├── home-map.js         # 15x10 home interior tile grid + collision map
│   ├── map-renderer.js     # Draws visible tiles each frame
│   ├── player.js           # Movement, collision, animation
│   ├── npc.js              # NPC positions, proximity, dialogue lines
│   ├── overlay.js          # HTML overlay show/hide logic
│   └── projects.js         # Project data + door coordinates + map doors
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
| Input | Unified key-state object — keyboard events and D-pad touch events both write to the same `keys` map, so all game logic is input-agnostic |
| Maps | Two maps: `overworld` (90×20) and `home` interior (15×10). Entering/exiting triggers a fade-to-black transition and player respawn |
| Mobile controls | D-pad + A button rendered via HTML/CSS, visible only on `pointer: coarse` devices |

## Featured Projects

| Building | Project | Description |
|----------|---------|-------------|
| Home | **Chez Luke Whitaker** | Walk inside — a cosy interior with a cat NPC |
| 1 | **Stats Web App** | Data tools for quantitatively literate non-experts |
| 2 | **Corpus Analysis Explorer** | Linguistic profile tool with curated metrics |
| 3 | **Jupyter Notebook Series** | Mini-papers on linguistic datasets |

## Roadmap

### Near-term
- [ ] Add real project URLs to `src/projects.js`
- [ ] Add project screenshots or pixel-art previews to the overlay cards
- [ ] Replace procedural sprites with hand-drawn pixel art (Aseprite / Piskel)
- [ ] Give the home cat NPC dialogue about what's inside the house

### Medium-term
- [ ] Add more buildings as new projects are completed
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

## License

This project is open source. Feel free to fork it and adapt it for your own portfolio.
