# EFOVILLE — WebXR Dream House
### Inspired by the Bel Air Mansion | A-Frame 1.5.0

---

## 🏡 About
A fully immersive WebXR dream estate experience built with A-Frame.
Style: Bel Air Mansion × Countryside Estate × Modern Los Angeles.

---

## 📁 Folder Structure
```
EFOVILLE/
├── index.html                        ← Open this in a browser
├── README.md
├── assets/
│   ├── models/
│   │   ├── mansion/
│   │   │   └── mansion.glb           ← ⬅ DROP YOUR MANSION MODEL HERE
│   │   ├── vehicles/
│   │   │   ├── escalade.glb          ← ⬅ Cadillac Escalade
│   │   │   ├── aston_martin_dbx.glb  ← ⬅ Aston Martin DBX
│   │   │   └── bmw_x6m.glb           ← ⬅ BMW X6M Competition
│   │   ├── environment/
│   │   │   ├── basketball_court.glb
│   │   │   ├── fireplace.glb
│   │   │   └── pool_water_plane.glb
│   │   └── props/
│   │       ├── outdoor_furniture.glb
│   │       └── driveway.glb
│   ├── hdr/
│   │   └── sky_sunset.hdr            ← ⬅ HDRI lighting file
│   └── js/
│       ├── water-shader.js           ← Animated pool water
│       └── fire-component.js         ← Flickering fire light
└── libs/                             ← Optional local CDN backups
```

---

## 🚀 How to Run
1. Download all required 3D models (see MODELS.md or plan doc)
2. Place models in the correct folders above
3. Open `index.html` in a browser
   - Best in **Chrome** or **Edge** for WebXR
   - For local dev use: `npx serve .` or VS Code Live Server

---

## 🎮 Controls
| Action | Key |
|--------|-----|
| Move   | W A S D |
| Look   | Mouse drag |
| Enter VR | VR button (bottom right) |

---

## 🔦 Lighting Setup
Three-layer lighting ensures NO dark scenes:
- **Ambient** — fills all shadows
- **Directional** — LA golden sun angle  
- **Hemisphere** — sky/ground tint
- **Point lights** — pool glow + fire flicker

---

## 📦 Model Sources
Search on **Sketchfab** (free, downloadable, GLB format):
- Mansion: `bel air mansion modern` or `luxury villa exterior`
- Escalade: `Cadillac Escalade 2022`
- Aston Martin DBX: `Aston Martin DBX`
- BMW X6M: `BMW X6M Competition`
- Basketball Court: `outdoor basketball court`
- Fireplace: `outdoor stone fireplace`

Always download as **GLB** format.

---

## 💡 Notes
- Scene anchors on mansion at `position="0 0 -15"`
- Player starts at `position="0 1.6 12"` facing the front entrance
- Fire flicker uses `fire-component.js` + `aframe-particle-system-component`
- Pool animation uses `water-shader.js` (custom tick-based UV shift)

---

Built with ❤️ by EFOVILLE Project
