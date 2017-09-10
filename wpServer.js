/**
 * Created by mjj on 2017/8/29.
 */
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    stats: {
        colors: true
    },
    lazy:false,
    watchOptions:{
        aggregateTimeout: 300,
        // poll: true,
        ignored: /node_modules/,
        poll:1000
    }
}));

// Serve the files on port 3000.
app.listen(9011, function () {
    console.log('Example app listening on port 9011!\n');
});