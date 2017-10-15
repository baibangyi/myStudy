 // const path = require('path');
 //  const HtmlWebpackPlugin = require('html-webpack-plugin');
 //  const CleanWebpackPlugin = require('clean-webpack-plugin');

 //  module.exports = {
 //    entry: {
 //      app: './src/index.js',
 //      print: './src/print.js'
 //    },
 //    devtool: 'inline-source-map',
 //   devServer: {
 //     contentBase: './dist'
 //   },
 //    plugins: [
 //      new CleanWebpackPlugin(['dist']),
 //      new HtmlWebpackPlugin({
 //        title: 'Development'
 //      })
 //    ],
 //    output: {
 //      filename: '[name].bundle.js',
 //      path: path.resolve(__dirname, 'dist'),
 //      publicPath: '/'
 //    }
 //  };


   const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const webpack = require('webpack');

  module.exports = {
    entry: {
      app: './src/index.js'
    },
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './dist',
     hot: true
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Hot Module Replacement'
      }),
     new webpack.HotModuleReplacementPlugin()
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };