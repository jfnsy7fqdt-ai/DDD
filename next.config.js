/** Next.js config optimized for images and experimental features */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com", "res.cloudinary.com"],
  },
  experimental: {
    // enable appDir if you migrate later
  }
};
module.exports = nextConfig;