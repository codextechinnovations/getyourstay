import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { theme } from '../theme';
import './PGManagementApp.css';

const PGManagementApp = () => {
  const [showNotifyModal, setShowNotifyModal] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  useEffect(() => {
    document.title = 'PG Owner App | Free PG Management Software for Android | GetYourStay';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    
    if (metaDescription) metaDescription.content = 'Download free PG owner app - best PG management software for Android. Track rent payments, manage tenants, handle maintenance requests. Just Rs. 499/month with 7-day free trial. Perfect for paying guest accommodation management in India.';
    if (metaKeywords) metaKeywords.content = 'PG owner app, PG management app, PG management software, paying guest app, tenant management app, rent collection app, PG app Android, PG owner software, paying guest management system, PG app download free India';
    if (ogTitle) ogTitle.content = 'Free PG Owner App - Best PG Management Software | GetYourStay';
    if (ogDescription) ogDescription.content = 'Download the best free PG management app for PG owners in India. Track rent, manage tenants, handle maintenance. Rs. 499/month with 7-day free trial.';
    
    return () => {
      document.title = 'GetYourStay - PG Accommodation in India';
    };
  }, []);

  const features = [
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="1" x2="12" y2="23"/>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
      ),
      title: 'Rent Collection & Tracking',
      description: 'Track all rent payments with automated reminders. View payment history, pending dues, and generate receipts instantly.'
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
      title: 'Tenant Management',
      description: 'Manage tenant profiles, room allocations, check-in/check-out dates, and document verification all in one place.'
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
        </svg>
      ),
      title: 'Maintenance Tracker',
      description: 'Log and track maintenance requests. Set priorities, assign tasks, and keep tenants informed about repair status.'
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="20" x2="18" y2="10"/>
          <line x1="12" y1="20" x2="12" y2="4"/>
          <line x1="6" y1="20" x2="6" y2="14"/>
        </svg>
      ),
      title: 'Financial Analytics',
      description: 'View income reports, expense tracking, occupancy rates, and profit/loss statements with beautiful charts.'
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      ),
      title: 'WhatsApp Integration',
      description: 'Send automated rent reminders, announcements, and notices directly to tenants via WhatsApp.'
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
        </svg>
      ),
      title: 'Notice Board',
      description: 'Share important notices, rules, and updates with all tenants instantly through the app.'
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
          <circle cx="8.5" cy="8.5" r="1.5"/>
          <polyline points="21 15 16 10 5 21"/>
        </svg>
      ),
      title: 'Document Vault',
      description: 'Securely store tenant documents like ID proof, agreement copies, and emergency contacts.'
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      ),
      title: 'Room Management',
      description: 'Track room availability, manage sharing arrangements, and optimize occupancy across all properties.'
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
          <line x1="1" y1="10" x2="23" y2="10"/>
        </svg>
      ),
      title: 'Expense Tracking',
      description: 'Log and categorize all PG expenses including groceries, utilities, repairs, and staff salaries.'
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
        </svg>
      ),
      title: 'Smart Notifications',
      description: 'Get notified about pending payments, maintenance deadlines, lease expiries, and important updates.'
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
          <polyline points="10 9 9 9 8 9"/>
        </svg>
      ),
      title: 'Generate Reports',
      description: 'Create monthly reports, annual summaries, and tax documents with one click.'
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
        </svg>
      ),
      title: 'Cloud Sync',
      description: 'All your data is securely stored in the cloud. Access from any device, anytime, anywhere.'
    }
  ];

  const pricingPlans = [
    {
      name: 'Monthly',
      price: '499',
      period: 'per month',
      features: ['All Features', 'Unlimited Tenants', 'WhatsApp Integration', 'Analytics Dashboard', 'Cloud Sync', '24/7 Support'],
      popular: false
    },
    {
      name: 'Yearly',
      price: '3,999',
      period: 'per year',
      subtext: 'Save 33%',
      features: ['Everything in Monthly', '2 Months FREE', 'Priority Support', 'Custom Reports', 'API Access', 'Dedicated Account Manager'],
      popular: true
    }
  ];

  const benefits = [
    { number: '50%', label: 'Time Saved', desc: 'Automated tasks save 50% of your daily management time' },
    { number: '95%', label: 'Payment Recovery', desc: 'Automated reminders recover 95% of delayed rent payments' },
    { number: '30%', label: 'More Revenue', desc: 'Better occupancy management increases revenue by 30%' },
    { number: '4.9★', label: 'User Rating', desc: 'Rated 4.9 stars by 2,500+ PG owners across India' }
  ];

  const testimonials = [
    {
      name: 'Ramesh Kumar',
      location: 'Koramangala, Bangalore',
      text: 'Before GetYourStay App, I used to spend 3 hours daily managing rent collection. Now it takes just 20 minutes!',
      rating: 5,
      pg: 'Ramesh PG Stays'
    },
    {
      name: 'Priya Sharma',
      location: 'Whitefield, Bangalore',
      text: 'The WhatsApp integration is a game-changer. My tenants love getting rent reminders on WhatsApp.',
      rating: 5,
      pg: 'Sunrise Ladies PG'
    },
    {
      name: 'Mohammed Arif',
      location: 'Electronic City, Bangalore',
      text: 'I manage 3 PGs with 120 rooms. This app has made my life so much easier. Highly recommended!',
      rating: 5,
      pg: 'TechPark PG Services'
    }
  ];

  const faqs = [
    { q: 'Is there a free trial?', a: 'Yes! We offer a 7-day free trial with no credit card required. Experience all features before you decide to subscribe.' },
    { q: 'Can I manage multiple PG properties?', a: 'Absolutely! The app supports managing multiple properties. You can switch between properties and view consolidated reports across all your PGs.' },
    { q: 'Is my data secure?', a: 'Security is our top priority. All data is encrypted and stored on secure cloud servers. We follow industry best practices and comply with data protection regulations.' },
    { q: 'Do tenants need to install the app?', a: 'No, tenants do not need to install any app. They receive updates via WhatsApp and can view notices through a simple web link you share with them.' },
    { q: 'What is the cancellation policy?', a: 'You can cancel your subscription anytime from the app settings. Your data remains accessible for 6 months after cancellation.' },
    { q: 'Is training provided for using the app?', a: 'Yes! We provide free video tutorials and a comprehensive help center. You can also schedule a one-on-one demo with our team.' }
  ];

  const handleNotifySubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => {
        setShowNotifyModal(false);
        setSubmitted(false);
        setEmail('');
      }, 2000);
    }
  };

  return (
    <div className="pghome-page">
      <div className="pghome-hero">
        <div className="pghome-hero-bg" />
        
        <div className="pghome-hero-inner">
          <div className="pghome-badge">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
              <line x1="12" y1="18" x2="12.01" y2="18"/>
            </svg>
            <span className="pghome-badge-text">PG Management App</span>
          </div>
          
          <h1 className="pghome-hero-title">
            Manage Your PG Business
            <br />
            <span className="pghome-hero-title-accent">From Your Phone</span>
          </h1>
          
          <p className="pghome-hero-subtitle">
            Track rent payments, manage tenants, handle maintenance, view analytics - all in one powerful app designed for Indian PG owners.
          </p>
          
          <div className="pghome-price-display">
            <div>
              <span className="pghome-price-amount">₹499</span>
              <span className="pghome-price-period">/month</span>
            </div>
            <div className="pghome-price-divider" />
            <div>
              <span className="pghome-price-amount">₹3,999</span>
              <span className="pghome-price-period">/year</span>
            </div>
            <div className="pghome-savings-badge">
              Save 33%
            </div>
          </div>
          
          <div className="pghome-cta-row">
            <button 
               onClick={() => window.location.href = "https://manageyourpg.com"}
              className="pghome-cta-primary"
            >
              Start 7-Day Free Trial
            </button>
            <Link 
              to="/list-your-pg"
              className="pghome-cta-secondary"
            >
              List Your PG First
            </Link>
          </div>
          
          <div className="pghome-hero-features">
            <span className="pghome-hero-feature">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20,6 9,17 4,12"/></svg>
              No Credit Card Required
            </span>
            <span className="pghome-hero-feature">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20,6 9,17 4,12"/></svg>
              Cancel Anytime
            </span>
            <span className="pghome-hero-feature">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20,6 9,17 4,12"/></svg>
              24/7 Support
            </span>
          </div>
        </div>
      </div>

      <div className="pghome-features-card">
        <div className="pghome-features-card-inner">
          <div className="pghome-section-header">
            <h2 className="pghome-section-title">
              Everything You Need to Manage Your PG
            </h2>
            <p className="pghome-section-subtitle">
              Powerful features designed specifically for Indian PG owners
            </p>
          </div>

          <div className="pghome-features-grid">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="pghome-feature-card"
              >
                <div className="pghome-feature-icon">
                  {feature.icon}
                </div>
                <div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pghome-benefits-section">
        <div className="pghome-benefits-inner">
          <h2 className="pghome-benefits-title">
            Results That Speak for Themselves
          </h2>
          
          <div className="pghome-benefits-grid">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="pghome-benefit-item">
                <div className="pghome-benefit-number">
                  {benefit.number}
                </div>
                <div className="pghome-benefit-label">
                  {benefit.label}
                </div>
                <div className="pghome-benefit-desc">
                  {benefit.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pghome-pricing-wrapper">
        <div className="pghome-section-header">
          <h2 className="pghome-section-title">
            Simple, Transparent Pricing
          </h2>
          <p className="pghome-section-subtitle">
            Start free for 7 days. No hidden charges. Cancel anytime.
          </p>
        </div>

        <div className="pghome-pricing-grid">
          {pricingPlans.map((plan, idx) => (
            <div
              key={idx}
              className={`${plan.popular ? 'pghome-pricing-card-popular' : 'pghome-pricing-card'}`}
            >
              {plan.popular && (
                <div className="pghome-pricing-popular-badge">
                  POPULAR
                </div>
              )}
              
              <div className={`pghome-pricing-name ${plan.popular ? 'pghome-pricing-name-light' : 'pghome-pricing-name-dark'}`}>
                {plan.name}
              </div>
              
              <div className="pghome-pricing-price-row">
                <span className={`pghome-pricing-price ${plan.popular ? 'pghome-pricing-price-light' : 'pghome-pricing-price-dark'}`}>
                  ₹{plan.price}
                </span>
              </div>
              <div className={`pghome-pricing-period ${plan.popular ? 'pghome-pricing-period-light' : 'pghome-pricing-period-dark'}`} style={{ marginBottom: plan.subtext ? '16px' : '24px' }}>
                {plan.period}
                {plan.subtext && (
                  <span className={`pghome-pricing-subtext-badge ${plan.popular ? 'pghome-pricing-subtext-badge-light' : 'pghome-pricing-subtext-badge-dark'}`}>
                    {plan.subtext}
                  </span>
                )}
              </div>
              
              <ul className="pghome-pricing-features-list">
                {plan.features.map((feature, i) => (
                  <li key={i} className={`pghome-pricing-feature ${plan.popular ? 'pghome-pricing-feature-light' : 'pghome-pricing-feature-dark'}`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={plan.popular ? 'white' : '#16a34a'} strokeWidth="2">
                      <polyline points="20,6 9,17 4,12"/>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button 
                onClick={() =>window.location.href = "https://manageyourpg.com"}
                className={`pghome-pricing-btn ${plan.popular ? 'pghome-pricing-btn-popular' : 'pghome-pricing-btn-default'}`}
              >
                Start 7-Day Free Trial
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="pghome-testimonials">
        <div className="pghome-section-header">
          <h2 className="pghome-section-title">
            Loved by PG Owners Across India
          </h2>
          <p className="pghome-section-subtitle">
            See what our users have to say
          </p>
        </div>

        <div className="pghome-testimonials-list">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="pghome-testimonial-card"
            >
              <div className="pghome-testimonial-stars">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <p className="pghome-testimonial-text">
                "{testimonial.text}"
              </p>
              <div className="pghome-testimonial-author">
                <div className="pghome-testimonial-avatar">
                  {testimonial.name.charAt(0)}
                </div>
                <div className="pghome-testimonial-info">
                  <div className="pghome-testimonial-name">
                    {testimonial.name}
                  </div>
                  <div className="pghome-testimonial-location">
                    {testimonial.pg} • {testimonial.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pghome-faq-wrapper">
        <div className="pghome-faq-inner">
          <h2 className="pghome-faq-title">
            Frequently Asked Questions
          </h2>

          <div className="pghome-faq-list">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="app-faq-item"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="app-faq-question"
                >
                  <span className="app-faq-question-text">
                    {faq.q}
                  </span>
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke={theme.primary[800]} 
                    strokeWidth="2"
                    className={`app-faq-arrow ${activeFaq === idx ? 'open' : ''}`}
                  >
                    <polyline points="6,9 12,15 18,9"/>
                  </svg>
                </button>
                {activeFaq === idx && (
                  <div className="app-faq-answer">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="app-cta-section">
        <div className="app-cta-inner">
          <h2 className="app-cta-title">
            Ready to Streamline Your PG Business?
          </h2>
          <p className="app-cta-desc">
            Start your 7-day free trial today. No credit card required.
          </p>
          <div className="app-cta-actions">
            <button 
              onClick={() => setShowNotifyModal(true)}
              className="app-cta-btn"
            >
              Start Free Trial
            </button>
            <Link 
              to="/list-your-pg"
              className="app-cta-btn-outline"
            >
              List Your PG
            </Link>
          </div>
        </div>
      </div>

      {showNotifyModal && (
        <div 
          className="pghome-modal-overlay"
          onClick={() => setShowNotifyModal(false)}
        >
          <div 
            className="pghome-modal"
            onClick={(e) => e.stopPropagation()}
          >
            {submitted ? (
              <>
                <div className="pghome-modal-success-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2">
                    <polyline points="20,6 9,17 4,12" />
                  </svg>
                </div>
                <h3 className="pghome-modal-title">
                  You're on the list!
                </h3>
                <p className="pghome-modal-desc">
                  We'll notify you as soon as the app is available for download.
                </p>
              </>
            ) : (
              <>
                <div className="pghome-modal-icon-box">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                    <line x1="12" y1="18" x2="12.01" y2="18"/>
                  </svg>
                </div>
                <h3 className="pghome-modal-title">
                  Start Your 7-Day Free Trial
                </h3>
                <p className="pghome-modal-desc pghome-modal-desc-mb">
                  Get full access to all features. No credit card required.
                </p>
                <form className="pghome-modal-form" onSubmit={handleNotifySubmit}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="pghome-modal-input"
                  />
                  <button
                    type="submit"
                    className="pghome-modal-submit"
                  >
                    Start Free Trial
                  </button>
                </form>
                <p className="pghome-modal-disclaimer">
                  By signing up, you agree to our Terms and Privacy Policy.
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PGManagementApp;
