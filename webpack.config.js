const path = require('path');
const webpack = require('webpack');
const moment = require('moment');
const glob = require('glob');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = {
    context: path.resolve(__dirname, "public-src"), //base path 基准路径
    entry: {
        main: './main.js',
        vendor: ['lodash', 'md5'],
        // lib: ['./public-src/modules/alert.js', './public-src/modules/print.js']
        article: ['./vueTemplate/add.vue', './vueTemplate/list.vue', './vueTemplate/detail.vue']
    },

    output: {
        path: path.resolve(__dirname, 'public-src/dist'), //这里必须使用绝对路径
        // path:'./dist',
        // publicPath: '/nnd-mvc/public-src/dist/',
        publicPath: '/', //地址栏里的访问路径
        filename: '[name].[chunkhash:8].js',
        // chunkFilename: '[name].bundle.js'
    },

    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    vue: {
                        css: ExtractTextPlugin.extract({
                            use: 'css-loader',
                            fallback: 'vue-style-loader'
                        })
                    }
                }
            }, {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    presets: ['env']
                },
                exclude: /node_modules/
            }, {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[hash:8].[ext]'
                }
            }, {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        outputPath: 'fonts/',
                        name: '[hash].[ext]'
                    }
                }]
            }

        ]
    },
    plugins: [
        // new ExtractTextPlugin("style.css"),
        new CleanWebpackPlugin(['./public-src/dist']),
        new HtmlWebpackPlugin({
            filename: 'main.html',
            template: './index.html',
            hash: false,
            inject: true,
            minify: {
                collapseWhitespace: true,
                minifyCSS: true,
                collapseInlineTagWhitespace: true
            },
            showErrors: true
        }),

        // new webpack.HashedModuleIdsPlugin(),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendor', // Specify the common bundle's name.
        //     minChunks: Infinity
        // }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'article',
            filename:'[name].[hash].js'
        }),
        new ManifestPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            // sourceMap: 'source-map'
        })
        // new webpack.HotModuleReplacementPlugin()
    ],
    performance: {
        hints: "error"
    }
    // devtool: 'source-map'
    // devtool: 'inline-source-map',
    // devServer:{
    //     contentBase: './dist/',
    //     port:'9011',
    //     stats:'verbose',
    //     hot: true
    // }
    // devtool: '#eval-source-map'
};