import React, { useState } from 'react';

const PRIMARY_GRADIENT = ["#F97316", "#F97316", "#F97316"];

const Sidebar = ({ 
  priceRange, 
  setPriceRange, 
  selectedAreas, 
  setSelectedAreas, 
  selectedGender, 
  setSelectedGender,
  selectedRentalType,
  setSelectedRentalType,
  areas,
  onClearFilters,
  onApplyFilters
}) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleAreaChange = (area) => {
    if (selectedAreas.includes(area)) {
      setSelectedAreas(selectedAreas.filter(a => a !== area));
    } else {
      setSelectedAreas([...selectedAreas, area]);
    }
  };

  const genderOptions = [
    { label: 'All', value: 'all' },
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Co-live', value: 'colive' }
  ];

  const rentalTypeOptions = [
    { label: 'All', value: 'all' },
    { label: 'Monthly', value: 'long_term' },
    { label: 'Daily', value: 'short_term' },
  ];

  const activeFiltersCount = 
    (selectedAreas.length > 0 ? 1 : 0) + 
    (selectedGender !== 'all' ? 1 : 0) + 
    (selectedRentalType !== 'all' ? 1 : 0) +
    (priceRange[0] > 3000 || priceRange[1] < 20000 ? 1 : 0);

  const SidebarContent = () => (
    <>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h3 style={{
          margin: 0,
          fontSize: '16px',
          fontWeight: '700',
          color: PRIMARY_GRADIENT[0]
        }}>
          Filters
        </h3>
        <button 
          onClick={onClearFilters}
          style={{
            background: 'none',
            border: 'none',
            color: PRIMARY_GRADIENT[1],
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: '500',
            padding: '5px 10px',
            borderRadius: '15px',
            background: 'rgba(45, 45, 126, 0.1)'
          }}
        >
          Clear All
        </button>
      </div>

      {/* Price Range Filter */}
      <div style={{ marginBottom: '25px' }}>
        <h4 style={{
          margin: '0 0 12px',
          fontSize: '13px',
          fontWeight: '600',
          color: '#333',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" stroke={PRIMARY_GRADIENT[1]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Price Range
        </h4>
        <div style={{
          background: '#f8fafc',
          borderRadius: '12px',
          padding: '15px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '12px'
          }}>
            <span style={{ fontSize: '13px', fontWeight: '600', color: PRIMARY_GRADIENT[0] }}>
              ₹{priceRange[0].toLocaleString()}
            </span>
            <span style={{ fontSize: '13px', fontWeight: '600', color: PRIMARY_GRADIENT[0] }}>
              ₹{priceRange[1].toLocaleString()}
            </span>
          </div>
          <input
            type="range"
            min="3000"
            max="20000"
            step="500"
            value={priceRange[0]}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (value < priceRange[1]) {
                setPriceRange([value, priceRange[1]]);
              }
            }}
            style={{
              width: '100%',
              marginBottom: '8px',
              accentColor: PRIMARY_GRADIENT[1]
            }}
          />
          <input
            type="range"
            min="3000"
            max="20000"
            step="500"
            value={priceRange[1]}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (value > priceRange[0]) {
                setPriceRange([priceRange[0], value]);
              }
            }}
            style={{
              width: '100%',
              accentColor: PRIMARY_GRADIENT[1]
            }}
          />
          <div style={{
            display: 'flex',
            gap: '10px',
            marginTop: '12px'
          }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '11px', color: '#64748b', marginBottom: '4px', display: 'block' }}>Min</label>
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) => {
                  const value = parseInt(e.target.value) || 3000;
                  if (value < priceRange[1]) {
                    setPriceRange([value, priceRange[1]]);
                  }
                }}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '12px',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '11px', color: '#64748b', marginBottom: '4px', display: 'block' }}>Max</label>
              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) => {
                  const value = parseInt(e.target.value) || 20000;
                  if (value > priceRange[0]) {
                    setPriceRange([priceRange[0], value]);
                  }
                }}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '12px',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Gender Filter */}
      <div style={{ marginBottom: '25px' }}>
        <h4 style={{
          margin: '0 0 12px',
          fontSize: '13px',
          fontWeight: '600',
          color: '#333',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="7" r="4" stroke={PRIMARY_GRADIENT[1]} strokeWidth="2"/>
            <path d="M5 21v-2a7 7 0 0114 0v2" stroke={PRIMARY_GRADIENT[1]} strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Gender
        </h4>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '8px'
        }}>
          {genderOptions.map(option => (
            <button
              key={option.value}
              onClick={() => setSelectedGender(option.value)}
              style={{
                padding: '10px 12px',
                border: selectedGender === option.value ? 'none' : '2px solid #e5e7eb',
                background: selectedGender === option.value ? `linear-gradient(135deg, ${PRIMARY_GRADIENT[0]}, ${PRIMARY_GRADIENT[1]})` : 'white',
                color: selectedGender === option.value ? 'white' : '#64748b',
                borderRadius: '10px',
                fontSize: '12px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Rental Type Filter */}
      <div style={{ marginBottom: '25px' }}>
        <h4 style={{
          margin: '0 0 12px',
          fontSize: '13px',
          fontWeight: '600',
          color: '#333',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke={PRIMARY_GRADIENT[1]} strokeWidth="2"/>
            <line x1="16" y1="2" x2="16" y2="6" stroke={PRIMARY_GRADIENT[1]} strokeWidth="2"/>
            <line x1="8" y1="2" x2="8" y2="6" stroke={PRIMARY_GRADIENT[1]} strokeWidth="2"/>
            <line x1="3" y1="10" x2="21" y2="10" stroke={PRIMARY_GRADIENT[1]} strokeWidth="2"/>
          </svg>
          Rental Type
        </h4>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '8px'
        }}>
          {rentalTypeOptions.map(option => (
            <button
              key={option.value}
              onClick={() => setSelectedRentalType(option.value)}
              style={{
                padding: '10px 12px',
                border: selectedRentalType === option.value ? 'none' : '2px solid #e5e7eb',
                background: selectedRentalType === option.value ? `linear-gradient(135deg, ${PRIMARY_GRADIENT[0]}, ${PRIMARY_GRADIENT[1]})` : 'white',
                color: selectedRentalType === option.value ? 'white' : '#64748b',
                borderRadius: '10px',
                fontSize: '12px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Area Filter */}
      <div>
        <h4 style={{
          margin: '0 0 12px',
          fontSize: '13px',
          fontWeight: '600',
          color: '#333',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke={PRIMARY_GRADIENT[1]} strokeWidth="2"/>
            <circle cx="12" cy="10" r="3" stroke={PRIMARY_GRADIENT[1]} strokeWidth="2"/>
          </svg>
          Areas
        </h4>
        <div style={{
          maxHeight: '250px',
          overflowY: 'auto',
          paddingRight: '5px'
        }} className="sidebar-areas">
          {areas && areas.length > 0 ? (
            areas.map(area => (
              <label
                key={area}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '8px 10px',
                  marginBottom: '4px',
                  background: selectedAreas.includes(area) ? `linear-gradient(135deg, rgba(26,26,78,0.08), rgba(45,45,126,0.08))` : '#f8fafc',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  border: selectedAreas.includes(area) ? `1px solid ${PRIMARY_GRADIENT[1]}` : '1px solid transparent'
                }}
              >
                <input
                  type="checkbox"
                  checked={selectedAreas.includes(area)}
                  onChange={() => handleAreaChange(area)}
                  style={{
                    width: '16px',
                    height: '16px',
                    marginRight: '8px',
                    accentColor: PRIMARY_GRADIENT[1],
                    cursor: 'pointer'
                  }}
                />
                <span style={{
                  fontSize: '12px',
                  color: selectedAreas.includes(area) ? PRIMARY_GRADIENT[0] : '#475569',
                  fontWeight: selectedAreas.includes(area) ? '600' : '400'
                }}>
                  {area}
                </span>
              </label>
            ))
          ) : (
            <p style={{ fontSize: '12px', color: '#64748b', padding: '10px', textAlign: 'center' }}>
              No areas available
            </p>
          )}
        </div>
      </div>

      {/* Active Filters Count */}
      {activeFiltersCount > 0 && (
        <div style={{
          marginTop: '18px',
          padding: '12px',
          background: `linear-gradient(135deg, rgba(26,26,78,0.05), rgba(45,45,126,0.05))`,
          borderRadius: '10px',
          textAlign: 'center'
        }}>
          <p style={{ margin: 0, fontSize: '12px', color: PRIMARY_GRADIENT[0], fontWeight: '500' }}>
            {activeFiltersCount} filter{activeFiltersCount !== 1 ? 's' : ''} active
          </p>
        </div>
      )}
    </>
  );

  return (
    <>
      {/* Mobile Filter Button */}
      <button
        className="mobile-filter-btn"
        onClick={() => setIsMobileOpen(true)}
        style={{
          display: 'none',
          width: '100%',
          padding: '12px',
          background: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: '12px',
          fontSize: '14px',
          fontWeight: '600',
          color: PRIMARY_GRADIENT[0],
          cursor: 'pointer',
          marginBottom: '15px',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px'
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="4" y1="21" x2="4" y2="14"/>
          <line x1="4" y1="10" x2="4" y2="3"/>
          <line x1="12" y1="21" x2="12" y2="12"/>
          <line x1="12" y1="8" x2="12" y2="3"/>
          <line x1="20" y1="21" x2="20" y2="16"/>
          <line x1="20" y1="12" x2="20" y2="3"/>
          <line x1="1" y1="14" x2="7" y2="14"/>
          <line x1="9" y1="8" x2="15" y2="8"/>
          <line x1="17" y1="16" x2="23" y2="16"/>
        </svg>
        Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
      </button>

      {/* Desktop Sidebar */}
      <div className="desktop-sidebar" style={{
        width: '280px',
        minWidth: '280px',
        background: 'white',
        borderRadius: '16px',
        padding: '20px',
        // boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
        height: 'fit-content',
        position: 'sticky',
        top: '90px'
      }}>
        <SidebarContent />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div 
          className="mobile-sidebar-overlay"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 2000,
            animation: 'fadeIn 0.3s ease'
          }}
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div 
        className="mobile-sidebar"
        style={{
          position: 'fixed',
          top: 0,
          left: isMobileOpen ? 0 : '-100%',
          width: '85%',
          maxWidth: '320px',
          height: '100vh',
          background: 'white',
          zIndex: 2001,
          padding: '20px',
          overflowY: 'auto',
          transition: 'left 0.3s ease',
          boxShadow: '10px 0 30px rgba(0,0,0,0.2)'
        }}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          paddingBottom: '15px',
          borderBottom: '1px solid #f1f5f9'
        }}>
          <h2 style={{
            margin: 0,
            fontSize: '18px',
            fontWeight: '700',
            color: PRIMARY_GRADIENT[0]
          }}>
            Filters
          </h2>
          <button
            onClick={() => setIsMobileOpen(false)}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: '#f8fafc',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              color: '#64748b'
            }}
          >
            ×
          </button>
        </div>

        <SidebarContent />

        <button
          onClick={() => {
            setIsMobileOpen(false);
            onApplyFilters?.();
          }}
          style={{
            width: '100%',
            padding: '14px',
            background: `linear-gradient(135deg, ${PRIMARY_GRADIENT[0]}, ${PRIMARY_GRADIENT[1]})`,
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '15px',
            fontWeight: '600',
            cursor: 'pointer',
            marginTop: '20px'
          }}
        >
          Apply Filters
        </button>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @media (max-width: 992px) {
          .desktop-sidebar {
            display: none !important;
          }
          .mobile-filter-btn {
            display: flex !important;
          }
        }
        @media (min-width: 993px) {
          .mobile-sidebar,
          .mobile-sidebar-overlay,
          .mobile-filter-btn {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default Sidebar;
