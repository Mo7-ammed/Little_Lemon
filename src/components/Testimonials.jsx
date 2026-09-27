const testimonialsData = [
  {
    id: 1,
    name: 'Sara Lopez',
    rating: 5,
    review: 'The Greek salad was so crisp and refreshing! The atmosphere made us feel right at home.',
    image: '/icons_assets/Mario and Adrian A.jpg',
  },
  {
    id: 2,
    name: 'John Miller',
    rating: 5,
    review: 'Outstanding table service and the Lemon Dessert was heaven on a plate. Truly 5 stars!',
    image: '/icons_assets/Mario and Adrian b.jpg',
  },
  {
    id: 3,
    name: 'Emily Chen',
    rating: 5,
    review: 'We booked for our anniversary and it was flawless. Bruschetta is the best in Chicago.',
    image: '/icons_assets/restaurant chef B.jpg',
  },
  {
    id: 4,
    name: 'Marcus Vance',
    rating: 4,
    review: 'Authentic Mediterranean flavors with a cozy neighborhood vibe. We will be regular visitors!',
    image: '/icons_assets/restaurant.jpg',
  },
]

export default function Testimonials() {
  return (
    <section className="testimonials-section" aria-labelledby="testimonials-heading">
      <div className="grid-container">
        <div className="grid-content">
          <h2 id="testimonials-heading">Testimonials</h2>
          <div className="testimonials-grid">
            {testimonialsData.map((item) => (
              <article key={item.id} className="testimonial-card">
                <div className="rating-stars" aria-label={`Rating: ${item.rating} out of 5 stars`}>
                  {'★'.repeat(item.rating)}{'☆'.repeat(5 - item.rating)}
                </div>
                <div className="testimonial-user">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="testimonial-avatar"
                  />
                  <h3 className="testimonial-name">{item.name}</h3>
                </div>
                <p className="testimonial-text">"{item.review}"</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
