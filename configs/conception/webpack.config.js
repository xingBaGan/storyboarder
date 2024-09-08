const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './src/js/windows/conception/window.js',
  target: 'electron-main',
  output: {
    path: path.resolve(__dirname, './../../src/build'),
    filename: 'conception.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: { electron: require('electron/package.json').version }
                }
              ],
              '@babel/preset-react'
            ],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
                modifyVars: {
                  '@ant-prefix': 'conception-antd',
                },
              },
            },
          },
        ],
      },
    ]
  },
  node: {
    __dirname: false,
    __filename: false
  },
  plugins: [
    new webpack.ProvidePlugin({
      'THREE': 'three'
    })
  ],
}
