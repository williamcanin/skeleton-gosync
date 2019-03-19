// Script: Gulpfile.babel.js
// Dependencies: 
//          * Babel 7
//          * Gulp 4
//  by: William C. Canin

'use strict';

import gulp from 'gulp';
import sass from 'gulp-sass';
import minifyCSS from 'gulp-csso';
import pug from 'gulp-pug';
import del from 'del';
import { spawn } from 'child_process';
import rename from 'gulp-rename';
import fs from 'fs';
import eslint from 'gulp-eslint';
import plumber from 'gulp-plumber';
import uglify from 'gulp-uglify';
import browserSync from 'browser-sync';
import imagemin from 'gulp-imagemin';

let config = JSON.parse(fs.readFileSync('./config.json'));

function reload_server(){
    return browserSync.reload();
}

function url_server () {
    return spawn('python3', ['./lib/python/url.py', 'serve'], {stdio: 'inherit'})
}

function url_build () {
    return spawn('python3', ['./lib/python/url.py', 'build'], {stdio: 'inherit'})
}

gulp.task('clean:all', () =>
    del(['app/**/*',
        '!app',
        '!app/robots.txt',
        '!app/assets', 
        '!app/assets/images', 
        '!app/assets/images/**/*'
    ]) 
);

gulp.task('clean:css', () =>
    del(['app/assets/css/'])
);

gulp.task('clean:js', () =>
    del(['app/assets/js/'])
);

gulp.task('clean:html', () =>
    del(['app/**/*.html'])
);

gulp.task('pug', gulp.series('clean:html', () => 
    gulp.src(['src/templates/pages/**/*.pug'])
        .pipe(pug())
        .pipe(gulp.dest('app/'))
));

gulp.task('vendor', (done) => {

    gulp.src(['node_modules/bootstrap/scss/bootstrap.scss'])
        .pipe(plumber())
        .pipe(sass())
        .pipe(minifyCSS())
        .pipe(rename({ suffix: ".min" }))
        .pipe(gulp.dest('app/assets/vendor/bootstrap/css')),

    gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 
        'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'])
        .pipe(gulp.dest('app/assets/vendor/bootstrap/js')),

    gulp.src('node_modules/jquery/dist/jquery.min.js')
         .pipe(gulp.dest('app/assets/vendor/jquery'))

    done();
});

gulp.task('styles', gulp.series('clean:css', () =>
    gulp.src(['src/scss/**/*.scss'])
        .pipe(plumber())
        .pipe(sass())
        .pipe(minifyCSS())
        .pipe(rename({ suffix: ".min" }))
        .pipe(gulp.dest('app/assets/css'))
));

gulp.task('js', gulp.series('clean:js', () =>
    gulp.src(['src/js/**/*.js'])
        // Eslint (Default: disabled)
        // .pipe(eslint())
        // .pipe(eslint.format())
        // .pipe(eslint.failAfterError())
        .pipe(rename({ suffix: ".min" }))
        .pipe(uglify())
        .pipe(gulp.dest('app/assets/js'))
));

gulp.task('imagemin', () => 
    gulp.src(['app/assets/images/**/*'])
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(gulp.dest('app/assets/images'))
);

gulp.task('serve', gulp.series(url_server, 'imagemin','vendor', 'pug', 'js', 'styles', () => {
    browserSync.init({
        server: {
            baseDir: 'app/'
        },
        "port": config.server.port
    }),
    gulp.watch(config.watch, gulp.series('js', 'styles', 'pug')).on('change', reload_server)
}));

gulp.task('assets', gulp.series(['clean:all', 'imagemin', 'vendor', 'js', 'styles']));

gulp.task('build', gulp.series([url_build, 'imagemin', 'vendor', 'pug', 'js', 'styles']));
