import webpack from 'webpack';
import path from 'path';

export default {
  devtool: 'inline-source-map',
  entry: [
    'webpack/hot/dev-server',
    './src/reactBootstrap.js',
  ],
  output: {
    filename: 'app.js',
    path: path.join(__dirname, 'public'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader?cacheDirectory=cache/babel',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|svg)$/,
        loader: 'url-loader?limit=8192',
      },
    ],
  },
  externals: {
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': 'window',
  },
  resolve: {
    alias: {
      sinon: 'sinon/pkg/sinon.js', // https://github.com/webpack/webpack/issues/177#issuecomment-185718237,
      src: path.resolve('./src'),
      public: path.resolve('./public'),
    },
    modules: [path.resolve('./src'), 'node_modules'],
    extensions: ['.js', '.ts', '.scss'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
};
