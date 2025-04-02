import { Link } from 'react-router-dom';
import '../styles/main.css';

const Footer = () => {
  return (
    <footer className="enhanced-footer">
      <div className="footer-wave">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#4f46e5"
            fillOpacity="1"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,128C672,128,768,160,864,176C960,192,1056,192,1152,170.7C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      <div className="footer-content-wrapper">
        <div className="footer-content">
          <div className="footer-section brand-section">
            <div className="footer-logo">
              <span className="footer-logo-icon">🍳</span>
              <h3 className="footer-logo-text">Recipe App</h3>
            </div>
            <p className="footer-description">
              Discover delicious recipes from around the world and save your favorites for later. 
              Our collection is updated daily with new, mouth-watering dishes.
            </p>
            <div className="newsletter">
              <h4 className="newsletter-title">Subscribe to our newsletter</h4>
              <div className="newsletter-form">
                <input type="email" placeholder="Your email address" className="newsletter-input" />
                <button className="newsletter-button">
                  <span>Subscribe</span>
                </button>
              </div>
            </div>
          </div>
          
          <div className="footer-section links-section">
            <h3 className="footer-title">Explore</h3>
            <ul className="footer-links">
              <li className="footer-link-item">
                <Link to="/" className="footer-link">
                  <span className="footer-link-icon">🏠</span>
                  <span>Home</span>
                </Link>
              </li>
              <li className="footer-link-item">
                <Link to="/search" className="footer-link">
                  <span className="footer-link-icon">🔍</span>
                  <span>Search Recipes</span>
                </Link>
              </li>
              <li className="footer-link-item">
                <Link to="/saved" className="footer-link">
                  <span className="footer-link-icon">❤️</span>
                  <span>Saved Recipes</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer-section links-section">
            <h3 className="footer-title">Categories</h3>
            <ul className="footer-links">
              <li className="footer-link-item">
                <Link to="/search?category=breakfast" className="footer-link">
                  <span className="footer-link-icon">🍳</span>
                  <span>Breakfast</span>
                </Link>
              </li>
              <li className="footer-link-item">
                <Link to="/search?category=lunch" className="footer-link">
                  <span className="footer-link-icon">🥪</span>
                  <span>Lunch</span>
                </Link>
              </li>
              <li className="footer-link-item">
                <Link to="/search?category=dinner" className="footer-link">
                  <span className="footer-link-icon">🍽️</span>
                  <span>Dinner</span>
                </Link>
              </li>
              <li className="footer-link-item">
                <Link to="/search?category=dessert" className="footer-link">
                  <span className="footer-link-icon">🧁</span>
                  <span>Desserts</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer-section social-section">
            <h3 className="footer-title">Connect With Us</h3>
            <div className="social-links">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <div className="social-icon github">
                  <span>📱</span>
                </div>
                <span>GitHub</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <div className="social-icon twitter">
                  <span>🐦</span>
                </div>
                <span>Twitter</span>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <div className="social-icon linkedin">
                  <span>💼</span>
                </div>
                <span>LinkedIn</span>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <div className="social-icon instagram">
                  <span>📷</span>
                </div>
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p className="copyright">
            © {new Date().getFullYear()} Recipe App. All rights reserved.
          </p>
          <div className="footer-bottom-links">
            <a href="#" className="footer-bottom-link">Privacy Policy</a>
            <a href="#" className="footer-bottom-link">Terms of Service</a>
            <a href="#" className="footer-bottom-link">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 