/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  images: {
    // Cloudinary CDN handles resizing/format — see lib/cloudinary-loader.js
    loader: "custom",
    loaderFile: "./lib/cloudinary-loader.js",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },

  experimental: {
    // Only pull the icons actually used instead of the whole barrel file
    optimizePackageImports: ["react-icons", "lucide-react", "framer-motion"],
  },
};

export default nextConfig;
