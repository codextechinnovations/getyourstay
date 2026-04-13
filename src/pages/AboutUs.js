import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import { theme } from '../theme';
import '../App.css';

const AboutUs = () => {
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
        <section className="about-hero">
          <h1>About GetYourStay</h1>
          <p className="hero-subtitle">India's Most Trusted Platform for PG Accommodation</p>
        </section>

        {/* Mission Section */}
        <section className="content-section">
          <h2>Our Mission</h2>
          <p>
            At GetYourStay, our mission is to revolutionize the way students and working professionals find their perfect paying guest (PG) accommodation in India. We understand the challenges of relocating to a new city for education or work, and we are committed to making the PG search process seamless, transparent, and hassle-free.
          </p>
          <p>
            Founded in 2020, GetYourStay has quickly become the preferred platform for thousands of tenants seeking quality PG accommodations across major Indian cities including Bangalore, Hyderabad, Chennai, Pune, Mumbai, Delhi, and more. Our platform connects tenants directly with verified PG owners, eliminating middlemen and ensuring transparent pricing.
          </p>
        </section>

        {/* Why Choose Us */}
        <section className="content-section bg-light">
          <h2>Why Choose GetYourStay?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">✓</div>
              <h3>100% Verified Listings</h3>
              <p>Every PG on our platform undergoes a thorough verification process. We personally visit each property to verify amenities, safety features, and landlord authenticity. Our verification team checks everything from room conditions to security measures.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">₹</div>
              <h3>Transparent Pricing</h3>
              <p>No hidden charges, no surprises. Get real pricing information including rent, deposits, food charges, and maintenance fees upfront. We believe in complete transparency so you can budget accurately for your stay.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏠</div>
              <h3>Wide Range of Options</h3>
              <p>From budget-friendly AC rooms to premium PGs with gym and rooftop café, we have options for every budget and preference. Browse through single, double, triple, and dormitory-style accommodations.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure Payments</h3>
              <p>All transactions on GetYourStay are secure. We use industry-standard encryption to protect your payments. Pay rent, deposits, and maintenance fees with complete peace of mind.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Easy Management</h3>
              <p>Access your tenant dashboard to pay rent, raise maintenance requests, view notices, and communicate with your PG owner - all from your smartphone. We make PG management effortless.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💬</div>
              <h3>24/7 Support</h3>
              <p>Our dedicated support team is available round the clock to assist you. Whether it's a midnight maintenance issue or a billing query, we're always here to help.</p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats-section">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">10,000+</span>
              <span className="stat-label">Happy Tenants</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">Verified PGs</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">50+</span>
              <span className="stat-label">Cities Covered</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">99%</span>
              <span className="stat-label">Satisfaction Rate</span>
            </div>
          </div>
        </section>

        {/* Who We Serve */}
        <section className="content-section">
          <h2>Who We Serve</h2>
          <div className="audience-grid">
            <div className="audience-item">
              <h3>🎓 Students</h3>
              <p>College and university students looking for safe, affordable PG accommodation near their campuses. Whether you're pursuing engineering, medical, management, or any other course, find the perfect PG near your college in Bangalore, Hyderabad, or any major city.</p>
            </div>
            <div className="audience-item">
              <h3>💼 Working Professionals</h3>
              <p>IT professionals, corporate employees, and entrepreneurs seeking comfortable PG stays near their workplaces. Our PGs are strategically located near major tech parks and business districts including Electronic City, HSR Layout, Whitefield, and more.</p>
            </div>
            <div className="audience-item">
              <h3>🏢 PG Owners</h3>
              <p>Property owners and PG managers looking to list their accommodations. Our platform helps you reach thousands of potential tenants, manage bookings, and streamline your operations with our comprehensive owner dashboard.</p>
            </div>
          </div>
        </section>

        {/* Cities We Cover */}
        <section className="content-section bg-light">
          <h2>Cities We Cover</h2>
          <p className="section-intro">
            GetYourStay currently operates in major Indian cities with the highest demand for PG accommodations:
          </p>
          <div className="cities-list">
            <span className="city-tag">Bangalore PG</span>
            <span className="city-tag">Hyderabad PG</span>
            <span className="city-tag">Chennai PG</span>
            <span className="city-tag">Pune PG</span>
            <span className="city-tag">Mumbai PG</span>
            <span className="city-tag">Delhi PG</span>
            <span className="city-tag">Noida PG</span>
            <span className="city-tag">Gurgaon PG</span>
            <span className="city-tag">Kolkata PG</span>
            <span className="city-tag">Coimbatore PG</span>
            <span className="city-tag">Mysore PG</span>
            <span className="city-tag">Jaipur PG</span>
          </div>
        </section>

        {/* Our Values */}
        <section className="content-section">
          <h2>Our Core Values</h2>
          <div className="values-grid">
            <div className="value-item">
              <h3>Trust & Transparency</h3>
              <p>We believe in complete honesty. Every listing, every price, every detail is verified and displayed transparently.</p>
            </div>
            <div className="value-item">
              <h3>Quality Assurance</h3>
              <p>We maintain high standards for all PGs on our platform. Only verified, quality accommodations make it to our listings.</p>
            </div>
            <div className="value-item">
              <h3>Customer First</h3>
              <p>Your comfort and safety are our top priorities. We're committed to providing exceptional service at every step.</p>
            </div>
            <div className="value-item">
              <h3>Innovation</h3>
              <p>We continuously improve our platform with new features, better search capabilities, and enhanced user experience.</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-box">
          <h2>Ready to Find Your Perfect PG?</h2>
          <p>Join thousands of satisfied tenants who found their dream accommodation through GetYourStay.</p>
          <div className="cta-buttons">
            <Link to="/" className="cta-primary">Search PGs Now</Link>
            <Link to="/contact" className="cta-secondary">Contact Us</Link>
          </div>
        </section>

        {/* SEO Content */}
        <section className="seo-section">
          <h2>Find the Best PG Accommodation Near You</h2>
          <div className="seo-content">
            <p>
              GetYourStay is India's leading platform for finding paying guest accommodations. Whether you're a student looking for a <strong>PG near your college</strong> or a working professional seeking <strong>PG near your office</strong>, we've got you covered. Our platform offers the most comprehensive database of verified PGs with real photos, honest reviews, and transparent pricing.
            </p>
            <p>
              Looking for <strong>PG in Bangalore</strong>? We have hundreds of verified options across all major areas including Electronic City, HSR Layout, Koramangala, Whitefield, BTM Layout, Marathahalli, and more. Each listing includes detailed information about amenities like AC, WiFi, food, laundry, power backup, security, and parking.
            </p>
            <p>
              Our <strong>PG booking platform</strong> makes it easy to compare prices, read genuine tenant reviews, schedule visits, and complete your booking - all from the comfort of your home. With GetYourStay, finding your perfect paying guest accommodation has never been easier.
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
        .about-hero {
          text-align: center;
          padding: 60px 20px 40px;
          background: linear-gradient(135deg, ${theme.primary[900]} 0%, ${theme.primary[800]} 50%, ${theme.primary[700]} 100%);
          border-radius: 20px;
          margin: 30px 0;
        }
        .about-hero h1 {
          color: white;
          font-size: 42px;
          font-weight: 800;
          margin: 0 0 10px;
        }
        .about-hero .hero-subtitle {
          color: rgba(255,255,255,0.85);
          font-size: 18px;
          margin: 0;
        }
        .content-section {
          background: white;
          border-radius: 16px;
          padding: 40px;
          margin: 30px 0;
          box-shadow: 0 2px 15px rgba(0,0,0,0.04);
        }
        .content-section.bg-light {
          background: ${theme.neutral[50]};
        }
        .content-section h2 {
          color: ${theme.primary[800]};
          font-size: 28px;
          font-weight: 700;
          margin: 0 0 20px;
        }
        .content-section p {
          color: ${theme.neutral[600]};
          font-size: 16px;
          line-height: 1.8;
          margin: 0 0 15px;
        }
        .content-section .section-intro {
          font-size: 17px;
          color: ${theme.neutral[500]};
          margin-bottom: 25px;
        }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 25px;
          margin-top: 30px;
        }
        .feature-card {
          background: ${theme.neutral[50]};
          border-radius: 14px;
          padding: 25px;
          transition: all 0.3s;
        }
        .feature-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.08);
        }
        .feature-icon {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, ${theme.primary[700]}, ${theme.primary[800]});
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          color: white;
          margin-bottom: 15px;
        }
        .feature-card h3 {
          color: ${theme.primary[800]};
          font-size: 18px;
          font-weight: 700;
          margin: 0 0 10px;
        }
        .feature-card p {
          font-size: 14px;
          color: ${theme.neutral[600]};
          margin: 0;
          line-height: 1.7;
        }
        .stats-section {
          background: linear-gradient(135deg, ${theme.primary[800]}, ${theme.primary[700]});
          border-radius: 16px;
          padding: 40px;
          margin: 30px 0;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 30px;
          text-align: center;
        }
        .stat-item {
          display: flex;
          flex-direction: column;
        }
        .stat-number {
          font-size: 36px;
          font-weight: 800;
          color: white;
          margin-bottom: 5px;
        }
        .stat-label {
          font-size: 14px;
          color: rgba(255,255,255,0.8);
        }
        .audience-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 25px;
          margin-top: 25px;
        }
        .audience-item {
          background: ${theme.neutral[50]};
          border-radius: 14px;
          padding: 25px;
        }
        .audience-item h3 {
          color: ${theme.primary[800]};
          font-size: 18px;
          font-weight: 700;
          margin: 0 0 12px;
        }
        .audience-item p {
          font-size: 14px;
          line-height: 1.7;
          margin: 0;
        }
        .cities-list {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }
        .city-tag {
          padding: 10px 20px;
          background: white;
          border: 2px solid ${theme.primary[200]};
          border-radius: 25px;
          font-size: 14px;
          font-weight: 600;
          color: ${theme.primary[700]};
          transition: all 0.2s;
        }
        .city-tag:hover {
          background: ${theme.primary[700]};
          color: white;
          border-color: ${theme.primary[700]};
        }
        .values-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 25px;
          margin-top: 25px;
        }
        .value-item {
          display: flex;
          gap: 15px;
          padding: 20px;
          background: ${theme.neutral[50]};
          border-radius: 12px;
          border-left: 4px solid ${theme.accent[500]};
        }
        .value-item h3 {
          color: ${theme.primary[800]};
          font-size: 16px;
          font-weight: 700;
          margin: 0 0 8px;
        }
        .value-item p {
          font-size: 14px;
          color: ${theme.neutral[600]};
          margin: 0;
          line-height: 1.6;
        }
        .cta-box {
          background: linear-gradient(135deg, ${theme.accent[500]}, ${theme.accent[600]});
          border-radius: 16px;
          padding: 50px;
          text-align: center;
          margin: 30px 0;
        }
        .cta-box h2 {
          color: white;
          font-size: 28px;
          font-weight: 700;
          margin: 0 0 10px;
        }
        .cta-box p {
          color: rgba(255,255,255,0.9);
          font-size: 16px;
          margin: 0 0 25px;
        }
        .cta-buttons {
          display: flex;
          justify-content: center;
          gap: 15px;
        }
        .cta-primary {
          padding: 14px 30px;
          background: white;
          color: ${theme.accent[600]};
          border-radius: 10px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s;
        }
        .cta-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }
        .cta-secondary {
          padding: 14px 30px;
          background: transparent;
          color: white;
          border: 2px solid white;
          border-radius: 10px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s;
        }
        .cta-secondary:hover {
          background: rgba(255,255,255,0.1);
        }
        .seo-section {
          background: ${theme.neutral[100]};
          border-radius: 16px;
          padding: 40px;
          margin: 30px 0;
        }
        .seo-section h2 {
          color: ${theme.primary[800]};
          font-size: 24px;
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
        @media (max-width: 768px) {
          .about-hero h1 { font-size: 28px; }
          .content-section { padding: 25px; }
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .audience-grid { grid-template-columns: 1fr; }
          .values-grid { grid-template-columns: 1fr; }
          .cta-buttons { flex-direction: column; }
          .stat-number { font-size: 28px; }
        }
      `}</style>
    </div>
  );
};

export default AboutUs;
