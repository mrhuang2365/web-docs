const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const clearPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    app: './app.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  devServer: {
    open: true,
    port: 3000,
    contentBase: './dist',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader']
      },
      {
        test: /\.vue$/,
        use: ['vue-loader']
      }
    ]
  },
  plugins: [
    new clearPlugin.CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),
      output: path.resolve(__dirname, 'dist/index.html')
    }),
  ],
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
}