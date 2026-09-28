import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Header from './components/Header'
import Hero from './components/Hero'
import Specials from './components/Specials'
import Footer from './components/Footer'
import BookingForm from './components/BookingForm'
import BookingPage from './components/BookingPage'
import { initializeTimes, updateTimes } from './reducers/bookingReducer'
import * as api from './api/bookingApi'

describe('Component rendering without crashing', () => {
  it('renders Header with navigation links', () => {
    render(<Header currentPage="home" setCurrentPage={() => {}} />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Reservations')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument()
  })

  it('opens and closes the login pop-up form', async () => {
    const user = userEvent.setup()
    render(<Header currentPage="home" setCurrentPage={() => {}} />)
    const loginButton = screen.getByRole('button', { name: /login/i })
    expect(loginButton).toBeInTheDocument()

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

    await user.click(loginButton)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /sign in to little lemon/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/email or username/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^password/i)).toBeInTheDocument()

    const closeBtn = screen.getByRole('button', { name: /close login dialog/i })
    await user.click(closeBtn)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('renders Hero with heading and CTA button', () => {
    const mockReserve = vi.fn()
    render(<Hero onReserveClick={mockReserve} />)
    expect(screen.getByRole('heading', { level: 1, name: /little lemon/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /reserve a table/i })).toBeInTheDocument()
  })

  it('renders Specials section with menu cards', () => {
    render(<Specials />)
    expect(screen.getByText('This weeks specials!')).toBeInTheDocument()
    expect(screen.getByText('Greek Salad')).toBeInTheDocument()
    expect(screen.getByText('Bruschetta')).toBeInTheDocument()
    expect(screen.getByText('Lemon Dessert')).toBeInTheDocument()
  })

  it('renders Footer with contact and navigation columns', () => {
    render(<Footer onNavigate={() => {}} />)
    expect(screen.getByText('Doormat Navigation')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
    expect(screen.getByText('Social Media Links')).toBeInTheDocument()
  })
})

describe('Booking state and reducer', () => {
  it('initializeTimes returns a non-empty array of booking times', () => {
    const times = initializeTimes()
    expect(Array.isArray(times)).toBe(true)
    expect(times.length).toBeGreaterThan(0)
  })

  it('updateTimes returns available times based on action payload', () => {
    const initialState = ['17:00', '18:00']
    const updatedState = updateTimes(initialState, {
      type: 'UPDATE_TIMES',
      payload: '2026-10-15',
    })
    expect(Array.isArray(updatedState)).toBe(true)
    expect(updatedState.length).toBeGreaterThan(0)
  })

  it('updateTimes returns current state on unrecognized action', () => {
    const initialState = ['17:00']
    const state = updateTimes(initialState, { type: 'UNKNOWN_ACTION' })
    expect(state).toEqual(initialState)
  })
})

describe('Form validation logic', () => {
  const mockTimes = ['17:00', '18:00', '19:00']

  it('submit button is enabled when fields are valid', async () => {
    render(
      <BookingForm
        availableTimes={mockTimes}
        onDateChange={() => {}}
        onSubmitBooking={() => {}}
        submitError=""
      />
    )
    const user = userEvent.setup()

    await user.type(screen.getByLabelText(/full name/i), 'John Doe')
    await user.type(screen.getByLabelText(/email address/i), 'john@example.com')

    const submitBtn = screen.getByRole('button', { name: /confirm table reservation/i })
    expect(submitBtn).toBeEnabled()
  })

  it('shows error when required name is empty after blur', async () => {
    render(
      <BookingForm
        availableTimes={mockTimes}
        onDateChange={() => {}}
        onSubmitBooking={() => {}}
        submitError=""
      />
    )
    const user = userEvent.setup()
    const nameInput = screen.getByLabelText(/full name/i)

    await user.click(nameInput)
    await user.tab()

    expect(screen.getByText(/full name is required/i)).toBeInTheDocument()
  })

  it('shows error for invalid email address', async () => {
    render(
      <BookingForm
        availableTimes={mockTimes}
        onDateChange={() => {}}
        onSubmitBooking={() => {}}
        submitError=""
      />
    )
    const user = userEvent.setup()
    const emailInput = screen.getByLabelText(/email address/i)

    await user.type(emailInput, 'invalid-email')
    await user.tab()

    expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument()
  })

  it('shows error when guests exceed 10', async () => {
    render(
      <BookingForm
        availableTimes={mockTimes}
        onDateChange={() => {}}
        onSubmitBooking={() => {}}
        submitError=""
      />
    )
    const user = userEvent.setup()
    const guestsInput = screen.getByLabelText(/number of guests/i)

    await user.clear(guestsInput)
    await user.type(guestsInput, '15')
    await user.tab()

    expect(
      screen.getByText(/for parties larger than 10, please call us directly/i)
    ).toBeInTheDocument()
  })

  it('shows error when guests is less than 1', async () => {
    render(
      <BookingForm
        availableTimes={mockTimes}
        onDateChange={() => {}}
        onSubmitBooking={() => {}}
        submitError=""
      />
    )
    const user = userEvent.setup()
    const guestsInput = screen.getByLabelText(/number of guests/i)

    await user.clear(guestsInput)
    await user.type(guestsInput, '0')
    await user.tab()

    expect(screen.getByText(/must have at least 1 guest/i)).toBeInTheDocument()
  })
})

describe('Mock API integration and submission handling', () => {
  it('displays confirmation screen upon successful submission', async () => {
    const mockTimes = ['17:00']
    const dispatchMock = vi.fn()
    const navigateMock = vi.fn()

    render(
      <BookingPage
        availableTimes={mockTimes}
        dispatchTimes={dispatchMock}
        onNavigate={navigateMock}
      />
    )
    const user = userEvent.setup()

    await user.type(screen.getByLabelText(/full name/i), 'Alice Smith')
    await user.type(screen.getByLabelText(/email address/i), 'alice@example.com')

    const submitBtn = screen.getByRole('button', { name: /confirm table reservation/i })
    await user.click(submitBtn)

    expect(screen.getByRole('heading', { name: /reservation confirmed!/i })).toBeInTheDocument()
    expect(screen.getByText(/Alice Smith/i)).toBeInTheDocument()
  })

  it('displays server error banner when submission fails', async () => {
    vi.spyOn(api, 'submitAPI').mockReturnValueOnce(false)

    const mockTimes = ['17:00']
    render(
      <BookingPage
        availableTimes={mockTimes}
        dispatchTimes={() => {}}
        onNavigate={() => {}}
      />
    )
    const user = userEvent.setup()

    await user.type(screen.getByLabelText(/full name/i), 'Bob Martin')
    await user.type(screen.getByLabelText(/email address/i), 'bob@example.com')

    const submitBtn = screen.getByRole('button', { name: /confirm table reservation/i })
    await user.click(submitBtn)

    expect(
      screen.getByText(/this slot is no longer available, please choose another time/i)
    ).toBeInTheDocument()

    vi.restoreAllMocks()
  })
})
