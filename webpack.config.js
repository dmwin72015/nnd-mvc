const path = require('path');
const webpack = require('webpack');
const moment = require('moment');
const glob = require('glob');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    context: path.resolve(__dirname, "public-src"), //base path 基准路径
    entry: {
        main: './main.js'
        // lib: ['lodash', 'md5', 'quill']
        // template: ['./components/add.vue', './components/404.vue', './components/detail.vue', './components/list.vue']
        // lib: ['./public-src/modules/alert.js', './public-src/modules/print.js']
        // article: './vueTemplate',
        // vendor:['vue','vue-loader']
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src')
        },
        symlinks: false
    },
    output: {
        path: path.resolve(__dirname, 'public-src/dist'), //这里必须使用绝对路径
        // path:'./dist',
        // publicPath: '/nnd-mvc/public-src/dist/',
        publicPath: '/', //地址栏里的访问路径
        filename: '[name].[chunkhash:8].bundle.js'
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
            filename: 'index.html',
            template: './index.html',
            hash: false,
            inject: true,
            minify: {
                collapseWhitespace: false,
                minifyCSS: true,
                collapseInlineTagWhitespace: true
            },
            showErrors: true
        }),

        // new webpack.HashedModuleIdsPlugin(),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: ['lib', 'manifest'], // Specify the common bundle's name.
        //     minChunks: Infinity
        // }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            // filename:'[name].[hash].js'
            minChunks: Infinity
        }),
        // new ManifestPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: 'source-map'
        })
        // new webpack.HotModuleReplacementPlugin()
    ],
    // performance: {
    //     hints: "error"
    // },
    devtool: 'source-map'
    // devtool: 'inline-source-map',
    // devServer:{
    //     contentBase: './dist/',
    //     port:'9011',
    //     stats:'verbose',
    //     hot: true
    // }
    // devtool: '#eval-source-map'
};