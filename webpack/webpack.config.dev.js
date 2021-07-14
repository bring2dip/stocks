const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: { 
      index: path.resolve('src', 'features', 'index', 'index.js'),
      analytics: path.resolve('src', 'features', 'analytics', 'analytics.js')
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
        chunks: ['index'],
        filename: 'index.html',
        template: path.resolve('src/features/index/index.html'),
      }),
      new HtmlWebpackPlugin({        
        chunks: ['analytics'],
        filename: 'analytics.html',
        template: path.resolve('src/features/analytics/analytics.html')
      }),
      new Dotenv(),
    ]
};