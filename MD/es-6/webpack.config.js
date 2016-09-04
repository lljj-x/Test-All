var webpack = require('webpack');
var cssLoader = {test: /\.css$/, loader: "style-loader!css-loader"};
var path = require('path');
var glob = require('glob');
var HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * 获得路径
 * @param globPath: str
 * @param pathDir: str 对比路径
 * @returns {{}}
 */
function getEntry(globPath, pathDir) {
    var files = glob.sync(globPath);
    var entries = {},
        templates = {},
        entry, dirname, basename, pathname, extname;

    for (var i = 0; i < files.length; i++) {
        entry = files[i];
        dirname = path.dirname(entry);
        extname = path.extname(entry);
        basename = path.basename(entry, extname);
        pathname = path.normalize(path.join(dirname,  basename));
        pathDir = path.normalize(pathDir);
        if(pathname.startsWith(pathDir)){
            pathname = pathname.substring(pathDir.length)
        }
        entries[pathname] = ['./' + entry];
        templates[pathname] = {
            chunks: ['vue-family', 'common-lib', basename],
            filename: '' + pathname + '.html',
            template: './src/pages/' + basename + '/' + basename + '.html',
            inject: 'body',
            hash: true,
            chunksSortMode: 'dependency'
        }
    }

    return {
        entries:entries,
        templates:templates
    };
}


var entries = getEntry('src/pages/**/*.js', 'src/pages/');
console.log(entries);

var htmlWebpackPluginConfig = '';




module.exports = {
    //entry  : './dev/index.js',
    entry  : entries.entries,

    output : {
        path      : path.join(__dirname, './dist'),
        publicPath: 'dist/',
        filename: '[name].build.js'
    },
    module : {
        loaders   : [
            cssLoader,
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            },
            {
                test: /\.js$/,
                // excluding some local linked packages.
                // for normal use cases only node_modules is needed.
                exclude: /node_modules|dev\/avalon|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
                loader: 'babel',
                query: {
                    presets: ['es2015'],
                    //plugins: [
                    //    'transform-es2015-typeof-symbol','transform-runtime'
                    //]
                    plugins: [
                        'transform-runtime'
                    ]
                }
            }
        ],
        preLoaders: [
            //{test: /\.js$/, loader: "amdcss-loader"}
        ]
    },
    //devtool : '#eval',
    resolve: {
        extensions: ['.js', "", ".css"],
        alias     : {
            avalon     : './avalon/avalon.shim',//在正常情况下我们以CommonJS风格引用avalon,以require('avalon')
            "../avalon": './avalon/avalon.shim'//由于oniui都以是../avalon来引用avalon的，需要在这里进行别名
        }
    }
};

if (process.env.NODE_ENV === 'production') {

    module.exports.plugins = [
        new webpack.optimize.CommonsChunkPlugin({
            name: "common2",
            minChunks: 2
        }),
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