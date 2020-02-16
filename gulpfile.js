// Script: gulpfile.js
// by: William C. Canin

let gulp = require('gulp');
let uglify = require('gulp-uglify');
let sass = require('gulp-sass');
let mincss = require('gulp-csso');
let gulp_pug = require('gulp-pug');
let gulp_clean = require('gulp-clean');
let rename = require('gulp-rename');
let { spawn } = require('child_process');
let plumber = require('gulp-plumber');
let gulp_imagemin = require('gulp-imagemin');
let browserSync = require('browser-sync').create();

// load configurations.
const config = require('./config.json');


// copy files statics. error not exists
function clean_build() {
  return gulp
    .src('app/*', {read: false})
    .pipe(gulp_clean({force: true}))
}

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
function jquery_task() {
  return gulp
    .src('node_modules/jquery/dist/jquery.min.js')
    .pipe(gulp.dest('app/assets/vendor/jquery'))
}

// pug task
function pug_to_html() {
  return gulp
    .src('src/views/**/*.pug')
    .pipe(gulp_pug({pretty: false}))
    .pipe(gulp.dest('app/'))
}

// minify images task
function image_min() {
  return gulp
    .src('app/assets/images/**/*')
    .pipe(gulp_imagemin([
	        gulp_imagemin.gifsicle({ interlaced: true }),
	        gulp_imagemin.mozjpeg({ progressive: true }),
	        gulp_imagemin.optipng({ optimizationLevel: 5 }),
            gulp_imagemin.svgo({
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
										styles,
										minify_js,
										pug_to_html,
										bootstrap_style,
										bootstrap_js,
										jquery_task));

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
exports.clean = clean_build;
exports.statics = copy_static;
exports.styles = styles;
exports.js = minify_js;
exports.pug = pug_to_html;
exports.bootstrap_style = bootstrap_style;
exports.bootstrap_js = bootstrap_js;
exports.jquery = jquery_task;
exports.imagemin = image_min;
exports.serve = serve;
exports.build = build;
exports.default = build;
