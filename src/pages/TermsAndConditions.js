import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import { theme } from '../theme';
import '../App.css';

const TermsAndConditions = () => {
  return (
    <div className="static-page">
      <header className="static-header">
        <Link to="/" className="header-logo">
          <Logo size="small" />
        </Link>
        <Link to="/" className="back-home">← Back to Home</Link>
      </header>

      <div className="static-container">
        {/* Hero Section */}
        <section className="terms-hero">
          <h1>Terms and Conditions</h1>
          <p className="hero-subtitle">Last Updated: April 2026</p>
        </section>

        {/* Introduction */}
        <section className="content-section">
          <p className="intro-text">
            Welcome to GetYourStay. These Terms and Conditions ("Terms") govern your use of the GetYourStay website, mobile application, and related services (collectively, the "Platform") operated by GetYourStay Technologies Pvt. Ltd. ("Company," "we," "us," or "our"). By accessing or using our Platform, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our services.
          </p>
        </section>

        {/* Table of Contents */}
        <section className="toc-section">
          <h2>Table of Contents</h2>
          <div className="toc-grid">
            <a href="#definitions" className="toc-item">1. Definitions</a>
            <a href="#services" className="toc-item">2. Services Description</a>
            <a href="#eligibility" className="toc-item">3. Eligibility</a>
            <a href="#account" className="toc-item">4. Account Registration</a>
            <a href="#listings" className="toc-item">5. PG Listings</a>
            <a href="#bookings" className="toc-item">6. Bookings and Payments</a>
            <a href="#tenant" className="toc-item">7. Tenant Responsibilities</a>
            <a href="#owner" className="toc-item">8. PG Owner Responsibilities</a>
            <a href="#fees" className="toc-item">9. Fees and Payments</a>
            <a href="#cancellation" className="toc-item">10. Cancellation Policy</a>
            <a href="#privacy" className="toc-item">11. Privacy and Data</a>
            <a href="#intellectual" className="toc-item">12. Intellectual Property</a>
            <a href="#disclaimer" className="toc-item">13. Disclaimer</a>
            <a href="#liability" className="toc-item">14. Limitation of Liability</a>
            <a href="#indemnification" className="toc-item">15. Indemnification</a>
            <a href="#termination" className="toc-item">16. Termination</a>
            <a href="#governing" className="toc-item">17. Governing Law</a>
            <a href="#contact" className="toc-item">18. Contact Information</a>
          </div>
        </section>

        {/* Sections */}
        <section className="content-section" id="definitions">
          <h2>1. Definitions</h2>
          <ul className="terms-list">
            <li><strong>"User"</strong> refers to any person accessing or using the Platform, including both Tenants and PG Owners.</li>
            <li><strong>"Tenant"</strong> means any individual seeking or renting PG accommodation through the Platform.</li>
            <li><strong>"PG Owner"</strong> or <strong>"Owner"</strong> means any property owner, landlord, or manager listing paying guest accommodation on the Platform.</li>
            <li><strong>"PG Accommodation"</strong> or <strong>"PG"</strong> refers to paying guest accommodation, which may include single, double, or triple sharing rooms, with or without food services.</li>
            <li><strong>"Listing"</strong> refers to any PG accommodation posted by an Owner on the Platform.</li>
            <li><strong>"Booking"</strong> refers to a confirmed reservation of PG accommodation by a Tenant.</li>
            <li><strong>"Content"</strong> includes text, images, videos, reviews, and other materials posted on the Platform.</li>
          </ul>
        </section>

        <section className="content-section" id="services">
          <h2>2. Services Description</h2>
          <p>GetYourStay provides an online marketplace connecting Tenants with PG Owners. Our services include:</p>
          <ul className="terms-list">
            <li>Platform for PG Owners to list their accommodations with details, photos, pricing, and amenities</li>
            <li>Search and discovery tools for Tenants to find suitable PG accommodations</li>
            <li>Communication tools enabling direct contact between Tenants and PG Owners</li>
            <li>Online payment processing for rent, deposits, and other charges</li>
            <li>Tenant dashboard for managing bookings, payments, and maintenance requests</li>
            <li>Owner dashboard for managing listings, bookings, and tenant information</li>
            <li>Customer support services for both Tenants and PG Owners</li>
          </ul>
          <p>We do not own, operate, or manage any PG properties. We act solely as an intermediary platform.</p>
        </section>

        <section className="content-section" id="eligibility">
          <h2>3. Eligibility</h2>
          <p>To use our Platform, you must:</p>
          <ul className="terms-list">
            <li>Be at least 18 years of age for Tenants or 21 years of age for PG Owners</li>
            <li>Have the legal capacity to enter into binding contracts</li>
            <li>Not be prohibited from using our services under applicable laws</li>
            <li>Provide accurate, current, and complete information during registration</li>
            <li>Maintain the security of your account credentials</li>
          </ul>
          <p>By using our Platform, you represent and warrant that you meet these eligibility requirements.</p>
        </section>

        <section className="content-section" id="account">
          <h2>4. Account Registration</h2>
          <h3>4.1 Tenant Registration</h3>
          <p>Tenants must register with valid phone numbers and create a secure password. You may also register using your Google or Facebook account. Upon registration, you gain access to:</p>
          <ul className="terms-list">
            <li>Search and browse PG listings across all cities</li>
            <li>Book PG accommodation</li>
            <li>Access your tenant dashboard</li>
            <li>Make online payments</li>
            <li>Submit maintenance requests</li>
            <li>View notices and announcements</li>
          </ul>
          
          <h3>4.2 PG Owner Registration</h3>
          <p>PG Owners must complete verification including:</p>
          <ul className="terms-list">
            <li>Valid identity proof (Aadhaar, PAN, or Passport)</li>
            <li>Property ownership or management authorization documents</li>
            <li>Property address verification</li>
            <li>Bank account details for receiving payments</li>
          </ul>
          
          <h3>4.3 Account Security</h3>
          <p>You are responsible for maintaining the confidentiality of your account credentials. All activities under your account are your responsibility. Notify us immediately of any unauthorized access.</p>
        </section>

        <section className="content-section" id="listings">
          <h2>5. PG Listings</h2>
          <h3>5.1 Listing Requirements</h3>
          <p>PG Owners must ensure their listings are accurate, complete, and include:</p>
          <ul className="terms-list">
            <li>Clear, recent photographs of all rooms, common areas, and amenities</li>
            <li>Accurate address and location information</li>
            <li>Detailed description of accommodation type (single/double/triple sharing)</li>
            <li>Complete list of amenities (AC, WiFi, food, laundry, parking, etc.)</li>
            <li>Transparent pricing including rent, deposit, and food charges</li>
            <li>House rules and policies</li>
            <li>Gender restrictions if any</li>
            <li>Minimum lease duration requirements</li>
          </ul>
          
          <h3>5.2 Prohibited Listings</h3>
          <p>The following are prohibited on our Platform:</p>
          <ul className="terms-list">
            <li>Fake or misleading listings</li>
            <li>Properties without necessary licenses or permits</li>
            <li>Discriminatory accommodations</li>
            <li>Properties in violation of local laws or regulations</li>
            <li>Duplicate listings of the same property</li>
          </ul>
          
          <h3>5.3 Listing Verification</h3>
          <p>GetYourStay reserves the right to verify listings through physical inspections or document verification. We may remove or suspend listings that fail verification or violate our policies.</p>
        </section>

        <section className="content-section" id="bookings">
          <h2>6. Bookings and Payments</h2>
          <h3>6.1 Booking Process</h3>
          <p>When a Tenant books PG accommodation through GetYourStay:</p>
          <ol className="terms-list numbered">
            <li>The Tenant selects a PG and submits a booking request</li>
            <li>The PG Owner receives and reviews the booking request</li>
            <li>Upon approval, the booking is confirmed</li>
            <li>The Tenant may be required to pay booking fees, security deposit, or first month's rent</li>
            <li>Payment confirmation is sent to both parties via email and SMS</li>
          </ol>
          
          <h3>6.2 Payment Methods</h3>
          <p>We support the following payment methods:</p>
          <ul className="terms-list">
            <li>Credit Cards (Visa, Mastercard, American Express)</li>
            <li>Debit Cards (all major banks)</li>
            <li>UPI (Google Pay, PhonePe, Paytm, BHIM)</li>
            <li>Net Banking (all major banks)</li>
            <li>EMI options (select cards)</li>
          </ul>
          
          <h3>6.3 Payment Security</h3>
          <p>All payments on GetYourStay are processed through secure payment gateways with industry-standard SSL encryption. We do not store your complete card details on our servers.</p>
        </section>

        <section className="content-section" id="tenant">
          <h2>7. Tenant Responsibilities</h2>
          <p>As a Tenant using GetYourStay, you agree to:</p>
          <ul className="terms-list">
            <li>Provide accurate and truthful information during registration and booking</li>
            <li>Pay all applicable fees, rent, and deposits on time</li>
            <li>Follow house rules and policies of the PG accommodation</li>
            <li>Maintain the PG property in good condition</li>
            <li>Not engage in illegal activities on the premises</li>
            <li>Not sublet or transfer the accommodation without PG Owner consent</li>
            <li>Respect other tenants and maintain peaceful co-existence</li>
            <li>Report maintenance issues through the Platform</li>
            <li>Provide required documents for PG registration as per local laws</li>
            <li>Inform us of any disputes or issues with the PG Owner</li>
          </ul>
        </section>

        <section className="content-section" id="owner">
          <h2>8. PG Owner Responsibilities</h2>
          <p>As a PG Owner using GetYourStay, you agree to:</p>
          <ul className="terms-list">
            <li>Maintain accurate and up-to-date listings</li>
            <li>Provide the accommodation as described in your listing</li>
            <li>Respond to booking requests within 24 hours</li>
            <li>Maintain the property in safe and habitable condition</li>
            <li>Comply with all applicable local laws, including police verification and fire safety</li>
            <li>Provide basic amenities as advertised</li>
            <li>Not increase prices unexpectedly after booking confirmation</li>
            <li>Issue proper receipts for all payments received</li>
            <li>Maintain tenant privacy and data protection</li>
            <li>Handle complaints and maintenance requests promptly</li>
            <li>Process security deposits and refunds according to agreed terms</li>
          </ul>
        </section>

        <section className="content-section" id="fees">
          <h2>9. Fees and Payments</h2>
          <h3>9.1 Platform Fees</h3>
          <p>GetYourStay charges the following fees:</p>
          <ul className="terms-list">
            <li><strong>For Tenants:</strong> Nominal booking convenience fee (if applicable) per transaction</li>
            <li><strong>For PG Owners:</strong> Commission fee based on the booking value, deducted from payments received</li>
          </ul>
          
          <h3>9.2 Rent and Deposits</h3>
          <p>Rent and security deposits are paid directly to PG Owners. GetYourStay facilitates these payments but is not responsible for disputes regarding amounts, refunds, or property conditions.</p>
          
          <h3>9.3 Payment Processing</h3>
          <p>Owner payments are processed within 3-5 business days after tenant check-in confirmation. Processing fees for bank transfers are borne by the Owner.</p>
        </section>

        <section className="content-section" id="cancellation">
          <h2>10. Cancellation Policy</h2>
          <h3>10.1 Booking Cancellation by Tenant</h3>
          <ul className="terms-list">
            <li><strong>Free cancellation:</strong> Up to 48 hours before check-in date for a full refund of any prepaid fees</li>
            <li><strong>Partial refund:</strong> Cancellation between 24-48 hours before check-in - 50% refund</li>
            <li><strong>No refund:</strong> Cancellation within 24 hours of check-in</li>
          </ul>
          
          <h3>10.2 Cancellation by PG Owner</h3>
          <p>If a PG Owner cancels a confirmed booking, the Tenant is entitled to a full refund plus a booking credit for future use on the Platform.</p>
          
          <h3>10.3 Force Majeure</h3>
          <p>Cancellations due to circumstances beyond anyone's control (natural disasters, government restrictions, etc.) will be handled on a case-by-case basis.</p>
        </section>

        <section className="content-section" id="privacy">
          <h2>11. Privacy and Data</h2>
          <p>Your privacy is important to us. Our Privacy Policy, available at <Link to="/privacy">getyourstay.in/privacy</Link>, explains how we collect, use, and protect your personal information.</p>
          <p>By using our Platform, you consent to our data practices as described in the Privacy Policy. You agree that:</p>
          <ul className="terms-list">
            <li>We may collect and store information you provide during registration and booking</li>
            <li>We may share your information with PG Owners/Tenants as necessary for service provision</li>
            <li>We may use your information to improve our services and communicate with you</li>
            <li>PG Owners are responsible for protecting tenant data under their own privacy policies</li>
          </ul>
        </section>

        <section className="content-section" id="intellectual">
          <h2>12. Intellectual Property</h2>
          <p>All content on the GetYourStay Platform, including but not limited to logos, text, graphics, images, software, and trademarks, is the intellectual property of GetYourStay Technologies Pvt. Ltd. or its licensors.</p>
          <p>Users retain ownership of content they submit (reviews, photos, etc.) but grant us a non-exclusive, royalty-free license to use, reproduce, and display such content on our Platform.</p>
        </section>

        <section className="content-section" id="disclaimer">
          <h2>13. Disclaimer</h2>
          <p>GETYOURSTAY IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.</p>
          <p>We do not warrant that:</p>
          <ul className="terms-list">
            <li>The Platform will be uninterrupted, secure, or error-free</li>
            <li>Listings are accurate, complete, or current</li>
            <li>The quality of PG accommodations will meet your expectations</li>
            <li>Any errors in the Platform will be corrected</li>
          </ul>
          <p>We are not responsible for the actions, representations, or omissions of PG Owners or Tenants. Any agreements or arrangements made through our Platform are solely between the parties involved.</p>
        </section>

        <section className="content-section" id="liability">
          <h2>14. Limitation of Liability</h2>
          <p>TO THE MAXIMUM EXTENT PERMITTED BY LAW, GETYOURSTAY SHALL NOT BE LIABLE FOR:</p>
          <ul className="terms-list">
            <li>Any indirect, incidental, special, consequential, or punitive damages</li>
            <li>Loss of profits, revenue, data, or business opportunities</li>
            <li>Any damages arising from your use of or inability to use the Platform</li>
            <li>Any damages arising from PG Owner or Tenant actions</li>
            <li>Any personal injury or property damage occurring at PG premises</li>
          </ul>
          <p>Our total liability for any claims arising from these Terms shall not exceed the fees paid by you to GetYourStay in the twelve months preceding the claim.</p>
        </section>

        <section className="content-section" id="indemnification">
          <h2>15. Indemnification</h2>
          <p>You agree to indemnify and hold harmless GetYourStay, its officers, directors, employees, and agents from any claims, damages, losses, or expenses (including legal fees) arising from:</p>
          <ul className="terms-list">
            <li>Your violation of these Terms</li>
            <li>Your misuse of the Platform</li>
            <li>Your fraudulent or unlawful activities</li>
            <li>Any disputes with other Users</li>
          </ul>
        </section>

        <section className="content-section" id="termination">
          <h2>16. Termination</h2>
          <h3>16.1 Termination by You</h3>
          <p>You may close your account at any time by contacting our support team or using the account closure option in settings. Upon closure, any pending bookings will be handled according to our cancellation policy.</p>
          
          <h3>16.2 Termination by Us</h3>
          <p>We may suspend or terminate your account if you:</p>
          <ul className="terms-list">
            <li>Violate these Terms or our policies</li>
            <li>Engage in fraudulent or illegal activities</li>
            <li>Harass, abuse, or threaten other Users</li>
            <li>Provide false or misleading information</li>
            <li>Interfere with Platform operations</li>
          </ul>
          
          <h3>16.3 Effect of Termination</h3>
          <p>Upon termination, your access to the Platform will be revoked, and we may retain certain information as required by law or for legitimate business purposes.</p>
        </section>

        <section className="content-section" id="governing">
          <h2>17. Governing Law and Dispute Resolution</h2>
          <p>These Terms shall be governed by and construed in accordance with the laws of India.</p>
          <p>Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts in Bangalore, Karnataka, India.</p>
          <p>We encourage Users to first attempt to resolve any disputes through our customer support team before pursuing legal action.</p>
        </section>

        <section className="content-section" id="contact">
          <h2>18. Contact Information</h2>
          <p>For questions about these Terms and Conditions, please contact us:</p>
          <div className="contact-box">
            <p><strong>GetYourStay Technologies Pvt. Ltd.</strong></p>
            <p>📍 Electronic City, Phase 2, Bangalore - 560100, Karnataka, India</p>
            <p>📞 Phone: +91 98765 43210</p>
            <p>✉️ Email: legal@getyourstay.in</p>
            <p>🌐 Website: www.getyourstay.in</p>
          </div>
        </section>

        {/* Updates */}
        <section className="content-section">
          <h2>Updates to These Terms</h2>
          <p>We may update these Terms from time to time to reflect changes in our services, legal requirements, or business practices. We will notify you of material changes through:</p>
          <ul className="terms-list">
            <li>Email notification to your registered email address</li>
            <li>Notice on our Platform</li>
            <li>Update to the "Last Updated" date at the top of this page</li>
          </ul>
          <p>Your continued use of the Platform after such changes constitutes your acceptance of the revised Terms.</p>
        </section>

        {/* SEO Section */}
        <section className="seo-section">
          <h2>PG Accommodation Terms and Conditions in India</h2>
          <div className="seo-content">
            <p>
              These terms and conditions govern your use of GetYourStay, India's trusted platform for <strong>paying guest accommodation</strong>. Whether you're a student searching for <strong>PG near college</strong> or a working professional looking for <strong>PG near office</strong>, our platform connects you with verified PG owners across major Indian cities.
            </p>
            <p>
              By using GetYourStay, you agree to our terms of service designed to protect both <strong>PG tenants</strong> and <strong>PG owners</strong>. Our comprehensive policies ensure transparent <strong>PG booking</strong> processes, secure payments, and clear cancellation policies. We serve students and professionals looking for <strong>PG in Bangalore</strong>, <strong>PG in Hyderabad</strong>, <strong>PG in Chennai</strong>, <strong>PG in Pune</strong>, and other major cities.
            </p>
            <p>
              GetYourStay maintains strict <strong>PG listing verification</strong> standards and requires all PG owners to provide valid documents. Our platform facilitates seamless <strong>PG rent payment</strong> through secure payment gateways and offers dedicated support for all your <strong>paying guest accommodation</strong> needs.
            </p>
          </div>
        </section>
      </div>

      <style>{`
        .static-page {
          min-height: 100vh;
          background: #f8fafc;
        }
        .static-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 30px;
          background: white;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }
        .back-home {
          color: ${theme.primary[700]};
          text-decoration: none;
          font-weight: 500;
          padding: 8px 16px;
          border: 1px solid ${theme.primary[200]};
          border-radius: 20px;
          transition: all 0.2s;
        }
        .back-home:hover {
          background: ${theme.primary[50]};
        }
        .static-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 20px 60px;
        }
        .terms-hero {
          text-align: center;
          padding: 60px 20px 40px;
          background: linear-gradient(135deg, ${theme.primary[900]} 0%, ${theme.primary[800]} 50%, ${theme.primary[700]} 100%);
          border-radius: 20px;
          margin: 30px 0;
        }
        .terms-hero h1 {
          color: white;
          font-size: 38px;
          font-weight: 800;
          margin: 0 0 10px;
        }
        .terms-hero .hero-subtitle {
          color: rgba(255,255,255,0.85);
          font-size: 16px;
          margin: 0;
        }
        .content-section {
          background: white;
          border-radius: 16px;
          padding: 35px 40px;
          margin: 25px 0;
          box-shadow: 0 2px 15px rgba(0,0,0,0.04);
        }
        .content-section h2 {
          color: ${theme.primary[800]};
          font-size: 22px;
          font-weight: 700;
          margin: 0 0 15px;
          padding-bottom: 10px;
          border-bottom: 2px solid ${theme.primary[100]};
        }
        .content-section h3 {
          color: ${theme.primary[700]};
          font-size: 17px;
          font-weight: 600;
          margin: 20px 0 10px;
        }
        .content-section p {
          color: ${theme.neutral[600]};
          font-size: 15px;
          line-height: 1.8;
          margin: 0 0 12px;
        }
        .content-section .intro-text {
          font-size: 16px;
          color: ${theme.neutral[700]};
        }
        .toc-section {
          background: ${theme.primary[800]};
          border-radius: 16px;
          padding: 30px 35px;
          margin: 25px 0;
        }
        .toc-section h2 {
          color: white;
          font-size: 20px;
          font-weight: 700;
          margin: 0 0 20px;
        }
        .toc-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        .toc-item {
          color: rgba(255,255,255,0.85);
          text-decoration: none;
          font-size: 14px;
          padding: 10px 15px;
          background: rgba(255,255,255,0.1);
          border-radius: 8px;
          transition: all 0.2s;
        }
        .toc-item:hover {
          background: rgba(255,255,255,0.2);
          color: white;
        }
        .terms-list {
          margin: 0;
          padding-left: 20px;
          color: ${theme.neutral[600]};
          font-size: 15px;
          line-height: 1.8;
        }
        .terms-list li {
          margin-bottom: 8px;
        }
        .terms-list strong {
          color: ${theme.primary[700]};
        }
        .contact-box {
          background: ${theme.neutral[50]};
          border-radius: 12px;
          padding: 20px 25px;
          margin-top: 15px;
        }
        .contact-box p {
          margin: 0 0 8px;
        }
        .seo-section {
          background: ${theme.neutral[100]};
          border-radius: 16px;
          padding: 40px;
          margin: 30px 0;
        }
        .seo-section h2 {
          color: ${theme.primary[800]};
          font-size: 22px;
          font-weight: 700;
          margin: 0 0 20px;
        }
        .seo-content p {
          color: ${theme.neutral[600]};
          font-size: 15px;
          line-height: 1.9;
          margin: 0 0 15px;
        }
        .seo-content strong {
          color: ${theme.primary[700]};
        }
        @media (max-width: 768px) {
          .terms-hero h1 { font-size: 28px; }
          .content-section { padding: 25px; }
          .toc-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .toc-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default TermsAndConditions;
