import React, { useState } from 'react';
import './Sidebar.css';

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
      <div className="sidebar-header">
        <h3 className="sidebar-title">Filters</h3>
        <button onClick={onClearFilters} className="sidebar-clear-btn">Clear All</button>
      </div>

      {/* Price Range Filter */}
      <div className="filter-section">
        <h4 className="filter-section-title">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Price Range
        </h4>
        <div className="price-range-container">
          <div className="price-labels">
            <span className="price-label">₹{priceRange[0].toLocaleString()}</span>
            <span className="price-label">₹{priceRange[1].toLocaleString()}</span>
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
            className="range-input"
            style={{ marginBottom: '8px' }}
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
            className="range-input"
          />
          <div className="price-inputs">
            <div className="price-input-group">
              <label className="price-input-label">Min</label>
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) => {
                  const value = parseInt(e.target.value) || 3000;
                  if (value < priceRange[1]) {
                    setPriceRange([value, priceRange[1]]);
                  }
                }}
                className="price-input"
              />
            </div>
            <div className="price-input-group">
              <label className="price-input-label">Max</label>
              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) => {
                  const value = parseInt(e.target.value) || 20000;
                  if (value > priceRange[0]) {
                    setPriceRange([priceRange[0], value]);
                  }
                }}
                className="price-input"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Gender Filter */}
      <div className="filter-section">
        <h4 className="filter-section-title">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="7" r="4" stroke="#f97316" strokeWidth="2"/>
            <path d="M5 21v-2a7 7 0 0114 0v2" stroke="#f97316" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Gender
        </h4>
        <div className="filter-grid">
          {genderOptions.map(option => (
            <button
              key={option.value}
              onClick={() => setSelectedGender(option.value)}
              className={`filter-option-btn ${selectedGender === option.value ? 'filter-option-btn-active' : 'filter-option-btn-default'}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Rental Type Filter */}
      <div className="filter-section">
        <h4 className="filter-section-title">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="#f97316" strokeWidth="2"/>
            <line x1="16" y1="2" x2="16" y2="6" stroke="#f97316" strokeWidth="2"/>
            <line x1="8" y1="2" x2="8" y2="6" stroke="#f97316" strokeWidth="2"/>
            <line x1="3" y1="10" x2="21" y2="10" stroke="#f97316" strokeWidth="2"/>
          </svg>
          Rental Type
        </h4>
        <div className="filter-grid">
          {rentalTypeOptions.map(option => (
            <button
              key={option.value}
              onClick={() => setSelectedRentalType(option.value)}
              className={`filter-option-btn ${selectedRentalType === option.value ? 'filter-option-btn-active' : 'filter-option-btn-default'}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Area Filter */}
      <div className="filter-section">
        <h4 className="filter-section-title">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="#f97316" strokeWidth="2"/>
            <circle cx="12" cy="10" r="3" stroke="#f97316" strokeWidth="2"/>
          </svg>
          Areas
        </h4>
        <div className="areas-container sidebar-areas">
          {areas && areas.length > 0 ? (
            areas.map(area => (
              <label
                key={area}
                className={`area-item ${selectedAreas.includes(area) ? 'area-item-selected' : 'area-item-default'}`}
              >
                <input
                  type="checkbox"
                  checked={selectedAreas.includes(area)}
                  onChange={() => handleAreaChange(area)}
                  className="area-checkbox"
                />
                <span className={`area-name ${selectedAreas.includes(area) ? 'area-name-selected' : 'area-name-default'}`}>
                  {area}
                </span>
              </label>
            ))
          ) : (
            <p className="no-areas-msg">No areas available</p>
          )}
        </div>
      </div>

      {/* Active Filters Count */}
      {activeFiltersCount > 0 && (
        <div className="active-filters-banner">
          <p className="active-filters-text">
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
      <div className="sidebar-container desktop-sidebar">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div className="mobile-sidebar-overlay" onClick={() => setIsMobileOpen(false)} />
      )}

      {/* Mobile Sidebar */}
      <div className="mobile-sidebar-panel" style={{ left: isMobileOpen ? 0 : '-100%' }}>
        <div className="mobile-sidebar-header">
          <h2 className="mobile-sidebar-title">Filters</h2>
          <button onClick={() => setIsMobileOpen(false)} className="mobile-sidebar-close">×</button>
        </div>

        <SidebarContent />

        <button
          onClick={() => {
            setIsMobileOpen(false);
            onApplyFilters?.();
          }}
          className="apply-filters-btn"
        >
          Apply Filters
        </button>
      </div>
    </>
  );
};

export default Sidebar;
