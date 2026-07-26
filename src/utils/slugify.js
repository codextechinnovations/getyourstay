// Utility for creating SEO-friendly URL slugs for PG listings

/**
 * Convert a string into a URL-friendly slug.
 * - Lowercase
 * - Removes non-alphanumeric characters (except spaces, hyphens, underscores)
 * - Collapses spaces/hyphens/underscores into a single hyphen
 * - Trims leading/trailing hyphens
 */
export const slugify = (text) => {
  if (!text) return '';
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

/**
 * Generate the SEO-friendly slug portion for a PG (name + area, without ID).
 * Format: {pg-name}-{area}
 */
export const generatePGSlug = (pg) => {
  if (!pg) return '';
  const nameSlug = slugify(pg.name);
  const areaSlug = slugify(pg.area);
  return `${nameSlug}-${areaSlug}`;
};

/**
 * Generate the full URL path for a PG detail page.
 * Format: /pg/{id}/{pg-name}-{area}
 */
export const getPGDetailUrl = (pg) => {
  const id = pg?.id || pg?._id || '';
  const slug = generatePGSlug(pg);
  return `/pg/${id}/${slug}`;
};

/**
 * Return the full canonical URL for a PG detail page.
 */
export const getPGCanonicalUrl = (pg) => {
  const id = pg?.id || pg?._id || '';
  const slug = generatePGSlug(pg);
  return `https://www.getyourstay.in/pg/${id}/${slug}`;
};
