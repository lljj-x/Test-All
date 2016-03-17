var webpack = require('webpack');
var cssLoader = { test: /\.css$/, loader: "style-loader!css-loader" };

module.exports = {
    entry: './dev/index.js',
    output: {
        path: './static',
        publicPath: 'static/',
        filename: 'build.js'
    },
    module: {
        loaders: [
          cssLoader,
          { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' },
          //{
          //    test: /\.js$/,
          //    // excluding some local linked packages.
          //    // for normal use cases only node_modules is needed.
          //    exclude: /node_modules|dev\/avalon|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
          //    loader: 'babel'
          //}
        ],
        preLoaders: [
            {test: /\.js$/, loader: "amdcss-loader"}
        ]
    },
    //babel: {
    //    presets: ['es2015'],
    //    plugins: ['transform-runtime']
    //},
    resolve: {
        extensions: ['.js',"",".css"],
        alias: {
            avalon: './avalon/avalon.shim',//在正常情况下我们以CommonJS风格引用avalon,以require('avalon')
            "../avalon": './avalon/avalon.shim'//由于oniui都以是../avalon来引用avalon的，需要在这里进行别名
        }
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