
# 🎮 SUICO AND LACLAC — Tech & Narrative Portfolio

A futuristic, high-performance tandem portfolio for Computer Science developers. This project blends advanced system design with immersive storytelling, featuring a soft-neon cyberpunk aesthetic optimized for eye comfort.

## ✨ Project Overview
This portfolio showcases the synergy between two developers: **SUICO** (Systems & Logic) and **LACLAC** (Narrative & Architecture). It is divided into five core interactive sectors:
- **Hero & Core Stats**: Dynamic scroll-triggered counter for technical milestones.
- **Game Archives**: Playable demos and source code for logic-driven games.
- **Speculative Fiction**: Original stories rooted in Computer Science concepts (Recursion, Checksums, Cloud Architecture).
- **Neural Skills Grid**: Animated proficiency meters with neon-pulse hover feedback.
- **Secure Uplink**: A high-fidelity contact terminal for professional collaboration.

## 🛠️ Tech Stack
- **Framework**: React 19 (Strict Mode)
- **Styling**: Tailwind CSS + Glassmorphism + Custom CSS Pulsing Keyframes
- **Icons**: Lucide-React (High-fidelity vector icons)
- **Intelligence**: Google Gemini API (used for dynamic story world-building)
- **Animation**: Intersection Observer API (for scroll triggers) + CSS Transforms

## 🚀 Installation & Run Instructions

### Prerequisites


### Running Locally
1. **Clone the project** into your root directory.
2. **Environment Setup**:
   - Ensure the environment variable `process.env.API_KEY` is set to your Gemini API key if you wish to use the dynamic lore expansion feature.
3. **Execution**:
   - Since this project uses ES6 modules and standard web imports via `esm.sh`, you can serve the directory using any local development server (e.g., Live Server, Vite, or simple Python HTTP server).
   - Command (if using Python): `python -m http.server 8000`
4. **Access**:
   - Open your browser and navigate to `http://localhost:8000`.

## 📦 What's Inside?
- `index.html`: The entry point featuring the Glassmorphism CSS engine and Orbital font imports.
- `App.tsx`: The main reactor containing all UI logic, scroll observers, and modal states.
- `constants.tsx`: The data layer containing project metadata and story summaries.
- `types.ts`: TypeScript interfaces ensuring data integrity across the system.
- `metadata.json`: Project configuration for the hosting environment.

---
*Engineered by SUICO & LACLAC for the Digital Frontier.*
