const { override, addWebpackModuleRule } = require('customize-cra');

module.exports = override(
  // Ignore source map warnings from node_modules
  (config) => {
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

    return config;
  }
);
