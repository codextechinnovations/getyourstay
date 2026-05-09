import React, { useState } from 'react';
import { theme } from '../theme';
import './PGCard.css';

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=300&fit=crop';

const PGCard = ({ pg, onSelect, isSelected, onViewDetails }) => {
  console.log(pg);

  // eslint-disable-next-line no-unused-vars
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
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${safePG.lat}%2C${safePG.lng}`,
      '_blank'
    );
  };

  // eslint-disable-next-line no-unused-vars
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
        border: isSelected ? `2px solid ${theme.accent[500]}` : '1px solid #e8e4de'
      }}
    >
      {/* LEFT IMAGE */}
      <div className="pg-card-image">
        <img
          src={safePG.images[0] || DEFAULT_IMAGE}
          alt={safePG.name}
          className="pg-card-img"
        />

        {/* Gradient Overlay */}
        <div className="img-overlay" />

        {/* Gender Badge */}
        <div className="badge" style={{ position: 'absolute', top: '8px', left: '8px', background: genderStyle.bg, color: genderStyle.text }}>
          {safePG.gender}
        </div>

        {/* Top Rated Badge */}
        {safePG.isTopRated && (
          <div className="badge" style={{ position: 'absolute', top: '8px', left: '50%', transform: 'translateX(-50%)', background: '#FF6B2C', color: 'white', whiteSpace: 'nowrap' }}>
            Top Rated
          </div>
        )}

        {/* Verified Badge */}
        {safePG.isVerified ? (
          <div className="badge" style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(255,255,255,0.95)', color: '#059669' }}>
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="3">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Verified
          </div>
        ) : (
          <div className="badge badge-warning" style={{ position: 'absolute', top: '8px', right: '8px' }}>
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
          <div className="badge" style={{ position: 'absolute', bottom: '8px', right: '8px', background: '#059669', color: 'white' }}>
            Save ₹{safePG.savings.toLocaleString()}
          </div>
        )}
      </div>

      {/* RIGHT CONTENT */}
      <div className="pg-card-content">
        {/* TOP */}
        <div>
          {/* Name and Price Row */}
          <div className="flex-between" style={{ alignItems: 'flex-start', marginBottom: '6px' }}>
            <h3 className="pg-card-name">
              {safePG.name}
            </h3>
            {safePG.isVerified && (
              <div className="text-center" style={{ flexShrink: 0 }}>
                <div className="pg-card-price-start">Starting From</div>
                <div className="pg-card-price">₹{safePG.price.toLocaleString()}</div>
                <div className="pg-card-price-period">per month</div>
              </div>
            )}
          </div>

          {/* Location */}
          <div className="flex-between" style={{ marginBottom: '8px' }}>
            <div className="pg-card-location">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {safePG.area}, {safePG.city}
            </div>
            {safePG.isVerified && (
            <button onClick={handleNavigate} className="pg-card-directions-btn">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="3 11 22 2 13 21 11 13 3 11" />
              </svg>
              Directions
            </button>
            )}
          </div>

          {/* Amenities */}
          <div className="pg-card-amenities">
            {safePG.amenities.slice(0, 4).map((amenity, idx) => (
              <span key={idx} className="amenity-tag">
                {amenity}
              </span>
            ))}
            {safePG.amenities.length > 4 && (
              <span className="amenity-tag-more">
                +{safePG.amenities.length - 4}
              </span>
            )}
          </div>

          {/* High Demand Badge */}
          {safePG.highDemand && (
            <div className="pg-card-high-demand">
              <span className="high-demand-dot" />
              High demand
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="pg-card-divider" />

        {/* BOTTOM */}
        <div className="pg-card-bottom">
          <div className="flex flex-1 gap-8" style={{ alignItems: 'center', justifyContent: 'space-between' }}>
            <div className="pg-card-rating">
              <span className="pg-card-rating-star">★</span>
              {safePG.rating.toFixed(1)}
              <span className="pg-card-rating-reviews">({safePG.reviews})</span>
            </div>
            <button onClick={handleViewDetails} className="pg-card-view-btn">
              View Details
            </button>
          </div>
        </div>
      </div>


    </div>
  );
};

export default PGCard;
