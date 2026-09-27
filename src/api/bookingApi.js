const seededRandom = (seed) => {
  const m = 2 ** 35 - 31
  const a = 185852
  let s = seed % m
  return () => {
    s = (s * a) % m
    return s / m
  }
}

export const fetchAPI = (date) => {
  const result = []
  const dateObj = new Date(date)
  const seed = dateObj.getDate() || 1
  const random = seededRandom(seed)

  for (let i = 17; i <= 22; i++) {
    if (random() < 0.5) {
      result.push(`${i}:00`)
    }
    if (random() < 0.5) {
      result.push(`${i}:30`)
    }
  }

  if (result.length === 0) {
    result.push('17:00', '18:30', '20:00', '21:30')
  }

  return result
}

export const submitAPI = (formData) => {
  if (!formData || !formData.date || !formData.time || !formData.guests) {
    return false
  }
  return true
}
