# 🛰️ Retro Future Bulgaria — Alternative Bulgarian Timeline Explorer

[![GitHub](https://img.shields.io/badge/GitHub-Repository-24292f?style=for-the-badge&logo=github)](#)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-Planned-1f2937?style=for-the-badge)](#)
[![Status](https://img.shields.io/badge/Status-MVP%20%2F%20UI%20v1.6-7c3aed?style=for-the-badge)](#)
[![Vite](https://img.shields.io/badge/Vite-Frontend-646cff?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Vanilla JavaScript](https://img.shields.io/badge/Vanilla%20JavaScript-ES%20Modules-f7df1e?style=for-the-badge&logo=javascript&logoColor=000)](#)
[![CSS3](https://img.shields.io/badge/CSS3-Custom%20UI-1572b6?style=for-the-badge&logo=css3&logoColor=white)](#)
[![LocalStorage](https://img.shields.io/badge/Storage-LocalStorage-1f2937?style=for-the-badge)](#)

---

## 📌 Project Overview

**Retro Future Bulgaria** is a cinematic, interactive alternative-history web application focused on fictional Bulgarian city timelines.

The project lets users explore imagined versions of Bulgarian cities across different historical branches, dystopian futures, retro-futuristic scenarios, cyberpunk realities, socialist megacities, post-apocalyptic ports, and speculative technological timelines.

Instead of behaving like a standard text generator, the app presents every result as an **archive dossier** from a parallel Bulgarian timeline.

The experience is built around the idea of a fictional archive operating system where the user can open, inspect, save, and revisit timeline records.

---

## 🧠 Core Concept

The central question behind the project is:

> What if Bulgarian cities developed through different historical, political, technological, or dystopian paths?

A user can select:

- **city**
- **year**
- **scenario**

The app then opens a fictional archive record containing structured information about that timeline.

Each generated dossier can include:

- archive code
- signal status
- classification
- city/year/scenario metadata
- technology layer
- risk level
- historical overview
- atmosphere
- power structure
- everyday life
- recovered diary fragment
- archive visualization data
- personal archive actions

The result is not just a piece of text.  
It is presented as a **classified archive document** from an alternative version of Bulgaria.

---

## 🇧🇬 Bulgarian UI

The interface is intentionally written in **Bulgarian**.

This was a deliberate design decision, because the project is strongly connected to:

- Bulgarian cities
- Bulgarian historical imagination
- Balkan urban atmosphere
- local cultural references
- fictional national archive aesthetics

The README is written in English so the project can still be reviewed by international recruiters, developers, and GitHub visitors.

---

## ✨ Main Features

### Timeline Exploration

- Explore fictional Bulgarian alternative-history timelines
- Filter by city, year, and scenario
- Open selected timeline dossiers
- Generate random timelines
- Open featured archive records directly

### Archive Dossier Interface

- Archive-style result cards
- Dossier number and archive code
- Signal status
- Classification metadata
- Scenario tags
- Technology and risk meters
- Overview sections
- Atmosphere section
- Power structure section
- Everyday life section
- Recovered diary fragment
- End-of-dossier marker

### Archive Visualization Panel

- Dynamic archive visualization panel
- Signal graph / abstract data preview
- City, year, scenario, signal, risk, technology, and archive code metadata
- Signal timeline module
- Archive metrics module
- Archive note module
- Empty-state visualization when no timeline is selected

### User Interaction

- Save timeline records to a personal archive
- Remove saved records
- Copy timeline description to clipboard
- LocalStorage persistence
- Signal diagnostics panel based on selected coordinates
- Featured archive shortcuts
- Smooth UI transitions and archive-style feedback

### Frontend Experience

- Bulgarian-language UI
- Cinematic retro-future visual identity
- Archive terminal design elements
- Responsive layout structure
- No backend required in MVP
- No paid AI API required in v1
- Netlify-ready static frontend

---

## Project Structure + Local Setup

## 🗂️ Project Structure

```text
retro-future-bulgaria/
├── public/
├── src/
│   ├── data/
│   │   └── timelines.js
│   ├── styles/
│   │   └── style.css
│   ├── utils/
│   │   └── generator.js
│   └── main.js
├── index.html
├── package.json
├── package-lock.json
├── README.md
└── .gitignore
```

---

## 🕹️ How It Works + Data Model

### 🕹️ How the App Works

The app uses a local collection of handcrafted fictional timeline records.

A user can:

1. Select a city.
2. Select a year.
3. Select a scenario.
4. Open a matching archive dossier.
5. Generate a random timeline.
6. Open a featured archive record.
7. Save the timeline to a personal archive.
8. Remove saved timeline records.
9. Copy timeline descriptions.
10. Inspect the archive visualization panel.

Favorites are stored locally in the browser using **LocalStorage**.

---

### 🧬 Timeline Data Model

A timeline record can include fields such as:

```js
{
  id: "sof-2084-orbital",
  city: "София",
  year: "2084",
  scenario: "Балканска космическа програма",
  title: "Орбитална София",
  archiveCode: "СОФ-2084-SPACE",
  signalStatus: "Нестабилен",
  classification: "Публична симулация",
  risk: "Среден",
  technology: "Орбитална логистика, безтегловни лаборатории",
  overview: "...",
  atmosphere: "...",
  powerStructure: "...",
  everydayLife: "...",
  diaryFragment: "..."
}
```

The exact structure may evolve as the project grows.

---

## 🏙️ Included Cities

The MVP includes alternative timelines for Bulgarian cities such as:

- **Sofia**
- **Plovdiv**
- **Varna**
- **Burgas**
- **Ruse**
- **Veliko Tarnovo**

Each city is imagined through different timeline branches and speculative scenarios.

---

## 🧭 Scenario Types

The project includes fictional scenario directions such as:

- Balkan space program
- socialist megacity
- cyberpunk Bulgaria
- Black Sea technology republic
- Danube technology republic
- post-apocalyptic Balkans
- royal capital timeline
- Ottoman shadow timeline
- revival-era future
- industrial archive state
- maritime experimental zone

These are not historical claims.  
They are fictional worldbuilding scenarios used for interactive storytelling and frontend design.

---

## 🎨 UI / UX Direction

The interface is designed as a hybrid between:

- cinematic archive dashboard
- retro-futuristic Bulgarian interface
- classified timeline registry
- archive operating system
- signal analysis console
- speculative city simulator

The visual style uses:

- dark cinematic surfaces
- softened retro/future background
- archive metadata typography
- terminal-inspired system bar
- dossier-style cards
- dynamic archive visualization
- signal diagnostics
- city/year/scenario chips
- risk and technology meters

The goal is not to create a generic SaaS dashboard.  
The goal is to create a small but memorable frontend experience with a strong visual identity.

---

## 🧩 Main Interface Sections

### 1. Hero Section

Introduces the concept of the app and presents the archive system identity.

Includes:

- project title
- Bulgarian concept text
- archive/system labels
- primary actions

### 2. Status Strip

Shows compact system-level archive information:

- active signals
- current mode
- archive storage
- external requests
- last access time

### 3. Archive Workspace

Contains:

- featured timeline records
- personal archive
- saved favorites

### 4. Coordinates Panel

Allows users to select:

- city
- year
- scenario

Also includes signal diagnostics based on the current selection.

### 5. Dossier Workspace

Displays the generated archive dossier or empty state.

### 6. Archive Visualization

Shows a dynamic signal preview related to the opened timeline.

---

## 💾 LocalStorage Persistence

Saved timelines are stored in the browser using LocalStorage.

This allows the user to:

- save timeline records
- revisit them later
- remove saved records
- keep data locally without backend accounts

This approach is intentionally simple for the MVP and avoids backend complexity.

---

## 🧪 Quality Checks

Current build check:

```bash
npm run build
```

The project is designed as a static frontend app, so the most important MVP checks are:

- successful production build
- no console errors
- timeline generation works
- selected filters work
- random timeline works
- featured archive cards work
- LocalStorage favorites work
- remove favorite works
- copy description works
- responsive layout remains usable

---

## 📦 Deployment + MVP Scope

### 📦 Deployment

The project is prepared for static deployment.

Recommended platform:

- **Netlify**

Expected settings:

```text
Build command: npm run build
Publish directory: dist
```

Live demo will be added after deployment.

---

### 🧱 Current MVP Scope

The current version includes:

- local predefined timeline data
- dynamic city/year/scenario filtering
- random timeline generation
- featured archive shortcuts
- archive dossier rendering
- archive visualization panel
- LocalStorage favorites
- personal archive management
- clipboard copy action
- responsive frontend layout
- production build support

The current version does **not** include:

- backend database
- user authentication
- cloud sync
- AI-generated timeline content
- AI-generated images
- admin panel
- public user submissions

This keeps the MVP focused, lightweight, and stable.

---

## 🗄️ Planned Supabase v2 + Roadmap

### 🗄️ Planned Supabase v2

A future Supabase-based version may include:

- database-stored timeline records
- authenticated user profiles
- cloud-synced favorites
- public/private archive entries
- user-submitted timelines
- admin review and approval workflow
- collaborative worldbuilding
- Row Level Security policies
- richer timeline metadata

Supabase is intentionally planned for a later version so the core frontend experience can be completed and stabilized first.

---

### 🛣️ Planned Improvements

Possible next improvements:

- Add more Bulgarian cities
- Expand the timeline library
- Add more scenario categories
- Add search by keyword
- Add timeline tags
- Add share/export functionality
- Add screenshots to README
- Deploy to Netlify
- Add mobile polish pass
- Add optional language toggle
- Add optional Supabase-backed persistence
- Add optional AI-generated timeline expansion
- Add optional procedural city visualization per scenario

---

## 🧠 Development Approach

This project was developed as a practical frontend portfolio project.

Main development goals:

- build a visually memorable app
- avoid overengineering the MVP
- use simple frontend technologies effectively
- create a strong local concept
- demonstrate UI/UX iteration
- demonstrate state-driven rendering with Vanilla JavaScript
- demonstrate LocalStorage persistence
- prepare the project for future backend expansion

The project intentionally avoids heavy frameworks in the MVP to show what can be achieved with:

- Vite
- Vanilla JavaScript
- structured local data
- custom CSS
- careful UI iteration

---

## 🧑‍💻 What This Project Demonstrates

This project demonstrates:

- frontend architecture with Vanilla JavaScript modules
- dynamic rendering without React
- data-driven UI
- LocalStorage persistence
- responsive layout planning
- custom CSS visual systems
- dashboard-style interface design
- creative product concept development
- Bulgarian-language UI design
- portfolio-ready project documentation
- ability to iterate and improve UX based on visual feedback

---

## 👤 Author

Created by **Stefan Badev**

GitHub: [@s-badev](https://github.com/s-badev)

---

## 📄 License

This project is currently intended as a personal portfolio project.

