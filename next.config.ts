/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // ─── Development: local backend ───────────────────────────────────────
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/uploads/**",
      },
      // ─── Production: your real domain ─────────────────────────────────────
      // Replace with your actual production domain when you deploy
      {
        protocol: "https",
        hostname: "api.99min.com",  // ← change this to your real API domain
        pathname: "/uploads/**",
      },
      // ─── If using AWS S3 ──────────────────────────────────────────────────
      // {
      //   protocol: "https",
      //   hostname: "your-bucket.s3.amazonaws.com",
      //   pathname: "/**",
      // },
      // ─── If using Cloudinary ──────────────────────────────────────────────
      // {
      //   protocol: "https",
      //   hostname: "res.cloudinary.com",
      //   pathname: "/**",
      // },
    ],
    // ─── Only for development (localhost blocks private IPs) ─────────────────
    // Remove this line when deploying to production
    unoptimized: process.env.NODE_ENV === "development",
  },
};

export default nextConfig;