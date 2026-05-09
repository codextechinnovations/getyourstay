import React from 'react';
import '../App.css';

const definitions = {
  'PG Accommodation': {
    id: 'pg-accommodation',
    term: 'PG Accommodation',
    category: 'Housing',
    usageContext: 'Commonly used in India to refer to rented shared housing',
    body: 'PG (Paying Guest) accommodation is a popular form of shared housing in India where tenants pay a monthly fee for a furnished room along with shared amenities like kitchen, dining, and living areas. PGs typically include meals, WiFi, electricity, and housekeeping services. They are especially popular among students and working professionals in major cities like Bangalore, Hyderabad, Pune, and Mumbai. PG accommodations range from basic rooms with common bathrooms to premium en-suite rooms with air conditioning. Rent usually includes food, utilities, and maintenance.'
  },
  'Co-living Spaces': {
    id: 'co-living-spaces',
    term: 'Co-living Spaces',
    category: 'Housing',
    usageContext: 'Modern shared living arrangements with community aspects',
    body: 'Co-living is a modern form of shared housing designed for like-minded individuals. Unlike traditional PGs, co-living spaces emphasize community living with shared common areas, organized social events, and flexible lease terms. These spaces are professionally managed and typically offer fully furnished rooms, high-speed WiFi, regular housekeeping, and amenities like gyms, rooftop terraces, and coworking spaces. Co-living is particularly popular among young professionals and digital nomads who value flexibility, convenience, and community.'
  },
  'Single Occupancy Rooms': {
    id: 'single-occupancy-rooms',
    term: 'Single Occupancy Rooms',
    category: 'Room Type',
    usageContext: 'Refers to private room accommodation in shared housing',
    body: 'Single occupancy rooms are private rooms for one person within a shared PG accommodation. These rooms offer personal space and privacy while still providing access to common amenities like kitchen, dining area, and living room. Single rooms are ideal for professionals and students who prefer solitude but want the cost benefits of shared living. They typically cost more than double or triple sharing rooms but offer better privacy, personal storage space, and a quieter environment for studying or working from home.'
  }
};

const DefinitionBlock = ({ term, compact }) => {
  const def = definitions[term];
  if (!def) return null;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    '@id': `https://getyourstay.in/definitions/${def.id}`,
    name: def.term,
    description: def.body.substring(0, 150) + '...',
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: 'PG Accommodation Glossary',
      description: 'Standard definitions for PG accommodation terms used on GetYourStay.'
    },
    category: def.category,
    usageInfo: def.usageContext
  };

  return (
    <figure
      itemScope
      itemType="https://schema.org/DefinedTerm"
      itemID={`https://getyourstay.in/definitions/${def.id}`}
      className="definition-block"
      style={{ padding: compact ? '16px 20px' : '24px 28px' }}
    >
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      <blockquote cite={`https://getyourstay.in/definitions/${def.id}`}>
        <meta itemProp="name" content={def.term} />
        <meta itemProp="description" content={def.body.substring(0, 150) + '...'} />
        <strong
          itemProp="termCode"
          className="definition-term"
          style={{ fontSize: compact ? '15px' : '17px' }}
        >
          {def.term}
        </strong>
        <span
          itemProp="description"
          className="definition-body"
          style={{ fontSize: compact ? '13px' : '14px' }}
        >
          {def.body}
        </span>
      </blockquote>
    </figure>
  );
};

export { definitions };
export default DefinitionBlock;
