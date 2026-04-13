import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import { theme } from '../theme';
import axios from 'axios';

const API_URL = 'https://api.manageyourpg.com/api';

const TenantLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phone: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setErrors({});
    
    try {
      const response = await axios.post(`${API_URL}/tenants/login`, {
        email: formData.phone,
        password: formData.password
      });
      console.log(response.data.token);
      
      if (response.data.success) {
        // Store tenant info
        localStorage.setItem('tenantAuth', JSON.stringify({
          tenantId: response.data.tenant?.tenantId || response.data.data?._id,
          name: response.data.tenant?.name || 'Tenant',
          email: response.data.tenant?.email || '',
          phone: response.data.tenant?.phone || formData.phone,
          pgName: response.data.tenant?.pgId?.name || '',
          pgArea: response.data.tenant?.pgId?.area || '',
          roomNumber: response.tenant?.data?.roomNumber || '',
          rentAmount: response?.tenant?.data?.rentAmount || 0,
          dueDate: '5th of every month',
          isLoggedIn: true,
          loginTime: new Date().toISOString()
        }));
        localStorage.setItem("tenantToken", response.data.token);
        // Redirect to tenant dashboard
        navigate('/tenant-dashboard');
      }
    } catch (err) {
      console.error('Login error:', err);
      // For demo purposes, accept any credentials if API is not available
    
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="tenant-login-page">
      {/* Header */}
      <header className="tenant-header">
        <Link to="/" className="header-logo">
          <Logo size="small" light />
        </Link>
        <Link to="/" className="back-home">← Back to Home</Link>
      </header>

      <div className="tenant-login-container">
        <div className="login-card">
          {/* Tenant Icon */}
          <div className="tenant-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="12" cy="7" r="4" stroke="white" strokeWidth="2"/>
            </svg>
          </div>

          <h1>Tenant Login</h1>
          <p className="login-subtitle">Access your tenant dashboard</p>

          {/* Info Box */}
          <div className="info-box">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={theme.primary[600]} strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="16" x2="12" y2="12"/>
              <line x1="12" y1="8" x2="12.01" y2="8"/>
            </svg>
            <p>Your credentials were provided by your PG owner when you checked in. Contact your PG owner if you don't have your login details.</p>
          </div>

          {errors.general && (
            <div className="error-alert">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter your phone number (e.g., +919876543210)"
                className={errors.phone ? 'error' : ''}
              />
              {errors.phone && <span className="error-text">{errors.phone}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-input">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className={errors.password ? 'error' : ''}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>

            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <a href="#forgot" className="forgot-link">Forgot Password?</a>
            </div>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Logging in...
                </>
              ) : (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                    <polyline points="10 17 15 12 10 7"/>
                    <line x1="15" y1="12" x2="3" y2="12"/>
                  </svg>
                  Login to Dashboard
                </>
              )}
            </button>
          </form>

          {/* Features */}
          <div className="tenant-features">
            <h3>Tenant Dashboard Features</h3>
            <div className="features-grid">
              <div className="feature-item">
                <span className="feature-icon">📋</span>
                <span>View Profile</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">💳</span>
                <span>Payment History</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🔧</span>
                <span>Maintenance</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">📢</span>
                <span>Notices</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .tenant-login-page {
          min-height: 100vh;
          background: linear-gradient(135deg, ${theme.primary[900]} 0%, ${theme.primary[800]} 50%, ${theme.primary[700]} 100%);
          display: flex;
          flex-direction: column;
        }
        .tenant-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 30px;
        }
        .header-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }
        .back-home {
          color: rgba(255,255,255,0.8);
          text-decoration: none;
          font-size: 14px;
          padding: 8px 16px;
          border: 1px solid rgba(255,255,255,0.3);
          border-radius: 20px;
          transition: all 0.2s;
        }
        .back-home:hover {
          background: rgba(255,255,255,0.1);
          color: white;
        }
        .tenant-login-container {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .login-card {
          background: white;
          border-radius: 20px;
          padding: 35px 30px;
          width: 100%;
          max-width: 420px;
          box-shadow: 0 25px 50px rgba(0,0,0,0.3);
        }
        .tenant-icon {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, ${theme.primary[800]}, ${theme.primary[700]});
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
        }
        .login-card h1 {
          text-align: center;
          font-size: 24px;
          font-weight: 700;
          color: ${theme.primary[800]};
          margin: 0 0 5px;
        }
        .login-subtitle {
          text-align: center;
          color: ${theme.neutral[500]};
          font-size: 14px;
          margin: 0 0 20px;
        }
        .info-box {
          display: flex;
          gap: 10px;
          padding: 12px;
          background: ${theme.primary[900]}10;
          border-radius: 10px;
          margin-bottom: 20px;
        }
        .info-box svg {
          flex-shrink: 0;
          margin-top: 2px;
        }
        .info-box p {
          font-size: 12px;
          color: ${theme.primary[600]};
          margin: 0;
          line-height: 1.5;
        }
        .error-alert {
          padding: 12px;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 10px;
          color: #dc2626;
          font-size: 13px;
          margin-bottom: 15px;
        }
        .login-form {
          margin-bottom: 20px;
        }
        .form-group {
          margin-bottom: 16px;
        }
        .form-group label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: #333;
          margin-bottom: 6px;
        }
        .form-group input {
          width: 100%;
          padding: 12px 14px;
          border: 2px solid #e5e7eb;
          border-radius: 10px;
          font-size: 14px;
          transition: border-color 0.2s;
          box-sizing: border-box;
        }
        .form-group input:focus {
          outline: none;
          border-color: ${theme.accent[500]};
        }
        .form-group input.error {
          border-color: #dc2626;
        }
        .password-input {
          position: relative;
        }
        .password-input input {
          padding-right: 45px;
        }
        .toggle-password {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: ${theme.neutral[500]};
          padding: 4px;
        }
        .error-text {
          display: block;
          font-size: 12px;
          color: #dc2626;
          margin-top: 4px;
        }
        .form-options {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .remember-me {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: ${theme.neutral[500]};
          cursor: pointer;
        }
        .forgot-link {
          font-size: 13px;
          color: ${theme.accent[500]};
          text-decoration: none;
          font-weight: 500;
        }
        .login-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 14px;
          background: ${theme.gradients.accent};
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .login-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(249, 115, 22, 0.3);
        }
        .login-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .demo-credentials {
          text-align: center;
          padding: 15px;
          background: ${theme.neutral[50]};
          border-radius: 10px;
          margin-bottom: 20px;
        }
        .demo-title {
          font-size: 12px;
          font-weight: 600;
          color: ${theme.neutral[500]};
          margin: 0 0 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .demo-info {
          font-size: 13px;
          color: ${theme.neutral[600]};
          margin: 4px 0;
        }
        .tenant-features {
          padding-top: 20px;
          border-top: 1px solid ${theme.neutral[100]};
        }
        .tenant-features h3 {
          font-size: 13px;
          font-weight: 600;
          color: ${theme.neutral[500]};
          text-align: center;
          margin: 0 0 15px;
        }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }
        .feature-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px;
          background: ${theme.neutral[50]};
          border-radius: 8px;
          font-size: 12px;
          color: ${theme.neutral[600]};
        }
        .feature-icon {
          font-size: 16px;
        }
        
        @media (max-width: 480px) {
          .tenant-header {
            padding: 15px;
          }
          .login-card {
            padding: 25px 20px;
          }
          .tenant-icon {
            width: 60px;
            height: 60px;
          }
          .tenant-icon svg {
            width: 32px;
            height: 32px;
          }
        }
      `}</style>
    </div>
  );
};

export default TenantLogin;
