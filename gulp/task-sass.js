module.exports = function (taskName, option) {
    'use strict';

    const gulp = require('gulp');
    const gulpIf = require('gulp-if');
    const sass = require('gulp-sass');
    const postcss = require('gulp-postcss');
    const csscomb = require('gulp-csscomb');
    const clean = require('postcss-clean');
    const packageImporter = require('node-sass-package-importer');

    option.option.sass.importer = packageImporter({
        extensions: [
            '.scss',
            '.css'
        ]
    });

    let getPostcssOption = function () {
        let postcssOption = [];

        if (
            Array.isArray(option.option.autoprefixer) &&
            option.option.autoprefixer.length > 0
        ) {
            let autoprefixer = require('autoprefixer');

            postcssOption.push(autoprefixer(option.option.autoprefixer));
        }

        if (option.option.mqpacker) {
            let mqpacker = require('css-mqpacker');

            postcssOption.push(mqpacker());
        }

        return postcssOption;
    };

    gulp.task(taskName, [`${taskName}.compile`], () => {
        gulp.watch(option.watch, [`${taskName}.compile`]);
    });

    gulp.task(`${taskName}.compile`, () => {
        gulp.src(option.src)
            .pipe(sass(option.option.sass).on('error', sass.logError))
            .pipe(postcss(getPostcssOption()))
            .pipe(gulpIf(!!option.option.csscomb, csscomb()))
            .pipe(gulpIf(!!option.option.minify, postcss([clean()])))
            .pipe(gulp.dest(option.dest));
    });
};
