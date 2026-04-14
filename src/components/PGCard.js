import React, { useState } from 'react';
import { theme } from '../theme';

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=300&fit=crop';

const PGCard = ({ pg, onSelect, isSelected, onViewDetails }) => {
  console.log(pg);

  const [isHovered, setIsHovered] = useState(false);

  const safePG = {
    id: pg?.id || '',
    name: pg?.name || 'PG Accommodation',
    area: pg?.area || 'Bangalore',
    city: pg?.city || 'Bangalore',
    address: pg?.address || '',
    price: pg?.price || 8000,
    rating: pg?.rating || 4.0,
    reviews: pg?.reviews || 0,
    amenities: Array.isArray(pg?.amenities)
      ? pg.amenities.map(a =>
        a.charAt(0).toUpperCase() + a.slice(1)
      )
      : ['WiFi', 'AC', 'Laundry'], gender: pg?.gender || 'Unisex',
    images: Array.isArray(pg?.images) && pg.images.length > 0 ? pg.images : [DEFAULT_IMAGE],
    isVerified: pg?.isVerified ?? true,
    isTopRated: pg?.isTopRated || false,
    description: pg?.description || 'Comfortable stay with all modern amenities.',
    totalRooms: pg?.totalRooms || 10,
    availableRooms: pg?.availableRooms || 5,
    owner: pg?.owner || 'Owner',
    ownerPhone: pg?.ownerPhone || pg?.phone || '',
    lat: pg?.lat || null,
    lng: pg?.lng || null,
    savings: pg?.savings || 0,
    highDemand: pg?.highDemand ?? true,
    rentalType: pg?.rentalType || 'long_term'
  };

  const getGenderColor = () => {
    switch (safePG.gender) {
      case 'Male': return { bg: '#dbeafe', text: '#1d4ed8' };
      case 'Female': return { bg: '#fce7f3', text: '#9d174d' };
      default: return { bg: '#ede9fe', text: '#6d28d9' };
    }
  };

  const genderStyle = getGenderColor();

  const handleNavigate = (e) => {
    e.stopPropagation();
    const address = encodeURIComponent(`${safePG.area}, ${safePG.city}`);
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${safePG.lat}%2C${safePG.lng}`,
      '_blank'
    );
  };

  const handleCall = (e) => {
    e.stopPropagation();
    if (safePG.ownerPhone) {
      window.location.href = `tel:${safePG.ownerPhone}`;
    }
  };

  const handleViewDetails = (e) => {
    e.stopPropagation();
    if (onViewDetails) onViewDetails(safePG);
  };

  return (
    <div
      className="pg-card-horizontal"
      onClick={() => onSelect(safePG)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex',
        width: '100%',
        background: '#fff',
        borderRadius: '16px',
        overflow: 'hidden',
        marginBottom: '14px',
        boxShadow: isHovered ? '0 6px 24px rgba(0,0,0,0.1)' : '0 3px 12px rgba(0,0,0,0.05)',
        border: isSelected ? `2px solid ${theme.accent[500]}` : '1px solid #e8e4de',
        transition: 'all 0.3s ease',
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
      }}
    >
      {/* LEFT IMAGE */}
      <div className="pg-card-image" style={{ width: '380px', minWidth: '380px', height: '280px', position: 'relative' }}>
        <img
          src={safePG.images[0] || DEFAULT_IMAGE}
          alt={safePG.name}
          className="pg-card-img"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s ease',
            transform: isHovered ? 'scale(1.03)' : 'scale(1)'
          }}
        />

        {/* Gradient Overlay */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '50px',
          background: 'linear-gradient(transparent, rgba(10,12,18,0.5))'
        }} />

        {/* Gender Badge */}
        <div style={{
          position: 'absolute',
          top: '8px',
          left: '8px',
          background: genderStyle.bg,
          color: genderStyle.text,
          padding: '4px 10px',
          borderRadius: '999px',
          fontSize: '10px',
          fontWeight: '700',
          fontFamily: "'Inter', sans-serif"
        }}>
          {safePG.gender}
        </div>

        {/* Top Rated Badge */}
        {safePG.isTopRated && (
          <div style={{
            position: 'absolute',
            top: '8px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#FF6B2C',
            color: 'white',
            padding: '4px 10px',
            borderRadius: '999px',
            fontSize: '10px',
            fontWeight: '700',
            whiteSpace: 'nowrap',
            fontFamily: "'Inter', sans-serif"
          }}>
            Top Rated
          </div>
        )}

        {/* Verified Badge */}
        {safePG.isVerified ? (
          <div style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            background: 'rgba(255,255,255,0.95)',
            color: '#059669',
            padding: '4px 8px',
            borderRadius: '999px',
            fontSize: '10px',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            gap: '3px',
            fontFamily: "'Inter', sans-serif"
          }}>
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="3">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Verified
          </div>
        ) : (
          <div style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            background: '#fee2e2',
            color: '#dc2626',
            padding: '4px 8px',
            borderRadius: '999px',
            fontSize: '10px',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            gap: '3px',
            fontFamily: "'Inter', sans-serif"
          }}>
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="3">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            Not Verified
          </div>
        )}

        {/* Rating Badge */}


        {/* Savings Badge */}
        {safePG.savings > 0 && (
          <div style={{
            position: 'absolute',
            bottom: '8px',
            right: '8px',
            background: '#059669',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '999px',
            fontSize: '10px',
            fontWeight: '700',
            fontFamily: "'Inter', sans-serif"
          }}>
            Save ₹{safePG.savings.toLocaleString()}
          </div>
        )}
      </div>

      {/* RIGHT CONTENT */}
      <div style={{
        flex: 1,
        padding: '14px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        {/* TOP */}
        <div>
          {/* Name and Price Row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
            <h3 style={{
              margin: 0,
              fontSize: '16px',
              fontWeight: '800',
              color: '#0D1117',
              fontFamily: "'Inter', sans-serif",
              letterSpacing: '-0.3px',
              lineHeight: 1.2
            }}>
              {safePG.name}
            </h3>
            {safePG.isVerified && (
              <div style={{ textAlign: 'right' }}>
                <div style={{
                  fontSize: '18px',
                  fontWeight: '800',
                  color: '#FF6B2C',
                  fontFamily: "'Inter', sans-serif"
                }}>
                  ₹{safePG.price.toLocaleString()}
                </div>
                <div style={{
                  fontSize: '10px',
                  color: '#94A3B8',
                  fontWeight: '500',
                  fontFamily: "'Inter', sans-serif"
                }}>
                  per month
                </div>
              </div>
            )}
          </div>

          {/* Location */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '8px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '12px',
              color: '#64748B',
              fontWeight: '500',
              fontFamily: "'Inter', sans-serif"
            }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {safePG.area}, {safePG.city}
            </div>
            {safePG.isVerified && (
            <button
              onClick={handleNavigate}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '5px 10px',
                background: '#f8f7f4',
                border: '1px solid #e8e4de',
                borderRadius: '6px',
                fontSize: '10px',
                fontWeight: '600',
                color: '#475569',
                cursor: 'pointer',
                fontFamily: "'Inter', sans-serif",
                transition: 'all 0.2s'
              }}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="3 11 22 2 13 21 11 13 3 11" />
              </svg>
              Directions
            </button>
            )}
          </div>

          {/* Amenities */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '5px',
            marginBottom: '6px'
          }}>
            {safePG.amenities.slice(0, 4).map((amenity, idx) => (
              <span key={idx} style={{
                background: '#f8f7f4',
                border: '1px solid #eae6e0',
                padding: '3px 10px',
                borderRadius: '999px',
                fontSize: '10px',
                color: '#475569',
                fontWeight: '600',
                fontFamily: "'Inter', sans-serif"
              }}>
                {amenity}
              </span>
            ))}
            {safePG.amenities.length > 4 && (
              <span style={{
                background: '#0D1117',
                border: '1px solid #0D1117',
                padding: '3px 10px',
                borderRadius: '999px',
                fontSize: '10px',
                color: 'white',
                fontWeight: '600',
                fontFamily: "'Inter', sans-serif"
              }}>
                +{safePG.amenities.length - 4}
              </span>
            )}
          </div>

          {/* High Demand Badge */}
          {safePG.highDemand && (
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              padding: '4px 10px',
              background: '#FFFBEB',
              border: '1px solid #FDE68A',
              borderRadius: '6px',
              fontSize: '10px',
              fontWeight: '700',
              color: '#92400E',
              fontFamily: "'Inter', sans-serif"
            }}>
              <span style={{
                width: '5px',
                height: '5px',
                background: '#F59E0B',
                borderRadius: '50%'
              }} />
              High demand
            </div>
          )}
        </div>

        {/* Divider */}
        <div style={{
          height: '1px',
          background: '#f1ede8',
          margin: '10px 0'
        }} />

        {/* BOTTOM */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>


          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>

            <div style={{

              background: 'rgba(255,255,255,0.95)',
              padding: '4px 8px',
              borderRadius: '999px',
              fontSize: '14px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '3px',
              color: '#0D1117',
              fontFamily: "'Inter', sans-serif"
            }}>
              <span style={{ color: '#F59E0B' }}>★</span>
              {safePG.rating.toFixed(1)}
              <span style={{ fontSize: '10px', color: '#64748B', fontWeight: '500' }}>
                ({safePG.reviews})
              </span>
            </div>
            <button
              onClick={handleViewDetails}
              style={{
                padding: '8px 16px',
                background: '#FF6B2C',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: '700',
                cursor: 'pointer',
                fontFamily: "'Inter', sans-serif",
                transition: 'all 0.2s',
                boxShadow: '0 2px 8px rgba(255,107,44,0.2)'
              }}
            >
              View Details
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Responsive Styles */}
      <style>{`
        @media (max-width: 768px) {
          .pg-card-horizontal {
            flex-direction: column !important;
          }
          .pg-card-image {
            width: 100% !important;
            min-width: 100% !important;
            height: 180px !important;
          }
        }
        @media (max-width: 480px) {
          .pg-card-image {
            height: 160px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default PGCard;
