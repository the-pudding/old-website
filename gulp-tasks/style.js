const gulp = require('gulp');
const stylus = require('gulp-stylus');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const browserSync = require('browser-sync');
const plumber = require('gulp-plumber');
const combineMq = require('gulp-combine-mq');
const cleanCSS = require('gulp-clean-css');
const report = require('../report-error.js');

const src = 'styles/config.styl';

// compile styl to css and autoprefix
gulp.task('style-dev', () => {
  gulp
    .src(src)
    .pipe(plumber({ errorHandler: report }))
    .pipe(stylus())
    .pipe(
      autoprefixer({
        browsers: ['last 4 versions']
      })
    )
    .pipe(combineMq())
    .pipe(cleanCSS())
    .pipe(rename('bundle.css'))
    .pipe(gulp.dest('dev/common/css'))
    .pipe(browserSync.stream({ match: '**/*.css' }));
});
