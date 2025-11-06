/** @type {import('next').NextConfig} */
const nextConfig = {
  // App Router is now default in Next.js 15
  webpack: (config, { isServer }) => {
    // Exclude external example directories from build (not part of main app)
    config.module.rules.push(
      {
        test: /metagraph-examples/,
        use: 'ignore-loader'
      },
      {
        test: /protocol-core-v1/,
        use: 'ignore-loader'
      }
    );

    return config;
  },
}

module.exports = nextConfig