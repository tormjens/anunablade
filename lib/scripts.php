<?php
/**
 * Scripts and stylesheets
 *
 * Enqueue stylesheets in the following order:
 * 1. /theme/assets/css/main.css
 *
 * Enqueue scripts in the following order:
 * 2. /theme/assets/js/vendor/modernizr-2.7.0.min.js
 * 3. /theme/assets/js/main.min.js (in footer)
 */
function roots_scripts() {

	$addon = '.min';
	if(defined('WP_DEBUG') && WP_DEBUG) {
		$addon = '';
	}

	wp_enqueue_style( 'roots_main', get_template_directory_uri() . '/assets/dist/css/main'. $addon .'.css', false );

	if ( !is_admin() && current_theme_supports( 'jquery-cdn' ) ) {
		wp_deregister_script( 'jquery' );
		wp_register_script( 'jquery', '//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery'. $addon .'.js', array(), null, true );
		add_filter( 'script_loader_src', 'roots_jquery_local_fallback', 10, 2 );
	}

	if ( is_single() && comments_open() && get_option( 'thread_comments' ) ) {wp_enqueue_script( 'comment-reply' ); }

	wp_enqueue_script( 'jquery' );

	wp_register_script( 'roots_scripts', get_template_directory_uri() . '/assets/dist/js/scripts'. $addon .'.js', array(), null, true );
	wp_enqueue_script( 'roots_scripts' );
}
add_action( 'wp_enqueue_scripts', 'roots_scripts' );

// http://wordpress.stackexchange.com/a/12450
function roots_jquery_local_fallback( $src, $handle = null ) {
	static $add_jquery_fallback = false;
	if ( $add_jquery_fallback ) {
		echo '<script>window.jQuery || document.write(\'<script src="' . get_template_directory_uri() . '/assets/dist/js/jquery.min.js"><\/script>\')</script>' . "\n";
		$add_jquery_fallback = false;
	}
	if ( $handle === 'jquery' ) {
		$add_jquery_fallback = true;
	}
	return $src;
}
add_action( 'wp_head', 'roots_jquery_local_fallback' );

/**
 * Google Analytics snippet from HTML5 Boilerplate
 */
function roots_google_analytics() { ?>
<script>
	(function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
	function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
	e=o.createElement(i);r=o.getElementsByTagName(i)[0];
	e.src='//www.google-analytics.com/analytics.js';
	r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
	ga('create','<?php echo GOOGLE_ANALYTICS_ID; ?>');ga('send','pageview');
</script>

<?php }
if ( GOOGLE_ANALYTICS_ID && !current_user_can( 'manage_options' ) ) {
	add_action( 'wp_footer', 'roots_google_analytics', 20 );
}

/**
 * Typekit
 */
function roots_typekit() { ?>
<script src="//use.typekit.net/<?php echo TYPEKIT_ID ?>.js"></script>
<script>try{Typekit.load();}catch(e){}</script>

<?php }
if ( TYPEKIT_ID ) {
	add_action( 'wp_head', 'roots_typekit', 2 );
}
