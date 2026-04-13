import React, { useEffect, useState } from 'react';
import { bangaloreAreas } from '../data/pgData';

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
    <div style={{
      padding: '40px 20px',
      maxWidth: '900px',
      margin: '0 auto',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '30px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
      }}>
        <h1 style={{ 
          color: '#0a1929', 
          marginBottom: '10px',
          fontSize: '28px'
        }}>
          XML Sitemap
        </h1>
        <p style={{ color: '#64748b', marginBottom: '20px' }}>
          This XML sitemap helps search engines crawl your site efficiently.
        </p>
        
        <div style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '30px',
          flexWrap: 'wrap'
        }}>
          <a 
            href="/sitemap.xml"
            style={{
              padding: '10px 20px',
              background: 'linear-gradient(135deg, #1a1a4e, #2d2d7e)',
              color: 'white',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '600'
            }}
          >
            View XML Sitemap
          </a>
          <a 
            href="/sitemap?download=true"
            style={{
              padding: '10px 20px',
              background: '#f97316',
              color: 'white',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '600'
            }}
          >
            Download Sitemap
          </a>
        </div>

        <h2 style={{ 
          color: '#0a1929', 
          marginBottom: '15px',
          fontSize: '20px',
          borderBottom: '2px solid #e2e8f0',
          paddingBottom: '10px'
        }}>
          Sitemap Preview
        </h2>
        
        <div style={{
          background: '#1e293b',
          borderRadius: '12px',
          padding: '20px',
          overflow: 'auto',
          maxHeight: '500px'
        }}>
          <pre style={{ 
            color: '#e2e8f0', 
            fontSize: '12px',
            lineHeight: '1.6',
            margin: 0,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-all'
          }}>
            {sitemap}
          </pre>
        </div>

        <div style={{
          marginTop: '30px',
          padding: '20px',
          background: '#f8fafc',
          borderRadius: '12px',
          border: '1px solid #e2e8f0'
        }}>
          <h3 style={{ 
            color: '#0a1929', 
            marginBottom: '15px',
            fontSize: '16px'
          }}>
            Sitemap Statistics
          </h3>
          <ul style={{ 
            color: '#64748b', 
            margin: 0, 
            paddingLeft: '20px',
            lineHeight: '2'
          }}>
            <li>Main pages: 9</li>
            <li>Location pages: {bangaloreAreas.length}</li>
            <li>Gender filters: 3</li>
            <li>City pages: 6</li>
            <li><strong>Total URLs: {12 + bangaloreAreas.length + 3 + 6}</strong></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sitemap;
