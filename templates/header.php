<?php  
/**
 * Template for displaying the header
 *
 * @package anunastart
 */
?>
<header class="main-header">
	<div class="row">
		<section class="inner-header small-12 columns">
			<h1 class="site-title">
				<a href="<?php echo esc_url(home_url()); ?>"><?php bloginfo('name'); ?></a>
			</h1>

			<nav class="main-navigation">
				<?php if ( has_nav_menu( 'primary_navigation' ) ) :
					wp_nav_menu( array( 'theme_location' => 'primary_navigation' ) );
				endif; ?>
			</nav>
		</section>
	</div>
</header> <!-- contain-to-grid -->

<?php anuna_img( 'http://local.wordpress-trunk.dev/wp-content/uploads/2015/01/1273593_10151878332770775_195781698_o.jpg', 'type=url&width=500&height=200' ); ?>