<?php
/**
 * Template for displaying the head-part
 *
 * @package anunastart
 */
?>
<!doctype html>
<html class="no-js" <?php language_attributes(); ?>>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title><?php wp_title( '|', true, 'right' ); ?></title>
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<?php wp_head(); ?>

	<?php get_template_part('templates/favicons') ?>

	<link rel="alternate" type="application/rss+xml" title="<?php echo get_bloginfo( 'name' ); ?> Feed" href="<?php echo esc_url( get_feed_link() ); ?>">
</head>
