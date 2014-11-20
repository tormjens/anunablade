<div class="off-canvas-navigation" tab-index="-1" data-off-canvas-navigation>
	
	<div class="navigation-inner">
		
		<div class="main-menu">
			<?php if (has_nav_menu('primary_navigation')) :
				wp_nav_menu(array('theme_location' => 'primary_navigation', 'menu_class' => 'right'));
			endif; ?>
		</div>

	</div>

</div>