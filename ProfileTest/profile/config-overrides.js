const { override, addWebpackModuleRule } = require('customize-cra');
const path = require('path');

module.exports = override(
  // Ignore source map warnings from node_modules
  (config, env) => {
    config.ignoreWarnings = [
      {
        module: /node_modules/,
        message: /Failed to parse source map/,
      },
    ];
    
    // Configure source map loader to ignore node_modules
    config.module.rules.push({
      test: /\.js$/,
      enforce: 'pre',
      use: ['source-map-loader'],
      exclude: /node_modules/,
    });

    // Optimize bundle splitting for production
    if (env === 'production') {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
              priority: 10
            },
            framerMotion: {
              test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
              name: 'framer-motion',
              chunks: 'all',
              priority: 20
            },
            threeJs: {
              test: /[\\/]node_modules[\\/](@react-three|three)[\\/]/,
              name: 'three-js',
              chunks: 'all',
              priority: 15
            },
            common: {
              name: 'common',
              minChunks: 2,
              chunks: 'all',
              priority: 5,
              enforce: true
            }
          }
        }
      };
    }

    // Add aliases for better import paths
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@assets': path.resolve(__dirname, 'src/assets')
    };

    return config;
  }
);
