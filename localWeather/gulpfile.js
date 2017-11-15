var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('default', function() {
  // default task code
  console.log('Hello world');
});

// Compile Sass files to CSS
gulp.task('sass', function(){
  return gulp.src('site/CSS/*.scss')
    .pipe(sass()) // Using gulp-sass
    .pipe(gulp.dest('site/CSS'))
});

//Watch files for changes
gulp.task('watch', function() {
  gulp.watch('site/CSS/*.scss', ['sass']); //['sass'] is the task to be run when changes happen
})