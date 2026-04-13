import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { theme } from '../theme';

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
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <div style={{
        background: `linear-gradient(135deg, ${theme.primary[800]} 0%, ${theme.primary[500]} 100%)`,
        padding: '60px 20px 120px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(249,115,22,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.05) 0%, transparent 50%)`
        }} />
        
        <div style={{ position: 'relative', maxWidth: '900px', margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255,255,255,0.15)',
            border: '1px solid rgba(255,255,255,0.2)',
            padding: '8px 16px',
            borderRadius: '30px',
            marginBottom: '24px'
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
              <line x1="12" y1="18" x2="12.01" y2="18"/>
            </svg>
            <span style={{ color: 'white', fontWeight: '600', fontSize: '14px' }}>PG Management App</span>
          </div>
          
          <h1 style={{ 
            color: 'white', 
            fontSize: 'clamp(32px, 6vw, 52px)', 
            fontWeight: '800',
            marginBottom: '20px',
            lineHeight: '1.1'
          }}>
            Manage Your PG Business
            <br />
            <span style={{ color: theme.accent[500] }}>From Your Phone</span>
          </h1>
          
          <p style={{ 
            color: 'rgba(255,255,255,0.9)', 
            fontSize: '18px', 
            marginBottom: '32px',
            maxWidth: '600px',
            margin: '0 auto 32px'
          }}>
            Track rent payments, manage tenants, handle maintenance, view analytics - all in one powerful app designed for Indian PG owners.
          </p>
          
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            background: 'rgba(255,255,255,0.1)',
            padding: '12px 24px',
            borderRadius: '12px',
            marginBottom: '32px'
          }}>
            <div style={{ color: 'white' }}>
              <span style={{ fontSize: '32px', fontWeight: '800' }}>₹499</span>
              <span style={{ fontSize: '14px', opacity: 0.8 }}>/month</span>
            </div>
            <div style={{ width: '1px', height: '40px', background: 'rgba(255,255,255,0.3)' }} />
            <div style={{ color: 'white' }}>
              <span style={{ fontSize: '32px', fontWeight: '800' }}>₹3,999</span>
              <span style={{ fontSize: '14px', opacity: 0.8 }}>/year</span>
            </div>
            <div style={{
              background: theme.accent[500],
              padding: '4px 10px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: '600',
              color: 'white'
            }}>
              Save 33%
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
               onClick={() => window.location.href = "https://manageyourpg.com"}
              style={{
                padding: '16px 36px',
                background: 'white',
                color: theme.primary[800],
                border: 'none',
                borderRadius: '30px',
                fontSize: '16px',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: '0 8px 30px rgba(0,0,0,0.2)'
              }}
            >
              Start 7-Day Free Trial
            </button>
            <Link 
              to="/list-your-pg"
              style={{
                padding: '16px 36px',
                background: 'transparent',
                color: 'white',
                border: '2px solid rgba(255,255,255,0.4)',
                borderRadius: '30px',
                fontSize: '16px',
                fontWeight: '600',
                textDecoration: 'none'
              }}
            >
              List Your PG First
            </Link>
          </div>
          
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '32px',
            flexWrap: 'wrap',
            color: 'rgba(255,255,255,0.85)',
            fontSize: '14px',
            marginTop: '32px'
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20,6 9,17 4,12"/></svg>
              No Credit Card Required
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20,6 9,17 4,12"/></svg>
              Cancel Anytime
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20,6 9,17 4,12"/></svg>
              24/7 Support
            </span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
        <div style={{
          background: 'white',
          borderRadius: '24px',
          padding: '48px',
          marginTop: '-80px',
          boxShadow: '0 25px 80px rgba(10, 25, 41, 0.12)',
          position: 'relative'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ 
              color: theme.primary[800], 
              fontSize: '28px', 
              fontWeight: '700',
              marginBottom: '12px' 
            }}>
              Everything You Need to Manage Your PG
            </h2>
            <p style={{ color: '#64748b', fontSize: '16px' }}>
              Powerful features designed specifically for Indian PG owners
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            {features.map((feature, idx) => (
              <div
                key={idx}
                style={{
                  background: '#f8fafc',
                  borderRadius: '16px',
                  padding: '24px',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  gap: '16px'
                }}
              >
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: `linear-gradient(135deg, ${theme.primary[800]}15, ${theme.primary[500]}15)`,
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  color: theme.primary[800]
                }}>
                  {feature.icon}
                </div>
                <div>
                  <h3 style={{
                    color: theme.primary[800],
                    fontSize: '16px',
                    fontWeight: '700',
                    marginBottom: '6px'
                  }}>
                    {feature.title}
                  </h3>
                  <p style={{
                    color: '#64748b',
                    fontSize: '13px',
                    lineHeight: '1.5',
                    margin: 0
                  }}>
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{
        background: `linear-gradient(135deg, ${theme.primary[800]}, ${theme.primary[500]})`,
        padding: '80px 20px'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ 
            color: 'white', 
            fontSize: '28px', 
            textAlign: 'center',
            marginBottom: '48px',
            fontWeight: '700'
          }}>
            Results That Speak for Themselves
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '32px'
          }}>
            {benefits.map((benefit, idx) => (
              <div key={idx} style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '48px',
                  fontWeight: '800',
                  color: theme.accent[500],
                  marginBottom: '8px'
                }}>
                  {benefit.number}
                </div>
                <div style={{
                  color: 'white',
                  fontSize: '18px',
                  fontWeight: '700',
                  marginBottom: '8px'
                }}>
                  {benefit.label}
                </div>
                <div style={{
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '14px'
                }}>
                  {benefit.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '80px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ 
            color: theme.primary[800], 
            fontSize: '28px', 
            fontWeight: '700',
            marginBottom: '12px' 
          }}>
            Simple, Transparent Pricing
          </h2>
          <p style={{ color: '#64748b', fontSize: '16px' }}>
            Start free for 7 days. No hidden charges. Cancel anytime.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          maxWidth: '700px',
          margin: '0 auto'
        }}>
          {pricingPlans.map((plan, idx) => (
            <div
              key={idx}
              style={{
                background: plan.popular ? `linear-gradient(135deg, ${theme.primary[800]}, ${theme.primary[500]})` : 'white',
                borderRadius: '20px',
                padding: '32px',
                border: plan.popular ? 'none' : '1px solid #e2e8f0',
                boxShadow: plan.popular ? '0 20px 60px rgba(10, 25, 41, 0.2)' : '0 4px 20px rgba(0,0,0,0.06)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {plan.popular && (
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  right: '-30px',
                  background: theme.accent[500],
                  color: 'white',
                  padding: '6px 40px',
                  fontSize: '12px',
                  fontWeight: '700',
                  transform: 'rotate(45deg)'
                }}>
                  POPULAR
                </div>
              )}
              
              <div style={{
                fontSize: '18px',
                fontWeight: '700',
                color: plan.popular ? 'white' : theme.primary[800],
                marginBottom: '8px'
              }}>
                {plan.name}
              </div>
              
              <div style={{ marginBottom: '4px' }}>
                <span style={{
                  fontSize: '42px',
                  fontWeight: '800',
                  color: plan.popular ? 'white' : theme.primary[800]
                }}>
                  ₹{plan.price}
                </span>
              </div>
              <div style={{
                fontSize: '14px',
                color: plan.popular ? 'rgba(255,255,255,0.8)' : '#64748b',
                marginBottom: plan.subtext ? '16px' : '24px'
              }}>
                {plan.period}
                {plan.subtext && (
                  <span style={{
                    marginLeft: '8px',
                    padding: '2px 8px',
                    background: plan.popular ? 'rgba(255,255,255,0.2)' : '#dcfce7',
                    borderRadius: '4px',
                    color: plan.popular ? 'white' : '#16a34a',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    {plan.subtext}
                  </span>
                )}
              </div>
              
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px' }}>
                {plan.features.map((feature, i) => (
                  <li key={i} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '8px 0',
                    fontSize: '14px',
                    color: plan.popular ? 'rgba(255,255,255,0.9)' : '#374151',
                    borderBottom: `1px solid ${plan.popular ? 'rgba(255,255,255,0.1)' : '#f1f5f9'}`
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={plan.popular ? 'white' : '#16a34a'} strokeWidth="2">
                      <polyline points="20,6 9,17 4,12"/>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button 
                onClick={() =>window.location.href = "https://manageyourpg.com"}
                style={{
                  width: '100%',
                  padding: '14px',
                  background: plan.popular ? 'white' : theme.primary[800],
                  color: plan.popular ? theme.primary[800] : 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '15px',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                Start 7-Day Free Trial
              </button>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ 
            color: theme.primary[800], 
            fontSize: '28px', 
            fontWeight: '700',
            marginBottom: '12px' 
          }}>
            Loved by PG Owners Across India
          </h2>
          <p style={{ color: '#64748b', fontSize: '16px' }}>
            See what our users have to say
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              style={{
                background: 'white',
                borderRadius: '16px',
                padding: '28px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                border: '1px solid #e2e8f0'
              }}
            >
              <div style={{ display: 'flex', gap: '4px', marginBottom: '12px' }}>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} style={{ color: '#f59e0b', fontSize: '18px' }}>★</span>
                ))}
              </div>
              <p style={{
                color: '#374151',
                fontSize: '15px',
                lineHeight: '1.7',
                marginBottom: '20px'
              }}>
                "{testimonial.text}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${theme.primary[800]}, ${theme.primary[500]})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: '700',
                  fontSize: '18px'
                }}>
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div style={{
                    color: theme.primary[800],
                    fontWeight: '700',
                    fontSize: '15px'
                  }}>
                    {testimonial.name}
                  </div>
                  <div style={{
                    color: '#64748b',
                    fontSize: '13px'
                  }}>
                    {testimonial.pg} • {testimonial.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: '#f8fafc', padding: '80px 20px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ 
            color: theme.primary[800], 
            fontSize: '28px', 
            textAlign: 'center',
            marginBottom: '48px',
            fontWeight: '700'
          }}>
            Frequently Asked Questions
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                style={{
                  background: 'white',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: '1px solid #e2e8f0'
                }}
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  style={{
                    width: '100%',
                    padding: '20px 24px',
                    background: 'none',
                    border: 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <span style={{
                    color: theme.primary[800],
                    fontSize: '15px',
                    fontWeight: '600'
                  }}>
                    {faq.q}
                  </span>
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke={theme.primary[800]} 
                    strokeWidth="2"
                    style={{ transform: activeFaq === idx ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}
                  >
                    <polyline points="6,9 12,15 18,9"/>
                  </svg>
                </button>
                {activeFaq === idx && (
                  <div style={{
                    padding: '0 24px 20px',
                    color: '#64748b',
                    fontSize: '14px',
                    lineHeight: '1.6'
                  }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{
        background: `linear-gradient(135deg, ${theme.primary[800]}, ${theme.primary[500]})`,
        padding: '80px 20px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ 
            color: 'white', 
            fontSize: '28px',
            marginBottom: '16px',
            fontWeight: '700'
          }}>
            Ready to Streamline Your PG Business?
          </h2>
          <p style={{ 
            color: 'rgba(255,255,255,0.9)', 
            fontSize: '16px',
            marginBottom: '32px'
          }}>
            Start your 7-day free trial today. No credit card required.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              onClick={() => setShowNotifyModal(true)}
              style={{
                padding: '16px 36px',
                background: 'white',
                color: theme.primary[800],
                border: 'none',
                borderRadius: '30px',
                fontSize: '16px',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              Start Free Trial
            </button>
            <Link 
              to="/list-your-pg"
              style={{
                padding: '16px 36px',
                background: 'transparent',
                color: 'white',
                border: '2px solid white',
                borderRadius: '30px',
                fontSize: '16px',
                fontWeight: '600',
                textDecoration: 'none'
              }}
            >
              List Your PG
            </Link>
          </div>
        </div>
      </div>

      {showNotifyModal && (
        <div 
          style={{
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
            padding: '20px'
          }}
          onClick={() => setShowNotifyModal(false)}
        >
          <div 
            style={{
              background: 'white',
              borderRadius: '24px',
              padding: '40px',
              maxWidth: '440px',
              width: '100%',
              textAlign: 'center'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {submitted ? (
              <>
                <div style={{
                  width: '64px',
                  height: '64px',
                  background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px'
                }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2">
                    <polyline points="20,6 9,17 4,12" />
                  </svg>
                </div>
                <h3 style={{ color: theme.primary[800], marginBottom: '10px', fontSize: '22px', fontWeight: '700' }}>
                  You're on the list!
                </h3>
                <p style={{ color: '#64748b', fontSize: '14px' }}>
                  We'll notify you as soon as the app is available for download.
                </p>
              </>
            ) : (
              <>
                <div style={{
                  width: '64px',
                  height: '64px',
                  background: `linear-gradient(135deg, ${theme.primary[800]}15, ${theme.primary[500]}15)`,
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  color: theme.primary[800]
                }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                    <line x1="12" y1="18" x2="12.01" y2="18"/>
                  </svg>
                </div>
                <h3 style={{ color: theme.primary[800], marginBottom: '10px', fontSize: '22px', fontWeight: '700' }}>
                  Start Your 7-Day Free Trial
                </h3>
                <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px' }}>
                  Get full access to all features. No credit card required.
                </p>
                <form onSubmit={handleNotifySubmit}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      border: '2px solid #e2e8f0',
                      borderRadius: '12px',
                      fontSize: '15px',
                      marginBottom: '16px',
                      boxSizing: 'border-box'
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      width: '100%',
                      padding: '14px',
                      background: theme.accent[500],
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      fontSize: '15px',
                      fontWeight: '700',
                      cursor: 'pointer'
                    }}
                  >
                    Start Free Trial
                  </button>
                </form>
                <p style={{ color: '#94a3b8', fontSize: '12px', marginTop: '16px' }}>
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
