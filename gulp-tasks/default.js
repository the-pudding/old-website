const gulp = require('gulp');
const runSequence = require('run-sequence');

// Default task to be run with `gulp`
gulp.task('default', ['dev'], () => {
  gulp.watch('styles/**/*.styl', ['style-dev']);
});

gulp.task('dev', () => {
  runSequence('style-dev', 'browser-sync');
});
