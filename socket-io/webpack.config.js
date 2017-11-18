const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const publicPath = '/';
const hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

module.exports = {
    entry: {
        index: ['./src/index.js']
        // vendor: ['reqwest']
    },
    output: {
        path: path.resolve(__dirname, './public'),
        publicPath: publicPath,
        filename: '[name].[hash:6].js'
    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                // loader: 'css-loader'
                loader: ExtractTextPlugin.extract("css-loader")
            },
            {
                test: /\.less$/,
                // use: ['css-loader', 'less-loader']
                use: ExtractTextPlugin.extract(['css-loader', 'less-loader'])
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    // vue: {
    //     loaders: {
    //         css: ExtractTextPlugin.extract('vue-style-loader', 'css-loader', 'less-loader')
    //     }
    // },
    devServer: { //webpack-dev-server配置
        contentBase: path.join(__dirname, "dist"),
        historyApiFallback: true, //不跳转
        noInfo: true,
        inline: true, //实时刷新,
        port: 9090,
        open: false, //不打开浏览器,
        compress: true, //Gzip 打开
        hot: true,
        hotOnly: true
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'css/[name].[chunkhash:5].css',
            allChunks: true
        }),
        // new CleanWebpackPlugin(['./dist']),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common', // Specify the common bundle's name.
            filename:'[name].[hash:5].js',
            minChunks:2
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['reqwest'], // Specify the common bundle's name.
            filename:'[name].[hash:5].js'
        }),
        new HtmlWebpackPlugin({//new 一个这个插件的实例，并传入相关的参数,
            template: __dirname + "/src/views/home-pack.html",
            // filename: __dirname + '/views/main.html'
        }),
        new HtmlWebpackPlugin({
            template: __dirname + "/src/views/server.html", //new 一个这个插件的实例，并传入相关的参数
            filename: __dirname + '/views/server.html',
            chunks:['common']
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devtool: '#eval-source-map',
    watch: true
}
//生产环境
if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}