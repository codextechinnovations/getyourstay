import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import PGCard from '../components/PGCard';
import PGDetail from '../components/PGDetail';
import { theme } from '../theme';
import { pgApi } from '../services/api';
import '../App.css';


const AREA_SEO = {
  "Electronic City": {
    metaTitle: "PG in Electronic City Bangalore | ₹4,000–₹12,000 | GetYourStay",
    metaDesc: "Find verified PG accommodation in Electronic City, Bangalore. Budget-friendly to premium options near Infosys, Wipro, TCS. WiFi, food, AC available.",
    h1: "PG in Electronic City, Bangalore",
    intro: "Electronic City is Bangalore's largest IT hub, housing companies like Infosys, Wipro, TCS, and hundreds of startups. PGs here offer excellent value for tech professionals — starting from ₹4,000/month for triple sharing to ₹12,000/month for premium AC singles.",
    bestFor: "IT professionals & tech students",
    metro: "Green Line (Hebbagodi, Electronic City)",
    commute: "15–25 min to Hosur Road IT corridor",
    highlights: ["Affordable rent", "Near Infosys campus", "Metro connectivity", "Good food streets"],
    faqs: [
      { q: "What is the average PG rent in Electronic City?", a: "PG rent in Electronic City ranges from ₹4,000/month for non-AC triple sharing to ₹12,000/month for AC single rooms with food included." },
      { q: "Are there girls PG options in Electronic City?", a: "Yes, Electronic City has several verified girls-only PGs with 24/7 security, female wardens, and biometric entry systems." },
      { q: "How far is Electronic City from the metro?", a: "Electronic City is accessible via the Green Line metro with stations at Hebbagodi and Electronic City. Most PGs are within 1–3 km of a station." }
    ]
  },
  "HSR Layout": {
    metaTitle: "PG in HSR Layout Bangalore | ₹5,000–₹15,000 | GetYourStay",
    metaDesc: "Find verified PG accommodation in HSR Layout, Bangalore. Great options near Christ University, restaurants, and IT offices. WiFi, food, AC available.",
    h1: "PG in HSR Layout, Bangalore",
    intro: "HSR Layout is one of Bangalore's most sought-after residential areas, known for its vibrant cafe culture, coworking spaces, and proximity to both colleges and IT offices. PG options range from ₹5,000/month to ₹15,000/month.",
    bestFor: "Students & young professionals",
    metro: "Yellow Line (upcoming)",
    commute: "20–30 min to Koramangala, Bellandur",
    highlights: ["Trendy cafes & restaurants", "Near Christ University", "Coworking spaces", "Great nightlife"],
    faqs: [
      { q: "What is the average PG rent in HSR Layout?", a: "PG rent in HSR Layout ranges from ₹5,000/month for budget options to ₹15,000/month for premium furnished rooms." },
      { q: "Is HSR Layout good for college students?", a: "Yes, HSR Layout is popular among students from Christ University, ISBR, and other nearby institutions due to its affordable PGs and great social infrastructure." }
    ]
  },
  "Koramangala": {
    metaTitle: "PG in Koramangala Bangalore | ₹8,000–₹20,000 | GetYourStay",
    metaDesc: "Find premium PG accommodation in Koramangala, Bangalore. Central location, near major offices, restaurants, and nightlife. Verified listings.",
    h1: "PG in Koramangala, Bangalore",
    intro: "Koramangala is Bangalore's most premium residential and commercial hub, home to top restaurants, startups, and corporate offices. PGs here reflect the area's premium lifestyle, ranging from ₹8,000 to ₹20,000/month.",
    bestFor: "Professionals & startup employees",
    metro: "Silk Board (Purple Line)",
    commute: "10–20 min to Indiranagar, BTM Layout",
    highlights: ["Premium lifestyle", "Top restaurants & bars", "Startup ecosystem", "Central location"],
    faqs: [
      { q: "What is the average PG rent in Koramangala?", a: "PG rent in Koramangala ranges from ₹8,000/month for budget rooms to ₹20,000/month for premium AC singles with all amenities." }
    ]
  }
};

const getAreaSEO = (areaName) => AREA_SEO[areaName] || {
  metaTitle: `PG in ${areaName} Bangalore | GetYourStay`,
  metaDesc: `Find verified PG accommodation in ${areaName}, Bangalore. Affordable, safe, and well-connected options near IT parks and colleges.`,
  h1: `PG in ${areaName}, Bangalore`,
  intro: `Find verified PG accommodation in ${areaName}, Bangalore. We list budget to premium PGs with transparent pricing, real reviews, and modern amenities.`,
  bestFor: "Professionals & students",
  metro: "Well connected",
  commute: "Near major IT hubs",
  highlights: ["Verified listings", "Transparent pricing", "No brokerage"],
  faqs: []
};

// ─────────────────────────────────────────────
// AREA PAGE COMPONENT
// ─────────────────────────────────────────────
const AreaPage = ({
  decodedArea,
  areaPagePGs,
  areaPageLoading,
  areaPageError,
  areaPageGender,
  setAreaPageGender,
  areaPagePriceRange,
  setAreaPagePriceRange,
  areaPageRentalType,
  setAreaPageRentalType,
  availableAreas,
  selectedPG,
  setSelectedPG,
  handleViewDetails,
  POPULAR_AREAS
}) => {
  const areaInfo = POPULAR_AREAS.find(a => a.name === decodedArea);
  const seo = getAreaSEO(decodedArea);
  const [sortBy, setSortBy] = useState('recommended');

  useEffect(() => {
    document.title = seo.metaTitle;
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) { metaDesc = document.createElement('meta'); metaDesc.name = 'description'; document.head.appendChild(metaDesc); }
    metaDesc.content = seo.metaDesc;

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical); }
    canonical.href = `${window.location.origin}/?area=${encodeURIComponent(decodedArea)}`;

    const breadcrumbSchema = {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: window.location.origin },
        { '@type': 'ListItem', position: 2, name: 'PG in Bangalore', item: `${window.location.origin}/` },
        { '@type': 'ListItem', position: 3, name: `PG in ${decodedArea}`, item: `${window.location.origin}/?area=${encodeURIComponent(decodedArea)}` }
      ]
    };
    const listingSchema = {
      '@context': 'https://schema.org', '@type': 'RealEstateListing',
      name: seo.h1, description: seo.intro,
      areaServed: { '@type': 'City', name: 'Bangalore', addressRegion: 'Karnataka', addressCountry: 'IN' },
      numberOfItems: areaPagePGs.length
    };
    const faqSchema = seo.faqs.length > 0 ? {
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: seo.faqs.map(faq => ({
        '@type': 'Question', name: faq.q,
        acceptedAnswer: { '@type': 'Answer', text: faq.a }
      }))
    } : null;

    ['area-breadcrumb', 'area-listing', 'area-faq'].forEach(id => {
      const existing = document.querySelector(`script[data-schema="${id}"]`);
      if (existing) existing.remove();
    });
    [
      { id: 'area-breadcrumb', data: breadcrumbSchema },
      { id: 'area-listing',    data: listingSchema },
      ...(faqSchema ? [{ id: 'area-faq', data: faqSchema }] : [])
    ].forEach(({ id, data }) => {
      const s = document.createElement('script');
      s.type = 'application/ld+json';
      s.setAttribute('data-schema', id);
      s.textContent = JSON.stringify(data);
      document.head.appendChild(s);
    });

    return () => {
      ['area-breadcrumb', 'area-listing', 'area-faq'].forEach(id => {
        const el = document.querySelector(`script[data-schema="${id}"]`);
        if (el) el.remove();
      });
    };
  }, [decodedArea, areaPagePGs.length]);

  const sortedPGs = [...areaPagePGs].sort((a, b) => {
    if (sortBy === 'price_asc') return (a.price || 0) - (b.price || 0);
    if (sortBy === 'price_desc') return (b.price || 0) - (a.price || 0);
    if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
    if (b.isVerified !== a.isVerified) return b.isVerified ? 1 : -1;
    return (b.rating || 0) - (a.rating || 0);
  });

  const verifiedCount = areaPagePGs.filter(p => p.isVerified).length;

  const pillItems = [
    seo.bestFor                              && { icon: '👥', dot: 'orange', label: 'Best for',    value: seo.bestFor },
    seo.metro                                && { icon: '🚇', dot: 'purple', label: 'Metro',       value: seo.metro },
    seo.commute                              && { icon: '🕐', dot: 'blue',   label: 'Commute',     value: seo.commute },
    areaInfo?.nearbyPlaces?.malls   > 0      && { icon: '🏬', dot: 'green',  label: 'Malls',       value: `${areaInfo.nearbyPlaces.malls} nearby` },
    areaInfo?.nearbyPlaces?.schools > 0      && { icon: '🏫', dot: 'amber',  label: 'Schools',     value: `${areaInfo.nearbyPlaces.schools} nearby` },
    areaInfo?.nearbyPlaces?.pubs    > 0      && { icon: '🍺', dot: 'pink',   label: 'Pubs & Bars', value: `${areaInfo.nearbyPlaces.pubs} nearby` },
  ].filter(Boolean);

  return (
    <div className="app">

      {/* ── Breadcrumb ── */}
      <nav aria-label="Breadcrumb" className="ap-breadcrumb">
        <ol className="ap-breadcrumb__list">
          <li><Link to="/" className="ap-breadcrumb__link">Home</Link></li>
          <li className="ap-breadcrumb__sep">›</li>
          <li><Link to="/" className="ap-breadcrumb__link">PG in Bangalore</Link></li>
          <li className="ap-breadcrumb__sep">›</li>
          <li className="ap-breadcrumb__active">PG in {decodedArea}</li>
        </ol>
      </nav>

      {/* ── Hero ── */}
      <header className="ap-hero">
        <span className="ap-hero__blob ap-hero__blob--1" aria-hidden="true" />
        <span className="ap-hero__blob ap-hero__blob--2" aria-hidden="true" />

        <div className="ap-hero__inner">

          {/* Left */}
          <div className="ap-hero__left">
            <div className="ap-hero__badges">
              <span className="ap-badge ap-badge--loc">📍 {decodedArea}</span>
              {areaInfo?.pincode && (
                <span className="ap-badge ap-badge--pin">📮 {areaInfo.pincode}</span>
              )}
              {verifiedCount > 0 && (
                <span className="ap-badge ap-badge--ver">✓ {verifiedCount} Verified</span>
              )}
            </div>

            <h1 className="ap-hero__title">{seo.h1}</h1>
            <p className="ap-hero__desc">{seo.intro}</p>

            {seo.highlights?.length > 0 && (
              <div className="ap-hero__chips">
                {seo.highlights.map((h, i) => (
                  <span key={i} className="ap-chip">✓ {h}</span>
                ))}
              </div>
            )}
          </div>

          {/* Right: stats */}
          {areaPagePGs.length > 0 && (
            <div className="ap-hero__stats">
              <div className="ap-stat ap-stat--accent">
                <div className="ap-stat__num">{areaPagePGs.length}</div>
                <div className="ap-stat__lbl">PGs Available</div>
              </div>
              {areaInfo?.rentRange && (
                <div className="ap-stat">
                  <div className="ap-stat__num">{areaInfo.rentRange.split(' - ')[0]}</div>
                  <div className="ap-stat__lbl">Budget start</div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── Info pills row ── */}
        {pillItems.length > 0 && (
          <div className="ap-pills">
            <div className="ap-pills__inner">
              {pillItems.map((p, i) => (
                <div key={i} className="ap-pill">
                  <span className={`ap-pill__dot ap-pill__dot--${p.dot}`}>{p.icon}</span>
                  <span className="ap-pill__text">
                    <span className="ap-pill__label">{p.label}</span>
                    <span className="ap-pill__value">{p.value}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* ── Main Content ── */}
      {areaPageLoading ? (
        <div style={{ padding: '80px 20px', textAlign: 'center' }}>
          <div style={{ width: '36px', height: '36px', border: `3px solid ${theme.neutral[200]}`, borderTopColor: theme.accent[500], borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 12px' }} />
          <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
          <p style={{ color: theme.neutral[500], fontSize: '14px' }}>Loading PGs in {decodedArea}...</p>
        </div>

      ) : areaPagePGs.length > 0 ? (
        <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px 20px' }}>

          {/* Results header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
            <p style={{ fontSize: '14px', color: theme.neutral[600] }}>
              <strong style={{ color: theme.primary[800] }}>{areaPagePGs.length} PGs</strong> found in {decodedArea}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <label style={{ fontSize: '13px', color: theme.neutral[500] }}>Sort by:</label>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                style={{ fontSize: '13px', padding: '6px 10px', borderRadius: '8px', border: `1px solid ${theme.neutral[200]}`, background: 'white', color: theme.primary[800] }}
              >
                <option value="recommended">Recommended</option>
                <option value="price_asc">Price: Low to high</option>
                <option value="price_desc">Price: High to low</option>
                <option value="rating">Highest rated</option>
              </select>
            </div>
          </div>

          <div className="content-wrapper">
            <Sidebar
              priceRange={areaPagePriceRange}
              setPriceRange={setAreaPagePriceRange}
              selectedAreas={[decodedArea]}
              setSelectedAreas={() => {}}
              selectedGender={areaPageGender}
              setSelectedGender={setAreaPageGender}
              selectedRentalType={areaPageRentalType}
              setSelectedRentalType={setAreaPageRentalType}
              areas={availableAreas}
              onClearFilters={() => {
                setAreaPageGender('all');
                setAreaPagePriceRange([0, 30000]);
                setAreaPageRentalType('all');
              }}
            />
            <div className="main-area" style={{ display: 'flex', flexDirection: 'column' }}>
              {sortedPGs.filter(Boolean).map(pg => (
                <PGCard
                  key={pg.id}
                  pg={pg}
                  onSelect={setSelectedPG}
                  isSelected={selectedPG?.id === pg.id}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          </div>

          {/* ── About This Area ── */}
          <section aria-labelledby="about-area-heading" style={{ marginTop: '40px', background: 'white', borderRadius: '16px', border: `1px solid ${theme.neutral[200]}`, padding: '28px' }}>
            <h2 id="about-area-heading" style={{ fontSize: '20px', fontWeight: 700, color: theme.primary[800], marginBottom: '12px' }}>
              About {decodedArea} for PG accommodation
            </h2>
            <p style={{ fontSize: '14px', color: theme.neutral[600], lineHeight: 1.8, marginBottom: '20px' }}>{seo.intro}</p>
            {areaInfo && (
              <p style={{ fontSize: '14px', color: theme.neutral[600], lineHeight: 1.8, marginBottom: '20px' }}>
                {areaInfo.famousFor}. PG rents in {decodedArea} range from {areaInfo.rentRange}/month depending on room type, amenities, and proximity to the main road.
              </p>
            )}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', marginTop: '16px' }}>
              {[
                { label: 'Rent range', value: areaInfo?.rentRange || 'Varies' },
                { label: 'Best for',   value: seo.bestFor },
                { label: 'Metro access', value: seo.metro },
                { label: 'Commute info', value: seo.commute }
              ].map((item, i) => (
                <div key={i} style={{ background: theme.neutral[50], borderRadius: '10px', padding: '12px 14px', border: `1px solid ${theme.neutral[200]}` }}>
                  <div style={{ fontSize: '11px', color: theme.neutral[400], marginBottom: '4px' }}>{item.label}</div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: theme.primary[800] }}>{item.value}</div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Area FAQs ── */}
          {seo.faqs.length > 0 && (
            <section aria-labelledby="area-faq-heading" style={{ marginTop: '24px', background: 'white', borderRadius: '16px', border: `1px solid ${theme.neutral[200]}`, padding: '28px' }}>
              <h2 id="area-faq-heading" style={{ fontSize: '20px', fontWeight: 700, color: theme.primary[800], marginBottom: '16px' }}>
                FAQs about PG in {decodedArea}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {seo.faqs.map((faq, i) => (
                  <details key={i} style={{ borderRadius: '10px', border: `1px solid ${theme.neutral[200]}`, overflow: 'hidden' }}>
                    <summary style={{ padding: '14px 18px', fontSize: '14px', fontWeight: 600, color: theme.primary[800], cursor: 'pointer', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: theme.neutral[50] }}>
                      {faq.q}
                      <span style={{ fontSize: '18px', color: theme.accent[500], marginLeft: '12px' }}>+</span>
                    </summary>
                    <div style={{ padding: '14px 18px', fontSize: '13px', color: theme.neutral[600], lineHeight: 1.7 }}>{faq.a}</div>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* ── Explore Nearby Areas ── */}
          <section aria-labelledby="nearby-areas-heading" style={{ marginTop: '24px' }}>
            <h2 id="nearby-areas-heading" style={{ fontSize: '18px', fontWeight: 700, color: theme.primary[800], marginBottom: '14px' }}>
              Explore PGs in nearby areas
            </h2>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {POPULAR_AREAS.filter(a => a.name !== decodedArea).map((area, i) => (
                <Link key={i} to={area.link}
                  style={{ padding: '10px 18px', background: 'white', border: `1px solid ${theme.neutral[200]}`, borderRadius: '20px', color: theme.primary[800], textDecoration: 'none', fontSize: '13px', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  📍 PG in {area.name}
                  <span style={{ fontSize: '11px', color: theme.neutral[400] }}>{area.rentRange}/mo</span>
                </Link>
              ))}
            </div>
          </section>

        </main>

      ) : (
        <div style={{ padding: '60px 20px', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ width: '64px', height: '64px', background: theme.neutral[100], borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '28px' }}>📍</div>
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: theme.primary[800], marginBottom: '12px' }}>Coming soon to {decodedArea}</h2>
          <p style={{ color: theme.neutral[500], fontSize: '14px', lineHeight: 1.7, marginBottom: '28px' }}>
            We're partnering with verified PG owners in {decodedArea} to bring you the best accommodation options. We'll notify you as soon as listings go live.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
            {POPULAR_AREAS.filter(a => a.name !== decodedArea).slice(0, 4).map((area, i) => (
              <Link key={i} to={area.link} style={{ padding: '10px 18px', border: `1px solid ${theme.neutral[200]}`, borderRadius: '20px', color: theme.primary[800], textDecoration: 'none', fontSize: '13px', background: 'white' }}>
                PG in {area.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {selectedPG && <PGDetail pg={selectedPG} onClose={() => setSelectedPG(null)} />}

      <style>{`
        /* ── Breadcrumb ── */
        .ap-breadcrumb { padding: 10px 20px; background: #fff; border-bottom: 1px solid #e5e7eb; font-size: 12px; }
        .ap-breadcrumb__list { display: flex; align-items: center; gap: 6px; list-style: none; max-width: 1400px; margin: 0 auto; padding: 0; }
        .ap-breadcrumb__link { color: #9ca3af; text-decoration: none; transition: color .15s; }
        .ap-breadcrumb__link:hover { color: #f97316; }
        .ap-breadcrumb__sep { color: #d1d5db; }
        .ap-breadcrumb__active { color: #f97316; font-weight: 600; }

        /* ── Hero ── */
        .ap-hero {
          background: linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 45%, #6d28d9 100%);
          position: relative;
          overflow: hidden;
        }
        .ap-hero__blob { position: absolute; border-radius: 50%; pointer-events: none; }
        .ap-hero__blob--1 { width: 380px; height: 380px; background: rgba(255,255,255,0.05); top: -130px; right: -100px; }
        .ap-hero__blob--2 { width: 220px; height: 220px; background: rgba(251,146,60,0.12); bottom: 30px; left: -60px; }

        .ap-hero__inner {
          max-width: 1400px; margin: 0 auto; padding: 30px 24px 28px;
          display: flex; align-items: flex-start; justify-content: space-between;
          gap: 28px; position: relative; z-index: 1;
        }
        .ap-hero__left { flex: 1; min-width: 260px; }

        /* Badges */
        .ap-hero__badges { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-bottom: 14px; }
        .ap-badge { display: inline-flex; align-items: center; gap: 5px; font-size: 11px; font-weight: 700; padding: 5px 12px; border-radius: 20px; letter-spacing: 0.2px; }
        .ap-badge--loc { background: rgba(251,146,60,0.22); color: #fed7aa; border: 1px solid rgba(251,146,60,0.4); }
        .ap-badge--pin { background: rgba(255,255,255,0.12); color: rgba(255,255,255,0.75); border: 1px solid rgba(255,255,255,0.2); }
        .ap-badge--ver { background: rgba(52,211,153,0.2); color: #6ee7b7; border: 1px solid rgba(52,211,153,0.4); }

        /* Title */
        .ap-hero__title { font-size: clamp(22px, 4vw, 32px); font-weight: 800; color: #fff; line-height: 1.15; letter-spacing: -0.6px; margin-bottom: 12px; }
        .ap-hero__desc { font-size: 13.5px; color: rgba(255,255,255,0.72); line-height: 1.75; max-width: 520px; margin-bottom: 20px; }

        /* Chips */
        .ap-hero__chips { display: flex; flex-wrap: wrap; gap: 8px; }
        .ap-chip { font-size: 11.5px; font-weight: 600; padding: 5px 14px; border-radius: 20px; background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.88); border: 1px solid rgba(255,255,255,0.2); }

        /* Stat cards */
        .ap-hero__stats { display: flex; flex-direction: column; gap: 12px; flex-shrink: 0; position: relative; z-index: 1; }
        .ap-stat { min-width: 114px; background: rgba(255,255,255,0.13); border: 1px solid rgba(255,255,255,0.22); border-radius: 16px; padding: 16px 20px; text-align: center; }
        .ap-stat--accent { background: linear-gradient(135deg, #f97316 0%, #ef4444 100%); border-color: transparent; box-shadow: 0 4px 20px rgba(249,115,22,0.35); }
        .ap-stat__num { font-size: 26px; font-weight: 800; color: #fff; line-height: 1; letter-spacing: -0.5px; }
        .ap-stat__lbl { font-size: 10px; color: rgba(255,255,255,0.75); margin-top: 5px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }

        /* ── Pills bar ── */
        .ap-pills { background: #fff; border-bottom: 1px solid #f0f0f0; }
        .ap-pills__inner { max-width: 1400px; margin: 0 auto; padding: 0 24px; display: flex; overflow-x: auto; scrollbar-width: none; -ms-overflow-style: none; }
        .ap-pills__inner::-webkit-scrollbar { display: none; }

        .ap-pill { display: flex; align-items: center; gap: 10px; padding: 14px 22px; border-right: 1px solid #f3f4f6; white-space: nowrap; flex-shrink: 0; }
        .ap-pill:first-child { padding-left: 0; }
        .ap-pill:last-child  { border-right: none; }

        .ap-pill__dot { width: 32px; height: 32px; border-radius: 9px; display: flex; align-items: center; justify-content: center; font-size: 15px; flex-shrink: 0; }
        .ap-pill__dot--orange { background: #fff7ed; }
        .ap-pill__dot--purple { background: #f5f3ff; }
        .ap-pill__dot--blue   { background: #eff6ff; }
        .ap-pill__dot--green  { background: #f0fdf4; }
        .ap-pill__dot--amber  { background: #fffbeb; }
        .ap-pill__dot--pink   { background: #fdf2f8; }

        .ap-pill__text { display: flex; flex-direction: column; }
        .ap-pill__label { font-size: 10px; color: #9ca3af; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; line-height: 1; }
        .ap-pill__value { font-size: 12.5px; font-weight: 700; color: #1e3a5f; margin-top: 3px; }

        /* ── Misc ── */
        details summary::-webkit-details-marker { display: none; }
        details[open] summary span:last-child { transform: rotate(45deg); display: inline-block; }

        /* ── Mobile ── */
        @media (max-width: 640px) {
          .ap-hero__inner { flex-direction: column; padding: 22px 16px 20px; gap: 20px; }
          .ap-hero__stats { flex-direction: row; width: 100%; }
          .ap-stat { flex: 1; padding: 14px 10px; min-width: unset; }
          .ap-stat__num { font-size: 22px; }
          .ap-breadcrumb { padding: 10px 16px; }
          .ap-pills__inner { padding: 0 16px; }
          .ap-pill { padding: 12px 16px; }
          .ap-pill:first-child { padding-left: 0; }
          .content-wrapper { flex-direction: column; }
        }
      `}</style>
    </div>
  );
};

export default AreaPage;