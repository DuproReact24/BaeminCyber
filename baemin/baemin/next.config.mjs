/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost"], // Cho phép tải ảnh từ localhost
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboard",
        permanent: true,
      },
    ];
  },
};

export default nextConfig; // ✅ Dùng export default thay vì module.exports
