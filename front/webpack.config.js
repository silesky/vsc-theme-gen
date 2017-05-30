const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'index.bundle.js'
  },

  module: {
    loaders: [
      // transformations applied to the app
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  devServer: {
    port: 3001 // hot reloading seems to break autoreload/compile
  }
}
