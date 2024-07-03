var gulp 		= require('gulp');
var uglify 		= require('gulp-uglify');
var less 		= require('gulp-less');
var minifyCSS 	= require('gulp-csso');
var watch 		= require('gulp-watch');
var livereload	= require('gulp-livereload');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var prepack = require('gulp-prepack');
var serve = require('gulp-serve');
var pump = require('pump');

gulp.task( 'serve', serve({
    port: 3000,
    hostname: '192.168.4.30'
    // hostname: 'localhost'
}));

gulp.task( 'js', function( cb ){
  // pump([

  //     gulp.src([ 'scripts/vendor/*.js', 'scripts/src/*.js', 'scripts/src/script.js'  ]),
  //     sourcemaps.init(),
  //     uglify(),
  //     concat( 'main.js' ),
  //     sourcemaps.write(),
  //     gulp.dest( 'scripts' ),
  //     livereload()

  // ], cb)

  // });
  return gulp.src( [ 'scripts/vendor/*.js', 'scripts/src/*.js', 'scripts/src/script.js' ] )
      .pipe(sourcemaps.init())
      // .pipe(prepack({
      //   sourceMaps: true,
      //   }))
      .pipe(uglify())
      .pipe(concat( 'main.js' ))
      .pipe(sourcemaps.write('maps'))
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