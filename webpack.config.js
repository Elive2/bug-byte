const webpack = require('webpack');

module.exports = env => {
  return {
    entry: {
      index: './src/index.js',
      manager: './src/manager.js',
      dev: './src/dev.js',
      login: './src/login.js'
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
        },
        {
          test: /\.(gif|png|jpe?g|svg)$/i,
          use: [
            'file-loader',
            {
              loader: 'image-webpack-loader',
              options: {
                disable: true, // webpack@2.x and newer
              },
            },
          ],
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
          API_URL: JSON.stringify(env.API_URL)
        }
      })
      // new webpack.DefinePlugin({
      //   API_URL: JSON.stringify(process.env.API_URL)
      // })
    ]
  };
  // devServer: {
  //   contentBase: './dist'
  // }
};
