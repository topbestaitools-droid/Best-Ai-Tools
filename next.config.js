/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.example.com"
      },
      {
        protocol: "https",
        hostname: "logo.clearbit.com"
      }
    ],
    formats: ["image/avif", "image/webp"]
  },

  // Headers for security
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on"
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains"
          },
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;"
          }
        ]
      }
    ];
  },

  // Redirects
  async redirects() {
    return [
      {
        source: "/api/v1/:path*",
        destination: "/api/:path*",
        permanent: true
      }
    ];
  },

  // Rewrites
  async rewrites() {
    return {
      beforeFiles: []
    };
  },

  // Environment variables
  env: {
    NEXT_PUBLIC_ENV: process.env.NEXT_PUBLIC_ENV || "development"
  },

  // Webpack config
  webpack: (config, { isServer }) => {
    return config;
  },

  // Experimental features
  experimental: {
    optimizePackageImports: ["react-icons"]
  }
};

module.exports = nextConfig;
