import './styles/style.css'
import timelines from './data/timelines.js'
import {
  copyToClipboard,
  createTimelineOptions,
  filterTimelines,
  getRandomTimeline,
  isFavorite,
  loadFavorites,
  toggleFavorite,
} from './utils/generator.js'

const cities = ['София', 'Пловдив', 'Варна', 'Бургас', 'Велико Търново', 'Русе']
const years = [1920, 1944, 1989, 2026, 2084]
const scenarios = [
  'Киберпънк България',
  'Социалистически мегаград',
  'Царска столица',
  'Постапокалиптични Балкани',
  'Балканска космическа програма',
  'Османска сенчеста времева линия',
  'Бъдеще от Възраждането',
  'Черноморска технологична република',
  'Дунавска технологична република',
]

const featuredTimelineIds = [
  'sofia-2084-balkan-space-program',
  'varna-2026-black-sea-tech',
  'ruse-2026-black-sea-tech',
]

const app = document.querySelector('#app')

app.innerHTML = `
  <div class="app">
    <header class="hero">
      <div class="hero-content">
        <span class="hero-label">Симулатор на алтернативна история</span>
        <h1>Retro Future Bulgaria</h1>
        <p class="hero-subtitle">
          Изследвай алтернативни версии на български градове през история, антиутопия, носталгия и възможни бъдеща.
        </p>
        <p class="hero-description">
          Навигирай кинематографични линии, в които балканските градове се развиват през царски преврати, неонови републики и разпадащи се хоризонти.
        </p>
        <div class="hero-chips">
          <span class="chip">Локални данни</span>
          <span class="chip">Без AI API</span>
          <span class="chip">Готов за Netlify</span>
          <span class="chip">Локален архив</span>
        </div>
        <div class="hero-actions">
          <button class="btn" id="start-exploring" type="button">Започни</button>
          <button class="btn secondary" id="random-hero" type="button">Случайна линия</button>
        </div>
      </div>
    </header>

    <section class="status-strip">
      <div class="status-card">
        <span>Активни сигнали</span>
        <strong>20+</strong>
      </div>
      <div class="status-card">
        <span>Режим</span>
        <strong>Локален архив</strong>
      </div>
      <div class="status-card">
        <span>Архив</span>
        <strong>Browser Storage</strong>
      </div>
      <div class="status-card">
        <span>Външни заявки</span>
        <strong>Няма</strong>
      </div>
    </section>

    <main class="content">
      <section class="featured card">
        <div class="section-title">
          <h3>Избрани архиви</h3>
          <p>Бърз достъп до ключови времеви линии в регистъра.</p>
        </div>
        <div class="featured-grid">
          ${featuredTimelineIds
            .map((timelineId) => {
              const timeline = timelines.find((item) => item.id === timelineId)
              if (!timeline) return ''
              return `
                <button class="featured-card" data-feature-id="${timeline.id}" type="button">
                  <span class="featured-title">${timeline.city} · ${timeline.year}</span>
                  <strong>${timeline.title}</strong>
                  <span class="featured-scenario">${timeline.scenario}</span>
                  <span class="featured-action">Отвори досие</span>
                </button>
              `
            })
            .join('')}
        </div>
      </section>
      <section class="controls card" id="controls">
        <div class="section-title">
          <h3>Избери координати</h3>
          <p>Калибрирай града, годината и сценария, за да отвориш паралелен архив.</p>
        </div>
        <div>
          <label for="city-select">Град</label>
          <select id="city-select">
            <option value="">Всички</option>
            ${createTimelineOptions(cities)}
          </select>
        </div>
        <div>
          <label for="year-select">Година</label>
          <select id="year-select">
            <option value="">Всички</option>
            ${createTimelineOptions(years)}
          </select>
        </div>
        <div>
          <label for="scenario-select">Сценарий</label>
          <select id="scenario-select">
            <option value="">Всички</option>
            ${createTimelineOptions(scenarios)}
          </select>
        </div>
  <button class="btn" id="generate" type="button">Отвори избраната линия</button>
  <button class="btn secondary" id="random" type="button">Отвори случайна линия</button>
      </section>

      <section class="result card" id="result-card">
        <div class="empty-visual">
          <div class="orb"></div>
          <div class="scan"></div>
        </div>
    <h2>Няма засечен времеви сигнал</h2>
        <p class="empty-state">
          Избери град, година и сценарий, за да отвориш паралелна българска времева линия.
        </p>
        <div class="empty-details">
          <span>Статус на сигнала: изчакване</span>
          <span>Архивен поток: офлайн</span>
          <span>Необходими координати</span>
        </div>
      </section>

      <section class="card" id="favorites">
        <div class="section-title">
          <h3>Личен архив</h3>
          <p>Съхранени сигнали от линии, които искаш да разгледаш отново.</p>
        </div>
        <div class="favorites-list" id="favorites-list">
          <p class="empty-state">Още няма запазени времеви линии. Запази първата, за да изградиш личния си архив.</p>
        </div>
      </section>
    </main>

    <footer>
      Retro Future Bulgaria MVP · Локални данни · Netlify-ready
    </footer>
  </div>
`

const startButton = document.querySelector('#start-exploring')
const randomHeroButton = document.querySelector('#random-hero')
const generateButton = document.querySelector('#generate')
const randomButton = document.querySelector('#random')
const resultCard = document.querySelector('#result-card')
const favoritesList = document.querySelector('#favorites-list')

const citySelect = document.querySelector('#city-select')
const yearSelect = document.querySelector('#year-select')
const scenarioSelect = document.querySelector('#scenario-select')

let currentTimeline = null

const parseLevel = (text) => {
  const value = text.toLowerCase()
  if (value.includes('висок')) return 80
  if (value.includes('среден')) return 60
  if (value.includes('нисък')) return 40
  if (value.includes('квант') || value.includes('сливане') || value.includes('ai')) return 85
  if (value.includes('автомат') || value.includes('орбитал') || value.includes('умен')) return 70
  if (value.includes('ранен') || value.includes('възстанов') || value.includes('ремонт')) return 45
  return 65
}

const getSignalStatus = (riskText) => {
  const value = riskText.toLowerCase()
  if (value.includes('висок')) return 'Фрагментиран'
  if (value.includes('среден')) return 'Нестабилен'
  return 'Стабилен'
}

const getArchiveId = (timeline) => {
  const prefix = timeline.city.slice(0, 3).toUpperCase()
  return `${prefix}-${timeline.year}-${timeline.id.split('-').slice(-1)[0].toUpperCase()}`
}

const getFilters = () => ({
  city: citySelect.value,
  year: yearSelect.value,
  scenario: scenarioSelect.value,
})

const buildResultCard = (timeline) => {
  if (!timeline) {
    currentTimeline = null
    resultCard.innerHTML = `
      <div class="empty-visual">
        <div class="orb"></div>
        <div class="scan"></div>
      </div>
      <h2>Няма съвпадаща времева линия</h2>
      <p class="empty-state">Промени филтрите или отвори случайна линия.</p>
      <div class="empty-details">
        <span>Статус на сигнала: търсене</span>
        <span>Архивен поток: офлайн</span>
        <span>Необходими координати</span>
      </div>
    `
    return
  }

  currentTimeline = timeline

  const favoriteLabel = isFavorite(timeline.id)
    ? 'Премахни'
    : 'Запази в архива'

  const techValue = parseLevel(timeline.technologyLevel)
  const riskValue = parseLevel(timeline.riskLevel)
  const signalStatus = getSignalStatus(timeline.riskLevel)
  const archiveId = getArchiveId(timeline)

  resultCard.innerHTML = `
    <div class="reveal">
      <div class="archive-label">Архивно досие</div>
      <h2>${timeline.title}</h2>
      <div class="archive-meta">
        <span>Архивен код: ${archiveId}</span>
        <span>Статус на сигнала: ${signalStatus}</span>
        <span>Класификация: Публична симулация</span>
      </div>
      <div class="timeline-meta">
        <span class="tag">${timeline.city}</span>
        <span class="tag">${timeline.year}</span>
        <span class="tag">${timeline.scenario}</span>
        <span class="tag">${timeline.riskLevel}</span>
        <span class="tag">${timeline.technologyLevel}</span>
      </div>
      <div class="timeline-metrics">
        <div>
          <span>Технологии</span>
          <div class="meter">
            <span class="meter-fill tech" style="width: ${techValue}%"></span>
          </div>
          <small>${timeline.technologyLevel}</small>
        </div>
        <div>
          <span>Ниво на риск</span>
          <div class="meter">
            <span class="meter-fill risk" style="width: ${riskValue}%"></span>
          </div>
          <small>${timeline.riskLevel}</small>
        </div>
      </div>
      <div class="timeline-sections">
        <div>
          <h4>Обзор</h4>
          <p>${timeline.description}</p>
        </div>
        <div>
          <h4>Атмосфера</h4>
          <p>${timeline.atmosphere}</p>
        </div>
        <div>
          <h4>Структура на властта</h4>
          <p>${timeline.government}</p>
        </div>
        <div>
          <h4>Ежедневие</h4>
          <p>${timeline.everydayLife}</p>
        </div>
      </div>
      <div class="diary">
        <h4>Възстановен дневников фрагмент</h4>
        <p>${timeline.diaryEntry}</p>
      </div>
      <div class="actions">
  <button class="btn" id="favorite-toggle" type="button">${favoriteLabel}</button>
  <button class="btn secondary" id="copy-description" type="button">Копирай описанието</button>
      </div>
    </div>
  `

  document.querySelector('#favorite-toggle').addEventListener('click', () => {
    toggleFavorite(timeline.id)
    renderFavorites()
    buildResultCard(timeline)
  })

  document.querySelector('#copy-description').addEventListener('click', async () => {
    const success = await copyToClipboard(timeline.description)
    if (success) {
      document.querySelector('#copy-description').textContent = 'Копирано!'
      setTimeout(() => {
        document.querySelector('#copy-description').textContent = 'Копирай описанието'
      }, 1500)
    }
  })
}

const loadingMessages = [
  'Сканиране на времеви сигнал...',
  'Синхронизиране на архивен код...',
  'Отваряне на паралелен запис...',
]

const showLoadingState = () => {
  const message = loadingMessages[Math.floor(Math.random() * loadingMessages.length)]
  resultCard.innerHTML = `
    <div class="loading-state">
      <div class="loading-orb"></div>
      <p>${message}</p>
    </div>
  `
}

const openTimelineWithDelay = (timeline) => {
  if (!timeline) {
    buildResultCard(null)
    return
  }

  showLoadingState()
  setTimeout(() => buildResultCard(timeline), 650)
}

const renderFavorites = () => {
  const favorites = loadFavorites()
  const favoriteTimelines = timelines.filter((timeline) =>
    favorites.includes(timeline.id)
  )

  if (!favoriteTimelines.length) {
    favoritesList.innerHTML =
      '<p class="empty-state">Още няма запазени времеви линии. Запази първата, за да изградиш личния си архив.</p>'
    return
  }

  favoritesList.innerHTML = favoriteTimelines
    .map(
      (timeline) => `
        <div class="favorite-card">
          <h4>${timeline.title}</h4>
          <div class="favorite-meta">
            <span>${timeline.city}</span>
            <span>${timeline.year}</span>
            <span>${timeline.scenario}</span>
          </div>
          <button class="btn secondary" data-remove="${timeline.id}" type="button">Премахни</button>
        </div>
      `
    )
    .join('')

  favoritesList.querySelectorAll('[data-remove]').forEach((button) => {
    button.addEventListener('click', () => {
      toggleFavorite(button.dataset.remove)
      renderFavorites()
      if (currentTimeline) {
        const updated = timelines.find((item) => item.id === currentTimeline.id)
        if (updated) buildResultCard(updated)
      }
    })
  })
}

const generateSelectedTimeline = () => {
  const filtered = filterTimelines(timelines, getFilters())
  const timeline = getRandomTimeline(filtered)
  openTimelineWithDelay(timeline)
}

const generateRandomTimeline = () => {
  const filters = getFilters()
  const filtered = filterTimelines(timelines, filters)
  const source = filtered.length ? filtered : timelines
  const timeline = getRandomTimeline(source)
  openTimelineWithDelay(timeline)
}

startButton.addEventListener('click', () => {
  document.querySelector('#controls').scrollIntoView({ behavior: 'smooth' })
})

randomHeroButton.addEventListener('click', generateRandomTimeline)
generateButton.addEventListener('click', generateSelectedTimeline)
randomButton.addEventListener('click', generateRandomTimeline)

document.querySelectorAll('[data-feature-id]').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.featured-card').forEach((card) => {
      card.classList.remove('is-active')
    })
    button.classList.add('is-active')
    const timeline = timelines.find((item) => item.id === button.dataset.featureId)
    openTimelineWithDelay(timeline)
    resultCard.scrollIntoView({ behavior: 'smooth' })
  })
})

renderFavorites()
