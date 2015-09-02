/**	
 * Add classes and other stuff based on 
 * which browser the current user is using
 */
(function($) {

	var browsertime = {
		/**	
		 * Converts a text string to a slug
		 * @param  {String} Text Text
		 * @return {String}
		 */
		convertToSlug: function(Text) {
		    return Text
		        .toLowerCase()
		        .replace(/[^\w ]+/g,'')
		        .replace(/ +/g,'-');
		},
		init: function() {
			/**
			 * Variables
			 */
			var browser = this.convertToSlug(BrowserDetect.browser), // Get the slug for the browser name
				browserVer = this.convertToSlug(BrowserDetect.browser + ' ' + BrowserDetect.version); // Gets the slug for the browser name and the current version

			// this is where we should classify
			var $html = $('html');

			// for internet exploder we're using something special
			if(BrowserDetect.browser === 'Explorer') {

				// add a class that says its ie, and which ie it is
				$html.addClass('ie').addClass('ie-'+ BrowserDetect.version);
				
				// we always find ourselves in situations where versions 
				// lesser than IE9 need special haxx. lets add a class
				if(BrowserDetect.version <= 9) {
					$html.addClass('ie-lt-9');
				}
			}
			else {
				// we (almost) love every other browsers, so we add a 
				// class to what browser we have nad which version it is
				$html.addClass(browser).addClass(browserVer);
			}
		}
	};

	browsertime.init();

})(jQuery); // Fully reference jQuery after this point.
