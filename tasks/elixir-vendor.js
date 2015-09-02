var gulp = require('gulp');
var fs = require('fs');
var Elixir = require('laravel-elixir');
var underscore = require('underscore');

var Task = Elixir.Task;
var $ = Elixir.Plugins;
var config = Elixir.config;

Elixir.extend('vendor', function(message) {

    var vendorFile = './vendors.json';
    new Task('vendor', function() {
        var assetsFile = JSON.parse(fs.readFileSync(vendorFile, 'utf8'));
		var files = assetsFile.files;
		var bowerDir = './bower_components';
		var packagesOrder = [];
		var mainFiles = [];

		// get the main files of packages base on the order
		underscore.each(files, function(file){
	  		mainFiles.push(file);
		});

		console.log(mainFiles)

		// run the gulp stream
		return gulp.src(mainFiles)
			.pipe($.concat('vendor.js'))
			.pipe(gulp.dest('./assets/src/js'))
			.pipe(new Elixir.Notification('Vendor Scripts Merged!'));
    })
    .watch(vendorFile);

});