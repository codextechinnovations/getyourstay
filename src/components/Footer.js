import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { theme } from '../theme';

const Footer = () => {
  return (
    <footer style={{
      background: theme.gradients.hero,
      color: 'white',
      padding: '50px 0 25px',
      marginTop: '50px'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 20px'
      }}>
        {/* Main Footer Content */}
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-brand">
            <div style={{ marginBottom: '15px' }}>
              <Logo size="small" light />
            </div>
            <p style={{ fontSize: '13px', lineHeight: '1.7', opacity: '0.85', marginBottom: '18px' }}>
              Find your perfect PG accommodation in Bangalore. Verified listings, transparent pricing, and trusted reviews.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <a href="#facebook" className="social-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                </svg>
              </a>
              <a href="#twitter" className="social-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                </svg>
              </a>
              <a href="#instagram" className="social-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="#linkedin" className="social-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/">Browse PGs</Link></li>
              <li><Link to="/hotels">Hotels</Link></li>
              <li><Link to="/flats">Flats</Link></li>
              <li><Link to="/tenant-login">Tenant Login</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          {/* Popular Areas */}
          <div className="footer-links">
            <h4>Popular PG Locations</h4>
            <ul>
              <li><Link to="/?area=Koramangala">PG in Koramangala</Link></li>
              <li><Link to="/?area=HSR+Layout">PG in HSR Layout</Link></li>
              <li><Link to="/?area=Whitefield">PG in Whitefield</Link></li>
              <li><Link to="/?area=Electronic+City">PG in Electronic City</Link></li>
              <li><Link to="/?area=BTM+Layout">PG near BTM Layout</Link></li>
              <li><Link to="/?area=Marathahalli">PG near Marathahalli</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-contact">
            <h4>Contact Us</h4>
            <div className="contact-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <span>Bangalore - 560001</span>
            </div>
            <div className="contact-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
              </svg>
              <span>+91 9741821179</span>
            </div>
            <div className="contact-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              <span>support@getyourstay.in</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{
          height: '1px',
          background: 'rgba(255,255,255,0.15)',
          margin: '25px 0'
        }} />

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} GetYourStay. All rights reserved.</p>
          
          <div className="footer-badges">
            <a href='https://codextechinnovations.com/' className="powered-by">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 6v6l4 2"/>
              </svg>
              <span>Powered by <strong>Codex Tech Innovations & Consultants LLP</strong></span>
            </a>
          </div>

          <div className="footer-legal">
            <Link to="/terms">Terms & Conditions</Link>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/about">About Us</Link>
            <a href="/sitemap.xml" target="_blank">Sitemap</a>
          </div>
        </div>
      </div>

      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.5fr;
          gap: 35px;
          margin-bottom: 35px;
        }
        .footer-brand {
          max-width: 280px;
        }
        .social-link {
          width: 32px;
          height: 32px;
          background: rgba(255,255,255,0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }
        .social-link:hover {
          background: ${theme.accent[500]};
          transform: translateY(-2px);
        }
        .footer-links h4,
        .footer-contact h4 {
          font-size: 14px;
          font-weight: 600;
          margin: 0 0 15px;
          color: white;
        }
        .footer-links ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .footer-links li {
          margin-bottom: 10px;
        }
        .footer-links a {
          color: rgba(255,255,255,0.75);
          text-decoration: none;
          font-size: 13px;
          transition: color 0.2s;
        }
        .footer-links a:hover {
          color: ${theme.accent[400]};
        }
        .contact-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 12px;
          font-size: 13px;
          opacity: 0.85;
          line-height: 1.5;
        }
        .contact-item svg {
          flex-shrink: 0;
          margin-top: 3px;
        }
        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 15px;
        }
        .footer-bottom p {
          margin: 0;
          font-size: 12px;
          opacity: 0.7;
        }
        .footer-badges {
          display: flex;
          align-items: center;
        }
        .powered-by {
          display: flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #FF6B2C, #E85B1C);
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 11px;
          color: white;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(255, 107, 44, 0.3);
        }
        .powered-by:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 107, 44, 0.4);
        }
        .powered-by span {
          color: white;
        }
        .powered-by strong {
          color: white;
        }
        .footer-legal {
          display: flex;
          gap: 20px;
        }
        .footer-legal a {
          color: rgba(255,255,255,0.6);
          font-size: 12px;
          text-decoration: none;
        }
        .footer-legal a:hover {
          color: ${theme.accent[400]};
        }
        
        @media (max-width: 992px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 25px;
          }
          .footer-brand {
            max-width: 100%;
          }
          .footer-bottom {
            flex-direction: column;
            text-align: center;
          }
          .footer-legal {
            justify-content: center;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
