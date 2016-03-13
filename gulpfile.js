'use strict';

const gulp = require('gulp');
const ts = require('gulp-typescript');
const less = require('gulp-less');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const historyFallback = require('connect-history-api-fallback');

const tsProject = ts.createProject('tsconfig.json');

const paths = {
  base: './',
  scripts: 'app/**/*.ts',
  styles: 'app/**/*.less',
  templates: 'app/**/*.html'
};

gulp.task('start', ['watch', 'browser-sync']);

gulp.task('build', [
  'ts',
  'less'
]);

gulp.task('watch', ['build'], () => {
  gulp.watch(paths.scripts, ['ts'], browserSync.reload);
  gulp.watch(paths.styles, ['less']);
});

gulp.task('browser-sync', function() {
  browserSync.init({
    injectChanges: false,
    files: ['./**/*.{html,htm,js,css}'],
    server: {
      baseDir: paths.base,
      middleware: [
        historyFallback({'index': '/index.html'})
      ]
    }
  });
});

gulp.task('less', () => {
  return gulp
    .src(paths.styles, {
      base: paths.base
    })
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(''))
    .pipe(browserSync.stream());
});

gulp.task('ts', () => {
  let result = tsProject
    .src(paths.scripts)
    .pipe(sourcemaps.init())
    .pipe(ts(tsProject));

  return result.js
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(''));
});