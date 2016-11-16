var webpack = require('webpack'),
   HtmlWebpackPlugin = require('html-webpack-plugin'),
   WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
   entry: {
      app: './src/main.ts',
      vendor: './src/vendor.ts'
   },
   output: {
      path: './build',
      filename: '[name].js'
   },
   devtool: "source-map",
   devServer: {
      proxy: {
         '/webdav': {
            target: 'http://food.slashdev.ca',
            changeOrigin: true
         }
      }
   },
   resolve: {
      extensions: ['', '.js', '.ts']
   },
   module: {
      loaders: [
         {
            test: /\.css$/,
            loader: 'style!css'
         },
         {
            test: /\.(woff|woff2|svg|ttf)$/,
            loader: 'url?mimetype=application/font-woff'
         },
         {
            test: /\.eot$/,
            loader: 'file'
         },
         {
            test: /\.ts$/,
            loader: 'ts'
         },
         {
            test: /\.html$/,
            loader: 'html'
         }
      ]
   },
   plugins: [
      new webpack.optimize.CommonsChunkPlugin({
         name: ['app', 'vendor']
      }),
      new HtmlWebpackPlugin({
         template: 'src/index.html'
      }),
      new WebpackNotifierPlugin()
   ]
};
