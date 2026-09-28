import { useReducer, useState } from "react"
import Header from "./components/Header"
import Hero from "./components/Hero"
import Specials from "./components/Specials"
import Testimonials from "./components/Testimonials"
import About from "./components/About"
import Footer from "./components/Footer"
import BookingPage from "./components/BookingPage"
import MenuPage from "./components/MenuPage"
import OrderOnlinePage from "./components/OrderOnlinePage"
import { initializeTimes, updateTimes } from "./reducers/bookingReducer"

export default function App() {
  const [currentPage, setCurrentPage] = useState("home")
  const [availableTimes, dispatchTimes] = useReducer(updateTimes, null, initializeTimes)

  const renderPage = () => {
    switch (currentPage) {
      case "menu":
        return <MenuPage onNavigate={setCurrentPage} />
      case "order-online":
        return <OrderOnlinePage onNavigate={setCurrentPage} />
      case "booking":
        return (
          <BookingPage
            availableTimes={availableTimes}
            dispatchTimes={dispatchTimes}
            onNavigate={setCurrentPage}
          />
        )
      default:
        return (
          <main>
            <Hero onReserveClick={() => setCurrentPage("booking")} onOrderClick={() => setCurrentPage("order-online")} />
            <Specials onMenuClick={() => setCurrentPage("menu")} onOrderClick={() => setCurrentPage("order-online")} />
            <Testimonials />
            <About />
          </main>
        )
    }
  }

  return (
    <div className="site-wrapper">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {renderPage()}
      <Footer onNavigate={setCurrentPage} />
    </div>
  )
}
