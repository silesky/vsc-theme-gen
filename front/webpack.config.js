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
    publicPath: '/dist/', // webpack needs to know where you'll host the generated bundle
    inline: true, // uses an IFrame (so localhost:__/index.html will just work
    port: 3001, // hot reloading seems to break autoreload/compile
  },
  devtool: 'source-map',
}
