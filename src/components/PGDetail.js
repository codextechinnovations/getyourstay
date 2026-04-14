import React, { useState, useEffect } from 'react';

const PRIMARY_GRADIENT = ["#1a1a4e", "#2d2d7e", "#1e3a8a"];

const PGDetail = ({ pg, onClose, onEnquire }) => {
  console.log("PG detail : ", pg);
  
  
  const [currentImage, setCurrentImage] = useState(0);
  const [showEnquireForm, setShowEnquireForm] = useState(false);
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
      'wifi': '📶',
      'ac': '❄️',
      'food': '🍽️',
      'laundry': '👕',
      'parking': '🅿️'
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
    <div
      className="pg-detail-overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        zIndex: 3000,
        padding: '0'
      }}
      onClick={onClose}
    >
      <div
        className="pg-detail-modal"
        style={{
          background: 'white',
          borderRadius: '24px 24px 0 0',
          maxWidth: '900px',
          width: '100%',
          maxHeight: '95vh',
          overflow: 'hidden',
          boxShadow: '0 -10px 40px rgba(0,0,0,0.3)',
          animation: 'slideUp 0.3s ease',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Unverified Overlay */}
        {!isVerified && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(255,255,255,0.95)',
            zIndex: 100,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 20px',
            textAlign: 'center'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: '#fee2e2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px'
            }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <h2 style={{
              fontSize: '22px',
              fontWeight: '700',
              color: '#dc2626',
              marginBottom: '10px'
            }}>
              Not Verified Property
            </h2>
            <p style={{
              fontSize: '14px',
              color: '#64748b',
              maxWidth: '300px',
              lineHeight: '1.6'
            }}>
              This PG listing has not been verified by our team. Only basic information is shown below.
            </p>
            {pg.images && pg.images.length > 0 && (
              <div style={{
                marginTop: '25px',
                borderRadius: '12px',
                overflow: 'hidden',
                width: '100%',
                maxWidth: '300px'
              }}>
                <img
                  src={pg.images[0]}
                  alt={pg.name}
                  style={{
                    width: '100%',
                    height: '180px',
                    objectFit: 'cover'
                  }}
                />
              </div>
            )}
            <h3 style={{
              marginTop: '20px',
              fontSize: '18px',
              fontWeight: '700',
              color: '#0D1117'
            }}>
              {pg.name}
            </h3>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: '#64748b',
              fontSize: '13px',
              marginTop: '8px'
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {pg.area}, {pg.city}
            </div>
          </div>
        )}

        {/* Header with Close Button */}
        <div style={{
          position: 'absolute',
          top: '15px',
          right: '15px',
          zIndex: 10,
          display: 'flex',
          gap: '8px'
        }}>
          <button
            onClick={onClose}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.95)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              color: '#333',
              boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
            }}
          >
            ×
          </button>
        </div>

        {/* Image Gallery */}
        <div style={{
          position: 'relative',
          height: '220px',
          flexShrink: 0,
          filter: isVerified ? 'none' : 'blur(8px)'
        }}>
          <img
            src={pg.images[currentImage]}
            alt={pg.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain'
            }}
          />

          {/* Image Navigation */}
          <div style={{
            position: 'absolute',
            bottom: '15px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '6px',
            background: 'rgba(0,0,0,0.5)',
            padding: '6px 12px',
            borderRadius: '20px'
          }}>
            {pg.images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImage(idx)}
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: currentImage === idx ? 'white' : 'rgba(255,255,255,0.5)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              />
            ))}
          </div>

          {/* Image Navigation Arrows - Hidden on Mobile */}
          <button
            className="detail-nav-btn"
            onClick={() => setCurrentImage(prev => prev === 0 ? pg.images.length - 1 : prev - 1)}
            style={{
              position: 'absolute',
              left: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.9)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2">
              <polyline points="15,18 9,12 15,6"></polyline>
            </svg>
          </button>
          <button
            className="detail-nav-btn"
            onClick={() => setCurrentImage(prev => prev === pg.images.length - 1 ? 0 : prev + 1)}
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.9)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2">
              <polyline points="9,18 15,12 9,6"></polyline>
            </svg>
          </button>

          {/* Gender Badge */}
          <div style={{
            position: 'absolute',
            top: '15px',
            left: '15px',
            padding: '6px 12px',
            background: getGenderColor(pg.gender),
            color: 'white',
            borderRadius: '20px',
            fontSize: '11px',
            fontWeight: '600',
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
          }}>
            {pg.gender} PG
          </div>
        </div>

        {/* Content */}
        <div className="pg-detail-content" style={{
          padding: '20px',
          overflowY: 'auto',
          flex: 1
        }}>
          {/* Title and Price Row */}
          <div className="title-price-row" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '15px',
            gap: '10px'
          }}>
            <div style={{ flex: 1 }}>
              <h2 className="pg-detail-title" style={{
                margin: '0 0 6px',
                fontSize: '20px',
                fontWeight: '700',
                color: PRIMARY_GRADIENT[0]
              }}>
                {pg.name}
              </h2>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                color: '#64748b',
                fontSize: '12px'
              }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>{pg.area}, Bangalore</span>
              </div>
            </div>

            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                justifyContent: 'flex-end',
                marginBottom: '4px'
              }}>
                <span style={{ color: '#f59e0b', fontSize: '14px' }}>★</span>
                <span className="pg-detail-price" style={{ fontSize: '16px', fontWeight: '700', color: PRIMARY_GRADIENT[0] }}>{pg.rating}</span>
                <span style={{ color: '#999', fontSize: '11px' }}>({pg.reviews})</span>
              </div>
              {(rentalType === 'long_term' || rentalType === 'both') && (
                <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '2px' }}>
                  <span style={{ fontSize: '10px', fontWeight: '500' }}>Monthly</span>
                </div>
              )}
              {(rentalType === 'long_term' || rentalType === 'both') && (
                <div className="pg-detail-price" style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: PRIMARY_GRADIENT[1]
                }}>
                  ₹{(longTermRent.single || pg.price || 0).toLocaleString()}
                  <span style={{ fontSize: '11px', fontWeight: '400', color: '#999' }}>/mo</span>
                </div>
              )}
              {(rentalType === 'short_term' || rentalType === 'both') && (
                <div style={{ marginTop: '4px' }}>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>
                    <span style={{ fontSize: '9px', fontWeight: '500' }}>Daily</span>
                  </div>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#16a34a'
                  }}>
                    ₹{(shortTermRent.single || 0).toLocaleString()}
                    <span style={{ fontSize: '10px', fontWeight: '400', color: '#999' }}>/day</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Rental Type Badge */}
          <div style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '18px'
          }}>
            {(rentalType === 'long_term' || rentalType === 'both') && (
              <div style={{
                padding: '6px 12px',
                background: '#e0e7ff',
                borderRadius: '20px',
                fontSize: '11px',
                fontWeight: '600',
                color: '#4338ca'
              }}>
                📅 Monthly Stay
              </div>
            )}
            {(rentalType === 'short_term' || rentalType === 'both') && (
              <div style={{
                padding: '6px 12px',
                background: '#dcfce7',
                borderRadius: '20px',
                fontSize: '11px',
                fontWeight: '600',
                color: '#15803d'
              }}>
                🌙 Daily Stay
              </div>
            )}
          </div>

          {/* Availability Banner */}
          {pg.isAvailable ? (
            <div style={{
              background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)',
              borderRadius: '10px',
              padding: '10px 14px',
              marginBottom: '18px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span style={{ fontSize: '16px' }}>✅</span>
              <span style={{ fontSize: '12px', fontWeight: '600', color: '#166534' }}>
                Available for booking
              </span>
            </div>
          ) : (
            <div style={{
              background: 'linear-gradient(135deg, #fef3c7, #fde68a)',
              borderRadius: '10px',
              padding: '10px 14px',
              marginBottom: '18px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span style={{ fontSize: '16px' }}>⏳</span>
              <span style={{ fontSize: '12px', fontWeight: '600', color: '#92400e' }}>
                Currently not available
              </span>
            </div>
          )}

          {/* Description */}
          <div style={{ marginBottom: '18px' }}>
            <h3 style={{
              fontSize: '14px',
              fontWeight: '600',
              color: PRIMARY_GRADIENT[0],
              marginBottom: '8px'
            }}>
              About this PG
            </h3>
            <p style={{
              fontSize: '13px',
              color: '#64748b',
              lineHeight: '1.6'
            }}>
              {pg.description}
            </p>
          </div>

          {/* Amenities */}
          <div style={{ marginBottom: '18px' }}>
            <h3 style={{
              fontSize: '14px',
              fontWeight: '600',
              color: PRIMARY_GRADIENT[0],
              marginBottom: '10px'
            }}>
              Amenities & Facilities
            </h3>
            <div className="amenities-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
              gap: '8px'
            }}>
              {pg.amenities.map((amenity, idx) => (
                <div
                  className="amenity-item"
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 10px',
                    background: '#f8fafc',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0'
                  }}
                >
                  <span style={{ fontSize: '14px' }}>{getAmenityIcon(amenity)}</span>
                  <span style={{ fontSize: '11px', color: '#475569', fontWeight: '500' }}>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Full Pricing Breakdown */}
          <div style={{ marginBottom: '18px' }}>
            <h3 style={{
              fontSize: '14px',
              fontWeight: '600',
              color: PRIMARY_GRADIENT[0],
              marginBottom: '12px'
            }}>
              Pricing Details
            </h3>

            {/* Monthly Pricing */}
            {(rentalType === 'long_term' || rentalType === 'both') && (
              <div style={{
                background: '#f0f4ff',
                borderRadius: '12px',
                padding: '14px',
                marginBottom: '10px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginBottom: '10px'
                }}>
                  <span style={{ fontSize: '14px' }}>📅</span>
                  <span style={{ fontSize: '12px', fontWeight: '600', color: '#4338ca' }}>Monthly Rent</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                  <div style={{ background: 'white', padding: '10px', borderRadius: '8px', textAlign: 'center' }}>
                    <div style={{ fontSize: '10px', color: '#64748b', marginBottom: '4px' }}>Single</div>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: PRIMARY_GRADIENT[0] }}>
                      ₹{(longTermRent.single || 0).toLocaleString()}
                    </div>
                    <div style={{ fontSize: '9px', color: '#999' }}>/month</div>
                  </div>
                  <div style={{ background: 'white', padding: '10px', borderRadius: '8px', textAlign: 'center' }}>
                    <div style={{ fontSize: '10px', color: '#64748b', marginBottom: '4px' }}>Double</div>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: PRIMARY_GRADIENT[0] }}>
                      ₹{(longTermRent.double || 0).toLocaleString()}
                    </div>
                    <div style={{ fontSize: '9px', color: '#999' }}>/month</div>
                  </div>
                  <div style={{ background: 'white', padding: '10px', borderRadius: '8px', textAlign: 'center' }}>
                    <div style={{ fontSize: '10px', color: '#64748b', marginBottom: '4px' }}>Triple</div>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: PRIMARY_GRADIENT[0] }}>
                      ₹{(longTermRent.triple || 0).toLocaleString()}
                    </div>
                    <div style={{ fontSize: '9px', color: '#999' }}>/month</div>
                  </div>
                </div>
              </div>
            )}

            {/* Daily Pricing */}
            {(rentalType === 'short_term' || rentalType === 'both') && (
              <div style={{
                background: '#f0fdf4',
                borderRadius: '12px',
                padding: '14px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginBottom: '10px'
                }}>
                  <span style={{ fontSize: '14px' }}>🌙</span>
                  <span style={{ fontSize: '12px', fontWeight: '600', color: '#15803d' }}>Daily Rent</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                  <div style={{ background: 'white', padding: '10px', borderRadius: '8px', textAlign: 'center' }}>
                    <div style={{ fontSize: '10px', color: '#64748b', marginBottom: '4px' }}>Single</div>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: '#16a34a' }}>
                      ₹{(shortTermRent.single || 0).toLocaleString()}
                    </div>
                    <div style={{ fontSize: '9px', color: '#999' }}>/day</div>
                  </div>
                  <div style={{ background: 'white', padding: '10px', borderRadius: '8px', textAlign: 'center' }}>
                    <div style={{ fontSize: '10px', color: '#64748b', marginBottom: '4px' }}>Double</div>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: '#16a34a' }}>
                      ₹{(shortTermRent.double || 0).toLocaleString()}
                    </div>
                    <div style={{ fontSize: '9px', color: '#999' }}>/day</div>
                  </div>
                  <div style={{ background: 'white', padding: '10px', borderRadius: '8px', textAlign: 'center' }}>
                    <div style={{ fontSize: '10px', color: '#64748b', marginBottom: '4px' }}>Triple</div>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: '#16a34a' }}>
                      ₹{(shortTermRent.triple || 0).toLocaleString()}
                    </div>
                    <div style={{ fontSize: '9px', color: '#999' }}>/day</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Fixed Bottom CTA */}
        <div style={{
          padding: '15px 20px',
          borderTop: '1px solid #f1f5f9',
          background: 'white',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>


          <div className="cta-buttons" style={{ display: 'flex', gap: '10px' }}>
            <a
              href={`tel:${pg.phone || pg.ownerPhone || '+919876543210'}`}
              style={{
                flex: 1,
                padding: '12px',
                background: 'white',
                border: `2px solid ${PRIMARY_GRADIENT[1]}`,
                borderRadius: '10px',
                color: PRIMARY_GRADIENT[1],
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                textDecoration: 'none'
              }}
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
              style={{
                flex: 1,
                padding: '12px',
                background: `linear-gradient(135deg, ${PRIMARY_GRADIENT[0]}, ${PRIMARY_GRADIENT[1]})`,
                border: 'none',
                borderRadius: '10px',
                color: 'white',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(26, 26, 78, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                textDecoration: 'none'
              }}
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
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 100,
              padding: '15px'
            }}
            onClick={() => setShowEnquireForm(false)}
          >
            <div
              style={{
                background: 'white',
                borderRadius: '16px',
                padding: '25px',
                width: '100%',
                maxWidth: '380px',
                maxHeight: '90vh',
                overflowY: 'auto',
                animation: 'modalSlideIn 0.3s ease'
              }}
              onClick={e => e.stopPropagation()}
            >
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '25px 0' }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    background: '#dcfce7',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 15px'
                  }}>
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2">
                      <polyline points="20,6 9,17 4,12" />
                    </svg>
                  </div>
                  <h3 style={{ color: '#16a34a', marginBottom: '8px', fontSize: '18px' }}>Enquiry Sent!</h3>
                  <p style={{ color: '#64748b', fontSize: '13px' }}>We'll contact you within 24 hours</p>
                </div>
              ) : (
                <>
                  <h3 style={{
                    margin: '0 0 5px',
                    color: PRIMARY_GRADIENT[0],
                    fontSize: '18px',
                    fontWeight: '700'
                  }}>
                    Enquire about {pg.name}
                  </h3>
                  <p style={{ color: '#64748b', fontSize: '12px', marginBottom: '18px' }}>
                    Fill in your details and we'll get back to you shortly
                  </p>

                  <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '12px' }}>
                      <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px', fontWeight: '600', color: '#333' }}>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your name"
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: '2px solid #e5e7eb',
                          borderRadius: '8px',
                          fontSize: '13px',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>

                    <div style={{ marginBottom: '12px' }}>
                      <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px', fontWeight: '600', color: '#333' }}>
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter 10-digit phone number"
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: '2px solid #e5e7eb',
                          borderRadius: '8px',
                          fontSize: '13px',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>

                    <div style={{ marginBottom: '12px' }}>
                      <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px', fontWeight: '600', color: '#333' }}>
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
                          padding: '10px 12px',
                          border: '2px solid #e5e7eb',
                          borderRadius: '8px',
                          fontSize: '13px',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>

                    <div style={{ marginBottom: '12px' }}>
                      <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px', fontWeight: '600', color: '#333' }}>
                        Preferred Move-in Date
                      </label>
                      <input
                        type="date"
                        name="moveInDate"
                        value={formData.moveInDate}
                        onChange={handleInputChange}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: '2px solid #e5e7eb',
                          borderRadius: '8px',
                          fontSize: '13px',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                      <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px', fontWeight: '600', color: '#333' }}>
                        Message (Optional)
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Any specific requirements?"
                        rows={3}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: '2px solid #e5e7eb',
                          borderRadius: '8px',
                          fontSize: '13px',
                          boxSizing: 'border-box',
                          resize: 'vertical'
                        }}
                      />
                    </div>

                    <button
                      type="submit"
                      style={{
                        width: '100%',
                        padding: '12px',
                        background: `linear-gradient(135deg, ${PRIMARY_GRADIENT[0]}, ${PRIMARY_GRADIENT[1]})`,
                        color: 'white',
                        border: 'none',
                        borderRadius: '10px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        boxShadow: '0 4px 15px rgba(26, 26, 78, 0.3)'
                      }}
                    >
                      Submit Enquiry
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        )}
      </div>

        <style>{`
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(100%);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes modalSlideIn {
            from {
              opacity: 0;
              transform: scale(0.95);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          .pg-detail-overlay .pg-detail-modal {
            position: relative;
          }
          .pg-detail-overlay .blur-content {
            filter: blur(8px);
            pointer-events: none;
            user-select: none;
          }
          @media (min-width: 769px) {
            .pg-detail-overlay {
              align-items: center !important;
              padding: 20px !important;
            }
            .pg-detail-modal {
              border-radius: 24px !important;
              max-height: 90vh !important;
              animation: modalSlideIn 0.3s ease !important;
            }
            .detail-nav-btn {
              display: flex !important;
            }
          }
          @media (max-width: 768px) {
            .pg-detail-modal {
              border-radius: 20px 20px 0 0 !important;
              max-height: 92vh !important;
            }
            .detail-nav-btn {
              display: none !important;
            }
            .pg-detail-content {
              padding: 16px !important;
            }
            .pg-detail-title {
              font-size: 18px !important;
            }
            .pg-detail-price {
              font-size: 16px !important;
            }
            .amenities-grid {
              grid-template-columns: repeat(2, 1fr) !important;
            }
            .pricing-grid {
              grid-template-columns: 1fr 1fr !important;
            }
            .cta-buttons {
              flex-direction: column;
            }
            .title-price-row {
              flex-direction: column !important;
              gap: 12px !important;
            }
            .title-price-row > div:first-child {
              width: 100%;
            }
            .title-price-row > div:last-child {
              width: 100%;
              text-align: left !important;
            }
          }
          @media (max-width: 480px) {
            .amenities-grid {
              grid-template-columns: 1fr 1fr !important;
              gap: 6px !important;
            }
            .amenity-item {
              padding: 6px 8px !important;
              font-size: 10px !important;
            }
            .pricing-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
    </div>
  );
};

export default PGDetail;
