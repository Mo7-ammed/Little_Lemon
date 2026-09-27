import { useState } from 'react'
import BookingForm from './BookingForm'
import { submitAPI } from '../api/bookingApi'

export default function BookingPage({ availableTimes, dispatchTimes, onNavigate }) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [bookingDetails, setBookingDetails] = useState(null)
  const [submitError, setSubmitError] = useState('')

  const handleDateChange = (date) => {
    dispatchTimes({ type: 'UPDATE_TIMES', payload: date })
  }

  const handleSubmitBooking = (formData) => {
    setSubmitError('')
    const success = submitAPI(formData)

    if (success) {
      setBookingDetails(formData)
      setIsSubmitted(true)
    } else {
      setSubmitError('This slot is no longer available, please choose another time.')
    }
  }

  return (
    <main className="booking-section">
      <div className="grid-container">
        <div className="grid-content">
          <div className="booking-header">
            <h1>Reserve a Table</h1>
            <p>Experience authentic Mediterranean cuisine in Chicago. Book your table below.</p>
          </div>

          {!isSubmitted ? (
            <div className="booking-card">
              <BookingForm
                availableTimes={availableTimes}
                onDateChange={handleDateChange}
                onSubmitBooking={handleSubmitBooking}
                submitError={submitError}
              />
            </div>
          ) : (
            <div className="booking-success-card" role="status" aria-live="polite">
              <div className="success-icon">✓</div>
              <h2>Reservation Confirmed!</h2>
              <p>Thank you, {bookingDetails.name}. Your table has been reserved.</p>

              <div className="booking-summary-box">
                <div className="booking-summary-row">
                  <span>Date:</span>
                  <span>{bookingDetails.date}</span>
                </div>
                <div className="booking-summary-row">
                  <span>Time:</span>
                  <span>{bookingDetails.time}</span>
                </div>
                <div className="booking-summary-row">
                  <span>Number of Guests:</span>
                  <span>{bookingDetails.guests}</span>
                </div>
                <div className="booking-summary-row">
                  <span>Occasion:</span>
                  <span>{bookingDetails.occasion}</span>
                </div>
                <div className="booking-summary-row">
                  <span>Email Confirmation:</span>
                  <span>{bookingDetails.email}</span>
                </div>
              </div>

              <button
                type="button"
                className="btn-primary"
                onClick={() => onNavigate('home')}
                aria-label="Return to home page"
              >
                Back to Home
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
