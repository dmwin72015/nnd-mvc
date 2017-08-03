var path = require('path');
var webpack = require('webpack');
var moment = require('moment');
var glob = require('glob');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var libfiles = glob.sync(path.join(__dirname, 'appSrc/lib/*.js'));
var rootPath = '/xin/project/note.yonglinchen.com/static';
var baseJsPath = path.join(rootPath, 'js');
var baseCssPath = path.join(rootPath, 'css');
var baseImgPath = path.join(rootPath, 'img');
var baseMapPath = path.join(rootPath, 'maps');

module.exports = {
    entry: {
        // day: ['./appSrc/js30/day12.js', './appSrc/js30/zoom.js'],
        lib: ['./appSrc/lib/lib.js', './appSrc/lib/keycode.js', './appSrc/lib/cornify.js'],
        login: ['./appSrc/login/login.js'],
        dashboard: ['./appSrc/login/dashboard.js'],
        // home: ['./appSrc/main.js', './appSrc/mod1.js', './appSrc/mod2.js', './appSrc/mod3.js'],
        vote: ['./appSrc/less/toupiao.less','./appSrc/less/common.less']
    },
    output: {
        // path: __dirname + '/public_back',
        path: rootPath,
        filename: 'js/[name].bundle.js'
        // sourceMapFilename: "maps/[file].map"
    },
    module: {
        rules: [{
            test: /\.(css|less)$/,
            use: ExtractTextPlugin.extract({
                use: ['css-loader', 'less-loader']
            })
        }, {
            test: /\.(png|jpg|gif)$/,
            loader: 'url-loader?limit=8192&name=/static/img/[name].[ext]'
        }]
    },
    stats: {
        colors: true
    },
    // devtool: 'source-map',
    plugins: [
        // new webpack.optimize.UglifyJsPlugin({
        //     comoressor: {
        //         warnings: true
        //     }
        // }),
        new webpack.BannerPlugin(moment().format('YYYY-MM-DD HH:mm:ss') + '-This file is created by 董敏'),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['lib'],
            filename: 'js/[name].js'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: 'commons',
            filename: 'js/[name].js',
            mixChunks: 2
        }),
        new ExtractTextPlugin('css/tp-[name].css'),
        new webpack.SourceMapDevToolPlugin({
            filename: "maps/[file].map"
        })
    ]
    //, devServer: {
    //     inline: true,
    // }
};
