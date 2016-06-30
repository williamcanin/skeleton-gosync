/*
File: gulpfile.js
Description: Task Manager.
License: MIT
By: William Canin
*/

'use strict';




/* LOAD PLUGINS
______________________________________________________________________________________ */

var gulp = require( 'gulp' ),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    cp = require('child_process'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    htmlmin = require('gulp-htmlmin'),
    imagemin = require('gulp-imagemin'),
    strip = require('gulp-strip-comments'),
    rimraf = require('gulp-rimraf'),
    browserSync = require('browser-sync').create(),
    taskListing = require('gulp-task-listing'),
    sourcemaps = require('gulp-sourcemaps');




/* VARIABLES FILES AND DIRECTORYS
______________________________________________________________________________________ */
var config = require('./config.json');




/* CLEAN BUILD
______________________________________________________________________________________ */

gulp.task('cleanbuild', function() {
 gulp.src(config.build.dir, { read: false })
   .pipe(rimraf())
   .pipe(notify({ message: 'Task "cleanbuild": Cleaning the compiled files. Done!' }));
});




/* COPY FILES: VENDOR.
______________________________________________________________________________________ */

gulp.task('copyfiles', function(){
    gulp.src(config.src.vendor.files)
      .pipe(gulp.dest(config.build.vendor.dir+''))
    gulp.src(config.src.txtFiles)
      .pipe(gulp.dest(config.build.dir+''))
});




/* CONCAT AND COMPRESS STYLESHEETS
______________________________________________________________________________________ */

    gulp.task('stylesheets', function () {
        gulp.src(config.src.scss.dir + '/main.scss')
            .pipe(plumber())
            // .pipe(sourcemaps.init())
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(rename('style.min.css'))
            // .pipe(sourcemaps.write())
            .pipe(gulp.dest(config.build.css.dir+''))
            .pipe(notify({ message: 'Task "stylesheets": Concatenation and compression of SASS for CSS. Done!' }));
    });




/* CONCAT AND COMPRESS JAVASCRIPTS
______________________________________________________________________________________ */
    gulp.task('javascripts', function() {
      gulp.src(config.src.js.files)
        .pipe(jshint())
        .pipe(concat('scripts.js'))
        .pipe(rename('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(config.build.js.dir+''))
        .pipe(notify({ message: 'Task "javascripts": Concatenation and compression javascripts. Done!' }));
    });





/* HTML MINIFY AND REMOVE COMMENTS
______________________________________________________________________________________ */

    gulp.task('htmlminify', function () {
       gulp.src(config.src.html.files)
        .pipe(strip())
        .pipe(htmlmin({
            collapseWhitespace: true
            ,minifyJS: true
            ,minifyURLs: true
            /*Array of regex'es that allow to ignore certain fragments, when matched:
             View Doc in: https://github.com/kangax/html-minifier
            */
            ,ignoreCustomFragments: [ /<%[\s\S]*?%>/, /<\?[\s\S]*?\?>/, /'<[\s\S]*?\/>'/, /"<[\s\S]*?\/>"/ ]
            ,html5: true
        }))
        .pipe(gulp.dest(config.build.dir+''))
        .pipe(notify({ message: 'Task "htmlminify": html minified and Removed comments. Done!' }));
    });




/* IMAGE MINIFY
______________________________________________________________________________________ */

    gulp.task('imagemin', function () {
        gulp.src(config.src.images.files)
            .pipe(imagemin())
            .pipe(gulp.dest(config.build.images.dir+''))
            .pipe(notify({ message: 'Task "imagemin": Minification pictures. Done!' }));
    });




/* BROWSER SYNC CONFIGURATION
______________________________________________________________________________________ */

    gulp.task('browser-sync', function() {
        browserSync.init({
            reloadDelay: 2000,
            port: config.browserSync.port+'',
            server: {
                baseDir: config.build.dir+''
            }
        });
    });



/* BROWSER SYNC RELOAD
______________________________________________________________________________________ */

    gulp.task('browser-sync-reload', function () {
        browserSync.reload();
    });




/* REBUILD WHEN IS CHANGED FILES
______________________________________________________________________________________ */

    gulp.task('watch-files', function () {
        gulp.watch(config.src.js.files , ['javascripts','browser-sync-reload']);
        gulp.watch(config.src.scss.files , ['stylesheets','browser-sync-reload']);
        gulp.watch(config.src.html.files , ['htmlminify','browser-sync-reload']);
    });





/* TASKS
______________________________________________________________________________________ */
    gulp.task('default', taskListing.withFilters(/:/));

    gulp.task('clean-build', [
        'cleanbuild'
    ]);

    gulp.task('build', [
        'copyfiles',
        'stylesheets',
        'javascripts',
        'htmlminify',
        'imagemin'
    ]);

    gulp.task('serve', [
        'copyfiles',
        'stylesheets',
        'javascripts',
        'htmlminify',
        'imagemin',
        'browser-sync',
        'watch-files'
    ]);