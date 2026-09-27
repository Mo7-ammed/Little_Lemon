export default function About() {
  return (
    <section id="about" className="about-section" aria-labelledby="about-title">
      <div className="grid-container">
        <div className="grid-content">
          <div className="about-grid">
            <div className="about-text">
              <h1 id="about-title">Little Lemon</h1>
              <h2>Chicago</h2>
              <p>
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
                sint. Velit officia consequat duis enim velit mollit. Exercitation veniam
                consequat sunt nostrud amet.
              </p>
              <p>
                Little Lemon was founded by two Italian brothers, Mario and Adrian, who moved
                to the United States to pursue their shared passion for Mediterranean gastronomy.
                They combine time-honored family heritage recipes with a contemporary flair.
              </p>
            </div>
            <div className="about-images-wrapper">
              <img
                src="/icons_assets/Mario and Adrian b.jpg"
                alt="Mario and Adrian preparing dishes"
                className="about-img-top"
              />
              <img
                src="/icons_assets/Mario and Adrian A.jpg"
                alt="Mario and Adrian in the restaurant"
                className="about-img-bottom"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
