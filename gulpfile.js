var gulp = require('gulp');
var browserify = require('browserify');
var partialify = require('partialify');
var source     = require('vinyl-source-stream');
var uglifyjs     = require('uglify-js');
var minifier = require('gulp-uglify/minifier');
var pump = require('pump');
var rename = require("gulp-rename");

gulp.task('js', function() {
	browserify('js/app.js')
		.transform('partialify')
		.bundle()
		.pipe(source('bundle.js'))
		.pipe(gulp.dest('js'))
});

gulp.task('copy-plugins', function(){
	gulp.src(["./node_modules/jquery/dist/jquery.min.js", "./node_modules/vue/dist/vue.min.js"], { base: './' })
	.pipe(rename({
		dirname: 'vendor'
	}))
	.pipe(gulp.dest('assets/js/'));
});

gulp.task('copy-css-plugins', function() {
	gulp.src([
		  "node_modules/bootstrap/dist/css/bootstrap.min.css",
		  "node_modules/bootstrap/dist/css/bootstrap-theme.min.css",
		  "node_modules/font-awesome/css/font-awesome.min.css","node_modules/font-awesome/fonts/../*"]
		)
	  .pipe(rename({
	  	dirname: 'vendor'
	  }))
	  .pipe(gulp.dest('assets/css'));
});

gulp.task('compress', function (cb) {
  // the same options as described above 
  var options = {
    preserveComments: 'license'
  };
 
  pump([
      gulp.src('js/bundle.js'),
      minifier(options, uglifyjs),
      gulp.dest('assets/js')
    ],
    cb
  );
});



gulp.task('default', ['js', 'compress', 'copy-plugins', 'copy-css-plugins']);
