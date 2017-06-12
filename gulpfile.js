var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('css', function() {
  return gulp.src('./app/css/*.css')
    .pipe(concat('index.css'))
    .pipe(gulp.dest('./app/'))
});

gulp.task('watch', function(){
  gulp.watch('app/css/*.css', ['css']);
})

gulp.task('default', [ 'css' ]);