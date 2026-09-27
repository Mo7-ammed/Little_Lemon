export default function Footer({ onNavigate }) {
  return (
    <footer className="site-footer">
      <div className="grid-container">
        <div className="grid-content">
          <div className="footer-grid">
            <div className="footer-logo-col">
              <img
                src="/icons_assets/little lemon footer logo.jpg"
                alt="Little Lemon footer logo"
              />
            </div>

            <div className="footer-col">
              <h3>Doormat Navigation</h3>
              <ul>
                <li>
                  <a
                    href="#home"
                    onClick={(e) => {
                      e.preventDefault()
                      onNavigate('home')
                    }}
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    onClick={(e) => {
                      e.preventDefault()
                      onNavigate('home')
                      setTimeout(() => {
                        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
                      }, 50)
                    }}
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#menu"
                    onClick={(e) => {
                      e.preventDefault()
                      onNavigate('home')
                      setTimeout(() => {
                        document.getElementById('specials')?.scrollIntoView({ behavior: 'smooth' })
                      }, 50)
                    }}
                  >
                    Menu
                  </a>
                </li>
                <li>
                  <a
                    href="#reservations"
                    onClick={(e) => {
                      e.preventDefault()
                      onNavigate('booking')
                    }}
                  >
                    Reservations
                  </a>
                </li>
                <li>
                  <a
                    href="#order-online"
                    onClick={(e) => {
                      e.preventDefault()
                      onNavigate('home')
                    }}
                  >
                    Order Online
                  </a>
                </li>
                <li>
                  <a href="#login">Login</a>
                </li>
              </ul>
            </div>

            <div className="footer-col">
              <h3>Contact</h3>
              <ul>
                <li>123 Mediterranean Way, Chicago, IL</li>
                <li>(312) 555-0199</li>
                <li>info@littlelemonchicago.com</li>
              </ul>
            </div>

            <div className="footer-col">
              <h3>Social Media Links</h3>
              <ul>
                <li>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
                    TikTok
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Little Lemon. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
