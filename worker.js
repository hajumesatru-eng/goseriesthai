export default {
  async fetch(request) {

    const url = new URL(request.url);

    if (url.pathname === "/sitemap.xml") {

      // Ambil data dari website kamu
      const data = await fetch("https://goseriesthai.pages.dev/data.json")
        .then(res => res.json());

      let xml = `<?xml version="1.0" encoding="UTF-8"?>`;
      xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

      // Homepage
      xml += `
      <url>
        <loc>https://goseriesthai.pages.dev/</loc>
        <priority>1.0</priority>
      </url>`;

      // Loop semua data
      data.forEach(item => {
        xml += `
        <url>
          <loc>${item.url}</loc>
          <lastmod>${item.date}</lastmod>
          <changefreq>daily</changefreq>
          <priority>0.9</priority>
        </url>`;
      });

      xml += `</urlset>`;

      return new Response(xml, {
        headers: {
          "content-type": "application/xml",
          "Cache-Control": "no-store"
        }
      });
    }

    return fetch(request);
  }
};
