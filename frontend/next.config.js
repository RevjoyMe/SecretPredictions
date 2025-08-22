/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    serverComponentsExternalPackages: ['fhevmjs'],
  },
  webpack: (config, { isServer }) => {
    // Handle WASM files for FHE
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
      layers: true,
    };

    // Handle binary files and WASM
    config.module.rules.push({
      test: /\.wasm$/,
      type: 'webassembly/async',
    });

    // Handle .node files
    config.module.rules.push({
      test: /\.node$/,
      use: 'node-loader',
    });

    // Fallback for Node.js modules in browser
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        buffer: require.resolve('buffer'),
        process: require.resolve('process/browser'),
      };
    }

    return config;
  },
  images: {
    domains: ['via.placeholder.com', 'picsum.photos'],
    dangerouslyAllowSVG: true,
  },
  env: {
    CUSTOM_KEY: 'custom-value',
  },
};

module.exports = nextConfig;

