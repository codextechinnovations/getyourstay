import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { theme } from '../theme';
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { signupUser, loginUser, googleAuthUser } from '../services/api';
import './Header.css';

const Header = ({ onLogin }) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [googleError, setGoogleError] = useState('');
  const [user, setUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userData = {
          name: user.displayName,
          email: user.email,
          picture: user.photoURL,
          uid: user.uid,
          loginType: 'google'
        };

        localStorage.setItem('user', JSON.stringify(userData));
        onLogin(userData);
      }
    });

    return () => unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handleGoogleSignIn = async () => {
    try {
      setGoogleLoading(true);
      setGoogleError('');

      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const userData = {
        name: user.displayName,
        email: user.email,
        picture: user.photoURL,
        uid: user.uid
      };

      // 🔥 Send to backend
      const response = await googleAuthUser(userData);

      if (response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));

        if (onLogin) onLogin(response.user);
        setUser(response.user); // 👈 ADD THIS

        setShowAuthModal(false);
        resetForm();
      }

    } catch (error) {
      console.error(error);
      setGoogleError(error.message);
    } finally {
      setGoogleLoading(false);
    }
  };





  const validateForm = () => {
    const newErrors = {};

    if (!isLogin && !formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!isLogin && !formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!isLogin && !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      let response;

      if (isLogin) {
        // LOGIN
        response = await loginUser({
          email: formData.email,
          password: formData.password
        });
      } else {
        // SIGNUP
        response = await signupUser({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone
        });
      }

      if (response.token) {
        // Save token
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));

        if (onLogin) onLogin(response.user);

        setShowAuthModal(false);
        resetForm();
      } else {
        alert(response.message || "Something went wrong");
      }

    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
    setErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
  };

  const handleLogout = async () => {
    try {
      // Sign out from Firebase if using Firebase
      const { signOut } = await import("firebase/auth");
      await signOut(auth);
    } catch (err) {
      console.log('Firebase sign out error:', err);
    }
    
    // Clear local storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Update state
    setUser(null);
    setShowUserMenu(false);
    
    // Redirect to home
    window.location.href = '/';
  };

  return (
    <>
      <header className="app-header">
        <div className="header-container">
          {/* Logo */}
          <Link to="/" className="header-logo">
            <Logo size="large" light />
          </Link>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/about" className="nav-link nav-link-muted">About</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
            <Link to="/list-your-pg" className="nav-link-accent" style={{ background: 'rgba(255,255,255,0.1)', padding: '6px 12px', borderRadius: '20px' }}>List Your PG</Link>


            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Link
                to="/tenant-login"
                className="btn btn-tenant-login"
              >
                Tenant Login
              </Link>
              {user ? (
                <div style={{ position: 'relative' }}>
                  <img
                    src={user.picture || user.profilePic || "https://via.placeholder.com/40"}
                    alt={user.name || 'User'}
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="user-avatar"
                  />
                  {showUserMenu && (
                    <div className="user-menu-dropdown">
                      <div className="user-menu-header">
                        <p className="user-menu-name">
                          {user.name || 'User'}
                        </p>
                        <p className="user-menu-email">
                          {user.email || ''}
                        </p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="logout-btn"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                          <polyline points="16 17 21 12 16 7"/>
                          <line x1="21" y1="12" x2="9" y2="12"/>
                        </svg>
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="btn-signup"
                >
                  Sign Up
                </button>
              )}

            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              {mobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="mobile-menu">
            <div className="mobile-menu-links">
              <Link to="/" className="mobile-link mobile-link-home" onClick={() => setMobileMenuOpen(false)}>Home</Link>
              <Link to="/hotels" className="mobile-link mobile-link-default" onClick={() => setMobileMenuOpen(false)}>Hotels</Link>
              <Link to="/flats" className="mobile-link mobile-link-default" onClick={() => setMobileMenuOpen(false)}>Flats</Link>
              <Link to="/about" className="mobile-link mobile-link-default" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
              <Link to="/contact" className="mobile-link mobile-link-default" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
              <Link to="/list-your-pg" className="mobile-link mobile-link-accent" onClick={() => setMobileMenuOpen(false)}>List Your PG</Link>
              <Link to="/pg-management-app" className="mobile-link mobile-link-default" onClick={() => setMobileMenuOpen(false)}>PG Management App</Link>
              <Link to="/terms" className="mobile-link mobile-link-default" onClick={() => setMobileMenuOpen(false)}>Terms</Link>
              <Link
                to="/tenant-login"
                className="mobile-link mobile-link-accent"
                onClick={() => setMobileMenuOpen(false)}
              >
                Tenant Login
              </Link>




              {/* 🔄 CONDITIONAL */}
              {user ? (
                <>
                  <div className="mobile-user-section">
                    <img
                      src={user.picture || user.profilePic || "https://via.placeholder.com/40"}
                      alt={user.name || 'User'}
                      className="user-avatar"
                    />
                    <div className="mobile-user-info">
                      <p className="mobile-user-name">
                        {user.name || 'User'}
                      </p>
                      <p className="mobile-user-email">
                        {user.email || ''}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="mobile-logout-btn"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                      <polyline points="16 17 21 12 16 7"/>
                      <line x1="21" y1="12" x2="9" y2="12"/>
                    </svg>
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="btn-signup"
                >
                  Sign Up
                </button>
              )}


            </div>
          </div>
        )}
      </header >

      {showAuthModal && (
        <div className="auth-modal-overlay" onClick={() => setShowAuthModal(false)}>
          <div className="auth-modal" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setShowAuthModal(false)}
              className="auth-modal-close"
            >
              ×
            </button>

            <div style={{ textAlign: 'center', marginBottom: '25px' }}>
              <div className="auth-modal-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="7" r="4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h2 className="auth-modal-title">
                {isLogin ? 'Welcome Back!' : 'Create Account'}
              </h2>
              <p className="auth-modal-subtitle">
                {isLogin ? 'Sign in to access your account' : 'Join GetYourStay to find your perfect PG'}
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="form-group">
                  <label className="form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="input-field"
                    style={{
                      border: errors.name ? '2px solid #ef4444' : '2px solid #e5e7eb'
                    }}
                  />
                  {errors.name && <span className="error-text">{errors.name}</span>}
                </div>
              )}

              <div className="form-group">
                <label className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="input-field"
                  style={{
                    border: errors.email ? '2px solid #ef4444' : '2px solid #e5e7eb'
                  }}
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>

              {!isLogin && (
                <div className="form-group">
                  <label className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter 10-digit phone number"
                    className="input-field"
                    style={{
                      border: errors.phone ? '2px solid #ef4444' : '2px solid #e5e7eb'
                    }}
                  />
                  {errors.phone && <span className="error-text">{errors.phone}</span>}
                </div>
              )}

              <div className="form-group">
                <label className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className="input-field"
                  style={{
                    border: errors.password ? '2px solid #ef4444' : '2px solid #e5e7eb'
                  }}
                />
                {errors.password && <span className="error-text">{errors.password}</span>}
              </div>

              {!isLogin && (
                <div className="form-group">
                  <label className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm your password"
                    className="input-field"
                    style={{
                      border: errors.confirmPassword ? '2px solid #ef4444' : '2px solid #e5e7eb'
                    }}
                  />
                  {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
                </div>
              )}

              {isLogin && (
                <div style={{ marginBottom: '18px', textAlign: 'right' }}>
                  <a href="#forgot" className="auth-forgot-link">
                    Forgot Password?
                  </a>
                </div>
              )}

              <button type="submit" className="auth-submit-btn">
                {isLogin ? 'Sign In' : 'Create Account'}
              </button>
            </form>

            <div className="auth-divider">
              <p>Or continue with</p>

              <button
                onClick={handleGoogleSignIn}
                className="auth-google-btn"
              >
                Continue with Google
              </button>

              {googleLoading && (
                <div style={{ marginTop: '10px', color: theme.neutral[500], fontSize: '13px' }}>
                  Signing in with Google...
                </div>
              )}

              {googleError && (
                <div style={{ marginTop: '10px', color: '#ef4444', fontSize: '13px' }}>
                  {googleError}
                </div>
              )}
            </div>

            <p className="auth-switch">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={switchMode}
                className="auth-switch-btn"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>

            <div className="auth-security-badges">
              <div className="auth-security-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill={theme.success} />
                  <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Secure Login</span>
              </div>
              <div className="auth-security-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="11" width="18" height="11" rx="2" fill={theme.success} />
                  <path d="M7 11V7a5 5 0 0110 0v4" stroke={theme.success} strokeWidth="2" />
                </svg>
                <span>256-bit Encryption</span>
              </div>
            </div>
          </div>
        </div>
      )
      }


    </>
  );
};

export default Header;
