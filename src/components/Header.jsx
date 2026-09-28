import { useState, useEffect } from "react"
import LoginModal from "./LoginModal"

export default function Header({ currentPage, setCurrentPage }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        const saved = window.localStorage.getItem("little_lemon_user")
        return saved ? JSON.parse(saved) : null
      }
      return null
    } catch {
      return null
    }
  })

  useEffect(() => {
    if (currentPage !== "home") {
      setActiveSection("")
      return
    }

    const sectionIds = ["home", "specials", "testimonials", "about"]
    let rafId = null

    const handleScroll = () => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        rafId = null
        const threshold = 120
        let current = "home"
        for (let i = sectionIds.length - 1; i >= 0; i--) {
          const section = document.getElementById(sectionIds[i])
          if (section) {
            const top = section.getBoundingClientRect().top
            if (top <= threshold) {
              current = sectionIds[i]
              break
            }
          }
        }
        setActiveSection(current)
      })
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [currentPage])

  const toggleMenu = () => setMenuOpen((prev) => !prev)

  const scrollToSection = (sectionId) => {
    if (currentPage !== "home") {
      setCurrentPage("home")
      setTimeout(() => {
        const el = document.getElementById(sectionId)
        if (el) el.scrollIntoView({ behavior: "smooth" })
      }, 100)
    } else {
      const el = document.getElementById(sectionId)
      if (el) el.scrollIntoView({ behavior: "smooth" })
    }
    setActiveSection(sectionId)
    setMenuOpen(false)
  }

  const handleNavClick = (page) => {
    setCurrentPage(page)
    setMenuOpen(false)
    if (page === "home") {
      setActiveSection("home")
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      setActiveSection("")
      window.scrollTo({ top: 0, behavior: "instant" })
    }
  }

  const isHomeActive = currentPage === "home" && (activeSection === "home" || !activeSection)
  const isAboutActive = currentPage === "home" && activeSection === "about"
  const isMenuActive = currentPage === "menu"
  const isReservationsActive = currentPage === "booking"
  const isOrderOnlineActive = currentPage === "order-online"

  return (
    <header className="site-header">
      <div className="grid-container">
        <div className="grid-content">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault()
              handleNavClick("home")
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
            className={`nav-menu ${menuOpen ? "open" : ""}`}
          >
            <a
              href="#home"
              className={`nav-link ${isHomeActive ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault()
                handleNavClick("home")
              }}
            >
              Home
            </a>
            <a
              href="#about"
              className={`nav-link ${isAboutActive ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault()
                scrollToSection("about")
              }}
            >
              About
            </a>
            <a
              href="#menu"
              className={`nav-link ${isMenuActive ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault()
                handleNavClick("menu")
              }}
            >
              Menu
            </a>
            <a
              href="#reservations"
              className={`nav-link ${isReservationsActive ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault()
                handleNavClick("booking")
              }}
            >
              Reservations
            </a>
            <a
              href="#order-online"
              className={`nav-link ${isOrderOnlineActive ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault()
                handleNavClick("order-online")
              }}
            >
              Order Online
            </a>
            {currentUser ? (
              <button
                type="button"
                className="nav-link"
                onClick={() => {
                  setIsLoginOpen(true)
                  setMenuOpen(false)
                }}
                aria-haspopup="dialog"
                title="Account Settings / Log Out"
              >
                <span className="user-badge">
                  <span className="user-avatar-dot">{currentUser.name.charAt(0).toUpperCase()}</span>
                  <span>{currentUser.name}</span>
                </span>
              </button>
            ) : (
              <button
                type="button"
                className="nav-link"
                onClick={() => {
                  setIsLoginOpen(true)
                  setMenuOpen(false)
                }}
                aria-haspopup="dialog"
              >
                Login
              </button>
            )}
          </nav>
        </div>
      </div>

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        currentUser={currentUser}
        onLogin={(user) => {
          setCurrentUser(user)
          try {
            localStorage.setItem("little_lemon_user", JSON.stringify(user))
          } catch {
            // ignore
          }
        }}
        onLogout={() => {
          setCurrentUser(null)
          try {
            localStorage.removeItem("little_lemon_user")
          } catch {
            // ignore
          }
        }}
      />
    </header>
  )
}
