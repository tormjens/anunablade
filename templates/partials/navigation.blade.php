<div class="navigation-container">

	<button class="trigger" type="button" role="button" aria-label="{{ __('Toggle Navigation', 'roots') }}">
		<span class="lines">{{ __('Toggle Navigation', 'roots') }}</span>
		<span class="label">Menu</span>
	</button>

	<div class="navigation-wrapper" role="navigation">
		<div class="navigation-inner">
			@if ( has_nav_menu( 'primary_navigation' ) )
				{{ wp_nav_menu( array( 'theme_location' => 'primary_navigation', 'depth' => 2 ) ) }}
			@endif
		</div>
	</div>

</div>
