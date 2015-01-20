<?php  
/**
 * Advanced Custom Fields 
 *
 * @see Documentation: http://www.advancedcustomfields.com/resources/
 *
 * @package anunastart
 */

/**
 * Adds a theme options page
 */
if( function_exists('acf_add_options_page') ) {
 
	$page = acf_add_options_page(array(
		'page_title' 	=> __( 'Site General Settings', 'roots' ),
		'menu_title' 	=> __( 'Site Settings', 'roots' ),
		'menu_slug' 	=> 'general-settings',
		'capability' 	=> 'edit_posts',
		'redirect' 		=> false
	));
 
}

/**
 * Register field groups
 */

//.. [insert field group export code here] ..//



?>