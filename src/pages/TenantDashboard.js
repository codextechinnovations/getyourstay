import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';

const PRIMARY_GRADIENT = ["#1a1a4e", "#2d2d7e", "#1e3a8a"];

const TenantDashboard = () => {
  const navigate = useNavigate();
  const [tenant, setTenant] = useState(null);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [payments, setPayments] = useState([]);
  useEffect(() => {
    const fetchTenant = async () => {
      try {
        const token = localStorage.getItem("tenantToken");
        console.log('token :', token);
        

        if (!token) {
          navigate("/tenant-login");
          return;
        }

        const res = await fetch("https://api.manageyourpg.com/api/tenants/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!data.success) {
          throw new Error("Unauthorized");
        }

        const t = data.data;

        setTenant({
          id: t._id,
          name: t.name,
          email: t.email,
          phone: t.phone,
          pgName: t.pgId?.name || "",
          pgArea: t.pgId?.area || "",
          roomNumber: t.roomId?.roomNumber || "",
          checkInDate: t.checkInDate || t.joining_date,
          rentAmount: t.monthlyRent || 0,
          dueDate: "5th of every month",
          avatar: null,
          status: t.status,
        });

      } catch (err) {
        console.log("Auth error:", err);
      
      } finally {
        setLoading(false);
      }
    };

    fetchTenant();
  }, [navigate]);
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const token = localStorage.getItem("tenantToken");

        const res = await fetch("https://api.manageyourpg.com/api/tenants/payments", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        setPayments(data.data || []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPayments();
  }, []);
  const handleLogout = () => {
    localStorage.removeItem('tenantAuth');
    navigate('/tenant-login');
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
    { id: 'profile', label: 'My Profile', icon: '👤' },
    { id: 'payments', label: 'Payments', icon: '💳' },
    { id: 'notices', label: 'Notices', icon: '📢' },
  ];

  if (!tenant) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f8fafc'
      }}>
        <div className="spinner" style={{
          width: '40px',
          height: '40px',
          border: '3px solid #e5e7eb',
          borderTopColor: PRIMARY_GRADIENT[1],
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite'
        }}></div>
      </div>
    );
  }

  return (
    <div className="tenant-dashboard">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <Logo size="small" variant="icon" />
          <span>Tenant Portal</span>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map(item => (
            <button
              key={item.id}
              className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => setActiveSection(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="tenant-info">
            <div className="tenant-avatar">
              {tenant.name.charAt(0)}
            </div>
            <div>
              <p className="tenant-name">{tenant.name}</p>
              <p className="tenant-id">{tenant.id}</p>
            </div>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <h1>Welcome back, {tenant.name.split(' ')[0]}!</h1>
            <p>Here's what's happening at your PG</p>
          </div>
          <Link to="/" className="back-to-home">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Back to Home
          </Link>
        </header>

        {activeSection === 'dashboard' && (
          <div className="dashboard-content">
            {/* Quick Stats */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon" style={{ background: '#dcfce7' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <div>
                  <p className="stat-label">Status</p>
                  <p className="stat-value" style={{ color: '#16a34a' }}>
                    {tenant.status}
                  </p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon" style={{ background: '#fef3c7' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <div>
                  <p className="stat-label">Next Due</p>
                  <p className="stat-value"></p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon" style={{ background: '#dbeafe' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
                    <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <div>
                  <p className="stat-label">Monthly Rent</p>
                  <p className="stat-value">₹{tenant.rentAmount.toLocaleString()}</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon" style={{ background: '#f3e8ff' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <div>
                  <p className="stat-label">Security Deposit</p>
                  <p className="stat-value">₹{tenant.rentAmount.toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* PG Info Card */}
            <div className="info-card">
              <h2>Your PG Details</h2>
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">PG Name</span>
                  <span className="info-value">{tenant.pgName}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Location</span>
                  <span className="info-value">{tenant.pgArea}, Bangalore</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Room Number</span>
                  <span className="info-value">{tenant.roomNumber}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Check-in Date</span>
                  <span className="info-value">{new Date(tenant.checkInDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Rent Due Date</span>
                  <span className="info-value">{tenant.dueDate}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Tenure</span>
                  <span className="info-value">15 months</span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="activity-card">
              <h2>Recent Activity</h2>
              <div className="activity-list">
                <div className="activity-item">
                  <div className="activity-icon" style={{ background: '#dcfce7' }}>✓</div>
                  <div>
                    <p className="activity-title">March rent paid</p>
                    <p className="activity-date">March 3, 2024</p>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon" style={{ background: '#dbeafe' }}>🔧</div>
                  <div>
                    <p className="activity-title">AC maintenance completed</p>
                    <p className="activity-date">February 28, 2024</p>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon" style={{ background: '#fef3c7' }}>📢</div>
                  <div>
                    <p className="activity-title">New notice: Holi celebration</p>
                    <p className="activity-date">February 20, 2024</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'profile' && (
          <div className="dashboard-content">
            <div className="profile-card">
              <h2>My Profile</h2>
              <div className="profile-header">
                <div className="profile-avatar">
                  {tenant.name.charAt(0)}
                </div>
                <div>
                  <h3>{tenant.name}</h3>
                  <p>{tenant.id}</p>
                </div>
              </div>
              <div className="profile-details">
                <div className="profile-field">
                  <label>Email</label>
                  <p>{tenant.email}</p>
                </div>
                <div className="profile-field">
                  <label>Phone</label>
                  <p>{tenant.phone}</p>
                </div>
                <div className="profile-field">
                  <label>PG</label>
                  <p>{tenant.pgName}</p>
                </div>
                <div className="profile-field">
                  <label>Room</label>
                  <p>{tenant.roomNumber}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'payments' && (
          <div className="dashboard-content">
            <div className="payments-card">
              <h2>Payment History</h2>
              <table className="payments-table">
                <thead>
                  <tr>
                    <th>Month</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((p, i) => (
                    <tr key={i}>
                      <td>{new Date(p.payment_date).toLocaleString("en-IN", { month: "long", year: "numeric" })}</td>
                      <td>₹{p.amount}</td>
                      <td>{new Date(p.payment_date).toLocaleDateString()}</td>
                      <td><span className="status paid">Paid</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeSection === 'maintenance' && (
          <div className="dashboard-content">
            <div className="maintenance-card">
              <div className="maintenance-header">
                <h2>Maintenance Requests</h2>
                <button className="new-request-btn">+ New Request</button>
              </div>
              <div className="maintenance-list">
                <div className="maintenance-item">
                  <div className="maintenance-status resolved">Resolved</div>
                  <div>
                    <p className="maintenance-title">AC not cooling properly</p>
                    <p className="maintenance-date">Reported: Feb 25, 2024</p>
                  </div>
                </div>
                <div className="maintenance-item">
                  <div className="maintenance-status pending">In Progress</div>
                  <div>
                    <p className="maintenance-title">Bathroom tap leaking</p>
                    <p className="maintenance-date">Reported: Mar 1, 2024</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'notices' && (
          <div className="dashboard-content">
            <div className="notices-card">
              <h2>PG Notices</h2>
              <div className="notices-list">
                <div className="notice-item">
                  <div className="notice-date">Mar 1, 2024</div>
                  <h4>Water supply interruption</h4>
                  <p>Water supply will be interrupted on March 5th from 10 AM to 4 PM for maintenance work.</p>
                </div>
                <div className="notice-item">
                  <div className="notice-date">Feb 20, 2024</div>
                  <h4>Holi celebration</h4>
                  <p>We'll be celebrating Holi on March 25th. Colors and snacks will be provided. Join us!</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <style>{`
        .tenant-dashboard {
          display: flex;
          min-height: 100vh;
          background: #f8fafc;
        }
        .dashboard-sidebar {
          width: 260px;
          background: white;
          border-right: 1px solid #e5e7eb;
          display: flex;
          flex-direction: column;
          position: fixed;
          height: 100vh;
          left: 0;
          top: 0;
        }
        .sidebar-header {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 20px;
          border-bottom: 1px solid #f1f5f9;
        }
        .sidebar-header span {
          font-size: 16px;
          font-weight: 600;
          color: ${PRIMARY_GRADIENT[0]};
        }
        .sidebar-nav {
          flex: 1;
          padding: 15px 10px;
        }
        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          padding: 12px 15px;
          background: none;
          border: none;
          border-radius: 10px;
          font-size: 14px;
          color: #64748b;
          cursor: pointer;
          transition: all 0.2s;
          text-align: left;
          margin-bottom: 4px;
        }
        .nav-item:hover {
          background: #f1f5f9;
          color: ${PRIMARY_GRADIENT[0]};
        }
        .nav-item.active {
          background: linear-gradient(135deg, rgba(26,26,78,0.1), rgba(45,45,126,0.1));
          color: ${PRIMARY_GRADIENT[0]};
          font-weight: 600;
        }
        .nav-icon {
          font-size: 18px;
        }
        .sidebar-footer {
          padding: 15px;
          border-top: 1px solid #f1f5f9;
        }
        .tenant-info {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
        }
        .tenant-avatar {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, ${PRIMARY_GRADIENT[0]}, ${PRIMARY_GRADIENT[1]});
          color: white;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 16px;
        }
        .tenant-name {
          font-size: 14px;
          font-weight: 600;
          color: #1e293b;
          margin: 0;
        }
        .tenant-id {
          font-size: 11px;
          color: #64748b;
          margin: 2px 0 0;
        }
        .logout-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          width: 100%;
          padding: 10px 15px;
          background: #fef2f2;
          border: none;
          border-radius: 8px;
          color: #dc2626;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
        }
        .dashboard-main {
          flex: 1;
          margin-left: 260px;
          padding: 20px 30px;
        }
        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 25px;
        }
        .dashboard-header h1 {
          font-size: 24px;
          font-weight: 700;
          color: ${PRIMARY_GRADIENT[0]};
          margin: 0;
        }
        .dashboard-header p {
          font-size: 14px;
          color: #64748b;
          margin: 4px 0 0;
        }
        .back-to-home {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 10px 16px;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          color: #64748b;
          font-size: 13px;
          text-decoration: none;
        }
        .back-to-home:hover {
          border-color: ${PRIMARY_GRADIENT[1]};
          color: ${PRIMARY_GRADIENT[1]};
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 25px;
        }
        .stat-card {
          background: white;
          padding: 20px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          gap: 15px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }
        .stat-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .stat-label {
          font-size: 12px;
          color: #64748b;
          margin: 0;
        }
        .stat-value {
          font-size: 20px;
          font-weight: 700;
          color: ${PRIMARY_GRADIENT[0]};
          margin: 4px 0 0;
        }
        .info-card, .activity-card, .payments-card, .maintenance-card, .notices-card, .profile-card {
          background: white;
          border-radius: 14px;
          padding: 25px;
          margin-bottom: 20px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }
        .info-card h2, .activity-card h2, .payments-card h2, .maintenance-card h2, .notices-card h2, .profile-card h2 {
          font-size: 18px;
          font-weight: 700;
          color: ${PRIMARY_GRADIENT[0]};
          margin: 0 0 20px;
        }
        .info-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .info-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .info-label {
          font-size: 12px;
          color: #64748b;
        }
        .info-value {
          font-size: 15px;
          font-weight: 600;
          color: #1e293b;
        }
        .activity-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        .activity-item {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 12px;
          background: #f8fafc;
          border-radius: 10px;
        }
        .activity-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
        }
        .activity-title {
          font-size: 14px;
          font-weight: 500;
          color: #1e293b;
          margin: 0;
        }
        .activity-date {
          font-size: 12px;
          color: #64748b;
          margin: 2px 0 0;
        }
        .payments-table {
          width: 100%;
          border-collapse: collapse;
        }
        .payments-table th {
          text-align: left;
          padding: 12px;
          background: #f8fafc;
          font-size: 12px;
          font-weight: 600;
          color: #64748b;
          border-radius: 8px;
        }
        .payments-table td {
          padding: 14px 12px;
          font-size: 14px;
          color: #1e293b;
          border-bottom: 1px solid #f1f5f9;
        }
        .status {
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 600;
        }
        .status.paid {
          background: #dcfce7;
          color: #16a34a;
        }
        .maintenance-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .maintenance-header h2 {
          margin: 0;
        }
        .new-request-btn {
          padding: 10px 16px;
          background: linear-gradient(135deg, ${PRIMARY_GRADIENT[0]}, ${PRIMARY_GRADIENT[1]});
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
        }
        .maintenance-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .maintenance-item {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 15px;
          background: #f8fafc;
          border-radius: 10px;
        }
        .maintenance-status {
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 600;
        }
        .maintenance-status.resolved {
          background: #dcfce7;
          color: #16a34a;
        }
        .maintenance-status.pending {
          background: #fef3c7;
          color: #d97706;
        }
        .maintenance-title {
          font-size: 14px;
          font-weight: 500;
          color: #1e293b;
          margin: 0;
        }
        .maintenance-date {
          font-size: 12px;
          color: #64748b;
          margin: 2px 0 0;
        }
        .notices-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        .notice-item {
          padding: 15px;
          background: #f8fafc;
          border-radius: 10px;
          border-left: 3px solid ${PRIMARY_GRADIENT[1]};
        }
        .notice-date {
          font-size: 11px;
          color: #64748b;
          margin-bottom: 6px;
        }
        .notice-item h4 {
          font-size: 15px;
          font-weight: 600;
          color: #1e293b;
          margin: 0 0 8px;
        }
        .notice-item p {
          font-size: 13px;
          color: #64748b;
          margin: 0;
          line-height: 1.5;
        }
        .profile-header {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 25px;
          padding-bottom: 20px;
          border-bottom: 1px solid #f1f5f9;
        }
        .profile-avatar {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, ${PRIMARY_GRADIENT[0]}, ${PRIMARY_GRADIENT[1]});
          color: white;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          font-weight: 700;
        }
        .profile-header h3 {
          font-size: 22px;
          font-weight: 700;
          color: ${PRIMARY_GRADIENT[0]};
          margin: 0;
        }
        .profile-header p {
          font-size: 14px;
          color: #64748b;
          margin: 4px 0 0;
        }
        .profile-details {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        .profile-field {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .profile-field label {
          font-size: 12px;
          color: #64748b;
        }
        .profile-field p {
          font-size: 15px;
          font-weight: 500;
          color: #1e293b;
          margin: 0;
        }
        
        @media (max-width: 1024px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .info-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 768px) {
          .dashboard-sidebar {
            width: 70px;
          }
          .sidebar-header span,
          .nav-label,
          .tenant-info > div:last-child {
            display: none;
          }
          .nav-item {
            justify-content: center;
            padding: 12px;
          }
          .logout-btn {
            justify-content: center;
            padding: 12px;
          }
          .logout-btn span:not(.nav-icon) {
            display: none;
          }
          .dashboard-main {
            margin-left: 70px;
            padding: 15px;
          }
          .stats-grid {
            grid-template-columns: 1fr;
          }
          .info-grid {
            grid-template-columns: 1fr;
          }
          .profile-details {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default TenantDashboard;
