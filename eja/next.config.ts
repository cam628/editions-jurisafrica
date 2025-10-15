import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  trailingSlash: false,
  
  // Redirects from old .html URLs to new clean URLs
  async redirects() {
    return [
      {
        source: '/lepenant.html',
        destination: '/penant',
        permanent: true, // 301 redirect
      },
      {
        source: '/penant.html',
        destination: '/penant',
        permanent: true,
      },
      {
        source: '/larjp.html',
        destination: '/rjp',
        permanent: true,
      },
      {
        source: '/rjp.html',
        destination: '/rjp',
        permanent: true,
      },
      {
        source: '/ouvrages.html',
        destination: '/ouvrages',
        permanent: true,
      },
      {
        source: '/contributeurs.html',
        destination: '/contributeurs',
        permanent: true,
      },
      {
        source: '/contact.html',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      },
      // Catch-all for any other .html files
      {
        source: '/:path*.html',
        destination: '/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
