var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('default', function() {
  // place code for your default task here
  gulp.task('sass', function(){
    return gulp.src('source-files')
      .pipe(sass()) // Using gulp-sass
      .pipe(gulp.dest('CSS/styles.css'))
  });
});
