/**
 * Off Canvas Navigation
 * All animations are done via CSS styling located in "assets/scss/components/_navigation.scss"
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
	 * Menu object
	 */
	var menu = {
		toggle: function() {
			if(!this._hasContainerClass()) {
				this.open();
			}
			else {
				this.close();
			}
		},
		open: function() {
			this._addContainerClass();
			this._addBodyClass();
		},
		close: function() {
			this._removeContainerClass();
			this._removeBodyClass();
		},
		_hasContainerClass: function() {
			return $container.hasClass(containerActiveClass);
		},
		_addContainerClass: function() {
			if(!this._hasContainerClass()) {
				$container.addClass(containerActiveClass);
			}
		},
		_removeContainerClass: function() {
			if(this._hasContainerClass()) {
				$container.removeClass(containerActiveClass);
			}
		},
		_hasBodyClass: function() {
			return $body.hasClass(bodyActiveClass);
		},
		_addBodyClass: function() {
			if(!this._hasBodyClass()) {
				$body.addClass(bodyActiveClass);
			}
		},
		_removeBodyClass: function() {
			if(this._hasBodyClass()) {
				$body.removeClass(bodyActiveClass);
			}
		},
	};

	/**
	 * What happens when the trigger is clicked
	 */
	$trigger.on('click', function() {
		menu.toggle();
	});

	/**
	 * When someone leaves the last item in the menu,
	 * we'll collapse the menu
	 */
	$inner.find('li a').last().on('keydown', function(e) {
		if (!e.shiftKey) {
			e.preventDefault();
			menu.close();
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
			menu.open();
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
