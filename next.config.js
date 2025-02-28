/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.iconfinder.com', // 앞 주소는 바뀔 수 있어 모든 주소를 허용
      },
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com', // 앞 주소는 바뀔 수 있어 모든 주소를 허용
      },
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com',
      },
    ],
  },
}

module.exports = nextConfig
