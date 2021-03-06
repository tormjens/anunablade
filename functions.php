<?php
/**
 * Roots includes
 *
 * The $roots_includes array determines the code library included in your theme.
 * Add or remove files to the array as needed. Supports child theme overrides.
 *
 * Please note that missing files will produce a fatal error.
 *
 * @link https://github.com/roots/roots/pull/1042
 */
$roots_includes = array(
	'lib/blade.php', // Blade functions
	'lib/utils.php', // Utility functions
	'lib/init.php', // Initial theme setup and constants
	'lib/sidebar.php', // Sidebar class
	'lib/config.php', // Configuration
	'lib/activation.php', // Theme activation
	'lib/titles.php', // Page titles
	'lib/nav.php', // Custom nav modifications
	'lib/pagination.php', // Custom pagination
	'lib/gallery.php', // Custom [gallery] modifications
	'lib/comments.php', // Custom comments modifications
	'lib/scripts.php', // Scripts and stylesheets
	'lib/extras.php', // Custom functions
	'lib/acf.php', // Advanced Custom Fields
	'lib/cpt.php', // Custom Post Type
);

foreach ( $roots_includes as $file ) {
	if ( !$filepath = locate_template( $file ) ) {
		trigger_error( sprintf( __( 'Error locating %s for inclusion', 'roots' ), $file ), E_USER_ERROR );
	}

	require_once $filepath;
}
unset( $file, $filepath );
