/** @type {import('next').NextConfig} */

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

const nextConfig = {
    webpack: (config, _) => ({
        ...config,
        watchOptions: {
          ...config.watchOptions,
          poll: 800,
          aggregateTimeout: 300,
        },}), 
    images: {
      domains: [
        "res.cloudinary.com"
      ]
    }
};

export default nextConfig;
