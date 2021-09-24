const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  mode: "development",
  entry: {
    app: "./src/index.jsx",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index_bundler.js",
  },
  node: { fs: "empty" },
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      "@api": path.resolve(__dirname, "./src/api"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@modules": path.resolve(__dirname, "./src/modules"),
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-react"],
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "main.css",
    }),
    new HtmlWebpackPlugin({
      favicon: "./public/favicon.ico",
      template: "./public/index.html",
    }),
    new webpack.DefinePlugin({
      "process.env": {
        API_SERVER: JSON.stringify(process.env.API_SERVER),
      },
    }),
  ],
};
