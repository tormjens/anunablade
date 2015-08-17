<form role="search" method="get" class="search" action="{{ esc_url( home_url( '/' ) ) }}">
	<div class="row">
		<div class="small-12 columns">
			<div class="row collapse">
				<div class="small-8 columns">
					<input type="text" value="{{ get_search_query() }}" name="s" placeholder="{{ __( 'Search', 'roots' ) }} {{ bloginfo( 'name' ) }}">
				</div>
				<div class="small-4 columns">
					<button type="submit" class="button expand postfix">{{ __( 'Search', 'roots' ) }}</button>
				</div>
			</div>
		</div>
	</div>
</form>