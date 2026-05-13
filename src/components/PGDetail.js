import React, { useState, useEffect } from 'react';
import './PGDetail.css';

const PGDetail = ({ pg, onClose, onEnquire }) => {
  console.log("PG detail : ", pg);


  const [currentImage, setCurrentImage] = useState(0);
  const [showEnquireForm, setShowEnquireForm] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    moveInDate: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const isVerified = pg.isVerified !== false;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const getGenderColor = (gender) => {
    switch (gender) {
      case 'Male': return '#3b82f6';
      case 'Female': return '#ec4899';
      default: return '#8b5cf6';
    }
  };

  const getAmenityIcon = (amenity) => {
    const icons = {
      'WiFi': '📶',
      'AC': '❄️',
      'Food': '🍽️',
      'Laundry': '👕',
      'Parking': '🅿️',
      'Gym': '💪',
      'Pool': '🏊',
      'Security': '🔒',
      'TV Room': '📺',
      'Housekeeping': '🧹',
      'Power Backup': '⚡',
      'Garden': '🌳',
      'Spa': '💆',
      'Concierge': '🛎️',
      'Washing Machine': '🧺',
      'Generator': '🔋',
      'Lift': '🛗',

      'wifi': '📶',
      'ac': '❄️',
      'food': '🍽️',
      'laundry': '👕',
      'parking': '🅿️',
      'washing_machine': '🧺',
      'generator': '🔋',
      'lift': '🛗'
    };
    return icons[amenity] || '✓';
  };



  const longTermRent = pg.longTermRent || { single: 0, double: 0, triple: 0 };
  const shortTermRent = pg.shortTermRent || { single: 0, double: 0, triple: 0 };
  const rentalType = pg.rentalType || 'long_term';



  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowEnquireForm(false);
      setFormData({ name: '', phone: '', email: '', moveInDate: '', message: '' });
    }, 3000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="pg-detail-overlay" onClick={onClose}>
      <div className="pg-detail-modal" onClick={e => e.stopPropagation()}>
        {/* Unverified Overlay */}
        {!isVerified && (
          <div className="unverified-overlay">
            <div className="unverified-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <h2 className="unverified-title">Not Verified Property</h2>
            <p className="unverified-desc">
              This PG listing has not been verified by our team. Only basic information is shown below.
            </p>
            {pg.images && pg.images.length > 0 && (
              <div style={{ marginTop: '25px', borderRadius: '12px', overflow: 'hidden', width: '100%', maxWidth: '300px' }}>
                <img src={pg.images[0]} alt={pg.name} className="w-full" style={{ height: '180px', objectFit: 'cover' }} />
              </div>
            )}
            <h3 className="text-primary" style={{ marginTop: '20px', fontSize: '18px', fontWeight: '700' }}>
              {pg.name}
            </h3>
            <div className="flex gap-8" style={{ alignItems: 'center', color: '#64748b', fontSize: '13px', marginTop: '8px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {pg.area}, {pg.city}
            </div>
          </div>
        )}

        {/* Header with Close Button */}
        <div className="pg-detail-header-close">
          <button onClick={onClose} className="pg-detail-close-btn">×</button>
        </div>

        {/* Image Gallery */}
        <div className="pg-detail-gallery" style={{ filter: isVerified ? 'none' : 'blur(8px)' }}>
          <img src={pg.images[currentImage]} alt={pg.name} className="pg-detail-gallery-img" onClick={() => setLightboxOpen(true)} style={{ cursor: 'zoom-in' }} />

          {/* Image Navigation */}
          <div className="pg-detail-dots">
            {pg.images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImage(idx)}
                className="pg-detail-dot"
                style={{ background: currentImage === idx ? 'white' : 'rgba(255,255,255,0.5)' }}
              />
            ))}
          </div>

          {/* Image Navigation Arrows */}
          <button
            onClick={() => setCurrentImage(prev => prev === 0 ? pg.images.length - 1 : prev - 1)}
            className="pg-detail-nav-btn"
            style={{ left: '10px' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2">
              <polyline points="15,18 9,12 15,6"></polyline>
            </svg>
          </button>
          <button
            onClick={() => setCurrentImage(prev => prev === pg.images.length - 1 ? 0 : prev + 1)}
            className="pg-detail-nav-btn"
            style={{ right: '10px' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2">
              <polyline points="9,18 15,12 9,6"></polyline>
            </svg>
          </button>

          {/* Gender Badge */}
          <div className="pg-detail-gender-badge" style={{ background: getGenderColor(pg.gender) }}>
            {pg.gender} PG
          </div>
        </div>

        {/* Lightbox */}
        {lightboxOpen && (
          <div className="pg-detail-lightbox" onClick={() => setLightboxOpen(false)}>
            <button className="pg-detail-lightbox-close" onClick={() => setLightboxOpen(false)}>×</button>
            <div className="pg-detail-lightbox-content" onClick={e => e.stopPropagation()}>
              <img src={pg.images[currentImage]} alt={pg.name} className="pg-detail-lightbox-img" />
            </div>
            <button
              className="pg-detail-lightbox-nav pg-detail-lightbox-prev"
              onClick={e => { e.stopPropagation(); setCurrentImage(prev => prev === 0 ? pg.images.length - 1 : prev - 1); }}
            >
              ‹
            </button>
            <button
              className="pg-detail-lightbox-nav pg-detail-lightbox-next"
              onClick={e => { e.stopPropagation(); setCurrentImage(prev => prev === pg.images.length - 1 ? 0 : prev + 1); }}
            >
              ›
            </button>
          </div>
        )}

        {/* Content */}
        <div className="pg-detail-body">
          {/* Title and Price Row */}
          <div className="flex flex-wrap gap-10" style={{ justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
            <div className="flex-1">
              <h2 className="text-primary" style={{ margin: '0 0 6px', fontSize: '20px', fontWeight: '700' }}>
                {pg.name}
              </h2>
              <div className="flex gap-8" style={{ alignItems: 'center', color: '#64748b', fontSize: '12px' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>{pg.area}, Bangalore</span>
              </div>
            </div>

            <div className="pg-detail-price-block">
              <div className="flex gap-8" style={{ alignItems: 'center', justifyContent: 'flex-end', marginBottom: '4px' }}>
                <span style={{ color: '#f59e0b', fontSize: '14px' }}>★</span>
                <span style={{ fontSize: '16px', fontWeight: '700', color: 'var(--primary-800)' }}>{pg.rating}</span>
                <span style={{ color: '#999', fontSize: '11px' }}>({pg.reviews})</span>
              </div>
              {(rentalType === 'long_term' || rentalType === 'both') && (
                <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '2px' }}>
                  <span style={{ fontSize: '10px', fontWeight: '500' }}>Monthly</span>
                </div>
              )}
              {(rentalType === 'long_term' || rentalType === 'both') && (
                <div className="pg-detail-price-value">
                  ₹{(longTermRent.triple || pg.price || 0).toLocaleString()}
                  <span className="pg-detail-price-unit">/mo</span>
                </div>
              )}
              {(rentalType === 'short_term' || rentalType === 'both') && (
                <div style={{ marginTop: '4px' }}>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>
                    <span style={{ fontSize: '9px', fontWeight: '500' }}>Daily</span>
                  </div>
                  <div className="pg-detail-price-small">
                    ₹{(shortTermRent.triple || 0).toLocaleString()}
                    <span className="pg-detail-price-unit">/day</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Rental Type Badge */}
          <div className="pg-detail-rental-badges">
            {(rentalType === 'long_term' || rentalType === 'both') && (
              <div className="pg-detail-rental-tag" style={{ background: '#e0e7ff', color: '#4338ca' }}>
                📅 Monthly Stay
              </div>
            )}
            {(rentalType === 'short_term' || rentalType === 'both') && (
              <div className="pg-detail-rental-tag" style={{ background: '#dcfce7', color: '#15803d' }}>
                🌙 Daily Stay
              </div>
            )}
          </div>

          {/* Availability Banner */}
          {pg.isAvailable ? (
            <div className={`pg-detail-availability pg-detail-available`}>
              <span style={{ fontSize: '16px' }}>✅</span>
              <span className="pg-detail-avail-text" style={{ color: '#166534' }}>Available for booking</span>
            </div>
          ) : (
            <div className={`pg-detail-availability pg-detail-unavailable`}>
              <span style={{ fontSize: '16px' }}>⏳</span>
              <span className="pg-detail-avail-text" style={{ color: '#92400e' }}>Currently not available</span>
            </div>
          )}

          {/* Description */}
          <div style={{ marginBottom: '18px' }}>
            <h3 className="pg-detail-section-title">About this PG</h3>
            <p className="pg-detail-description">{pg.description}</p>
          </div>

          {/* Amenities */}
          <div style={{ marginBottom: '18px' }}>
            <h3 className="pg-detail-section-title">Amenities & Facilities</h3>
            <div className="pg-detail-amenities-grid">
              {pg.amenities.map((amenity, idx) => (
                <div className="pg-detail-amenity-item" key={idx}>
                  <span className="pg-detail-amenity-icon">{getAmenityIcon(amenity)}</span>
                  <span className="pg-detail-amenity-name">{amenity.replace(/_/g, ' ')
                    .replace(/\b\w/g, char => char.toUpperCase())}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Full Pricing Breakdown */}
          <div style={{ marginBottom: '18px' }}>
            <h3 className="pg-detail-section-title" style={{ fontSize: '14px', marginBottom: '12px' }}>
              Pricing Details
            </h3>

            {/* Monthly Pricing */}
            {(rentalType === 'long_term' || rentalType === 'both') && (
              <div className="pg-detail-pricing-section">
                <div className="flex gap-8" style={{ alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ fontSize: '14px' }}>📅</span>
                  <span style={{ fontSize: '12px', fontWeight: '600', color: '#4338ca' }}>Monthly Rent</span>
                </div>
                <div className="pg-detail-pricing-grid">
                  {[{ label: 'Single', value: longTermRent.single }, { label: 'Double', value: longTermRent.double }, { label: 'Triple', value: longTermRent.triple }].map((item, i) => (
                    <div className="pg-detail-pricing-cell" key={i}>
                      <div className="pg-detail-pricing-cell-label">{item.label}</div>
                      <div className="pg-detail-pricing-cell-value">₹{(item.value || 0).toLocaleString()}</div>
                      <div className="pg-detail-pricing-cell-period">/month</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Daily Pricing */}
            {(rentalType === 'short_term' || rentalType === 'both') && (
              <div className="pg-detail-pricing-section" style={{ background: '#f0fdf4' }}>
                <div className="flex gap-8" style={{ alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ fontSize: '14px' }}>🌙</span>
                  <span style={{ fontSize: '12px', fontWeight: '600', color: '#15803d' }}>Daily Rent</span>
                </div>
                <div className="pg-detail-pricing-grid">
                  {[{ label: 'Single', value: shortTermRent.single }, { label: 'Double', value: shortTermRent.double }, { label: 'Triple', value: shortTermRent.triple }].map((item, i) => (
                    <div className="pg-detail-pricing-cell" key={i}>
                      <div className="pg-detail-pricing-cell-label">{item.label}</div>
                      <div className="pg-detail-pricing-cell-value" style={{ color: '#16a34a' }}>₹{(item.value || 0).toLocaleString()}</div>
                      <div className="pg-detail-pricing-cell-period">/day</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Fixed Bottom CTA */}
        <div className="pg-detail-cta">
          <div className="pg-detail-cta-buttons">
            <a
              href={`tel:${pg.phone || pg.ownerPhone || '+919876543210'}`}
              className="pg-detail-call-btn"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
              </svg>
              Call Now
            </a>
            <a
              href={`https://checkin.getyourstay.in/?owner_id=${pg.ownerId}&pg_id=${pg.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="pg-detail-checkin-btn"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12h18M12 3l9 9-9 9" />
              </svg>
              Check-in
            </a>
          </div>
        </div>

        {/* Enquiry Form Modal */}
        {showEnquireForm && (
          <div className="enquiry-overlay" onClick={() => setShowEnquireForm(false)}>
            <div className="enquiry-modal" onClick={e => e.stopPropagation()}>
              {submitted ? (
                <div className="text-center" style={{ padding: '25px 0' }}>
                  <div className="enquiry-success-icon">
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2">
                      <polyline points="20,6 9,17 4,12" />
                    </svg>
                  </div>
                  <h3 className="enquiry-success-title">Enquiry Sent!</h3>
                  <p className="enquiry-success-msg">We'll contact you within 24 hours</p>
                </div>
              ) : (
                <>
                  <h3 className="enquiry-title">Enquire about {pg.name}</h3>
                  <p className="enquiry-subtitle">Fill in your details and we'll get back to you shortly</p>

                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label className="form-label">Full Name *</label>
                      <input type="text" name="name" value={formData.name} onChange={handleInputChange} required placeholder="Enter your name" className="input-field input-field-sm" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone Number *</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required placeholder="Enter 10-digit phone number" className="input-field input-field-sm" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email Address</label>
                      <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Enter your email" className="input-field input-field-sm" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Preferred Move-in Date</label>
                      <input type="date" name="moveInDate" value={formData.moveInDate} onChange={handleInputChange} className="input-field input-field-sm" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Message (Optional)</label>
                      <textarea name="message" value={formData.message} onChange={handleInputChange} placeholder="Any specific requirements?" rows={3} className="input-field input-field-sm" style={{ resize: 'vertical' }} />
                    </div>
                    <button type="submit" className="enquiry-submit-btn">Submit Enquiry</button>
                  </form>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PGDetail;
