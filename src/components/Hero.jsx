export default function Hero({ onReserveClick }) {
  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <div className="grid-container">
        <div className="grid-content">
          <div className="hero-grid">
            <div className="hero-text">
              <h1 id="hero-title">Little Lemon</h1>
              <h2>Chicago</h2>
              <p>
                We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
              </p>
              <button
                type="button"
                className="btn-primary"
                onClick={onReserveClick}
                aria-label="Reserve a table at Little Lemon"
              >
                Reserve a Table
              </button>
            </div>
            <div className="hero-image-wrapper">
              <img
                src="/icons_assets/restaurant.jpg"
                alt="Little Lemon outdoor restaurant dining terrace"
                className="hero-image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
