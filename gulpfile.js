/**
 * Dependencies
 */
var gulp          = require('gulp');
var sass          = require('gulp-sass');
var sourcemaps    = require('gulp-sourcemaps');
var minifycss     = require('gulp-minify-css');
var livereload    = require('gulp-livereload');
var notify        = require('gulp-notify');
var rename        = require('gulp-rename');
var concat        = require('gulp-concat');
var uglify        = require('gulp-uglify');
var underscore    = require('underscore');
var underscoreStr = require('underscore.string');
var fs            = require("fs");

/**
 * SASS Compile
 */
gulp.task('sass', function (){
    gulp.src([
        'bower_components/foundation/scss/normalize.scss',
        'assets/src/sass/app.scss'])
        // .pipe(sourcemaps.init())
        .pipe(sass({style: 'compressed', errLogToConsole: true}))
        .pipe(concat('main.css'))
        // .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./assets/dist/css/'))
        // .pipe(sourcemaps.init())
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss({sourceMap: true}))
        .pipe(gulp.dest('assets/dist/css/'))
        // .pipe(sourcemaps.write('./'))
        .pipe(livereload())
        .pipe(notify('AnunaBlade: CSS compiled.'));
});

/**
 * JS Compile
 */
gulp.task('scripts', function (){
    gulp.src(['assets/dist/js/vendor.js',
            'assets/src/js/plugins/*.js',
            'assets/src/js/_*.js'])
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('./assets/dist/js/'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('assets/dist/js/'))
        .pipe(livereload())
        .pipe(notify('AnunaBlade: Scripts concatenated.'));
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
    .pipe(gulp.dest('./assets/dist/js'))                                // Set destination to assets/js
    .pipe(notify('AnunaBlade: Vendor scripts compiled'));

});

/**
 * Watch files and folders
 */
gulp.task('watch', function(){

    var server = livereload();

  livereload.listen();

  gulp.watch('**/*.php').on('change', function(file) {
    var parts = file.path.split('/');
    var name = parts[parts.length - 1];

    livereload.changed(file.path);
    gulp.src(file.path)
      .pipe(notify('PHP file changed' + ' (' + name + ')'));
  });

    gulp.watch("bower_components/foundation/scss/**/*.scss", ['sass']);
    gulp.watch("assets/src/sass/**/*.scss", ['sass']);
    gulp.watch("assets/src/js/plugins/*.js", ['scripts']);
    gulp.watch("assets/src/js/_*.js", ['scripts']);
    gulp.watch("./vendors.json", ['vendor', 'scripts']);

});

gulp.task('compile', ['sass', 'scripts', 'vendor']);
gulp.task('default', ['compile', 'watch']);