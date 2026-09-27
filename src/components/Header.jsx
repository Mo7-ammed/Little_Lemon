import { useState } from 'react'

export default function Header({ currentPage, setCurrentPage }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev)
  }

  const handleNavClick = (page) => {
    setCurrentPage(page)
    setMenuOpen(false)
  }

  return (
    <header className="site-header">
      <div className="grid-container">
        <div className="grid-content">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault()
              handleNavClick('home')
            }}
            aria-label="Little Lemon Home"
          >
            <img
              src="/icons_assets/Logo.svg"
              alt="Little Lemon Logo"
              className="site-logo"
            />
          </a>

          <button
            type="button"
            className="mobile-toggle"
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <img
              src="/icons_assets/🦆 icon _hamburger menu_.svg"
              alt=""
              aria-hidden="true"
            />
          </button>

          <nav
            aria-label="Main Navigation"
            className={`nav-menu ${menuOpen ? 'open' : ''}`}
          >
            <a
              href="#home"
              className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault()
                handleNavClick('home')
              }}
            >
              Home
            </a>
            <a
              href="#about"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault()
                handleNavClick('home')
                setTimeout(() => {
                  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
                }, 50)
              }}
            >
              About
            </a>
            <a
              href="#menu"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault()
                handleNavClick('home')
                setTimeout(() => {
                  document.getElementById('specials')?.scrollIntoView({ behavior: 'smooth' })
                }, 50)
              }}
            >
              Menu
            </a>
            <a
              href="#reservations"
              className={`nav-link ${currentPage === 'booking' ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault()
                handleNavClick('booking')
              }}
            >
              Reservations
            </a>
            <a
              href="#order-online"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault()
                handleNavClick('home')
                setTimeout(() => {
                  document.getElementById('specials')?.scrollIntoView({ behavior: 'smooth' })
                }, 50)
              }}
            >
              Order Online
            </a>
            <a
              href="#login"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault()
              }}
            >
              Login
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}
