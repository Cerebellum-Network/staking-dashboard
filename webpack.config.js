// Copyright 2023 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: Apache-2.0

// eslint-disable-next-line
const TerserPlugin = require('terser-webpack-plugin')
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const path = require("path")

module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  devtool: "inline-source-map",
  devServer: {
    port: 3003,
    open: true,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.worker\.ts$/,
        loader: 'worker-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          compilerOptions: {
            noEmit: false,
          },
        },
      },
      {
        test: /\.css$/i,                                                                                                                                                             
        use: ["style-loader", "css-loader", "sass-loader"],                                                                                                                          
      }, 
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader'
      },
      {
        test: /test\.js$/,
        use: 'mocha-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    alias: {
      config: path.resolve(__dirname, 'src/config/'),
      consts: path.resolve(__dirname, 'src/consts/'),
      contexts: path.resolve(__dirname, 'src/contexts'),
      img: path.resolve(__dirname, 'src/img'),
      library: path.resolve(__dirname, 'src/library'),
      locale: path.resolve(__dirname, 'src/locale'),
      modals: path.resolve(__dirname, 'src/modals'),
      pages: path.resolve(__dirname, 'src/pages'),
      styles: path.resolve(__dirname, 'src/styles'),
      Providers: path.resolve(__dirname, 'src/Providers'),
      Router: path.resolve(__dirname, 'src/Router'),
      Utils: path.resolve(__dirname, 'src/Utils'),
      Wrappers: path.resolve(__dirname, 'src/Wrappers'),
    },
    extensions: ["*", ".js", ".jsx", ".ts", ".tsx"],
    fallback: {
      os: require.resolve("os-browserify/browser"),
      crypto: require.resolve("crypto-browserify"),
      stream: require.resolve("stream-browserify"),
      buffer: require.resolve("buffer"),
      'process/browser': require.resolve('process/browser')
    },
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      terserOptions: {
        compress: {
          drop_console: true,
        },
      }
    })],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.REACT_APP_DISABLE_FIAT': JSON.stringify(process.env.REACT_APP_DISABLE_FIAT),
      'process.env.REACT_APP_PRIVACY_URL': JSON.stringify(process.env.REACT_APP_PRIVACY_URL),
      'process.env.REACT_APP_DISCLAIMER_URL': JSON.stringify(process.env.REACT_APP_DISCLAIMER_URL),
      'process.env.REACT_APP_ORGANISATION': JSON.stringify(process.env.REACT_APP_ORGANISATION),
      'process.env.REACT_APP_NODE_ENV': JSON.stringify(process.env.REACT_APP_NODE_ENV),
      'process.env.REACT_APP_DEBUG_I18N': JSON.stringify(process.env.REACT_APP_DEBUG_I18N),
    })
  ],
}
