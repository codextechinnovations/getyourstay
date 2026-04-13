import React, { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

// Scroll to top component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
};


// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const Hotels = lazy(() => import('./pages/ComingSoon').then(module => ({ default: module.Hotels })));
const Flats = lazy(() => import('./pages/ComingSoon').then(module => ({ default: module.Flats })));
const TenantLogin = lazy(() => import('./pages/TenantLogin'));
const TenantDashboard = lazy(() => import('./pages/TenantDashboard'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const ContactUs = lazy(() => import('./pages/ContactUs'));
const TermsAndConditions = lazy(() => import('./pages/TermsAndConditions'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Sitemap = lazy(() => import('./pages/Sitemap'));
const ListYourPG = lazy(() => import('./pages/ListYourPG'));
const PGManagementApp = lazy(() => import('./pages/PGManagementApp'));

// Loading component
const PageLoader = () => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh',
    gap: '15px'
  }}>
    <div className="page-loader"></div>
    <p style={{ color: '#64748b', fontSize: '14px' }}>Loading...</p>
    <style>{`
      .page-loader {
        width: 40px;
        height: 40px;
        border: 3px solid #e5e7eb;
        border-top-color: #2d2d7e;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
      }
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

// Layout for pages with header and footer
const MainLayout = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  return (
    <>
      <Header onLogin={(user) => {
        console.log("Logged in user:", user);
      }} />
      {children}
      <Footer />
    </>
  )
}



// Layout for tenant pages (no header/footer)
const TenantLayout = ({ children }) => (
  <>
    {children}
  </>
);

function App() {

  return (
    <Router>
      <ScrollToTop />
      <div className="app">
        <Routes>
          {/* Main pages with header/footer */}
          <Route path="/" element={
            <MainLayout>
              <Home />
            </MainLayout>
          } />
          <Route path="/hotels" element={
            <MainLayout>
              <Hotels />
            </MainLayout>
          } />
          <Route path="/flats" element={
            <MainLayout>
              <Flats />
            </MainLayout>
          } />
          <Route path="/about" element={
            <MainLayout>
              <AboutUs />
            </MainLayout>
          } />
          <Route path="/contact" element={
            <MainLayout>
              <ContactUs />
            </MainLayout>
          } />
          <Route path="/terms" element={
            <MainLayout>
              <TermsAndConditions />
            </MainLayout>
          } />
          <Route path="/privacy" element={
            <MainLayout>
              <PrivacyPolicy />
            </MainLayout>
          } />
          <Route path="/sitemap.xml" element={<Sitemap />} />
          <Route path="/list-your-pg" element={
            <MainLayout>
              <ListYourPG />
            </MainLayout>
          } />
          <Route path="/list-property" element={
            <MainLayout>
              <ListYourPG />
            </MainLayout>
          } />
          <Route path="/pg-management-app" element={
            <MainLayout>
              <PGManagementApp />
            </MainLayout>
          } />
          <Route path="/pg-owner-app" element={
            <MainLayout>
              <PGManagementApp />
            </MainLayout>
          } />
          <Route path="/pg-management-software" element={
            <MainLayout>
              <PGManagementApp />
            </MainLayout>
          } />
          <Route path="/pg-app" element={
            <MainLayout>
              <PGManagementApp />
            </MainLayout>
          } />

          {/* Tenant pages without header/footer */}
          <Route path="/tenant-login" element={
            <TenantLayout>
              <TenantLogin />
            </TenantLayout>
          } />
          <Route path="/tenant-dashboard" element={
            <TenantLayout>
              <TenantDashboard />
            </TenantLayout>
          } />

          {/* 404 fallback */}
          <Route path="*" element={
            <MainLayout>
              <NotFound />
            </MainLayout>
          } />
        </Routes>
      </div>
    </Router>
  );
}

// 404 Not Found page
const NotFound = () => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh',
    textAlign: 'center',
    padding: '40px 20px'
  }}>
    <div style={{ fontSize: '80px', marginBottom: '20px' }}>🏠</div>
    <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#1a1a4e', margin: '0 0 10px' }}>
      Page Not Found
    </h1>
    <p style={{ color: '#64748b', fontSize: '16px', marginBottom: '25px' }}>
      The page you're looking for doesn't exist or has been moved.
    </p>
    <a
      href="/"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '12px 24px',
        background: 'linear-gradient(135deg, #1a1a4e, #2d2d7e)',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '10px',
        fontSize: '14px',
        fontWeight: '600'
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
      Back to Home
    </a>
  </div>
);

export default App;
