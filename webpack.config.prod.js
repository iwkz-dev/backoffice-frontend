import webpack from 'webpack';
import deepExtend from 'deep-extend';
import path from 'path';
import webpackConfig from './webpack.config';

const prodWebpackConfig = deepExtend(webpackConfig, {
  devtool: 'source-map',
  mode: 'production',
  output: {
    path: path.join(__dirname, 'target'),
    filename: 'app.js',
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
});

prodWebpackConfig.plugins.push(new webpack.DefinePlugin({
  'process.env.NODE_ENV': '"production"',
}));

export default prodWebpackConfig;
