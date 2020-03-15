var path = require("path");
var webpack = require("webpack");

module.exports = {
  cache: true,
  entry: {
    app: "./app/example.js"
  },
  output: {
    path: __dirname,
    filename: "app/example.min.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: [/node_modules\/(?!react-breadcrumb-select).*/],
        loaders: ["babel-loader?stage=0"]
      }
    ]
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    })
  ]
};
