import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useState, useEffect } from 'react';
import '../styles/main.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setIsOpen(false);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-logo pulse-animation" onClick={closeMenu}>
            <span className="logo-icon">🍳</span>
            <span className="logo-text">Recipe App</span>
          </Link>
        </div>

        <div className="navbar-toggle" onClick={toggleMenu}>
          <div className={`hamburger ${isOpen ? 'active' : ''}`}>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </div>
        </div>
        
        <div className={`navbar-menu ${isOpen ? 'active' : ''}`}>
          <div className="navbar-start">
            <Link 
              to="/" 
              className={`nav-link nav-button-link ${isActive('/') ? 'active-nav-link' : ''}`} 
              onClick={closeMenu}
            >
              <div className="nav-icon-container">
                <span className="nav-icon home-icon">🏠</span>
              </div>
              <span>Home</span>
              {isActive('/') && <span className="active-indicator"></span>}
            </Link>
            
            <Link 
              to="/search" 
              className={`nav-link nav-button-link ${isActive('/search') ? 'active-nav-link' : ''}`} 
              onClick={closeMenu}
            >
              <div className="nav-icon-container search-icon-container">
                <span className="nav-icon search-icon">🔍</span>
              </div>
              <span>Search</span>
              {isActive('/search') && <span className="active-indicator"></span>}
            </Link>
            
            {user && (
              <Link 
                to="/saved" 
                className={`nav-link nav-button-link ${isActive('/saved') ? 'active-nav-link' : ''}`} 
                onClick={closeMenu}
              >
                <div className="nav-icon-container saved-icon-container">
                  <span className="nav-icon saved-icon">❤️</span>
                </div>
                <span>Saved Recipes</span>
                {isActive('/saved') && <span className="active-indicator"></span>}
              </Link>
            )}
          </div>
          
          <div className="navbar-end">
            {!user ? (
              <Link to="/login" className="nav-button primary-button" onClick={closeMenu}>
                <span className="button-icon">🔑</span>
                <span>Login</span>
              </Link>
            ) : (
              <div className="user-profile">
                <div className="user-info">
                  <span className="user-avatar">👤</span>
                  <span className="user-name">{user.displayName || user.email?.split('@')[0] || 'User'}</span>
                </div>
                <button onClick={handleLogout} className="nav-button logout-button">
                  <span className="button-icon">👋</span>
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 