const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const path = require('path');

module.exports = {
    mode: 'production',
    entry: { 
      app: path.resolve('src', 'index.js'),
      analytics: path.resolve('src', 'analytics.js')
    },
    output: {
      publicPath: '/',
      path: path.resolve('dist'),
      filename: '[name].[contenthash].js',
      chunkFilename: `[name].[contenthash].css`,
    },
    resolve: {
      modules: [
          'src',
          'node_modules',
      ],
    },
    module: {
      rules: [        
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',              
          }
        }, 
        {
          test: /\.css$/i,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                modules: true
              }
            }
          ],
          include: /\.module\.css$/
        },  
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader'
          ],
          exclude: /\.module\.css$/
        },
          // IMAGES
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: {
            loader: 'file-loader',
            options: {
                name: 'images/[name].[contenthash].[ext]'
            }
          }
        }, 
        // SVG
        {
            test: /\.svg$/,
            use: [
                'raw-loader'
            ]
        },
        {
          test: /\.html$/i,
          loader: 'html-loader',
          options: {}
        }   
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: `[name].[contenthash].css`,
        chunkFilename: `[id].[contenthash].css`,
      }),
      new CleanWebpackPlugin(), 
      new WebpackManifestPlugin({}),
      new HtmlWebpackPlugin({        
        chunks: ['app'],
        filename: 'index.html',
        template: path.resolve('src/views/index.html'),       
      }),
      new HtmlWebpackPlugin({        
        chunks: ['analytics'],
        filename: 'analytics.html',
        template: path.resolve('src/views/analytics.html')      
      })
    ],
    optimization: {
      runtimeChunk: 'single',
      minimize: false,
      concatenateModules: true,
      splitChunks: {
        // include all types of chunks for splitting
        // by default only async is taken for split
        chunks: 'all',
        // https://webpack.js.org/plugins/split-chunks-plugin/
        // default minsize for splitting is 20kb
        minSize: 0,      
        cacheGroups: {  
          cssChunks: {            
            name(module) {              
              const packageName = module._identifier.match(/[\\/]css[\\/](.*?)([\\/]|$)/)[1];  
              return packageName.replace('.module', '').replace('.css', '');
            },
            test: (module) =>
            module.constructor.name === "CssModule",
            chunks: "all",
            enforce: true,
          },        
          vendorScriptChunks: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              // get the name. E.g. node_modules/packageName/not/this/part.js
              // or node_modules/packageName
              
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];              
  
              // npm package names are URL-safe, but some servers don't like @ symbols
              return `${packageName.replace('@', '').replace('/', '')}`;
            },
          },
        },
      },
    },
};