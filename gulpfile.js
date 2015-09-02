var elixir = require('laravel-elixir'); // laravel elixir
require('./tasks/elixir-vendor'); // the custom vendor task
require('laravel-elixir-livereload');

// where the unprocessed assets reside
elixir.config.assetsPath = 'assets/src';
elixir.config.publicPath = 'assets/dist';

// start elixir
elixir(function(mix) {

	// copy jquery and modernizr
	mix.copy('./bower_components/modernizr/modernizr.js', './assets/dist/js/modernizr.js')
	   .copy('./bower_components/jquery/dist/jquery.min.js', './assets/dist/js/jquery.min.js');


	// handle scripts
	mix.vendor() // vendor scripts
	   .scripts([ // concatenate scripts
			'vendor.js',
			'plugins/*.js',
			'_*.js'
		], 'assets/dist/js/scripts.js');

	// run sass
	mix.sass([
		'./bower_components/foundation/scss/normalize.scss',
		'app.scss'
	], 'assets/dist/css/main.css');

	// livereload
	mix.livereload([
		'./assets/dist/js/scripts.js',
		'./assets/dist/css/main.css',
		'./**/*.php'
	]);

});