"use strict";
const webpack = require('webpack');
const webpackServer = require("webpack-dev-server");
const path = require('path');

const config = require('./webpack.config.js');
const compiler = webpack(config);

const server = new webpackServer(compiler, {
    stats: {
        colors: true
    },
    hot: true,
    compress: true,
    contentBase: path.join(__dirname, "public"),
    headers: {
        "X-Server-Name": "WebPackServer-Demo"
    },
    clientLogLevel: "info",
    inline: true,
    port: 9800,

})
server.listen(9800);
