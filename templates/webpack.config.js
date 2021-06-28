const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';
const config = require('./config');

const plugins = [
  new HtmlWebpackPlugin({
    filename: '{{webpack.htmlFilename}}',
    template: '{{webpack.htmlTemplate}}'
  })
];
if (!devMode) {
  // enable in production only
  plugins.push(new MiniCssExtractPlugin());
}

module.exports = {
  entry: '{{webpack.entryFile}}',
  output: {
    path: path.resolve(__dirname, '{{webpack.outputPath}}'),
    filename: '{{webpack.outputFile}}'
  },
  devServer: {
    contentBase: './{{webpack.outputPath}}',
    open: {{webpack.openOnStart}},
    port: config.web.port
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