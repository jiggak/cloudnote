const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { AngularCompilerPlugin } = require('@ngtools/webpack');

module.exports = {
   entry: {
      app: './src/main.ts'
   },
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[hash].js'
   },
   optimization: {
      splitChunks: {
         chunks: 'all'
      }
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
         },
         {
            test: /\.scss$/,
            exclude: [ path.join(__dirname, 'src/app') ],
            use: [
               { loader: 'style-loader' },
               { loader: 'css-loader' },
               {
                  loader: 'postcss-loader',
                  options: {
                     postcssOptions: { plugins: ['autoprefixer'] }
                  }
               },
               { loader: 'sass-loader' }
            ]
         },
         {
            test: /\.scss$/,
            include: [ path.join(__dirname, 'src/app') ],
            use: [
               { loader: 'raw-loader' },
               { loader: 'extract-loader' },
               { loader: 'css-loader' },
               { loader: 'sass-loader' }
            ]
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
