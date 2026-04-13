// Nearby PG data - simulates PGs near user's location
export const nearbyPGData = [
  {
    id: 'nearby-1',
    name: "City Center PG",
    area: "Koramangala",
    address: "5th Block, Koramangala",
    price: 8500,
    rating: 4.6,
    reviews: 89,
    distance: "0.3 km",
    walkTime: "4 min walk",
    amenities: ["WiFi", "AC", "Food", "Laundry"],
    gender: "Unisex",
    isVerified: true,
    isAvailable: true,
    availableBeds: 3,
    images: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400"
    ],
    lat: 12.9352,
    lng: 77.6245
  },
  {
    id: 'nearby-2',
    name: "Tech Park Residency",
    area: "Koramangala",
    address: "7th Block, Koramangala",
    price: 9500,
    rating: 4.8,
    reviews: 156,
    distance: "0.5 km",
    walkTime: "6 min walk",
    amenities: ["WiFi", "AC", "Food", "Gym", "Security"],
    gender: "Male",
    isVerified: true,
    isAvailable: true,
    availableBeds: 5,
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400",
      "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=400"
    ],
    lat: 12.9380,
    lng: 77.6280
  },
  {
    id: 'nearby-3',
    name: "Green View PG",
    area: "Koramangala",
    address: "3rd Block, Koramangala",
    price: 7500,
    rating: 4.4,
    reviews: 67,
    distance: "0.8 km",
    walkTime: "10 min walk",
    amenities: ["WiFi", "Food", "Laundry", "Power Backup"],
    gender: "Female",
    isVerified: true,
    isAvailable: true,
    availableBeds: 2,
    images: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400",
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=400"
    ],
    lat: 12.9320,
    lng: 77.6210
  },
  {
    id: 'nearby-4',
    name: "Comfort Stay PG",
    area: "Koramangala",
    address: "1st Block, Koramangala",
    price: 8000,
    rating: 4.5,
    reviews: 98,
    distance: "1.2 km",
    walkTime: "15 min walk",
    amenities: ["WiFi", "AC", "Food", "Parking"],
    gender: "Unisex",
    isVerified: false,
    isAvailable: true,
    availableBeds: 4,
    images: [
      "https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=400",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=400"
    ],
    lat: 12.9300,
    lng: 77.6180
  },
  {
    id: 'nearby-5',
    name: "Executive Living",
    area: "Koramangala",
    address: "6th Block, Koramangala",
    price: 12000,
    rating: 4.9,
    reviews: 234,
    distance: "0.6 km",
    walkTime: "8 min walk",
    amenities: ["WiFi", "AC", "Food", "Gym", "Pool", "Housekeeping"],
    gender: "Unisex",
    isVerified: true,
    isAvailable: true,
    availableBeds: 1,
    images: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400"
    ],
    lat: 12.9365,
    lng: 77.6255
  }
];

// Transform nearby PG data to match PG card format
export const transformNearbyPG = (pg) => ({
  ...pg,
  id: pg.id,
  type: 'nearby',
  distanceInfo: {
    distance: pg.distance,
    walkTime: pg.walkTime
  },
  availability: {
    isAvailable: pg.isAvailable,
    bedsLeft: pg.availableBeds
  }
});

export default nearbyPGData;
