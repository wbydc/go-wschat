const path = require('path');

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: {
    main: "./src/app.ts",
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: "app.js"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      { 
        test: /\.tsx?$/,
        loader: "ts-loader"
      }
    ]
  },
  devServer: {
    static: path.resolve(__dirname, './build'),
    hot: true,
    client: {
      progress: true,
    },
  },
  watchOptions: {
    poll: true,
    ignored: /node_modules/
  }
};
