const path = require('path');

module.exports = {
  mode: 'production', // Or 'development' for development builds
  entry: './scripts.js', // The main JavaScript file of your theme
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'bundle.js' // Name of the bundled file
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  resolve: {
    alias: {
      'tippy.js': path.resolve(__dirname, 'node_modules/tippy.js/dist/tippy-bundle.umd.js'),
      'cleave.js': path.resolve(__dirname, 'node_modules/cleave.js/dist/cleave.min.js'),
      'mathjs': path.resolve(__dirname, 'node_modules/mathjs/dist/math.min.js'),
      'nouislider': path.resolve(__dirname, 'node_modules/nouislider/distribute/nouislider.min.js'),
      'wnumb': path.resolve(__dirname, 'node_modules/wnumb/wNumb.js'),
      'chart.js': path.resolve(__dirname, 'node_modules/chart.js/dist/Chart.min.js'),
    }
  }
};