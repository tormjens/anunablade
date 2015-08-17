<?php

require get_template_directory() .'/vendor/autoload.php';

new \Tormorten\WPBlade\Blade(
	get_template_directory() . '/templates', // where all views reside
	WP_CONTENT_DIR . '/blade_cache' // where the compiled views are stored
);
