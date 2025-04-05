import Image from "next/image";

export default function Home() {
  return (
    <main>
      {/* Navigation Bar */}
      <nav className="nav">
        <div className="nav-container">
          <span className="nav-brand">Minuet</span>
          <div className="nav-links">
            <a href="#features" className="nav-link">Features</a>
            <a href="#contact" className="nav-link">Contact</a>
            <a href="/login" className="button">Login</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-grid">
            <div>
              <h1 className="hero-title">
                Modern Property Management Made Simple
              </h1>
              <p className="hero-text">
                Streamline your property management with our comprehensive solution. From tenant screening to maintenance requests, we've got you covered.
              </p>
              <div className="hero-buttons">
                <button className="button button-primary">Get Started</button>
                <button className="button button-outline">Learn More</button>
              </div>
            </div>
            <div className="hero-image">
              <div 
                style={{
                  background: `linear-gradient(135deg, 
                    rgba(0, 229, 187, 0.2),
                    rgba(41, 166, 143, 0.15),
                    rgba(230, 63, 0, 0.05)
                  )`,
                  padding: '2.5rem',
                  borderRadius: '24px',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(0, 229, 187, 0.2)',
                  boxShadow: '0 8px 32px rgba(0, 229, 187, 0.1)'
                }}
              >
                <span style={{ fontSize: '6rem', position: 'relative', zIndex: 2 }}>🏢</span>
                <span style={{ fontSize: '4.5rem', opacity: 0.85, position: 'relative', top: '10px', left: '10px', zIndex: 1 }}>🏠</span>
                <span style={{ fontSize: '5rem', opacity: 0.9, position: 'relative', top: '-5px', left: '-15px', zIndex: 3 }}>🌆</span>
              </div>
              <h1 style={{
                fontSize: '3rem',
                fontWeight: 'bold',
                marginBottom: '1.5rem',
                background: `linear-gradient(135deg, #00E5BB, #29A68F)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Welcome to Minuet
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="features-container">
          <h2 className="features-title">Why Choose Us</h2>
          <div className="features-grid">
            {[
              {
                title: "Easy Management",
                description: "Manage your properties efficiently with our intuitive dashboard and tools.",
                icon: "📊"
              },
              {
                title: "Tenant Screening",
                description: "Comprehensive tenant screening process to find the right residents.",
                icon: "🔍"
              },
              {
                title: "24/7 Support",
                description: "Round-the-clock support for both property owners and tenants.",
                icon: "🌟"
              }
            ].map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-text">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="contact-container">
          <h2 className="contact-title">Get in Touch</h2>
          <form className="contact-form">
            <div className="form-group">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                id="name"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea
                id="message"
                rows={4}
                className="form-input"
              ></textarea>
            </div>
            <button type="submit" className="button button-primary">Send Message</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-grid">
            <div>
              <h3 className="footer-brand">Minuet</h3>
              <p className="footer-text">Modern property management solutions for modern property owners.</p>
            </div>
            <div>
              <h4 className="footer-title">Quick Links</h4>
              <ul className="footer-links">
                <li><a href="#features" className="footer-link">Features</a></li>
                <li><a href="#properties" className="footer-link">Properties</a></li>
                <li><a href="#contact" className="footer-link">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="footer-title">Contact</h4>
              <ul className="footer-links">
                <li className="footer-text">123 Property Street</li>
                <li className="footer-text">Real Estate City, RE 12345</li>
                <li className="footer-text">contact@propertypro.com</li>
                <li className="footer-text">(555) 123-4567</li>
              </ul>
            </div>
            <div>
              <h4 className="footer-title">Follow Us</h4>
              <div className="footer-links">
                <a href="#" className="footer-link">Twitter</a>
                <a href="#" className="footer-link">LinkedIn</a>
                <a href="#" className="footer-link">Facebook</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Minuet. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
