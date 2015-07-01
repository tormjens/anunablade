/**
 * Simple Maps Init
 * for more, see: http://www.advancedcustomfields.com/resources/google-map/
 */
(function($) {

	/**
	 * An array containing the jQuery objects where maps should be inited
	 */
	var mapElems = [
		$('.acf-map')
	];

	/**
	 * Decides the colors of the map
	 */
	var colors = {
		names			: '#000000',
		landscape		: '#fafafa',
		water			: '#aaaaaa',
	};

	/**
	 * The maps object
	 */
	var maps = {
		/**
		 * Renders the map
		 * @param  {Object} $el
		 * @return {Object}
		 */
		render: function($el) {
			var that = this;

			// var
			var $markers = $el.find('.marker');

			// arguments
			var args = {
				zoom		: 16,
				center		: new google.maps.LatLng(0, 0),
				mapTypeId	: google.maps.MapTypeId.ROADMAP,
				styles 		: [
				    {
				        "featureType":"administrative",
				        "elementType":"labels.text.fill",
				        "stylers":[
				            {
				                "color":colors.names
				            }
				        ]
				    },
				    {
				        "featureType":"landscape",
				        "elementType":"all",
				        "stylers":[
				            {
				                "color":colors.landscape
				            }
				        ]
				    },
				    {
				        "featureType":"poi",
				        "elementType":"all",
				        "stylers":[
				            {
				                "visibility":"off"
				            }
				        ]
				    },
				    {
				        "featureType":"road",
				        "elementType":"all",
				        "stylers":[
				            {
				                "saturation":-100
				            },
				            {
				                "lightness":45
				            }
				        ]
				    },
				    {
				        "featureType":"road.highway",
				        "elementType":"all",
				        "stylers":[
				            {
				                "visibility":"simplified"
				            }
				        ]
				    },
				    {
				        "featureType":"road.arterial",
				        "elementType":"labels.icon",
				        "stylers":[
				            {
				                "visibility":"off"
				            }
				        ]
				    },
				    {
				        "featureType":"transit",
				        "elementType":"all",
				        "stylers":[
				            {
				                "visibility":"off"
				            }
				        ]
				    },
				    {
				        "featureType":"water",
				        "elementType":"all",
				        "stylers":[
				            {
				                "color":colors.water
				            },
				            {
				                "visibility":"on"
				            }
				        ]
				    }
				]
			};

			// add class
			$el.addClass('map-inited');

			// set height
			if($el.height() === 0) {
				$el.height(350);
			}

			// create map
			var map = new google.maps.Map( $el[0], args);

			// add a markers reference
			map.markers = [];

			// add markers
			$markers.each(function(){
				that.add_marker( $(this), map );
			});

			// center map
			that.center_map( map, $el );

			return map;
		},
		/**
		 * Adds a marker to a map
		 * @param {Object} $marker
		 * @param {Object} map
		 */
		add_marker: function($marker, map) {
			// var
			var latlng = new google.maps.LatLng( $marker.attr('data-lat'), $marker.attr('data-lng') );

			// create marker
			var marker = new google.maps.Marker({
				position	: latlng,
				map			: map
			});

			// add to array
			map.markers.push( marker );

			// if marker contains HTML, add it to an infoWindow
			if( $marker.html() )
			{
				// create info window
				var infowindow = new google.maps.InfoWindow({
					content		: $marker.html()
				});

				// show info window when marker is clicked
				google.maps.event.addListener(marker, 'click', function() {
					infowindow.open( map, marker );
				});
			}

			return map;
		},
		/**
		 * Centers the map around all markers
		 * @param  {Object} map
		 * @param  {Object} $el
		 * @return {Object}
		 */
		center_map: function(map, $el) {
			// vars
			var bounds = new google.maps.LatLngBounds();

			// loop through all markers and create bounds
			$.each( map.markers, function( i, marker ){
				var latlng = new google.maps.LatLng( marker.position.lat(), marker.position.lng() );
				bounds.extend( latlng );
			});

			// only 1 marker?
			if( map.markers.length === 1 ) {
				// set center of map
			    map.setCenter( bounds.getCenter() );
			    map.setZoom( 16 );
			}
			else {
				// fit to bounds
				map.fitBounds( bounds );
			}

			// add class
			$el.addClass('map-centered');

			return map;
		}
	};

	/**
	 * The function that runs when Google Maps is ready
	 * @return {Void}
	 */
	window.readyMap = function() {
		$.each(mapElems, function(i, $el) {
			$el.each(function(){
				var map = maps.render( $(this) );
				$(this).data('map', map);
			});
		});
		$('html').removeClass('google-maps-loading').addClass('google-maps-ready');
	};

	/**
	 * Loads up the Google Maps API
	 * @return {Void}
	 */
	function loadScript() {
	  	var script 		= document.createElement('script');
	  	script.type 	= 'text/javascript';
	  	script.src 		= 'http://maps.google.com/maps/api/js?sensor=false&v=3.exp&callback=readyMap';
	  	document.body.appendChild(script);
	}

	/**
	 * Checks for presence of any of the map objects
	 */
	var present = 0;
	$.each(mapElems, function(i, $el) {
		if($el.length !== 0) {
			present++;
		}
	});

	if(present !== 0) {
		window.onload = loadScript;
		$('html').addClass('google-maps-loading');
	}
})(jQuery); // Fully reference jQuery after this point.