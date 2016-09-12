var webpack = require('webpack')
var autoprefixer = require('autoprefixer');
var precss = require('precss');
var pxtorem = require('postcss-px2rem');
var cssLoader = { test: /\.css$/, loader: "style-loader!css-loader!postcss-loader" };
var postcssConfig = [autoprefixer({ browsers: ['> 2%']}), precss, pxtorem({ remUnit: 75 })];

module.exports = {
    entry: './src/main.js',
    output: {
        path: './static',
        publicPath: 'static/',
        filename: 'build.js'
    },
    module: {
        loaders: [
          {
              test: /\.vue$/,
              loader: 'vue'
          },
          cssLoader,
          { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' },
          {
              test: /\.js$/,
              // excluding some local linked packages.
              // for normal use cases only node_modules is needed.
              exclude: /node_modules|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
              loader: 'babel'
          }
        ]
    },
    babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime']
    },
    vue: {
        loaders: [
         cssLoader,
        ],
        postcss: function () {
            return postcssConfig;
        }
    },
    postcss: function () {
        return postcssConfig;
    }
}

if (process.env.NODE_ENV === 'production') {
    module.exports.plugins = [
      new webpack.DefinePlugin({
          'process.env': {
              NODE_ENV: '"production"'
          }
      }),
      new webpack.optimize.UglifyJsPlugin({
          compress: {
              warnings: false
          }
      }),
      new webpack.optimize.OccurenceOrderPlugin()
    ]
} else {
    module.exports.devtool = '#source-map'
}