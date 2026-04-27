import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { theme } from '../theme';

const chatbotResponses = {
  greeting: [
    "Hello! I'm GetYourStay Assistant. How can I help you find a PG today?",
    "Hi! Looking for PG accommodation? I can help you find the perfect stay!",
    "Welcome! Tell me what kind of PG you're looking for."
  ],
  search: [
    "I can help you find PGs in Bangalore. Just tell me your preferred area (like Koramangala, HSR Layout, Whitefield), budget, and gender preference (Male, Female, or Co-living).",
    "To search for PGs, I need to know: 1) Your preferred area in Bangalore 2) Your budget range 3) Gender preference. What are you looking for?",
    "We have PGs across all major Bangalore areas. Which location works best for you - near your office or college?"
  ],
  areas: [
    "Popular PG areas in Bangalore:\n\n• Koramangala - ₹8,000-15,000\n• HSR Layout - ₹6,000-12,000\n• Whitefield - ₹5,000-10,000\n• Electronic City - ₹4,000-8,000\n\nWhich area are you interested in?",
    "Best areas for IT professionals: Electronic City, HSR Layout, Koramangala. For students: BTM Layout, Marathahalli. Which one works for you?"
  ],
  pricing: [
    "PG prices in Bangalore:\n\n• Triple sharing: ₹4,000-6,000\n• Double sharing: ₹6,000-10,000\n• Single room: ₹8,000-15,000\n• Premium (AC + food): ₹12,000-25,000\n\nWhat's your budget?",
    "Budget PGs start from ₹4,000. Premium with AC and meals go up to ₹25,000. Most popular is double sharing at ₹6,000-10,000."
  ],
  amenities: [
    "Common PG amenities:\n✓ WiFi\n✓ AC (optional)\n✓ Food (meals included)\n✓ Laundry\n✓ Power backup\n✓ CCTV security\n✓ Parking\n\nWhich amenities are must-have for you?",
    "All our PGs include WiFi and housekeeping. Many offer AC, food, and洗衣. Let me know your priorities!"
  ],
  male: [
    "We have many Male PGs in Bangalore. Areas like Electronic City, HSR Layout, Whitefield are popular.\n\nWant me to show you available options?",
    "Male PGs available! Would you like to filter by area and budget?"
  ],
  female: [
    "We have safe Ladies PGs in Koramangala, HSR Layout, BTM Layout with 24/7 security.\n\nShall I show you options in your preferred area?",
    "Girls-only PGs available with female wardens and extra security. Which area do you prefer?"
  ],
  colive: [
    "Co-living PGs offer mixed dormitory-style accommodation. Popular in HSR Layout and Bellandur.\n\nInterested?"
  ],
  booking: [
    "To book a PG:\n1. Browse and filter PGs\n2. Contact owner via phone/WhatsApp\n3. Schedule a visit\n4. Pay first month rent + security deposit\n\nNeed help with any step?",
    "Booking is easy! Search → Contact Owner → Visit → Pay & Move In. Want me to help you find options?"
  ],
  document: [
    "Documents needed:\n• ID proof (Aadhaar/PAN)\n• Address proof\n• Passport photos (2-4)\n• College/Company ID\n\nAnything else you need?"
  ],
  contact: [
    "You can contact PG owners directly through our listings - click 'Contact Owner' on any PG card.\n\nOr email us at support@getyourstay.in",
    "Want to talk to an owner? Just click the WhatsApp or phone button on any PG listing!"
  ],
  owner: [
    "To list your PG:\n1. Go to /list-your-pg\n2. Fill property details\n3. Upload photos\n4. Submit for review\n\nOr email: listings@getyourstay.in"
  ],
  tenant: [
    "For tenant login/register, visit /tenant-login\n\nTenants can:\n• Track applications\n• Make payments\n• Raise maintenance requests",
    "Tenant portal at /tenant-login lets you manage your-PG bookings and payments."
  ],
  about: [
    "GetYourStay helps you find verified PGs in Bangalore. We list 500+ PGs across all major areas with real photos and genuine reviews.",
    "We're Bangalore's trusted PG finder platform. Our listings are verified and include transparent pricing."
  ],
  default: [
    "I'm here to help! Ask me about:\n• Finding a PG\n• Pricing & areas\n• Booking process\n• Amenities\n• Document requirements",
    "That's a great question! I can help with PG search, pricing, booking, or general queries. What would you like to know?"
  ]
};

const keywords = {
  greeting: ['hi', 'hello', 'hey', 'hiya', 'start', 'help'],
  search: ['find', 'search', 'looking', 'pg', 'accommodation', 'stay', 'rent', 'available'],
  areas: ['area', 'location', 'koramangala', 'hsr', 'whitefield', 'electronic', 'btm', 'marathahalli', 'indiranagar', 'jayanagar'],
  pricing: ['price', 'cost', 'rent', 'budget', 'cheap', 'affordable', 'expensive', 'fee', 'monthly'],
  amenities: ['wifi', 'food', 'ac', 'ac/', 'laundry', 'parking', 'power', 'security', 'amenities', 'facilities'],
  male: ['male', 'men', 'boys', 'guy'],
  female: ['female', 'women', 'girls', 'ladies', 'girl'],
  colive: ['co-live', 'colive', 'co living', 'sharing', 'mixed'],
  booking: ['book', 'booking', 'reserve', 'move', 'movein', 'pay', 'deposit'],
  document: ['document', 'id', 'proof', 'aadhaar', 'pan', 'required'],
  contact: ['contact', 'phone', 'whatsapp', 'email', 'call', 'reach'],
  owner: ['owner', 'list', 'property', 'landlord', 'add pg', 'create'],
  tenant: ['tenant', 'login', 'register', 'account', 'dashboard'],
  about: ['about', 'who', 'what', 'getyourstay', 'company']
};

const getResponse = (message) => {
  const lower = message.toLowerCase();
  
  for (const [key, words] of Object.entries(keywords)) {
    if (words.some(w => lower.includes(w))) {
      const responses = chatbotResponses[key];
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }
  
  return chatbotResponses.default[Math.floor(Math.random() * chatbotResponses.default.length)];
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: chatbotResponses.greeting[0] }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMsg = { type: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    
    setTimeout(() => {
      const botMsg = { type: 'bot', text: getResponse(input) };
      setMessages(prev => [...prev, botMsg]);
    }, 500);
    
    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  const quickReplies = [
    { label: 'Find PG', text: 'I want to find a PG' },
    { label: 'Pricing', text: 'What is the price range?' },
    { label: 'Areas', text: 'Show me popular areas' },
    { label: 'Book Now', text: 'How to book?' }
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: theme.gradients.primary,
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          transition: 'transform 0.3s ease'
        }}
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        ) : (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
          </svg>
        )}
      </button>

      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '90px',
          right: '20px',
          width: '380px',
          height: '520px',
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 8px 40px rgba(0,0,0,0.15)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          zIndex: 1000,
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
          {/* Header */}
          <div style={{
            padding: '16px 20px',
            background: theme.gradients.primary,
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
              </svg>
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>GetYourStay Assistant</h3>
              <p style={{ margin: 0, fontSize: '12px', opacity: 0.9 }}>Ask me about PG accommodations</p>
            </div>
          </div>

          {/* Quick Replies */}
          <div style={{
            padding: '12px 16px',
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            borderBottom: '1px solid #e2e8f0'
          }}>
            {quickReplies.map((reply, i) => (
              <button
                key={i}
                onClick={() => {
                  setInput(reply.text);
                }}
                style={{
                  padding: '6px 12px',
                  borderRadius: '20px',
                  border: `1px solid ${theme.primary[500]}`,
                  background: 'transparent',
                  color: theme.primary[500],
                  fontSize: '12px',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                {reply.label}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div style={{
            flex: 1,
            overflow: 'auto',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  maxWidth: '85%',
                  alignSelf: msg.type === 'user' ? 'flex-end' : 'flex-start',
                  background: msg.type === 'user' 
                    ? theme.primary[700] 
                    : '#f1f5f9',
                  color: msg.type === 'user' ? 'white' : '#1e293b',
                  padding: '12px 16px',
                  borderRadius: msg.type === 'user' 
                    ? '16px 16px 4px 16px' 
                    : '4px 16px 16px 16px',
                  fontSize: '14px',
                  lineHeight: '1.5',
                  whiteSpace: 'pre-wrap'
                }}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{
            padding: '16px',
            borderTop: '1px solid #e2e8f0',
            display: 'flex',
            gap: '10px'
          }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              style={{
                flex: 1,
                padding: '12px 16px',
                borderRadius: '24px',
                border: `1px solid ${theme.neutral[300]}`,
                fontSize: '14px',
                outline: 'none',
                fontFamily: 'inherit'
              }}
            />
            <button
              onClick={handleSend}
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: theme.primary[700],
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
              </svg>
            </button>
          </div>

          {/* Links */}
          <div style={{
            padding: '12px 16px',
            background: '#f8fafc',
            display: 'flex',
            justifyContent: 'center',
            gap: '16px',
            fontSize: '12px'
          }}>
            <Link 
              to="/list-your-pg" 
              style={{ color: theme.primary[500], textDecoration: 'none' }}
            >
              List Your PG
            </Link>
            <Link 
              to="/contact" 
              style={{ color: theme.primary[500], textDecoration: 'none' }}
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;