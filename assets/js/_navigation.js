/* ========================================================================
 * Off Canvas Navigation Menu
 * ======================================================================== */
(function($) {
	$('body').on('click', 'div[data-off-canvas-navigation-trigger]', function(e) {
		e.preventDefault();

		$('div[data-off-canvas-navigation]').toggleClass('expand');
		$('div[data-off-canvas-navigation-wrapper]').toggleClass('off-canvas-navigation-expanded');
		$('body').toggleClass('off-canvas-navigation-expanded');
	});

	$('div[data-off-canvas-navigation-wrapper]').on('click', '.off-canvas-overlay', function(){
		$('div[data-off-canvas-navigation-trigger]').trigger('click');
	});

	$('body').on('click', 'div[data-off-canvas-navigation-close]', function(e) {
		$('div[data-off-canvas-navigation-trigger]').trigger('click');
	});

	$(document).keyup(function(e) {

		if (e.keyCode == 27) {
			if( $('body').hasClass('off-canvas-navigation-expanded') ) {
				$('div[data-off-canvas-navigation-trigger]').trigger('click');
			}
		}
	});
})(jQuery); // Fully reference jQuery after this point.
