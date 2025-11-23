// next.config.js
module.exports = {
   images: {
        domains: ['images.ctfassets.net'], // Add Contentful's image domain
      },
  async redirects() {
    return [
      {
        source: '/faq',
        destination: '/faqs',
        permanent: true, // 308 redirect for SEO-friendly permanent redirect
      },
      {
        source: '/booking',
        destination: '/kontakt',
        permanent: true, // 308 redirect for SEO-friendly permanent redirect
      },
       {
        source: '/aboutMe',
        destination: '/about',
        permanent: true, // 308 redirect for SEO-friendly permanent redirect
      },
    ];
  },
};