module.exports = function (taskName, option) {
    'use strict';

    const path = require('path');
    const gulp = require('gulp');
    const rollup = require('gulp-rollup');
    const uglify = require('gulp-uglify');
    const header = require('gulp-header');
    const rename = require('gulp-rename');
    const plumber = require('gulp-plumber');
    const license = require(path.join(process.cwd(), option.option.license));

    gulp.task(taskName, [`${taskName}.minify`], () => {
        gulp.watch(option.watch, [`${taskName}.minify`]);
    });

    gulp.task(`${taskName}.minify`, () => {
        gulp.src(option.src)
            .pipe(plumber())
            .pipe(rollup(option.option.rollup))
            .pipe(header(license))
            .pipe(gulp.dest(option.dest))
            .pipe(uglify())
            .pipe(header(license))
            .pipe(rename({
                extname: '.min.js'
            }))
            .pipe(gulp.dest(option.dest));
    });
};
