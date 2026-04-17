import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import PGCard from '../components/PGCard';
import PGDetail from '../components/PGDetail';
import { theme } from '../theme';
import { pgApi } from '../services/api';
import '../App.css';

const HOME_SEO_FAQS = [
  {
    question: "How to find the best PG in Bangalore?",
    answer: "To find the best PG in Bangalore, start by identifying your preferred area based on your college or office location. GetYourStay offers verified PG listings across all major areas including Electronic City, HSR Layout, Koramangala, and Whitefield. Filter by your budget (₹4,000-₹25,000/month), amenities (WiFi, AC, food), and gender preference (Male PG, Female PG, or Co-living). All our listings include real photos, genuine reviews, and transparent pricing with no hidden charges."
  },
  {
    question: "What is the average cost of PG accommodation in Bangalore?",
    answer: "PG costs in Bangalore vary significantly by area and amenities. Budget PGs (triple sharing without AC) start from ₹4,000-₹6,000/month. Double sharing PGs range from ₹6,000-₹10,000/month. Single rooms with basic amenities cost ₹8,000-₹12,000/month. Premium PGs with AC, attached bathrooms, and meals can cost ₹12,000-₹25,000/month. Electronic City and HSR Layout offer affordable options near IT hubs, while Koramangala and Indiranagar command higher prices."
  },
  {
    question: "Which areas have the most affordable PG options in Bangalore?",
    answer: "The most affordable PG areas in Bangalore include Electronic City (₹4,000-₹8,000), BTM Layout (₹5,000-₹9,000), Marathahalli (₹6,000-₹10,000), and Whitefield (₹5,000-₹10,000). These areas offer excellent connectivity to major IT parks and commercial hubs. HSR Layout and Koramangala are slightly more expensive but offer better social infrastructure with restaurants, cafes, and entertainment options."
  },
  {
    question: "Do Bangalore PGs include food?",
    answer: "Many PGs in Bangalore offer food as part of the accommodation package. Non-AC PGs with meals typically cost ₹5,000-₹8,000 per month, including breakfast, lunch, and dinner. AC PGs with food range from ₹8,000-₹15,000 per month. You can filter PGs by food availability on GetYourStay. Some PGs also offer partial food plans (only breakfast and dinner) at lower prices."
  },
  {
    question: "What amenities are available in Bangalore PGs?",
    answer: "Bangalore PGs offer various amenities including high-speed WiFi, air conditioning, food service, laundry facilities, housekeeping, power backup, 24/7 security with CCTV, parking space, TV rooms, and common areas. Premium PGs may also include gym access, rooftop gardens, and recreational facilities. GetYourStay lets you filter PGs by specific amenities to find accommodation that meets your requirements."
  },
  {
    question: "Are there safe PGs for girls in Bangalore?",
    answer: "Yes, Bangalore has numerous safe PG options for girls. Look for PGs with 24/7 security, restricted entry, CCTV surveillance, female wardens, and curfew timings. Popular areas for girls PG include HSR Layout, Koramangala, BTM Layout, and Whitefield. GetYourStay's gender filter helps you find verified girls-only PGs with safety features like biometric entry, emergency contacts, and regular housekeeping."
  },
  {
    question: "What documents are required to book a PG in Bangalore?",
    answer: "To book a PG in Bangalore, you typically need: 1) Valid ID proof (Aadhaar Card, PAN Card, or Passport), 2) Address proof, 3) Passport-size photographs (2-4 copies), 4) College ID or Company ID (if applicable), 5) Emergency contact details. Some PGs may require a police verification form after move-in. International students may need passport and visa copies. GetYourStay simplifies this process by listing all document requirements for each PG."
  },
  {
    question: "How does PG booking work on GetYourStay?",
    answer: "Booking a PG on GetYourStay is simple: 1) Search and filter PGs by area, budget, and amenities. 2) View detailed listings with real photos and genuine reviews. 3) Contact PG owners directly via phone or WhatsApp to schedule a visit. 4) Visit the PG to verify conditions. 5) Complete booking by paying the first month's rent and security deposit. GetYourStay also offers online booking for select PGs with secure payment processing."
  }
];

const hiwSteps = [
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="2.5" />
        <path d="M30 30L40 40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <circle cx="20" cy="20" r="8" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
        <circle cx="20" cy="20" r="3" fill="currentColor" />
      </svg>
    ),
    title: "Search & Filter",
    description: "Browse through verified PGs. Filter by location, price, gender preference, and amenities."
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="10" width="36" height="28" rx="4" stroke="currentColor" strokeWidth="2.5" />
        <path d="M6 18H42" stroke="currentColor" strokeWidth="2" />
        <circle cx="16" cy="28" r="5" stroke="currentColor" strokeWidth="2" />
        <path d="M26 25H36" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M26 31H34" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Explore & Compare",
    description: "View photos, read reviews, check amenities, and compare prices to find your ideal PG."
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 6C15.163 6 8 13.163 8 22C8 28.154 11.077 33.625 15.5 37.2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M24 6C32.837 6 40 13.163 40 22C40 28.154 36.923 33.625 32.5 37.2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M24 14V22L30 26" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="40" cy="8" r="6" fill="white" stroke="currentColor" strokeWidth="2" />
        <path d="M38 8H42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "Contact Owner",
    description: "Connect directly with PG owners. Ask questions, schedule visits, and negotiate prices."
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 42V20L24 8L40 20V42H30V30H18V42H8Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="20" y="34" width="8" height="8" stroke="currentColor" strokeWidth="2" />
        <path d="M18 22L24 16L30 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="38" cy="14" r="6" fill="white" stroke="currentColor" strokeWidth="2" />
        <path d="M36 14L38 16L41 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Move In",
    description: "Book your room, complete paperwork, and move into your new home stress-free."
  }
];

const POPULAR_AREAS = [
  {
    name: "Electronic City",
    slug: "electronic-city",
    description: "Home to major IT companies like Infosys, Wipro, and TCS. Perfect for tech professionals and students.",
    rentRange: "₹4,000 - ₹12,000",
    highlights: ["Near IT Parks", "Affordable Options", "Good Connectivity"],
    link: "/?area=Electronic+City"
  },
  {
    name: "HSR Layout",
    slug: "hssr-layout",
    description: "Popular residential area with excellent social infrastructure. Great for students and working professionals.",
    rentRange: "₹5,000 - ₹15,000",
    highlights: ["Trendy Area", "Many Restaurants", "Near Colleges"],
    link: "/?area=HSR+Layout"
  },
  {
    name: "Koramangala",
    slug: "koramangala",
    description: "Premium residential area with premium PGs. Close to major offices and entertainment hubs.",
    rentRange: "₹8,000 - ₹20,000",
    highlights: ["Premium PGs", "Nightlife", "Central Location"],
    link: "/?area=Koramangala"
  },
  {
    name: "Whitefield",
    slug: "whitefield",
    description: "IT hub with International Tech Park and many residential options. Growing area with modern infrastructure.",
    rentRange: "₹5,000 - ₹15,000",
    highlights: ["IT Hub", "Modern Infrastructure", "Good Food"],
    link: "/?area=Whitefield"
  },
  {
    name: "BTM Layout",
    slug: "btm-layout",
    description: "Budget-friendly area popular among students. Excellent PG options near educational institutions.",
    rentRange: "₹4,000 - ₹8,000",
    highlights: ["Student Friendly", "Budget Options", "Near Bannerghatta Road"],
    link: "/?area=BTM+Layout"
  },
  {
    name: "Marathahalli",
    slug: "marathahalli",
    description: "Well-connected residential area with many PG options. Popular among IT professionals.",
    rentRange: "₹5,000 - ₹12,000",
    highlights: ["Good Connectivity", "Many Amenities", "Vibrant Area"],
    link: "/?area=Marathahalli"
  }
];

const PG_HUNTING_TIPS = [
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="2.5" />
        <path d="M30 30L40 40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <circle cx="20" cy="20" r="8" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
        <circle cx="20" cy="20" r="3" fill="currentColor" />
      </svg>
    ),
    title: "Research Before You Visit",
    description: "Use GetYourStay to filter PGs by area, budget, and amenities. Read genuine reviews from previous tenants to understand the real experience."
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="14" width="36" height="24" rx="4" stroke="currentColor" strokeWidth="2.5" />
        <path d="M6 22H42" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="16" cy="30" r="3" stroke="currentColor" strokeWidth="2" />
        <path d="M26 30H38" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M34 10L38 14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Understand the Total Cost",
    description: "Ask about additional charges including food, electricity, maintenance, and security deposit. Some PGs have hidden charges that can significantly increase your monthly expenses."
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 42V20L24 8L40 20V42H30V30H18V42H8Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="20" y="34" width="8" height="8" stroke="currentColor" strokeWidth="2" />
        <circle cx="36" cy="14" r="8" stroke="currentColor" strokeWidth="2.5" />
        <path d="M36 10V18M32 14H40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "Visit During Different Times",
    description: "Visit the PG at different times to check for noise levels, food quality, and water pressure. Evening visits reveal the true atmosphere of the accommodation."
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="8" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="32" cy="16" r="8" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="24" cy="32" r="8" stroke="currentColor" strokeWidth="2.5" />
        <path d="M16 16L24 32M32 16L24 32M16 16H32" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    title: "Talk to Current Tenants",
    description: "If possible, interact with existing tenants to get honest feedback about the PG owner, maintenance response time, and day-to-day living experience."
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="6" width="32" height="36" rx="4" stroke="currentColor" strokeWidth="2.5" />
        <path d="M16 18H32M16 24H28M16 30H24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="36" cy="36" r="8" fill="white" stroke="currentColor" strokeWidth="2.5" />
        <path d="M33 36L35 38L39 34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Get Everything in Writing",
    description: "Before moving in, ensure you have a written agreement specifying rent, deposit, notice period, house rules, and what happens to the deposit when you leave."
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 6L28 14H36L30 20L32 28L24 24L16 28L18 20L12 14H20L24 6Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="24" cy="36" r="8" stroke="currentColor" strokeWidth="2.5" />
        <path d="M24 32V40M20 36H28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Check Safety Features",
    description: "Verify the presence of security guards, CCTV cameras, fire exits, and secure entry systems. For girls PG, check if there's a female warden and restricted entry timings."
  }
];

// Default placeholder image
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=300&fit=crop';

// Default PG structure
const normalizePG = (pg) => ({
  id: pg?.id || pg?._id || `pg-${Date.now()}-${Math.random()}`,
  ownerId: pg?.ownerId || '',
  name: pg?.name || 'PG Accommodation',
  area: pg?.area || pg?.city || '',
  address: pg?.address || '',
  city: pg?.city || '',
  state: pg?.state || '',
  price: pg?.price || 0,
  rating: pg?.rating || 0,
  reviews: pg?.reviews || 0,
  amenities: Array.isArray(pg?.amenities) ? pg.amenities : [],
  gender: pg?.gender || pg?.type || 'colive',
  lat: pg?.lat || pg?.latitude || null,
  lng: pg?.lng || pg?.longitude || null,
  distance: pg?.distance || null,
  walkTime: pg?.walkTime || null,
  images: Array.isArray(pg?.images) && pg.images.length > 0 ? pg.images : [DEFAULT_IMAGE],
  isVerified: pg?.isVerified ?? false,
  isAvailable: pg?.isAvailable ?? false,
  description: pg?.description || '',
  phone: pg?.phone || '',
  owner: pg?.owner || '',
  ownerPhone: pg?.ownerPhone || '',
  totalRooms: pg?.totalRooms || 0,
  type: pg?.type || 'colive',
  rentalType: pg?.rentalType || 'long_term',
  longTermRent: pg?.longTermRent || { single: 0, double: 0, triple: 0 },
  shortTermRent: pg?.shortTermRent || { single: 0, double: 0, triple: 0 },
  checkin_url: pg?.checkin_url
});

const Home = () => {
  const [selectedPG, setSelectedPG] = useState(null);
  const [detailPG, setDetailPG] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [selectedAreas, setSelectedAreas] = useState([]);
  const [selectedGender, setSelectedGender] = useState('all');
  const [selectedRentalType, setSelectedRentalType] = useState('all');
  const [pgType, setPgType] = useState('all');
  const [viewMode, setViewMode] = useState('split');
  const [sortBy, setSortBy] = useState('recommended');
  const [activeTab, setActiveTab] = useState('pg');
  const [pgs, setPgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nearbyPGs, setNearbyPGs] = useState([]);
  const [availableAreas, setAvailableAreas] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch PG data and areas on mount
  useEffect(() => {
    fetchPGs();
    fetchAreas();
    getUserLocation();
  }, [selectedGender, selectedRentalType, priceRange, searchQuery, sortBy, selectedAreas]);

  const fetchAreas = async () => {
    try {
      const response = await pgApi.getAreas();
      if (response?.success && response.data) {
        setAvailableAreas(response.data.areas || []);
      }
    } catch (err) {
      console.log('Error fetching areas:', err);
    }
  };

  const fetchPGs = async (page = 1) => {
    setLoading(true);
    setError(null);

    try {
      // Build query params
      const params = {
        page,
        limit: 20,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
      };

      // Add search query
      if (searchQuery.trim()) {
        params.search = searchQuery.trim();
      }

      if (selectedGender !== 'all') {
        params.gender = selectedGender;
      }

      if (selectedRentalType !== 'all') {
        params.rentalType = selectedRentalType;
      }

      if (selectedAreas.length > 0) {
        params.area = selectedAreas[0];
      }



      const response = await pgApi.getAll(params);

      console.log("fetch all pg :", response);

      // Handle different response formats
      let pgList = [];
      if (response?.success && Array.isArray(response.data)) {
        pgList = response.data;
      } else if (Array.isArray(response)) {
        pgList = response;
      }
      console.log('pgList 333 : ', pgList);



      // Normalize all PG data
      const normalizedPGs = pgList.map(normalizePG);
      setPgs(normalizedPGs);

      if (response?.pagination) {
        setPagination(response.pagination);
      }

    } catch (err) {
      console.log('API Error:', err);
      setError('Failed to load PGs. Please try again.');
    }

    setLoading(false);
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          await fetchNearbyPGs(latitude, longitude);
        },
        (err) => {
          console.log('Location access denied, using default');
          // Use default Bangalore coordinates
          setUserLocation({ lat: 12.9716, lng: 77.5946 });
          fetchNearbyPGs(12.9716, 77.5946);
        }
      );
    } else {
      setUserLocation({ lat: 12.9716, lng: 77.5946 });
      fetchNearbyPGs(12.9716, 77.5946);
    }
  };

  const fetchNearbyPGs = async (lat, lng) => {
    try {
      const response = await pgApi.getNearby(lat, lng, 10);

      let pgList = [];
      if (response?.success && Array.isArray(response.data)) {
        pgList = response.data;
      } else if (Array.isArray(response)) {
        pgList = response;
      }
      console.log("pgList :", pgList);

      // Take top 4 nearest PGs
      const normalizedPGs = pgList.slice(0, 4).map(normalizePG);
      setNearbyPGs(normalizedPGs);
    } catch (err) {
      console.log('Error fetching nearby PGs:', err);
      setNearbyPGs([]);
    }
  };

  const handleClearFilters = () => {
    setPriceRange([3000, 20000]);
    setSelectedAreas([]);
    setSelectedGender('all');
    setSelectedRentalType('all');
    setPgType('all');
  };

  const handleApplyFilters = () => {
    fetchPGs(1);
  };

  const handleViewDetails = async (pg) => {
    if (!pg) return;

    try {
      const response = await pgApi.getById(pg.id);
      if (response?.success && response.data) {
        setDetailPG(normalizePG(response.data));
      } else {
        setDetailPG(normalizePG(pg));
      }
    } catch (err) {
      console.log('Error fetching PG details:', err);
      setDetailPG(normalizePG(pg));
    }
  };

  const handleCloseDetail = () => setDetailPG(null);

  const tabs = [
    { id: 'pg', label: 'PG/Hostel', icon: '🏠' },
    { id: 'hotels', label: 'Hotels', icon: '🏨', comingSoon: true },
    { id: 'flats', label: 'Flats', icon: '🏢', comingSoon: true }
  ];

  useEffect(() => {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: HOME_SEO_FAQS.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    };

    let existingScript = document.querySelector('script[data-page-faq="true"]');
    if (existingScript) existingScript.remove();

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-page-faq', 'true');
    script.textContent = JSON.stringify(faqSchema);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.querySelector('script[data-page-faq="true"]');
      if (scriptToRemove) scriptToRemove.remove();
    };
  }, []);
  const verifiedCount = pgs.filter(pg => pg.isVerified).length;
  return (
    <div className="app">
      {/* Hero Section */}
      <section className="hero" style={{ background: theme.gradients.hero }}>
        <div className="hero-content">
          <h1>Find Your Perfect <span className="highlight">PG Accommodation</span> in Bangalore</h1>
          <p>Verified PGs with transparent pricing, real reviews, and modern amenities</p>

          {/* Tabs */}
          <div className="home-tabs">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`home-tab ${activeTab === tab.id ? 'active' : ''} ${tab.comingSoon ? 'coming-soon' : ''}`}
                onClick={() => !tab.comingSoon && setActiveTab(tab.id)}
                disabled={tab.comingSoon}
              >
                <span className="tab-icon">{tab.icon}</span>
                <span className="tab-label">{tab.label}</span>
                {tab.comingSoon && <span className="coming-soon-badge">Coming Soon</span>}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="search-container">
            <div className="search-input-wrapper">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search by PG name, area, or city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && fetchPGs(1)}
                className="search-input"
              />
              {searchQuery && (
                <button
                  className="search-clear"
                  onClick={() => {
                    setSearchQuery('');
                    fetchPGs(1);
                  }}
                >
                  ×
                </button>
              )}
            </div>
            <button
              className="search-btn"
              onClick={() => fetchPGs(1)}
            >
              Search
            </button>
          </div>

          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">{verifiedCount}</span>
              <span className="stat-label">Verified PGs</span>
            </div>
            <div className="stat">
              <span className="stat-number">2K+</span>
              <span className="stat-label">Happy Tenants</span>
            </div>
            <div className="stat">
              <span className="stat-number">{availableAreas.length}</span>
              <span className="stat-label">Areas Covered</span>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="trust-badges">
            <div className="badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <polyline points="9,12 11,14 15,10" />
              </svg>
              Verified Listings
            </div>
            <div className="badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
              Secure Payments
            </div>
            <div className="badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12,6 12,12 16,14" />
              </svg>
              24/7 Support
            </div>
          </div>
        </div>
      </section>

      {/* Trust Content Section */}
      <section className="trust-content-section">
        <div className="tc-container">
          <div className="tc-content">
            <span className="tc-badge">Why Choose Us</span>
            <h2 className="tc-title">Find your perfect PG stay with confidence</h2>
            <p className="tc-text">
              We provide verified listings, smart tenant screening, and a smooth booking experience to make your stay safe and hassle-free. Our platform is built to solve real challenges in shared living by offering transparency, security, and convenience through technology.
            </p>
            <p className="tc-text">
              Property owners can efficiently manage tenants, while users can discover reliable PG accommodations tailored to their needs. With a focus on trust and innovation, GetYourStay is redefining how people find and manage PG stays in today's fast-paced world.
            </p>
            <div className="tc-features">
              <div className="tc-feature">
                <div className="tc-feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <polyline points="9,12 11,14 15,10" />
                  </svg>
                </div>
                <span>Verified Listings</span>
              </div>
              <div className="tc-feature">
                <div className="tc-feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                </div>
                <span>Secure Payments</span>
              </div>
              <div className="tc-feature">
                <div className="tc-feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12,6 12,12 16,14" />
                  </svg>
                </div>
                <span>24/7 Support</span>
              </div>
              <div className="tc-feature">
                <div className="tc-feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <span>Transparent Process</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nearby PGs Section */}
      {Array.isArray(nearbyPGs) && nearbyPGs.length > 0 && (
        <section className="nearby-section">
          <div className="nearby-header">
            <div>
              <h2>📍 PGs Near You</h2>
              <p>Based on your current location</p>
            </div>
          </div>
          <div className="nearby-cards">
            {nearbyPGs.filter(Boolean).map((pg) => (
              <div key={pg.id} className="nearby-card">
                <div className="nearby-card-image">
                  <img
                    src={pg.images?.[0] || DEFAULT_IMAGE}
                    alt={pg.name || 'PG'}
                    onError={(e) => { e.target.src = DEFAULT_IMAGE; }}
                  />
                  {pg.isVerified && (
                    <div className="verified-badge">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                      </svg>
                      Verified
                    </div>
                  )}
                </div>
                <div className="nearby-card-content">
                  <div className="nearby-card-header">
                    <h3>{pg.name || 'PG Accommodation'}</h3>
                    <div className="nearby-rating">
                      <span className="star">★</span>
                      <span>{pg.rating?.toFixed(1) || '0'}</span>
                    </div>
                  </div>
                  <p className="nearby-location">{pg.area || 'Bangalore'}</p>
                  <div className="nearby-distance">
                    {pg.distance && (
                      <>
                        <span className="distance">{pg.distance.toFixed(1)} km</span>
                        <span className="walk-time">• {pg.walkTime || '12 min walk'}</span>
                      </>
                    )}
                  </div>
                  <div className="nearby-price-row">
                    {pg.isVerified && (
                      <div className="nearby-price">
                        <span className="price">₹{(pg.longTermRent?.single || pg.shortTermRent?.single || pg.price || 0).toLocaleString()}</span>
                        <span className="period">{pg.rentalType === 'short_term' ? '/day' : '/month'}</span>
                      </div>
                    )}

                    <div className="nearby-beds available">Available</div>
                  </div>
                  <div className="nearby-actions">
                    <button
                      className="checkin-btn"
                      onClick={() => handleViewDetails(pg)}
                    >
                      🏠 Check In
                    </button>
                    <button
                      className="details-btn"
                      onClick={() => handleViewDetails(pg)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Main Content */}
      <main className="main-content">
        <div className="content-header">
          <div className="results-info">
            <h2>{searchQuery ? `Search: "${searchQuery}"` : 'All PGs Available'}</h2>
            <p>{loading ? 'Loading...' : error ? 'Error loading' : `${pagination.total} properties found`}</p>
          </div>

          <div className="header-controls">



          </div>
        </div>

        <div className="content-wrapper">
          <Sidebar
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            selectedAreas={selectedAreas}
            setSelectedAreas={setSelectedAreas}
            selectedGender={selectedGender}
            setSelectedGender={setSelectedGender}
            selectedRentalType={selectedRentalType}
            setSelectedRentalType={setSelectedRentalType}
            areas={availableAreas}
            onClearFilters={handleClearFilters}
            onApplyFilters={handleApplyFilters}
          />

          <div className={`main-area`} style={{ display: 'flex', flexDirection: 'column', }}>
            {(viewMode === 'split' || viewMode === 'list') && (
              <div >
                {loading ? (
                  <div className="loading-state">
                    <div className="loader"></div>
                    <p>Loading PG listings...</p>
                  </div>
                ) : error ? (
                  <div className="error-state">
                    <p>{error}</p>
                    <button onClick={() => fetchPGs()}>Retry</button>
                  </div>
                ) : pgs.length > 0 ? (
                  pgs.filter(Boolean).map((pg) => (
                    <PGCard
                      key={pg.id}
                      pg={pg}
                      onSelect={setSelectedPG}
                      isSelected={selectedPG?.id === pg.id}
                      onViewDetails={handleViewDetails}
                    />
                  ))
                ) : (
                  <div className="no-results">
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
                      <circle cx="11" cy="11" r="8" stroke={theme.accent[500]} strokeWidth="2" />
                      <path d="M21 21l-4.35-4.35" stroke={theme.accent[500]} strokeWidth="2" />
                    </svg>
                    <h3>No PGs Found</h3>
                    <p>Try adjusting your filters</p>
                    <button onClick={handleClearFilters}>Clear All Filters</button>
                  </div>
                )}
              </div>
            )}

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="pagination">

                <button
                  className="pagination-btn"
                  onClick={() => fetchPGs(pagination.page - 1)}
                  disabled={pagination.page <= 1}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                  <span className="btn-text">Previous</span>
                </button>

                <div className="pagination-pages-wrapper">
                  <div className="pagination-pages">
                    {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((pageNum) => (
                      <button
                        key={pageNum}
                        className={`pagination-page ${pagination.page === pageNum ? 'active' : ''}`}
                        onClick={() => fetchPGs(pageNum)}
                      >
                        {pageNum}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  className="pagination-btn"
                  onClick={() => fetchPGs(pagination.page + 1)}
                  disabled={pagination.page >= pagination.pages}
                >
                  <span className="btn-text">Next</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>

              </div>
            )}
          </div>
        </div>

        {/* Value Proposition Section */}
        <section className="value-proposition">
          <div className="vp-container">
            <div className="vp-header">
              <h2 className="vp-title">Why Choose <span className="vp-highlight">GetYourStay</span>?</h2>
              <p className="vp-subtitle">We're not just another PG listing site. We're your trusted partner in finding a home away from home.</p>
            </div>

            <div className="vp-grid">
              <div className="vp-card vp-featured">
                <div className="vp-card-icon">
                  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="2.5" fill="rgba(255,255,255,0.15)" />
                    <path d="M24 12L26.5 20.5L35 20.5L28.5 26L31 35L24 29.5L17 35L19.5 26L13 20.5L21.5 20.5L24 12Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="rgba(255,255,255,0.2)" />
                  </svg>
                </div>
                <h3>100% Verified Listings</h3>
                <p>Every PG on our platform is personally verified by our team. We visit each property, check amenities, verify owners, and ensure safety standards before listing.</p>
                <ul className="vp-features">
                  <li><span className="vp-check">✓</span> In-person property visits</li>
                  <li><span className="vp-check">✓</span> Owner background verification</li>
                  <li><span className="vp-check">✓</span> Amenities authenticity check</li>
                </ul>
              </div>

              <div className="vp-card">
                <div className="vp-card-icon">
                  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="6" y="14" width="36" height="24" rx="4" stroke="currentColor" strokeWidth="2.5" />
                    <path d="M6 22H42" stroke="currentColor" strokeWidth="2.5" />
                    <circle cx="16" cy="30" r="3" stroke="currentColor" strokeWidth="2" />
                    <path d="M26 30H38" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M34 10L38 14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </div>
                <h3>Zero Brokerage Fees</h3>
                <p>Directly connect with PG owners. No middlemen, no brokerage charges, no hidden fees. What you see is exactly what you pay.</p>
              </div>

              <div className="vp-card">
                <div className="vp-card-icon">
                  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 6C17.373 6 12 11.373 12 18C12 24.627 17.373 30 24 30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M24 6C30.627 6 36 11.373 36 18C36 24.627 30.627 30 24 30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                    <circle cx="18" cy="16" r="4" stroke="currentColor" strokeWidth="2.5" />
                    <circle cx="30" cy="16" r="4" stroke="currentColor" strokeWidth="2.5" />
                    <circle cx="24" cy="24" r="4" stroke="currentColor" strokeWidth="2.5" />
                    <path d="M24 30V42" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M18 42H30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </div>
                <h3>Real Tenant Reviews</h3>
                <p>Read genuine reviews from real tenants who have lived in these PGs. Make informed decisions based on actual experiences.</p>
              </div>

              <div className="vp-card">
                <div className="vp-card-icon">
                  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="8" y="6" width="32" height="36" rx="4" stroke="currentColor" strokeWidth="2.5" />
                    <path d="M16 18H32" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M16 24H28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M16 30H24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                    <circle cx="36" cy="36" r="8" fill="white" stroke="currentColor" strokeWidth="2.5" />
                    <path d="M33 36L35.5 38.5L39 34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3>Instant Booking</h3>
                <p>Book your room with just a few clicks. Schedule visits, submit documents, and complete payments - all in one place.</p>
              </div>

              <div className="vp-card">
                <div className="vp-card-icon">
                  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="2.5" />
                    <path d="M24 14V24L30 28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="24" cy="24" r="3" stroke="currentColor" strokeWidth="2" />
                    <circle cx="24" cy="6" r="2" fill="currentColor" />
                    <circle cx="24" cy="42" r="2" fill="currentColor" />
                    <circle cx="6" cy="24" r="2" fill="currentColor" />
                    <circle cx="42" cy="24" r="2" fill="currentColor" />
                  </svg>
                </div>
                <h3>24/7 Support</h3>
                <p>Have questions? Our support team is available round the clock to help you find the perfect PG and resolve any issues.</p>
              </div>

              <div className="vp-card">
                <div className="vp-card-icon">
                  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="8" y="16" width="32" height="24" rx="4" stroke="currentColor" strokeWidth="2.5" />
                    <path d="M8 24H40" stroke="currentColor" strokeWidth="2.5" />
                    <rect x="14" y="28" width="8" height="6" rx="1" stroke="currentColor" strokeWidth="2" />
                    <circle cx="32" cy="31" r="2" fill="currentColor" />
                    <path d="M14 20L18 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M18 20L14 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <h3>Secure Payments</h3>
                <p>Your money is safe with us. We use industry-standard encryption and secure payment gateways for all transactions.</p>
              </div>
            </div>

            <div className="vp-stats-row">
              <div className="vp-stat">
                <span className="vp-stat-number">2,000+</span>
                <span className="vp-stat-label">Happy Tenants</span>
              </div>
              <div className="vp-stat">
                <span className="vp-stat-number">500+</span>
                <span className="vp-stat-label">Verified PGs</span>
              </div>
              <div className="vp-stat">
                <span className="vp-stat-number">50+</span>
                <span className="vp-stat-label">Areas Covered</span>
              </div>
              <div className="vp-stat">
                <span className="vp-stat-number">4.8★</span>
                <span className="vp-stat-label">Average Rating</span>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="how-it-works-section">
          <div className="hiw-container">
            <div className="hiw-header">
              <span className="hiw-badge">Simple Process</span>
              <h2 className="hiw-title">How It Works</h2>
              <p className="hiw-subtitle">Find and book your perfect PG accommodation in 4 easy steps</p>
            </div>

            <div className="hiw-steps">
              {hiwSteps.map((step, index) => (
                <div key={index} className="hiw-step" style={{ animationDelay: `${index * 0.15}s` }}>
                  <div className="hiw-step-number">{index + 1}</div>
                  <div className="hiw-step-icon">{step.icon}</div>
                  <h3 className="hiw-step-title">{step.title}</h3>
                  <p className="hiw-step-desc">{step.description}</p>
                </div>
              ))}
            </div>

            <div className="hiw-cta">
              <button className="hiw-start-btn" onClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })}>
                <span>Start Your Search</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </section>
        {/* CTA Section */}
        <section className="cta-section" style={{ background: theme.gradients.primary }}>
          <div className="cta-content" style={{ color: 'white' }}>
            <h2 style={{ color: 'white' }}>Can't find what you're looking for?</h2>
            <p style={{ color: 'rgba(255,255,255,0.8)' }}>Let us know your requirements and we'll help you find the perfect PG</p>
            <Link to="/contact" className="cta-button" style={{ background: theme.accent[500] }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
              </svg>
              Contact Us
            </Link>
          </div>
        </section>

        {/* SEO Content Section */}
        <section className="seo-content-section">
          <div className="seo-container">
            <h2 className="seo-heading">Why Choose GetYourStay for PG in Bangalore?</h2>
            <p className="seo-subheading">
              India's most trusted platform for finding verified paying guest accommodations in Bangalore
            </p>

            <div className="seo-features-grid">
              <article className="seo-feature-card">
                <div className="seo-feature-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={theme.accent[500]} strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <polyline points="9,12 11,14 15,10" />
                  </svg>
                </div>
                <h3>Verified PG Listings</h3>
                <p>Every PG accommodation on GetYourStay is verified by our team. We personally visit and verify amenities, safety features, and landlord authenticity before listing.</p>
              </article>

              <article className="seo-feature-card">
                <div className="seo-feature-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={theme.accent[500]} strokeWidth="2">
                    <line x1="12" y1="1" x2="12" y2="23" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <h3>Transparent Pricing</h3>
                <p>No hidden charges. Get real pricing information including rent, deposits, food charges, and maintenance fees upfront.</p>
              </article>

              <article className="seo-feature-card">
                <div className="seo-feature-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={theme.accent[500]} strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <h3>Real Reviews & Photos</h3>
                <p>Read genuine reviews from actual tenants. View real photos of rooms, common areas, and facilities.</p>
              </article>

              <article className="seo-feature-card">
                <div className="seo-feature-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={theme.accent[500]} strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <h3>Easy Booking Process</h3>
                <p>Book your PG accommodation online with just a few clicks. Schedule visits, submit documents, and complete payments securely.</p>
              </article>
            </div>
          </div>
        </section>

        {/* Popular Areas Section */}
        <section className="areas-section">
          <div className="areas-container">
            <span className="areas-badge">Popular Locations</span>
            <h2 className="areas-title">Find PG Accommodation in Popular Bangalore Areas</h2>
            <p className="areas-subtitle">
              Discover verified PGs near IT parks, colleges, and lifestyle hubs across Bangalore
            </p>

            <div className="areas-grid">
              {POPULAR_AREAS.map((area, index) => (
                <Link to={area.link} key={index} className="area-card">
                  <div className="area-card-inner">
                    <div className="area-icon-wrapper">
                      <svg className="area-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" fill="#FF6B2C" />
                        <circle cx="12" cy="10" r="3" fill="white" />
                      </svg>
                    </div>
                    <div className="area-content">
                      <div className="area-header">
                        <h3>{area.name}</h3>
                        <span className="area-rent">{area.rentRange}/mo</span>
                      </div>
                      <p className="area-description">{area.description}</p>
                      <div className="area-highlights">
                        {area.highlights.map((highlight, i) => (
                          <span key={i} className="highlight-tag">{highlight}</span>
                        ))}
                      </div>
                    </div>
                    <div className="area-arrow">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* PG Hunting Tips Section */}
        <section className="tips-section">
          <div className="seo-container">
            <h2 className="seo-heading">Essential PG Hunting Tips for Bangalore</h2>
            <p className="seo-subheading">
              Expert advice to find the perfect paying guest accommodation without any hassle
            </p>

            <div className="tips-grid">
              {PG_HUNTING_TIPS.map((tip, index) => (
                <div key={index} className="tip-card">
                  <div className="tip-icon">{tip.icon}</div>
                  <h3>{tip.title}</h3>
                  <p>{tip.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq-seo-section">
          <div className="seo-container">
            <h2 className="seo-heading">Frequently Asked Questions About PG in Bangalore</h2>
            <p className="seo-subheading">
              Everything you need to know about finding and booking PG accommodation in Bangalore
            </p>

            <div className="faq-list">
              {HOME_SEO_FAQS.map((faq, index) => (
                <details key={index} className="faq-item">
                  <summary className="faq-question">{faq.question}</summary>
                  <div className="faq-answer">{faq.answer}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Cities Section */}
        <section className="cities-section">
          <div className="seo-container">
            <h2 className="seo-heading">PG Accommodation Across Major Indian Cities</h2>
            <p className="seo-subheading">
              Find verified PGs not just in Bangalore but across all major Indian cities
            </p>

            <div className="cities-grid">
              <Link to="/?city=Bangalore" className="city-card">
                <span className="city-name">PG in Bangalore</span>
                <span className="city-count">500+ Listings</span>
              </Link>
              <Link to="/?city=Hyderabad" className="city-card">
                <span className="city-name">PG in Hyderabad</span>
                <span className="city-count">300+ Listings</span>
              </Link>
              <Link to="/?city=Chennai" className="city-card">
                <span className="city-name">PG in Chennai</span>
                <span className="city-count">250+ Listings</span>
              </Link>
              <Link to="/?city=Pune" className="city-card">
                <span className="city-name">PG in Pune</span>
                <span className="city-count">200+ Listings</span>
              </Link>
              <Link to="/?city=Mumbai" className="city-card">
                <span className="city-name">PG in Mumbai</span>
                <span className="city-count">180+ Listings</span>
              </Link>
              <Link to="/?city=Delhi" className="city-card">
                <span className="city-name">PG in Delhi</span>
                <span className="city-count">150+ Listings</span>
              </Link>
            </div>
          </div>
        </section>

        {/* PG Types Section */}
        <section className="types-section">
          <div className="seo-container">
            <h2 className="seo-heading">Browse PGs by Type</h2>
            <p className="seo-subheading">
              Find the perfect PG accommodation based on your specific needs and preferences
            </p>

            <div className="types-grid">
              <Link to="/?gender=male" className="type-card boys">
                <span className="type-icon">
                  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="maleGrad" x1="0" y1="0" x2="64" y2="64">
                        <stop offset="0%" stopColor="#3B82F6" />
                        <stop offset="100%" stopColor="#1D4ED8" />
                      </linearGradient>
                    </defs>
                    <rect x="4" y="4" width="56" height="56" rx="16" fill="url(#maleGrad)" />
                    <circle cx="32" cy="24" r="10" fill="white" fillOpacity="0.9" />
                    <path d="M16 52C16 40.954 24.954 32 32 32C39.046 32 48 40.954 48 52" stroke="white" strokeWidth="4" strokeLinecap="round" />
                    <circle cx="32" cy="24" r="5" fill="#1D4ED8" />
                  </svg>
                </span>
                <span className="type-name">Boys PG</span>
                <span className="type-desc">Safe accommodation for male tenants</span>
              </Link>
              <Link to="/?gender=female" className="type-card girls">
                <span className="type-icon">
                  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="femaleGrad" x1="0" y1="0" x2="64" y2="64">
                        <stop offset="0%" stopColor="#EC4899" />
                        <stop offset="100%" stopColor="#BE185D" />
                      </linearGradient>
                    </defs>
                    <rect x="4" y="4" width="56" height="56" rx="16" fill="url(#femaleGrad)" />
                    <circle cx="32" cy="22" r="10" fill="white" fillOpacity="0.9" />
                    <path d="M20 54C20 41.85 26.85 32 32 32C37.15 32 44 41.85 44 54" stroke="white" strokeWidth="4" strokeLinecap="round" />
                    <path d="M28 20C28 20 30 16 32 16C34 16 36 20 36 20" stroke="#BE185D" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="32" cy="22" r="4" fill="#BE185D" />
                  </svg>
                </span>
                <span className="type-name">Girls PG</span>
                <span className="type-desc">Secure PGs for female tenants</span>
              </Link>
              <Link to="/?type=colive" className="type-card colive">
                <span className="type-icon">
                  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="coliveGrad" x1="0" y1="0" x2="64" y2="64">
                        <stop offset="0%" stopColor="#8B5CF6" />
                        <stop offset="100%" stopColor="#6D28D9" />
                      </linearGradient>
                    </defs>
                    <rect x="4" y="4" width="56" height="56" rx="16" fill="url(#coliveGrad)" />
                    <circle cx="22" cy="26" r="6" fill="white" fillOpacity="0.9" />
                    <circle cx="42" cy="26" r="6" fill="white" fillOpacity="0.9" />
                    <circle cx="32" cy="42" r="6" fill="white" fillOpacity="0.9" />
                    <path d="M22 26L32 42M42 26L32 42M22 26H42" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </span>
                <span className="type-name">Co-living</span>
                <span className="type-desc">Modern shared living spaces</span>
              </Link>
              <Link to="/?amenity=AC" className="type-card ac">
                <span className="type-icon">
                  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="acGrad" x1="0" y1="0" x2="64" y2="64">
                        <stop offset="0%" stopColor="#10B981" />
                        <stop offset="100%" stopColor="#059669" />
                      </linearGradient>
                    </defs>
                    <rect x="4" y="4" width="56" height="56" rx="16" fill="url(#acGrad)" />
                    <rect x="12" y="20" width="40" height="24" rx="4" fill="white" fillOpacity="0.9" />
                    <path d="M18 28H46M18 32H38M18 36H30" stroke="#059669" strokeWidth="3" strokeLinecap="round" />
                    <path d="M48 12L52 16M52 12L48 16" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M54 20L58 24M58 20L54 24" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </span>
                <span className="type-name">AC PG</span>
                <span className="type-desc">Air-conditioned rooms</span>
              </Link>
              <Link to="/?amenity=WiFi" className="type-card wifi">
                <span className="type-icon">
                  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="wifiGrad" x1="0" y1="0" x2="64" y2="64">
                        <stop offset="0%" stopColor="#F97316" />
                        <stop offset="100%" stopColor="#EA580C" />
                      </linearGradient>
                    </defs>
                    <rect x="4" y="4" width="56" height="56" rx="16" fill="url(#wifiGrad)" />
                    <path d="M32 20C40.837 20 48 27.163 48 36H16C16 27.163 23.163 20 32 20Z" fill="white" fillOpacity="0.9" />
                    <path d="M22 36C22 42.627 27.373 48 32 48C36.627 48 42 42.627 42 36" stroke="white" strokeWidth="4" strokeLinecap="round" />
                    <circle cx="32" cy="54" r="4" fill="white" />
                  </svg>
                </span>
                <span className="type-name">WiFi PG</span>
                <span className="type-desc">High-speed internet access</span>
              </Link>
              <Link to="/?food=true" className="type-card food">
                <span className="type-icon">
                  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="foodGrad" x1="0" y1="0" x2="64" y2="64">
                        <stop offset="0%" stopColor="#F59E0B" />
                        <stop offset="100%" stopColor="#D97706" />
                      </linearGradient>
                    </defs>
                    <rect x="4" y="4" width="56" height="56" rx="16" fill="url(#foodGrad)" />
                    <ellipse cx="32" cy="42" rx="18" ry="8" fill="white" fillOpacity="0.9" />
                    <ellipse cx="32" cy="40" rx="18" ry="8" fill="white" />
                    <path d="M14 42V36C14 30.477 22.059 26 32 26C41.941 26 50 30.477 50 36V42" stroke="white" strokeWidth="3" />
                    <rect x="28" y="12" width="8" height="14" rx="2" fill="white" />
                    <path d="M24 12H40V16H24V12Z" fill="white" fillOpacity="0.8" />
                  </svg>
                </span>
                <span className="type-name">PG with Food</span>
                <span className="type-desc">Meals included accommodation</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* PG Detail Modal */}
      {detailPG && (
        <PGDetail
          pg={detailPG}
          onClose={handleCloseDetail}
          onEnquire={() => { }}
        />
      )}

      <style>{`
        .home-tabs {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }
        
        /* Search Bar Styles */
        .search-container {
          display: flex;
          gap: 10px;
          max-width: 600px;
          margin: 0 auto 25px;
          width: 100%;
          padding: 0 20px;
        }
        .search-input-wrapper {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 12px;
          padding: 0 16px;
          backdrop-filter: blur(10px);
        }
        .search-input-wrapper svg {
          flex-shrink: 0;
        }
        .search-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          padding: 14px 0;
          color: white;
          font-size: 14px;
        }
        .search-input::placeholder {
          color: rgba(255,255,255,0.6);
        }
        .search-clear {
          background: rgba(255,255,255,0.2);
          border: none;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: white;
          font-size: 18px;
          line-height: 1;
        }
        .search-clear:hover {
          background: rgba(255,255,255,0.3);
        }
        .search-btn {
          padding: 14px 28px;
          background: ${theme.accent[500]};
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
        }
        .search-btn:hover {
          background: ${theme.accent[600]};
          transform: translateY(-1px);
        }
        .home-tab {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: rgba(255,255,255,0.1);
          border: 2px solid rgba(255,255,255,0.2);
          border-radius: 12px;
          color: white;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          backdrop-filter: blur(4px);
        }
        .home-tab:hover:not(.coming-soon) {
          background: rgba(255,255,255,0.2);
          border-color: rgba(255,255,255,0.3);
        }
        .home-tab.active {
          background: ${theme.accent[500]};
          border-color: ${theme.accent[500]};
          box-shadow: 0 4px 15px rgba(249, 115, 22, 0.4);
        }
        .home-tab.coming-soon {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .tab-icon { font-size: 18px; }
        .coming-soon-badge {
          position: absolute;
          top: -8px;
          right: -8px;
          padding: 3px 8px;
          background: ${theme.accent[500]};
          color: white;
          font-size: 9px;
          font-weight: 600;
          border-radius: 10px;
          white-space: nowrap;
        }

        /* Trust Content Section */
        .trust-content-section {
          background: linear-gradient(180deg, #FFFFFF 0%, #F8F7F4 100%);
          padding: 80px 40px;
          border-top: 1px solid #E8E4DE;
          border-bottom: 1px solid #E8E4DE;
          width: 100%;
        }
        .tc-container {
          max-width: 100%;
          margin: 0 auto;
          text-align: center;
          padding: 0;
        }
        .tc-content {
          position: relative;
        }
        .tc-badge {
          display: inline-block;
          padding: 10px 24px;
          background: linear-gradient(135deg, rgba(255, 107, 44, 0.1), rgba(255, 107, 44, 0.05));
          color: #FF6B2C;
          font-size: 13px;
          font-weight: 700;
          border-radius: 50px;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 24px;
          font-family: 'Poppins', sans-serif;
          border: 2px solid rgba(255, 107, 44, 0.2);
        }
        .tc-title {
          font-size: 36px;
          font-weight: 800;
          color: #0D1117;
          margin: 0 0 28px;
          line-height: 1.25;
          letter-spacing: -0.5px;
          font-family: 'Poppins', sans-serif;
          position: relative;
        }
        .tc-title::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 4px;
          background: linear-gradient(90deg, #FF6B2C, #FFB088);
          border-radius: 2px;
        }
        .tc-text {
          font-size: 18px;
          color: #64748B;
          line-height: 1.9;
          margin: 0 0 20px;
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
        }
        .tc-features {
          display: flex;
          justify-content: center;
          gap: 40px;
          margin-top: 50px;
          flex-wrap: wrap;
        }
        .tc-feature {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
        }
        .tc-feature-icon {
          width: 64px;
          height: 64px;
          background: linear-gradient(135deg, #FF6B2C, #E85B1C);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 12px 30px rgba(255, 107, 44, 0.3);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          overflow: hidden;
        }
        .tc-feature-icon::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 50%;
          background: linear-gradient(180deg, rgba(255,255,255,0.2), transparent);
          border-radius: 20px 20px 0 0;
        }
        .tc-feature:hover .tc-feature-icon {
          transform: translateY(-6px) scale(1.05);
          box-shadow: 0 20px 40px rgba(255, 107, 44, 0.4);
        }
        .tc-feature-icon svg {
          width: 28px;
          height: 28px;
          stroke: white;
          stroke-width: 2;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
        }
        .tc-feature span {
          font-size: 14px;
          font-weight: 600;
          color: #1E293B;
          font-family: 'Poppins', sans-serif;
          letter-spacing: 0.3px;
        }
        
        .nearby-section {
          max-width: 1400px;
          margin: 0 auto;
          padding: 30px 20px;
        }
        .nearby-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .nearby-header h2 {
          font-size: 20px;
          font-weight: 700;
          color: ${theme.primary[800]};
          margin: 0;
        }
        .nearby-header p {
          font-size: 13px;
          color: ${theme.neutral[500]};
          margin: 4px 0 0;
        }
        .view-all-link {
          color: ${theme.accent[500]};
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
        }
        .nearby-cards {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 16px;
        }
        .nearby-card {
          background: white;
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
          transition: all 0.3s ease;
        }
        .nearby-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.12);
        }
        .nearby-card-image {
          position: relative;
          height: 140px;
          background: ${theme.neutral[100]};
        }
        .nearby-card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .verified-badge {
          position: absolute;
          top: 8px;
          left: 8px;
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 4px 8px;
          background: ${theme.success};
          color: white;
          font-size: 10px;
          font-weight: 600;
          border-radius: 12px;
        }
        .nearby-card-content {
          padding: 14px;
        }
        .nearby-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 4px;
        }
        .nearby-card-header h3 {
          font-size: 14px;
          font-weight: 700;
          color: ${theme.primary[800]};
          margin: 0;
          flex: 1;
        }
        .nearby-rating {
          display: flex;
          align-items: center;
          gap: 2px;
          font-size: 12px;
          font-weight: 600;
          color: ${theme.primary[800]};
        }
        .nearby-rating .star { color: ${theme.accent[500]}; }
        .nearby-location {
          font-size: 11px;
          color: ${theme.neutral[500]};
          margin: 0 0 6px;
        }
        .nearby-distance {
          font-size: 11px;
          color: ${theme.success};
          margin-bottom: 10px;
        }
        .nearby-distance .walk-time { color: ${theme.neutral[500]}; }
        .nearby-price-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .nearby-price .price {
          font-size: 18px;
          font-weight: 700;
          color: ${theme.accent[500]};
        }
        .nearby-price .period {
          font-size: 10px;
          color: ${theme.neutral[400]};
        }
        .nearby-beds {
          font-size: 11px;
          font-weight: 500;
        }
        .nearby-beds.available { color: ${theme.success}; }
        .nearby-actions {
          display: flex;
          gap: 8px;
        }
        .checkin-btn {
          flex: 1;
          padding: 10px;
          background: ${theme.accent[500]};
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .checkin-btn:hover {
          background: ${theme.accent[600]};
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3);
        }
        .details-btn {
          padding: 10px 14px;
          background: white;
          border: 1px solid ${theme.neutral[200]};
          border-radius: 8px;
          font-size: 12px;
          font-weight: 500;
          color: ${theme.neutral[600]};
          cursor: pointer;
        }
        .loading-state, .error-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 20px;
          text-align: center;
          background: white;
          border-radius: 14px;
          grid-column: 1 / -1;
        }
        .loader {
          width: 40px;
          height: 40px;
          border: 3px solid ${theme.neutral[200]};
          border-top-color: ${theme.accent[500]};
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin-bottom: 15px;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .error-state button {
          margin-top: 15px;
          padding: 10px 20px;
          background: ${theme.accent[500]};
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
        }
        
        @media (max-width: 768px) {
          .home-tabs { gap: 8px; }
          .home-tab { padding: 10px 16px; font-size: 12px; }
          .tab-icon { font-size: 16px; }
          .coming-soon-badge { font-size: 8px; padding: 2px 6px; }
          .nearby-section { padding: 20px 15px; }
          .nearby-cards { grid-template-columns: 1fr; }
          .trust-content-section { padding: 60px 40px; }
          .tc-badge { font-size: 11px; padding: 8px 18px; margin-bottom: 20px; }
          .tc-title { font-size: 28px; margin-bottom: 24px; }
          .tc-text { font-size: 16px; line-height: 1.8; max-width: 100%; }
          .tc-features { gap: 24px; margin-top: 40px; }
          .tc-feature-icon { width: 56px; height: 56px; }
          .tc-feature-icon svg { width: 24px; height: 24px; }
          .tc-feature span { font-size: 13px; }
          .search-container { flex-direction: column; gap: 10px; padding: 0 15px; }
          .search-input-wrapper { padding: 0 12px; }
          .search-input { padding: 12px 0; font-size: 13px; }
          .search-btn { padding: 12px 20px; width: 100%; }
        }

        @media (max-width: 480px) {
          .trust-content-section { padding: 50px 20px; }
          .tc-badge { font-size: 10px; padding: 6px 14px; letter-spacing: 1.5px; }
          .tc-title { font-size: 24px; line-height: 1.3; }
          .tc-text { font-size: 15px; line-height: 1.75; max-width: 100%; }
          .tc-features { gap: 20px; margin-top: 30px; }
          .tc-feature-icon { width: 52px; height: 52px; border-radius: 16px; }
          .tc-feature-icon svg { width: 22px; height: 22px; }
          .tc-feature span { font-size: 12px; }
          .hero h1 { font-size: 24px; }
          .hero p { font-size: 14px; }
          .search-container { margin-bottom: 20px; }
          .search-input-wrapper { gap: 8px; }
          .search-input { padding: 10px 0; font-size: 12px; }
          .search-btn { padding: 10px 16px; font-size: 13px; }
        }

        /* SEO Content Sections */
        .seo-content-section {
          background: white;
          padding: 60px 20px;
          border-top: 1px solid ${theme.neutral[200]};
        }
        .seo-container {
          max-width: 1200px;
          margin: 0 auto;
        }
        .seo-heading {
          font-size: 28px;
          font-weight: 700;
          color: ${theme.primary[800]};
          text-align: center;
          margin: 0 0 10px;
        }
        .seo-subheading {
          font-size: 16px;
          color: ${theme.neutral[500]};
          text-align: center;
          margin: 0 0 40px;
        }
        .seo-features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 24px;
        }
        .seo-feature-card {
          background: ${theme.neutral[50]};
          border-radius: 16px;
          padding: 28px;
          text-align: center;
          transition: all 0.3s ease;
        }
        .seo-feature-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 30px rgba(0,0,0,0.08);
        }
        .seo-feature-icon {
          width: 64px;
          height: 64px;
          background: white;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        .seo-feature-card h3 {
          font-size: 18px;
          font-weight: 700;
          color: ${theme.primary[800]};
          margin: 0 0 12px;
        }
        .seo-feature-card p {
          font-size: 14px;
          color: ${theme.neutral[600]};
          line-height: 1.6;
          margin: 0;
        }
        
        @media (max-width: 768px) {
          .seo-content-section {
            padding: 40px 15px;
          }
          .seo-heading {
            font-size: 22px;
          }
          .seo-subheading {
            font-size: 14px;
          }
          .seo-feature-card {
            padding: 20px;
          }
        }

        /* Areas Section */
        .areas-section {
          background: white;
          padding: 80px 40px;
          border-top: 1px solid #E8E4DE;
        }
        .areas-container {
          max-width: 1400px;
          margin: 0 auto;
        }
        .areas-badge {
          display: inline-block;
          padding: 10px 24px;
          background: linear-gradient(135deg, rgba(255, 107, 44, 0.1), rgba(255, 107, 44, 0.05));
          color: #FF6B2C;
          font-size: 13px;
          font-weight: 700;
          border-radius: 50px;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 20px;
          font-family: 'Poppins', sans-serif;
          border: 2px solid rgba(255, 107, 44, 0.2);
        }
        .areas-title {
          font-size: 36px;
          font-weight: 800;
          color: #0D1117;
          margin: 0 0 16px;
          line-height: 1.25;
          letter-spacing: -0.5px;
          font-family: 'Poppins', sans-serif;
        }
        .areas-subtitle {
          font-size: 17px;
          color: #64748B;
          margin: 0 0 40px;
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          max-width: 600px;
        }
        .areas-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .area-card {
          background: #F8F7F4;
          border-radius: 20px;
          padding: 28px;
          text-decoration: none;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          border: 2px solid transparent;
          position: relative;
          overflow: hidden;
        }
        .area-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #FF6B2C, #FFB088);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .area-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.12);
          border-color: transparent;
          background: white;
        }
        .area-card:hover::before {
          opacity: 1;
        }
        .area-card:hover .area-arrow {
          opacity: 1;
          transform: translateX(0);
        }
        .area-card:hover .area-icon-wrapper {
          transform: scale(1.1);
          background: linear-gradient(135deg, #FF6B2C, #E85B1C);
        }
        .area-card:hover .area-icon-wrapper svg {
          fill: white;
        }
        .area-card-inner {
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }
        .area-icon-wrapper {
          width: 56px;
          height: 56px;
          background: white;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
          flex-shrink: 0;
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
        }
        .area-icon-wrapper::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 50%;
          background: linear-gradient(180deg, rgba(255,255,255,0.4), transparent);
          border-radius: 16px 16px 0 0;
        }
        .area-icon {
          width: 28px;
          height: 28px;
          position: relative;
          z-index: 1;
        }
        .area-content {
          flex: 1;
          min-width: 0;
        }
        .area-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 8px;
        }
        .area-header h3 {
          font-size: 18px;
          font-weight: 700;
          color: #0D1117;
          margin: 0;
          font-family: 'Poppins', sans-serif;
        }
        .area-rent {
          font-size: 12px;
          font-weight: 700;
          color: #FF6B2C;
          background: rgba(255, 107, 44, 0.1);
          padding: 4px 12px;
          border-radius: 20px;
          white-space: nowrap;
          font-family: 'Poppins', sans-serif;
        }
        .area-description {
          font-size: 13px;
          color: #64748B;
          margin: 0 0 14px;
          line-height: 1.6;
          font-family: 'Poppins', sans-serif;
        }
        .area-highlights {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .highlight-tag {
          font-size: 11px;
          font-weight: 600;
          color: #475569;
          background: white;
          padding: 5px 12px;
          border-radius: 20px;
          font-family: 'Poppins', sans-serif;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        }
        .area-arrow {
          position: absolute;
          right: 24px;
          top: 50%;
          transform: translateX(10px);
          opacity: 0;
          transition: all 0.3s ease;
        }
        .area-arrow svg {
          width: 24px;
          height: 24px;
          stroke: #FF6B2C;
        }

        /* Tips Section */
        .tips-section {
          background: white;
          padding: 60px 20px;
        }
        .tips-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
          margin-top: 30px;
        }
        .tip-card {
          background: white;
          border-radius: 20px;
          padding: 28px;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          border: 2px solid transparent;
          position: relative;
          overflow: hidden;
        }
        .tip-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #FF6B2C, #FFB088);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .tip-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.12);
          border-color: rgba(255, 107, 44, 0.2);
        }
        .tip-card:hover::before {
          opacity: 1;
        }
        .tip-icon {
          width: 64px;
          height: 64px;
          background: linear-gradient(135deg, #FF6B2C, #E85B1C);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          box-shadow: 0 8px 24px rgba(255, 107, 44, 0.3);
          transition: all 0.4s ease;
        }
        .tip-card:hover .tip-icon {
          transform: scale(1.1);
          box-shadow: 0 12px 32px rgba(255, 107, 44, 0.4);
        }
        .tip-icon svg {
          width: 32px;
          height: 32px;
          stroke: white;
          stroke-width: 1.75;
        }
        .tip-card h3 {
          font-size: 18px;
          font-weight: 700;
          color: #0D1117;
          margin: 0 0 12px;
          font-family: 'Poppins', sans-serif;
        }
        .tip-card p {
          font-size: 14px;
          color: #64748B;
          margin: 0;
          line-height: 1.7;
          font-family: 'Poppins', sans-serif;
        }

        /* FAQ SEO Section */
        .faq-seo-section {
          background: #f8fafc;
          padding: 60px 20px;
        }
        .faq-list {
          margin-top: 30px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .faq-item {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #e2e8f0;
        }
        .faq-item summary {
          padding: 18px 24px;
          font-size: 15px;
          font-weight: 600;
          color: ${theme.primary[800]};
          cursor: pointer;
          list-style: none;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .faq-item summary::-webkit-details-marker {
          display: none;
        }
        .faq-item summary::after {
          content: '+';
          font-size: 20px;
          font-weight: 400;
          color: ${theme.accent[500]};
          transition: transform 0.2s;
        }
        .faq-item[open] summary::after {
          transform: rotate(45deg);
        }
        .faq-item[open] summary {
          border-bottom: 1px solid #e2e8f0;
        }
        .faq-answer {
          padding: 18px 24px;
          font-size: 14px;
          color: ${theme.neutral[600]};
          line-height: 1.7;
          background: ${theme.neutral[50]};
        }

        /* Cities Section */
        .cities-section {
          background: white;
          padding: 60px 20px;
        }
        .cities-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 16px;
          margin-top: 30px;
        }
        .city-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px;
          background: ${theme.primary[50]};
          border-radius: 12px;
          text-decoration: none;
          transition: all 0.3s ease;
          border: 1px solid transparent;
        }
        .city-card:hover {
          background: ${theme.primary[100]};
          border-color: ${theme.primary[300]};
          transform: translateY(-2px);
        }
        .city-name {
          font-size: 15px;
          font-weight: 600;
          color: ${theme.primary[800]};
          margin-bottom: 4px;
        }
        .city-count {
          font-size: 12px;
          color: ${theme.neutral[500]};
        }

        /* Types Section */
        .types-section {
          background: #F8F7F4;
          padding: 80px 40px;
          border-top: 1px solid #E8E4DE;
        }
        .types-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 24px;
          margin-top: 40px;
        }
        .type-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 32px 20px;
          background: white;
          border-radius: 24px;
          text-decoration: none;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          border: 2px solid transparent;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
        }
        .type-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #FF6B2C, #FFB088);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .type-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.12);
          border-color: transparent;
        }
        .type-card:hover::before {
          opacity: 1;
        }
        .type-card:hover .type-icon {
          transform: scale(1.1) translateY(-4px);
        }
        .type-card:hover .type-icon svg {
          filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.2));
        }
        .type-icon {
          width: 80px;
          height: 80px;
          margin-bottom: 20px;
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .type-icon svg {
          width: 100%;
          height: 100%;
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
          transition: filter 0.3s ease;
        }
        .type-icon svg {
          width: 100%;
          height: 100%;
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
          transition: filter 0.3s ease;
        }
        .type-name {
          font-size: 16px;
          font-weight: 700;
          color: ${theme.primary[800]};
          margin-bottom: 6px;
          font-family: 'Poppins', sans-serif;
          transition: color 0.3s ease;
        }
        .type-card:hover .type-name {
          color: ${theme.accent[500]};
        }
        .type-desc {
          font-size: 12px;
          color: ${theme.neutral[500]};
          text-align: center;
          line-height: 1.5;
        }

        /* How It Works Section */
        .how-it-works-section {
          background: linear-gradient(180deg, #F8F7F4 0%, #FFFFFF 100%);
          padding: 80px 20px;
          position: relative;
          overflow: hidden;
        }

        /* Value Proposition Section */
        .value-proposition {
          background: white;
          padding: 80px 20px;
        }
        .vp-container {
          max-width: 1200px;
          margin: 0 auto;
        }
        .vp-header {
          text-align: center;
          margin-bottom: 50px;
        }
        .vp-title {
          font-size: 38px;
          font-weight: 800;
          color: #0D1117;
          margin: 0 0 16px;
          letter-spacing: -0.5px;
          line-height: 1.2;
          font-family: 'Poppins', sans-serif;
        }
        .vp-highlight {
          background: linear-gradient(135deg, #FF6B2C, #E85B1C);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .vp-subtitle {
          font-size: 17px;
          color: #64748B;
          margin: 0;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
        }
        .vp-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-bottom: 50px;
        }
        .vp-card {
          background: #F8F7F4;
          border-radius: 20px;
          padding: 28px;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          border: 2px solid transparent;
        }
        .vp-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
          border-color: #FF6B2C;
        }
        .vp-card.vp-featured {
          background: linear-gradient(135deg, #FF6B2C, #E85B1C);
          color: white;
          grid-column: span 1;
          position: relative;
          overflow: hidden;
        }
        .vp-card.vp-featured::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -50%;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
          animation: shimmer 3s ease-in-out infinite;
        }
        @keyframes shimmer {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        .vp-card.vp-featured .vp-card-icon {
          background: rgba(255, 255, 255, 0.2);
        }
        .vp-card.vp-featured .vp-card-icon svg {
          stroke: white;
        }
        .vp-card.vp-featured h3 {
          color: white;
        }
        .vp-card.vp-featured p {
          color: rgba(255, 255, 255, 0.9);
        }
        .vp-card.vp-featured .vp-features {
          list-style: none;
          padding: 0;
          margin: 16px 0 0;
        }
        .vp-card.vp-featured .vp-features li {
          color: white;
          font-size: 13px;
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .vp-card-icon {
          width: 56px;
          height: 56px;
          background: white;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255,255,255,0.8);
          border: 1px solid rgba(0,0,0,0.05);
          transition: all 0.3s ease;
        }
        .vp-card:hover .vp-card-icon {
          transform: translateY(-4px) scale(1.05);
          box-shadow: 0 12px 30px rgba(255, 107, 44, 0.2);
        }
        .vp-card-icon svg {
          width: 32px;
          height: 32px;
          stroke: #FF6B2C;
          stroke-width: 1.75;
        }
        .vp-card h3 {
          font-size: 20px;
          font-weight: 700;
          color: #0D1117;
          margin: 0 0 12px;
          font-family: 'Poppins', sans-serif;
        }
        .vp-card p {
          font-size: 14px;
          color: #64748B;
          line-height: 1.6;
          margin: 0;
        }
        .vp-check {
          color: #22C55E;
          font-weight: 700;
        }
        .vp-stats-row {
          display: flex;
          justify-content: center;
          gap: 60px;
          padding: 40px;
          background: linear-gradient(135deg, #0D1117, #1a1a2e);
          border-radius: 24px;
          position: relative;
          overflow: hidden;
        }
        .vp-stats-row::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
        .vp-stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          z-index: 1;
        }
        .vp-stat-number {
          font-size: 36px;
          font-weight: 800;
          color: white;
          letter-spacing: -1px;
          font-family: 'Poppins', sans-serif;
        }
        .vp-stat-label {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.7);
          margin-top: 4px;
          font-weight: 500;
          font-family: 'Poppins', sans-serif;
        }
        .how-it-works-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #E8E4DE, transparent);
        }
        .hiw-container {
          max-width: 1100px;
          margin: 0 auto;
        }
        .hiw-header {
          text-align: center;
          margin-bottom: 60px;
        }
        .hiw-badge {
          display: inline-block;
          padding: 8px 20px;
          background: linear-gradient(135deg, rgba(249, 115, 22, 0.1), rgba(249, 115, 22, 0.05));
          color: #FF6B2C;
          font-size: 13px;
          font-weight: 700;
          border-radius: 50px;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 16px;
          font-family: 'Poppins', sans-serif;
        }
        .hiw-title {
          font-size: 40px;
          font-weight: 800;
          color: #0D1117;
          margin: 0 0 12px;
          letter-spacing: -1px;
          line-height: 1.1;
          font-family: 'Poppins', sans-serif;
        }
        .hiw-subtitle {
          font-size: 16px;
          color: #64748B;
          margin: 0;
          max-width: 500px;
          margin: 0 auto;
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
        }
        .hiw-steps {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 30px;
          position: relative;
        }
        .hiw-steps::before {
          content: '';
          position: absolute;
          top: 55px;
          left: 12.5%;
          right: 12.5%;
          height: 3px;
          background: linear-gradient(90deg, #FF6B2C, #FF8F5C, #FFB088, #FFD4B8);
          border-radius: 2px;
          z-index: 0;
        }
        .hiw-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          position: relative;
          z-index: 1;
          animation: fadeInUp 0.6s ease forwards;
          opacity: 0;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .hiw-step:nth-child(1) { animation-delay: 0s; }
        .hiw-step:nth-child(2) { animation-delay: 0.15s; }
        .hiw-step:nth-child(3) { animation-delay: 0.3s; }
        .hiw-step:nth-child(4) { animation-delay: 0.45s; }
        .hiw-step-number {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #FF6B2C, #E85B1C);
          color: white;
          font-size: 16px;
          font-weight: 800;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          box-shadow: 0 8px 20px rgba(255, 107, 44, 0.3);
          position: relative;
        }
        .hiw-step-number::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: inherit;
          animation: pulse 2s ease-in-out infinite;
          z-index: -1;
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.3); opacity: 0; }
        }
        .hiw-step-icon {
          width: 90px;
          height: 90px;
          background: white;
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08), inset 0 2px 0 rgba(255,255,255,0.8);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          border: 1px solid rgba(0,0,0,0.05);
          position: relative;
          overflow: hidden;
        }
        .hiw-step-icon::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #FF6B2C, #FFB088);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .hiw-step:hover .hiw-step-icon::before {
          opacity: 1;
        }
        .hiw-step-icon svg {
          width: 42px;
          height: 42px;
          stroke: #FF6B2C;
          transition: all 0.3s ease;
          filter: drop-shadow(0 2px 4px rgba(255, 107, 44, 0.2));
        }
        .hiw-step:hover .hiw-step-icon {
          transform: translateY(-8px) scale(1.05);
          box-shadow: 0 20px 50px rgba(255, 107, 44, 0.2);
          border-color: rgba(255, 107, 44, 0.3);
        }
        .hiw-step:hover .hiw-step-icon svg {
          stroke: #E85B1C;
          transform: scale(1.1);
        }
        .hiw-step-title {
          font-size: 18px;
          font-weight: 800;
          color: #0D1117;
          margin: 0 0 10px;
          letter-spacing: -0.3px;
          font-family: 'Poppins', sans-serif;
        }
        .hiw-step-desc {
          font-size: 14px;
          color: #64748B;
          margin: 0;
          line-height: 1.6;
          max-width: 200px;
          font-family: 'Poppins', sans-serif;
        }
        .hiw-cta {
          text-align: center;
          margin-top: 50px;
        }
        .hiw-start-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 16px 32px;
          background: linear-gradient(135deg, #FF6B2C, #E85B1C);
          color: white;
          border: none;
          border-radius: 14px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 10px 30px rgba(255, 107, 44, 0.3);
          font-family: 'Poppins', sans-serif;
        }
        .hiw-start-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(255, 107, 44, 0.4);
        }
        .hiw-start-btn svg {
          transition: transform 0.3s ease;
        }
        .hiw-start-btn:hover svg {
          transform: translateX(5px);
        }

        @media (max-width: 1024px) {
          .areas-section {
            padding: 60px 30px;
          }
          .areas-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .areas-title {
            font-size: 30px;
          }
        }

        @media (max-width: 768px) {
          .areas-section {
            padding: 50px 20px;
          }
          .areas-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .areas-title {
            font-size: 26px;
          }
          .areas-subtitle {
            font-size: 15px;
            margin-bottom: 30px;
          }
          .area-card {
            padding: 20px;
          }
          .area-icon-wrapper {
            width: 48px;
            height: 48px;
          }
          .area-icon {
            width: 24px;
            height: 24px;
          }
          .area-header h3 {
            font-size: 16px;
          }
          .area-description {
            font-size: 12px;
          }
          .area-arrow {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .areas-section {
            padding: 40px 15px;
          }
          .areas-badge {
            font-size: 10px;
            padding: 6px 14px;
          }
          .areas-title {
            font-size: 22px;
          }
          .areas-subtitle {
            font-size: 14px;
          }
          .area-card-inner {
            gap: 12px;
          }
          .area-icon-wrapper {
            width: 44px;
            height: 44px;
            border-radius: 12px;
          }
        }

        @media (max-width: 1200px) {
          .types-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 768px) {
          .tips-section, .faq-seo-section, .cities-section, .types-section {
            padding: 40px 15px;
          }
          .tips-grid {
            grid-template-columns: 1fr;
          }
          .cities-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .types-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
          }
          .type-card {
            padding: 20px 12px;
          }
          .type-icon {
            width: 56px;
            height: 56px;
          }
          .type-name {
            font-size: 14px;
          }
          .type-desc {
            font-size: 11px;
          }
          .how-it-works-section {
            padding: 50px 15px;
          }
          .hiw-title {
            font-size: 28px;
          }
          .hiw-steps {
            grid-template-columns: repeat(2, 1fr);
            gap: 40px;
          }
          .hiw-steps::before {
            display: none;
          }
          .hiw-step-icon {
            width: 70px;
            height: 70px;
          }
          .hiw-step-icon svg {
            width: 28px;
            height: 28px;
          }
          .hiw-step-title {
            font-size: 16px;
          }
          .hiw-step-desc {
            font-size: 13px;
          }
          .hiw-start-btn {
            padding: 14px 24px;
            font-size: 14px;
          }
        }

        @media (max-width: 480px) {
          .hiw-steps {
            grid-template-columns: 1fr;
            gap: 30px;
          }
          .hiw-badge {
            font-size: 11px;
            padding: 6px 14px;
          }
          .hiw-title {
            font-size: 24px;
          }
          .hiw-subtitle {
            font-size: 14px;
          }
          .types-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }
          .type-card {
            padding: 16px 10px;
          }
          .type-icon {
            width: 48px;
            height: 48px;
            margin-bottom: 12px;
          }
          .type-name {
            font-size: 13px;
          }
          .type-desc {
            font-size: 10px;
          }
        }

        /* Value Proposition Responsive */
        @media (max-width: 1024px) {
          .vp-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .vp-stats-row {
            gap: 40px;
            padding: 30px;
          }
          .vp-stat-number {
            font-size: 28px;
          }
        }

        @media (max-width: 768px) {
          .value-proposition {
            padding: 50px 15px;
          }
          .vp-title {
            font-size: 28px;
          }
          .vp-subtitle {
            font-size: 15px;
          }
          .vp-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .vp-card {
            padding: 24px;
          }
          .vp-stats-row {
            flex-wrap: wrap;
            gap: 30px;
            justify-content: space-around;
          }
          .vp-stat {
            min-width: 120px;
          }
          .vp-stat-number {
            font-size: 24px;
          }
        }

        @media (max-width: 480px) {
          .value-proposition {
            padding: 40px 15px;
          }
          .vp-title {
            font-size: 24px;
          }
          .vp-header {
            margin-bottom: 30px;
          }
          .vp-grid {
            gap: 14px;
          }
          .vp-card {
            padding: 20px;
          }
          .vp-card-icon {
            width: 48px;
            height: 48px;
            margin-bottom: 16px;
          }
          .vp-card-icon svg {
            width: 24px;
            height: 24px;
          }
          .vp-card h3 {
            font-size: 17px;
          }
          .vp-card p {
            font-size: 13px;
          }
          .vp-stats-row {
            padding: 25px 15px;
            gap: 20px;
          }
          .vp-stat {
            min-width: 80px;
          }
          .vp-stat-number {
            font-size: 20px;
          }
          .vp-stat-label {
            font-size: 11px;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
