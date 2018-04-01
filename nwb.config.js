var path = require('path')
var CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  type: 'web-app',
  polyfill: false,
  webpack: {
    extra: {
      module: {
        rules: [{
          test: /\.elm$/,
          exclude: [/elm-stuff/, /node_modules/],
          loader: 'elm-webpack-loader?verbose=true&warn=true',
        }]
      },
      plugins: [
        new CopyWebpackPlugin([
          { from: 'src/images', to: 'images' },
          { from: 'src/data', to: 'data' }
        ])
      ]
    }
  }
}
