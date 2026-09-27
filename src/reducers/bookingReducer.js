import { fetchAPI } from '../api/bookingApi'

export const initializeTimes = () => {
  const today = new Date().toISOString().split('T')[0]
  return fetchAPI(today)
}

export const updateTimes = (state, action) => {
  switch (action.type) {
    case 'UPDATE_TIMES':
      return fetchAPI(action.payload)
    default:
      return state
  }
}
