# 🛰️ Retro Future Bulgaria — Alternative Bulgarian Timeline Explorer

[![Repository](https://img.shields.io/badge/GitHub-Repository-24292f?style=for-the-badge&logo=github)](#)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-Planned-1f2937?style=for-the-badge)](#)
[![Status](https://img.shields.io/badge/Status-MVP-1f2937?style=for-the-badge)](#)
[![Vite](https://img.shields.io/badge/Vite-Frontend-646cff?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![LocalStorage](https://img.shields.io/badge/Storage-LocalStorage-1f2937?style=for-the-badge)](#)
[![Backend](https://img.shields.io/badge/Backend-Planned%20v2-1f2937?style=for-the-badge)](#)

Retro Future Bulgaria is a cinematic interactive web app that lets users explore alternative versions of Bulgarian cities across imagined historical branches, dystopian futures, cyberpunk scenarios, and retro-futuristic timelines. The interface is delivered in **Bulgarian** and framed like a classified archive dossier. The MVP uses local data only, requires no paid AI API, and ships as a Netlify-ready static frontend.

## ✨ Features

- Explore alternative timelines by city, year, and scenario
- Generate selected or random timelines
- Cinematic archive/dossier result cards
- Bulgarian-language UI
- Technology and risk meters
- Diary fragment section
- Save favorite timelines with LocalStorage
- Copy timeline description to clipboard
- Fully static and Netlify-ready
- No backend required in MVP

## 🖼️ Screenshots

### Home / Hero
![Home screen](assets/screenshots/home.png)

### Timeline Dossier
![Timeline dossier](assets/screenshots/timeline-dossier.png)

### Archive Favorites
![Archive favorites](assets/screenshots/favorites.png)

## 🧱 Tech Stack

![Vite](https://img.shields.io/badge/Vite-646cff?style=flat-square&logo=vite&logoColor=white)
![Vanilla JS](https://img.shields.io/badge/Vanilla%20JavaScript-f7df1e?style=flat-square&logo=javascript&logoColor=000)
![HTML5](https://img.shields.io/badge/HTML5-e34f26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572b6?style=flat-square&logo=css3&logoColor=white)
![LocalStorage](https://img.shields.io/badge/LocalStorage-1f2937?style=flat-square)
![Netlify Ready](https://img.shields.io/badge/Netlify-Ready-00c7b7?style=flat-square&logo=netlify&logoColor=white)

## 🗂️ Project Structure

```
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
└── README.md
```

## 🚀 Local Setup

```bash
npm install
npm run dev
```

## 🧭 Current Scope

- MVP release with local, handcrafted timeline data
- Bulgarian UI with cinematic archive styling
- No backend or paid API usage in v1

## 🛣️ Planned Improvements

- Expanded timeline library and richer city metadata
- More dossier variations and archive filter tools
- Optional timeline export and sharing tools

## 🧪 Planned Supabase v2

Supabase integration is planned for v2 to support authenticated user profiles, cloud-synced favorites, and collaborative timeline editing.

## 👤 Author

- **S. Badev** — Frontend Developer
