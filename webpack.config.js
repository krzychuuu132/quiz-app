const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  entry: {
    main: "./src/index.js"
  },

  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "build")
  },
  module: {
    rules: [
      {
        test: /\.scss|sass$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      },
      {
        test: /\.jpg|png|svg$/,
        use: "file-loader"
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-env"],
          plugins: ["@babel/plugin-proposal-class-properties"]
        }
      }
    ]
  },
  devServer: {
    open: true,
    contentBase: path.resolve(__dirname, "build")
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "QUIZ-APP",
      template: "./src/index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "css/style.css"
    })
  ]
};
