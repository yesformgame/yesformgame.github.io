var gulp 		= require('gulp');
var uglify 		= require('gulp-uglify');
var less 		= require('gulp-less');
var minifyCSS 	= require('gulp-csso');
var watch 		= require('gulp-watch');
var livereload	= require('gulp-livereload');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var serve = require('gulp-serve');

gulp.task( 'serve', serve({
    port: 3000
}));

gulp.task( 'js', function(){
  return gulp.src([ 'scripts/vendor/*.js', 'scripts/src/*.js' ])
  	.pipe(sourcemaps.init())
	  .pipe(concat( 'main.js' ))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest( 'scripts' ))
    .pipe(livereload());
});

gulp.task( 'css', function(){
  return gulp.src( [ 'styles/src/*.less', 'styles/src/*.css' ] )
    .pipe(concat( 'main.css' ))
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(gulp.dest( 'styles' ))
    .pipe(livereload());
});

gulp.task( 'watch', function() {

	livereload.listen();
	gulp.watch( [ 'styles/src/*.less', 'styles/src/*.css' ], [ 'css' ] );
	gulp.watch( [ 'scripts/src/*.js', 'scripts/vendor/*.js' ], [ 'js' ] );

});

gulp.task('default', [ 'watch', 'serve' ]);