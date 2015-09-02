var elixir = require('laravel-elixir'); // laravel elixir
require('./tasks/elixir-vendor'); // the custom vendor task

// where the unprocessed assets reside
elixir.config.assetsPath = 'assets/src';
elixir.config.publicPath = 'assets/dist';

// start elixir
elixir(function(mix) {

	// begin by creating vendor scripts
	mix.vendor();

	// copy jquery and modernizr
	mix.copy('./bower_components/modernizr/modernizr.js', './assets/dist/js/modernizr.js');
	mix.copy('./bower_components/jquery/dist/jquery.min.js', './assets/dist/js/jquery.min.js');

	// concatenate scripts
	mix.scripts([
		'vendor.js',
		'plugins/*.js',
		'_*.js'
	], 'assets/dist/js/scripts.js');

	// run sass
	mix.sass([
		'./bower_components/foundation/scss/normalize.scss',
		'app.scss'
	], 'assets/dist/css/main.css');

});