const fs = require('fs');
const path = require('path');

const NEIGHBORHOODS = {
  'Electronic City': { desc: 'Located along Bangalore\'s southern Hosur Road, Electronic City is divided into Phase 1 and Phase 2 and hosts over 200 IT companies including Infosys, Wipro, and TCS headquarters. PG rents here range from Rs. 5,000 to Rs. 12,000 for shared rooms and Rs. 8,000 to Rs. 18,000 for single rooms. Most PGs offer complimentary shuttle service to nearby tech parks. The area has seen 40% PG growth since 2022 due to IT corridor expansion.', avgRent: 'Rs. 7,000 - Rs. 12,000', commute: '15-20 min walk to most IT campuses' },
  'HSR Layout': { desc: 'HSR Layout is a planned residential locality in South Bangalore divided into sectors 1 through 7 with wide roads and good lake proximity. PG accommodations cluster around Sector 3 and the BDA complex area with monthly rents from Rs. 6,000 to Rs. 14,000 for shared rooms. The neighborhood offers excellent connectivity to Electronic City (20 minutes), Bellandur (15 minutes), and Koramangala (10 minutes). Over 300 PG options are available within a 3 km radius of the HSR Layout BDA junction.', avgRent: 'Rs. 7,000 - Rs. 13,000', commute: '10 min to Silk Board, 20 min to Electronic City' },
  'Koramangala': { desc: 'Koramangala is one of Bangalore\'s most vibrant neighborhoods, spanning 1st to 8th blocks with a dense concentration of startups, restaurants, and co-working spaces. PG accommodation in Koramangala commands premium pricing at Rs. 8,000 to Rs. 18,000 for shared rooms and Rs. 12,000 to Rs. 28,000 for single occupancy. The area is popular among tech professionals working at companies like Flipkart, Uber, and Swiggy whose offices are located within Koramangala\'s 4th and 5th blocks.', avgRent: 'Rs. 10,000 - Rs. 18,000', commute: 'Walking distance to many tech offices' },
  'Whitefield': { desc: 'Whitefield in East Bangalore has transformed from a sleepy suburb into a major IT corridor anchored by International Tech Park (ITPL) and KTPO. PG rents range from Rs. 5,500 to Rs. 12,000 for shared rooms with a heavy concentration of options near ITPL Main Road and Brookefield. Whitefield\'s PG market serves employees from over 150 IT companies in the vicinity.', avgRent: 'Rs. 6,500 - Rs. 12,000', commute: '5-15 min to ITPL/KTPO' },
  'Marathahalli': { desc: 'Marathahalli sits at the intersection of Old Airport Road and Whitefield Road, serving as a transit hub for IT professionals working at nearby tech parks. PG rents here range from Rs. 5,000 to Rs. 11,000 for shared rooms, making it one of Bangalore\'s more budget-friendly IT corridor options. The neighborhood has a high density of PGs within walking distance of the Marathahalli bridge bus stop.', avgRent: 'Rs. 5,500 - Rs. 10,000', commute: '10-20 min to Whitefield ITPL' },
  'Indiranagar': { desc: 'Indiranagar is an upscale East Bangalore neighborhood known for its 100 Feet Road dining and entertainment strip. PG rents in Indiranagar are among Bangalore\'s highest at Rs. 10,000 to Rs. 22,000 for shared rooms and up to Rs. 35,000 for premium single rooms with attached bathrooms. The neighborhood\'s 1st and 2nd stages have the highest PG concentration.', avgRent: 'Rs. 12,000 - Rs. 20,000', commute: '15 min to MG Road metro' },
};

const AREAS = Object.keys(NEIGHBORHOODS);
const EXTRA_AREAS = ['MG Road', 'Silk Board', 'Jayanagar', 'Bellandur', 'Hebbal', 'Banashankari', 'Malleswaram', 'JP Nagar', 'Rajajinagar', 'BTM Layout', 'Domlur', 'CV Raman Nagar', 'Basavanagudi', 'Sarjapur'];
const CITIES = ['Bangalore', 'Hyderabad', 'Chennai', 'Pune', 'Mumbai', 'Delhi'];

const PAGES = {
  '/': {
    title: 'GetYourStay - PG Accommodation in Bangalore | Best PGs Near You',
    description: 'Find verified PG accommodation in Bangalore. Browse 500+ PGs with transparent pricing, real reviews, and modern amenities.',
    body: `
      <section>
        <h2>PG Accommodation in Bangalore: A Complete Guide</h2>
        <p>GetYourStay lists over 500 verified PG accommodations across Bangalore, covering male PG, female PG, and co-living options in 20+ neighborhoods. Each listing includes verified photos, transparent pricing with no hidden charges, genuine tenant reviews, and direct owner contact. The platform processes over 50,000 active user sessions monthly and has facilitated more than 10,000 verified tenant-owner connections since launch. Tenants pay zero brokerage, zero booking fees, and zero commission.</p>
      </section>
      <section>
        <h2>Koramangala PG Accommodation: Rent, Amenities, and Locality Guide</h2>
        <p>Koramangala\'s PG market spans Blocks 1 through 8 with the highest density of options in Blocks 3, 4, and 6. Shared room PGs in Koramangala range from Rs. 8,000 to Rs. 18,000 per month, while single rooms cost Rs. 12,000 to Rs. 28,000. Most PGs in this area include WiFi, housekeeping, and power backup as standard amenities. Food (mess) costs an additional Rs. 3,000 to Rs. 5,000 per month. Koramangala\'s 4th Block is particularly popular among tech workers due to its proximity to Flipkart\'s headquarters, while the 5th Block offers newer PG buildings with AC and attached bathrooms. The neighborhood has Bangalore\'s highest density of restaurants and cafes within walking distance of most PG accommodations.</p>
      </section>
      <section>
        <h2>Electronic City PG Accommodation: Rent, Amenities, and Commute Guide</h2>
        <p>Electronic City Phase 1 and Phase 2 together host over 200 IT companies including Infosys, Wipro, TCS, and HCL. PG accommodation in this area is priced 20-30% lower than Koramangala with shared rooms at Rs. 5,000 to Rs. 12,000 and single rooms at Rs. 8,000 to Rs. 18,000. The majority of PGs in Electronic City offer complimentary or subsidized shuttle services to nearby IT campuses. Phase 2 has a higher concentration of newer, premium PG buildings with amenities like gym, terrace garden, and backup generator. The area has experienced 40% growth in organized PG supply since 2022, driven by IT corridor expansion along Hosur Road.</p>
      </section>
      <section>
        <h2>HSR Layout PG Accommodation: Rent, Amenities, and Locality Guide</h2>
        <p>HSR Layout\'s PG market is centered around Sector 3, the BDA complex, and the areas near Agara Lake. Monthly rents range from Rs. 6,000 to Rs. 14,000 for shared occupancy. The neighborhood offers a balanced lifestyle with lake views, wide roads, and proximity to both Electronic City (20 minutes) and Koramangala (10 minutes). Over 300 PG options are available within a 3 km radius of the HSR Layout BDA junction, making it one of Bangalore\'s most saturated PG markets with competitive pricing and standardized amenities.</p>
      </section>
      <section>
        <h2>Whitefield PG Accommodation: Rent, Amenities, and Commute Guide</h2>
        <p>Whitefield\'s PG market serves employees from approximately 150 IT companies in the International Tech Park (ITPL) and surrounding tech corridors. Monthly rents range from Rs. 5,500 to Rs. 12,000 for shared rooms, with the highest concentration of options on ITPL Main Road, Brookefield, and near KTPO. Most PGs in Whitefield offer scheduled auto-rickshaw or van pickup to tech parks at Rs. 1,000 to Rs. 2,000 per month extra. The area has seen significant PG development along the new Whitefield-Hoskote highway corridor.</p>
      </section>
      <section>
        <h2>Marathahalli PG Accommodation: Rent and Commute Analysis</h2>
        <p>Marathahalli sits at the junction of Old Airport Road and Whitefield Road, making it a strategic location for professionals working at Whitefield ITPL, Bellandur, and KR Puram tech parks. PG rents here range from Rs. 5,000 to Rs. 11,000 for shared rooms, positioning it as one of Bangalore\'s most affordable IT-corridor PG destinations. The neighborhood has a very high density of PGs within a 1 km radius of the Marathahalli bridge, with most offering direct bus connectivity to ITPL and Bellandur.</p>
      </section>
      <section>
        <h2>Indiranagar PG Accommodation: Premium Living Guide</h2>
        <p>Indiranagar represents Bangalore\'s premium PG segment with shared room rents at Rs. 10,000 to Rs. 22,000 and single room rents reaching Rs. 35,000 for high-end accommodations with attached bathrooms, air conditioning, and premium furnishings. The 1st and 2nd stages of Indiranagar have the highest PG density, particularly along Double Road and Old Madras Road. Most Indiranagar PGs include high-speed fiber WiFi (50-100 Mbps), weekly housekeeping, and 24-hour power backup as standard features.</p>
      </section>
      <section>
        <h2>PG Room Types and Pricing in Bangalore</h2>
        <p>Bangalore PG accommodations offer four standard room configurations: single occupancy (private room for one person), double sharing (two persons per room), triple sharing (three persons), and dormitory-style (four to six beds). Single rooms in premium areas like Koramangala and Indiranagar cost between Rs. 12,000 and Rs. 28,000 per month. Double sharing rooms average Rs. 7,000 to Rs. 15,000 across all areas. Triple sharing rooms range from Rs. 5,000 to Rs. 10,000. The refundable security deposit typically equals one to two months of rent and is returned within 15 to 30 days of vacating. Daily rental options are available at Rs. 300 to Rs. 800 per day for short-term stays.</p>
      </section>
      <section>
        <h2>PG Amenities in Bangalore: What Tenants Can Expect</h2>
        <p>Standard amenities across most Bangalore PGs include high-speed WiFi (typically 20-100 Mbps depending on the area and premium tier), fully furnished rooms with bed, mattress, wardrobe, and study table, attached or shared bathrooms with geyser, regular housekeeping (weekly for rooms, daily for common areas), 24-hour power backup for fans and lights, purified drinking water (RO or water cooler), and CCTV security with card access or security guard. Premium PGs additionally offer air conditioning, gym equipment, terrace garden or rooftop access, laundry service (Rs. 500-1,500 per month), refrigerator in common area, microwave, and television with satellite connection. Food inclusion is variable with most PGs offering optional mess at Rs. 2,500 to Rs. 5,000 per month for vegetarian meals and Rs. 3,500 to Rs. 6,000 for both vegetarian and non-vegetarian options.</p>
      </section>
      <section>
        <h2>PG Booking Process on GetYourStay: Step-by-Step Guide</h2>
        <p>The PG booking process on GetYourStay follows a four-step method designed to eliminate brokerage and middlemen. Step one: search and filter listings by area, gender, budget, and required amenities using the search bar on the homepage. Step two: review shortlisted PGs by reading detailed descriptions, viewing photo galleries, comparing pricing tables, and reading verified tenant ratings and reviews. Step three: contact the PG owner directly through the platform using the provided phone number — no form filling, no intermediaries, no login required. Step four: schedule a physical visit to inspect the property, meet the owner, review the rental agreement, and complete the booking directly with the PG owner. GetYourStay charges zero fees to tenants at every step of this process.</p>
      </section>
      <section>
        <h2>PG Deposit Rules in Bangalore: What Tenants Should Know</h2>
        <p>The standard PG security deposit in Bangalore ranges from one to two months of rent. For a PG with monthly rent of Rs. 8,000, the deposit typically falls between Rs. 8,000 and Rs. 16,000. This deposit is refundable and should be returned within 15 to 30 days of vacating the premises after deducting any legitimate charges for damages beyond normal wear and tear. Tenants should obtain a signed receipt for the deposit payment and document the room condition with photos at check-in. Some premium PGs in Koramangala and Indiranagar may request three months\' deposit for single-room accommodations. There is no government-regulated cap on PG deposits in Karnataka, but market practices keep deposits between one and two months for standard accommodations.</p>
      </section>
      <section>
        <h2>PG with Food in Bangalore: Mess Facilities and Meal Plans</h2>
        <p>Approximately 40% of PG listings on GetYourStay offer food inclusion through in-house mess facilities or tie-ups with local tiffin services. Monthly meal plans range from Rs. 2,500 (vegetarian breakfast and dinner only) to Rs. 6,000 (all meals including non-vegetarian options). Most PGs with food offer a standard menu cycle of 15 to 30 days with rotation. Meals typically include breakfast (idli, dosa, upma, bread, or poha), lunch (rice, sambar, dal, curry, and curd), and dinner (chapati, rice, dal, and vegetable). Non-vegetarian meals are usually served 3 to 4 days per week at PGs offering mixed meal plans. Some PGs in areas like Koramangala and HSR Layout have partnerships with Swiggy and Zomato for guest meal delivery.</p>
      </section>
      <section>
        <h2>Female PG Accommodation in Bangalore: Safety and Features</h2>
        <p>Female PG accommodations in Bangalore typically include enhanced security features such as CCTV cameras at all entry points and common areas, female wardens or caretakers residing on the premises, restricted male entry policies with visitor logbooks, and curfew timings ranging from 9 PM to 10 PM depending on the property. Areas with the highest concentration of verified female PGs include HSR Layout, Koramangala\'s 6th Block, Electronic City Phase 1, Indiranagar 1st Stage, and Jayanagar 4th Block. Monthly rents for female PGs range from Rs. 6,000 to Rs. 16,000 for shared rooms. Many female-only PGs near colleges and tech parks offer walking-distance proximity to educational institutions and workplaces.</p>
      </section>
      <section>
        <h2>Co-living PG Spaces in Bangalore: Modern Shared Living</h2>
        <p>Co-living PGs represent a modern category of shared accommodation that typically includes both male and female tenants in separate wings or floors of the same building. These properties offer community events, co-working spaces, and higher standards of furnishing compared to traditional PGs. Co-living rents in Bangalore range from Rs. 8,000 to Rs. 20,000 per month with amenities including high-speed fiber internet, weekly linen change, professional housekeeping, common room with TV and board games, and app-based community management. Popular co-living clusters exist in HSR Layout, Bellandur, and Whitefield.</p>
      </section>
      <section>
        <h2>PG Accommodation Near IT Companies in Bangalore</h2>
        <p>Bangalore\'s IT corridors host the highest density of PG accommodations. Electronic City Phase 1 serves Infosys, Wipro, and TCS with hundreds of PGs within walking distance. HSR Layout connects to Electronic City (20 minutes) and Bellandur (15 minutes). Whitefield ITPL area serves employees from Accenture, Cognizant, and IBM with PG clusters on ITPL Main Road. Marathahalli bridge area provides budget PG options for workers across multiple tech parks. Bellandur\'s Outer Ring Road corridor has seen rapid PG development serving companies in RMZ Ecospace and Embassy Tech Village. Average commute times from nearby PG accommodations to these tech parks range from 5 to 25 minutes depending on the specific location and traffic conditions.</p>
      </section>`,
  },
  '/list-your-pg': {
    title: 'List Your PG for Free | PG Owner Registration | GetYourStay',
    description: 'List your PG on GetYourStay - India\'s #1 free PG listing platform. Register your paying guest accommodation and reach 50,000+ active users.',
    body: `
      <section>
        <h2>List Your PG Property for Free on GetYourStay</h2>
        <p>GetYourStay allows PG owners to list their properties at zero cost with no time limit and no hidden charges. The registration process takes approximately 5 minutes and requires basic property details, photos, and pricing information. Listed properties gain immediate visibility on a platform with over 50,000 monthly active users actively searching for PG accommodation across Bangalore and other major Indian cities.</p>
      </section>
      <section>
        <h2>PG Owner Registration Process: Step by Step</h2>
        <p>Step one: create an owner account using your name, active phone number, and email address. Step two: add your PG property details including property name, complete address with area and pincode, total capacity, room configurations, and gender preference (male, female, or co-living). Step three: upload 5 to 10 high-resolution photos showing rooms, common areas, bathrooms, kitchen, building exterior, and neighborhood surroundings. Step four: set your monthly and daily rental pricing, specify the security deposit amount, and list all available amenities from a predefined checklist. Step five: choose optional meal plan pricing if food is offered. Step six: review and submit your listing. The GetYourStay team verifies the listing within 24 to 48 hours before it goes live.</p>
      </section>
      <section>
        <h2>PG Owner Dashboard Features and Management Tools</h2>
        <p>The GetYourStay owner dashboard provides real-time control over your PG listing. You can update availability status instantly when rooms are booked or vacated, modify pricing for different seasons or occupancy levels, upload new photos, edit amenity lists, and respond to tenant enquiries. The dashboard displays listing views, enquiry counts, and contact information for interested tenants. Owners receive SMS and email notifications for every new enquiry. Listing analytics show which areas tenants are searching from and what amenities they prioritize.</p>
      </section>
      <section>
        <h2>Free vs Premium PG Listing Plans: Pricing Comparison</h2>
        <p>The free PG listing plan on GetYourStay includes unlimited listing duration, up to 5 property photos, standard amenities checklist, enquiry forwarding from interested tenants, and basic listing visibility in search results. The premium plan at Rs. 499 per month adds priority placement in search results (featured position on the first page), verified owner badge, up to 10 photos, detailed listing analytics, and premium support with faster verification. Both plans include direct tenant-to-owner contact without any commission or brokerage charged by GetYourStay. There are no long-term contracts and owners can upgrade or cancel at any time.</p>
      </section>
      <section>
        <h2>Tips to Maximize Your PG Listing Visibility</h2>
        <p>PG listings with 8 or more high-quality photos receive 3 times more enquiries than listings with 3 or fewer photos according to GetYourStay platform data. Descriptions should include nearby landmarks, distance to the nearest bus stop or metro station, and unique selling points such as power backup duration or WiFi speed. Competitive pricing within 10% of the area average increases enquiry rates. Responding to enquiries within 3 hours improves listing performance in search rankings. Updated availability status reduces irrelevant enquiries. Premium listings with featured badges receive approximately 60% more views than standard free listings in the same area.</p>
      </section>
      <section>
        <h2>Tenant Demographics on GetYourStay</h2>
        <p>GetYourStay\'s active user base consists of approximately 60% working professionals aged 22 to 35, 30% students enrolled in Bangalore colleges and universities, and 10% interns and temporary professionals on short-term assignments. The majority of tenants search for PG accommodation in the Rs. 6,000 to Rs. 12,000 monthly rent bracket. Over 70% of tenant enquiries come from individuals who have been searching for less than one week, indicating high purchase intent. Peak search activity occurs between January and March (new academic year and job season) and June to August (fresher hiring cycle).</p>
      </section>
      <section>
        <h2>Property Types Accepted for Listing</h2>
        <p>GetYourStay accepts listings for independent PG homes (dedicated PG buildings with 5 to 50 rooms), managed PG accommodations (professionally operated properties with standardized amenities), co-living spaces (multi-gender properties with community features), and PG sections within larger residential apartments or villas. Properties must have a minimum of 3 rooms dedicated to PG accommodation. All listed properties must comply with local municipal regulations and fire safety requirements. We currently do not list hotels, serviced apartments, or short-term vacation rentals.</p>
      </section>
      <section>
        <h2>Areas Where You Can List Your PG</h2>
        <p>GetYourStay accepts PG listings from all major Bangalore neighborhoods including ${[...AREAS, ...EXTRA_AREAS].join(', ')}. We also accept listings from other Indian cities including ${CITIES.join(', ')}. If your PG property is located within 3 km of any IT park, tech campus, university, or hospital in these cities, it qualifies for listing. Properties in emerging corridors such as Sarjapur Road, Kanakapura Road, and Tumkur Road are also welcome. List your PG today to connect with verified tenants actively searching for accommodation in your area.</p>
      </section>`,
  },
  '/pg-management-app': {
    title: 'PG Owner App | Free PG Management Software | GetYourStay',
    description: 'Download free PG owner app - best PG management software. Track rent payments, manage tenants, handle maintenance. Just Rs. 499/month with 7-day free trial.',
    body: `
      <section>
        <h2>PG Management Software Overview</h2>
        <p>GetYourStay\'s PG management software provides property owners with a centralized dashboard to manage tenants, track rent payments, handle maintenance requests, and monitor financial performance. The platform is designed specifically for Indian PG accommodations with support for UPI payments, GST invoices, and multilingual communication. The software starts at Rs. 499 per month with a 7-day free trial and no long-term contract requirement.</p>
      </section>
      <section>
        <h2>Rent Collection and Payment Tracking</h2>
        <p>The rent management module automates monthly rent collection by sending SMS and email reminders to tenants 5 days, 3 days, and 1 day before the due date. The dashboard displays a color-coded grid showing paid (green), pending (yellow), and overdue (red) rent status for each tenant. Digital receipts are auto-generated for every payment with owner logo and GST details. The system supports partial payments, late fee calculation at configurable rates (typically Rs. 50 to Rs. 200 per day), and security deposit tracking. Monthly, quarterly, and annual revenue reports can be exported as PDF or Excel files for accounting purposes.</p>
      </section>
      <section>
        <h2>Tenant Management Module</h2>
        <p>The tenant management system stores complete digital profiles including full name, phone number, email, emergency contact, employer or college name, government ID proof (Aadhaar, PAN, or passport), and rental agreement documents. Lease management features track contract start and end dates with automatic renewal reminders sent 30 days before expiry. Room allocation is managed through a visual grid showing which rooms are occupied, available, or under maintenance. Move-in and move-out checklists ensure proper documentation of room condition and inventory. Tenant communication history including maintenance requests, payment queries, and notices is logged against each profile.</p>
      </section>
      <section>
        <h2>Maintenance Request Management</h2>
        <p>Tenants can submit maintenance requests through a simple form with category selection (plumbing, electrical, carpentry, painting, cleaning, appliance repair, or other), priority level, text description, and optional photo upload. Owners receive instant notifications and can assign requests to specific staff members with deadline setting. The request status progresses through submitted, acknowledged, in progress, resolved, and closed stages. Tenants receive status update notifications at each stage. The maintenance history dashboard shows average resolution time, most common request categories, and staff performance metrics. Preventive maintenance scheduling for water purifier servicing, generator maintenance, and pest control is available on the professional plan.</p>
      </section>
      <section>
        <h2>Financial Reporting and Analytics</h2>
        <p>The financial dashboard provides real-time visibility into total monthly rent collection, occupancy rate percentage, pending amount with aging analysis (7, 15, 30 days overdue), and expense tracking for maintenance, staff salaries, utilities, and supplies. Revenue trends are displayed as weekly, monthly, and yearly charts. Occupancy trends help identify seasonal patterns and optimize pricing. The professional plan adds comparative analytics showing your property\'s performance against area averages for rent rates, occupancy levels, and tenant retention duration.</p>
      </section>
      <section>
        <h2>Communication and Notification System</h2>
        <p>The built-in communication module enables broadcast messaging to all tenants or selected groups for notices (maintenance shutdown, visitor policy changes, festival events), emergency alerts (power outage, water shortage, security incidents), and payment reminders. Messages are delivered via SMS and in-app notifications. Individual chat functionality allows private conversations between owners and specific tenants. All communications are logged and searchable. The system supports English, Hindi, and Kannada language messages.</p>
      </section>
      <section>
        <h2>Pricing Plans and Feature Comparison</h2>
        <p>The Basic plan at Rs. 499 per month covers up to 50 tenants with features including rent tracking, tenant management, maintenance requests, basic reports, and SMS notifications. The Professional plan at Rs. 999 per month supports up to 200 tenants with advanced analytics, custom report builder, priority support with 4-hour response time, GST invoice generation, and preventive maintenance scheduling. The Enterprise plan offers custom pricing for PG chains with over 200 tenants, dedicated account manager, API access for custom integrations, multi-property dashboard, and white-label mobile app option. All plans include the first 7 days free with no credit card required for trial activation.</p>
      </section>
      <section>
        <h2>Security and Data Protection</h2>
        <p>All tenant and financial data is encrypted using AES-256 at rest and TLS 1.3 in transit. Data is stored on ISO 27001 certified servers located in India. Automatic daily backups are retained for 90 days. Role-based access control ensures only authorized users can view sensitive information. The platform complies with Indian IT Act 2000 data protection requirements. Two-factor authentication is available for owner accounts. Data export and permanent deletion options are available upon account closure.</p>
      </section>`,
  },
  '/about': {
    title: 'About GetYourStay - PG Accommodation in Bangalore, India',
    description: 'Learn about GetYourStay - India\'s trusted platform for PG accommodation. We connect students and professionals with verified paying guest homes across Bangalore.',
    body: `
      <section>
        <h2>About GetYourStay</h2>
        <p>GetYourStay is a Bangalore-based platform that connects tenants with verified PG accommodation owners across Indian cities. Founded in 2020, the company addresses the fragmented and unorganized PG housing market by providing a verification-based listing platform, transparent pricing with zero hidden charges, and direct tenant-to-owner communication without intermediaries. The platform currently lists over 500 verified PG properties and serves more than 50,000 active monthly users.</p>
      </section>
      <section>
        <h2>Founding Story and Mission</h2>
        <p>GetYourStay was founded after its founders experienced the challenges of finding genuine PG accommodation in Bangalore firsthand — fake listings, inflated prices, and unreliable property owners were common problems. The platform was built to solve three core issues: listing authenticity (every PG is verified before going live), pricing transparency (all costs including deposit, rent, and food charges are displayed upfront), and direct communication (tenants contact owners directly with no intermediaries, no brokerage, and no commission fees). The company\'s mission is to make PG accommodation discovery as reliable and transparent as hotel booking.</p>
      </section>
      <section>
        <h2>Platform Statistics and Reach</h2>
        <p>As of April 2026, GetYourStay lists over 500 verified PG properties across 20 Bangalore neighborhoods and 6 Indian cities. The platform processes over 50,000 monthly active user sessions with an average session duration of 8 minutes. Listings receive an average of 25 enquiries per property per month. The tenant base is 60% working professionals, 30% students, and 10% interns and short-term visitors. The platform has facilitated over 10,000 tenant-owner connections since launch. Female PG listings constitute 35% of total inventory.</p>
      </section>
      <section>
        <h2>PG Verification Process</h2>
        <p>Every PG listing on GetYourStay undergoes a multi-step verification process before going live. The owner\'s identity is verified through phone number OTP and government ID proof. Property existence is confirmed through geolocation mapping and address verification against municipal records. Photos are checked for authenticity and relevance. Pricing and amenity claims are validated against area averages to flag anomalies. Listings with discrepancies are put on hold until corrections are made. Tenant reviews are collected from verified residents only. This verification process typically takes 24 to 48 hours from submission to publication.</p>
      </section>
      <section>
        <h2>Team and Operations</h2>
        <p>GetYourStay operates with a core team of 12 members based in Bangalore, including product development, operations, verification, and customer support functions. The technology platform is built on React for the frontend and serves static builds through CDN for optimal loading speed across India. Customer support is available 7 days a week from 9 AM to 9 PM through phone (+91 97418 21179) and email (support@getyourstay.in). The company does not operate any physical branch offices; all operations are managed remotely.</p>
      </section>
      <section>
        <h2>Partnerships and Community Engagement</h2>
        <p>GetYourStay partners with PG owner associations, student housing societies, and corporate HR departments to streamline accommodation for employees and students. The platform offers bulk listing arrangements for property management companies managing 10 or more PG properties. Educational institutions in Bangalore use GetYourStay to help incoming students find verified accommodation near campus. Corporate clients use the platform for employee relocation and intern accommodation needs. Partnership inquiries can be sent to support@getyourstay.in with "Business Inquiry" in the subject line.</p>
      </section>`,
  },
  '/contact': {
    title: 'Contact GetYourStay - PG Accommodation Support | GetYourStay',
    description: 'Contact GetYourStay for PG accommodation support. Call +91 8660801742 or email support@getyourstay.in. Available 24/7 for PG tenants and owners.',
    body: `
      <section>
        <h2>Contact GetYourStay: Support for Tenants and PG Owners</h2>
        <p>GetYourStay provides customer support through phone and email channels. The support team handles tenant inquiries about PG search and booking, PG owner inquiries about listing management and account issues, technical support for platform access and feature usage, and general inquiries about partnership opportunities. Standard response time is within 4 hours during business hours and within 24 hours for after-hours inquiries.</p>
      </section>
      <section>
        <h2>Phone Support</h2>
        <p>Call +91 97418 21179 for immediate assistance with PG search, listing management, account issues, or general inquiries. Phone support is available 7 days a week from 9 AM to 9 PM IST. The average call wait time is under 2 minutes during peak hours (10 AM to 12 PM and 4 PM to 7 PM). Phone support is provided in English, Hindi, and Kannada. For urgent issues such as listing discrepancies, account access problems, or incorrect property information, phone support provides the fastest resolution.</p>
      </section>
      <section>
        <h2>Email Support</h2>
        <p>Send inquiries to support@getyourstay.in for detailed questions, documentation requests, partnership proposals, feedback and suggestions, or non-urgent account matters. The email support team responds within 24 hours on weekdays and within 48 hours on weekends. Include your registered phone number and a clear subject line (such as "Tenant Inquiry," "Owner Listing Issue," "Partnership Proposal," or "Account Deletion Request") to help route your inquiry to the appropriate team member. Attachments up to 10 MB are accepted.</p>
      </section>
      <section>
        <h2>Common Support Topics and Resolutions</h2>
        <p>Tenants most frequently contact support for help finding PGs in specific areas (35% of inquiries), questions about listing accuracy and verification (25%), booking process guidance (20%), account-related issues (12%), and feedback or suggestions (8%). PG owners most frequently contact support for listing account setup and management (40%), premium plan upgrades and billing (30%), enquiry response guidance (15%), and technical issues with the dashboard (15%). The support team maintains a knowledge base of frequently asked questions to provide consistent and accurate responses.</p>
      </section>
      <section>
        <h2>Report Listing Issues or Inaccurate Information</h2>
        <p>If you encounter a PG listing with inaccurate information including wrong pricing, unavailable amenities, incorrect photos, or outdated availability status, please report it through email at support@getyourstay.in with "Listing Report" in the subject line. Include the PG name, area, and specific inaccuracies. The platform team investigates reported listings within 24 hours and takes corrective action including contacting the owner for updates, placing the listing on hold pending corrections, or removing the listing if inaccuracies are confirmed and unresolved.</p>
      </section>
      <section>
        <h2>Business Hours and Holiday Schedule</h2>
        <p>GetYourStay support operates on a standard schedule with reduced hours on major Indian public holidays. Regular phone support hours are 9 AM to 9 PM IST Monday through Saturday and 10 AM to 6 PM IST on Sundays. Email support is monitored continuously with responses sent during business hours. During major holiday periods (Diwali week, Christmas-New Year week, and Ugadi), phone support hours may be reduced to 10 AM to 6 PM, while email response times may extend to 48 hours. Urgent issues during holidays can be flagged with "URGENT" in the email subject line.</p>
      </section>`,
  },
  '/privacy': {
    title: 'Privacy Policy | GetYourStay - PG Accommodation',
    description: 'Read GetYourStay\'s privacy policy. Learn how we collect, use, and protect your personal information when you use our PG accommodation platform.',
    body: `
      <section>
        <h2>Privacy Policy Overview</h2>
        <p>GetYourStay ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. This privacy policy explains how we collect, process, store, and protect your information when you use our website, mobile application, and related services. This policy is effective as of April 2026 and applies to all users including tenants, PG owners, and website visitors. We adhere to the Information Technology Act, 2000 and the proposed Digital Personal Data Protection Act, 2023 requirements for data handling.</p>
      </section>
      <section>
        <h2>Information We Collect From Tenants and PG Owners</h2>
        <p>When you register as a tenant, we collect your full name, phone number, email address, and password. When you register as a PG owner, we additionally collect your property address, bank account details for premium plan payments, and government-issued ID proof (Aadhaar, PAN, or Voter ID) for verification purposes. We also collect information you voluntarily provide through profile updates, listing forms, and communication with other users. Phone numbers are verified through one-time password (OTP) authentication. Email addresses are verified through confirmation links.</p>
      </section>
      <section>
        <h2>Automatically Collected Information</h2>
        <p>When you access our platform, we automatically collect your IP address, browser type and version, operating system, device type and screen resolution, referring website URL, pages visited and time spent on each page, search queries and filters applied, and click patterns on listing pages. This information is collected through cookies, web beacons, and server logs. We use this data for platform analytics, performance optimization, fraud detection, and personalized content delivery. You can control cookie preferences through your browser settings, though disabling certain cookies may affect platform functionality.</p>
      </section>
      <section>
        <h2>How We Use Your Personal Information</h2>
        <p>We use collected information for platform operation and service delivery including facilitating communication between tenants and PG owners, processing premium plan payments, sending service notifications (listing updates, enquiry alerts, payment confirmations), personalizing search results and recommendations, analyzing usage patterns to improve platform functionality, detecting and preventing fraudulent activity or misuse, complying with legal obligations and regulatory requirements, and sending marketing communications only with your explicit consent. We do not sell, rent, or trade your personal information to third parties for their marketing purposes. We do not use your data for automated decision-making or profiling that significantly affects you.</p>
      </section>
      <section>
        <h2>Data Sharing and Disclosure Practices</h2>
        <p>We share your information with PG owners or tenants only as necessary to facilitate accommodation arrangements — for example, when a tenant expresses interest in a PG, the owner receives the tenant\'s name and phone number. We share data with trusted service providers including cloud hosting providers (AWS India servers), SMS gateway providers for OTP and notification delivery, email service providers for transactional emails, and payment processors for premium plan billing. These service providers are contractually bound to process data only on our instructions and maintain appropriate security measures. We may disclose information if required by law, court order, or government regulation, or to protect our legal rights, property, or safety, or that of our users.</p>
      </section>
      <section>
        <h2>Data Storage, Security, and Retention Period</h2>
        <p>Your data is stored on AWS servers located in Mumbai, India (ap-south-1 region). We implement encryption in transit using TLS 1.3 protocol, encryption at rest using AES-256, regular security audits and vulnerability assessments, access controls limiting data access to authorized personnel only, and automatic daily backups retained for 90 days. We retain your personal data for as long as your account is active or as needed to provide services. After account closure, we retain data for 180 days for legal compliance purposes, after which it is permanently deleted. Anonymized aggregate data may be retained indefinitely for analytical purposes.</p>
      </section>
      <section>
        <h2>Your Data Rights and Choices</h2>
        <p>You have the right to access your personal data held by us, request correction of inaccurate or incomplete data, request deletion of your account and associated data (subject to legal retention requirements), withdraw consent for marketing communications at any time, export your data in a portable format, and lodge a complaint with the relevant data protection authority. To exercise any of these rights, contact us at support@getyourstay.in with "Data Request" in the subject line. We will respond to your request within 30 days. Account deletion is processed within 7 business days of verification. Marketing emails include an unsubscribe link for direct opt-out.</p>
      </section>`,
  },
  '/terms': {
    title: 'Terms & Conditions | GetYourStay - PG Accommodation',
    description: 'Review GetYourStay\'s terms and conditions for using our PG accommodation platform. Understand your rights and responsibilities as a tenant or PG owner.',
    body: `
      <section>
        <h2>Terms and Conditions: Acceptance and Scope</h2>
        <p>By accessing or using GetYourStay\'s website, mobile application, or any related services, you agree to be bound by these Terms and Conditions. If you do not agree with any provision of these terms, you must discontinue use of the platform immediately. These terms constitute a legally binding agreement between you and GetYourStay and govern all aspects of platform usage including browsing, account creation, listing submission, tenant enquiries, and premium plan subscriptions. These terms are supplementary to our Privacy Policy.</p>
      </section>
      <section>
        <h2>Platform Role and Limitations</h2>
        <p>GetYourStay operates as a listing platform and communication facilitator between tenants seeking PG accommodation and owners offering PG properties. The platform does not own, manage, or operate any PG accommodation. GetYourStay is not a party to any rental agreement, lease contract, or financial transaction between tenants and PG owners. The platform does not guarantee the accuracy, completeness, or reliability of any listing information, though reasonable efforts are made to verify listings. GetYourStay does not conduct background checks on tenants or owners. All rental terms including rent amount, deposit, duration, house rules, and refund policies are solely negotiated and agreed between the tenant and the PG owner.</p>
      </section>
      <section>
        <h2>User Account Terms</h2>
        <p>You must be at least 18 years of age to create an account on GetYourStay. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must provide accurate, current, and complete information during registration and update it promptly when changes occur. You agree not to create multiple accounts, impersonate any person or entity, use another user\'s account without authorization, or engage in any activity that disrupts platform operations. GetYourStay reserves the right to suspend or terminate accounts that violate these terms without prior notice and without liability.</p>
      </section>
      <section>
        <h2>PG Listing Terms and Owner Obligations</h2>
        <p>PG owners listing properties on GetYourStay represent and warrant that they have the legal authority to rent the listed property, all information provided including photos, pricing, amenities, and availability is accurate and current, the property complies with all applicable municipal regulations, fire safety requirements, and housing laws, and they will respond to tenant enquiries within 24 hours. Owners agree to maintain accurate availability status, honor the pricing displayed on their listing, and not discriminate against tenants based on religion, caste, region, or any protected characteristic. GetYourStay reserves the right to remove listings found to be inaccurate, misleading, or violating these terms. Repeat violations may result in permanent account suspension.</p>
      </section>
      <section>
        <h2>Payment and Subscription Terms</h2>
        <p>Premium listing plans and PG management software subscriptions are billed monthly in advance. Payments are processed through secure third-party payment gateways. Subscription fees are non-refundable except as expressly stated in the cancellation policy. Premium plan cancellations take effect at the end of the current billing period. The 7-day free trial for PG management software requires no payment information and can be cancelled at any time during the trial period. Late payment on subscriptions may result in service suspension after a 5-day grace period. All prices are in Indian Rupees (INR) and exclude applicable taxes.</p>
      </section>
      <section>
        <h2>Intellectual Property Rights</h2>
        <p>The GetYourStay name, logo, platform design, user interface, underlying code, and all content published on the website excluding user-submitted content are the intellectual property of GetYourStay and are protected by Indian copyright, trademark, and intellectual property laws. You may not reproduce, distribute, modify, create derivative works from, publicly display, or commercially exploit any part of the platform without our prior written consent. Users retain ownership of content they submit (listings, photos, reviews) but grant GetYourStay a non-exclusive, worldwide, royalty-free license to display, distribute, and promote such content on the platform and in marketing materials.</p>
      </section>
      <section>
        <h2>Limitation of Liability and Disclaimer</h2>
        <p>GetYourStay provides the platform on an "as is" and "as available" basis without warranties of any kind, either express or implied. The platform shall not be liable for any direct, indirect, incidental, consequential, special, or punitive damages arising from or related to platform use, including but not limited to disputes between tenants and PG owners, financial losses from rental agreements, inaccuracies in listings, service interruptions, data loss, or unauthorized access to user accounts. Total liability of GetYourStay for any claim shall not exceed the total amount paid by the user to GetYourStay in the 12 months preceding the claim. Some jurisdictions do not allow certain liability limitations, so these limitations may not apply to you.</p>
      </section>
      <section>
        <h2>Dispute Resolution and Governing Law</h2>
        <p>These terms are governed by the laws of India. Any disputes arising from these terms or platform use shall first be attempted to be resolved through informal negotiation within 30 days. If unresolved, disputes shall be referred to binding arbitration in Bangalore, Karnataka, in accordance with the Arbitration and Conciliation Act, 1996. The arbitration shall be conducted by a single arbitrator appointed by mutual agreement. The arbitration proceedings shall be in English. Each party shall bear its own costs. Class action waivers apply — disputes must be brought individually. The courts in Bangalore, Karnataka shall have exclusive jurisdiction for any matters not subject to arbitration.</p>
      </section>
      <section>
        <h2>Changes to Terms and Contact Information</h2>
        <p>GetYourStay reserves the right to modify these terms at any time. Changes become effective immediately upon posting on the website, with material changes notified to registered users via email at least 7 days before the effective date. Continued platform use after changes constitutes acceptance of the modified terms. It is your responsibility to review these terms periodically. The most current version is always available on this page. Questions, complaints, or requests regarding these terms should be directed to support@getyourstay.in or +91 97418 21179. These terms were last updated in April 2026.</p>
      </section>`,
  },
  '/tenant-login': {
    title: 'Tenant Login | GetYourStay - PG Dashboard',
    description: 'Login to your GetYourStay tenant dashboard. View your PG bookings, rent payments, maintenance requests, and communicate with your PG owner.',
    body: `
      <section>
        <h2>Tenant Dashboard: Central Hub for PG Stay Management</h2>
        <p>The GetYourStay tenant dashboard provides registered tenants with a single interface to view booking details, track rent payment history, submit and monitor maintenance requests, communicate with PG owners, and access rental documents. The dashboard is accessible after one-time phone number verification through OTP authentication. No password or complex login credentials are required. The dashboard is available on both desktop web browsers and mobile devices through the responsive platform design.</p>
      </section>
      <section>
        <h2>Dashboard Login Process: Phone Number OTP Authentication</h2>
        <p>To access the tenant dashboard, enter the phone number you provided during PG booking registration on the login page. An automated one-time password (OTP) is sent to your phone number via SMS within 10 seconds. Enter the OTP on the verification screen to complete login. The OTP is valid for 5 minutes. If you do not receive the OTP within 60 seconds, use the resend option — a new OTP is generated and sent. After successful login, your session remains active for 30 days on the same device and browser. You can log out manually from the dashboard settings. There is no password to remember or reset.</p>
      </section>
      <section>
        <h2>Booking Details and PG Information</h2>
        <p>The booking section displays your complete PG accommodation details including PG name and complete address with landmark, room number and room type (single, double, or triple sharing), check-in date and expected lease duration, monthly rent amount and due date, security deposit amount paid and refund status, amenities included in your rent (WiFi, AC, food, housekeeping, power backup), and PG owner or manager contact information including name and phone number. House rules specified by the owner are also displayed for reference. This information is pulled from your verified booking record and cannot be edited by tenants.</p>
      </section>
      <section>
        <h2>Rent Payment History and Due Date Tracking</h2>
        <p>The payments section shows a complete chronological list of all rent payments made with date, amount, payment method (cash, UPI, bank transfer, or other), receipt number, and status (confirmed or pending). Upcoming payments are displayed with due date and countdown indicator. Automatic reminders are sent via SMS and email at 5 days, 3 days, and 1 day before each due date. Security deposit information including deposit amount, payment date, and current status (held with owner, partially refunded, or fully refunded) is displayed. If your PG owner uses GetYourStay\'s management software, digital receipts are automatically available for download as PDF. Otherwise, receipts uploaded by the owner are displayed.</p>
      </section>
      <section>
        <h2>Maintenance Request Submission and Tracking</h2>
        <p>To submit a maintenance request, select the issue category (plumbing, electrical, carpentry, cleaning, appliance, pest control, or other), set priority level (low, medium, high, or emergency), describe the issue in text with relevant details, and optionally upload up to 3 photos to help the owner assess the problem. After submission, the request appears in your dashboard with a unique tracking number and current status. Status progresses through submitted (yellow), acknowledged by owner (blue), in progress with staff assignment (purple), resolved/completed (green), or closed with owner notes (gray). You receive SMS notifications at each status change. Average resolution time for standard maintenance requests across GetYourStay-listed PGs is 24 to 48 hours for non-emergency issues.</p>
      </section>
      <section>
        <h2>Owner Communication and Message History</h2>
        <p>The communication section provides a direct messaging interface with your PG owner or property manager. You can send inquiries about rent, maintenance, lease renewal, move-out notice, or general concerns. All messages are logged with timestamps and read receipts. The message history provides a complete record of all communications, which can be useful for reference in case of disputes. Owners typically respond within 4 hours during business hours. Emergency contact information is displayed separately for urgent situations requiring immediate phone calls.</p>
      </section>
      <section>
        <h2>Account Management and Settings</h2>
        <p>The settings section allows you to update your profile information including alternate phone number, email address, and emergency contact details. You can also set notification preferences for SMS and email reminders. The account activity log shows all login sessions with device, browser, location, and timestamp information for security monitoring. The logout option terminates your current session. The account deletion option sends a request to GetYourStay support for processing within 7 business days. Tenants who have not been registered by their PG owner can request account creation by contacting their owner or GetYourStay support at support@getyourstay.in.</p>
      </section>
      <section>
        <h2>Upcoming Features and Platform Roadmap</h2>
        <p>The tenant dashboard is under active development with several features planned for release. Direct rent payment through the dashboard using UPI (Google Pay, PhonePe, Paytm), credit card, debit card, and net banking will eliminate manual payment tracking. PG rating and review submission will allow tenants to rate their accommodation on location, amenities, cleanliness, food quality, and owner responsiveness. Rental agreement download will provide digital access to signed agreements. Community features including tenant group chat for the same building will enable better community building. Personalized PG recommendations based on your current stay preferences will simplify future moves. These features are expected to roll out progressively through 2026.</p>
      </section>`,
  },
};

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

function slugify(text) {
  return String(text || '')
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function generatePGSlug(pg) {
  return `${slugify(pg.name)}-${slugify(pg.area)}`;
}

function generatePGDetailPages(pgData) {
  const pages = {};
  pgData.forEach(pg => {
    const slug = generatePGSlug(pg);
    const route = `/pg/${pg.id}/${slug}`;
    const canonical = `https://www.getyourstay.in${route}`;
    const title = `${pg.name} in ${pg.area} Bangalore | Rent ₹${pg.price.toLocaleString()}/month | GetYourStay`;
    const description = `Book ${pg.name} in ${pg.area}, Bangalore. ${pg.gender} PG with ${pg.amenities.slice(0, 6).join(', ')}. Starting ₹${pg.price.toLocaleString()}/month. Verified listing with photos, pricing and owner contact on GetYourStay.`;
    const keywords = `${pg.name} ${pg.area}, PG in ${pg.area} Bangalore, ${pg.gender} PG ${pg.area}, paying guest ${pg.area}, PG near ${pg.area}, ${pg.amenities.slice(0, 4).join(' ')}`;

    const amenityItems = pg.amenities.map(a => `<li>${a}</li>`).join('');

    pages[route] = {
      title,
      description,
      keywords,
      canonical,
      body: `
      <section>
        <h2>${escapeHtml(pg.name)} - PG in ${escapeHtml(pg.area)}, Bangalore</h2>
        <p>${escapeHtml(pg.description)} Located in ${escapeHtml(pg.area)}, Bangalore, this ${pg.gender.toLowerCase()} PG offers comfortable accommodation with modern amenities including ${pg.amenities.slice(0, 8).join(', ')}. Monthly rent starts from ₹${pg.price.toLocaleString()} with transparent pricing and no hidden charges. Contact the owner directly through GetYourStay to schedule a visit and book your room.</p>
      </section>
      <section>
        <h2>Amenities at ${escapeHtml(pg.name)}</h2>
        <ul>${amenityItems}</ul>
        <p>This PG in ${escapeHtml(pg.area)} provides all essential facilities for students and working professionals. High-speed WiFi, furnished rooms, regular housekeeping, and 24/7 security ensure a comfortable and safe stay. The property is well-connected to nearby IT parks, colleges, and public transport.</p>
      </section>
      <section>
        <h2>Why Choose ${escapeHtml(pg.name)} in ${escapeHtml(pg.area)}?</h2>
        <p>${escapeHtml(pg.area)} is one of Bangalore's most popular residential areas for PG accommodation. This property offers a rating of ${pg.rating} based on ${pg.reviews} reviews, making it a trusted choice among tenants. The PG is suitable for ${pg.gender === 'Unisex' ? 'both male and female' : pg.gender.toLowerCase()} tenants looking for quality shared accommodation near offices and educational institutions.</p>
      </section>
      <section>
        <h2>PG Rent and Room Options in ${escapeHtml(pg.area)}</h2>
        <p>PG rent in ${escapeHtml(pg.area)} varies based on room type, occupancy, and amenities. ${escapeHtml(pg.name)} offers competitive pricing starting at ₹${pg.price.toLocaleString()} per month. Single occupancy, double sharing, and triple sharing options may be available. Security deposit typically equals one to two months of rent. Food and laundry services may be included or available at additional charges depending on the package.</p>
      </section>
      <section>
        <h2>How to Book ${escapeHtml(pg.name)} on GetYourStay</h2>
        <p>Booking this PG is simple. View the complete listing with photos, pricing, amenities, and location. Contact the owner directly via phone or WhatsApp to schedule a visit. Visit the property to verify the rooms and facilities. Complete the booking by paying the first month's rent and security deposit. GetYourStay charges zero brokerage to tenants.</p>
      </section>`
    };
  });
  return pages;
}

function buildSeoHtml(pageContent) {
  const { title, body, description } = pageContent;
  const today = new Date().toISOString().split('T')[0];
  return `<div data-seo="true" style="font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:1100px;margin:0 auto;padding:24px 20px;color:#1e293b;line-height:1.65;background:#fff">
  <header style="border-bottom:2px solid #0f2744;padding-bottom:16px;margin-bottom:28px">
    <p style="font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:4px">GetYourStay.in</p>
    <h1 style="font-size:clamp(22px,4vw,30px);color:#0f2744;line-height:1.2;margin:0">${title}</h1>
    <p style="font-size:14px;color:#475569;margin-top:8px">${description}</p>
  </header>
  ${body}
  <footer style="border-top:1px solid #e2e8f0;margin-top:40px;padding-top:20px">
    <div style="display:flex;flex-wrap:wrap;gap:16px;margin-bottom:16px">
      <a href="/" style="color:#2563eb;text-decoration:none;font-weight:500">Home</a>
      <a href="/list-your-pg" style="color:#2563eb;text-decoration:none;font-weight:500">List Your PG</a>
      <a href="/pg-management-app" style="color:#2563eb;text-decoration:none;font-weight:500">PG Owner App</a>
      <a href="/about" style="color:#2563eb;text-decoration:none;font-weight:500">About Us</a>
      <a href="/contact" style="color:#2563eb;text-decoration:none;font-weight:500">Contact</a>
    </div>
    <p style="font-size:13px;color:#94a3b8;margin:0">© 2026 GetYourStay. All rights reserved. Last updated: ${today}</p>
  </footer>
</div>`;
}

async function prerender() {
  const buildDir = path.resolve(__dirname, 'build');
  const indexPath = path.join(buildDir, 'index.html');

  if (!fs.existsSync(indexPath)) {
    console.log('Build directory not found. Skipping prerender.');
    return;
  }

  let baseHtml = fs.readFileSync(indexPath, 'utf-8');

  // Load PG data to generate individual PG detail pages
  let pgDetailPages = {};
  try {
    const pgDataModule = await import('./src/data/pgData.js');
    const pgData = pgDataModule.default || [];
    pgDetailPages = generatePGDetailPages(pgData);
    console.log(`  Loaded ${pgData.length} PG listings for prerendering.`);
  } catch (err) {
    console.log('  Could not load PG data for detail prerendering:', err.message);
  }

  const allPages = { ...PAGES, ...pgDetailPages };

  const noscriptTagRegex = /<noscript>[\s\S]*?<\/noscript>/;
  const titleRegex = /<title>[^<]*<\/title>/;
  const descRegex = /<meta name="description"[^>]*\/?>/;
  const metaRegex = /<meta property="og:title"[^>]*\/?>/;
  const ogDescRegex = /<meta property="og:description"[^>]*\/?>/;
  const ogUrlRegex = /<meta property="og:url"[^>]*\/?>/;
  const canonicalRegex = /<link rel="canonical"[^>]*\/?>/;
  const rootDivRegex = /<div\s+id="root"\s*><\/div>/;
  const keywordsRegex = /<meta name="keywords"[^>]*\/?>/;

  for (const [route, content] of Object.entries(allPages)) {
    let html = baseHtml;

    html = html.replace(titleRegex, `<title>${content.title}</title>`);
    html = html.replace(descRegex, `<meta name="description" content="${content.description}" />`);
    if (content.keywords) {
      html = html.replace(keywordsRegex, `<meta name="keywords" content="${content.keywords}" />`);
    }
    html = html.replace(metaRegex, `<meta property="og:title" content="${content.title}" />`);
    html = html.replace(ogDescRegex, `<meta property="og:description" content="${content.description}" />`);
    html = html.replace(ogUrlRegex, `<meta property="og:url" content="${content.canonical || `https://www.getyourstay.in${route}`}" />`);
    html = html.replace(canonicalRegex, `<link rel="canonical" href="${content.canonical || `https://www.getyourstay.in${route}`}" />`);

    html = html.replace(noscriptTagRegex, '');
    html = html.replace(rootDivRegex, () => {
      const seoHtml = buildSeoHtml(content);
      return `<div id="root">${seoHtml}</div>`;
    });

    const outputName = route === '/' ? 'index' : route.slice(1);
    const outputDir = outputName === 'index' ? buildDir : path.join(buildDir, outputName);
    fs.mkdirSync(outputDir, { recursive: true });
    fs.writeFileSync(path.join(outputDir, 'index.html'), html);
    console.log(`  Prerendered: /${outputName} (${(html.length / 1024).toFixed(1)} KB)`);
  }

  console.log(`Prerendering complete. Total pages: ${Object.keys(allPages).length}`);
}

prerender();
