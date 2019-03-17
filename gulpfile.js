const gulp = require('gulp');
const sass = require('gulp-sass');
const minifyCSS = require('gulp-csso');
const pug = require('gulp-pug');
const del = require('del');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();
const config = {
    watch:[
        "src/scss/*.scss",
        "src/js/*.js",
        "src/templates/**/*.pug"
    ]
}
const site_root = 'app/';

function reload(){
    return browserSync.reload();
}

// gulp.task('clean:all', function () {
//     return del.sync(['app/**', '!app', '!app/assets/images/text.txt'])
// });

gulp.task('clean:css', function () {
    return del([site_root + 'assets/css/'])
});

gulp.task('clean:js', function () {
    return del([site_root + 'assets/js/'])
});

gulp.task('clean:html', function () {
    return del([site_root + '**/*.html'])
});

gulp.task('clean:vendor', function() {
    return del([site_root + 'assets/vendor'])
});

gulp.task('pug', gulp.series('clean:html', function () {
    return gulp.src(['src/templates/pages/**/*.pug'])
      .pipe(pug())
      .pipe(gulp.dest(site_root))
}));

gulp.task('bootstrap:css', function() {
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss'])
    .pipe(sass())
    .pipe(minifyCSS())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest(site_root + 'assets/vendor/bootstrap/css'));
});

gulp.task('bootstrap:js', function() {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.js', 
        'node_modules/bootstrap/dist/js/bootstrap.bundle.js']
    )
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest(site_root + 'assets/vendor/bootstrap/js'));
});

gulp.task('jquery', function() {
    return gulp.src('node_modules/jquery/dist/jquery.js')
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest(site_root + 'assets/vendor/jquery'))
});

gulp.task('styles', gulp.series('clean:css', function () {
  return gulp.src(['src/scss/**/*.scss'])
    .pipe(sass())
    .pipe(minifyCSS())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest(site_root + 'assets/css'));
}));

gulp.task('js', gulp.series('clean:js', function () {
    return gulp.src(['src/js/**/*.js'], { sourcemaps: true }
    )
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest(site_root + 'assets/js', { sourcemaps: true }));
}));

gulp.task('serve', gulp.series(['bootstrap:css', 'bootstrap:js', 'jquery', 'pug', 'js', 'styles'], function (){
    browserSync.init({
        server: {
            baseDir: site_root
        }
    });
    
    gulp.watch(config.watch, gulp.series('js', 'styles', 'pug')).on('change', reload);
}));

gulp.task('clean:all', gulp.series(['clean:css', 'clean:js', 'clean:html', 'clean:vendor']));
gulp.task('build', gulp.series(['bootstrap:css', 'bootstrap:js', 'jquery', 'pug', 'js', 'styles']));