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

  const handleWhatsApp = (e) => {
    e.stopPropagation();
    if (safePG.ownerPhone) {
      const phone = safePG.ownerPhone.replace(/\D/g, '');
      const message = encodeURIComponent(`Hi, I am interested in your PG "${safePG.name}" in ${safePG.area}. Is it available?`);
      window.open(`https://wa.me/91${phone}?text=${message}`, '_blank');
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
            <div className="flex gap-8" style={{ alignItems: 'center' }}>
              {safePG.isVerified && (
              <button onClick={handleNavigate} className="pg-card-directions-btn">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="3 11 22 2 13 21 11 13 3 11" />
                </svg>
                Directions
              </button>
              )}
              {safePG.isVerified && safePG.ownerPhone && (
                <button onClick={handleWhatsApp} className="pg-card-wa-btn" title="Chat on WhatsApp">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </button>
              )}
            </div>
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
