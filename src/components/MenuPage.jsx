const menuCategories = [
  {
    id: "starters",
    label: "Starters",
    items: [
      {
        id: 1,
        title: "Greek Salad",
        price: "$12.99",
        description: "Crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.",
        image: "/icons_assets/greek salad.jpg",
      },
      {
        id: 2,
        title: "Bruschetta",
        price: "$5.99",
        description: "Grilled bread smeared with garlic and seasoned with salt and olive oil, topped with fresh diced tomatoes.",
        image: "/icons_assets/bruchetta.svg",
      },
      {
        id: 3,
        title: "Crostini Platter",
        price: "$9.99",
        description: "A variety of artisan crostini topped with roasted peppers, prosciutto, olives, and sun-dried tomatoes.",
        image: "/icons_assets/dish 1.jpg",
      },
    ],
  },
  {
    id: "mains",
    label: "Main Dishes",
    items: [
      {
        id: 4,
        title: "Grilled Sea Bass",
        price: "$24.99",
        description: "Fresh whole sea bass grilled over open flame, served with roasted potatoes, cherry tomatoes, and a citrus herb glaze.",
        image: "/icons_assets/dish 2.jpg",
      },
      {
        id: 5,
        title: "Mediterranean Salad",
        price: "$15.99",
        description: "A generous bowl of the freshest seasonal vegetables — tomatoes, cucumbers, red onion, feta, and kalamata olives.",
        image: "/icons_assets/dish 3.jpg",
      },
      {
        id: 6,
        title: "Spicy Arrabbiata Penne",
        price: "$18.99",
        description: "Al-dente penne tossed in a bold, spicy tomato arrabbiata sauce with fresh basil and topped with shaved parmesan.",
        image: "/icons_assets/dish 4.jpg",
      },
    ],
  },
  {
    id: "desserts",
    label: "Desserts",
    items: [
      {
        id: 7,
        title: "Lemon Dessert",
        price: "$5.00",
        description: "Straight from grandma's recipe book — every ingredient sourced and as authentic as can be imagined.",
        image: "/icons_assets/lemon dessert.jpg",
      },
    ],
  },
]

export default function MenuPage({ onNavigate }) {
  return (
    <main className="menu-page">
      {/* Hero Banner */}
      <section className="menu-hero" aria-labelledby="menu-hero-heading">
        <div className="grid-container">
          <div className="grid-content">
            <div className="menu-hero-content">
              <p className="menu-hero-eyebrow">Little Lemon</p>
              <h1 id="menu-hero-heading">Our Menu</h1>
              <p className="menu-hero-subtitle">
                Crafted with love from the Mediterranean. fresh, seasonal, and always made from scratch.
              </p>
              <button
                type="button"
                className="btn-primary"
                onClick={() => onNavigate("order-online")}
              >
                Order Online →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Category Nav */}
      <nav className="menu-category-nav" aria-label="Menu categories">
        <div className="grid-container">
          <div className="grid-content">
            <ul className="menu-category-list" role="list">
              {menuCategories.map((cat) => (
                <li key={cat.id}>
                  <a
                    href={`#${cat.id}`}
                    className="menu-category-pill"
                    onClick={(e) => {
                      e.preventDefault()
                      document.getElementById(cat.id)?.scrollIntoView({ behavior: "smooth" })
                    }}
                  >
                    {cat.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      {/* Menu Sections */}
      {menuCategories.map((category) => (
        <section
          key={category.id}
          id={category.id}
          className="menu-category-section"
          aria-labelledby={`${category.id}-heading`}
        >
          <div className="grid-container">
            <div className="grid-content">
              <div className="menu-section-header">
                <h2 id={`${category.id}-heading`}>{category.label}</h2>
                <div className="menu-section-divider" aria-hidden="true"></div>
              </div>

              <div className="menu-cards-grid">
                {category.items.map((item) => (
                  <article key={item.id} className="menu-card">
                    <div className="menu-card-image-wrapper">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="menu-card-image"
                        loading="lazy"
                      />
                    </div>
                    <div className="menu-card-body">
                      <div className="menu-card-title-row">
                        <h3 className="menu-card-title">{item.title}</h3>
                        <span className="menu-card-price">{item.price}</span>
                      </div>
                      <p className="menu-card-desc">{item.description}</p>
                      <button
                        type="button"
                        className="btn-primary menu-card-btn"
                        onClick={() => onNavigate("order-online")}
                        aria-label={`Add ${item.title} to order`}
                      >
                        Add to Order
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}
    </main>
  )
}
