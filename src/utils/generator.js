const STORAGE_KEY = 'rfb:favorites'

const normalizeValue = (value) => (value ? String(value) : '')

export const filterTimelines = (timelines, filters) => {
  const city = normalizeValue(filters.city)
  const year = normalizeValue(filters.year)
  const scenario = normalizeValue(filters.scenario)

  return timelines.filter((timeline) => {
    const matchesCity = city ? timeline.city === city : true
    const matchesYear = year ? String(timeline.year) === year : true
    const matchesScenario = scenario ? timeline.scenario === scenario : true

    return matchesCity && matchesYear && matchesScenario
  })
}

export const getRandomTimeline = (timelines) => {
  if (!timelines.length) return null
  const randomIndex = Math.floor(Math.random() * timelines.length)
  return timelines[randomIndex]
}

export const loadFavorites = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch (error) {
    console.error('Failed to load favorites', error)
    return []
  }
}

export const saveFavorites = (favorites) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
}

export const toggleFavorite = (timelineId) => {
  const favorites = loadFavorites()
  const exists = favorites.includes(timelineId)
  const updated = exists
    ? favorites.filter((id) => id !== timelineId)
    : [...favorites, timelineId]

  saveFavorites(updated)
  return updated
}

export const isFavorite = (timelineId) => {
  const favorites = loadFavorites()
  return favorites.includes(timelineId)
}

export const copyToClipboard = async (text) => {
  if (!text) return false
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (error) {
    console.error('Clipboard error', error)
    return false
  }
}

export const createTimelineOptions = (list) =>
  list.map((item) => `<option value="${item}">${item}</option>`).join('')
