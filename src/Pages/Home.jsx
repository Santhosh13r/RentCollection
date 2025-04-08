import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../App.css' // Add custom CSS for animations and styling
import 'animate.css' // For animations
import ScrollAnimation from 'react-animate-on-scroll' // Install this package

const Home = () => {
  return (
    <>
      {/* Navbar */}
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <a className="navbar-brand" href="/">RentCollection</a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <a className="nav-link" href="/">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/login">UserLogin</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/register">UserRegister</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/AdminLogin">AdminLogin</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero-section text-center text-white d-flex align-items-center">
        <div className="container">
          <h1 className="display-4 animate__animated animate__fadeInDown">Welcome to RentCollection</h1>
          <p className="lead animate__animated animate__fadeInUp">
            Simplify your rent payments with ease and security.
          </p>
          <a href="/register" className="btn btn-success btn-lg mt-3 animate__animated animate__zoomIn">
            Get Started
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section py-5">
        <div className="container">
          <h2 className="text-center mb-4">Our Features</h2>
          <div className="row text-center">
            {/* Feature 1 */}
            <div className="col-md-4">
              <ScrollAnimation animateIn="fadeInLeft">
                <div className="feature-box">
                  <img
                    src="https://via.placeholder.com/100" // Replace with your secure payment image URL
                    alt="Secure Payments"
                    className="mb-3"
                    style={{ width: '80px', height: '80px' }}
                  />
                  <h3 className="mt-3">Secure Payments</h3>
                  <p>Ensure your transactions are safe and encrypted.</p>
                </div>
              </ScrollAnimation>
            </div>

            {/* Feature 2 */}
            <div className="col-md-4">
              <ScrollAnimation animateIn="fadeInUp">
                <div className="feature-box">
                  <i className="bi bi-clock-fill text-success display-4 mb-3"></i>
                  <h3 className="mt-3">Timely Reminders</h3>
                  <p>Never miss a payment with our timely reminders.</p>
                </div>
              </ScrollAnimation>
            </div>

            {/* Feature 3 */}
            <div className="col-md-4">
              <ScrollAnimation animateIn="fadeInRight">
                <div className="feature-box">
                  <img
                    src="https://via.placeholder.com/100" // Replace with your user-friendly image URL
                    alt="User-Friendly"
                    className="mb-3"
                    style={{ width: '80px', height: '80px' }}
                  />
                  <h3 className="mt-3">User-Friendly</h3>
                  <p>Experience a seamless and intuitive interface.</p>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Options Section */}
      <section className="payment-options-section py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-4">Flexible Payment Options</h2>
          <div className="row text-center">
            <div className="col-md-4">
              <ScrollAnimation animateIn="fadeInLeft">
                <div className="feature-box">
                  <i className="bi bi-credit-card-fill text-primary display-4"></i>
                  <h3 className="mt-3">Credit/Debit Cards</h3>
                  <p>Pay your rent using your preferred card securely.</p>
                </div>
              </ScrollAnimation>
            </div>
            <div className="col-md-4">
              <ScrollAnimation animateIn="fadeInUp" delay={200}>
                <div className="feature-box">
                  <i className="bi bi-wallet-fill text-primary display-4"></i>
                  <h3 className="mt-3">Digital Wallets</h3>
                  <p>Use wallets like PayPal, Google Pay, or Apple Pay.</p>
                </div>
              </ScrollAnimation>
            </div>
            <div className="col-md-4">
              <ScrollAnimation animateIn="fadeInRight" delay={400}>
                <div className="feature-box">
                  <i className="bi bi-bank2 text-primary display-4"></i>
                  <h3 className="mt-3">Bank Transfers</h3>
                  <p>Directly transfer rent from your bank account.</p>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </section>

      {/* Rent Frequency Section */}
      <section className="rent-frequency-section py-5">
        <div className="container">
          <h2 className="text-center mb-4">Choose Your Rent Frequency</h2>
          <div className="row text-center">
            <div className="col-md-4">
              <ScrollAnimation animateIn="fadeInLeft">
                <div className="feature-box">
                  <i className="bi bi-calendar2-week-fill text-warning display-4"></i>
                  <h3 className="mt-3">Weekly</h3>
                  <p>Pay your rent on a weekly basis for short-term stays.</p>
                </div>
              </ScrollAnimation>
            </div>
            <div className="col-md-4">
              <ScrollAnimation animateIn="fadeInUp" delay={200}>
                <div className="feature-box">
                  <i className="bi bi-calendar2-month-fill text-warning display-4"></i>
                  <h3 className="mt-3">Monthly</h3>
                  <p>Set up monthly payments for convenience.</p>
                </div>
              </ScrollAnimation>
            </div>
            <div className="col-md-4">
              <ScrollAnimation animateIn="fadeInRight" delay={400}>
                <div className="feature-box">
                  <i className="bi bi-calendar2-year-fill text-warning display-4"></i>
                  <h3 className="mt-3">Yearly</h3>
                  <p>Save time by paying your rent annually.</p>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-4">
        <div className="container text-center">
          <p>&copy; 2025 RentCollection. All Rights Reserved.</p>
          <p>
            <a href="/privacy" className="text-white">Privacy Policy</a> | 
            <a href="/terms" className="text-white ms-2">Terms of Service</a>
          </p>
        </div>
      </footer>
    </>
  )
}

export default Home