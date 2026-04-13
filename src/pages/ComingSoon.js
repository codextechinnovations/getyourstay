import React from 'react';
import { Link } from 'react-router-dom';

const PRIMARY_GRADIENT = ["#1a1a4e", "#2d2d7e", "#1e3a8a"];

const ComingSoon = ({ type = 'Hotels' }) => {
  const icons = {
    Hotels: '🏨',
    Flats: '🏢',
    default: '🚧'
  };

  const descriptions = {
    Hotels: 'Book verified hotels and short-stay accommodations across Bangalore',
    Flats: 'Find fully furnished flats and apartments for rent',
    default: 'This feature is under development'
  };

  const features = {
    Hotels: [
      'Hourly and daily bookings',
      'Budget to luxury options',
      'Instant confirmation',
      'Verified properties'
    ],
    Flats: [
      '1BHK, 2BHK, 3BHK options',
      'Furnished & semi-furnished',
      'Direct owner listings',
      'No brokerage options'
    ],
    default: []
  };

  return (
    <div className="coming-soon-page">
      <div className="coming-soon-content">
        <div className="coming-soon-icon">{icons[type] || icons.default}</div>
        <h1>{type} Coming Soon</h1>
        <p className="coming-soon-desc">{descriptions[type] || descriptions.default}</p>

        {(features[type] || features.default).length > 0 && (
          <div className="coming-soon-features">
            <h3>What to expect:</h3>
            <ul>
              {(features[type] || features.default).map((feature, idx) => (
                <li key={idx}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2">
                    <polyline points="20,6 9,17 4,12"/>
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="coming-soon-actions">
          <Link to="/" className="back-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15,18 9,12 15,6"/>
            </svg>
            Back to PG Listings
          </Link>
          <button className="notify-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            Notify Me
          </button>
        </div>

        <div className="coming-soon-progress">
          <p>We're working hard to bring this feature to you!</p>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '65%' }}></div>
          </div>
          <span className="progress-text">65% Complete</span>
        </div>
      </div>

      <style>{`
        .coming-soon-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #f8fafc, #e2e8f0);
          padding: 20px;
        }
        .coming-soon-content {
          text-align: center;
          max-width: 450px;
          background: white;
          padding: 40px 30px;
          border-radius: 20px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.08);
        }
        .coming-soon-icon {
          font-size: 64px;
          margin-bottom: 20px;
        }
        .coming-soon-content h1 {
          font-size: 28px;
          font-weight: 700;
          color: ${PRIMARY_GRADIENT[0]};
          margin: 0 0 10px;
        }
        .coming-soon-desc {
          font-size: 14px;
          color: #64748b;
          margin: 0 0 25px;
          line-height: 1.6;
        }
        .coming-soon-features {
          background: #f8fafc;
          padding: 20px;
          border-radius: 12px;
          margin-bottom: 25px;
          text-align: left;
        }
        .coming-soon-features h3 {
          font-size: 14px;
          font-weight: 600;
          color: ${PRIMARY_GRADIENT[0]};
          margin: 0 0 12px;
        }
        .coming-soon-features ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .coming-soon-features li {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          color: #475569;
          padding: 6px 0;
        }
        .coming-soon-actions {
          display: flex;
          gap: 12px;
          justify-content: center;
          margin-bottom: 25px;
        }
        .back-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 12px 20px;
          background: white;
          border: 2px solid #e5e7eb;
          border-radius: 10px;
          color: #64748b;
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.2s;
        }
        .back-btn:hover {
          border-color: ${PRIMARY_GRADIENT[1]};
          color: ${PRIMARY_GRADIENT[1]};
        }
        .notify-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 12px 20px;
          background: linear-gradient(135deg, ${PRIMARY_GRADIENT[0]}, ${PRIMARY_GRADIENT[1]});
          border: none;
          border-radius: 10px;
          color: white;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .notify-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(26,26,78,0.3);
        }
        .coming-soon-progress {
          padding-top: 20px;
          border-top: 1px solid #f1f5f9;
        }
        .coming-soon-progress p {
          font-size: 12px;
          color: #64748b;
          margin: 0 0 12px;
        }
        .progress-bar {
          height: 8px;
          background: #e5e7eb;
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 8px;
        }
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, ${PRIMARY_GRADIENT[0]}, ${PRIMARY_GRADIENT[1]});
          border-radius: 4px;
          transition: width 0.5s ease;
        }
        .progress-text {
          font-size: 11px;
          color: #64748b;
          font-weight: 500;
        }
        
        @media (max-width: 480px) {
          .coming-soon-content {
            padding: 30px 20px;
          }
          .coming-soon-icon {
            font-size: 48px;
          }
          .coming-soon-content h1 {
            font-size: 22px;
          }
          .coming-soon-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export const Hotels = () => <ComingSoon type="Hotels" />;
export const Flats = () => <ComingSoon type="Flats" />;

export default ComingSoon;
