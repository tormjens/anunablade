/**
 * DOM Based routing
 */

(function($) {

	$(document).router({
		common: function() {
			$(document).foundation();

			$('.acf-map').map();
		},
		home: function() {
			// Cool
		}
	});

})(jQuery); // Fully reference jQuery after this point.
