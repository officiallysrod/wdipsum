var gulp         = require('gulp');
var ngAnnotate   = require('gulp-ng-annotate');
var uglify       = require('gulp-uglify');
var concat       = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var sass         = require('gulp-sass');
var minifyCSS    = require('gulp-minify-css');
var minifyHTML   = require('gulp-minify-html');
var notify       = require('gulp-notify');
var inject       = require('gulp-inject');

gulp.task('process-scss', function(){
    gulp.src('public/scss/*.scss')
        .pipe(sass({errLogToConsole: true}))
        .pipe(autoprefixer('last 2 versions'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('public/build/css/'))
        .pipe(notify('SASS compiled, prefixed, and minified!'))
});

gulp.task('angular', function(){
    gulp.src('public/angular_app/*.js')
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest('public/build/angular_app/'))
        .pipe(notify('Angular annotated, uglified, and concatenated!'));
});

gulp.task('process-html', function(){
    var target = gulp.src('public/views/index.html');
    var sources = gulp.src(['public/build/angular_app/*.js', 'public/build/css/*.css'], {read: false});

    target.pipe(inject(sources, {relative: true, ignorePath: '../build', addPrefix: '..'}))
          .pipe(gulp.dest('public/views'))
          .pipe(minifyHTML())
          .pipe(gulp.dest('public/build/views/'))
          .pipe(notify('HTML sources injected and then minified!'));
});

gulp.task('watch', function(){
    gulp.watch('public/angular_app/*.js', ['angular']);
    gulp.watch('public/scss/*.scss', ['process-scss']);
    gulp.watch('public/views/index.html', ['process-html']);
});

gulp.task('default', ['process-scss', 'angular', 'process-html', 'watch']);
