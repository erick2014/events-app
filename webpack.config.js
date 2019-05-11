const path = require('path')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCssAssets = require('optimize-css-assets-webpack-plugin')

let config = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '/public'),
    publicPath: 'public/',
    filename: 'output.js'
  },
  resolve: {
    // Automatically resolve certain extensions
    extensions: ['.js', '.jsx', '.json', '.scss', '.css', '.jpeg', '.jpg', '.gift', '.png'],
    // create aliases
    alias: {
      images: path.resolve(__dirname, 'src/assets/images'),
      components: path.resolve(__dirname, 'src/app/components'),
      reduxConfig: path.resolve(__dirname, 'src/app/reduxConfig'),
      utils: path.resolve(__dirname, 'src/app/utils')
    }
  },
  module: {
    rules: [
      {
        // files ending with .js
        test: /\.js$/,
        // exclude the node_modules directory
        exclude: /node_modules/,
        // use this (babel-core) loader
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/, // files ending with .scss,
        use: ['css-hot-loader'].concat(ExtractTextWebpackPlugin.extract({ // call our plugin with extract method
          use: ['css-loader', 'sass-loader'], // use these loaders
          fallback: 'style-loader' // fallback for any CSS not extractrd
        }))// end extract
      },
      {
        test: /\.jsx$/, // all files ending with .jsx
        loader: 'babel-loader', // use the babel-loader for all .jsx files
        exclude: /node_modules/ // exclude searching for files in the node_modules directory
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file-loader?context=src/assets/images/&name=images/[path][name].[ext]',
          {
            loader: 'image-webpack-loader',
            query: {
              mozjpeg: { progressive: true },
              gifsicle: { interlaced: false },
              optipng: {
                optimizationLevel: 4
              },
              pngquant: {
                quality: '75-90',
                speed: 3
              }
            }
          }
        ],
        exclude: /node_modules/,
        include: __dirname
      }

    ]// end rules
  },
  plugins: [
    new ExtractTextWebpackPlugin({// call the ExtractTextWebpackPlugin constructor and name our css file
      filename: 'styles.css',
      allChunks: true
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, './public'), // A directory or URL to serve HTML content from
    historyApiFallback: true, // fallback to /index.html for single Page Applications.
    inline: true// inline mode(set to false to disable including client scripts, like livereload)
  },
  devtool: 'eval-source-map'// enable devtool for better debugging experience
}

module.exports = config

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins.push(
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          conditionals: true,
          drop_console: true // strips console statements
        },
        output: {
          beautify: false
        }
      }
    }),
    new OptimizeCssAssets()
  )
}
