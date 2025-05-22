const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // For JS and JSX files
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
  test: /\.css$/i,
  use: ['style-loader', 'css-loader'],
}
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Allow imports without extensions
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 8080,
    hot: true,
  },
  mode: 'development',
};