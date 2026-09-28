import { useState } from "react"

const menuItems = [
  { id: 1, title: "Greek Salad", price: 12.99, image: "/icons_assets/greek salad.jpg", category: "Starters" },
  { id: 2, title: "Bruschetta", price: 5.99, image: "/icons_assets/bruchetta.svg", category: "Starters" },
  { id: 3, title: "Crostini Platter", price: 9.99, image: "/icons_assets/dish 1.jpg", category: "Starters" },
  { id: 4, title: "Grilled Sea Bass", price: 24.99, image: "/icons_assets/dish 2.jpg", category: "Mains" },
  { id: 5, title: "Mediterranean Salad", price: 15.99, image: "/icons_assets/dish 3.jpg", category: "Mains" },
  { id: 6, title: "Spicy Arrabbiata Penne", price: 18.99, image: "/icons_assets/dish 4.jpg", category: "Mains" },
  { id: 7, title: "Lemon Dessert", price: 5.00, image: "/icons_assets/lemon dessert.jpg", category: "Desserts" },
]

export default function OrderOnlinePage({ onNavigate }) {
  const [cart, setCart] = useState({})
  const [activeFilter, setActiveFilter] = useState("All")
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [deliveryInfo, setDeliveryInfo] = useState({ name: "", address: "", phone: "" })
  const [errors, setErrors] = useState({})

  const categories = ["All", "Starters", "Mains", "Desserts"]

  const filteredItems = activeFilter === "All"
    ? menuItems
    : menuItems.filter((item) => item.category === activeFilter)

  const addToCart = (id) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }))
  }

  const removeFromCart = (id) => {
    setCart((prev) => {
      const next = { ...prev }
      if (next[id] > 1) next[id] -= 1
      else delete next[id]
      return next
    })
  }

  const cartItems = Object.entries(cart).map(([id, qty]) => {
    const item = menuItems.find((m) => m.id === Number(id))
    return { ...item, qty }
  })

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0)
  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0)

  const validate = () => {
    const errs = {}
    if (!deliveryInfo.name.trim()) errs.name = "Name is required"
    if (!deliveryInfo.address.trim()) errs.address = "Delivery address is required"
    if (!deliveryInfo.phone.trim()) errs.phone = "Phone number is required"
    return errs
  }

  const handlePlaceOrder = () => {
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setOrderPlaced(true)
  }

  if (orderPlaced) {
    return (
      <main className="order-page">
        <section className="order-success-section">
          <div className="grid-container">
            <div className="grid-content">
              <div className="order-success-card">
                <div className="success-icon">✓</div>
                <h1>Order Placed!</h1>
                <p>Thank you, <strong>{deliveryInfo.name}</strong>! Your food is being prepared and will be delivered to you shortly.</p>
                <div className="booking-summary-box">
                  {cartItems.map((item) => (
                    <div key={item.id} className="booking-summary-row">
                      <span>{item.title} × {item.qty}</span>
                      <span>${(item.price * item.qty).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="booking-summary-row" style={{ borderTop: "1px solid #d3d9d6", paddingTop: "0.75rem", marginTop: "0.25rem" }}>
                    <span style={{ fontWeight: 700 }}>Total</span>
                    <span style={{ fontWeight: 700 }}>${total.toFixed(2)}</span>
                  </div>
                </div>
                <button type="button" className="btn-primary" onClick={() => onNavigate("home")}>
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="order-page">
      {/* Hero */}
      <section className="order-hero" aria-labelledby="order-hero-heading">
        <div className="grid-container">
          <div className="grid-content">
            <p className="menu-hero-eyebrow">Little Lemon</p>
            <h1 id="order-hero-heading">Order Online</h1>
            <p className="menu-hero-subtitle">Fresh Mediterranean food delivered right to your door.</p>
          </div>
        </div>
      </section>

      <div className="order-body">
        <div className="grid-container">
          <div className="grid-content">
            <div className="order-layout">
              {/* Left: Menu */}
              <div className="order-menu-col">
                {/* Filter Pills */}
                <div className="order-filter-bar" role="tablist" aria-label="Filter menu by category">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      role="tab"
                      aria-selected={activeFilter === cat}
                      className={`order-filter-pill ${activeFilter === cat ? "active" : ""}`}
                      onClick={() => setActiveFilter(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="order-items-grid">
                  {filteredItems.map((item) => {
                    const qty = cart[item.id] || 0
                    return (
                      <article key={item.id} className="order-item-card">
                        <img src={item.image} alt={item.title} className="order-item-image" loading="lazy" />
                        <div className="order-item-body">
                          <div className="order-item-info">
                            <h3 className="order-item-title">{item.title}</h3>
                            <span className="order-item-price">${item.price.toFixed(2)}</span>
                          </div>
                          <span className="order-item-category">{item.category}</span>
                          {qty === 0 ? (
                            <button
                              type="button"
                              className="btn-primary order-add-btn"
                              onClick={() => addToCart(item.id)}
                              aria-label={`Add ${item.title} to cart`}
                            >
                              + Add to Cart
                            </button>
                          ) : (
                            <div className="order-qty-controls" aria-label={`${item.title} quantity`}>
                              <button type="button" className="order-qty-btn" onClick={() => removeFromCart(item.id)} aria-label="Decrease quantity">−</button>
                              <span className="order-qty-count" aria-live="polite">{qty}</span>
                              <button type="button" className="order-qty-btn" onClick={() => addToCart(item.id)} aria-label="Increase quantity">+</button>
                            </div>
                          )}
                        </div>
                      </article>
                    )
                  })}
                </div>
              </div>

              {/* Right: Cart & Checkout */}
              <aside className="order-cart-col" aria-label="Your cart">
                <div className="order-cart-sticky">
                  <div className="order-cart-header">
                    <h2>Your Cart</h2>
                    {cartCount > 0 && (
                      <span className="order-cart-badge" aria-label={`${cartCount} items`}>{cartCount}</span>
                    )}
                  </div>

                  {cartItems.length === 0 ? (
                    <div className="order-cart-empty">
                      <p>Your cart is empty.</p>
                      <p>Add items from the menu to get started!</p>
                    </div>
                  ) : (
                    <>
                      <ul className="order-cart-list" role="list">
                        {cartItems.map((item) => (
                          <li key={item.id} className="order-cart-item">
                            <img src={item.image} alt={item.title} className="order-cart-item-img" />
                            <div className="order-cart-item-info">
                              <span className="order-cart-item-name">{item.title}</span>
                              <span className="order-cart-item-sub">{item.qty} × ${item.price.toFixed(2)}</span>
                            </div>
                            <span className="order-cart-item-total">${(item.price * item.qty).toFixed(2)}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="order-cart-total">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>

                      {/* Delivery Info */}
                      <div className="order-delivery-form">
                        <h3>Delivery Details</h3>
                        <div className="form-group">
                          <label htmlFor="order-name" className="form-label">Full Name <span className="required-star" aria-hidden="true">*</span></label>
                          <input
                            id="order-name"
                            type="text"
                            className={`form-input ${errors.name ? "input-error" : ""}`}
                            value={deliveryInfo.name}
                            onChange={(e) => { setDeliveryInfo((p) => ({ ...p, name: e.target.value })); setErrors((p) => ({ ...p, name: "" })) }}
                            placeholder="Jane Smith"
                          />
                          {errors.name && <span className="form-error" role="alert">{errors.name}</span>}
                        </div>
                        <div className="form-group">
                          <label htmlFor="order-address" className="form-label">Delivery Address <span className="required-star" aria-hidden="true">*</span></label>
                          <input
                            id="order-address"
                            type="text"
                            className={`form-input ${errors.address ? "input-error" : ""}`}
                            value={deliveryInfo.address}
                            onChange={(e) => { setDeliveryInfo((p) => ({ ...p, address: e.target.value })); setErrors((p) => ({ ...p, address: "" })) }}
                            placeholder="123 Main St, Chicago, IL"
                          />
                          {errors.address && <span className="form-error" role="alert">{errors.address}</span>}
                        </div>
                        <div className="form-group">
                          <label htmlFor="order-phone" className="form-label">Phone Number <span className="required-star" aria-hidden="true">*</span></label>
                          <input
                            id="order-phone"
                            type="tel"
                            className={`form-input ${errors.phone ? "input-error" : ""}`}
                            value={deliveryInfo.phone}
                            onChange={(e) => { setDeliveryInfo((p) => ({ ...p, phone: e.target.value })); setErrors((p) => ({ ...p, phone: "" })) }}
                            placeholder="(312) 555-0100"
                          />
                          {errors.phone && <span className="form-error" role="alert">{errors.phone}</span>}
                        </div>
                        <button
                          type="button"
                          className="btn-primary order-place-btn"
                          onClick={handlePlaceOrder}
                        >
                          Place Order · ${total.toFixed(2)}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
