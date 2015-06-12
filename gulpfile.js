var gulp = require('gulp'); // Gulp!

var sass = require('gulp-sass'); // Sass
var prefix = require('gulp-autoprefixer'); // Autoprefixr
var minifycss = require('gulp-minify-css'); // Minify CSS
var concat = require('gulp-concat'); // Concat files
var uglify = require('gulp-uglify'); // Uglify javascript
var svgmin = require('gulp-svgmin'); // SVG minify
var imagemin = require('gulp-imagemin');// Image minify
var rename = require('gulp-rename');// Rename files
var notify = require('gulp-notify');// Writing stuff
var livereload = require('gulp-livereload');// LiveReload
var jshint = require("gulp-jshint");// jshint
var bower = require('bower'); // Bower
var underscore = require('underscore');
var underscoreStr = require('underscore.string');
var file = require('gulp-file');
var fs = require("fs");

/**
 * Bower
 */
gulp.task('bower', function(cb){
  	bower.commands.install([], {save: true}, {})
    	.on('end', function(installed){
      		cb(); // notify gulp that this task is finished
    	});
});

/**
 * Auto-Bundle
 */
var exclude = ['modernizr', 'jquery', 'bourbon', 'fontawesome'];

gulp.task('bundle-libraries-auto', ['bower'], function(){
	var bowerFile = require('./bower.json');
	var bowerPackages = bowerFile.dependencies;
	var bowerDir = './bower_components';
	var packagesOrder = [];
	var mainFiles = [];

	// Function for adding package name into packagesOrder array in the right order
	function addPackage(name){
		// package info and dependencies
		var info = require(bowerDir + '/' + name + '/bower.json');
		var dependencies = info.dependencies;

		// add dependencies by repeat the step
		if(!!dependencies){
			underscore.each(dependencies, function(value, key){
				if(exclude.indexOf(key) === -1){
					addPackage(key);
				}
			});
		}

		// and then add this package into the packagesOrder array if they are not exist yet
		if(packagesOrder.indexOf(name) === -1){
			packagesOrder.push(name);
		}
	}

	// calculate the order of packages
	underscore.each(bowerPackages, function(value, key){
		if(exclude.indexOf(key) === -1){ // add to packagesOrder if it's not in exclude
			addPackage(key);
		}
	});

	// get the main files of packages base on the order
	underscore.each(packagesOrder, function(bowerPackage){
		var info = require(bowerDir + '/' + bowerPackage + '/bower.json');
		var main = info.main;
		var mainFile = main;

		// get only the .js file if mainFile is an array
		if(underscore.isArray(main)){
			underscore.each(main, function(file){
				if(underscoreStr.endsWith(file, '.js')){
					mainFile = file;
				}
			});
		}

		// make the full path
		mainFile = bowerDir + '/' + bowerPackage + '/' + mainFile;

		// only add the main file if it's a js file
		if(underscoreStr.endsWith(mainFile, '.js')){
			mainFiles.push(mainFile);
		}
	});

	// run the gulp stream
	return gulp.src(mainFiles)
		.pipe(concat('vendor.js'))
		.pipe(gulp.dest('assets/dist/js/'))
		.pipe(notify('Bower packages compiled!'));
});

/**
 * Compile all the CSS
 */
gulp.task('sass', function (){
	gulp.src([
		'bower_components/foundation/scss/normalize.scss',         // Gets normalize
		'assets/scss/app.scss'])                                   // Gets the apps scss
		.pipe(sass({style: 'compressed', errLogToConsole: true}))  // Compile sass
		.pipe(concat('main.css'))                                // Minify the CSS
		.pipe(gulp.dest('assets/dist/css/'))                               // Concat all css
		.pipe(rename({suffix: '.min'}))                            // Rename it
		.pipe(minifycss())                                         // Minify the CSS
		.pipe(gulp.dest('assets/dist/css/'))                            // Set the destination to assets/css
		.pipe(livereload())                                        // Reloads server
		.pipe(notify('Sass compiled & minified'));                 // Output to notification
});

/**
 * Compile and concatenate javascripts
 */
gulp.task('javascripts', function(){
	gulp.src([
		'assets/dist/js/vendor.js',
		'assets/js/plugins/*.js',							// Gets all the user plugins
		'assets/js/_*.js'])										// Gets all the user JS _*.js from assets/js
		.pipe(concat('scripts.js'))							// Uglify(minify)
		.pipe(gulp.dest('assets/dist/js/'))							// Concat all the scripts
		.pipe(rename({suffix: '.min'}))							// Rename it
		.pipe(uglify())											// Uglify(minify)
		.pipe(gulp.dest('assets/dist/js/'))							// Set destination to assets/js
		.pipe(livereload())									// Reloads server
		.pipe(notify('Javascripts compiled and minified'));			// Output to notification
});

/**
 * Copy jquery and modernizr to be native
 */

gulp.task('copy', ['copy-modernizr', 'copy-jquery']);

gulp.task('copy-modernizr', function(){
	return gulp.src('bower_components/modernizr/modernizr.js')	// Gets Modernizr
	.pipe(uglify())																				// Uglify(minify)
	.pipe(rename({suffix: '.min'}))									// Rename it
	.pipe(gulp.dest('assets/dist/js/'))							// Set destination to assets/js
	.pipe(notify('Modernizr copied'));					// Output to notification
});

gulp.task('copy-jquery', function(){
	return gulp.src('bower_components/jquery/dist/jquery.min.js')				// Gets Jquery
	.pipe(gulp.dest('assets/dist/js/'))									// Set destination to assets/js
	.pipe(notify('jQuery copied'));											// Output to notification
});

/**	
 * JS Hints
 */
gulp.task('jshint', function() {
	return gulp.src('assets/js/_*.js')
		.pipe(jshint())
		.pipe(notify(function (file) {
			if (file.jshint.success) {
				// Don't show something if success
				return false;
			}

			var errors = file.jshint.results.map(function (data) {
				if (data.error) {
					return "(" + data.error.line + ':' + data.error.character + ') ' + data.error.reason;
				}
			}).join("\n");
			return file.relative + " (" + file.jshint.results.length + " errors)\n" + errors;
		}));
});

/**
 * Vendor scripts
 */
gulp.task('vendor', function(){

  var assetsFile = JSON.parse(fs.readFileSync('./vendors.json', 'utf8'));
  var files = assetsFile.files;
  var bowerDir = './bower_components';
  var packagesOrder = [];
  var mainFiles = [];

  // get the main files of packages base on the order
  underscore.each(files, function(file){

    // only add the main file if it's a js file
    if(underscoreStr.endsWith(file, '.js')){
      mainFiles.push(file);
    }
  });

  // run the gulp stream
  return gulp.src(mainFiles)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./assets/dist/js'))								// Set destination to assets/js
	.pipe(notify('Vendor scripts compiled'));	

});

/**	
 * Watch files and folders
 */
gulp.task('watch', function(){

	var server = livereload();
	gulp.watch('**/*.php').on('change', function(file) {
		var parts = file.path.split('/');
		var name = parts[parts.length - 1];

		server.changed(file.path);
		gulp.src(file.path)
			.pipe(notify('PHP file changed' + ' (' + name + ')'));
	});


	gulp.watch("bower_components/foundation/scss/**/*.scss", ['sass']); // Runs sass on foundation components change
	gulp.watch("assets/scss/**/*.scss", ['sass']);				// Watch and run sass on changes
	gulp.watch("assets/js/plugins/*.js", ['javascripts']);				// Watch and run javascripts on changes
	gulp.watch("assets/js/_*.js", ['jshint', 'javascripts']);				// Watch and run javascripts on changes
	gulp.watch("./vendors.json", ['vendor', 'javascripts']);				// Watch and run javascripts on changes
	// gulp.watch("bower_components/**/*", ['bundle-libraries-auto']);				// Watch and run javascripts on changes

});

gulp.task('default', ['sass', 'jshint', 'javascripts', 'vendor', 'copy', 'watch']);


