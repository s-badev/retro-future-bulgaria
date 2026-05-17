# 🛰️ Retro Future Bulgaria — Alternative Bulgarian Timeline Explorer

[![GitHub](https://img.shields.io/badge/GitHub-Repository-24292f?style=for-the-badge&logo=github)](#)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-Planned-1f2937?style=for-the-badge)](#)
[![Status](https://img.shields.io/badge/Status-MVP%20%2F%20UI%20v1.5-7c3aed?style=for-the-badge)](#)
[![Vite](https://img.shields.io/badge/Vite-Frontend-646cff?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Vanilla JavaScript](https://img.shields.io/badge/Vanilla%20JavaScript-ES%20Modules-f7df1e?style=for-the-badge&logo=javascript&logoColor=000)](#)
[![LocalStorage](https://img.shields.io/badge/Storage-LocalStorage-1f2937?style=for-the-badge)](#)

---

## 📌 Project Overview

**Retro Future Bulgaria** is a cinematic, interactive alternative-history web experience focused on fictional Bulgarian city timelines.

The app lets users explore imagined versions of Bulgarian cities across different historical branches, dystopian futures, retro-futuristic scenarios, and speculative political or technological realities.

Instead of presenting information as a standard generator, the interface frames each result as an **archive dossier** from a parallel Bulgarian timeline.

The project combines:

- Bulgarian cities and local atmosphere
- alternative history storytelling
- retro-futuristic visual design
- archive terminal / dossier-style interface
- dynamic timeline filtering
- saved personal archives
- responsive frontend architecture

The UI is intentionally written in **Bulgarian** to strengthen the local identity of the project, while the README is written in English for GitHub, recruiters, and international reviewers.

---

## 🧠 Concept

The core idea is simple:

> What if Bulgarian cities developed through different historical, political, technological, or dystopian paths?

Users can choose a:

- **city**
- **year**
- **scenario**

The app then opens a fictional timeline record with:

- archive code
- signal status
- classification
- city/year/scenario metadata
- technology level
- risk level
- overview
- atmosphere
- power structure
- everyday life
- recovered diary fragment

The experience is designed to feel like accessing a **classified archive system from an alternative Bulgaria**.

---

## ✨ Features

- Explore alternative Bulgarian timelines by city, year, and scenario
- Generate selected or random timeline dossiers
- Open featured archive records directly
- Cinematic archive dashboard interface
- Bulgarian-language UI
- Retro-to-future visual background
- Archive terminal details and system-style metadata
- Dynamic result/dossier rendering
- Technology and risk level meters
- Recovered diary fragment section
- Save favorite timelines to a personal archive
- Remove saved archive entries
- Copy timeline descriptions to clipboard
- Signal diagnostics panel based on selected coordinates
- LocalStorage-based persistence
- Fully static frontend
- No backend required in MVP
- No paid AI API required in v1
- Netlify-ready deployment structure

---

## 🖼️ Screenshots

> Screenshots will be added after the final visual pass and Netlify deployment.

### Home / Hero

![Home screen](assets/screenshots/home.png)

### Archive Dashboard

![Archive dashboard](assets/screenshots/dashboard.png)

### Timeline Dossier

![Timeline dossier](assets/screenshots/timeline-dossier.png)

### Personal Archive

![Personal archive](assets/screenshots/personal-archive.png)

---

## 🧱 Tech Stack

![Vite](https://img.shields.io/badge/Vite-646cff?style=flat-square&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/Vanilla%20JavaScript-f7df1e?style=flat-square&logo=javascript&logoColor=000)
![HTML5](https://img.shields.io/badge/HTML5-e34f26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572b6?style=flat-square&logo=css3&logoColor=white)
![LocalStorage](https://img.shields.io/badge/LocalStorage-1f2937?style=flat-square)
![Netlify](https://img.shields.io/badge/Netlify-Ready-00c7b7?style=flat-square&logo=netlify&logoColor=white)

### Current MVP

- **Vite**
- **Vanilla JavaScript**
- **HTML5**
- **CSS3**
- **LocalStorage**
- **Static local data**
- **Responsive CSS layout**

### Planned v2

- **Supabase Database**
- **Supabase Auth**
- **Cloud-synced favorites**
- **User-submitted timelines**
- **Admin approval workflow**
- **Row Level Security policies**

---

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
