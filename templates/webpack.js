const config = require('../config');

module.exports = function() {
  return `const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';

const plugins = [
  new HtmlWebpackPlugin({
    filename: '${config.webpack.htmlFilename}',
    template: '${config.webpack.htmlTemplate}'
  })
];
if (!devMode) {
  // enable in production only
  plugins.push(new MiniCssExtractPlugin());
}

module.exports = {
  entry: '${config.entryFile}',
  output: {
    path: path.resolve(__dirname, '${config.webpack.outputPath}'),
    filename: '${config.webpack.outputFile}'
  },
  devServer: {
    contentBase: './${config.webpack.outputPath}',
    open: ${config.webpack.openOnStart},
    port: ${config.webpack.port}
  },
  plugins,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      }
    ]
  }
}
`
}