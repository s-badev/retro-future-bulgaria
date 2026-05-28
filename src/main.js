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

const uniqueValues = (list) => Array.from(new Set(list))
const cities = uniqueValues(timelines.map((item) => item.city)).sort((a, b) =>
  a.localeCompare(b, 'bg')
)
const years = uniqueValues(timelines.map((item) => item.year)).sort((a, b) => a - b)
const scenarios = uniqueValues(timelines.map((item) => item.scenario)).sort((a, b) =>
  a.localeCompare(b, 'bg')
)

const featuredTimelineIds = [
  'sofia-2084-balkan-space-program',
  'varna-2026-black-sea-tech',
  'ruse-2026-black-sea-tech',
]

const app = document.querySelector('#app')

app.innerHTML = `
  <div class="app">
    <div class="system-bar">
      <span>RFB_OS v2.084</span>
      <div class="system-bar-right">
        <span>РЕЖИМ: ЛОКАЛЕН АРХИВ</span>
        <span id="system-time">--:--</span>
      </div>
    </div>
    <header class="hero">
      <div class="hero-content">
        <div class="hero-labels">
          <span class="hero-label">Симулатор на алтернативна история</span>
          <span class="hero-label-secondary">Паралелен регистър</span>
        </div>
        <h1>Retro Future Bulgaria</h1>
        <p class="hero-subtitle">
          Изследвай алтернативни версии на български градове през история, антиутопия, носталгия и възможно бъдеще.
        </p>
        <p class="hero-description">
          Навигирай през архивни сигнали, градски легенди и паралелни линии, в които България се развива по различен път.
        </p>
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
        <strong>Локално хранилище</strong>
      </div>
      <div class="status-card">
        <span>Външни заявки</span>
        <strong>Няма</strong>
      </div>
      <div class="status-card">
        <span>Последен достъп</span>
        <strong id="last-access">--.--.---- // --:--</strong>
      </div>
    </section>

    <main class="content">
      <div class="workspace-row">
        <section class="featured card archive-panel" id="archive-panel">
          <div class="section-title">
            <h3>Избрани архиви</h3>
            <p>Бърз достъп до ключови времеви линии в регистъра.</p>
          </div>
          <div class="featured-grid">
            ${featuredTimelineIds
              .map((timelineId) => {
                const timeline = timelines.find((item) => item.id === timelineId)
                if (!timeline) return ''
                const archiveId = `${timeline.city.slice(0, 3).toUpperCase()}-${timeline.year}-${timeline.id
                  .split('-')
                  .slice(-1)[0]
                  .toUpperCase()}`
                const riskText = timeline.riskLevel.toLowerCase()
                const signalLabel = riskText.includes('висок')
                  ? 'Фрагментиран'
                  : riskText.includes('среден')
                    ? 'Нестабилен'
                    : 'Стабилен'
                const imageMarkup = timeline.image
                  ? `<img class="archive-card__image" src="${timeline.image}" alt="${timeline.title}" loading="lazy" />`
                  : ''
                return `
                  <button class="featured-card archive-card" data-feature-id="${timeline.id}" type="button">
                    <div class="archive-card__media" data-scenario="${timeline.scenario}">
                      ${imageMarkup}
                      <span class="archive-card__code">${archiveId}</span>
                      <span class="archive-card__status">${signalLabel}</span>
                    </div>
                    <div class="archive-card__body">
                      <div class="archive-card__meta">
                        <span>${timeline.city} · ${timeline.year}</span>
                        <span>${timeline.scenario}</span>
                      </div>
                      <strong>${timeline.title}</strong>
                      <div class="archive-card__stats">
                        <span>ТЕХ: ${timeline.technologyLevel}</span>
                        <span>РИСК: ${timeline.riskLevel}</span>
                      </div>
                      <span class="featured-action">Отвори досие</span>
                    </div>
                  </button>
                `
              })
              .join('')}
          </div>
          <div class="archive-divider" role="presentation"></div>
          <div class="archive-section" id="favorites">
            <div class="section-title compact">
              <h3>Личен архив</h3>
              <p>Съхранени сигнали от линии, които искаш да разгледаш отново.</p>
            </div>
            <div class="favorites-list" id="favorites-list">
              <div class="favorites-empty">
                <p class="empty-title">Още няма запазени времеви линии.</p>
                <p class="empty-secondary">Запази първата, за да изградиш личния си архив.</p>
              </div>
            </div>
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
          <div class="status-divider" role="presentation"></div>
          <div class="coord-status" aria-live="polite">
            <h4>Сигнална диагностика</h4>
            <div class="coord-row">
              <span>Градски възел</span>
              <strong id="coord-city">Всички</strong>
            </div>
            <div class="coord-row">
              <span>Времева честота</span>
              <strong id="coord-year">Всички</strong>
            </div>
            <div class="coord-row">
              <span>Сценарен слой</span>
              <strong id="coord-scenario">Всички</strong>
            </div>
            <div class="coord-row">
              <span>Достъп</span>
              <strong id="coord-access">Готов</strong>
            </div>
          </div>
        </section>
      </div>
      <div class="dossier-row">
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
        <section class="card signal-preview" id="signal-preview">
          <div class="section-title">
            <h3>Архивна визуализация</h3>
            <p>Избери или отвори времева линия, за да се зареди сигнална карта.</p>
          </div>
          <div class="signal-visual">
            <div class="signal-grid"></div>
            <div class="signal-ring"></div>
            <div class="signal-bars" id="signal-bars"></div>
            <div class="signal-node"></div>
            <span class="signal-ghost" id="signal-ghost">--</span>
          </div>
          <div class="signal-meta">
            <div class="signal-row">
              <span>Градски възел</span>
              <strong id="signal-city">—</strong>
            </div>
            <div class="signal-row">
              <span>Година</span>
              <strong id="signal-year">—</strong>
            </div>
            <div class="signal-row">
              <span>Сценарий</span>
              <strong id="signal-scenario">—</strong>
            </div>
            <div class="signal-row">
              <span>Сигнал</span>
              <strong id="signal-status">СИГНАЛ: ИЗЧАКВАНЕ</strong>
            </div>
            <div class="signal-row">
              <span>Риск</span>
              <strong id="signal-risk">—</strong>
            </div>
            <div class="signal-row">
              <span>Технологичен слой</span>
              <strong id="signal-tech">—</strong>
            </div>
            <div class="signal-row">
              <span>Архивен код</span>
              <strong id="signal-archive">—</strong>
            </div>
          </div>
          <div class="signal-section">
            <h4>Сигнална линия</h4>
            <div class="signal-timeline">
              <div class="timeline-step">
                <span>Възел</span>
                <strong id="timeline-node">—</strong>
              </div>
              <div class="timeline-step">
                <span>Сценарий</span>
                <strong id="timeline-scenario">—</strong>
              </div>
              <div class="timeline-step">
                <span>Досие</span>
                <strong id="timeline-dossier">—</strong>
              </div>
            </div>
          </div>
          <div class="signal-section">
            <h4>Архивни показатели</h4>
            <div class="visual-metrics">
              <div class="visual-metric-card">
                <span>Стабилност</span>
                <strong id="metric-stability" class="visual-metric-value">—</strong>
              </div>
              <div class="visual-metric-card">
                <span>Риск</span>
                <strong id="metric-risk" class="visual-metric-value">—</strong>
              </div>
              <div class="visual-metric-card">
                <span>Технологии</span>
                <strong id="metric-tech" class="visual-metric-value">—</strong>
              </div>
            </div>
            <div class="visual-details">
              <div class="visual-detail-row">
                <span>Рисков профил</span>
                <strong id="detail-risk">—</strong>
              </div>
              <div class="visual-detail-row">
                <span>Технологичен слой</span>
                <strong id="detail-tech">—</strong>
              </div>
            </div>
          </div>
          <div class="signal-section">
            <h4>Бележка от архива</h4>
            <p class="signal-note" id="signal-note">Избери времева линия, за да се зареди архивен анализ.</p>
          </div>
        </section>
      </div>
    </main>

    <footer>
      Retro Future Bulgaria · Локален архив · Публична симулация
    </footer>
  </div>
`

const startButton = document.querySelector('#start-exploring')
const randomHeroButton = document.querySelector('#random-hero')
const generateButton = document.querySelector('#generate')
const randomButton = document.querySelector('#random')
const resultCard = document.querySelector('#result-card')
const favoritesList = document.querySelector('#favorites-list')
const coordCity = document.querySelector('#coord-city')
const coordYear = document.querySelector('#coord-year')
const coordScenario = document.querySelector('#coord-scenario')
const coordAccess = document.querySelector('#coord-access')
const systemTime = document.querySelector('#system-time')
const lastAccess = document.querySelector('#last-access')
const signalPreview = document.querySelector('#signal-preview')
const signalBars = document.querySelector('#signal-bars')
const signalGhost = document.querySelector('#signal-ghost')
const signalCity = document.querySelector('#signal-city')
const signalYear = document.querySelector('#signal-year')
const signalScenario = document.querySelector('#signal-scenario')
const signalStatus = document.querySelector('#signal-status')
const signalRisk = document.querySelector('#signal-risk')
const signalTech = document.querySelector('#signal-tech')
const signalArchive = document.querySelector('#signal-archive')
const timelineNode = document.querySelector('#timeline-node')
const timelineScenario = document.querySelector('#timeline-scenario')
const timelineDossier = document.querySelector('#timeline-dossier')
const metricStability = document.querySelector('#metric-stability')
const metricRisk = document.querySelector('#metric-risk')
const metricTech = document.querySelector('#metric-tech')
const signalNote = document.querySelector('#signal-note')
const detailRisk = document.querySelector('#detail-risk')
const detailTech = document.querySelector('#detail-tech')

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

const getMatchStatus = (filters) => {
  if (!timelines.length) {
    return { status: 'Няма данни', exact: false }
  }
  const matches = filterTimelines(timelines, filters)
  if (matches.length) {
    return { status: 'Готов', exact: true }
  }
  return { status: 'Частичен сигнал', exact: false }
}

const formatDateTime = (date) => {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${day}.${month}.${year} // ${hours}:${minutes}`
}

const updateSystemTime = () => {
  const now = new Date()
  systemTime.textContent = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
  lastAccess.textContent = formatDateTime(now)
}

const updateCoordinateStatus = () => {
  coordCity.textContent = citySelect.value || 'Всички'
  coordYear.textContent = yearSelect.value || 'Всички'
  coordScenario.textContent = scenarioSelect.value || 'Всички'
  const { status } = getMatchStatus(getFilters())
  coordAccess.textContent = status
}

const updateYearOptions = () => {
  const selected = yearSelect.value
  const city = citySelect.value
  const availableYears = city
    ? uniqueValues(
        timelines
          .filter((item) => item.city === city)
          .map((item) => item.year)
      ).sort((a, b) => a - b)
    : years
  yearSelect.innerHTML = `<option value="">Всички</option>${createTimelineOptions(
    availableYears
  )}`
  if (selected && !availableYears.map(String).includes(selected)) {
    yearSelect.value = ''
  } else {
    yearSelect.value = selected
  }
}

const getScenarioAccent = (scenario) => {
  const value = scenario.toLowerCase()
  if (value.includes('космическа')) return 'accent-cyan'
  if (value.includes('технологична')) return 'accent-blue'
  if (value.includes('царска') || value.includes('османска')) return 'accent-amber'
  if (value.includes('постапокалип')) return 'accent-rose'
  return 'accent-violet'
}

const renderSignalBars = (count) => {
  signalBars.innerHTML = Array.from({ length: count }, (_, index) => {
    const height = 30 + ((index * 17) % 55)
    return `<span style="height: ${height}%"></span>`
  }).join('')
}

const getArchiveNote = (signalState) => {
  if (signalState === 'Фрагментиран') {
    return 'Линията показва силно отклонение от познатата историческа траектория.'
  }
  if (signalState === 'Нестабилен') {
    return 'Сигналът съдържа достатъчно данни за възстановяване на градската линия.'
  }
  return 'Архивният слой е активен и готов за повторно отваряне.'
}

const getShortRisk = (riskText) => {
  const value = riskText.toLowerCase()
  if (value.includes('висок')) return 'Висок'
  if (value.includes('среден')) return 'Среден'
  if (value.includes('нисък')) return 'Нисък'
  return 'Среден'
}

const getShortTech = (techText) => {
  const level = parseLevel(techText)
  if (level >= 75) return 'Висок слой'
  if (level >= 55) return 'Среден слой'
  return 'Нисък слой'
}

const renderArchiveVisualization = (timeline, { isFallback = false } = {}) => {
  if (!timeline) {
    signalPreview.className = 'card signal-preview is-idle'
    signalGhost.textContent = '--'
    signalCity.textContent = '—'
    signalYear.textContent = '—'
    signalScenario.textContent = '—'
    signalStatus.textContent = 'СИГНАЛ: ИЗЧАКВАНЕ'
    signalRisk.textContent = '—'
    signalTech.textContent = '—'
    signalArchive.textContent = '—'
    timelineNode.textContent = '—'
    timelineScenario.textContent = '—'
    timelineDossier.textContent = '—'
    metricStability.textContent = '—'
    metricRisk.textContent = '—'
    metricTech.textContent = '—'
    detailRisk.textContent = '—'
    detailTech.textContent = '—'
    signalNote.textContent = 'Избери времева линия, за да се зареди архивен анализ.'
    renderSignalBars(6)
    return
  }

  const signalState = getSignalStatus(timeline.riskLevel)
  const accent = getScenarioAccent(timeline.scenario)
  const archiveId = getArchiveId(timeline)

  signalPreview.className = `card signal-preview ${accent} is-active`
  signalGhost.textContent = timeline.year
  signalCity.textContent = timeline.city
  signalYear.textContent = timeline.year
  signalScenario.textContent = timeline.scenario
  signalStatus.textContent = `СИГНАЛ: ${signalState.toUpperCase()}`
  signalRisk.textContent = timeline.riskLevel
  signalTech.textContent = timeline.technologyLevel
  signalArchive.textContent = archiveId
  timelineNode.textContent = timeline.city
  timelineScenario.textContent = timeline.scenario
  timelineDossier.textContent = archiveId
  metricStability.textContent = signalState.toLowerCase()
  metricRisk.textContent = getShortRisk(timeline.riskLevel)
  metricTech.textContent = getShortTech(timeline.technologyLevel)
  detailRisk.textContent = timeline.riskLevel
  detailTech.textContent = timeline.technologyLevel
  const baseNote = getArchiveNote(signalState)
  signalNote.textContent = isFallback
    ? `${baseNote} Показана е най-близката налична линия.`
    : baseNote
  renderSignalBars(Math.max(4, Math.round(parseLevel(timeline.technologyLevel) / 10)))
}

const buildResultCard = (timeline, { notice, emptyTitle, emptyText } = {}) => {
  if (!timeline) {
    currentTimeline = null
    resultCard.innerHTML = `
      <div class="empty-visual">
        <div class="orb"></div>
        <div class="scan"></div>
      </div>
      <h2>${emptyTitle || 'Няма точен архивен сигнал'}</h2>
      <p class="empty-state">
        ${
          emptyText ||
          'Избраната комбинация не е налична в локалния архив. Можеш да отвориш най-близката линия или случайна линия.'
        }
      </p>
      <div class="empty-details">
        <span>Статус на сигнала: търсене</span>
        <span>Архивен поток: офлайн</span>
        <span>Необходими координати</span>
      </div>
    `
    renderArchiveVisualization(null)
    return
  }

  currentTimeline = timeline

  const favoriteLabel = isFavorite(timeline.id)
    ? 'Премахни от архива'
    : 'Запази в архива'

  const techValue = parseLevel(timeline.technologyLevel)
  const riskValue = parseLevel(timeline.riskLevel)
  const signalStatus = getSignalStatus(timeline.riskLevel)
  const archiveId = getArchiveId(timeline)

  resultCard.innerHTML = `
    <div class="reveal">
      <div class="archive-label">Архивно досие</div>
         <div class="dossier-stamp">Архивиран</div>
      ${notice ? `<div class="result-notice">${notice}</div>` : ''}
      <h2>${timeline.title}</h2>
      <div class="archive-meta">
        <span>Архивен код: ${archiveId}</span>
        <span>Статус на сигнала: ${signalStatus}</span>
        <span>Класификация: Публична симулация</span>
      </div>
         <div class="dossier-id">Досие № ${archiveId}</div>
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
         <div class="dossier-end">[КРАЙ НА ДОСИЕТО]</div>
    </div>
  `

  renderArchiveVisualization(timeline, { isFallback: Boolean(notice) })

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

const openTimelineWithDelay = (timeline, options = {}) => {
  if (!timeline) {
    buildResultCard(null)
    return
  }

  showLoadingState()
  setTimeout(() => buildResultCard(timeline, options), 650)
}

const renderFavorites = () => {
  const favorites = loadFavorites()
  const favoriteTimelines = timelines.filter((timeline) =>
    favorites.includes(timeline.id)
  )

  if (!favoriteTimelines.length) {
    favoritesList.innerHTML = `
      <div class="favorites-empty">
        <p class="empty-title">Още няма запазени времеви линии.</p>
        <p class="empty-secondary">Запази първата, за да изградиш личния си архив.</p>
      </div>
    `
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

const findClosestTimeline = (filters) => {
  if (!timelines.length) return { timeline: null, exact: false }
  const exactMatches = filterTimelines(timelines, filters)
  if (exactMatches.length) {
    return { timeline: getRandomTimeline(exactMatches), exact: true }
  }

  const city = filters.city
  const year = filters.year
  const scenario = filters.scenario

  const candidates = [
    city && scenario
      ? timelines.filter((item) => item.city === city && item.scenario === scenario)
      : [],
    city && year
      ? timelines.filter((item) => item.city === city && String(item.year) === year)
      : [],
    city ? timelines.filter((item) => item.city === city) : [],
    scenario ? timelines.filter((item) => item.scenario === scenario) : [],
    year ? timelines.filter((item) => String(item.year) === year) : [],
    timelines,
  ]

  const match = candidates.find((set) => set.length)
  return { timeline: getRandomTimeline(match || []), exact: false }
}

const generateSelectedTimeline = () => {
  const filters = getFilters()
  if (!timelines.length) {
    buildResultCard(null, {
      emptyTitle: 'Няма налични архивни линии.',
      emptyText: 'Локалният архив не съдържа достъпни записи.',
    })
    coordAccess.textContent = 'Няма данни'
    renderArchiveVisualization(null)
    return
  }

  const { timeline, exact } = findClosestTimeline(filters)
  if (!timeline) {
    buildResultCard(null)
    coordAccess.textContent = 'Няма данни'
    renderArchiveVisualization(null)
    return
  }

  const notice = exact
    ? ''
    : 'Няма точен архивен сигнал. Отворена е най-близката налична линия.'
  coordAccess.textContent = exact ? 'Готов' : 'Частичен сигнал'
  openTimelineWithDelay(timeline, { notice })
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

citySelect.addEventListener('change', () => {
  updateYearOptions()
  updateCoordinateStatus()
})
yearSelect.addEventListener('change', updateCoordinateStatus)
scenarioSelect.addEventListener('change', updateCoordinateStatus)

updateYearOptions()
updateCoordinateStatus()

updateSystemTime()
setInterval(updateSystemTime, 60000)

renderArchiveVisualization(null)

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
