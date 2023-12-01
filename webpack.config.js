/* eslint-env node */

const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

/** @type {import("webpack").Configuration} */
module.exports = {
  mode: "production",
  entry: {
    main: "ts/TodoMap.ts",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "static/js/[name]-[contenthash].bundle.js",
    publicPath: "/",
    clean: true,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    modules: [
      path.resolve(__dirname, "src/main/view/static"),
      path.resolve(__dirname, "node_modules"),
    ],
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/i,
        exclude: /node_modules/,
        use: [{ loader: "ts-loader" }],
      },
      {
        test: /\.js(x?)$/i,
        exclude: /node_modules/,
        use: [{ loader: "babel-loader" }],
      },
      {
        test: /\.(css|sass|scss)$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
          },
          {
            loader: "postcss-loader",
          },
          {
            loader: "sass-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "TODO Map",
      template: "src/main/view/templates/todo-map.html",
      filename: "index.html",
      inject: true,
    }),
    new MiniCssExtractPlugin({
      filename: "static/css/[name]-[contenthash].css",
    }),
    new FaviconsWebpackPlugin({
      logo: "src/main/view/static/images/favicon-io/check-mark-button/favicon-16x16.png",
      mode: "webapp",
      devMode: "webapp",
      inject: true,
      favicons: {
        icons: {
          android: ["android-chrome-192x192.png", "android-chrome-512x512.png"],
          appleIcon: ["apple-touch-icon.png"],
          favicons: ["favicon-16x16.png", "favicon-32x32.png", "favicon.ico"],
        },
      },
    }),
  ],
};
