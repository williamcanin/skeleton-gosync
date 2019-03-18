// Script: Gulpfile.babel.js
// Dependencies: 
//          * Babel 7
//          * Gulp 4
//  by: William C. Canin

import gulp from 'gulp';
import sass from 'gulp-sass';
import minifyCSS from 'gulp-csso';
import pug from 'gulp-pug';
import del from 'del';
import rename from 'gulp-rename';
import browserSync from 'browser-sync';

let config = {
    watch:[
        "src/scss/*.scss",
        "src/js/*.js",
        "src/templates/**/*.pug"
    ]
}

function reload_server(){
    return browserSync.reload_server();
}

gulp.task('clean:all', () =>
    del(['app/**/*',
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
        .pipe(sass())
        .pipe(minifyCSS())
        .pipe(rename({ suffix: ".min" }))
        .pipe(gulp.dest('app/assets/vendor/bootstrap/css')),

    gulp.src(['node_modules/bootstrap/dist/js/bootstrap.js', 
        'node_modules/bootstrap/dist/js/bootstrap.bundle.js'])
        .pipe(rename({ suffix: ".min" }))
        .pipe(gulp.dest('app/assets/vendor/bootstrap/js')),

    gulp.src('node_modules/jquery/dist/jquery.js')
        .pipe(rename({ suffix: ".min" }))
        .pipe(gulp.dest('app/assets/vendor/jquery'))

    done();
});

gulp.task('styles', gulp.series('clean:css', () =>
    gulp.src(['src/scss/**/*.scss'])
        .pipe(sass())
        .pipe(minifyCSS())
        .pipe(rename({ suffix: ".min" }))
        .pipe(gulp.dest('app/assets/css'))
));

gulp.task('js', gulp.series('clean:js', () =>
    gulp.src(['src/js/**/*.js'], { sourcemaps: true })
        .pipe(rename({ suffix: ".min" }))
        .pipe(gulp.dest('app/assets/js', { sourcemaps: true }))
));

gulp.task('serve', gulp.series('vendor', 'pug', 'js', 'styles', () => {
    browserSync.init({
        server: {
            baseDir: 'app/'
        }
    }),  
    gulp.watch(config.watch, gulp.series('js', 'styles', 'pug')).on('change', reload_server)
}));


gulp.task('build', 
        gulp.series(['vendor', 'pug', 'js', 'styles'
]));
