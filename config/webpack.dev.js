const commonConfig = require('./webpack.common');
const webpackMerge = require('webpack-merge');
const WebpackNotifierPlugin = require('webpack-notifier');

module.exports = webpackMerge(commonConfig, {
   devtool: "source-map",
   devServer: {
      proxy: {
         '/webdav': {
            target: 'http://food.slashdev.ca',
            changeOrigin: true
         }
      }
   },
   plugins: [ new WebpackNotifierPlugin() ]
});
