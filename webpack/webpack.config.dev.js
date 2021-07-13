const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: { 
      app: path.resolve('src', 'index.js'),
      analytics: path.resolve('src', 'analytics.js')
    },
    output: {
      publicPath: '/',
      path: path.resolve('dist'),
      filename: '[name].[contenthash].js',
    },
    devServer: {
      host: '0.0.0.0'
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
            {
              loader: 'style-loader'
            },
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
      new HtmlWebpackPlugin({        
        chunks: ['app'],
        filename: 'index.html',
        template: path.resolve('src/views/index.html'),       
      }),
      new HtmlWebpackPlugin({        
        chunks: ['analytics'],
        filename: 'analytics.html',
        template: path.resolve('src/views/analytics.html')      
      }),
      new Dotenv(),
    ]
};