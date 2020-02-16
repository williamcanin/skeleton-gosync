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

// Load configurations.
let config = JSON.parse(fs.readFileSync('./config.json'));

// Js task
function minify_js() {
  return gulp
    .src('src/js/**/*.js')
    .pipe(rename({ suffix: ".min" }))
    .pipe(uglify())
    .pipe(gulp.dest('app/assets/js'))
}

// Styles task
function styles() {
  return gulp
    .src('src/scss/style.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(mincss())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest('app/assets/css'))
}

// Vendor bootstrap style task
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

// Vendor bootstrap style task
function bootstrap_js() {
  return gulp
    .src(['node_modules/bootstrap/dist/js/bootstrap.min.js',
    	'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'])
    .pipe(gulp.dest('app/assets/vendor/bootstrap/js'))
}

// Vendor jquery task
function jquery() {
  return gulp
    .src('node_modules/jquery/dist/jquery.min.js')
    .pipe(gulp.dest('app/assets/vendor/jquery'))
}

// Pug task
function pug_to_html() {
  return gulp
    .src('src/views/**/*.pug')
    .pipe(pug({pretty: false}))
    .pipe(gulp.dest('app/'))
}

// Pug task
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

// Browser Sync
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
const build = gulp.series(gulp.parallel(minify_js,
										pug_to_html,
										bootstrap_style,
										bootstrap_js,
										jquery));

// watch changed
const watch = () => gulp.watch(config.watch,
							   gulp.series(styles,
							   			   minify_js,
							   			   pug_to_html,
							   	           browserSync_reload));

// 
const server = gulp.series(build, browserSync_server, watch);

// export tasks
exports.styles = styles;
exports.minify_js = minify_js;
exports.pug_to_html = pug_to_html;
exports.bootstrap_style = bootstrap_style;
exports.bootstrap_js = bootstrap_js;
exports.jquery = jquery;
exports.image_min = image_min;
exports.server = server;
exports.build = build;
exports.default = build;
