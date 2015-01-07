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
