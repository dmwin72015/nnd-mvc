var gulp = require('gulp');
var gutil = require("gulp-util");
var webpack = require('webpack');
var wpConf = require('./public-src/webpackPlugin/webpack.conf');
var myPlug = require('./public-src/gulpPlugin/xin-ungly.js');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var debug = require('gulp-debug');
var glob = require("glob");



gulp.task('default', function () {

    console.log(wpConf('dev'));

})

gulp.task('bulid:dev', function (callback) {
    webpack(wpConf('dev'), function (err, stats) {
        gutil.log("[bulid:dev]", stats.toString({
            colors: true
        }));
        callback();
    });


});

gulp.task('bulid:php', function (cb) {
    webpack(wpConf('php'), function (err, stats) {
        cb();
    });
});



var base = '/xin/project/www/trunk/application/views';
var entry = [base + '/assets_src/home.js.html'];
var dest = base + '/assets/';
var ignor = ['!(_search|_search_container|transfer|search).js.html'];

var all = ignor.concat(entry);

gulp.task('www-home', function (cb) {
    gulp.src(all)
        .pipe(plumber())
        .pipe(myPlug.remove())
        .pipe(uglify())
        .pipe(myPlug.add())
        .pipe(gulp.dest(dest));
});

var entry2 = ['/xin/project/m/trunk/assets/js/src/fix_url_params.src.js'];
var dest2 = '/xin/project/m/trunk';
gulp.task('tm-js', function (cb) {
    gulp.src(entry2)
        .pipe(uglify())
        .pipe(gulp.dest(dest2));
});

var entry3 = ['/xin/project/www/trunk/assets/js/src/fix_url_params.src.js'];
var dest3 = '/xin/project/www/trunk/';
gulp.task('tw-js', function (cb) {
    gulp.src(entry3)
        .pipe(uglify())
        .pipe(gulp.dest(dest3));
});


//分支

// var path = ['/xin/project/www/jira-6955/application/views/assets_src/_sidebar.js.html'];
// var target = '/xin/project/www/jira-6955/application/views/assets/';
//application/views/assets_src/quotation/evaluate.js.html
// application/views/assets_src/quotation/index.js.html
// application/views/assets_src/quotation/list.js.html

var files = require('./public-src/gulpPlugin/files');
var entry_bran = files;
var dest_bran = '/xin/project/www/trunk/application/views/assets/cardetail';

gulp.task('br-js', function (cb) {
    gulp.src(files)
        .pipe(plumber())
        .pipe(myPlug.remove())
        .pipe(uglify())
        .pipe(myPlug.add())
        .pipe(debug({title:'XIN:'}))
        .pipe(gulp.dest(dest_bran));
});

var ts = require("gulp-typescript");
var typeScript = ['public_new/typeScript/*.ts'];
gulp.task('typescript', function () {
    gulp.src(typeScript)
        .pipe(ts({
            noImplicitAny: true,
            outFile: 'output.js'
        }))
        .pipe(gulp.dest('public_new/typeScript/'));
});


// var watcher = gulp.watch(['./gulpfile.js'], ['bulid:dev']);
