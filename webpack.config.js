const path = require('path');

module.exports = {
  entry: './src/axios.js', // Entry point for your app
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'bundle.js', // The bundled file
  },
  mode: 'development', // Set mode to 'development' or 'production'
  module: {
    rules: [
      {
        test: /\.css$/, // Process CSS files
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};