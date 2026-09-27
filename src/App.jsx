import { useReducer, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Specials from './components/Specials'
import Testimonials from './components/Testimonials'
import About from './components/About'
import Footer from './components/Footer'
import BookingPage from './components/BookingPage'
import { initializeTimes, updateTimes } from './reducers/bookingReducer'

export default function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [availableTimes, dispatchTimes] = useReducer(updateTimes, null, initializeTimes)

  return (
    <div className="site-wrapper">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {currentPage === 'home' ? (
        <main>
          <Hero onReserveClick={() => setCurrentPage('booking')} />
          <Specials />
          <Testimonials />
          <About />
        </main>
      ) : (
        <BookingPage
          availableTimes={availableTimes}
          dispatchTimes={dispatchTimes}
          onNavigate={setCurrentPage}
        />
      )}

      <Footer onNavigate={setCurrentPage} />
    </div>
  )
}
