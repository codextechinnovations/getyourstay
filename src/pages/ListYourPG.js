import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { theme } from '../theme';

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
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Form submitted:', formData);
      setSubmitted(true);
    } catch (err) {
      console.error('Submission error:', err);
    }
    setSubmitting(false);
  };

  if (submitted) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#f8fafc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '48px',
          maxWidth: '480px',
          textAlign: 'center',
          boxShadow: '0 10px 40px rgba(0,0,0,0.08)'
        }}>
          <div style={{
            width: '72px',
            height: '72px',
            background: '#dcfce7',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px'
          }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2">
              <polyline points="20,6 9,17 4,12" />
            </svg>
          </div>
          <h2 style={{ color: theme.primary[800], marginBottom: '12px', fontSize: '24px', fontWeight: '700' }}>
            Listing Submitted!
          </h2>
          <p style={{ color: '#64748b', marginBottom: '24px', lineHeight: '1.6', fontSize: '15px' }}>
            Thank you for listing on GetYourStay. Our team will verify your listing and activate it within 2 hours.
          </p>
          <div style={{
            background: '#f0f9ff',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '24px',
            textAlign: 'left'
          }}>
            <p style={{ color: '#0369a1', fontSize: '14px', margin: 0 }}>
              <strong>What happens next:</strong><br/>
              1. We'll verify your listing<br/>
              2. Your listing goes live<br/>
              3. Start receiving enquiries
            </p>
          </div>
          <Link 
            to="/"
            style={{
              display: 'inline-block',
              padding: '12px 28px',
              background: theme.primary[800],
              color: 'white',
              borderRadius: '10px',
              textDecoration: 'none',
              fontWeight: '600'
            }}
          >
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <div style={{
        background: theme.primary[800],
        padding: '48px 20px',
        textAlign: 'center'
      }}>
        <h1 style={{ 
          color: 'white', 
          marginBottom: '12px', 
          fontSize: 'clamp(24px, 4vw, 36px)',
          fontWeight: '700'
        }}>
          List Your PG on GetYourStay
        </h1>
        <p style={{ 
          color: 'rgba(255,255,255,0.85)', 
          fontSize: '16px'
        }}>
          100% Free Listing • Reach 50,000+ Active Users
        </p>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 20px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          marginBottom: '40px'
        }}>
          {benefits.map((benefit, idx) => (
            <div
              key={idx}
              style={{
                background: 'white',
                borderRadius: '12px',
                padding: '20px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '14px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                border: '1px solid #e2e8f0'
              }}
            >
              <div style={{
                width: '44px',
                height: '44px',
                background: `${theme.primary[800]}10`,
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                color: theme.primary[800]
              }}>
                {benefit.icon}
              </div>
              <div>
                <h3 style={{
                  color: theme.primary[800],
                  fontSize: '15px',
                  fontWeight: '600',
                  marginBottom: '4px'
                }}>
                  {benefit.title}
                </h3>
                <p style={{
                  color: '#64748b',
                  fontSize: '13px',
                  margin: 0,
                  lineHeight: '1.5'
                }}>
                  {benefit.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h2 style={{ 
            color: theme.primary[800], 
            fontSize: '22px', 
            fontWeight: '600',
            marginBottom: '4px' 
          }}>
            Create Your Listing
          </h2>
          <p style={{ color: '#64748b', fontSize: '14px' }}>
            Fill in the details below to list your PG
          </p>
        </div>

        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '32px',
          marginBottom: '32px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div style={{
              width: '64px',
              height: '64px',
              background: `linear-gradient(135deg, ${theme.primary[800]}, ${theme.primary[500]})`,
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px'
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                <line x1="12" y1="18" x2="12.01" y2="18"/>
              </svg>
            </div>
            <h3 style={{
              color: theme.primary[800],
              fontSize: '20px',
              fontWeight: '700',
              marginBottom: '8px'
            }}>
              Also Get PG Owner App
            </h3>
            <p style={{
              color: '#64748b',
              fontSize: '14px',
              marginBottom: '16px',
              maxWidth: '400px',
              lineHeight: '1.6'
            }}>
              Manage your entire PG from your phone. Track rent, manage tenants, handle maintenance - all free with your listing!
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center', marginBottom: '16px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#64748b' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2"><polyline points="20,6 9,17 4,12"/></svg>
                Rent Tracking
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#64748b' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2"><polyline points="20,6 9,17 4,12"/></svg>
                Tenant Management
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#64748b' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2"><polyline points="20,6 9,17 4,12"/></svg>
                WhatsApp Alerts
              </span>
            </div>
            <Link
              to="/pg-management-app"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '10px 20px',
                background: '#f0f4ff',
                color: theme.primary[800],
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '600',
                border: '1px solid #c7d2fe'
              }}
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
        <div style={{
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
          overflow: 'hidden'
        }}>
          <div style={{
            display: 'flex',
            background: '#f8fafc',
            borderBottom: '1px solid #e2e8f0'
          }}>
            {['Owner Info', 'PG Details', 'Pricing', 'Review'].map((label, idx) => (
              <div
                key={idx}
                style={{
                  flex: 1,
                  padding: '14px 8px',
                  textAlign: 'center',
                  fontSize: '13px',
                  fontWeight: '500',
                  color: step === idx + 1 ? 'white' : '#64748b',
                  background: step === idx + 1 ? theme.primary[800] : 'transparent'
                }}
              >
                {idx + 1}. {label}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} style={{ padding: '28px' }}>
            {step === 1 && (
              <div>
                <h3 style={{ color: theme.primary[800], marginBottom: '20px', fontSize: '18px', fontWeight: '600' }}>
                  Owner Information
                </h3>
                
                <div style={{ marginBottom: '16px' }}>
                  <label style={labelStyle}>Full Name *</label>
                  <input
                    type="text"
                    name="ownerName"
                    value={formData.ownerName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    style={{ ...inputStyle, borderColor: errors.ownerName ? '#ef4444' : '#e2e8f0' }}
                  />
                  {errors.ownerName && <span style={errorStyle}>{errors.ownerName}</span>}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={labelStyle}>Phone Number *</label>
                    <input
                      type="tel"
                      name="ownerPhone"
                      value={formData.ownerPhone}
                      onChange={handleChange}
                      placeholder="10-digit mobile"
                      style={{ ...inputStyle, borderColor: errors.ownerPhone ? '#ef4444' : '#e2e8f0' }}
                    />
                    {errors.ownerPhone && <span style={errorStyle}>{errors.ownerPhone}</span>}
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={labelStyle}>Email Address *</label>
                    <input
                      type="email"
                      name="ownerEmail"
                      value={formData.ownerEmail}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      style={{ ...inputStyle, borderColor: errors.ownerEmail ? '#ef4444' : '#e2e8f0' }}
                    />
                    {errors.ownerEmail && <span style={errorStyle}>{errors.ownerEmail}</span>}
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h3 style={{ color: theme.primary[800], marginBottom: '20px', fontSize: '18px', fontWeight: '600' }}>
                  PG / Property Details
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={labelStyle}>PG / Property Name *</label>
                    <input
                      type="text"
                      name="pgName"
                      value={formData.pgName}
                      onChange={handleChange}
                      placeholder="e.g., Green Valley PG"
                      style={{ ...inputStyle, borderColor: errors.pgName ? '#ef4444' : '#e2e8f0' }}
                    />
                    {errors.pgName && <span style={errorStyle}>{errors.pgName}</span>}
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={labelStyle}>Property Type</label>
                    <select
                      name="pgType"
                      value={formData.pgType}
                      onChange={handleChange}
                      style={{ ...inputStyle, cursor: 'pointer' }}
                    >
                      <option value="pg">PG / Hostel</option>
                      <option value="hotel">Hotel</option>
                      <option value="flat">Flat / Apartment</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={labelStyle}>For Gender *</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      style={{ ...inputStyle, cursor: 'pointer' }}
                    >
                      <option value="male">Male Only</option>
                      <option value="female">Female Only</option>
                      <option value="colive">Co-live / Unisex</option>
                    </select>
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={labelStyle}>Area / Location *</label>
                    <select
                      name="area"
                      value={formData.area}
                      onChange={handleChange}
                      style={{ ...inputStyle, cursor: 'pointer', borderColor: errors.area ? '#ef4444' : '#e2e8f0' }}
                    >
                      <option value="">Select Area</option>
                      {areas.map(area => (
                        <option key={area} value={area}>{area}</option>
                      ))}
                    </select>
                    {errors.area && <span style={errorStyle}>{errors.area}</span>}
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={labelStyle}>Full Address *</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="House no., Street, Landmark"
                    rows={2}
                    style={{ ...inputStyle, resize: 'vertical', borderColor: errors.address ? '#ef4444' : '#e2e8f0' }}
                  />
                  {errors.address && <span style={errorStyle}>{errors.address}</span>}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={labelStyle}>City *</label>
                    <input type="text" name="city" value={formData.city} onChange={handleChange} style={inputStyle} />
                  </div>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={labelStyle}>State</label>
                    <input type="text" name="state" value={formData.state} onChange={handleChange} style={inputStyle} />
                  </div>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={labelStyle}>Pincode *</label>
                    <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} placeholder="6-digit" maxLength={6} style={{ ...inputStyle, borderColor: errors.pincode ? '#ef4444' : '#e2e8f0' }} />
                    {errors.pincode && <span style={errorStyle}>{errors.pincode}</span>}
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={labelStyle}>Description</label>
                  <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Describe your PG..." rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={labelStyle}>Total Rooms Available</label>
                  <input type="number" name="totalRooms" value={formData.totalRooms} onChange={handleChange} placeholder="e.g., 20" min="1" style={inputStyle} />
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h3 style={{ color: theme.primary[800], marginBottom: '20px', fontSize: '18px', fontWeight: '600' }}>
                  Pricing & Amenities
                </h3>

                <div style={{ marginBottom: '20px' }}>
                  <label style={labelStyle}>Rental Type</label>
                  <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                    {[{ value: 'long_term', label: 'Monthly Only' }, { value: 'short_term', label: 'Daily Only' }, { value: 'both', label: 'Both' }].map(option => (
                      <label key={option.value} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px', border: `2px solid ${formData.rentalType === option.value ? theme.primary[800] : '#e2e8f0'}`, borderRadius: '8px', cursor: 'pointer', background: formData.rentalType === option.value ? '#f0f4ff' : 'white' }}>
                        <input type="radio" name="rentalType" value={option.value} checked={formData.rentalType === option.value} onChange={handleChange} style={{ display: 'none' }} />
                        <span style={{ color: formData.rentalType === option.value ? theme.primary[800] : '#64748b', fontWeight: '500', fontSize: '13px' }}>{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {(formData.rentalType === 'long_term' || formData.rentalType === 'both') && (
                  <div style={{ background: '#f8fafc', borderRadius: '10px', padding: '16px', marginBottom: '16px' }}>
                    <h4 style={{ color: theme.primary[800], marginBottom: '12px', fontSize: '14px', fontWeight: '600' }}>Monthly Rent (₹)</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                      <div>
                        <label style={labelStyle}>Single</label>
                        <input type="number" value={formData.longTermRent.single} onChange={(e) => handleNestedChange('longTermRent', 'single', e.target.value)} placeholder="₹8000" style={inputStyle} />
                      </div>
                      <div>
                        <label style={labelStyle}>Double</label>
                        <input type="number" value={formData.longTermRent.double} onChange={(e) => handleNestedChange('longTermRent', 'double', e.target.value)} placeholder="₹6000" style={inputStyle} />
                      </div>
                      <div>
                        <label style={labelStyle}>Triple</label>
                        <input type="number" value={formData.longTermRent.triple} onChange={(e) => handleNestedChange('longTermRent', 'triple', e.target.value)} placeholder="₹5000" style={inputStyle} />
                      </div>
                    </div>
                  </div>
                )}

                {(formData.rentalType === 'short_term' || formData.rentalType === 'both') && (
                  <div style={{ background: '#f8fafc', borderRadius: '10px', padding: '16px', marginBottom: '16px' }}>
                    <h4 style={{ color: '#15803d', marginBottom: '12px', fontSize: '14px', fontWeight: '600' }}>Daily Rent (₹)</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                      <div>
                        <label style={labelStyle}>Single</label>
                        <input type="number" value={formData.shortTermRent.single} onChange={(e) => handleNestedChange('shortTermRent', 'single', e.target.value)} placeholder="₹500" style={inputStyle} />
                      </div>
                      <div>
                        <label style={labelStyle}>Double</label>
                        <input type="number" value={formData.shortTermRent.double} onChange={(e) => handleNestedChange('shortTermRent', 'double', e.target.value)} placeholder="₹400" style={inputStyle} />
                      </div>
                      <div>
                        <label style={labelStyle}>Triple</label>
                        <input type="number" value={formData.shortTermRent.triple} onChange={(e) => handleNestedChange('shortTermRent', 'triple', e.target.value)} placeholder="₹350" style={inputStyle} />
                      </div>
                    </div>
                  </div>
                )}

                <div style={{ marginBottom: '20px' }}>
                  <label style={labelStyle}>Amenities Available</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '8px', marginTop: '8px' }}>
                    {amenitiesList.map(amenity => (
                      <label key={amenity} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px', background: formData.amenities.includes(amenity) ? '#f0f4ff' : '#f8fafc', border: `1px solid ${formData.amenities.includes(amenity) ? theme.primary[800] : '#e2e8f0'}`, borderRadius: '6px', cursor: 'pointer', fontSize: '13px', color: formData.amenities.includes(amenity) ? theme.primary[800] : '#64748b' }}>
                        <input type="checkbox" checked={formData.amenities.includes(amenity)} onChange={() => toggleAmenity(amenity)} style={{ display: 'none' }} />
                        <span style={{ width: '16px', height: '16px', borderRadius: '4px', border: `1px solid ${formData.amenities.includes(amenity) ? theme.primary[800] : '#cbd5e1'}`, background: formData.amenities.includes(amenity) ? theme.primary[800] : 'white' }} />
                        {amenity}
                      </label>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={labelStyle}>Upload Images (Max 10)</label>
                  <div style={{ border: '2px dashed #e2e8f0', borderRadius: '10px', padding: '24px', textAlign: 'center', background: '#f8fafc', cursor: 'pointer', marginTop: '8px' }}>
                    <input type="file" multiple accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} id="image-upload" />
                    <label htmlFor="image-upload" style={{ cursor: 'pointer', display: 'block' }}>
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5" style={{ marginBottom: '8px' }}>
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21,15 16,10 5,21"/>
                      </svg>
                      <p style={{ color: '#64748b', margin: 0, fontSize: '13px' }}>Click to upload images</p>
                    </label>
                  </div>
                  {formData.images.length > 0 && (
                    <div style={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
                      {formData.images.map((img, idx) => (
                        <div key={idx} style={{ position: 'relative', width: '80px', height: '80px' }}>
                          <img src={img} alt={`Upload ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                          <button type="button" onClick={() => removeImage(idx)} style={{ position: 'absolute', top: '-6px', right: '-6px', width: '20px', height: '20px', borderRadius: '50%', background: '#ef4444', color: 'white', border: 'none', cursor: 'pointer', fontSize: '12px' }}>×</button>
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

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={labelStyle}>Bank Name</label>
                    <input type="text" name="bankName" value={formData.bankName} onChange={handleChange} placeholder="e.g., HDFC Bank" style={inputStyle} />
                  </div>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={labelStyle}>Account Holder</label>
                    <input type="text" name="accountHolder" value={formData.accountHolder} onChange={handleChange} placeholder="Name as per bank" style={inputStyle} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={labelStyle}>Account Number</label>
                    <input type="text" name="accountNumber" value={formData.accountNumber} onChange={handleChange} placeholder="Your account number" style={inputStyle} />
                  </div>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={labelStyle}>IFSC Code</label>
                    <input type="text" name="ifscCode" value={formData.ifscCode} onChange={handleChange} placeholder="e.g., HDFC0001234" style={inputStyle} />
                  </div>
                </div>

                <div style={{ background: '#f8fafc', borderRadius: '10px', padding: '16px', marginBottom: '16px' }}>
                  <h4 style={{ color: theme.primary[800], marginBottom: '12px', fontSize: '14px', fontWeight: '600' }}>Listing Summary</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '13px' }}>
                    <span style={{ color: '#64748b' }}>PG Name:</span>
                    <span style={{ color: theme.primary[800], fontWeight: '500' }}>{formData.pgName || '-'}</span>
                    <span style={{ color: '#64748b' }}>Location:</span>
                    <span style={{ color: theme.primary[800], fontWeight: '500' }}>{formData.area}, {formData.city}</span>
                    <span style={{ color: '#64748b' }}>For:</span>
                    <span style={{ color: theme.primary[800], fontWeight: '500' }}>{formData.gender === 'male' ? 'Male' : formData.gender === 'female' ? 'Female' : 'Co-live'}</span>
                    <span style={{ color: '#64748b' }}>Listing:</span>
                    <span style={{ color: '#16a34a', fontWeight: '600' }}>FREE</span>
                  </div>
                </div>

                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer', marginBottom: '16px' }}>
                  <input type="checkbox" name="termsAccepted" checked={formData.termsAccepted} onChange={handleChange} style={{ marginTop: '3px', width: '16px', height: '16px' }} />
                  <span style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.5' }}>
                    I agree to the <Link to="/terms" style={{ color: theme.primary[800], fontWeight: '500' }}>Terms</Link> and <Link to="/privacy" style={{ color: theme.primary[800], fontWeight: '500' }}>Privacy Policy</Link>.
                  </span>
                </label>
                {errors.termsAccepted && <span style={errorStyle}>{errors.termsAccepted}</span>}
              </div>
            )}

            <div style={{ display: 'flex', gap: '12px', marginTop: '24px', paddingTop: '20px', borderTop: '1px solid #e2e8f0' }}>
              {step > 1 && (
                <button type="button" onClick={handlePrev} style={{ flex: 1, padding: '12px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', fontWeight: '500', color: '#64748b', cursor: 'pointer' }}>Back</button>
              )}
              {step < 4 ? (
                <button type="button" onClick={handleNext} style={{ flex: 2, padding: '12px', background: theme.primary[800], border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: '600', color: 'white', cursor: 'pointer' }}>Continue</button>
              ) : (
                <button type="submit" disabled={submitting} style={{ flex: 2, padding: '12px', background: submitting ? '#94a3b8' : theme.accent[500], border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: '600', color: 'white', cursor: submitting ? 'not-allowed' : 'pointer' }}>
                  {submitting ? 'Submitting...' : 'Submit Listing (Free)'}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          div[style*="gridTemplateColumns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
          div[style*="gridTemplateColumns: 1fr 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

const labelStyle = { display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '500', color: '#374151' };
const inputStyle = { width: '100%', padding: '10px 12px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' };
const errorStyle = { display: 'block', marginTop: '4px', fontSize: '12px', color: '#ef4444' };

export default ListYourPG;
