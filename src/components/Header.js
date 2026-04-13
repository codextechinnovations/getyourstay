import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { theme } from '../theme';
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { signupUser, loginUser, googleAuthUser } from '../services/api';

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
      <header style={{
        background: theme.gradients.hero,
        padding: '12px 0',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: '0 4px 20px rgba(10, 25, 41, 0.4)'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Logo size="large" light />
          </Link>

          {/* Desktop Navigation */}
          <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
            <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '14px', fontWeight: '500', transition: 'opacity 0.2s' }}>Home</Link>
      
            <Link to="/about" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '14px', fontWeight: '500', transition: 'opacity 0.2s' }}>About</Link>
            <Link to="/contact" style={{ color: 'white', textDecoration: 'none', fontSize: '14px', fontWeight: '500', transition: 'opacity 0.2s' }}>Contact</Link>
            <Link to="/list-your-pg" style={{ color: theme.accent[500], textDecoration: 'none', fontSize: '14px', fontWeight: '600', transition: 'opacity 0.2s', background: 'rgba(255,255,255,0.1)', padding: '6px 12px', borderRadius: '20px' }}>List Your PG</Link>


            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Link
                to="/tenant-login"
                style={{
                  background: 'transparent',
                  color: 'white',
                  border: '1px solid rgba(255,255,255,0.3)',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontWeight: '500',
                  fontSize: '13px',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease'
                }}
              >
                Tenant Login
              </Link>
              {user ? (
                <div style={{ position: 'relative' }}>
                  <img
                    src={user.picture || user.profilePic || "https://via.placeholder.com/40"}
                    alt={user.name || 'User'}
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      cursor: 'pointer',
                      border: '2px solid white'
                    }}
                  />
                  {showUserMenu && (
                    <div style={{
                      position: 'absolute',
                      top: '50px',
                      right: '0',
                      background: 'white',
                      borderRadius: '12px',
                      boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
                      padding: '8px',
                      minWidth: '180px',
                      zIndex: 1000
                    }}>
                      <div style={{ padding: '12px 16px', borderBottom: '1px solid #f1f5f9', marginBottom: '8px' }}>
                        <p style={{ margin: 0, fontWeight: '600', color: '#1a1a4e', fontSize: '14px' }}>
                          {user.name || 'User'}
                        </p>
                        <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '12px' }}>
                          {user.email || ''}
                        </p>
                      </div>
                      <button
                        onClick={handleLogout}
                        style={{
                          width: '100%',
                          padding: '10px 16px',
                          background: 'none',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          fontSize: '14px',
                          color: '#ef4444',
                          transition: 'background 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = '#fef2f2'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
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
                // ❌ SHOW SIGNUP
                <button
                  onClick={() => setShowAuthModal(true)}
                  style={{
                    background: theme.accent[500],
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '20px',
                    fontWeight: '600',
                    fontSize: '13px',
                    cursor: 'pointer'
                  }}
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
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              padding: '8px',
              cursor: 'pointer'
            }}
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
          <div className="mobile-menu" style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'white',
            padding: '20px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            animation: 'slideDown 0.3s ease'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <Link to="/" style={{ color: theme.primary[800], textDecoration: 'none', fontSize: '16px', fontWeight: '500', padding: '10px 0', borderBottom: '1px solid #f1f5f9' }} onClick={() => setMobileMenuOpen(false)}>Home</Link>
              <Link to="/hotels" style={{ color: '#64748b', textDecoration: 'none', fontSize: '16px', fontWeight: '500', padding: '10px 0', borderBottom: '1px solid #f1f5f9' }} onClick={() => setMobileMenuOpen(false)}>Hotels</Link>
              <Link to="/flats" style={{ color: '#64748b', textDecoration: 'none', fontSize: '16px', fontWeight: '500', padding: '10px 0', borderBottom: '1px solid #f1f5f9' }} onClick={() => setMobileMenuOpen(false)}>Flats</Link>
              <Link to="/about" style={{ color: '#64748b', textDecoration: 'none', fontSize: '16px', fontWeight: '500', padding: '10px 0', borderBottom: '1px solid #f1f5f9' }} onClick={() => setMobileMenuOpen(false)}>About Us</Link>
              <Link to="/contact" style={{ color: '#64748b', textDecoration: 'none', fontSize: '16px', fontWeight: '500', padding: '10px 0', borderBottom: '1px solid #f1f5f9' }} onClick={() => setMobileMenuOpen(false)}>Contact</Link>
              <Link to="/list-your-pg" style={{ color: theme.accent[500], textDecoration: 'none', fontSize: '16px', fontWeight: '600', padding: '10px 0', borderBottom: '1px solid #f1f5f9' }} onClick={() => setMobileMenuOpen(false)}>List Your PG</Link>
              <Link to="/pg-management-app" style={{ color: '#64748b', textDecoration: 'none', fontSize: '16px', fontWeight: '500', padding: '10px 0', borderBottom: '1px solid #f1f5f9' }} onClick={() => setMobileMenuOpen(false)}>PG Management App</Link>
              <Link to="/terms" style={{ color: '#64748b', textDecoration: 'none', fontSize: '16px', fontWeight: '500', padding: '10px 0', borderBottom: '1px solid #f1f5f9' }} onClick={() => setMobileMenuOpen(false)}>Terms</Link>
              <Link
                to="/tenant-login"
                style={{
                  color: theme.accent[500],
                  textDecoration: 'none',
                  fontSize: '16px',
                  fontWeight: '500',
                  padding: '10px 0',
                  borderBottom: '1px solid #f1f5f9'
                }}
                onClick={() => setMobileMenuOpen(false)}
              >
                Tenant Login
              </Link>




              {/* 🔄 CONDITIONAL */}
              {user ? (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
                    <img
                      src={user.picture || user.profilePic || "https://via.placeholder.com/40"}
                      alt={user.name || 'User'}
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        cursor: 'pointer',
                        border: '2px solid white'
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: 0, fontWeight: '600', color: theme.primary[800], fontSize: '14px' }}>
                        {user.name || 'User'}
                      </p>
                      <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '12px' }}>
                        {user.email || ''}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      background: '#fef2f2',
                      border: '1px solid #fecaca',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      fontSize: '14px',
                      color: '#ef4444',
                      fontWeight: '500'
                    }}
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
                // ❌ SHOW SIGNUP
                <button
                  onClick={() => setShowAuthModal(true)}
                  style={{
                    background: theme.accent[500],
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '20px',
                    fontWeight: '600',
                    fontSize: '13px',
                    cursor: 'pointer'
                  }}
                >
                  Sign Up
                </button>
              )}


            </div>
          </div>
        )}
      </header >

      {showAuthModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000,
          backdropFilter: 'blur(5px)',
          padding: '20px'
        }} onClick={() => setShowAuthModal(false)}>
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '30px',
            width: '100%',
            maxWidth: '400px',
            maxHeight: '90vh',
            overflowY: 'auto',
            position: 'relative',
            boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
            animation: 'modalSlideIn 0.3s ease'
          }} onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setShowAuthModal(false)}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                color: '#666',
                width: '35px',
                height: '35px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ×
            </button>

            <div style={{ textAlign: 'center', marginBottom: '25px' }}>
              <div style={{
                width: '50px',
                height: '50px',
                background: theme.gradients.primary,
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 12px'
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="7" r="4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h2 style={{ margin: '0 0 5px', color: theme.primary[800], fontSize: '22px', fontWeight: '700' }}>
                {isLogin ? 'Welcome Back!' : 'Create Account'}
              </h2>
              <p style={{ color: theme.neutral[500], fontSize: '13px', margin: 0 }}>
                {isLogin ? 'Sign in to access your account' : 'Join GetYourStay to find your perfect PG'}
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '12px', fontWeight: '600', color: '#333' }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      border: errors.name ? '2px solid #ef4444' : '2px solid #e5e7eb',
                      borderRadius: '10px',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                  />
                  {errors.name && <span style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px', display: 'block' }}>{errors.name}</span>}
                </div>
              )}

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '12px', fontWeight: '600', color: '#333' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    border: errors.email ? '2px solid #ef4444' : '2px solid #e5e7eb',
                    borderRadius: '10px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                />
                {errors.email && <span style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px', display: 'block' }}>{errors.email}</span>}
              </div>

              {!isLogin && (
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '12px', fontWeight: '600', color: '#333' }}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter 10-digit phone number"
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      border: errors.phone ? '2px solid #ef4444' : '2px solid #e5e7eb',
                      borderRadius: '10px',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                  />
                  {errors.phone && <span style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px', display: 'block' }}>{errors.phone}</span>}
                </div>
              )}

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '12px', fontWeight: '600', color: '#333' }}>
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    border: errors.password ? '2px solid #ef4444' : '2px solid #e5e7eb',
                    borderRadius: '10px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                />
                {errors.password && <span style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px', display: 'block' }}>{errors.password}</span>}
              </div>

              {!isLogin && (
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '12px', fontWeight: '600', color: '#333' }}>
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm your password"
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      border: errors.confirmPassword ? '2px solid #ef4444' : '2px solid #e5e7eb',
                      borderRadius: '10px',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                  />
                  {errors.confirmPassword && <span style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px', display: 'block' }}>{errors.confirmPassword}</span>}
                </div>
              )}

              {isLogin && (
                <div style={{ marginBottom: '18px', textAlign: 'right' }}>
                  <a href="#forgot" style={{ color: theme.accent[500], fontSize: '13px', textDecoration: 'none', fontWeight: '500' }}>
                    Forgot Password?
                  </a>
                </div>
              )}

              <button type="submit" style={{
                width: '100%',
                padding: '12px',
                background: theme.gradients.accent,
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '15px',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(249, 115, 22, 0.3)'
              }}>
                {isLogin ? 'Sign In' : 'Create Account'}
              </button>
            </form>

            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <p style={{ color: theme.neutral[500], fontSize: '13px', margin: '0 0 12px' }}>Or continue with</p>

              <button
                onClick={handleGoogleSignIn}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: '#fff',
                  border: '1px solid #ddd',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
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

            <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: theme.neutral[500] }}>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={switchMode}
                style={{
                  background: 'none',
                  border: 'none',
                  color: theme.accent[500],
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '13px'
                }}
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>

            <div style={{
              marginTop: '18px',
              paddingTop: '18px',
              borderTop: '1px solid #f1f5f9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '15px',
              flexWrap: 'wrap'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill={theme.success} />
                  <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span style={{ fontSize: '11px', color: theme.neutral[500] }}>Secure Login</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="11" width="18" height="11" rx="2" fill={theme.success} />
                  <path d="M7 11V7a5 5 0 0110 0v4" stroke={theme.success} strokeWidth="2" />
                </svg>
                <span style={{ fontSize: '11px', color: theme.neutral[500] }}>256-bit Encryption</span>
              </div>
            </div>
          </div>
        </div>
      )
      }

      <style>{`
        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        nav a:hover {
          opacity: 0.8;
        }
        button:hover {
          transform: translateY(-1px);
        }
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
        }
        @media (min-width: 769px) {
          .mobile-menu {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default Header;
