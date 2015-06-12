/**	
 * Add classes and other stuff based on 
 * which browser the current user is using
 */
(function($) {

	function convertToSlug(Text) {
	    return Text
	        .toLowerCase()
	        .replace(/[^\w ]+/g,'')
	        .replace(/ +/g,'-');
	}

	var browser = convertToSlug(BrowserDetect.browser),
		browserVer = convertToSlug(BrowserDetect.browser + ' ' + BrowserDetect.version);

	var $html = $('html');

	if(BrowserDetect.browser == 'Explorer') {
		$html.addClass('ie').addClass('ie-'+ BrowserDetect.version);
		
		if(BrowserDetect.version <= 9) {
			$html.addClass('ie-lt-9');
		}
	}

	$html.addClass(browser).addClass(browserVer);

})(jQuery); // Fully reference jQuery after this point.
