import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import { theme } from '../theme';
import '../App.css';

const PrivacyPolicy = () => {
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
        <section className="privacy-hero">
          <h1>Privacy Policy</h1>
          <p className="hero-subtitle">Last Updated: April 2026</p>
        </section>

        {/* Introduction */}
        <section className="content-section">
          <p className="intro-text">
            GetYourStay Technologies Pvt. Ltd. ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website, mobile application, and related services (collectively, the "Platform"). Please read this Privacy Policy carefully. By using our Platform, you consent to the collection and use of information in accordance with this policy.
          </p>
        </section>

        {/* Table of Contents */}
        <section className="toc-section">
          <h2>Table of Contents</h2>
          <div className="toc-grid">
            <a href="#information-collection" className="toc-item">1. Information We Collect</a>
            <a href="#information-use" className="toc-item">2. How We Use Your Information</a>
            <a href="#information-sharing" className="toc-item">3. Information Sharing</a>
            <a href="#cookies" className="toc-item">4. Cookies & Tracking</a>
            <a href="#data-security" className="toc-item">5. Data Security</a>
            <a href="#data-retention" className="toc-item">6. Data Retention</a>
            <a href="#your-rights" className="toc-item">7. Your Rights</a>
            <a href="#third-party" className="toc-item">8. Third-Party Links</a>
            <a href="#children" className="toc-item">9. Children's Privacy</a>
            <a href="#changes" className="toc-item">10. Policy Changes</a>
            <a href="#contact" className="toc-item">11. Contact Us</a>
          </div>
        </section>

        {/* Section 1 */}
        <section className="content-section" id="information-collection">
          <h2>1. Information We Collect</h2>
          <p>We collect information about you in various ways when you use our Platform:</p>
          
          <h3>1.1 Personal Information You Provide</h3>
          <ul className="policy-list">
            <li><strong>Registration Information:</strong> Name, email address, phone number, password, date of birth, gender</li>
            <li><strong>Profile Information:</strong> Profile photo, bio, occupation, company/college name, emergency contact details</li>
            <li><strong>Identity Verification:</strong> Aadhaar number, PAN number, passport number, driving license, or other government-issued ID</li>
            <li><strong>Booking Information:</strong> PG preferences, check-in/check-out dates, room type, payment information</li>
            <li><strong>Communication Data:</strong> Messages sent through our Platform, feedback, reviews, and survey responses</li>
            <li><strong>Support Information:</strong> Any information you provide when contacting customer support</li>
          </ul>

          <h3>1.2 PG Owner Information</h3>
          <p>If you are a PG Owner, we may also collect:</p>
          <ul className="policy-list">
            <li><strong>Property Documents:</strong> Property ownership proof, rental agreements, business registration documents</li>
            <li><strong>Bank Details:</strong> Bank account number, IFSC code, UPI ID for receiving payments</li>
            <li><strong>Property Details:</strong> Address, photographs, amenities, pricing, availability</li>
            <li><strong>Verification Data:</strong> Business PAN, GST registration, local authority licenses</li>
          </ul>

          <h3>1.3 Automatically Collected Information</h3>
          <p>When you access our Platform, we automatically collect:</p>
          <ul className="policy-list">
            <li><strong>Device Information:</strong> Device type, operating system, browser type, unique device identifiers</li>
            <li><strong>Usage Data:</strong> Pages visited, time spent on pages, search queries, clicks, scrolls</li>
            <li><strong>Location Data:</strong> IP address, GPS coordinates (with your permission), WiFi access points</li>
            <li><strong>Log Data:</strong> Access times, referring URL, crash reports, system activity</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="content-section" id="information-use">
          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect for the following purposes:</p>
          
          <h3>2.1 Service Provision</h3>
          <ul className="policy-list">
            <li>Creating and managing your account</li>
            <li>Processing and confirming PG bookings</li>
            <li>Facilitating payments between tenants and PG owners</li>
            <li>Providing customer support and resolving disputes</li>
            <li>Sending booking confirmations, reminders, and updates</li>
          </ul>

          <h3>2.2 Platform Improvement</h3>
          <ul className="policy-list">
            <li>Analyzing usage patterns to improve user experience</li>
            <li>Developing new features and services</li>
            <li>Testing and debugging our Platform</li>
            <li>Conducting research and analytics</li>
          </ul>

          <h3>2.3 Communication</h3>
          <ul className="policy-list">
            <li>Sending promotional messages and marketing communications (with your consent)</li>
            <li>Notifying you about new PG listings, offers, and updates</li>
            <li>Sending service-related notifications (booking status, payment updates)</li>
            <li>Responding to your inquiries and support requests</li>
          </ul>

          <h3>2.4 Security & Compliance</h3>
          <ul className="policy-list">
            <li>Detecting and preventing fraud, abuse, and illegal activities</li>
            <li>Verifying user identity and preventing unauthorized access</li>
            <li>Complying with legal obligations and law enforcement requests</li>
            <li>Enforcing our Terms of Service and policies</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="content-section" id="information-sharing">
          <h2>3. Information Sharing and Disclosure</h2>
          <p>We may share your information in the following circumstances:</p>

          <h3>3.1 With Other Users</h3>
          <ul className="policy-list">
            <li><strong>PG Owners:</strong> When you book a PG, we share your name, phone number, and booking details with the PG Owner</li>
            <li><strong>Tenants:</strong> Your profile information, reviews, and ratings may be visible to other users</li>
          </ul>

          <h3>3.2 Service Providers</h3>
          <p>We share information with third-party service providers who assist us in:</p>
          <ul className="policy-list">
            <li>Payment processing (Razorpay, Paytm, banks)</li>
            <li>Cloud hosting and storage (AWS, Google Cloud)</li>
            <li>Analytics and tracking (Google Analytics)</li>
            <li>Customer support (Freshdesk, Zendesk)</li>
            <li>Communication (Twilio, SendGrid)</li>
            <li>Image storage (ImgBB, Cloudinary)</li>
          </ul>

          <h3>3.3 Legal Requirements</h3>
          <p>We may disclose information if required by:</p>
          <ul className="policy-list">
            <li>Applicable laws, regulations, or court orders</li>
            <li>Law enforcement or government authorities</li>
            <li>To protect our rights, privacy, safety, or property</li>
            <li>To investigate potential violations of our Terms</li>
          </ul>

          <h3>3.4 Business Transfers</h3>
          <p>In case of merger, acquisition, or sale of assets, your information may be transferred as part of the transaction. We will notify you via email or prominent notice on our Platform of any such change.</p>
        </section>

        {/* Section 4 */}
        <section className="content-section" id="cookies">
          <h2>4. Cookies and Tracking Technologies</h2>
          
          <h3>4.1 What Are Cookies?</h3>
          <p>Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences and improve your browsing experience.</p>

          <h3>4.2 Types of Cookies We Use</h3>
          <ul className="policy-list">
            <li><strong>Essential Cookies:</strong> Required for basic Platform functionality, authentication, and security</li>
            <li><strong>Preference Cookies:</strong> Remember your settings and preferences for a better experience</li>
            <li><strong>Analytics Cookies:</strong> Help us understand how users interact with our Platform</li>
            <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements (with your consent)</li>
          </ul>

          <h3>4.3 Managing Cookies</h3>
          <p>You can control cookies through your browser settings. Disabling cookies may affect Platform functionality. For more information, visit <a href="https://www.aboutcookies.org" target="_blank" rel="noopener noreferrer">www.aboutcookies.org</a>.</p>

          <h3>4.4 Other Tracking Technologies</h3>
          <p>We also use:</p>
          <ul className="policy-list">
            <li><strong>Web Beacons:</strong> Small images embedded in emails and web pages</li>
            <li><strong>Local Storage:</strong> Data stored in your browser for longer-term preferences</li>
            <li><strong>Device Fingerprinting:</strong> Collecting device characteristics for security</li>
          </ul>
        </section>

        {/* Section 5 */}
        <section className="content-section" id="data-security">
          <h2>5. Data Security</h2>
          <p>We implement appropriate technical and organizational measures to protect your information:</p>
          
          <ul className="policy-list">
            <li><strong>Encryption:</strong> All data transmitted using 256-bit SSL/TLS encryption</li>
            <li><strong>Secure Storage:</strong> Data stored in encrypted databases with access controls</li>
            <li><strong>Regular Audits:</strong> Periodic security assessments and vulnerability testing</li>
            <li><strong>Access Controls:</strong> Role-based access to data on a need-to-know basis</li>
            <li><strong>Employee Training:</strong> Staff trained on data protection and privacy</li>
            <li><strong>Incident Response:</strong> Documented procedures for data breach handling</li>
          </ul>

          <p>While we strive to protect your information, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security.</p>
        </section>

        {/* Section 6 */}
        <section className="content-section" id="data-retention">
          <h2>6. Data Retention</h2>
          <p>We retain your information for as long as necessary to fulfill the purposes outlined in this policy:</p>
          
          <ul className="policy-list">
            <li><strong>Account Data:</strong> Retained while your account is active and for 2 years after closure</li>
            <li><strong>Booking Records:</strong> Retained for 7 years for legal and tax compliance</li>
            <li><strong>Communications:</strong> Retained for 3 years after the relevant interaction</li>
            <li><strong>Marketing Data:</strong> Retained until you unsubscribe or withdraw consent</li>
            <li><strong>Analytics Data:</strong> Retained in anonymized form for up to 5 years</li>
          </ul>

          <p>After retention periods, data is securely deleted or anonymized.</p>
        </section>

        {/* Section 7 */}
        <section className="content-section" id="your-rights">
          <h2>7. Your Rights Under Indian Privacy Laws</h2>
          <p>Under the Digital Personal Data Protection Act, 2023 (DPDPA), you have the following rights:</p>

          <h3>7.1 Right to Access</h3>
          <p>You can request a copy of the personal information we hold about you. To make a request, email privacy@getyourstay.in with "Information Access Request" in the subject line.</p>

          <h3>7.2 Right to Correction</h3>
          <p>You can request correction of inaccurate or incomplete personal information. Update your profile directly through the Platform or contact us.</p>

          <h3>7.3 Right to Erasure</h3>
          <p>You can request deletion of your personal information, subject to legal retention requirements. Account deletion can be requested through settings or by contacting support.</p>

          <h3>7.4 Right to Data Portability</h3>
          <p>You can request your data in a machine-readable format (JSON or CSV). Send your request to privacy@getyourstay.in.</p>

          <h3>7.5 Right to Grievance Redressal</h3>
          <p>For any privacy concerns, you can file a complaint with our Data Protection Officer. We will acknowledge your complaint within 48 hours and resolve it within 30 days.</p>

          <h3>7.6 Right to Nominate</h3>
          <p>Under DPDPA, you have the right to nominate a nominee who can exercise your rights in case of your death or incapacity.</p>

          <p><strong>To exercise any of these rights, contact us at:</strong></p>
          <div className="contact-box">
            <p><strong>Data Protection Officer</strong></p>
            <p>📧 privacy@getyourstay.in</p>
            <p>📞 +91 98765 43210</p>
            <p>📍 Electronic City, Bangalore - 560100</p>
          </div>
        </section>

        {/* Section 8 */}
        <section className="content-section" id="third-party">
          <h2>8. Third-Party Links and Services</h2>
          <p>Our Platform may contain links to third-party websites and services:</p>
          
          <ul className="policy-list">
            <li><strong>External Websites:</strong> We are not responsible for the privacy practices of linked websites</li>
            <li><strong>Payment Gateways:</strong> Payment processing is handled by third-party providers (Razorpay, Paytm, UPI)</li>
            <li><strong>Social Media:</strong> Features like social login are governed by third-party privacy policies</li>
            <li><strong>Analytics Services:</strong> Google Analytics and similar services collect usage data</li>
          </ul>

          <p>We recommend reviewing the privacy policies of any third-party services before sharing your information.</p>
        </section>

        {/* Section 9 */}
        <section className="content-section" id="children">
          <h2>9. Children's Privacy</h2>
          <p>Our Platform is not intended for users under 18 years of age. We do not knowingly collect personal information from children without parental consent.</p>
          
          <p>If you believe we have collected information from a child without verification of parental consent, please contact us immediately at privacy@getyourstay.in. We will take steps to remove such information from our systems.</p>
        </section>

        {/* Section 10 */}
        <section className="content-section" id="changes">
          <h2>10. Changes to This Privacy Policy</h2>
          <p>We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements.</p>
          
          <ul className="policy-list">
            <li>We will notify you of material changes via email or prominent notice on our Platform</li>
            <li>The "Last Updated" date at the top of this page indicates when changes were made</li>
            <li>Continued use of our Platform after changes constitutes acceptance of the updated policy</li>
            <li>We encourage you to review this policy periodically</li>
          </ul>
        </section>

        {/* Section 11 */}
        <section className="content-section" id="contact">
          <h2>11. Contact Us</h2>
          <p>If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us:</p>
          
          <div className="contact-box">
            <p><strong>GetYourStay Technologies Pvt. Ltd.</strong></p>
            <p>📧 Email: privacy@getyourstay.in</p>
            <p>📞 Phone: +91 98765 43210</p>
            <p>💬 WhatsApp: +91 98765 43210</p>
            <p>📍 Address: Electronic City, Phase 2, Bangalore - 560100, Karnataka, India</p>
            <p>⏰ Support Hours: Monday - Saturday, 9:00 AM - 8:00 PM IST</p>
          </div>

          <p>For data protection inquiries, you can also reach our Data Protection Officer at dpo@getyourstay.in.</p>
        </section>

        {/* Consent Section */}
        <section className="content-section">
          <h2>Your Consent</h2>
          <p>By using GetYourStay, you consent to the collection and use of information in accordance with this Privacy Policy. If you do not agree with our policies, please do not use our Platform.</p>
          
          <p>For residents of the European Economic Area (EEA), please note that we process your data in accordance with the General Data Protection Regulation (GDPR). If you require further information about GDPR compliance, please contact us.</p>
        </section>

        {/* SEO Section */}
        <section className="seo-section">
          <h2>Privacy Policy for PG Accommodation Services</h2>
          <div className="seo-content">
            <p>
              GetYourStay is committed to protecting your privacy when you search for <strong>PG accommodation in Bangalore</strong>, <strong>PG in Hyderabad</strong>, or any other city. This privacy policy explains how we handle your personal information when you use our platform to find <strong>paying guest accommodation</strong>, book PG rooms, or manage your tenant account.
            </p>
            <p>
              We collect only the information necessary to provide you with <strong>PG booking services</strong>, facilitate payments, and ensure a safe experience for both tenants and <strong>PG owners</strong>. Your data is protected using industry-standard <strong>SSL encryption</strong> and stored securely in compliance with India's <strong>Digital Personal Data Protection Act, 2023</strong> (DPDPA).
            </p>
            <p>
              Whether you're a student looking for <strong>PG near college</strong> or a working professional seeking <strong>PG near office</strong>, you can trust that your personal information, including identity documents and contact details, is handled with utmost care and in accordance with applicable privacy laws.
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
        .privacy-hero {
          text-align: center;
          padding: 60px 20px 40px;
          background: linear-gradient(135deg, ${theme.primary[900]} 0%, ${theme.primary[800]} 50%, ${theme.primary[700]} 100%);
          border-radius: 20px;
          margin: 30px 0;
        }
        .privacy-hero h1 {
          color: white;
          font-size: 38px;
          font-weight: 800;
          margin: 0 0 10px;
        }
        .privacy-hero .hero-subtitle {
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
        .policy-list {
          margin: 0;
          padding-left: 20px;
          color: ${theme.neutral[600]};
          font-size: 15px;
          line-height: 1.8;
        }
        .policy-list li {
          margin-bottom: 8px;
        }
        .policy-list strong {
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
        a {
          color: ${theme.accent[500]};
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline;
        }
        @media (max-width: 768px) {
          .privacy-hero h1 { font-size: 28px; }
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

export default PrivacyPolicy;
