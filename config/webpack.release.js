const commonConfig = require('./webpack.common');
const webpackMerge = require('webpack-merge');
const webpack = require('webpack');

module.exports = webpackMerge(commonConfig, {
   plugins: [ new webpack.optimize.UglifyJsPlugin() ]
});
