import React, { useEffect, useState } from 'react';
import { bangaloreAreas } from '../data/pgData';
import './Sitemap.css';

const Sitemap = () => {
  const [downloadMode, setDownloadMode] = useState(false);

  const generateSitemap = () => {
    const today = new Date().toISOString().split('T')[0];
    
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  
  <!-- Main Pages -->
  <url>
    <loc>https://www.getyourstay.in/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- Static Pages -->
  <url>
    <loc>https://www.getyourstay.in/about</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <url>
    <loc>https://www.getyourstay.in/contact</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <url>
    <loc>https://www.getyourstay.in/terms</loc>
    <lastmod>${today}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>
  
  <url>
    <loc>https://www.getyourstay.in/privacy</loc>
    <lastmod>${today}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>
  
  <url>
    <loc>https://www.getyourstay.in/sitemap</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.4</priority>
  </url>
  
  <!-- Tenant Pages -->
  <url>
    <loc>https://www.getyourstay.in/tenant-login</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <url>
    <loc>https://www.getyourstay.in/tenant-dashboard</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <!-- PG Owner Pages -->
  <url>
    <loc>https://www.getyourstay.in/list-your-pg</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  
  <url>
    <loc>https://www.getyourstay.in/list-property</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <url>
    <loc>https://www.getyourstay.in/pg-management-app</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  
  <url>
    <loc>https://www.getyourstay.in/pg-owner-app</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <url>
    <loc>https://www.getyourstay.in/pg-management-software</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <url>
    <loc>https://www.getyourstay.in/pg-app</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <!-- Coming Soon Pages -->
  <url>
    <loc>https://www.getyourstay.in/hotels</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.getyourstay.in/flats</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <!-- PG Location Pages (Bangalore Areas) -->
  ${bangaloreAreas.map(area => `
  <url>
    <loc>https://www.getyourstay.in/?area=${encodeURIComponent(area)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`).join('')}
  
  <!-- Gender-based PG Pages -->
  <url>
    <loc>https://www.getyourstay.in/?gender=male</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  
  <url>
    <loc>https://www.getyourstay.in/?gender=female</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  
  <url>
    <loc>https://www.getyourstay.in/?gender=colive</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- Cities Pages -->
  <url>
    <loc>https://www.getyourstay.in/?city=Bangalore</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  
  <url>
    <loc>https://www.getyourstay.in/?city=Hyderabad</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  
  <url>
    <loc>https://www.getyourstay.in/?city=Chennai</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  
  <url>
    <loc>https://www.getyourstay.in/?city=Pune</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  
  <url>
    <loc>https://www.getyourstay.in/?city=Mumbai</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  
  <url>
    <loc>https://www.getyourstay.in/?city=Delhi</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  
</urlset>`;
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('download') === 'true') {
      setDownloadMode(true);
      const sitemap = generateSitemap();
      const blob = new Blob([sitemap], { type: 'application/xml' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = 'sitemap.xml';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(url);
    }
  }, []);

  const sitemap = generateSitemap();

  return (
    <div className="sitemap-page">
      <div className="sitemap-card">
        <h1 className="sitemap-title">
          XML Sitemap
        </h1>
        <p className="sitemap-subtitle">
          This XML sitemap helps search engines crawl your site efficiently.
        </p>
        
        <div className="sitemap-actions">
          <a 
            href="/sitemap.xml"
            className="sitemap-btn sitemap-btn-primary"
          >
            View XML Sitemap
          </a>
          <a 
            href="/sitemap?download=true"
            className="sitemap-btn sitemap-btn-accent"
          >
            Download Sitemap
          </a>
        </div>

        <h2 className="sitemap-section-title">
          Sitemap Preview
        </h2>
        
        <div className="sitemap-code-block">
          <pre>
            {sitemap}
          </pre>
        </div>

        <div className="sitemap-stats-card">
          <h3>
            Sitemap Statistics
          </h3>
          <ul className="sitemap-stats-list">
            <li>Main pages: 16</li>
            <li>Location pages: {bangaloreAreas.length}</li>
            <li>Gender filters: 3</li>
            <li>City pages: 6</li>
            <li><strong>Total URLs: {25 + bangaloreAreas.length + 3 + 6}</strong></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sitemap;
