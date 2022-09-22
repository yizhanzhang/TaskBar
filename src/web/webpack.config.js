const path = require('path')

const config = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  devtool: 'source-map',
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
  target: ['web', 'electron-renderer'],
}

module.exports = config
