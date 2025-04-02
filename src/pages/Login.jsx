import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/main.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(formData.email, formData.password);
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message || 'Failed to log in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="enhanced-auth-page">
      <div className="auth-background">
        <div className="auth-shape shape-1"></div>
        <div className="auth-shape shape-2"></div>
        <div className="auth-shape shape-3"></div>
        <div className="auth-pattern"></div>
      </div>
      
      <div className={`enhanced-auth-container ${animationComplete ? 'animated' : ''}`}>
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-logo">
              <span className="auth-logo-icon">🍳</span>
              <h2 className="auth-logo-text">Recipe App</h2>
            </div>
            <h1 className="auth-title">
              Welcome Back
              <div className="emoji-container">
                <span className="animated-emoji">👋</span>
              </div>
            </h1>
            <p className="auth-subtitle">Sign in to your account to continue your culinary journey!</p>
          </div>
          
          {error && (
            <div className="enhanced-error-message">
              <span className="error-icon">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="enhanced-auth-form">
            <div className="enhanced-form-group">
              <label htmlFor="email" className="enhanced-label">
                <span className="label-icon">📧</span>
                <span>Email Address</span>
              </label>
              <div className="enhanced-input-container">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                  className="enhanced-input"
                />
                <div className="input-focus-border"></div>
              </div>
            </div>

            <div className="enhanced-form-group">
              <label htmlFor="password" className="enhanced-label">
                <span className="label-icon">🔒</span>
                <span>Password</span>
              </label>
              <div className="enhanced-input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter your password"
                  className="enhanced-input"
                />
                <button
                  type="button"
                  className="enhanced-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <span>{showPassword ? "👁️" : "👁️‍🗨️"}</span>
                </button>
                <div className="input-focus-border"></div>
              </div>
            </div>
            
            <div className="auth-options">
              <div className="remember-me">
                <input type="checkbox" id="remember" className="custom-checkbox" />
                <label htmlFor="remember">Remember me</label>
              </div>
              <Link to="/forgot-password" className="forgot-password">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="enhanced-submit-button"
            >
              {loading ? (
                <div className="button-content">
                  <div className="enhanced-spinner">
                    <div className="spinner-inner"></div>
                  </div>
                  <span>Cooking up your login...</span>
                </div>
              ) : (
                <div className="button-content">
                  <span className="button-icon">🔑</span>
                  <span>Sign In</span>
                </div>
              )}
            </button>
          </form>

          <div className="enhanced-divider">
            <span>OR</span>
          </div>

          <div className="social-login">
            <button className="social-button google">
              <span className="social-icon">G</span>
              <span>Continue with Google</span>
            </button>
          </div>

          <div className="enhanced-auth-footer">
            <p>Don't have an account yet?</p>
            <Link to="/register" className="enhanced-auth-link">
              <span>Create an account</span>
              <span className="link-icon">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 