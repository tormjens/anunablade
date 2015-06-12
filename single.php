<?php
/**
 * Template for displaying single content
 *
 * @package anunastart
 */
?>

<?php while ( have_posts() ) : the_post(); ?>
	<?php get_template_part( 'templates/page', 'header' ); ?>
	<?php get_template_part( 'templates/content', get_post_type() ); ?>
<?php endwhile; ?>
