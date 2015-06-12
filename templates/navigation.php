<?php
/**
 * Template for displaying the off canvas navigation
 *
 * @package anunastart
 */
?>
<div class="navigation-container">
				
	<button class="trigger" type="button" role="button" aria-label="<?php _e('Toggle Navigation', 'roots') ?>">
		<span class="lines"><?php _e('Toggle Navigation', 'roots') ?></span>
		<span class="label">Menu</span>
	</button>
	
	<div class="navigation-wrapper" role="navigation">
		<div class="navigation-inner">
			<?php if ( has_nav_menu( 'primary_navigation' ) ) :
				wp_nav_menu( array( 'theme_location' => 'primary_navigation', 'depth' => 2 ) );
			endif; ?>
		</div>
	</div>

</div>
