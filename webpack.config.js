const path = require('path');
const webpack = require('webpack');
const moment = require('moment');
const glob = require('glob');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = {
    entry: './public-src/main.js',

    output: {
        path: path.resolve(__dirname, 'public-src/dist'),
        publicPath: '/nnd-mvc/public-src/dist/',
        filename: '[name].bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    vue: {
                        css: ExtractTextPlugin.extract({
                            use: 'css-loader',
                            fallback: 'vue-style-loader' // <- this is a dep of vue-loader, so no need to explicitly install if using npm3
                        })
                    }
                }
            }, {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }, {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }, {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath:'fonts/',
                            name:'[hash].[ext]'
                        }
                    }
                ]
            }

        ]
    },
    plugins: [
        new ExtractTextPlugin("style.css"),
        new CleanWebpackPlugin(['public-src/dist']),
        new HtmlWebpackPlugin({
            filename: 'main.html',
            template: './public-src/index.html',
            hash: true,
            inject: true,
            minify: {
                collapseWhitespace: true,
                minifyCSS: true,
                collapseInlineTagWhitespace: true
            },
            showErrors: true
        }),
        new ManifestPlugin()
    ]
    // devtool: '#eval-source-map'
};
