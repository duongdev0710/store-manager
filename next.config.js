/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        // Add the directory to the module search paths
        config.resolve.modules.push(__dirname + '/Stores/Configs');
        config.module.rules.push({
            test: /\.node/,
            use: 'raw-loader',
          });
        // Return the modified config
        return config;
      },
      images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'csfood.vn',
            port: '',
            pathname: '/**'
          }
        ]
      }
}

module.exports = nextConfig
