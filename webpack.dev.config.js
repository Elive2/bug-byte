const webpack = require('webpack');

module.exports = {
  entry: {
    index: './src/index.js',
    manager: './src/manager.js',
    dev: './src/dev.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/react']
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: '[name].bundle.js'
  },
  plugins: [
    //new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'API_URL': JSON.stringify("http://localhost/bugs.php")
      }
    })
    // new webpack.DefinePlugin({
    //   API_URL: JSON.stringify(process.env.API_URL)
    // })
  ]
  // devServer: {
  //   contentBase: './dist'
  // }
};
