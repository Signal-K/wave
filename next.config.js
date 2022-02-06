/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['i.scdn.co', 'cdn-images-1.medium.com', 'dev.to', 'steamcdn-a.akamaihd.net'],
  }
}
