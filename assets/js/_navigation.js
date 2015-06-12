/**	
 * Off Canvas Navigation
 */

jQuery(document).ready(function($) {

	$('.navigation-container button.trigger').on('click', function() {
		$('.navigation-container').toggleClass('is-open');
		$('body').toggleClass('navigation-open');
	});

	$('.navigation-inner li a').last().on('keydown', function(e) {
		if (!e.shiftKey) {
			e.preventDefault();
			$('.navigation-container button.trigger').trigger('click');
			$('#content').find('a').first().focus();
		}
	});

	$('.navigation-inner li a').first().on('focus', function(e) {
		if (!e.shiftKey) {
			e.preventDefault();
			$('.navigation-container button.trigger').trigger('click');
		}
	});
	
	var i = 1;

	$('.navigation-inner li').each(function() {
		$(this).addClass('item-' + i);
		i++;
	});

});
