import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import { theme } from '../theme';
import '../App.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    queryType: 'general',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
    }, 1500);
  };

  const queryTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'pg-search', label: 'PG Search Help' },
    { value: 'booking', label: 'Booking Assistance' },
    { value: 'complaint', label: 'File a Complaint' },
    { value: 'owner', label: 'List My PG' },
    { value: 'partnership', label: 'Partnership' }
  ];

  return (
    <div className="static-page">
      <header className="static-header">
        <Link to="/" className="header-logo">
          <Logo size="small" />
        </Link>
        <Link to="/" className="back-home">← Back to Home</Link>
      </header>

      <div className="static-container">
        {/* Hero Section */}
        <section className="contact-hero">
          <h1>Contact GetYourStay</h1>
          <p className="hero-subtitle">We're Here to Help You Find Your Perfect PG</p>
        </section>

        <div className="contact-wrapper">
          {/* Contact Form */}
          <section className="contact-form-section">
            {submitted ? (
              <div className="success-message">
                <div className="success-icon">✓</div>
                <h2>Thank You for Contacting Us!</h2>
                <p>We've received your message and will get back to you within 24 hours. For urgent queries, call us directly at +91 98765 43210.</p>
                <button onClick={() => setSubmitted(false)} className="submit-another">
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <h2>Send Us a Message</h2>
                <p className="form-intro">Fill out the form below and our team will get back to you shortly.</p>
                
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Your Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>City</label>
                      <select name="city" value={formData.city} onChange={handleChange}>
                        <option value="">Select your city</option>
                        <option value="bangalore">Bangalore</option>
                        <option value="hyderabad">Hyderabad</option>
                        <option value="chennai">Chennai</option>
                        <option value="pune">Pune</option>
                        <option value="mumbai">Mumbai</option>
                        <option value="delhi">Delhi</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Query Type *</label>
                    <select name="queryType" value={formData.queryType} onChange={handleChange} required>
                      {queryTypes.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Your Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help you..."
                      rows="5"
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? (
                      <>
                        <span className="spinner"></span>
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              </>
            )}
          </section>

          {/* Contact Info */}
          <aside className="contact-info">
            <div className="info-card">
              <h3>Get in Touch</h3>
              <p>Have questions about PG accommodation? Need help with your booking? We're here for you 24/7.</p>
              
              <div className="contact-methods">
                <div className="contact-method">
                  <div className="method-icon">📞</div>
                  <div className="method-details">
                    <span className="method-label">Phone</span>
                    <a href="tel:+919876543210" className="method-value">+91 98765 43210</a>
                  </div>
                </div>
                <div className="contact-method">
                  <div className="method-icon">✉️</div>
                  <div className="method-details">
                    <span className="method-label">Email</span>
                    <a href="mailto:support@getyourstay.in" className="method-value">support@getyourstay.in</a>
                  </div>
                </div>
                <div className="contact-method">
                  <div className="method-icon">💬</div>
                  <div className="method-details">
                    <span className="method-label">WhatsApp</span>
                    <a href="https://wa.me/919876543210" className="method-value">+91 98765 43210</a>
                  </div>
                </div>
                <div className="contact-method">
                  <div className="method-icon">📍</div>
                  <div className="method-details">
                    <span className="method-label">Office</span>
                    <span className="method-value">Electronic City, Bangalore - 560100</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="info-card">
              <h3>Business Hours</h3>
              <div className="hours-grid">
                <span>Monday - Friday</span>
                <span>9:00 AM - 8:00 PM</span>
                <span>Saturday</span>
                <span>10:00 AM - 6:00 PM</span>
                <span>Sunday</span>
                <span>10:00 AM - 4:00 PM</span>
              </div>
              <p className="hours-note">*24/7 emergency support available for existing tenants</p>
            </div>

            <div className="info-card">
              <h3>Quick Help</h3>
              <div className="quick-links">
                <Link to="/faq" className="quick-link">
                  <span>❓</span> Frequently Asked Questions
                </Link>
                <Link to="/how-it-works" className="quick-link">
                  <span>📖</span> How It Works
                </Link>
                <Link to="/pg-near-me" className="quick-link">
                  <span>📍</span> Find PG Near Me
                </Link>
                <Link to="/tenant-guide" className="quick-link">
                  <span>📋</span> Tenant Guide
                </Link>
              </div>
            </div>
          </aside>
        </div>

        {/* FAQ Section */}
        <section className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>How do I search for PG accommodation?</h3>
              <p>Simply enter your preferred location, budget, and requirements in our search bar. Browse through verified listings, filter by amenities, and contact owners directly through our platform.</p>
            </div>
            <div className="faq-item">
              <h3>Are all PG listings verified?</h3>
              <p>Yes, every PG on GetYourStay undergoes a thorough verification process. We verify property documents, amenities, photos, and landlord credentials before listing.</p>
            </div>
            <div className="faq-item">
              <h3>How do I pay rent through GetYourStay?</h3>
              <p>You can pay rent securely through our platform using UPI, net banking, or cards. All transactions are encrypted and protected.</p>
            </div>
            <div className="faq-item">
              <h3>Can I shift if I'm not satisfied?</h3>
              <p>Our policies vary by PG owner. We recommend discussing shift options with your landlord before booking. Check the PG listing for shift policy details.</p>
            </div>
            <div className="faq-item">
              <h3>How do I list my PG on GetYourStay?</h3>
              <p>PG owners can register on our owner portal, add their property details, upload photos, set pricing, and start receiving inquiries within 24 hours of verification.</p>
            </div>
            <div className="faq-item">
              <h3>What documents do I need to book a PG?</h3>
              <p>Typically, you need: ID proof (Aadhaar/PAN), address proof, passport-size photos, and college/company ID (if applicable). Specific requirements may vary by PG.</p>
            </div>
          </div>
        </section>

        {/* SEO Content */}
        <section className="seo-section">
          <h2>Contact Us for PG Accommodation Support</h2>
          <div className="seo-content">
            <p>
              Looking for <strong>PG accommodation help</strong>? GetYourStay provides comprehensive support for all your paying guest needs. Whether you're searching for <strong>PG in Bangalore</strong>, <strong>PG in Hyderabad</strong>, or any other city, our dedicated support team is ready to assist you.
            </p>
            <p>
              If you're a <strong>student looking for PG near college</strong> or a <strong>working professional seeking PG near office</strong>, we can help you find the perfect accommodation. Our team specializes in matching tenants with verified PGs that meet their specific requirements including budget, amenities, food preferences, and location.
            </p>
            <p>
              For <strong>PG owners looking to list their property</strong>, we offer comprehensive onboarding support. Learn how to reach thousands of potential tenants, manage bookings efficiently, and grow your PG business with GetYourStay's owner dashboard.
            </p>
          </div>
        </section>
      </div>

      <style>{`
        .static-page {
          min-height: 100vh;
          background: #f8fafc;
        }
        .static-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 30px;
          background: white;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }
        .back-home {
          color: ${theme.primary[700]};
          text-decoration: none;
          font-weight: 500;
          padding: 8px 16px;
          border: 1px solid ${theme.primary[200]};
          border-radius: 20px;
          transition: all 0.2s;
        }
        .back-home:hover {
          background: ${theme.primary[50]};
        }
        .static-container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 20px 60px;
        }
        .contact-hero {
          text-align: center;
          padding: 60px 20px 40px;
          background: linear-gradient(135deg, ${theme.primary[900]} 0%, ${theme.primary[800]} 50%, ${theme.primary[700]} 100%);
          border-radius: 20px;
          margin: 30px 0;
        }
        .contact-hero h1 {
          color: white;
          font-size: 42px;
          font-weight: 800;
          margin: 0 0 10px;
        }
        .contact-hero .hero-subtitle {
          color: rgba(255,255,255,0.85);
          font-size: 18px;
          margin: 0;
        }
        .contact-wrapper {
          display: grid;
          grid-template-columns: 1fr 350px;
          gap: 30px;
          margin: 30px 0;
        }
        .contact-form-section {
          background: white;
          border-radius: 16px;
          padding: 40px;
          box-shadow: 0 2px 15px rgba(0,0,0,0.04);
        }
        .contact-form-section h2 {
          color: ${theme.primary[800]};
          font-size: 24px;
          font-weight: 700;
          margin: 0 0 10px;
        }
        .form-intro {
          color: ${theme.neutral[500]};
          margin: 0 0 25px;
        }
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .form-group label {
          font-size: 14px;
          font-weight: 600;
          color: ${theme.neutral[700]};
        }
        .form-group input,
        .form-group select,
        .form-group textarea {
          padding: 14px 16px;
          border: 2px solid ${theme.neutral[200]};
          border-radius: 10px;
          font-size: 15px;
          transition: border-color 0.2s;
        }
        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: ${theme.primary[500]};
        }
        .form-group textarea {
          resize: vertical;
        }
        .submit-btn {
          padding: 16px 30px;
          background: linear-gradient(135deg, ${theme.accent[500]}, ${theme.accent[600]});
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }
        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(249, 115, 22, 0.3);
        }
        .submit-btn:disabled {
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
        .success-message {
          text-align: center;
          padding: 40px 20px;
        }
        .success-icon {
          width: 80px;
          height: 80px;
          background: ${theme.success};
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 40px;
          color: white;
          margin: 0 auto 20px;
        }
        .success-message h2 {
          color: ${theme.primary[800]};
          font-size: 24px;
          margin: 0 0 10px;
        }
        .success-message p {
          color: ${theme.neutral[600]};
          margin: 0 0 25px;
        }
        .submit-another {
          padding: 12px 25px;
          background: ${theme.primary[700]};
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
        }
        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .info-card {
          background: white;
          border-radius: 16px;
          padding: 25px;
          box-shadow: 0 2px 15px rgba(0,0,0,0.04);
        }
        .info-card h3 {
          color: ${theme.primary[800]};
          font-size: 18px;
          font-weight: 700;
          margin: 0 0 12px;
        }
        .info-card > p {
          color: ${theme.neutral[600]};
          font-size: 14px;
          margin: 0 0 20px;
          line-height: 1.6;
        }
        .contact-methods {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        .contact-method {
          display: flex;
          align-items: center;
          gap: 15px;
        }
        .method-icon {
          width: 44px;
          height: 44px;
          background: ${theme.primary[50]};
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
        }
        .method-details {
          display: flex;
          flex-direction: column;
        }
        .method-label {
          font-size: 12px;
          color: ${theme.neutral[500]};
        }
        .method-value {
          font-size: 14px;
          font-weight: 600;
          color: ${theme.primary[800]};
          text-decoration: none;
        }
        a.method-value:hover {
          color: ${theme.accent[500]};
        }
        .hours-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          font-size: 14px;
        }
        .hours-note {
          font-size: 12px;
          color: ${theme.neutral[500]};
          margin: 15px 0 0;
          font-style: italic;
        }
        .quick-links {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .quick-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 15px;
          background: ${theme.neutral[50]};
          border-radius: 10px;
          color: ${theme.primary[700]};
          text-decoration: none;
          font-weight: 500;
          font-size: 14px;
          transition: all 0.2s;
        }
        .quick-link:hover {
          background: ${theme.primary[100]};
        }
        .faq-section {
          background: white;
          border-radius: 16px;
          padding: 40px;
          margin: 30px 0;
          box-shadow: 0 2px 15px rgba(0,0,0,0.04);
        }
        .faq-section h2 {
          color: ${theme.primary[800]};
          font-size: 24px;
          font-weight: 700;
          margin: 0 0 25px;
        }
        .faq-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        .faq-item {
          padding: 20px;
          background: ${theme.neutral[50]};
          border-radius: 12px;
          border-left: 4px solid ${theme.accent[500]};
        }
        .faq-item h3 {
          color: ${theme.primary[800]};
          font-size: 15px;
          font-weight: 700;
          margin: 0 0 8px;
        }
        .faq-item p {
          color: ${theme.neutral[600]};
          font-size: 14px;
          margin: 0;
          line-height: 1.6;
        }
        .seo-section {
          background: ${theme.neutral[100]};
          border-radius: 16px;
          padding: 40px;
          margin: 30px 0;
        }
        .seo-section h2 {
          color: ${theme.primary[800]};
          font-size: 22px;
          font-weight: 700;
          margin: 0 0 20px;
        }
        .seo-content p {
          color: ${theme.neutral[600]};
          font-size: 15px;
          line-height: 1.9;
          margin: 0 0 15px;
        }
        .seo-content strong {
          color: ${theme.primary[700]};
        }
        @media (max-width: 992px) {
          .contact-wrapper {
            grid-template-columns: 1fr;
          }
          .contact-info {
            order: -1;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 768px) {
          .contact-hero h1 { font-size: 28px; }
          .form-row { grid-template-columns: 1fr; }
          .contact-form-section { padding: 25px; }
          .contact-info { grid-template-columns: 1fr; }
          .faq-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default ContactUs;
