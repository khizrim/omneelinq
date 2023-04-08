const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    popup: path.join(__dirname, "src/index.tsx"),
    background: path.join(__dirname, "src/background.ts"),
  },
  output: {
    path: path.join(__dirname, "build"),
    filename: "[name].js",
    assetModuleFilename: "assets/[hash][ext]",
  },
  devServer: {
    compress: true,
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "ts-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.png/,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    modules: [__dirname, "src", "node_modules"],
    extensions: [".js", ".jsx", ".tsx", ".ts"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  stats: "summary",
};
