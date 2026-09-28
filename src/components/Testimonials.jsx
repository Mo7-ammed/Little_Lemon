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

function DefaultUserIcon() {
  return (
    <svg
      className="testimonial-avatar"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2a5 5 0 100 10 5 5 0 000-10zm-3 5a3 3 0 116 0 3 3 0 01-6 0zm-5 13a7 7 0 0114 0H4zm-2 2a9 9 0 0118 0H2z"
      />
    </svg>
  )
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="testimonials-section" aria-labelledby="testimonials-heading">
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
                  <DefaultUserIcon />
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
