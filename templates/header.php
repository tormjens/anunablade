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
				<a href="<?php echo esc_url( home_url() ); ?>"><?php bloginfo( 'name' ); ?></a>
			</h1>

			<?php get_template_part( 'templates/navigation', 'trigger' ); ?>

			<nav class="main-navigation hide-for-medium-down">
				<?php if ( has_nav_menu( 'primary_navigation' ) ) :
					wp_nav_menu( array( 'theme_location' => 'primary_navigation' ) );
				endif; ?>
			</nav>
		</section>
	</div>
</header> <!-- contain-to-grid -->
