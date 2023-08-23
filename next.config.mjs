import million from 'million/compiler';
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: true,
  },
};
 
const millionConfig = {
  auto: { rsc: true },
}
 
export default million.next(nextConfig, millionConfig);
