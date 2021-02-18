const HtmlWebpackPlugin = require('html-webpack-plugin');
const { AngularCompilerPlugin } = require('@ngtools/webpack');

module.exports = {
   entry: {
      app: './src/main.ts'
   },
   resolve: {
      extensions: ['.ts', '.js']
   },
   plugins: [
      new HtmlWebpackPlugin({
         template: './src/index.html'
      }),
      new AngularCompilerPlugin({
         tsConfigPath: './tsconfig.json',
         sourceMap: true
      })
   ],
   module: {
      rules: [
         {
            test: /\.ts$/,
            loader: '@ngtools/webpack'
         },
         {
            test: /\.html$/,
            loader: 'html-loader',
         }
      ]
   },
   devServer: {
      historyApiFallback: {
         disableDotRule: true
      },
      host: '0.0.0.0',
      proxy: {
         '/webdav': {
            target: 'http://food.slashdev.ca',
            changeOrigin: true
         }
      }
   }
};
