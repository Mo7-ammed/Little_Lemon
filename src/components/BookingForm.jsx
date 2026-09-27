import { useState } from 'react'

export default function BookingForm({ availableTimes, onDateChange, onSubmitBooking, submitError }) {
  const today = new Date().toISOString().split('T')[0]

  const [date, setDate] = useState(today)
  const [time, setTime] = useState(availableTimes && availableTimes.length > 0 ? availableTimes[0] : '')
  const [guests, setGuests] = useState(2)
  const [occasion, setOccasion] = useState('Birthday')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const [touched, setTouched] = useState({
    date: false,
    time: false,
    guests: false,
    name: false,
    email: false,
  })

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  const handleDateChange = (e) => {
    const selectedDate = e.target.value
    setDate(selectedDate)
    onDateChange(selectedDate)
  }

  const validate = () => {
    const errors = {}

    if (!date) {
      errors.date = 'Please choose a date.'
    } else if (date < today) {
      errors.date = 'Date cannot be in the past.'
    }

    if (!time) {
      errors.time = 'Please select an available reservation time.'
    } else if (availableTimes && !availableTimes.includes(time)) {
      errors.time = 'Selected time is not currently available.'
    }

    const guestsNum = Number(guests)
    if (!guests || isNaN(guestsNum)) {
      errors.guests = 'Number of guests is required.'
    } else if (guestsNum < 1) {
      errors.guests = 'Must have at least 1 guest.'
    } else if (guestsNum > 10) {
      errors.guests = 'For parties larger than 10, please call us directly.'
    }

    if (!name.trim()) {
      errors.name = 'Full name is required.'
    }

    if (!email.trim()) {
      errors.email = 'Email address is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Please enter a valid email address.'
    }

    return errors
  }

  const errors = validate()
  const isFormValid = Object.keys(errors).length === 0

  const handleSubmit = (e) => {
    e.preventDefault()
    setTouched({
      date: true,
      time: true,
      guests: true,
      name: true,
      email: true,
    })

    if (!isFormValid) {
      return
    }

    onSubmitBooking({
      date,
      time,
      guests: Number(guests),
      occasion,
      name: name.trim(),
      email: email.trim(),
    })
  }

  return (
    <form className="booking-form" onSubmit={handleSubmit} noValidate aria-label="Table reservation form">
      {submitError && (
        <div className="server-error-banner" role="alert">
          {submitError}
        </div>
      )}

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="res-date" className="form-label">
            Choose date <span className="required-star">*</span>
          </label>
          <input
            type="date"
            id="res-date"
            name="res-date"
            value={date}
            min={today}
            className={`form-input ${touched.date && errors.date ? 'input-error' : ''}`}
            onChange={handleDateChange}
            onBlur={() => handleBlur('date')}
            required
            aria-required="true"
            aria-invalid={touched.date && Boolean(errors.date)}
            aria-describedby={touched.date && errors.date ? 'date-error' : undefined}
          />
          {touched.date && errors.date && (
            <span id="date-error" className="form-error" role="alert">
              {errors.date}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="res-time" className="form-label">
            Choose time <span className="required-star">*</span>
          </label>
          <select
            id="res-time"
            name="res-time"
            value={time}
            className={`form-select ${touched.time && errors.time ? 'input-error' : ''}`}
            onChange={(e) => setTime(e.target.value)}
            onBlur={() => handleBlur('time')}
            required
            aria-required="true"
            aria-invalid={touched.time && Boolean(errors.time)}
            aria-describedby={touched.time && errors.time ? 'time-error' : undefined}
          >
            <option value="">Select a time</option>
            {availableTimes &&
              availableTimes.map((availableTime) => (
                <option key={availableTime} value={availableTime}>
                  {availableTime}
                </option>
              ))}
          </select>
          {touched.time && errors.time && (
            <span id="time-error" className="form-error" role="alert">
              {errors.time}
            </span>
          )}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="guests" className="form-label">
            Number of guests <span className="required-star">*</span>
          </label>
          <input
            type="number"
            placeholder="1"
            min="1"
            max="10"
            id="guests"
            name="guests"
            value={guests}
            className={`form-input ${touched.guests && errors.guests ? 'input-error' : ''}`}
            onChange={(e) => setGuests(e.target.value)}
            onBlur={() => handleBlur('guests')}
            required
            aria-required="true"
            aria-invalid={touched.guests && Boolean(errors.guests)}
            aria-describedby={touched.guests && errors.guests ? 'guests-error' : undefined}
          />
          {touched.guests && errors.guests && (
            <span id="guests-error" className="form-error" role="alert">
              {errors.guests}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="occasion" className="form-label">
            Occasion
          </label>
          <select
            id="occasion"
            name="occasion"
            value={occasion}
            className="form-select"
            onChange={(e) => setOccasion(e.target.value)}
          >
            <option value="Birthday">Birthday</option>
            <option value="Anniversary">Anniversary</option>
            <option value="Engagement">Engagement</option>
            <option value="Other">Other / None</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="full-name" className="form-label">
            Full Name <span className="required-star">*</span>
          </label>
          <input
            type="text"
            id="full-name"
            name="full-name"
            placeholder="e.g. John Doe"
            value={name}
            className={`form-input ${touched.name && errors.name ? 'input-error' : ''}`}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => handleBlur('name')}
            required
            aria-required="true"
            aria-invalid={touched.name && Boolean(errors.name)}
            aria-describedby={touched.name && errors.name ? 'name-error' : undefined}
          />
          {touched.name && errors.name && (
            <span id="name-error" className="form-error" role="alert">
              {errors.name}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email Address <span className="required-star">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="e.g. john@example.com"
            value={email}
            className={`form-input ${touched.email && errors.email ? 'input-error' : ''}`}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => handleBlur('email')}
            required
            aria-required="true"
            aria-invalid={touched.email && Boolean(errors.email)}
            aria-describedby={touched.email && errors.email ? 'email-error' : undefined}
          />
          {touched.email && errors.email && (
            <span id="email-error" className="form-error" role="alert">
              {errors.email}
            </span>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="btn-primary"
        disabled={!isFormValid}
        aria-label="Confirm table reservation"
        style={{ marginTop: '1rem', width: '100%', opacity: !isFormValid ? 0.6 : 1, cursor: !isFormValid ? 'not-allowed' : 'pointer' }}
      >
        Make Your Reservation
      </button>
    </form>
  )
}
