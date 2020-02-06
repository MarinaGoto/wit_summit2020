// Webpack uses this to work with directories
const path = require('path');

// webpack plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


// This is main configuration object.
// Here you write different options and tell Webpack what to do
module.exports = {

  // Path to your entry point. From this file Webpack will begin his work
  entry: './src/main.js',

  // Path and filename of your result bundle.
  // Webpack will bundle all JavaScript into this file
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },

  // Default mode for Webpack is production.
  // Depending on mode Webpack will apply different things
  // on final bundle. For now we don't need production's JavaScript
  // minifying and other thing so let's set mode to development
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        /* ... */
      },
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 3,
              sourceMap: false
            }
          },
          {
            loader: 'resolve-url-loader',
            options: {
              sourceMap: false
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: false
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: false
            }
          }
        ]
      },
      {
        test: /\.(ttf|eot|otf|woff|woff2?)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '/fonts/fonts.css'
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8000, // Convert images < 8kb to base64 strings
            name: 'images/[hash]-[name].[ext]'
          }
        }]
      },
      {
        // Apply rule for fonts files
        test: /\.(woff|woff2|ttf|otf|eot)$/,
        use: [
          {
            // Using file-loader too
            loader: "file-loader",
            options: {
              outputPath: 'fonts'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    //
    // Webpack HTML Plugin
    //
    new HtmlWebpackPlugin({template: "./src/templates/index.html"}),
    new HtmlWebpackPlugin({
      template: "./src/templates/nlp/index.html",
      filename: 'nlp/index.html'
    }),
    new HtmlWebpackPlugin({
      template: "./src/templates/xai/index.html",
      filename: 'xai/index.html'
    }),
    new HtmlWebpackPlugin({
      template: "./src/templates/uxintro/index.html",
      filename: 'uxintro/index.html'
    }),
    new HtmlWebpackPlugin({
        template: "./src/templates/design/index.html",
        filename: 'design/index.html'
    }),


    new MiniCssExtractPlugin({template: "./src/main.scss"}),
  ],
};

