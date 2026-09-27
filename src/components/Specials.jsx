const specialsData = [
  {
    id: 1,
    title: 'Greek Salad',
    price: '$12.99',
    description:
      'The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.',
    image: '/icons_assets/greek salad.jpg',
  },
  {
    id: 2,
    title: 'Bruschetta',
    price: '$5.99',
    description:
      'Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil, topped with fresh diced tomatoes.',
    image: '/icons_assets/9beeddcd9d22dc711cd9fddc4a3393a7278299c7.jpg',
  },
  {
    id: 3,
    title: 'Lemon Dessert',
    price: '$5.00',
    description:
      'This comes straight from grandma’s recipe book, every last ingredient has been sourced and is as authentic as can be imagined.',
    image: '/icons_assets/lemon dessert.jpg',
  },
]

export default function Specials() {
  return (
    <section id="specials" className="specials-section" aria-labelledby="specials-heading">
      <div className="grid-container">
        <div className="grid-content">
          <div className="specials-header">
            <h2 id="specials-heading">This weeks specials!</h2>
            <button type="button" className="btn-primary" aria-label="View online menu">
              Online Menu
            </button>
          </div>

          <div className="specials-cards-grid">
            {specialsData.map((special) => (
              <article key={special.id} className="special-card">
                <img
                  src={special.image}
                  alt={special.title}
                  className="special-card-image"
                />
                <div className="special-card-body">
                  <div className="special-card-title-row">
                    <h3 className="special-card-title">{special.title}</h3>
                    <span className="special-card-price">{special.price}</span>
                  </div>
                  <p className="special-card-desc">{special.description}</p>
                  <a
                    href="#order"
                    className="special-card-action"
                    aria-label={`Order ${special.title} for delivery`}
                  >
                    <span>Order a delivery</span>
                    <img
                      src="/icons_assets/Dish icon.svg"
                      alt=""
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
