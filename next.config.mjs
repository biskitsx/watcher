/** @type {import('next').NextConfig} */
import pwa from 'next-pwa'
const withPWA = pwa({
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
})
  
const config = withPWA({
    // next.js config
    reactStrictMode: false,
    swcMinify: false,
})

export default config
  