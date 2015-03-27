var gulp = require('gulp');

var del = require('del');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var reactify = require('reactify');
var webserver = require('gulp-webserver');
var deploy = require('gulp-gh-pages');

var paths = {
  scripts: './src/js/**/*.@(js|jsx)',
  js_main: './src/js/main.jsx',
  html: './src/**/*.html',
  images: './src/**/*.png',
  css: './src/css/*.css',
  build_css: './build/css',
  build_files: './build/**/*',
  build_dir: './build'
};

gulp.task('clean', function(cb) {
  del(['build'], cb);
});

gulp.task('build:scripts', function(){
  var b = browserify({
    extensions: ['.jsx'],
    debug: true
  });
  b.transform(function(f){ return reactify(f, {es6: true})}); // use the reactify transform
  b.add(paths.js_main);
  return b.bundle()
    .pipe(source('js/main.js'))
    .pipe(gulp.dest(paths.build_dir));
});

gulp.task('build:html', function(){
  gulp.src(paths.html)
    .pipe(gulp.dest(paths.build_dir));
});

gulp.task('build:css', function(){
  gulp.src(paths.css)
    .pipe(gulp.dest(paths.build_css));
});

gulp.task('build:images', function(){
  gulp.src(paths.images)
    .pipe(gulp.dest(paths.build_dir));
});

gulp.task('watch', function(){
  gulp.watch(paths.scripts, ['build:scripts']);
  gulp.watch(paths.other_scripts, ['build:scripts']);
  gulp.watch(paths.html, ['build:html']);
  gulp.watch(paths.css, ['build:css']);
  gulp.watch(paths.images, ['build:images']);

});

gulp.task('webserver', ['build'], function() {
  gulp.src(paths.build_dir)
    .pipe(webserver());
});

gulp.task('ghPages', ['build'], function () {
  return gulp.src(paths.build_files)
    .pipe(deploy());
});

gulp.task('build', ['build:scripts', 'build:html', 'build:images', 'build:css']);
gulp.task('default', ['build', 'webserver', 'watch']);
gulp.task('deploy', ['build', 'ghPages']);
