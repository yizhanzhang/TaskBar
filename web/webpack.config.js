const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const config = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: [
    path.resolve(__dirname, 'src/index.tsx')
  ],
  resolve: {
    modules: ['node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.less'],
    plugins: [new TsconfigPathsPlugin({ configFile: path.resolve(__dirname, "./tsconfig.json")})]
  },
  output: {
    path: path.join(__dirname, '../static'),
    filename: 'app.js'
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
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
