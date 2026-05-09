import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { theme } from '../theme';
import { submitEnquiry } from '../services/api';
import './ListYourPG.css';

const ListYourPG = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    ownerName: '',
    ownerPhone: '',
    ownerEmail: '',
    pgName: '',
    pgType: 'pg',
    gender: 'male',
    address: '',
    area: '',
    city: 'Bangalore',
    state: 'Karnataka',
    pincode: '',
    description: '',
    rentalType: 'long_term',
    longTermRent: { single: '', double: '', triple: '' },
    shortTermRent: { single: '', double: '', triple: '' },
    totalRooms: '',
    amenities: [],
    images: [],
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    accountHolder: '',
    termsAccepted: false
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = 'List Your PG for Free | PG Owner Registration | GetYourStay India';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    
    if (metaDescription) metaDescription.content = 'List your PG on GetYourStay - India\'s #1 free PG listing platform. Register your paying guest accommodation and reach 50,000+ active users. 100% free listing. Quick approval. Also get free PG owner app.';
    if (metaKeywords) metaKeywords.content = 'list pg free, pg owner registration, free pg listing India, paying guest registration, list your pg, pg advertisement, PG owner app, PG management app free, paying guest bangalore, list pg property';
    if (ogTitle) ogTitle.content = 'List Your PG for Free - GetYourStay India';
    if (ogDescription) ogDescription.content = 'List your PG absolutely free on India\'s #1 PG platform. Reach 50,000+ active users. 100% free listing with free PG management app included.';
    
    return () => {
      document.title = 'GetYourStay - PG Accommodation in India';
    };
  }, []);

  const amenitiesList = [
    'WiFi', 'AC', 'Food', 'Laundry', 'Parking', 'Gym',
    'Pool', 'Security', 'TV Room', 'Housekeeping',
    'Power Backup', 'Garden', 'Spa', 'Concierge', 'CCTV'
  ];

  const areas = [
    'Koramangala', 'Indiranagar', 'HSR Layout', 'Whitefield',
    'Marathahalli', 'Electronic City', 'MG Road', 'Silk Board',
    'Jayanagar', 'Bellandur', 'Hebbal', 'Banashankari',
    'Malleswaram', 'JP Nagar', 'Rajajinagar', 'BTM Layout',
    'Domlur', 'CV Raman Nagar', 'Basavanagudi', 'Sarjapur'
  ];

  const benefits = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
      title: '50,000+ Active Users',
      desc: 'Get instant visibility to thousands searching for PG every month'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      ),
      title: '100% Free Listing',
      desc: 'List your PG absolutely free. No hidden charges ever'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
      ),
      title: '24-Hour Approval',
      desc: 'Quick verification and your listing goes live fast'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      ),
      title: 'Direct Enquiries',
      desc: 'Receive enquiries via WhatsApp and calls from interested tenants'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
          <line x1="3" y1="9" x2="21" y2="9"/>
          <line x1="9" y1="21" x2="9" y2="9"/>
        </svg>
      ),
      title: 'PG Management Kit(App & Website)',
      desc: 'Get A PG management app to track payments & tenants'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      ),
      title: 'Verified Badge',
      desc: 'Verified listings get 3x more enquiries from quality tenants'
    }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleNestedChange = (parent, field, value) => {
    setFormData(prev => ({
      ...prev,
      [parent]: { ...prev[parent], [field]: value }
    }));
  };

  const toggleAmenity = (amenity) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + formData.images.length > 10) {
      alert('Maximum 10 images allowed');
      return;
    }
    const newImages = files.map(file => URL.createObjectURL(file));
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newImages]
    }));
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const validateStep = (stepNum) => {
    const newErrors = {};
    
    if (stepNum === 1) {
      if (!formData.ownerName.trim()) newErrors.ownerName = 'Owner name is required';
      if (!formData.ownerPhone.trim()) newErrors.ownerPhone = 'Phone number is required';
      else if (!/^\d{10}$/.test(formData.ownerPhone.replace(/\D/g, ''))) {
        newErrors.ownerPhone = 'Enter valid 10-digit phone';
      }
      if (!formData.ownerEmail.trim()) newErrors.ownerEmail = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.ownerEmail)) {
        newErrors.ownerEmail = 'Enter valid email';
      }
    }
    
    if (stepNum === 2) {
      if (!formData.pgName.trim()) newErrors.pgName = 'PG name is required';
      if (!formData.address.trim()) newErrors.address = 'Address is required';
      if (!formData.area) newErrors.area = 'Select an area';
      if (!formData.city.trim()) newErrors.city = 'City is required';
      if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';
    }
    
    if (stepNum === 3) {
      if (!formData.description.trim()) newErrors.description = 'Description is required';
      if (formData.rentalType === 'long_term' || formData.rentalType === 'both') {
        if (!formData.longTermRent.single) newErrors.longTermRent = 'Enter single sharing rent';
      }
      if (formData.rentalType === 'short_term' || formData.rentalType === 'both') {
        if (!formData.shortTermRent.single) newErrors.shortTermRent = 'Enter daily rent';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrev = () => {
    setStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.termsAccepted) {
      setErrors({ termsAccepted: 'You must accept terms and conditions' });
      return;
    }
    
    setSubmitting(true);
    try {
      const response = await submitEnquiry({
        ownerName: formData.ownerName,
        pgName: formData.pgName,
        phone: formData.ownerPhone,
        email: formData.ownerEmail,
        address: formData.address
      });
      if (response?.success) {
        setSubmitted(true);
      } else {
        setErrors({ submit: response?.message || 'Submission failed. Please try again.' });
      }
    } catch (err) {
      setErrors({ submit: err?.message || 'Submission failed. Please try again.' });
    }
    setSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="submit-success">
        <div className="success-card">
          <div className="success-check-icon">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2">
              <polyline points="20,6 9,17 4,12" />
            </svg>
          </div>
          <h2>Listing Submitted!</h2>
          <p>Thank you for listing on GetYourStay. Our team will verify your listing and activate it within 2 hours.</p>
          <div className="success-next-steps">
            <p>
              <strong>What happens next:</strong><br/>
              1. We'll verify your listing<br/>
              2. Your listing goes live<br/>
              3. Start receiving enquiries
            </p>
          </div>
          <Link 
            to="/"
            className="btn btn-primary"
            style={{ padding: '12px 28px' }}
          >
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="list-pg-page">
      <div className="list-pg-hero">
        <h1>List Your PG on GetYourStay</h1>
        <p>100% Free Listing • Reach 50,000+ Active Users</p>
      </div>

      <div className="page-section">
        <div className="benefits-grid">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="benefit-card">
              <div className="benefit-icon">{benefit.icon}</div>
              <div>
                <h3 className="benefit-title">{benefit.title}</h3>
                <p className="benefit-desc">{benefit.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h2 style={{ color: theme.primary[800], fontSize: '22px', fontWeight: '600', marginBottom: '4px' }}>
            Create Your Listing
          </h2>
          <p style={{ color: '#64748b', fontSize: '14px' }}>
            Fill in the details below to list your PG
          </p>
        </div>

        <div className="app-promo-card">
          <div className="app-promo-inner">
            <div className="app-promo-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                <line x1="12" y1="18" x2="12.01" y2="18"/>
              </svg>
            </div>
            <h3 className="app-promo-title">Also Get PG Owner App</h3>
            <p className="app-promo-desc">Manage your entire PG from your phone. Track rent, manage tenants, handle maintenance - all free with your listing!</p>
            <div className="app-promo-features">
              <span className="app-promo-feature">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2"><polyline points="20,6 9,17 4,12"/></svg>
                Rent Tracking
              </span>
              <span className="app-promo-feature">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2"><polyline points="20,6 9,17 4,12"/></svg>
                Tenant Management
              </span>
              <span className="app-promo-feature">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2"><polyline points="20,6 9,17 4,12"/></svg>
                WhatsApp Alerts
              </span>
            </div>
            <Link
              to="/pg-management-app"
              className="btn btn-outline"
              style={{ background: '#f0f4ff', color: theme.primary[800], border: '1px solid #c7d2fe' }}
            >
              Learn More About PG App
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '640px', margin: '0 auto 60px', padding: '0 20px' }}>
        <div className="form-card">
          <div className="form-steps">
            {['Owner Info', 'PG Details', 'Pricing', 'Review'].map((label, idx) => (
              <div
                key={idx}
                className={`form-step ${step === idx + 1 ? 'form-step-active' : 'form-step-inactive'}`}
              >
                {idx + 1}. {label}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="form-body">
            {step === 1 && (
              <div>
                <h3 style={{ color: theme.primary[800], marginBottom: '20px', fontSize: '18px', fontWeight: '600' }}>
                  Owner Information
                </h3>
                
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    name="ownerName"
                    value={formData.ownerName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="input-field"
                    style={{ borderColor: errors.ownerName ? '#ef4444' : '#e2e8f0' }}
                  />
                  {errors.ownerName && <span className="error-text">{errors.ownerName}</span>}
                </div>

                <div className="form-grid-2">
                  <div>
                    <label className="form-label">Phone Number *</label>
                    <input
                      type="tel"
                      name="ownerPhone"
                      value={formData.ownerPhone}
                      onChange={handleChange}
                      placeholder="10-digit mobile"
                      className="input-field"
                      style={{ borderColor: errors.ownerPhone ? '#ef4444' : '#e2e8f0' }}
                    />
                    {errors.ownerPhone && <span className="error-text">{errors.ownerPhone}</span>}
                  </div>

                  <div>
                    <label className="form-label">Email Address *</label>
                    <input
                      type="email"
                      name="ownerEmail"
                      value={formData.ownerEmail}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="input-field"
                      style={{ borderColor: errors.ownerEmail ? '#ef4444' : '#e2e8f0' }}
                    />
                    {errors.ownerEmail && <span className="error-text">{errors.ownerEmail}</span>}
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h3 style={{ color: theme.primary[800], marginBottom: '20px', fontSize: '18px', fontWeight: '600' }}>
                  PG / Property Details
                </h3>

                <div className="form-grid-2">
                  <div>
                    <label className="form-label">PG / Property Name *</label>
                    <input
                      type="text"
                      name="pgName"
                      value={formData.pgName}
                      onChange={handleChange}
                      placeholder="e.g., Green Valley PG"
                      className="input-field"
                      style={{ borderColor: errors.pgName ? '#ef4444' : '#e2e8f0' }}
                    />
                    {errors.pgName && <span className="error-text">{errors.pgName}</span>}
                  </div>

                  <div>
                    <label className="form-label">Property Type</label>
                    <select
                      name="pgType"
                      value={formData.pgType}
                      onChange={handleChange}
                      className="input-field select-field"
                    >
                      <option value="pg">PG / Hostel</option>
                      <option value="hotel">Hotel</option>
                      <option value="flat">Flat / Apartment</option>
                    </select>
                  </div>
                </div>

                <div className="form-grid-2">
                  <div>
                    <label className="form-label">For Gender *</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="input-field select-field"
                    >
                      <option value="male">Male Only</option>
                      <option value="female">Female Only</option>
                      <option value="colive">Co-live / Unisex</option>
                    </select>
                  </div>

                  <div>
                    <label className="form-label">Area / Location *</label>
                    <select
                      name="area"
                      value={formData.area}
                      onChange={handleChange}
                      className="input-field select-field"
                      style={{ borderColor: errors.area ? '#ef4444' : '#e2e8f0' }}
                    >
                      <option value="">Select Area</option>
                      {areas.map(area => (
                        <option key={area} value={area}>{area}</option>
                      ))}
                    </select>
                    {errors.area && <span className="error-text">{errors.area}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Full Address *</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="House no., Street, Landmark"
                    rows={2}
                    className="input-field"
                    style={{ resize: 'vertical', borderColor: errors.address ? '#ef4444' : '#e2e8f0' }}
                  />
                  {errors.address && <span className="error-text">{errors.address}</span>}
                </div>

                <div className="form-grid-3">
                  <div>
                    <label className="form-label">City *</label>
                    <input type="text" name="city" value={formData.city} onChange={handleChange} className="input-field" />
                  </div>
                  <div>
                    <label className="form-label">State</label>
                    <input type="text" name="state" value={formData.state} onChange={handleChange} className="input-field" />
                  </div>
                  <div>
                    <label className="form-label">Pincode *</label>
                    <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} placeholder="6-digit" maxLength={6} className="input-field" style={{ borderColor: errors.pincode ? '#ef4444' : '#e2e8f0' }} />
                    {errors.pincode && <span className="error-text">{errors.pincode}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Describe your PG..." rows={3} className="input-field" style={{ resize: 'vertical' }} />
                </div>

                <div className="form-group">
                  <label className="form-label">Total Rooms Available</label>
                  <input type="number" name="totalRooms" value={formData.totalRooms} onChange={handleChange} placeholder="e.g., 20" min="1" className="input-field" />
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h3 style={{ color: theme.primary[800], marginBottom: '20px', fontSize: '18px', fontWeight: '600' }}>
                  Pricing & Amenities
                </h3>

                <div className="form-group">
                  <label className="form-label">Rental Type</label>
                  <div className="rental-type-options">
                    {[{ value: 'long_term', label: 'Monthly Only' }, { value: 'short_term', label: 'Daily Only' }, { value: 'both', label: 'Both' }].map(option => (
                      <label key={option.value} className={`rental-type-option ${formData.rentalType === option.value ? 'rental-type-option-active' : ''}`}>
                        <input type="radio" name="rentalType" value={option.value} checked={formData.rentalType === option.value} onChange={handleChange} />
                        <span className={`rental-type-label ${formData.rentalType === option.value ? 'rental-type-label-active' : 'rental-type-label-inactive'}`}>{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {(formData.rentalType === 'long_term' || formData.rentalType === 'both') && (
                  <div className="pricing-section">
                    <h4 className="pricing-section-title" style={{ color: theme.primary[800] }}>Monthly Rent (₹)</h4>
                    <div className="pricing-grid-3">
                      <div>
                        <label className="form-label">Single</label>
                        <input type="number" value={formData.longTermRent.single} onChange={(e) => handleNestedChange('longTermRent', 'single', e.target.value)} placeholder="₹8000" className="input-field" />
                      </div>
                      <div>
                        <label className="form-label">Double</label>
                        <input type="number" value={formData.longTermRent.double} onChange={(e) => handleNestedChange('longTermRent', 'double', e.target.value)} placeholder="₹6000" className="input-field" />
                      </div>
                      <div>
                        <label className="form-label">Triple</label>
                        <input type="number" value={formData.longTermRent.triple} onChange={(e) => handleNestedChange('longTermRent', 'triple', e.target.value)} placeholder="₹5000" className="input-field" />
                      </div>
                    </div>
                  </div>
                )}

                {(formData.rentalType === 'short_term' || formData.rentalType === 'both') && (
                  <div className="pricing-section">
                    <h4 className="pricing-section-title" style={{ color: '#15803d' }}>Daily Rent (₹)</h4>
                    <div className="pricing-grid-3">
                      <div>
                        <label className="form-label">Single</label>
                        <input type="number" value={formData.shortTermRent.single} onChange={(e) => handleNestedChange('shortTermRent', 'single', e.target.value)} placeholder="₹500" className="input-field" />
                      </div>
                      <div>
                        <label className="form-label">Double</label>
                        <input type="number" value={formData.shortTermRent.double} onChange={(e) => handleNestedChange('shortTermRent', 'double', e.target.value)} placeholder="₹400" className="input-field" />
                      </div>
                      <div>
                        <label className="form-label">Triple</label>
                        <input type="number" value={formData.shortTermRent.triple} onChange={(e) => handleNestedChange('shortTermRent', 'triple', e.target.value)} placeholder="₹350" className="input-field" />
                      </div>
                    </div>
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label">Amenities Available</label>
                  <div className="amenities-grid-list">
                    {amenitiesList.map(amenity => (
                      <label key={amenity} className="amenity-checkbox-item" style={{ background: formData.amenities.includes(amenity) ? '#f0f4ff' : '#f8fafc', border: `1px solid ${formData.amenities.includes(amenity) ? theme.primary[800] : '#e2e8f0'}`, color: formData.amenities.includes(amenity) ? theme.primary[800] : '#64748b' }}>
                        <input type="checkbox" checked={formData.amenities.includes(amenity)} onChange={() => toggleAmenity(amenity)} />
                        <span className="amenity-checkbox-custom" style={{ border: `1px solid ${formData.amenities.includes(amenity) ? theme.primary[800] : '#cbd5e1'}`, background: formData.amenities.includes(amenity) ? theme.primary[800] : 'white' }} />
                        {amenity}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Upload Images (Max 10)</label>
                  <div className="image-upload-zone">
                    <input type="file" multiple accept="image/*" onChange={handleImageUpload} id="image-upload" />
                    <label htmlFor="image-upload" style={{ cursor: 'pointer', display: 'block' }}>
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5" style={{ marginBottom: '8px' }}>
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21,15 16,10 5,21"/>
                      </svg>
                      <p className="text-muted m-0">Click to upload images</p>
                    </label>
                  </div>
                  {formData.images.length > 0 && (
                    <div className="image-previews">
                      {formData.images.map((img, idx) => (
                        <div key={idx} className="image-preview-item">
                          <img src={img} alt={`Upload ${idx + 1}`} />
                          <button type="button" onClick={() => removeImage(idx)} className="image-remove-btn">×</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <h3 style={{ color: theme.primary[800], marginBottom: '20px', fontSize: '18px', fontWeight: '600' }}>
                  Bank Details & Confirm
                </h3>

                <div className="form-grid-2">
                  <div>
                    <label className="form-label">Bank Name</label>
                    <input type="text" name="bankName" value={formData.bankName} onChange={handleChange} placeholder="e.g., HDFC Bank" className="input-field" />
                  </div>
                  <div>
                    <label className="form-label">Account Holder</label>
                    <input type="text" name="accountHolder" value={formData.accountHolder} onChange={handleChange} placeholder="Name as per bank" className="input-field" />
                  </div>
                </div>

                <div className="form-grid-2">
                  <div>
                    <label className="form-label">Account Number</label>
                    <input type="text" name="accountNumber" value={formData.accountNumber} onChange={handleChange} placeholder="Your account number" className="input-field" />
                  </div>
                  <div>
                    <label className="form-label">IFSC Code</label>
                    <input type="text" name="ifscCode" value={formData.ifscCode} onChange={handleChange} placeholder="e.g., HDFC0001234" className="input-field" />
                  </div>
                </div>

                <div className="summary-card">
                  <h4 className="pricing-section-title" style={{ color: theme.primary[800] }}>Listing Summary</h4>
                  <div className="summary-grid">
                    <span className="summary-label">PG Name:</span>
                    <span className="summary-value">{formData.pgName || '-'}</span>
                    <span className="summary-label">Location:</span>
                    <span className="summary-value">{formData.area}, {formData.city}</span>
                    <span className="summary-label">For:</span>
                    <span className="summary-value">{formData.gender === 'male' ? 'Male' : formData.gender === 'female' ? 'Female' : 'Co-live'}</span>
                    <span className="summary-label">Listing:</span>
                    <span className="summary-value" style={{ color: '#16a34a', fontWeight: '600' }}>FREE</span>
                  </div>
                </div>

                <label className="terms-checkbox">
                  <input type="checkbox" name="termsAccepted" checked={formData.termsAccepted} onChange={handleChange} />
                  <span className="terms-text">
                    I agree to the <Link to="/terms">Terms</Link> and <Link to="/privacy">Privacy Policy</Link>.
                  </span>
                </label>
                {errors.termsAccepted && <span className="error-text">{errors.termsAccepted}</span>}
              </div>
            )}

            {errors.submit && (
              <div className="form-submit-error">
                {errors.submit}
              </div>
            )}
            <div className="form-actions">
              {step > 1 && (
                <button type="button" onClick={handlePrev} className="form-back-btn">Back</button>
              )}
              {step < 4 ? (
                <button type="button" onClick={handleNext} className="btn btn-primary" style={{ flex: 2, padding: '12px' }}>Continue</button>
              ) : (
                <button type="submit" disabled={submitting} className="btn" style={{ flex: 2, padding: '12px', background: submitting ? '#94a3b8' : theme.accent[500], color: 'white', cursor: submitting ? 'not-allowed' : 'pointer' }}>
                  {submitting ? 'Submitting...' : 'Submit Listing (Free)'}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ListYourPG;
