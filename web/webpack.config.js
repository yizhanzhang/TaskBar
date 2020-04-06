const path = require('path')

const config = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: [
    path.resolve(__dirname, 'index.jsx')
  ],
  resolve: {
    modules: ['node_modules'],
    extensions: ['.jsx', '.js', '.less'],
    alias: {
      '~': path.resolve(__dirname, '.')
    }
  },
  output: {
    path: path.join(__dirname, './'),
    filename: 'app.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {},
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: true
            }
          },
          {
            loader: 'less-loader',
            options: {relativeUrls: true, sourceMap: true}
          }
        ],
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        exclude: /node_modules/,
        loader: 'url-loader',
      },
    ]
  },
  target: 'electron-main',
}

module.exports = config
