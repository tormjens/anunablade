/**
 * Off Canvas Navigation
 */
(function($) {

	/**
	 * Variables
	 */
	var $container 				= $('.navigation-container'),
		$body 					= $('body'),
		$content 				= $('#content'),
		$trigger 				= $container.find('button.trigger'),
		$inner 					= $container.find('.navigation-inner'),
		containerActiveClass	= 'is-open',
		bodyActiveClass			= 'navigation-open',
		itemStart 				= 1,
		itemPrefix				= 'item-';

	/**
	 * What happens when the trigger is clicked
	 */
	$trigger.on('click', function() {
		$container.toggleClass(containerActiveClass);
		$body.toggleClass(bodyActiveClass);
	});

	/**
	 * When someone leaves the last item in the menu,
	 * we'll collapse the menu
	 */
	$inner.find('li a').last().on('keydown', function(e) {
		if (!e.shiftKey) {
			e.preventDefault();
			$trigger.trigger('click');
			$content.find('a').first().focus();
		}
	});

	/**
	 * When the user arrives at the first item (by focus)
	 * we'll expand the menu
	 */
	$inner.find('li a').first().on('focus', function(e) {
		if (!e.shiftKey) {
			e.preventDefault();
			$trigger.trigger('click');
		}
	});

	/**
	 * Add a class to each of the menu items
	 */
	$inner.find('li').each(function() {
		$(this).addClass(itemPrefix + itemStart);
		itemStart++;
	});

})(jQuery); // Fully reference jQuery after this point.
