<?php
/**
 * Utility functions
 */
function is_element_empty($element) {
	$element = trim($element);
	return !empty($element);
}

// Tell WordPress to use searchform.php from the templates/ directory
function roots_get_search_form($form) {
	$form = '';
	locate_template('/templates/searchform.php', true, false);
	return $form;
}
add_filter('get_search_form', 'roots_get_search_form');

if( !class_exists( 'Anunapress' ) ) {

	/**
	 * A simple version of the anuna_img-function when AnunaPress is missing
	 **/
	function anuna_img( $img, $args = '' ) {

		$string = '<img src="'. get_template_directory_uri() .'/assets/img/'. $img .'" alt="'. $img .'" />';

		echo $string;

	}

}
else {

	function anuna_img_settings( $settings ) {

		$settings['theme_folder'] = '/assets/img/';

		return $settings;

	}

	add_filter( 'anuna_img_args_parsed', 'anuna_img_settings' );

}