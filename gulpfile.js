// Script: gulpfile.js
// by: William C. Canin

let gulp = require('gulp');
let uglify = require('gulp-uglify');
let sass = require('gulp-sass');
let mincss = require('gulp-csso');
let pug = require('gulp-pug');
let del = require('del');
let rename = require('gulp-rename');
let { spawn } = require('child_process');
let fs = require('fs');
let plumber = require('gulp-plumber');
let imagemin = require('gulp-imagemin');
let browserSync = require('browser-sync').create();

// load configurations.
let config = JSON.parse(fs.readFileSync('./config.json'));

// copy files statics
function copy_static() {
  return gulp
    .src('src/static/**/*')
    .pipe(gulp.dest('app/'))
}

// js task
function minify_js() {
  return gulp
    .src('src/js/**/*.js')
    .pipe(rename({ suffix: ".min" }))
    .pipe(uglify())
    .pipe(gulp.dest('app/assets/js'))
}

// styles task
function styles() {
  return gulp
    .src('src/scss/style.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(mincss())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest('app/assets/css'))
}

// vendor bootstrap style task
function bootstrap_style() {
  return gulp
    .src(['node_modules/bootstrap/scss/bootstrap.scss',
    	'node_modules/bootstrap/scss/bootstrap-reboot.scss'])
    .pipe(plumber())
    .pipe(sass())
    .pipe(mincss())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest('app/assets/vendor/bootstrap/css'))
}

// vendor bootstrap style task
function bootstrap_js() {
  return gulp
    .src(['node_modules/bootstrap/dist/js/bootstrap.min.js',
    	'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'])
    .pipe(gulp.dest('app/assets/vendor/bootstrap/js'))
}

// vendor jquery task
function jquery() {
  return gulp
    .src('node_modules/jquery/dist/jquery.min.js')
    .pipe(gulp.dest('app/assets/vendor/jquery'))
}

// pug task
function pug_to_html() {
  return gulp
    .src('src/views/**/*.pug')
    .pipe(pug({pretty: false}))
    .pipe(gulp.dest('app/'))
}

// minify images task
function image_min() {
  return gulp
    .src('app/assets/images/**/*')
    .pipe(imagemin([
	        imagemin.gifsicle({ interlaced: true }),
	        imagemin.mozjpeg({ progressive: true }),
	        imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
    .pipe(gulp.dest('app/assets/images'))
}

// function that executes Python script to change url to local server.
function url_server () {
    return spawn('python', 
                  ['./lib/python/runtime/change_url.py',
                   'serve'], {stdio: 'inherit'})
}

// function that executes Python script to change url to web server.
function url_build () {
    return spawn('python', 
                  ['./lib/python/runtime/change_url.py', 
                   'build'], {stdio: 'inherit'})
}

// browser-sync
function browserSync_reload(done) {
  browserSync.reload();
  done();
}

function browserSync_server(done) {
  browserSync.init({
    server: {
      baseDir: 'app/'
    },
    "port": config.server.port
  });
  done();
}

// define tasks
const build = gulp.series(gulp.parallel(url_build,
										copy_static,
										minify_js,
										pug_to_html,
										bootstrap_style,
										bootstrap_js,
										jquery));

// watch changed
const watch = () => gulp.watch(config.watch,
							   gulp.series(copy_static,
							   			   styles,
							   			   minify_js,
							   			   pug_to_html,
							   	           browserSync_reload));

// start the server
const serve = gulp.series(build, url_server, browserSync_server, watch);

// export tasks
exports.copy_static = copy_static;
exports.styles = styles;
exports.minify_js = minify_js;
exports.pug_to_html = pug_to_html;
exports.bootstrap_style = bootstrap_style;
exports.bootstrap_js = bootstrap_js;
exports.jquery = jquery;
exports.image_min = image_min;
exports.serve = serve;
exports.build = build;
exports.default = build;
