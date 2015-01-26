<?php
/**
 * Custom Post Types and Custom Taxonomies
 *
 * @package anunastart
 */

/**
 * Registers a new post type
 *
 * @uses $wp_post_types Inserts new post type object into the list
 *
 * @param string  Post type key, must not exceed 20 characters
 * @param array|string See optional args description above.
 *
 * @return object|WP_Error the registered post type object, or an error object
 */
function anuna_register_post_type() {

	$labels = array(
		'name'                => __( 'Plural Name', 'roots' ),
		'singular_name'       => __( 'Singular Name', 'roots' ),
		'add_new'             => __( 'Add New Singular Name', 'roots' ),
		'add_new_item'        => __( 'Add New Singular Name', 'roots' ),
		'edit_item'           => __( 'Edit Singular Name', 'roots' ),
		'new_item'            => __( 'New Singular Name', 'roots' ),
		'view_item'           => __( 'View Singular Name', 'roots' ),
		'search_items'        => __( 'Search Plural Name', 'roots' ),
		'not_found'           => __( 'No Plural Name found', 'roots' ),
		'not_found_in_trash'  => __( 'No Plural Name found in Trash', 'roots' ),
		'parent_item_colon'   => __( 'Parent Singular Name:', 'roots' ),
		'menu_name'           => __( 'Plural Name', 'roots' ),
	);

	$args = array(
		'labels'              => $labels,
		'hierarchical'        => false,
		'description'         => 'description',
		'taxonomies'          => array(),
		'public'              => true,
		'show_ui'             => true,
		'show_in_menu'        => true,
		'show_in_admin_bar'   => true,
		'menu_position'       => null,
		'menu_icon'           => null,
		'show_in_nav_menus'   => true,
		'publicly_queryable'  => true,
		'exclude_from_search' => false,
		'has_archive'         => true,
		'query_var'           => true,
		'can_export'          => true,
		'rewrite'             => true,
		'capability_type'     => 'post',
		'supports'            => array(
			'title',   'editor',      'thumbnail',
			'excerpt',  'custom-fields',     'author',
			'trackbacks',  'comments',     'post-formats',
			'revisions',  'page-attributes',
		)
	);

	register_post_type( 'slug', $args );
}

/**
 * Uncomment to enable post type
 */
//add_action( 'init', 'anuna_register_post_type' );

/**
 * Create a taxonomy
 *
 * @uses  Inserts new taxonomy object into the list
 * @uses  Adds query vars
 *
 * @param string  Name of taxonomy object
 * @param array|string Name of the object type for the taxonomy object.
 * @param array|string Taxonomy arguments
 * @return null|WP_Error WP_Error if errors, otherwise null.
 */
function anuna_custom_taxonomy() {

	$labels = array(
		'name'     => _x( 'Plural Name', 'Taxonomy plural name', 'roots' ),
		'singular_name'   => _x( 'Singular Name', 'Taxonomy singular name', 'roots' ),
		'search_items'   => __( 'Search Plural Name', 'roots' ),
		'popular_items'   => __( 'Popular Plural Name', 'roots' ),
		'all_items'    => __( 'All Plural Name', 'roots' ),
		'parent_item'   => __( 'Parent Singular Name', 'roots' ),
		'parent_item_colon'  => __( 'Parent Singular Name', 'roots' ),
		'edit_item'    => __( 'Edit Singular Name', 'roots' ),
		'update_item'   => __( 'Update Singular Name', 'roots' ),
		'add_new_item'   => __( 'Add New Singular Name', 'roots' ),
		'new_item_name'   => __( 'New Singular Name Name', 'roots' ),
		'add_or_remove_items' => __( 'Add or remove Plural Name', 'roots' ),
		'choose_from_most_used' => __( 'Choose from most used Plural Name', 'roots' ),
		'menu_name'    => __( 'Singular Name', 'roots' ),
	);

	$args = array(
		'labels'            => $labels,
		'public'            => true,
		'show_in_nav_menus' => true,
		'show_admin_column' => false,
		'hierarchical'      => true,
		'show_tagcloud'     => true,
		'show_ui'           => true,
		'query_var'         => true,
		'rewrite'           => true,
		'query_var'         => true,
		'capabilities'      => array(),
	);

	register_taxonomy( 'taxonomy-slug', array( 'post' ), $args );
}

/**
 * Uncomment to enable post type
 */
//add_action( 'init', 'anuna_custom_taxonomy' );

?>
