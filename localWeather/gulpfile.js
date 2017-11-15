var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('default', function() {
  // place code for your default task here
  console.log('Hello world');
});

// Change destinations below
gulp.task('sass', function(){
  return gulp.src('site/CSS/style.scss')
    .pipe(sass()) // Using gulp-sass
    .pipe(gulp.dest('site/CSS'))
});
