import { useEffect } from 'react';

const SEO_CONFIG = {
  '/': {
    title: 'GetYourStay - #1 Platform for PG Accommodation in Bangalore | Paying Guest Hostels Near Me',
    description: 'Find verified paying guest accommodation in Bangalore, Hyderabad, Chennai, Pune. Browse Male PG, Female PG, Co-living with WiFi, AC, food. 10,000+ happy tenants. Book online or call +91 98765 43210.',
    keywords: 'PG in Bangalore, Paying Guest Bangalore, PG near me, Hostel Bangalore, Male PG, Female PG, Co-living Bangalore, PG with food, PG with WiFi, PG accommodation, best PG Bangalore, cheap PG Bangalore',
    canonical: 'https://www.getyourstay.in/',
    ogTitle: 'GetYourStay - Find Verified PG Accommodation in Bangalore | Paying Guest Hostels',
    ogDescription: "India's #1 platform for PG booking. Verified paying guest accommodations in Bangalore, Hyderabad, Chennai. Male PG, Female PG, Co-living with WiFi, AC, food. 10,000+ happy tenants. Book online now!",
  },
  '/about': {
    title: 'About GetYourStay - India\'s Most Trusted PG Platform | Our Mission',
    description: 'Learn about GetYourStay, India\'s leading platform for PG accommodation. Our mission is to help students and working professionals find verified, affordable paying guest accommodation. 10,000+ happy tenants served.',
    keywords: 'about GetYourStay, PG platform India, paying guest company, PG booking service, PG accommodation service, student housing India',
    canonical: 'https://www.getyourstay.in/about',
    ogTitle: 'About GetYourStay - India\'s Most Trusted PG Platform',
    ogDescription: 'Learn about our mission to revolutionize PG accommodation in India. 10,000+ happy tenants and 500+ verified PGs.',
  },
  '/contact': {
    title: 'Contact GetYourStay - PG Accommodation Support | 24/7 Help',
    description: 'Contact GetYourStay for PG accommodation help. Our support team is available 24/7 to assist with PG search, booking, and owner inquiries. Call +91 98765 43210 or email support@getyourstay.in.',
    keywords: 'contact GetYourStay, PG support, PG help, PG accommodation help, tenant support, PG owner support',
    canonical: 'https://www.getyourstay.in/contact',
    ogTitle: 'Contact GetYourStay - PG Accommodation Support',
    ogDescription: 'Get in touch with our 24/7 support team for PG search help, booking assistance, or to list your PG.',
  },
  '/list-your-pg': {
    title: 'List Your PG for Free | PG Owner Registration | GetYourStay India',
    description: 'List your PG on GetYourStay - India\'s #1 free PG listing platform. Register your paying guest accommodation and reach 50,000+ active users. 100% free listing. Quick approval. Also get free PG owner app.',
    keywords: 'list pg free, pg owner registration, free pg listing India, paying guest registration, list your pg, pg advertisement, PG owner app, PG management app free',
    canonical: 'https://www.getyourstay.in/list-your-pg',
    ogTitle: 'List Your PG for Free - GetYourStay India',
    ogDescription: 'List your PG absolutely free on India\'s #1 PG platform. Reach 50,000+ active users. 100% free listing with free PG management app included.',
  },
  '/pg-management-app': {
    title: 'PG Owner App | Free PG Management Software for Android | GetYourStay',
    description: 'Download free PG owner app - best PG management software for Android. Track rent payments, manage tenants, handle maintenance requests. Just Rs. 499/month with 7-day free trial. Perfect for paying guest accommodation management in India.',
    keywords: 'PG owner app, PG management app, PG management software, paying guest app, tenant management app, rent collection app, PG app Android, PG owner software',
    canonical: 'https://www.getyourstay.in/pg-management-app',
    ogTitle: 'Free PG Owner App - Best PG Management Software | GetYourStay',
    ogDescription: 'Download the best free PG management app for PG owners in India. Track rent, manage tenants, handle maintenance. Rs. 499/month with 7-day free trial.',
  },
  '/terms': {
    title: 'Terms and Conditions | GetYourStay India - PG Accommodation Terms',
    description: 'Read GetYourStay\'s terms and conditions for using our PG booking platform. Guidelines for tenants and PG owners, booking policies, payment terms, and service agreements.',
    keywords: 'GetYourStay terms, PG booking terms, tenant agreement, PG owner terms, platform terms India',
    canonical: 'https://www.getyourstay.in/terms',
    ogTitle: 'Terms and Conditions | GetYourStay India',
    ogDescription: 'Read our terms and conditions for using the GetYourStay PG booking platform.',
  },
  '/privacy': {
    title: 'Privacy Policy | GetYourStay India - Your Data Protection',
    description: 'Read GetYourStay\'s privacy policy. Learn how we protect your personal information when you search for PG accommodation, book rooms, or use our tenant dashboard.',
    keywords: 'GetYourStay privacy, data protection, personal information, PG booking privacy, tenant data protection',
    canonical: 'https://www.getyourstay.in/privacy',
    ogTitle: 'Privacy Policy | GetYourStay India',
    ogDescription: 'Learn how we protect your privacy and personal information on GetYourStay.',
  },
  '/hotels': {
    title: 'Hotels Booking Coming Soon | GetYourStay',
    description: 'Exciting news! Hotel booking feature is coming soon to GetYourStay. Stay tuned for budget hotels, luxury stays, and premium accommodations across India.',
    keywords: 'hotels booking, hotel reservation, cheap hotels, luxury hotels India, budget hotels',
    canonical: 'https://www.getyourstay.in/hotels',
    ogTitle: 'Hotels Booking Coming Soon | GetYourStay',
    ogDescription: 'Hotel booking feature coming soon to GetYourStay. Stay tuned for great hotel deals!',
  },
  '/flats': {
    title: 'Flat Rental Coming Soon | GetYourStay',
    description: 'Flat and apartment rentals coming soon to GetYourStay. Find verified rental apartments, furnished flats, and independent houses near you.',
    keywords: 'flat rental, apartment rent, furnished flat, independent house, rental apartments India',
    canonical: 'https://www.getyourstay.in/flats',
    ogTitle: 'Flat Rental Coming Soon | GetYourStay',
    ogDescription: 'Flat and apartment rental feature coming soon to GetYourStay. Find verified rental apartments!',
  },
  '/tenant-login': {
    title: 'Tenant Login | GetYourStay - Access Your Dashboard',
    description: 'Login to your GetYourStay tenant dashboard. Pay rent, raise maintenance requests, view notices, and manage your PG booking.',
    keywords: 'tenant login, tenant dashboard, PG tenant login, pay rent online',
    canonical: 'https://www.getyourstay.in/tenant-login',
    ogTitle: 'Tenant Login | GetYourStay',
    ogDescription: 'Login to access your tenant dashboard and manage your PG booking.',
  },
};

export const useSEO = (customConfig = {}) => {
  const path = typeof window !== 'undefined' ? window.location.pathname : '/';
  const config = SEO_CONFIG[path] || SEO_CONFIG['/'];
  const mergedConfig = { ...config, ...customConfig };

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const updateMetaTag = (name, content, isProperty = false) => {
      const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let element = document.querySelector(selector);
      
      if (!element) {
        element = document.createElement('meta');
        if (isProperty) {
          element.setAttribute('property', name);
        } else {
          element.setAttribute('name', name);
        }
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Update title
    if (mergedConfig.title) {
      document.title = mergedConfig.title;
    }

    // Update meta tags
    if (mergedConfig.description) {
      updateMetaTag('description', mergedConfig.description);
    }
    
    if (mergedConfig.keywords) {
      updateMetaTag('keywords', mergedConfig.keywords);
    }

    // Update Open Graph tags
    if (mergedConfig.ogTitle) {
      updateMetaTag('og:title', mergedConfig.ogTitle, true);
    }
    
    if (mergedConfig.ogDescription) {
      updateMetaTag('og:description', mergedConfig.ogDescription, true);
    }
    
    if (mergedConfig.canonical) {
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', mergedConfig.canonical);
    }

    // Update Open Graph URL
    if (mergedConfig.canonical) {
      updateMetaTag('og:url', mergedConfig.canonical, true);
    }

    // Add structured data for the page
    if (mergedConfig.structuredData) {
      const existingScript = document.querySelector('script[data-page-seo="true"]');
      if (existingScript) {
        existingScript.remove();
      }
      
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-page-seo', 'true');
      script.textContent = JSON.stringify(mergedConfig.structuredData);
      document.head.appendChild(script);
    }

  }, [JSON.stringify(mergedConfig)]);

  return mergedConfig;
};

export const generateFAQSchema = (faqs) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq, index) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
};

export const generateBreadcrumbSchema = (items) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
};

export default useSEO;
