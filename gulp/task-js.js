module.exports = function (taskName, option) {
    'use strict';

    const gulp = require('gulp');
    const uglify = require('gulp-uglify');
    const rename = require('gulp-rename');
    const plumber = require('gulp-plumber');

    gulp.task(taskName, [`${taskName}.minify`], () => {
        gulp.watch(option.watch, [`${taskName}.minify`]);
    });

    gulp.task(`${taskName}.minify`, () => {
        gulp.src(option.src)
            .pipe(plumber())
            .pipe(gulp.dest(option.dest))
            .pipe(uglify())
            .pipe(rename({
                extname: '.min.js'
            }))
            .pipe(gulp.dest(option.dest));
    });
};
