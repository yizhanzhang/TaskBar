const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  devtool: 'source-map',
  target: ['web', 'electron-renderer'],
  entry: [
    path.resolve(__dirname, 'src/index.tsx')
  ],
  output: {
    path: path.join(__dirname, '../../out/web'),
    filename: 'app.js'
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.less'],
    fallback: {
      "fs": false,
      "path": false,
      "events": false,
      "child_process": false,
    } 
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        },
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
        ],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.ejs'),
      inject: 'body',
    }),
  ]
}

module.exports = config
