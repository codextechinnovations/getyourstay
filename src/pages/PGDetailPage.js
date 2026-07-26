import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PGCard from '../components/PGCard';
import { pgApi, hostelApiClient } from '../services/api';
import { getPGCanonicalUrl } from '../utils/slugify';

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=300&fit=crop';

const normalizePG = (pg) => ({
  id: pg?.id || pg?._id || '',
  ownerId: pg?.ownerId || '',
  name: pg?.name || 'PG Accommodation',
  area: pg?.area || pg?.city || '',
  address: pg?.address || '',
  city: pg?.city || 'Bangalore',
  state: pg?.state || 'Karnataka',
  price: pg?.price || 0,
  rating: pg?.rating || 0,
  reviews: pg?.reviews || 0,
  amenities: Array.isArray(pg?.amenities) ? pg.amenities : [],
  gender: pg?.gender || pg?.type || 'Unisex',
  lat: pg?.lat || pg?.latitude || null,
  lng: pg?.lng || pg?.longitude || null,
  distance: pg?.distance || null,
  walkTime: pg?.walkTime || null,
  images: Array.isArray(pg?.images) && pg.images.length > 0 ? pg.images : [DEFAULT_IMAGE],
  videos: Array.isArray(pg?.videos) ? pg.videos : [],
  isVerified: pg?.isVerified ?? true,
  isAvailable: pg?.isAvailable ?? false,
  description: pg?.description || `Find ${pg?.name || 'this PG'} in ${pg?.area || 'Bangalore'} with verified amenities and transparent pricing.`,
  phone: pg?.phone || '',
  owner: pg?.owner || '',
  ownerPhone: pg?.ownerPhone || pg?.phone || '',
  totalRooms: pg?.totalRooms || 0,
  totalBeds: pg?.totalBeds || 0,
  type: pg?.type || 'colive',
  rentalType: pg?.rentalType || 'long_term',
  longTermRent: pg?.longTermRent || { single: 0, double: 0, triple: pg?.price || 0, four: 0 },
  shortTermRent: pg?.shortTermRent || { single: 0, double: 0, triple: 0, four: 0 },
  checkin_url: pg?.checkin_url,
  bannerImage: pg?.bannerImage || (Array.isArray(pg?.images) && pg.images.length > 0 ? pg.images[0] : DEFAULT_IMAGE),
  imageCategories: pg?.imageCategories || {},
  rooms: pg?.rooms || [],
  availability: pg?.availability || null,
  tenantCount: pg?.tenantCount || 0,
  nearbyPlaces: pg?.nearbyPlaces || [],
  food: pg?.food || null,
  mealCount: pg?.mealCount || 3,
  managerName: pg?.managerName || pg?.owner || '',
  propertyType: (pg?.type || '').toLowerCase() === 'hostel' ? 'hostel' : 'pg',
});

const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'amenities', label: 'Amenities' },
  { id: 'rooms', label: 'Rooms & Pricing' },
  { id: 'food', label: 'Food' },
  { id: 'rules', label: 'House Rules' },
  { id: 'location', label: 'Location' },
  { id: 'faqs', label: 'FAQs' },
];

const formatMoney = (n) => `₹${(n || 0).toLocaleString()}`;

const getMinRoomPrice = (pg) => {
  const roomPrices = (pg.rooms || [])
    .map(r => Number(r.rentPerBed || r.rent_per_bed || r.rent || 0))
    .filter(p => p > 0);
  return roomPrices.length ? Math.min(...roomPrices) : 0;
};

const getStartingPrice = (pg) => {
  if (pg.price > 0) return pg.price;
  return getMinRoomPrice(pg);
};

const getGroupedRooms = (pg) => {
  const grouped = (pg.rooms || []).reduce((acc, room) => {
    const type = (room.type || room.room_type || 'Room').toLowerCase();
    const rent = Number(room.rentPerBed || room.rent_per_bed || room.rent || 0);
    const capacity = Number(room.capacity || 1);
    const occupied = Number(room.occupied_beds || room.occupiedBeds || 0);
    const available = Math.max(0, capacity - occupied);

    if (!acc[type]) {
      acc[type] = {
        type,
        displayType: (room.type || room.room_type || 'Room').replace(/\b\w/g, c => c.toUpperCase()),
        minRent: rent,
        maxRent: rent,
        capacity,
        available,
        count: 1
      };
    } else {
      acc[type].minRent = Math.min(acc[type].minRent, rent || acc[type].minRent);
      acc[type].maxRent = Math.max(acc[type].maxRent, rent || acc[type].maxRent);
      acc[type].capacity += capacity;
      acc[type].available += available;
      acc[type].count += 1;
    }
    return acc;
  }, {});

  return Object.values(grouped).sort((a, b) => a.capacity - b.capacity);
};

const getAmenityIcon = (amenity) => {
  const key = String(amenity).toLowerCase().replace(/[^a-z]/g, '');
  const icons = {
    wifi: '📶', ac: '❄️', airconditioning: '❄️', food: '🍽️', meals: '🍽️',
    laundry: '👕', washingmachine: '🧺', parking: '🅿️', lift: '🛗',
    generator: '🔋', powebackup: '⚡', onlinemaintenance: '🔧', maintenance: '🔧',
    gym: '💪', pool: '🏊', security: '🔒', cctv: '📹', tvroom: '📺',
    housekeeping: '🧹', garden: '🌳', spa: '💆', concierge: '🛎️',
    firesafety: '🧯', fridge: '🧊', refrigerator: '🧊', microwave: '🔥',
    geyser: '🚿', waterpurifier: '💧', housekeepingdaily: '🧹',
    hottwater: '♨️', cupboard: '🚪', wardrobe: '🚪', balcony: '🏙️',
    attachedbathroom: '🛁', bathroom: '🛁', studytable: '📚', chair: '💺',
  };
  return icons[key] || '✓';
};

const getPropertyLabel = (pg) => pg.propertyType === 'hostel' ? 'Hostel' : 'PG';

const getGenderColor = (gender) => {
  if (gender === 'Female') return { bg: '#fce7f3', color: '#9d174d' };
  if (gender === 'Male') return { bg: '#dbeafe', color: '#1d4ed8' };
  return { bg: '#ede9fe', color: '#6d28d9' };
};

const getNearbyLandmarks = (pg) => {
  if (pg.nearbyPlaces?.length) return pg.nearbyPlaces;
  const area = pg.area?.toLowerCase() || '';
  const defaults = {
    'koramangala': ['Sony World Signal', 'Koramangala BDA Complex', 'St. John\'s Hospital'],
    'indiranagar': ['Indiranagar 100ft Road', 'Metro Station', 'Manipal Hospital'],
    'hsr layout': ['HSR BDA Complex', 'Agara Lake', 'Outer Ring Road'],
    'whitefield': ['ITPL', 'Phoenix Marketcity', 'Vydehi Hospital'],
    'marathahalli': ['Marathahalli Bridge', 'Innovative Multiplex', 'KLM Mall'],
    'electronic city': ['Infosys', 'Wipro', 'Electronic City Phase 1'],
  };
  return defaults[area] || ['Local Market', 'Metro/Bus Stop', 'Hospitals & Pharmacies'];
};

const getFoodMenu = (pg) => {
  if (pg.food && Array.isArray(pg.food.menu)) return pg.food.menu;
  return [
    { day: 'Monday', breakfast: 'Idli, Sambar, Chutney', lunch: 'Rice, Dal, Sabzi, Curd', dinner: 'Chapati, Paneer Curry, Rice' },
    { day: 'Tuesday', breakfast: 'Poha, Tea/Coffee', lunch: 'Rice, Rajma, Salad', dinner: 'Mixed Veg, Dal, Chapati' },
    { day: 'Wednesday', breakfast: 'Paratha, Curd', lunch: 'Rice, Sambar, Poriyal', dinner: 'Chole Bhature / Rice' },
    { day: 'Thursday', breakfast: 'Upma, Chutney', lunch: 'Rice, Dal Fry, Sabzi', dinner: 'Veg Biryani, Raita' },
    { day: 'Friday', breakfast: 'Dosa, Sambar', lunch: 'Rice, Rasam, Fryums', dinner: 'Chapati, Seasonal Curry' },
    { day: 'Saturday', breakfast: 'Bread, Butter, Jam', lunch: 'Rice, Kadhi, Pakora', dinner: 'Fried Rice, Manchurian' },
    { day: 'Sunday', breakfast: 'Masala Dosa / Poori', lunch: 'Special Rice, Dal, Sweet', dinner: 'Chapati, Dal, Dessert' },
  ];
};



const generatePGFAQs = (pg) => [
  {
    q: `Is ${pg.name} available for rent in ${pg.area}?`,
    a: `Yes, ${pg.name} is available for rent in ${pg.area}, ${pg.city}. It is a ${pg.gender.toLowerCase()} PG with ${pg.totalRooms || 'multiple'} rooms and modern amenities. You can contact the owner directly to schedule a visit and confirm current availability.`
  },
  {
    q: `What is the rent at ${pg.name}?`,
    a: `The rent at ${pg.name} starts from ${(getStartingPrice(pg) > 0 ? formatMoney(getStartingPrice(pg)) : 'contact price')} per month. Room-wise rent varies based on occupancy type (single, double, triple sharing). Contact the owner for exact pricing and any current offers.`
  },
  {
    q: `What amenities are provided at ${pg.name}?`,
    a: `${pg.name} offers ${pg.amenities.slice(0, 8).join(', ')}${pg.amenities.length > 8 ? ' and more' : ''}. These amenities are designed to provide a comfortable and hassle-free stay for students and working professionals.`
  },
  {
    q: `Is ${pg.name} safe for ${pg.gender === 'Female' ? 'girls' : pg.gender === 'Male' ? 'boys' : 'students'}?`,
    a: `Yes, ${pg.name} is a verified property on GetYourStay. It follows standard safety protocols including security measures, verified owner details, and transparent pricing. For female-only PGs, additional safety features like restricted entry and CCTV are typically available.`
  },
  {
    q: `How can I book a room at ${pg.name}?`,
    a: `You can book a room at ${pg.name} by contacting the owner directly via phone or WhatsApp. Schedule a visit to inspect the property, review the rental agreement, and complete the booking by paying the first month's rent and security deposit. GetYourStay does not charge any brokerage fees to tenants.`
  },
  {
    q: `What documents are required to book ${pg.name}?`,
    a: `To book a room at ${pg.name}, you typically need a valid ID proof (Aadhaar, PAN, or Passport), address proof, passport-size photographs, and college or company ID if applicable. Some PGs may require a police verification form after move-in.`
  },
  {
    q: `Does ${pg.name} provide food?`,
    a: pg.amenities.some(a => a.toLowerCase().includes('food'))
      ? `Yes, ${pg.name} provides food as part of its amenities. The PG offers hygienic meals including breakfast, lunch, and dinner. Contact the owner for detailed menu and timing information.`
      : `${pg.name} does not list food as a standard amenity. However, nearby restaurants, tiffin services, and food delivery options are usually available in ${pg.area}. You can confirm with the owner for any additional meal arrangements.`
  },
  {
    q: `What is the security deposit at ${pg.name}?`,
    a: `The security deposit at ${pg.name} is typically one to two months of rent, which is standard for PG accommodations in ${pg.area}. The deposit is refundable at the time of vacating, subject to the terms in your rental agreement.`
  }
];

const PGDetailPage = () => {
  const { id, slug } = useParams();
  const [pg, setPg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [similarPGs, setSimilarPGs] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [mainImage, setMainImage] = useState(0);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [enquiry, setEnquiry] = useState({ name: '', phone: '', email: '', message: '', moveIn: '' });
  const [enquirySent, setEnquirySent] = useState(false);
  const sectionRefs = useRef({});

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id, slug]);

  useEffect(() => {
    const fetchPG = async () => {
      setLoading(true);
      setError(null);

      try {
        const pgId = id || slug?.split('-').pop();
        if (!pgId) {
          setError('Invalid PG URL');
          setLoading(false);
          return;
        }

        const extractData = (res) => {
          if (res?.success && res.data && (res.data.id || res.data._id)) return res.data;
          if (res && (res.id || res._id) && !res.success === false) return res;
          return null;
        };

        let pgData = null;
        let isHostel = false;

        try {
          const pgResponse = await pgApi.getById(pgId);
          pgData = extractData(pgResponse);
        } catch (pgErr) {
          console.log('PG API detail error:', pgErr);
        }

        // Fallback to hostel API if not found in PG API
        if (!pgData) {
          try {
            const hostelResponse = await hostelApiClient.getById(pgId);
            pgData = extractData(hostelResponse);
            if (pgData) isHostel = true;
          } catch (hostelErr) {
            console.log('Hostel API fallback error:', hostelErr);
          }
        }

        if (!pgData) {
          setError('The property you are looking for does not exist or has been removed.');
          setLoading(false);
          return;
        }

        const normalized = normalizePG({ ...pgData, type: isHostel ? 'hostel' : pgData.type });
        setPg(normalized);
        setMainImage(0);

        try {
          const similarApi = isHostel ? hostelApiClient : pgApi;
          const similarResponse = await similarApi.getAll({ area: normalized.area, limit: 5, page: 1 });
          let similarList = [];
          if (similarResponse?.success && Array.isArray(similarResponse.data)) {
            similarList = similarResponse.data;
          } else if (Array.isArray(similarResponse)) {
            similarList = similarResponse;
          }
          setSimilarPGs(similarList.map(item => normalizePG({ ...item, type: isHostel ? 'hostel' : item.type })).filter(p => String(p.id) !== String(pgId)).slice(0, 3));
        } catch (simErr) {
          console.log('Error fetching similar properties:', simErr);
        }
      } catch (err) {
        console.error('Error fetching property detail:', err);
        setError('Failed to load property details. Please try again.');
      }

      setLoading(false);
    };

    fetchPG();
  }, [id, slug]);

  useEffect(() => {
    if (!pg) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    );

    SECTIONS.forEach((section) => {
      const el = sectionRefs.current[section.id];
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pg]);

  const scrollToSection = (sectionId) => {
    const el = sectionRefs.current[sectionId];
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 110;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveTab(sectionId);
    }
  };

  useEffect(() => {
    if (!pg) return;

    const priceText = getStartingPrice(pg) > 0 ? formatMoney(getStartingPrice(pg)) : 'Contact for price';
    const title = `${pg.name} in ${pg.area} ${pg.city || 'Bangalore'} | Rent ${priceText}/mo | GetYourStay`;
    const propertyLabel = getPropertyLabel(pg);
    const description = `Book ${pg.name} in ${pg.area}, ${pg.city || 'Bangalore'}. ${pg.gender} ${propertyLabel} with ${pg.amenities.slice(0, 6).join(', ')}. Starting ${priceText}/month. Verified listing with photos, pricing and owner contact on GetYourStay.`;
    const keywords = `${pg.name} ${pg.area}, ${propertyLabel} in ${pg.area} ${pg.city || 'Bangalore'}, ${pg.gender} ${propertyLabel} ${pg.area}, paying guest ${pg.area}, ${propertyLabel} near ${pg.area}, ${propertyLabel} with ${pg.amenities.slice(0, 4).join(' ')}`;
    const canonical = getPGCanonicalUrl(pg);

    document.title = title;

    const setMeta = (name, content, isProperty = false) => {
      const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        if (isProperty) el.setAttribute('property', name);
        else el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('description', description);
    setMeta('keywords', keywords);
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:url', canonical, true);
    setMeta('og:image', pg.bannerImage || pg.images?.[0] || DEFAULT_IMAGE, true);
    setMeta('twitter:title', title, true);
    setMeta('twitter:description', description, true);
    setMeta('twitter:image', pg.bannerImage || pg.images?.[0] || DEFAULT_IMAGE, true);

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonical);

    const faqs = generatePGFAQs(pg);
    const structuredData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'RealEstateListing',
          '@id': canonical,
          name: pg.name,
          description: pg.description,
          url: canonical,
          image: pg.images,
          address: {
            '@type': 'PostalAddress',
            streetAddress: pg.address,
            addressLocality: pg.area,
            addressRegion: pg.state || 'Karnataka',
            addressCountry: 'IN'
          },
          geo: pg.lat && pg.lng ? {
            '@type': 'GeoCoordinates',
            latitude: pg.lat,
            longitude: pg.lng
          } : undefined,
          price: getStartingPrice(pg) > 0 ? `${formatMoney(getStartingPrice(pg))}/month` : 'Contact for price',
          priceCurrency: 'INR',
          numberOfRooms: pg.totalRooms || undefined,
          amenityFeature: pg.amenities.map(a => ({
            '@type': 'LocationFeatureSpecification',
            name: a,
            value: true
          }))
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.getyourstay.in/' },
            { '@type': 'ListItem', position: 2, name: `${propertyLabel} in ${pg.city || 'Bangalore'}`, item: 'https://www.getyourstay.in/' },
            { '@type': 'ListItem', position: 3, name: `${propertyLabel} in ${pg.area}`, item: `https://www.getyourstay.in/?area=${encodeURIComponent(pg.area)}` },
            { '@type': 'ListItem', position: 4, name: pg.name, item: canonical }
          ]
        },
        {
          '@type': 'FAQPage',
          mainEntity: faqs.map(faq => ({
            '@type': 'Question',
            name: faq.q,
            acceptedAnswer: { '@type': 'Answer', text: faq.a }
          }))
        }
      ].filter(Boolean)
    };

    const existingScript = document.querySelector('script[data-pg-detail-schema="true"]');
    if (existingScript) existingScript.remove();

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-pg-detail-schema', 'true');
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.querySelector('script[data-pg-detail-schema="true"]');
      if (scriptToRemove) scriptToRemove.remove();
    };
  }, [pg]);

  const handleWhatsApp = (e) => {
    e?.preventDefault();
    const phone = (pg?.ownerPhone || pg?.phone || '').replace(/\D/g, '');
    if (phone) {
      const message = encodeURIComponent(`Hi, I am interested in your PG "${pg.name}" in ${pg.area}. Is it available?`);
      window.open(`https://wa.me/91${phone}?text=${message}`, '_blank');
    }
  };

  const handleCall = (e) => {
    e?.preventDefault();
    if (pg?.ownerPhone || pg?.phone) {
      window.location.href = `tel:${pg.ownerPhone || pg.phone}`;
    }
  };

  const handleEnquiry = (e) => {
    e.preventDefault();
    const phone = (pg?.ownerPhone || pg?.phone || '').replace(/\D/g, '');
    const msg = encodeURIComponent(
      `Hi, I am ${enquiry.name || 'interested'} looking for a PG at ${pg.name}, ${pg.area}. ` +
      `Move-in: ${enquiry.moveIn || 'ASAP'}. ${enquiry.message || 'Please share availability and rent details.'}`
    );
    if (phone) window.open(`https://wa.me/91${phone}?text=${msg}`, '_blank');
    setEnquirySent(true);
    setTimeout(() => setEnquirySent(false), 4000);
  };

  if (loading) {
    return (
      <div className="page-loader-container" style={{ minHeight: '60vh' }}>
        <div className="page-loader"></div>
        <p>Loading property details...</p>
      </div>
    );
  }

  if (error || !pg) {
    return (
      <div className="not-found" style={{ minHeight: '60vh', padding: '60px 20px' }}>
        <div style={{ fontSize: '80px', marginBottom: '20px' }}>🏠</div>
        <h1>{error || 'Property Not Found'}</h1>
        <p>The property you are looking for doesn't exist or has been removed.</p>
        <Link to="/" className="btn-home">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          Back to Home
        </Link>
      </div>
    );
  }

  const faqs = generatePGFAQs(pg);
  const hasRooms = (pg.rooms || []).length > 0;
  const groupedRooms = getGroupedRooms(pg);
  const genderStyle = getGenderColor(pg.gender);
  const displayImages = pg.images.slice(0, 5);
  const extraImageCount = Math.max(0, pg.images.length - 5);
  const startingPrice = getStartingPrice(pg);
  const nearby = getNearbyLandmarks(pg);
  const foodMenu = getFoodMenu(pg);
  const hasFood = pg.amenities.some(a => a.toLowerCase().includes('food'));
  const propertyLabel = getPropertyLabel(pg);

  return (
    <div className="pg-detail-page-root">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="pg-detail-breadcrumb">
        <ol className="pg-detail-breadcrumb__list">
          <li><Link to="/" className="pg-detail-breadcrumb__link">Home</Link></li>
          <li className="pg-detail-breadcrumb__sep">›</li>
          <li><Link to="/" className="pg-detail-breadcrumb__link">{propertyLabel} in {pg.city || 'Bangalore'}</Link></li>
          <li className="pg-detail-breadcrumb__sep">›</li>
          <li><Link to={`/?area=${encodeURIComponent(pg.area)}`} className="pg-detail-breadcrumb__link">{propertyLabel} in {pg.area}</Link></li>
          <li className="pg-detail-breadcrumb__sep">›</li>
          <li className="pg-detail-breadcrumb__active">{pg.name}</li>
        </ol>
      </nav>

      {/* Hero Header */}
      <header className="pg-detail-hero">
        <div className="pg-detail-hero-content">
          <div className="pg-detail-hero-badges">
            <span className="pg-detail-gender-badge" style={{ background: genderStyle.bg, color: genderStyle.color }}>{pg.gender} {propertyLabel}</span>
            {pg.isVerified && <span className="pg-detail-verified-badge">✓ Verified</span>}
            <span className="pg-detail-rating">★ {pg.rating.toFixed(1)} ({pg.reviews} reviews)</span>
          </div>
          <h1 className="pg-detail-title">{pg.name}</h1>
          <p className="pg-detail-address">📍 {pg.address || pg.area}, {pg.city || 'Bangalore'}</p>
          <div className="pg-detail-hero-highlights">
            <span>🏠 {pg.totalRooms || 'Multiple'} Rooms</span>
            <span>🛏️ {pg.totalBeds || groupedRooms.reduce((s, r) => s + r.capacity, 0)} Beds</span>
            <span>👥 {pg.tenantCount || 'Many'} Happy Tenants</span>
          </div>
        </div>
      </header>

      {/* Photo Gallery */}
      <section className="pg-detail-gallery-section">
        <div className="pg-detail-gallery-main">
          <img src={displayImages[mainImage] || pg.bannerImage} alt={pg.name} />
          {extraImageCount > 0 && !showAllPhotos && (
            <button className="pg-detail-gallery-more" onClick={() => setShowAllPhotos(true)}>
              +{extraImageCount} Photos
            </button>
          )}
        </div>
        <div className="pg-detail-gallery-thumbs">
          {displayImages.map((img, idx) => (
            <button
              key={idx}
              className={`pg-detail-gallery-thumb ${mainImage === idx ? 'active' : ''}`}
              onClick={() => setMainImage(idx)}
            >
              <img src={img} alt={`${pg.name} view ${idx + 1}`} />
            </button>
          ))}
        </div>
      </section>

      {/* Sticky tabs */}
      <div className="pg-detail-tabs-sticky">
        <div className="pg-detail-tabs">
          {SECTIONS.map((section) => (
            <button
              key={section.id}
              className={`pg-detail-tab ${activeTab === section.id ? 'active' : ''}`}
              onClick={() => scrollToSection(section.id)}
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>

      <div className="pg-detail-page-layout">
        {/* Main content */}
        <div className="pg-detail-main">
          {/* Overview */}
          <section ref={(el) => (sectionRefs.current.overview = el)} id="overview" className="pg-detail-section pg-detail-overview">
            <h2 className="pg-detail-section-heading">About {pg.name}</h2>
            <p className="pg-detail-section-text">{pg.description}</p>

            <div className="pg-detail-quick-stats">
              <div className="pg-detail-quick-stat">
                <span className="pg-detail-quick-stat-icon">💰</span>
                <span className="pg-detail-quick-stat-label">Starting Rent</span>
                <span className="pg-detail-quick-stat-value">{startingPrice > 0 ? formatMoney(startingPrice) : 'Contact'}/mo</span>
              </div>
              <div className="pg-detail-quick-stat">
                <span className="pg-detail-quick-stat-icon">🔐</span>
                <span className="pg-detail-quick-stat-label">Security Deposit</span>
                <span className="pg-detail-quick-stat-value">{startingPrice > 0 ? formatMoney(startingPrice * 2) : 'Contact'}</span>
              </div>
              <div className="pg-detail-quick-stat">
                <span className="pg-detail-quick-stat-icon">📅</span>
                <span className="pg-detail-quick-stat-label">Lock-in</span>
                <span className="pg-detail-quick-stat-value">1 Month</span>
              </div>
              <div className="pg-detail-quick-stat">
                <span className="pg-detail-quick-stat-icon">⏳</span>
                <span className="pg-detail-quick-stat-label">Notice Period</span>
                <span className="pg-detail-quick-stat-value">1 Month</span>
              </div>
              <div className="pg-detail-quick-stat">
                <span className="pg-detail-quick-stat-icon">🍽️</span>
                <span className="pg-detail-quick-stat-label">Food</span>
                <span className="pg-detail-quick-stat-value">{hasFood ? 'Included' : 'Optional'}</span>
              </div>
              <div className="pg-detail-quick-stat">
                <span className="pg-detail-quick-stat-icon">🛜</span>
                <span className="pg-detail-quick-stat-label">WiFi</span>
                <span className="pg-detail-quick-stat-value">{pg.amenities.some(a => a.toLowerCase().includes('wifi')) ? 'Free' : 'Available'}</span>
              </div>
            </div>

            <div className="pg-detail-trust-badges">
              <div className="pg-detail-trust-badge">
                <span className="pg-detail-trust-icon">🛡️</span>
                <div>
                  <strong>Verified Listing</strong>
                  <span>Owner details checked by GetYourStay</span>
                </div>
              </div>
              <div className="pg-detail-trust-badge">
                <span className="pg-detail-trust-icon">🚫</span>
                <div>
                  <strong>No Brokerage</strong>
                  <span>Directly deal with the owner</span>
                </div>
              </div>
              <div className="pg-detail-trust-badge">
                <span className="pg-detail-trust-icon">📞</span>
                <div>
                  <strong>Instant Connect</strong>
                  <span>Call or WhatsApp owner now</span>
                </div>
              </div>
            </div>
          </section>

          {/* Amenities */}
          <section ref={(el) => (sectionRefs.current.amenities = el)} id="amenities" className="pg-detail-section">
            <h2 className="pg-detail-section-heading">Amenities & Facilities</h2>
            <div className="pg-detail-amenities-grid-large">
              {pg.amenities.map((amenity, idx) => (
                <div className="pg-detail-amenity-card" key={idx}>
                  <span className="pg-detail-amenity-icon-large">{getAmenityIcon(amenity)}</span>
                  <span className="pg-detail-amenity-name-large">{amenity.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</span>
                </div>
              ))}
            </div>
            {pg.amenities.length === 0 && (
              <p className="pg-detail-section-text">Amenity details will be updated soon. Contact the owner for complete facility information.</p>
            )}
          </section>

          {/* Rooms */}
          <section ref={(el) => (sectionRefs.current.rooms = el)} id="rooms" className="pg-detail-section">
            <h2 className="pg-detail-section-heading">Rooms & Pricing</h2>
            {hasRooms ? (
              <div className="pg-detail-rooms-grid">
                {groupedRooms.map((group, idx) => (
                  <div className="pg-detail-room-card" key={idx}>
                    <div className="pg-detail-room-header">
                      <span className="pg-detail-room-type">{group.displayType} Sharing</span>
                      <span className={`pg-detail-room-status ${group.available > 0 ? 'available' : 'occupied'}`}>
                        {group.available > 0 ? `${group.available} Beds Available` : 'Full'}
                      </span>
                    </div>
                    <div className="pg-detail-room-price">
                      <span className="pg-detail-room-price-label">Rent per bed</span>
                      <span className="pg-detail-room-price-value">
                        {group.minRent > 0 ? formatMoney(group.minRent) : 'Contact'}
                        {group.maxRent > group.minRent && <span className="pg-detail-room-price-max"> - {formatMoney(group.maxRent)}</span>}
                        <span className="pg-detail-room-price-unit">/mo</span>
                      </span>
                    </div>
                    <ul className="pg-detail-room-features">
                      <li>Total beds: {group.capacity}</li>
                      <li>Available beds: {group.available}</li>
                      {group.count > 1 && <li>{group.count} rooms of this type</li>}
                    </ul>
                    <button onClick={handleWhatsApp} className="pg-detail-room-reserve">Reserve Now</button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="pg-detail-rooms-empty">
                <p>Room-level details are not available for this PG. Contact the owner for specific room availability and pricing.</p>
                <div className="pg-detail-sharing-chips">
                  {['Double', 'Triple', 'Four'].map((type) => (
                    <div className="pg-detail-sharing-chip" key={type}>
                      <span className="pg-detail-sharing-name">{type} sharing</span>
                      <span className="pg-detail-sharing-price">{formatMoney(pg.longTermRent?.[type.toLowerCase()] || startingPrice)}/mo</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <p className="pg-detail-section-text" style={{ marginTop: '16px' }}>
              Rent includes basic maintenance and amenities unless specified otherwise. Electricity and other usage-based charges may be extra as per owner policy.
            </p>
          </section>

          {/* Food */}
          <section ref={(el) => (sectionRefs.current.food = el)} id="food" className="pg-detail-section">
            <h2 className="pg-detail-section-heading">Food & Dining</h2>
            {hasFood ? (
              <>
                <p className="pg-detail-section-text">
                  {pg.name} serves {pg.mealCount || 3} hygienic meals every day — breakfast, lunch, and dinner. The menu is rotated regularly to provide variety and nutrition.
                </p>
                <div className="pg-detail-food-grid">
                  {foodMenu.map((item, idx) => (
                    <div className="pg-detail-food-card" key={idx}>
                      <span className="pg-detail-food-day">{item.day}</span>
                      <span>🌅 {item.breakfast}</span>
                      <span>☀️ {item.lunch}</span>
                      <span>🌙 {item.dinner}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="pg-detail-food-empty">
                <p>Food is not listed as a standard amenity at this PG. You can request meal services or explore nearby restaurants, tiffin centers, and food delivery options in {pg.area}.</p>
              </div>
            )}
          </section>

          {/* Rules */}
          <section ref={(el) => (sectionRefs.current.rules = el)} id="rules" className="pg-detail-section">
            <h2 className="pg-detail-section-heading">House Rules & Policies</h2>
            <div className="pg-detail-rules-grid">
              <div className="pg-detail-rule-card">
                <span>🕙</span>
                <strong>Gate Closing Time</strong>
                <p>10:00 PM for all tenants. Late entry needs prior intimation.</p>
              </div>
              <div className="pg-detail-rule-card">
                <span>🚭</span>
                <strong>No Smoking / Alcohol</strong>
                <p>Strictly prohibited inside the premises.</p>
              </div>
              <div className="pg-detail-rule-card">
                <span>🧹</span>
                <strong>Housekeeping</strong>
                <p>Daily cleaning of common areas and weekly room cleaning.</p>
              </div>
              <div className="pg-detail-rule-card">
                <span>👥</span>
                <strong>Visitors</strong>
                <p>Allowed in common areas only during designated hours.</p>
              </div>
              <div className="pg-detail-rule-card">
                <span>🔇</span>
                <strong>Noise Policy</strong>
                <p>Maintain silence after 10 PM to respect other residents.</p>
              </div>
              <div className="pg-detail-rule-card">
                <span>⚡</span>
                <strong>Electricity</strong>
                <p>Usage-based charges may be split among tenants as per meter.</p>
              </div>
            </div>
          </section>

          {/* Location */}
          <section ref={(el) => (sectionRefs.current.location = el)} id="location" className="pg-detail-section">
            <h2 className="pg-detail-section-heading">Location & Nearby</h2>
            <p className="pg-detail-section-text">{pg.name} is located at {pg.address || pg.area}, {pg.city || 'Bangalore'}. The property is well-connected to nearby offices, colleges, public transport, and daily needs.</p>

            <div className="pg-detail-nearby-list">
              {nearby.map((place, idx) => (
                <div className="pg-detail-nearby-item" key={idx}>
                  <span className="pg-detail-nearby-icon">📍</span>
                  <span>{place}</span>
                </div>
              ))}
            </div>

            {pg.lat && pg.lng ? (
              <div className="pg-detail-map-wrapper">
                <iframe
                  title={`Location of ${pg.name}`}
                  src={`https://www.google.com/maps?q=${pg.lat},${pg.lng}&z=15&output=embed`}
                  width="100%"
                  height="360"
                  style={{ border: 0, borderRadius: '12px' }}
                  allowFullScreen
                  loading="lazy"
                />
                <a href={`https://www.google.com/maps/dir/?api=1&destination=${pg.lat}%2C${pg.lng}`} target="_blank" rel="noopener noreferrer" className="pg-detail-direction-link">
                  Get Directions
                </a>
              </div>
            ) : (
              <div className="pg-detail-map-placeholder">
                <p>Exact location map is not available. Contact the owner for directions.</p>
              </div>
            )}
          </section>

          {/* FAQs */}
          <section ref={(el) => (sectionRefs.current.faqs = el)} id="faqs" className="pg-detail-section">
            <h2 className="pg-detail-section-heading">Frequently Asked Questions</h2>
            <div className="pg-detail-faq-list">
              {faqs.map((faq, idx) => (
                <details key={idx} className="pg-detail-faq-item">
                  <summary className="pg-detail-faq-summary">
                    {faq.q}
                    <span className="pg-detail-faq-plus">+</span>
                  </summary>
                  <div className="pg-detail-faq-answer">{faq.a}</div>
                </details>
              ))}
            </div>
          </section>

          {/* Similar Properties */}
          {similarPGs.length > 0 && (
            <section className="pg-detail-section">
              <h2 className="pg-detail-section-heading">Similar Properties Nearby</h2>
              <div className="pg-detail-similar-grid">
                {similarPGs.map((similarPg) => (
                  <PGCard key={similarPg.id} pg={similarPg} onSelect={() => {}} />
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <aside className="pg-detail-sidebar">
          {/* Price Card */}
          <div className="pg-detail-sidebar-card pg-detail-price-card">
            <span className="pg-detail-price-card-label">Starting From</span>
            <span className="pg-detail-price-card-value">
              {startingPrice > 0 ? formatMoney(startingPrice) : 'Contact for price'}
              {startingPrice > 0 && <span className="pg-detail-price-card-unit">/month</span>}
            </span>
            <span className="pg-detail-price-card-note">No brokerage • Direct owner</span>
            <div className="pg-detail-price-card-actions">
              <button onClick={handleCall} className="pg-detail-action-btn pg-detail-call-btn">
                <span>📞</span> Call Owner
              </button>
              <button onClick={handleWhatsApp} className="pg-detail-action-btn pg-detail-wa-btn">
                <span>💬</span> WhatsApp
              </button>
            </div>
          </div>

          {/* Enquiry Form */}
          <div className="pg-detail-sidebar-card pg-detail-enquiry-card">
            <h3>Send Enquiry</h3>
            <p>Get availability, rent and room options directly on WhatsApp.</p>
            <form onSubmit={handleEnquiry}>
              <input
                type="text"
                placeholder="Your Name"
                value={enquiry.name}
                onChange={(e) => setEnquiry({ ...enquiry, name: e.target.value })}
                required
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={enquiry.phone}
                onChange={(e) => setEnquiry({ ...enquiry, phone: e.target.value })}
                required
              />
              <input
                type="date"
                placeholder="Move-in Date"
                value={enquiry.moveIn}
                onChange={(e) => setEnquiry({ ...enquiry, moveIn: e.target.value })}
              />
              <textarea
                rows="3"
                placeholder="Message (optional)"
                value={enquiry.message}
                onChange={(e) => setEnquiry({ ...enquiry, message: e.target.value })}
              />
              <button type="submit" className="pg-detail-enquiry-submit">
                {enquirySent ? 'Sent!' : 'Send on WhatsApp'}
              </button>
            </form>
          </div>

          {/* Owner Card */}
          <div className="pg-detail-sidebar-card pg-detail-owner-card">
            <div className="pg-detail-owner-avatar">
              {pg.owner ? pg.owner.charAt(0).toUpperCase() : 'O'}
            </div>
            <div className="pg-detail-owner-info">
              <h3>{pg.owner || 'Property Owner'}</h3>
              <p>Owner of {pg.name}</p>
              <span className="pg-detail-owner-verified">✓ Verified Owner</span>
            </div>
          </div>

          {/* Support */}
          <div className="pg-detail-sidebar-card pg-detail-support-card">
            <span className="pg-detail-support-icon">🎧</span>
            <div>
              <h3>Need help?</h3>
              <p>Our support team can help you with PG search and booking.</p>
              <a href="mailto:support@getyourstay.in" className="pg-detail-support-link">support@getyourstay.in</a>
            </div>
          </div>
        </aside>
      </div>

      {/* All Photos Modal */}
      {showAllPhotos && (
        <div className="pg-detail-photos-modal" onClick={() => setShowAllPhotos(false)}>
          <div className="pg-detail-photos-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="pg-detail-photos-modal-close" onClick={() => setShowAllPhotos(false)}>✕</button>
            <h3>All Photos of {pg.name}</h3>
            <div className="pg-detail-photos-modal-grid">
              {pg.images.map((img, idx) => (
                <img key={idx} src={img} alt={`${pg.name} ${idx + 1}`} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Sticky bottom CTA */}
      <div className="pg-detail-sticky-cta">
        <div className="pg-detail-sticky-cta-content">
          <div className="pg-detail-sticky-cta-info">
            <strong>{pg.name}</strong>
            <span>{startingPrice > 0 ? formatMoney(startingPrice) : 'Contact for price'}/mo</span>
          </div>
          <div className="pg-detail-sticky-cta-actions">
            <button onClick={handleCall} className="pg-detail-action-btn pg-detail-call-btn">Call</button>
            <button onClick={handleWhatsApp} className="pg-detail-action-btn pg-detail-wa-btn">WhatsApp</button>
          </div>
        </div>
      </div>

      <style>{`
        .pg-detail-page-root {
          background: #f1f5f9;
          min-height: calc(100vh - 120px);
          padding-bottom: 80px;
        }
        .pg-detail-breadcrumb {
          max-width: 1200px;
          margin: 0 auto;
          padding: 14px 20px;
          background: transparent;
          font-size: 12px;
        }
        .pg-detail-breadcrumb__list {
          display: flex;
          align-items: center;
          gap: 6px;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .pg-detail-breadcrumb__link {
          color: #64748b;
          text-decoration: none;
          transition: color .15s;
        }
        .pg-detail-breadcrumb__link:hover {
          color: #f97316;
        }
        .pg-detail-breadcrumb__sep {
          color: #cbd5e1;
        }
        .pg-detail-breadcrumb__active {
          color: #f97316;
          font-weight: 600;
        }

        .pg-detail-hero {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px 18px;
        }
        .pg-detail-hero-content {
          background: linear-gradient(135deg, #0f2744 0%, #1a365d 100%);
          border-radius: 20px;
          padding: 28px 32px;
          color: white;
          box-shadow: 0 10px 30px rgba(15, 39, 68, 0.18);
        }
        .pg-detail-hero-badges {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 12px;
        }
        .pg-detail-gender-badge {
          padding: 5px 12px;
          border-radius: 20px;
          font-weight: 700;
          font-size: 12px;
        }
        .pg-detail-verified-badge {
          background: rgba(255,255,255,0.15);
          padding: 5px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
        }
        .pg-detail-rating {
          background: rgba(245, 158, 11, 0.2);
          color: #fbbf24;
          padding: 5px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 700;
        }
        .pg-detail-title {
          font-size: 32px;
          font-weight: 800;
          margin: 0 0 8px;
          line-height: 1.2;
        }
        .pg-detail-address {
          margin: 0 0 16px;
          opacity: 0.9;
          font-size: 14px;
        }
        .pg-detail-hero-highlights {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
          font-size: 13px;
          font-weight: 600;
        }

        .pg-detail-gallery-section {
          max-width: 1200px;
          margin: 0 auto 16px;
          padding: 0 20px;
          display: grid;
          grid-template-columns: 1fr 140px;
          gap: 12px;
        }
        .pg-detail-gallery-main {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          height: 420px;
          background: #e2e8f0;
        }
        .pg-detail-gallery-main img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .pg-detail-gallery-more {
          position: absolute;
          bottom: 16px;
          right: 16px;
          background: rgba(0,0,0,0.7);
          color: white;
          border: none;
          padding: 10px 16px;
          border-radius: 8px;
          font-weight: 700;
          cursor: pointer;
        }
        .pg-detail-gallery-thumbs {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .pg-detail-gallery-thumb {
          border: 2px solid transparent;
          border-radius: 12px;
          overflow: hidden;
          height: 76px;
          padding: 0;
          cursor: pointer;
          background: transparent;
        }
        .pg-detail-gallery-thumb.active {
          border-color: #f97316;
        }
        .pg-detail-gallery-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .pg-detail-tabs-sticky {
          position: sticky;
          top: 0;
          z-index: 100;
          background: #f1f5f9;
          padding: 8px 0;
          border-bottom: 1px solid #e2e8f0;
        }
        .pg-detail-tabs {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          gap: 8px;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .pg-detail-tabs::-webkit-scrollbar {
          display: none;
        }
        .pg-detail-tab {
          padding: 10px 16px;
          border: none;
          background: white;
          color: #64748b;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          white-space: nowrap;
          border-radius: 20px;
          transition: all 0.2s;
        }
        .pg-detail-tab.active {
          background: #f97316;
          color: white;
        }

        .pg-detail-page-layout {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px 20px 0;
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 24px;
          align-items: start;
        }
        .pg-detail-main {
          width: 100%;
        }
        .pg-detail-sidebar {
          position: sticky;
          top: 70px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .pg-detail-section {
          background: white;
          border-radius: 16px;
          padding: 24px;
          margin-top: 20px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
        }
        .pg-detail-section:first-of-type {
          margin-top: 0;
        }
        .pg-detail-section-heading {
          font-size: 20px;
          font-weight: 800;
          color: #0f2744;
          margin: 0 0 18px;
        }
        .pg-detail-section-text {
          color: #475569;
          font-size: 14px;
          line-height: 1.8;
          margin: 0;
        }

        .pg-detail-quick-stats {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
          gap: 12px;
          margin: 22px 0;
        }
        .pg-detail-quick-stat {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .pg-detail-quick-stat-icon {
          font-size: 20px;
        }
        .pg-detail-quick-stat-label {
          font-size: 11px;
          color: #64748b;
          font-weight: 600;
          text-transform: uppercase;
        }
        .pg-detail-quick-stat-value {
          font-size: 15px;
          font-weight: 800;
          color: #0f2744;
        }

        .pg-detail-trust-badges {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 12px;
          margin-top: 20px;
        }
        .pg-detail-trust-badge {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          background: #f0fdfa;
          border: 1px solid #ccfbf1;
          border-radius: 12px;
          padding: 14px;
        }
        .pg-detail-trust-icon {
          font-size: 22px;
        }
        .pg-detail-trust-badge strong {
          display: block;
          color: #0f2744;
          font-size: 13px;
        }
        .pg-detail-trust-badge span {
          color: #64748b;
          font-size: 12px;
        }

        .pg-detail-amenities-grid-large {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: 12px;
        }
        .pg-detail-amenity-card {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          transition: all 0.2s;
        }
        .pg-detail-amenity-card:hover {
          border-color: #f97316;
          transform: translateY(-2px);
        }
        .pg-detail-amenity-icon-large {
          font-size: 20px;
        }
        .pg-detail-amenity-name-large {
          font-size: 13px;
          font-weight: 700;
          color: #334155;
        }

        .pg-detail-rooms-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 16px;
        }
        .pg-detail-room-card {
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 18px;
          background: #fff;
          display: flex;
          flex-direction: column;
        }
        .pg-detail-room-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .pg-detail-room-type {
          font-weight: 800;
          color: #0f2744;
          font-size: 15px;
        }
        .pg-detail-room-status {
          font-size: 11px;
          padding: 4px 10px;
          border-radius: 20px;
          font-weight: 700;
        }
        .pg-detail-room-status.available {
          background: #dcfce7;
          color: #166534;
        }
        .pg-detail-room-status.occupied {
          background: #fee2e2;
          color: #991b1b;
        }
        .pg-detail-room-price {
          margin-bottom: 12px;
        }
        .pg-detail-room-price-label {
          display: block;
          font-size: 11px;
          color: #94a3b8;
          font-weight: 600;
          text-transform: uppercase;
        }
        .pg-detail-room-price-value {
          font-size: 22px;
          font-weight: 800;
          color: #f97316;
        }
        .pg-detail-room-price-unit {
          font-size: 13px;
          color: #64748b;
          font-weight: 600;
        }
        .pg-detail-room-price-max {
          font-size: 14px;
          font-weight: 700;
          color: #64748b;
        }
        .pg-detail-room-features {
          list-style: none;
          padding: 0;
          margin: 0 0 14px;
          font-size: 12px;
          color: #475569;
          line-height: 1.8;
        }
        .pg-detail-room-reserve {
          margin-top: auto;
          width: 100%;
          padding: 12px;
          border: none;
          border-radius: 10px;
          background: linear-gradient(135deg, #f97316, #ea580c);
          color: white;
          font-weight: 800;
          font-size: 14px;
          cursor: pointer;
          transition: transform 0.2s;
        }
        .pg-detail-room-reserve:hover {
          transform: translateY(-2px);
        }
        .pg-detail-rooms-empty {
          text-align: center;
        }
        .pg-detail-rooms-empty p {
          color: #64748b;
          font-size: 14px;
          margin-bottom: 16px;
        }
        .pg-detail-sharing-chips {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: center;
        }
        .pg-detail-sharing-chip {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 12px 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .pg-detail-sharing-name {
          font-size: 12px;
          color: #64748b;
          font-weight: 700;
        }
        .pg-detail-sharing-price {
          font-size: 15px;
          color: #0f2744;
          font-weight: 800;
        }

        .pg-detail-food-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 12px;
          margin-top: 18px;
        }
        .pg-detail-food-card {
          background: #fffbeb;
          border: 1px solid #fde68a;
          border-radius: 12px;
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-size: 12px;
          color: #475569;
        }
        .pg-detail-food-day {
          font-weight: 800;
          color: #92400e;
          font-size: 13px;
        }
        .pg-detail-food-empty {
          background: #f8fafc;
          border-radius: 12px;
          padding: 20px;
          color: #64748b;
          font-size: 14px;
        }

        .pg-detail-rules-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 14px;
        }
        .pg-detail-rule-card {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 16px;
        }
        .pg-detail-rule-card span {
          font-size: 22px;
          display: block;
          margin-bottom: 8px;
        }
        .pg-detail-rule-card strong {
          display: block;
          color: #0f2744;
          font-size: 14px;
          margin-bottom: 4px;
        }
        .pg-detail-rule-card p {
          margin: 0;
          color: #64748b;
          font-size: 12px;
          line-height: 1.6;
        }

        .pg-detail-nearby-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 10px;
          margin: 18px 0;
        }
        .pg-detail-nearby-item {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 10px 12px;
          font-size: 13px;
          color: #334155;
          font-weight: 600;
        }
        .pg-detail-nearby-icon {
          color: #f97316;
        }
        .pg-detail-map-wrapper {
          position: relative;
          margin-top: 14px;
        }
        .pg-detail-map-wrapper iframe {
          width: 100%;
          border-radius: 12px;
        }
        .pg-detail-direction-link {
          display: inline-flex;
          margin-top: 12px;
          padding: 12px 20px;
          background: #0f2744;
          color: white;
          border-radius: 10px;
          text-decoration: none;
          font-size: 13px;
          font-weight: 700;
        }
        .pg-detail-map-placeholder {
          background: #f8fafc;
          border: 1px dashed #cbd5e1;
          border-radius: 12px;
          padding: 30px;
          text-align: center;
        }

        .pg-detail-faq-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .pg-detail-faq-item {
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          overflow: hidden;
        }
        .pg-detail-faq-summary {
          padding: 16px 18px;
          font-size: 14px;
          font-weight: 700;
          color: #0f2744;
          cursor: pointer;
          list-style: none;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #f8fafc;
        }
        .pg-detail-faq-summary::-webkit-details-marker {
          display: none;
        }
        .pg-detail-faq-plus {
          color: #f97316;
          font-size: 20px;
          font-weight: 800;
        }
        .pg-detail-faq-answer {
          padding: 16px 18px;
          font-size: 14px;
          color: #475569;
          line-height: 1.7;
          border-top: 1px solid #e2e8f0;
        }
        details[open] .pg-detail-faq-plus {
          transform: rotate(45deg);
          display: inline-block;
        }

        .pg-detail-similar-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 16px;
        }

        /* Sidebar */
        .pg-detail-sidebar-card {
          background: white;
          border-radius: 16px;
          padding: 20px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
        }
        .pg-detail-price-card {
          background: linear-gradient(135deg, #0f2744, #1a365d);
          color: white;
          text-align: center;
        }
        .pg-detail-price-card-label {
          display: block;
          font-size: 12px;
          opacity: 0.8;
          margin-bottom: 6px;
        }
        .pg-detail-price-card-value {
          display: block;
          font-size: 28px;
          font-weight: 800;
          margin-bottom: 4px;
        }
        .pg-detail-price-card-unit {
          font-size: 14px;
          opacity: 0.8;
          font-weight: 600;
        }
        .pg-detail-price-card-note {
          display: block;
          font-size: 12px;
          opacity: 0.8;
          margin-bottom: 16px;
        }
        .pg-detail-price-card-actions {
          display: flex;
          gap: 10px;
        }
        .pg-detail-action-btn {
          flex: 1;
          padding: 12px 10px;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 800;
          cursor: pointer;
          border: none;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }
        .pg-detail-action-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        .pg-detail-call-btn {
          background: white;
          color: #0f2744;
        }
        .pg-detail-wa-btn {
          background: #25D366;
          color: white;
        }

        .pg-detail-enquiry-card h3 {
          margin: 0 0 6px;
          font-size: 17px;
          color: #0f2744;
        }
        .pg-detail-enquiry-card p {
          margin: 0 0 14px;
          font-size: 13px;
          color: #64748b;
        }
        .pg-detail-enquiry-card form {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .pg-detail-enquiry-card input,
        .pg-detail-enquiry-card textarea {
          padding: 12px;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          font-size: 13px;
          font-family: inherit;
        }
        .pg-detail-enquiry-card input:focus,
        .pg-detail-enquiry-card textarea:focus {
          outline: none;
          border-color: #f97316;
        }
        .pg-detail-enquiry-submit {
          padding: 14px;
          border: none;
          border-radius: 10px;
          background: linear-gradient(135deg, #f97316, #ea580c);
          color: white;
          font-weight: 800;
          font-size: 14px;
          cursor: pointer;
        }

        .pg-detail-owner-card {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .pg-detail-owner-avatar {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: linear-gradient(135deg, #0f2744, #1a365d);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          font-weight: 700;
          flex-shrink: 0;
        }
        .pg-detail-owner-info h3 {
          margin: 0 0 2px;
          font-size: 15px;
          color: #0f2744;
        }
        .pg-detail-owner-info p {
          margin: 0 0 6px;
          font-size: 12px;
          color: #64748b;
        }
        .pg-detail-owner-verified {
          font-size: 11px;
          color: #059669;
          font-weight: 700;
        }

        .pg-detail-support-card {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          background: #f0f4ff;
        }
        .pg-detail-support-icon {
          font-size: 26px;
        }
        .pg-detail-support-card h3 {
          margin: 0 0 4px;
          font-size: 15px;
          color: #0f2744;
        }
        .pg-detail-support-card p {
          margin: 0 0 8px;
          font-size: 12px;
          color: #475569;
        }
        .pg-detail-support-link {
          color: #2563eb;
          font-size: 13px;
          font-weight: 700;
          text-decoration: none;
        }

        /* Photos modal */
        .pg-detail-photos-modal {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.9);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          overflow-y: auto;
        }
        .pg-detail-photos-modal-content {
          background: white;
          border-radius: 16px;
          max-width: 1000px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          padding: 24px;
          position: relative;
        }
        .pg-detail-photos-modal-content h3 {
          margin: 0 0 16px;
          color: #0f2744;
          font-size: 18px;
        }
        .pg-detail-photos-modal-close {
          position: absolute;
          top: 16px;
          right: 16px;
          background: #f1f5f9;
          border: none;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          font-size: 18px;
          cursor: pointer;
        }
        .pg-detail-photos-modal-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 12px;
        }
        .pg-detail-photos-modal-grid img {
          width: 100%;
          height: 160px;
          object-fit: cover;
          border-radius: 10px;
        }

        /* Sticky CTA */
        .pg-detail-sticky-cta {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: white;
          border-top: 1px solid #e2e8f0;
          padding: 12px 16px;
          z-index: 200;
          box-shadow: 0 -4px 20px rgba(0,0,0,0.08);
          display: none;
        }
        .pg-detail-sticky-cta-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
        }
        .pg-detail-sticky-cta-info {
          display: flex;
          flex-direction: column;
        }
        .pg-detail-sticky-cta-info strong {
          color: #0f2744;
          font-size: 14px;
        }
        .pg-detail-sticky-cta-info span {
          color: #f97316;
          font-size: 14px;
          font-weight: 800;
        }
        .pg-detail-sticky-cta-actions {
          display: flex;
          gap: 10px;
        }

        @media (max-width: 1024px) {
          .pg-detail-page-layout {
            grid-template-columns: 1fr;
          }
          .pg-detail-sidebar {
            position: static;
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          }
        }

        @media (max-width: 768px) {
          .pg-detail-hero-content {
            padding: 20px;
            border-radius: 16px;
          }
          .pg-detail-title {
            font-size: 24px;
          }
          .pg-detail-gallery-section {
            grid-template-columns: 1fr;
          }
          .pg-detail-gallery-main {
            height: 280px;
          }
          .pg-detail-gallery-thumbs {
            flex-direction: row;
            overflow-x: auto;
          }
          .pg-detail-gallery-thumb {
            flex: 0 0 80px;
            height: 60px;
          }
          .pg-detail-page-layout {
            padding: 16px 16px 0;
          }
          .pg-detail-section {
            padding: 18px;
          }
          .pg-detail-sidebar {
            grid-template-columns: 1fr;
          }
          .pg-detail-sticky-cta {
            display: block;
          }
          .pg-detail-page-root {
            padding-bottom: 90px;
          }
          .pg-detail-similar-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default PGDetailPage;
