const gulp = require('gulp');
const config = require('./gulpconfig.js');
const presetName = process.argv[2] || 'default';
const preset = config.task[presetName];
const runTaskList = Object.keys(preset);

gulp.task(presetName, runTaskList);

runTaskList.forEach((taskName) => {
    require(preset[taskName].module)(taskName, preset[taskName]);
});
