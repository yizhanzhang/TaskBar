const path = require('path')

const config = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: [
    path.resolve(__dirname, 'web/index.jsx')
  ],
  resolve: {
    modules: ['node_modules'],
    extensions: ['.jsx', '.js', '.less'],
    alias: {
      '~': path.resolve(__dirname, './web')
    }
  },
  output: {
    path: path.join(__dirname, 'static/'),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-react',
                [
                  '@babel/preset-env',
                  {
                    targets: {
                      chrome: '60'
                    }
                  }
                ]
              ],
              plugins: [
                '@babel/plugin-proposal-object-rest-spread',
                '@babel/plugin-proposal-class-properties',
              ],
            },
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
