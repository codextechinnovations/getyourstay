const fs = require('fs');
const path = require('path');

const AREAS = ['Koramangala', 'HSR Layout', 'Electronic City', 'Whitefield', 'Marathahalli', 'Indiranagar', 'MG Road', 'Silk Board', 'Jayanagar', 'Bellandur', 'Hebbal', 'Banashankari', 'Malleswaram', 'JP Nagar', 'Rajajinagar', 'BTM Layout', 'Domlur', 'CV Raman Nagar', 'Basavanagudi', 'Sarjapur'];
const CITIES = ['Bangalore', 'Hyderabad', 'Chennai', 'Pune', 'Mumbai', 'Delhi'];

const PAGES = {
  '/': {
    title: 'GetYourStay - PG Accommodation in Bangalore | Best PGs Near You',
    description: 'Find verified PG accommodation in Bangalore. Browse 500+ PGs with transparent pricing, real reviews, and modern amenities.',
    body: `
      <section>
        <h2>Find the Best PG Accommodation in Bangalore</h2>
        <p>GetYourStay is India's trusted platform for finding verified paying guest (PG) accommodation. We connect students and working professionals with the best PG homes across Bangalore and other major Indian cities. Whether you need a single room, shared accommodation, or co-living space, GetYourStay helps you find the perfect home with transparent pricing, real tenant reviews, and verified listings.</p>
      </section>
      <section>
        <h2>Popular Areas for PG in Bangalore</h2>
        <p>Bangalore has a vibrant PG culture with accommodations available in all major neighborhoods. Some of the most popular areas for PG accommodation include: ${AREAS.slice(0, 10).join(', ')}, and more. Each area offers unique advantages - Electronic City is popular among IT professionals working in the tech hub, HSR Layout offers a balanced lifestyle with excellent connectivity, Koramangala is known for its vibrant social scene, and Whitefield has emerged as a major IT corridor with numerous PG options.</p>
      </section>
      <section>
        <h2>Types of PG Accommodation</h2>
        <p>We offer three main categories of PG accommodation: Male PGs for men with shared or single rooms, Female PGs with enhanced security features and women-only buildings, and Co-living PGs for both genders with modern amenities. Each PG listing includes details about food options (with or without mess), room types (single, double, triple sharing), deposit amounts, rent rates, and available amenities like WiFi, AC, geyser, washing machine, and power backup.</p>
      </section>
      <section>
        <h2>PG Rent and Pricing in Bangalore</h2>
        <p>PG rents in Bangalore vary based on location, amenities, and room type. Monthly rents typically range from Rs. 5,000 to Rs. 15,000 for shared rooms and Rs. 8,000 to Rs. 25,000 for single rooms. Areas like Electronic City and HSR Layout offer more affordable options, while Koramangala and Indiranagar command premium rates. Most PGs require a refundable deposit of 1-2 months' rent. Daily rent options are also available for short-term stays at Rs. 300 to Rs. 800 per day.</p>
      </section>
      <section>
        <h2>Amenities You Can Expect</h2>
        <p>PG accommodations in Bangalore typically offer a wide range of amenities including high-speed WiFi, fully furnished rooms with bed and wardrobe, air conditioning (AC) or cooler, attached or shared bathrooms with geyser, housekeeping services, power backup for fans and lights, purified drinking water, CCTV security, and sometimes a common TV or recreation area. Many premium PGs also offer gym facilities, terrace access, and laundry services.</p>
      </section>
      <section>
        <h2>How GetYourStay Works</h2>
        <p>Finding your perfect PG on GetYourStay is simple. Browse hundreds of verified PG listings across Bangalore, filter by area, gender, budget, and amenities. Read genuine tenant reviews and ratings. Compare pricing and facilities side by side. Contact PG owners directly through our platform. Visit shortlisted PGs and move in with confidence. Our platform is completely free for tenants - no brokerage, no hidden fees, no middlemen.</p>
      </section>
      <section>
        <h2>Frequently Asked Questions About PG Accommodation</h2>
        <p><strong>What is the average rent for PG in Bangalore?</strong> Average PG rent in Bangalore ranges from Rs. 6,000 to Rs. 12,000 per month depending on the area and amenities.</p>
        <p><strong>Is food included in PG rent?</strong> Many PGs offer food (mess) at an additional cost of Rs. 2,000 to Rs. 5,000 per month. You can filter by PGs with food on GetYourStay.</p>
        <p><strong>What is the typical deposit amount?</strong> Most PGs ask for a refundable security deposit of 1 to 2 months' rent. Deposit rules in Bangalore PG accommodation are regulated by the property owner.</p>
        <p><strong>Can I get a PG for a short duration?</strong> Yes, many PGs offer daily and weekly rentals. Use the daily rent filter to find short-stay options.</p>
        <p><strong>Are PGs safe for women?</strong> Yes, we have numerous verified female PG options with CCTV, female wardens, and enhanced security features in areas like HSR Layout, Koramangala, and Electronic City.</p>
      </section>`,
  },
  '/list-your-pg': {
    title: 'List Your PG for Free | PG Owner Registration | GetYourStay',
    description: 'List your PG on GetYourStay - India\'s #1 free PG listing platform. Register your paying guest accommodation and reach 50,000+ active users.',
    body: `
      <section>
        <h2>List Your PG Property for Free on GetYourStay</h2>
        <p>Join India's fastest-growing PG listing platform and connect with thousands of verified tenants actively searching for accommodation. Listing your PG on GetYourStay is completely free, takes just 5 minutes, and gives you access to a large pool of genuine tenants including students, working professionals, and interns looking for homes in Bangalore and other cities.</p>
      </section>
      <section>
        <h2>Why List Your PG on GetYourStay?</h2>
        <p>GetYourStay offers PG owners a powerful platform to showcase their property with detailed listings including photos, amenities, pricing, and location. You get direct enquiries from interested tenants, a user-friendly owner dashboard to manage listings, and SEO-optimized visibility on Google search. Over 50,000 active users browse our platform monthly, ensuring your property gets maximum exposure.</p>
      </section>
      <section>
        <h2>Features for PG Owners</h2>
        <p>Our owner dashboard gives you complete control over your listing. You can upload up to 10 photos, list all amenities (WiFi, AC, food, parking, power backup, laundry), set pricing for both monthly and daily rentals, specify room types (single, double, triple sharing), define gender preferences (male, female, co-living), and update availability status in real-time. You receive direct enquiries from interested tenants without any middlemen or brokerage.</p>
      </section>
      <section>
        <h2>How to Register Your PG</h2>
        <p>Registering your PG on GetYourStay is simple. Create your account with your name, phone number, and email. Add your PG details including property name, address, area, and pincode. Upload clear photos of rooms, common areas, bathrooms, and building exterior. Set your pricing for monthly and daily rentals. List all amenities and features. Choose your preferred gender category. Submit your listing for verification. Once verified, your PG goes live and starts receiving enquiries from potential tenants.</p>
      </section>
      <section>
        <h2>Pricing and Plans</h2>
        <p>Basic listing on GetYourStay is completely free with no time limit. You get a standard listing with up to 5 photos, basic amenities listing, and direct enquiries from tenants. For enhanced visibility, you can upgrade to a premium plan that includes priority placement in search results, featured listing badge, up to 10 photos, detailed analytics, and priority support. Premium plans start at just Rs. 499 per month.</p>
      </section>
      <section>
        <h2>Tips for a Successful PG Listing</h2>
        <p>To attract more tenants and get your PG rented faster, use high-quality photos showing rooms, common areas, and building exterior. Write a detailed description highlighting unique features and nearby landmarks. Set competitive pricing based on your area and amenities. List all amenities accurately to set proper expectations. Respond to enquiries promptly. Keep your availability status updated. Encourage tenants to leave reviews after move-in.</p>
      </section>
      <section>
        <h2>Areas Where PG Owners Can List</h2>
        <p>We accept PG listings from all areas of Bangalore including ${AREAS.join(', ')}. We also accept listings from other major Indian cities including ${CITIES.join(', ')}. If you own a PG property in any of these areas, list it today and start receiving tenant enquiries immediately.</p>
      </section>`,
  },
  '/pg-management-app': {
    title: 'PG Owner App | Free PG Management Software | GetYourStay',
    description: 'Download free PG owner app - best PG management software. Track rent payments, manage tenants, handle maintenance. Just Rs. 499/month with 7-day free trial.',
    body: `
      <section>
        <h2>PG Management Software for Property Owners</h2>
        <p>GetYourStay offers powerful PG management software designed specifically for paying guest accommodation owners. Our comprehensive platform helps you manage tenants, track rent payments, handle maintenance requests, and grow your PG business — all from one dashboard. Whether you own a single PG property or manage multiple buildings across Bangalore, our software scales with your needs.</p>
      </section>
      <section>
        <h2>Key Features of Our PG Management App</h2>
        <p>Our PG management software includes tenant management with complete profiles, lease agreements, and document storage. The rent tracking system automates payment collection, sends reminders, and tracks dues. The maintenance management module lets tenants submit requests that you can assign and track. The dashboard provides real-time analytics on occupancy rates, revenue, and expenses. You also get communication tools to send broadcast messages to all tenants about notices, events, or emergencies.</p>
      </section>
      <section>
        <h2>Rent Payment and Financial Management</h2>
        <p>Simplify rent collection with automated monthly rent reminders sent to tenants via SMS and email. Track paid and pending rent in real-time with color-coded status indicators. Generate digital receipts for every payment. View monthly, quarterly, and annual revenue reports. Track security deposits, late fees, and other charges. Export financial data for accounting purposes. Integration with UPI and bank transfer makes payment tracking seamless.</p>
      </section>
      <section>
        <h2>Tenant Management Made Easy</h2>
        <p>Maintain complete digital profiles for every tenant including personal details, emergency contacts, and employment information. Store rental agreements, ID proofs, and other documents securely in the cloud. Track lease start and end dates with automatic renewal reminders. Manage room allocations and transfers with a simple drag-and-drop interface. Keep a detailed history of each tenant including payment records, maintenance requests, and communication logs.</p>
      </section>
      <section>
        <h2>Maintenance and Complaint Management</h2>
        <p>Tenants can submit maintenance requests through the app with photos and descriptions. You receive instant notifications and can assign tasks to your maintenance staff. Track progress from open to in-progress to completed. Maintain a history of all maintenance work for each room and common area. Schedule preventive maintenance for water purifiers, generators, and other equipment. Keep tenants happy with quick resolution of their complaints.</p>
      </section>
      <section>
        <h2>Pricing Plans</h2>
        <p>Our PG management software starts at just Rs. 499 per month with a 7-day free trial. The basic plan covers up to 50 tenants with core features including rent tracking, tenant management, and maintenance requests. The professional plan at Rs. 999 per month supports up to 200 tenants with additional features like advanced analytics, custom reports, and priority support. The enterprise plan for large PG chains offers custom pricing with unlimited tenants, dedicated account manager, and API access.</p>
      </section>
      <section>
        <h2>Why Choose GetYourStay for PG Management?</h2>
        <p>GetYourStay is built specifically for the Indian PG market, understanding the unique challenges of PG management in cities like Bangalore. Our software is available on web and mobile, works in English and Hindi, supports all UPI payment apps, and offers dedicated customer support. Join thousands of PG owners across Bangalore who trust GetYourStay to manage their properties efficiently and grow their business.</p>
      </section>`,
  },
  '/about': {
    title: 'About GetYourStay - PG Accommodation in Bangalore, India',
    description: 'Learn about GetYourStay - India\'s trusted platform for PG accommodation. We connect students and professionals with verified paying guest homes across Bangalore.',
    body: `
      <section>
        <h2>About GetYourStay</h2>
        <p>GetYourStay was founded with a simple mission: make finding PG accommodation in India easy, transparent, and trustworthy. We are a Bangalore-based startup dedicated to solving the housing challenges faced by millions of students and working professionals who move to cities for education and employment. Our platform bridges the gap between PG owners looking for reliable tenants and tenants searching for their perfect home.</p>
      </section>
      <section>
        <h2>Our Mission</h2>
        <p>Our mission is to become India's most trusted platform for PG accommodation by ensuring every listing is verified, every price is transparent, and every tenant finds a home they love. We believe that access to quality housing is a fundamental need, and we strive to make the process of finding and managing PG accommodation as seamless as possible for both tenants and property owners.</p>
      </section>
      <section>
        <h2>Why GetYourStay?</h2>
        <p>The PG accommodation market in India is fragmented and unorganized. Tenants struggle to find genuine listings with accurate information, while PG owners struggle to find reliable tenants. GetYourStay solves this by providing a verified platform where every PG listing is checked for accuracy, prices are transparent with no hidden charges, tenant reviews are from genuine residents, and communication happens directly between tenants and owners without middlemen.</p>
      </section>
      <section>
        <h2>Our Values</h2>
        <p>Trust is at the core of everything we do at GetYourStay. We verify every PG listing to ensure accuracy. We believe in complete transparency in pricing, amenities, and policies. We treat every user with respect and provide support whenever needed. We continuously innovate to improve our platform and services. We engage with the communities we serve and strive to make a positive impact on the housing ecosystem in India.</p>
      </section>
      <section>
        <h2>Our Reach</h2>
        <p>GetYourStay serves thousands of tenants and PG owners across Bangalore, with listings in all major areas including ${AREAS.join(', ')}. We are expanding to other Indian cities including ${CITIES.join(', ')}. Our platform features over 500 verified PG listings with detailed information about amenities, pricing, and tenant reviews. We help over 50,000 active users find their perfect PG accommodation every month.</p>
      </section>
      <section>
        <h2>Contact Us</h2>
        <p>Have questions about GetYourStay or need help finding PG accommodation? We are here to help. Call us at +91 97418 21179 or email support@getyourstay.in. You can also visit our contact page for more information. Our team is available 24/7 to assist tenants and PG owners with any questions or concerns.</p>
      </section>`,
  },
  '/contact': {
    title: 'Contact GetYourStay - PG Accommodation Support | GetYourStay',
    description: 'Contact GetYourStay for PG accommodation support. Call +91 8660801742 or email support@getyourstay.in. We\'re here 24/7 to help you find the perfect PG.',
    body: `
      <section>
        <h2>Contact GetYourStay</h2>
        <p>We would love to hear from you! Whether you are a tenant looking for PG accommodation, a PG owner wanting to list your property, or someone with a question about our services, our team is ready to assist you. GetYourStay provides multiple ways to get in touch with us.</p>
      </section>
      <section>
        <h2>Phone Support</h2>
        <p>Call us at +91 97418 21179 for immediate assistance. Our support team is available 24 hours a day, 7 days a week to help tenants find PG accommodation, assist PG owners with listing their properties, and resolve any issues you may have with our platform. Whether you need help searching for PGs in Electronic City, understanding deposit rules in Bangalore, or listing your property in HSR Layout, we are just a phone call away.</p>
      </section>
      <section>
        <h2>Email Support</h2>
        <p>Send us an email at support@getyourstay.in and our team will respond within 24 hours. Email is the best way to reach us for detailed inquiries, feedback about our platform, partnership opportunities, or if you need documentation or receipts. Please include your name, contact information, and a detailed description of your query to help us serve you better and faster.</p>
      </section>
      <section>
        <h2>Office Address</h2>
        <p>GetYourStay is headquartered in Bangalore, India. Our team works remotely across the city to serve tenants and PG owners in all major areas. While we do not have a walk-in office, our support team is always available via phone and email to help you find PG accommodation or list your property on our platform.</p>
      </section>
      <section>
        <h2>Areas We Serve</h2>
        <p>We provide PG accommodation services across Bangalore including ${AREAS.join(', ')}. We also serve other major Indian cities. If you need PG accommodation in any of these areas, contact us and we will help you find the perfect home. PG owners from these areas can also list their properties on GetYourStay and reach thousands of active tenants.</p>
      </section>
      <section>
        <h2>Business Inquiries</h2>
        <p>For business inquiries, partnership opportunities, media queries, or bulk listing arrangements, please email us at support@getyourstay.in with "Business Inquiry" in the subject line. We are open to partnerships with real estate agents, property management companies, corporate housing providers, and educational institutions looking for accommodation solutions for their students and employees.</p>
      </section>
      <section>
        <h2>Report an Issue</h2>
        <p>If you encounter any issues with our website, mobile app, or any PG listing, please contact us immediately. We take all reports seriously and work to resolve issues within 24 hours. Your feedback helps us improve our platform and provide better service to everyone in the PG accommodation community.</p>
      </section>`,
  },
  '/privacy': {
    title: 'Privacy Policy | GetYourStay - PG Accommodation',
    description: 'Read GetYourStay\'s privacy policy. Learn how we collect, use, and protect your personal information when you use our PG accommodation platform.',
    body: `
      <section>
        <h2>Privacy Policy</h2>
        <p>GetYourStay ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our PG accommodation platform. Please read this policy carefully to understand our views and practices regarding your personal data.</p>
      </section>
      <section>
        <h2>Information We Collect</h2>
        <p>We collect information you provide directly to us when you register an account, list a PG property, or contact us. This includes your name, phone number, email address, property details, and any other information you choose to provide. We also automatically collect certain information when you visit our platform, including your IP address, browser type, operating system, referring URLs, and browsing behavior. We use cookies and similar tracking technologies to enhance your experience and analyze platform usage.</p>
      </section>
      <section>
        <h2>How We Use Your Information</h2>
        <p>We use the information we collect to provide, maintain, and improve our PG accommodation platform. This includes facilitating communication between tenants and PG owners, personalizing your experience, sending notifications about listings and enquiries, analyzing usage patterns to improve our services, and complying with legal obligations. We do not sell your personal information to third parties for their marketing purposes.</p>
      </section>
      <section>
        <h2>Information Sharing and Disclosure</h2>
        <p>We may share your information with PG owners or tenants as necessary to facilitate accommodation arrangements. We may also share information with service providers who help us operate our platform, including hosting providers, analytics services, and communication tools. We may disclose information if required by law or to protect our rights and the safety of our users. In the event of a business transfer, user information may be transferred as part of the assets.</p>
      </section>
      <section>
        <h2>Data Security</h2>
        <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes encryption of data in transit, secure server infrastructure, access controls, and regular security audits. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security of your data.</p>
      </section>
      <section>
        <h2>Your Rights and Choices</h2>
        <p>You have the right to access, update, or delete your personal information at any time. You can manage your account settings through your profile dashboard. You can opt out of marketing communications by following the unsubscribe instructions in our emails. You can disable cookies through your browser settings. You can request a copy of your data or deletion of your account by contacting us at support@getyourstay.in.</p>
      </section>
      <section>
        <h2>Contact Us About Privacy</h2>
        <p>If you have any questions about this Privacy Policy or our data practices, please contact us at support@getyourstay.in or call +91 97418 21179. We will respond to your privacy-related inquiries within 48 hours. This policy was last updated in April 2026 and may be revised periodically. Continued use of our platform after changes constitutes acceptance of the updated policy.</p>
      </section>`,
  },
  '/terms': {
    title: 'Terms & Conditions | GetYourStay - PG Accommodation',
    description: 'Review GetYourStay\'s terms and conditions for using our PG accommodation platform. Understand your rights and responsibilities as a tenant or PG owner.',
    body: `
      <section>
        <h2>Terms and Conditions</h2>
        <p>Welcome to GetYourStay. By accessing or using our website and services, you agree to be bound by these Terms and Conditions. Please read them carefully. If you do not agree with any part of these terms, you should not use our platform. These terms apply to all visitors, users, tenants, PG owners, and others who access or use our service.</p>
      </section>
      <section>
        <h2>Use of the Platform</h2>
        <p>GetYourStay provides a platform connecting tenants seeking PG accommodation with property owners offering PG housing. We facilitate communication between parties but are not a party to any rental agreement between tenants and PG owners. All rental terms, including rent amount, deposit, duration, and house rules, are solely between the tenant and the PG owner. GetYourStay does not guarantee the accuracy of listings, though we make reasonable efforts to verify information.</p>
      </section>
      <section>
        <h2>User Accounts and Responsibilities</h2>
        <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must provide accurate, complete, and up-to-date information when creating an account. You agree not to use the platform for any unlawful purpose or in violation of these terms. You must not impersonate any person or entity or misrepresent your affiliation with any person or entity.</p>
      </section>
      <section>
        <h2>PG Listings</h2>
        <p>PG owners are responsible for the accuracy of their listings including photos, pricing, amenities, availability, and property details. GetYourStay reserves the right to remove listings that violate our policies or contain inaccurate information. PG owners agree to respond to tenant enquiries in a timely manner and maintain accurate availability status. Listings must not contain misleading information, discriminatory content, or violate any applicable laws.</p>
      </section>
      <section>
        <h2>Intellectual Property</h2>
        <p>The GetYourStay name, logo, platform design, and all content published on the website are the intellectual property of GetYourStay unless otherwise indicated. You may not reproduce, distribute, modify, or create derivative works without our prior written consent. Users retain ownership of content they post but grant GetYourStay a license to display and distribute such content on the platform.</p>
      </section>
      <section>
        <h2>Limitation of Liability</h2>
        <p>GetYourStay provides the platform on an "as is" and "as available" basis without warranties of any kind. We are not liable for any damages arising from the use of our platform, including but not limited to direct, indirect, incidental, consequential, or punitive damages. This includes disputes between tenants and PG owners, inaccuracies in listings, and any interruptions or errors in service.</p>
      </section>
      <section>
        <h2>Changes to Terms</h2>
        <p>We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on our website. Your continued use of the platform after changes constitutes acceptance of the new terms. We encourage you to review these terms periodically. For questions about these terms, contact us at support@getyourstay.in.</p>
      </section>`,
  },
  '/tenant-login': {
    title: 'Tenant Login | GetYourStay - PG Dashboard',
    description: 'Login to your GetYourStay tenant dashboard. View your PG bookings, rent payments, maintenance requests, and communicate with your PG owner.',
    body: `
      <section>
        <h2>Tenant Dashboard - Manage Your PG Stay</h2>
        <p>Welcome to your GetYourStay tenant dashboard. This is your central hub for managing all aspects of your PG accommodation. From viewing your booking details to tracking rent payments and submitting maintenance requests, everything you need is just a click away. Log in to access your personalized dashboard and stay connected with your PG owner.</p>
      </section>
      <section>
        <h2>View Your PG Booking Details</h2>
        <p>Once logged in, you can view complete details about your PG accommodation including your room number, check-in date, lease duration, monthly rent, deposit amount paid, and the amenities you have access to. You can also see your PG's address, contact information for the owner or manager, and important house rules. All this information is available at your fingertips, making it easy to reference whenever you need it.</p>
      </section>
      <section>
        <h2>Track Rent Payments</h2>
        <p>The dashboard provides a complete view of your rent payment history. You can see when your next rent payment is due, view past payments with dates and amounts, download digital receipts for every payment made, and track your security deposit status. You will receive automatic reminders before each rent due date via SMS and email, ensuring you never miss a payment and maintain a good relationship with your PG owner.</p>
      </section>
      <section>
        <h2>Submit Maintenance Requests</h2>
        <p>Need something fixed in your room or common area? Submit a maintenance request directly through the dashboard. Describe the issue, upload photos if needed, and track the status of your request from submission to resolution. You will receive notifications when the owner acknowledges your request and when the work is completed. This creates a transparent record of all maintenance issues and ensures timely resolution.</p>
      </section>
      <section>
        <h2>Communicate with Your PG Owner</h2>
        <p>The dashboard includes communication tools that let you send messages to your PG owner or property manager directly through the platform. You can ask questions about your stay, request renewals, give notice before moving out, or discuss any concerns. All communication is logged and visible in your account, creating a helpful record of your interactions with the property management.</p>
      </section>
      <section>
        <h2>How to Access Your Dashboard</h2>
        <p>To log in to your tenant dashboard, use the phone number you provided during booking. You will receive a one-time password (OTP) via SMS to verify your identity. No password to remember, no complicated login process. If you are a new tenant and do not have an account yet, contact your PG owner to get registered on the GetYourStay platform and start enjoying the benefits of digital PG management.</p>
      </section>
      <section>
        <h2>Features Coming Soon</h2>
        <p>We are continuously improving the tenant dashboard experience. Upcoming features include the ability to make rent payments directly through the platform using UPI, credit card, or net banking, rate and review your PG accommodation, download your rental agreement, connect with fellow tenants in the same building, and receive personalized PG recommendations when you are ready to move.</p>
      </section>`,
  },
};

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

function buildNoscript(pageContent) {
  const { title, body } = pageContent;
  return `<noscript>
    <div style="padding:20px 24px;font-family:system-ui,-apple-system,sans-serif;max-width:1100px;margin:0 auto;color:#1e293b;line-height:1.6">
      <h1 style="font-size:28px;color:#1a1a4e;margin-bottom:8px">${escapeHtml(title)}</h1>
      ${body}
      <hr style="border:none;border-top:1px solid #e2e8f0;margin:32px 0"/>
      <div style="font-size:13px;color:#94a3b8">
        <p>This page requires JavaScript for full interactive features including search, filtering, and contact forms. Please enable JavaScript in your browser settings.</p>
        <p style="margin-top:4px">Contact us: <a href="tel:+919741821179" style="color:#2563eb">+91 97418 21179</a> | <a href="mailto:support@getyourstay.in" style="color:#2563eb">support@getyourstay.in</a></p>
        <p style="margin-top:4px">&copy; 2026 GetYourStay. All rights reserved.</p>
      </div>
    </div>
  </noscript>`;
}

function prerender() {
  const buildDir = path.resolve(__dirname, 'build');
  const indexPath = path.join(buildDir, 'index.html');

  if (!fs.existsSync(indexPath)) {
    console.log('Build directory not found. Skipping prerender.');
    return;
  }

  let baseHtml = fs.readFileSync(indexPath, 'utf-8');

  const noscriptTagRegex = /\s*<noscript>[\s\S]*?<\/noscript>\s*/;
  const titleRegex = /<title>[^<]*<\/title>/;
  const descRegex = /<meta name="description"[^>]*\/?>/;
  const metaRegex = /<meta property="og:title"[^>]*\/?>/;
  const ogDescRegex = /<meta property="og:description"[^>]*\/?>/;
  const ogUrlRegex = /<meta property="og:url"[^>]*\/?>/;
  const canonicalRegex = /<link rel="canonical"[^>]*\/?>/;
  const rootDivRegex = /(<div\s+id="root"\s*>)\s*<\/div>/;

  for (const [route, content] of Object.entries(PAGES)) {
    let html = baseHtml;

    html = html.replace(titleRegex, `<title>${content.title}</title>`);
    html = html.replace(descRegex, `<meta name="description" content="${content.description}" />`);
    html = html.replace(metaRegex, `<meta property="og:title" content="${content.title}" />`);
    html = html.replace(ogDescRegex, `<meta property="og:description" content="${content.description}" />`);
    html = html.replace(ogUrlRegex, `<meta property="og:url" content="https://www.getyourstay.in${route}" />`);
    html = html.replace(canonicalRegex, `<link rel="canonical" href="https://www.getyourstay.in${route}" />`);

    html = html.replace(noscriptTagRegex, '');
    html = html.replace(rootDivRegex, (_match, openTag) => {
      const noscript = buildNoscript(content);
      return `${openTag}${noscript}</div>`;
    });

    const outputName = route === '/' ? 'index' : route.slice(1);
    const outputDir = outputName === 'index' ? buildDir : path.join(buildDir, outputName);
    fs.mkdirSync(outputDir, { recursive: true });
    fs.writeFileSync(path.join(outputDir, 'index.html'), html);
    console.log(`  Prerendered: /${outputName} (${(html.length / 1024).toFixed(1)} KB)`);
  }

  console.log('Prerendering complete.');
}

prerender();
