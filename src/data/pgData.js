const pgData = [
  {
    id: 1,
    name: "Green Valley PG",
    area: "Koramangala",
    address: "123, 4th Block, Koramangala, Bangalore",
    price: 8500,
    rating: 4.5,
    reviews: 128,
    amenities: ["WiFi", "AC", "Food", "Laundry", "Parking", "Gym"],
    images: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400"
    ],
    gender: "Male",
    lat: 12.9352,
    lng: 77.6245,
    description: "Premium PG accommodation with modern amenities in the heart of Koramangala."
  },
  {
    id: 2,
    name: "Sunrise Ladies Hostel",
    area: "Indiranagar",
    address: "45, 12th Main, Indiranagar, Bangalore",
    price: 10000,
    rating: 4.8,
    reviews: 256,
    amenities: ["WiFi", "AC", "Food", "Laundry", "Security", "Power Backup"],
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400",
      "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=400"
    ],
    gender: "Female",
    lat: 12.9784,
    lng: 77.6408,
    description: "Safe and secure ladies PG with 24/7 security and homely food."
  },
  {
    id: 3,
    name: "Metro Living PG",
    area: "HSR Layout",
    address: "Sector 2, HSR Layout, Bangalore",
    price: 7500,
    rating: 4.2,
    reviews: 89,
    amenities: ["WiFi", "Food", "Laundry", "TV Room", "Parking"],
    images: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400",
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=400"
    ],
    gender: "Unisex",
    lat: 12.9116,
    lng: 77.6389,
    description: "Budget-friendly PG near HSR Layout with all essential amenities."
  },
  {
    id: 4,
    name: "Royal Stay PG",
    area: "Whitefield",
    address: "ITPL Road, Whitefield, Bangalore",
    price: 12000,
    rating: 4.7,
    reviews: 342,
    amenities: ["WiFi", "AC", "Food", "Laundry", "Gym", "Pool", "Parking", "Housekeeping"],
    images: [
      "https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=400",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=400"
    ],
    gender: "Male",
    lat: 12.9698,
    lng: 77.7500,
    description: "Luxury PG accommodation near ITPL with premium facilities."
  },
  {
    id: 5,
    name: "Comfort Home PG",
    area: "Marathahalli",
    address: "89, Outer Ring Road, Marathahalli, Bangalore",
    price: 9000,
    rating: 4.4,
    reviews: 167,
    amenities: ["WiFi", "AC", "Food", "Laundry", "Security"],
    images: [
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=400",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400"
    ],
    gender: "Female",
    lat: 12.9591,
    lng: 77.6974,
    description: "Peaceful PG accommodation with homely atmosphere."
  },
  {
    id: 6,
    name: "Tech Park PG",
    area: "Electronic City",
    address: "Phase 1, Electronic City, Bangalore",
    price: 6500,
    rating: 4.0,
    reviews: 78,
    amenities: ["WiFi", "Food", "Laundry", "Parking"],
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400"
    ],
    gender: "Male",
    lat: 12.8399,
    lng: 77.6770,
    description: "Affordable PG near Electronic City for IT professionals."
  },
  {
    id: 7,
    name: "MG Road Executive PG",
    area: "MG Road",
    address: "22, MG Road, Bangalore",
    price: 15000,
    rating: 4.9,
    reviews: 412,
    amenities: ["WiFi", "AC", "Food", "Laundry", "Gym", "Spa", "Parking", "Concierge"],
    images: [
      "https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=400",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=400"
    ],
    gender: "Unisex",
    lat: 12.9719,
    lng: 77.6071,
    description: "Premium executive PG in the heart of Bangalore."
  },
  {
    id: 8,
    name: "Silk Board Stay",
    area: "Silk Board",
    address: "Silk Board Junction, Bangalore",
    price: 7000,
    rating: 3.8,
    reviews: 56,
    amenities: ["WiFi", "Food", "Laundry"],
    images: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400",
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=400"
    ],
    gender: "Male",
    lat: 12.9173,
    lng: 77.6231,
    description: "Budget PG near Silk Board with basic amenities."
  },
  {
    id: 9,
    name: "Jayanagar Haven",
    area: "Jayanagar",
    address: "5th Block, Jayanagar, Bangalore",
    price: 9500,
    rating: 4.6,
    reviews: 203,
    amenities: ["WiFi", "AC", "Food", "Laundry", "TV Room", "Security", "Garden"],
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400"
    ],
    gender: "Female",
    lat: 12.9308,
    lng: 77.5838,
    description: "Serene PG in Jayanagar with beautiful garden view."
  },
  {
    id: 10,
    name: "Bellandur Residence",
    area: "Bellandur",
    address: "Bellandur Lake Road, Bangalore",
    price: 8000,
    rating: 4.3,
    reviews: 134,
    amenities: ["WiFi", "AC", "Food", "Laundry", "Parking", "Gym"],
    images: [
      "https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=400",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400"
    ],
    gender: "Unisex",
    lat: 12.9352,
    lng: 77.7010,
    description: "Modern PG near Bellandur with easy access to tech parks."
  },
  {
    id: 11,
    name: "Hebbal Comfort",
    area: "Hebbal",
    address: "Near Hebbal Lake, Bangalore",
    price: 11000,
    rating: 4.5,
    reviews: 189,
    amenities: ["WiFi", "AC", "Food", "Laundry", "Gym", "Parking", "Security"],
    images: [
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=400",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400"
    ],
    gender: "Male",
    lat: 13.0358,
    lng: 77.5970,
    description: "Premium PG near Hebbal with lake view and modern facilities."
  },
  {
    id: 12,
    name: "Banashankari Stay",
    area: "Banashankari",
    address: "3rd Stage, Banashankari, Bangalore",
    price: 7200,
    rating: 4.1,
    reviews: 98,
    amenities: ["WiFi", "Food", "Laundry", "TV Room"],
    images: [
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=400",
      "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=400"
    ],
    gender: "Female",
    lat: 12.9250,
    lng: 77.5460,
    description: "Cozy PG in Banashankari with homely food."
  },
  {
    id: 13,
    name: "Malleswaram Elite",
    area: "Malleswaram",
    address: "8th Cross, Malleswaram, Bangalore",
    price: 10500,
    rating: 4.7,
    reviews: 276,
    amenities: ["WiFi", "AC", "Food", "Laundry", "Gym", "Parking", "Housekeeping"],
    images: [
      "https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=400",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400"
    ],
    gender: "Unisex",
    lat: 13.0033,
    lng: 77.5647,
    description: "Elite PG in the traditional neighborhood of Malleswaram."
  },
  {
    id: 14,
    name: "JP Nagar Nest",
    area: "JP Nagar",
    address: "7th Phase, JP Nagar, Bangalore",
    price: 8800,
    rating: 4.4,
    reviews: 156,
    amenities: ["WiFi", "AC", "Food", "Laundry", "Security", "Parking"],
    images: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=400"
    ],
    gender: "Male",
    lat: 12.9063,
    lng: 77.5857,
    description: "Comfortable PG in JP Nagar with great connectivity."
  },
  {
    id: 15,
    name: "Rajajinagar Hub",
    area: "Rajajinagar",
    address: "16th Cross, Rajajinagar, Bangalore",
    price: 8200,
    rating: 4.3,
    reviews: 112,
    amenities: ["WiFi", "AC", "Food", "Laundry", "TV Room", "Gym"],
    images: [
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=400",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400"
    ],
    gender: "Female",
    lat: 12.9916,
    lng: 77.5521,
    description: "Well-connected PG in Rajajinagar with all modern amenities."
  },
  {
    id: 16,
    name: "BTM Layout Stay",
    area: "BTM Layout",
    address: "2nd Stage, BTM Layout, Bangalore",
    price: 7800,
    rating: 4.2,
    reviews: 145,
    amenities: ["WiFi", "Food", "Laundry", "Parking", "Security"],
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400",
      "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=400"
    ],
    gender: "Unisex",
    lat: 12.9166,
    lng: 77.6101,
    description: "Budget-friendly PG in BTM Layout with easy access to ORR."
  },
  {
    id: 17,
    name: "Domlur Executive",
    area: "Domlur",
    address: "Domlur 2nd Stage, Bangalore",
    price: 13500,
    rating: 4.8,
    reviews: 298,
    amenities: ["WiFi", "AC", "Food", "Laundry", "Gym", "Pool", "Parking", "Concierge"],
    images: [
      "https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=400",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400"
    ],
    gender: "Male",
    lat: 12.9618,
    lng: 77.6392,
    description: "Executive PG near Domlur with premium amenities."
  },
  {
    id: 18,
    name: "CV Raman Nagar Stay",
    area: "CV Raman Nagar",
    address: "Benson Town, CV Raman Nagar, Bangalore",
    price: 6800,
    rating: 3.9,
    reviews: 67,
    amenities: ["WiFi", "Food", "Laundry"],
    images: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400",
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=400"
    ],
    gender: "Female",
    lat: 13.0062,
    lng: 77.6592,
    description: "Affordable PG in CV Raman Nagar with basic facilities."
  },
  {
    id: 19,
    name: "Basavanagudi Heritage",
    area: "Basavanagudi",
    address: "Bull Temple Road, Basavanagudi, Bangalore",
    price: 9800,
    rating: 4.5,
    reviews: 187,
    amenities: ["WiFi", "AC", "Food", "Laundry", "Security", "Garden"],
    images: [
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=400",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400"
    ],
    gender: "Unisex",
    lat: 12.9416,
    lng: 77.5749,
    description: "Heritage PG in the cultural hub of Basavanagudi."
  },
  {
    id: 20,
    name: "Sarjapur Road PG",
    area: "Sarjapur",
    address: "Sarjapur Road, Bangalore",
    price: 7500,
    rating: 4.1,
    reviews: 93,
    amenities: ["WiFi", "Food", "Laundry", "Parking", "Security"],
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400",
      "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=400"
    ],
    gender: "Male",
    lat: 12.9104,
    lng: 77.6866,
    description: "Modern PG on Sarjapur Road near tech parks."
  }
];

export const bangaloreAreas = [
  "Koramangala",
  "Indiranagar",
  "HSR Layout",
  "Whitefield",
  "Marathahalli",
  "Electronic City",
  "MG Road",
  "Silk Board",
  "Jayanagar",
  "Bellandur",
  "Hebbal",
  "Banashankari",
  "Malleswaram",
  "JP Nagar",
  "Rajajinagar",
  "BTM Layout",
  "Domlur",
  "CV Raman Nagar",
  "Basavanagudi",
  "Sarjapur"
];

export default pgData;
