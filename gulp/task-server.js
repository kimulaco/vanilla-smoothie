module.exports = function (taskName, option) {
    'use strict';

    const gulp = require('gulp');
    const browserSync = require('browser-sync').create();

    gulp.task(taskName, () => {
        browserSync.init({
            server: {
                baseDir: option.src
            },
            open: option.option.open || false
        });

        gulp.watch(option.watch).on('change', browserSync.reload);
    });
};
