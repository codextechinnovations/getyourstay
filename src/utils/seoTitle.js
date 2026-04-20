// utils/seoTitle.js

export const generateTitle = ({
  type,
  area,
  name,
  price,
  city = "Bangalore"
}) => {
  switch (type) {

    case "home":
      return `PG in ${city} | Verified PG Rooms | GetYourStay`;

    case "area":
      return `PG in ${area} ${city} | Rooms for Rent | GetYourStay`;

    case "pg":
      return `${name} in ${area} | Rent ₹${price} | GetYourStay`;

    case "search":
      return `PG near me in ${city} | Affordable PG | GetYourStay`;

    default:
      return `Find PG in ${city} | GetYourStay`;
  }
};