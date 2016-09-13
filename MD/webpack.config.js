var webpack = require('webpack');
var path = require('path');
var glob = require('glob');
var HtmlWebpackPlugin = require('html-webpack-plugin');

function getEntry(globPath, pathDir) {
    var files = glob.sync(globPath);
    var entries = {},
        templates = {},
        entry, dirname, basename, pathname, extname,outFileName;

    for (var i = 0; i < files.length; i++) {
        entry = files[i];

        dirname = path.dirname(entry);
        extname = path.extname(entry);
        basename = path.basename(entry, extname);
        pathname = path.normalize(path.join(dirname,  basename));
        pathDir = path.normalize(pathDir);
        outFileName = path.normalize(dirname);
        if(pathname.startsWith(pathDir)){
            pathname = pathname.substring(pathDir.length)
        }

        if(outFileName.startsWith(pathDir)){
            outFileName = outFileName.substring(pathDir.length)
        }else{
            outFileName = pathname;
        }

        // path window和liunx斜线相反 ...
        pathname = pathname.replace(/\\/g,'/');
        outFileName = outFileName.replace(/\\/g,'/');

        entries['wpjs/' + outFileName] = ['./' + entry];
        templates[pathname] = {
            chunks: ['wpjs/' + outFileName],
            filename: '' + outFileName + '.html',
            template: './src/pages/' + pathname + '.ejs',
            inject: 'body',
            chunksSortMode: 'dependency',
            hash: false
        }
    }
    return {
        entries:entries,
        templates:templates
    };
}

var entries = getEntry('src/pages/**/*.js', 'src/pages/');
var htmlWebpackPluginConfig = (function (templates) {
    var config = [];
    for(var key in templates){
        if(templates.hasOwnProperty(key)){
            config.push(new HtmlWebpackPlugin(templates[key]));
        }
    }
    return config;
})(entries.templates);

var webPackConfig = {
    entry  : entries.entries,
    output : {
        path      : path.join(__dirname, './build/'),
        publicPath: '/',
        // filename: '[name].[hash].js',
        filename: '[name].js',
    },
    module : {
        loaders   : [
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            },
            {
                test: /\.mjs$/,
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

        ]
    },
    //devtool : '#eval',
    resolve: {
        extensions: ['.js', "", ".css"],
        alias     : {
            avalon     : './avalon/avalon.shim',//在正常情况下我们以CommonJS风格引用avalon,以require('avalon')
            "../avalon": './avalon/avalon.shim'//由于oniui都以是../avalon来引用avalon的，需要在这里进行别名
        }
    },
    plugins: [].concat(htmlWebpackPluginConfig)
};

module.exports = webPackConfig;
//
// if (process.env.NODE_ENV === 'production') {
//
//     module.exports.plugins = [
//         new webpack.optimize.CommonsChunkPlugin({
//             name: "common2",
//             minChunks: 2
//         }),
//         new webpack.DefinePlugin({
//             'process.env': {
//                 NODE_ENV: '"production"'
//             }
//         }),
//         new webpack.optimize.UglifyJsPlugin({
//             compress: {
//                 warnings: false
//             }
//         }),
//         new webpack.optimize.OccurenceOrderPlugin()
//     ]
// } else {
//     module.exports.devtool = '#source-map'
// }