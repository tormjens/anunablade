/**
 * Simple Maps Init
 * for more, see: http://www.advancedcustomfields.com/resources/google-map/
 */
(function($) {
	var maps = {
		render: function($el) {
			var that = this;

			// var
			var $markers = $el.find('.marker');

			// arguments
			var args = {
				zoom		: 16,
				center		: new google.maps.LatLng(0, 0),
				mapTypeId	: google.maps.MapTypeId.ROADMAP,
				styles 		: [{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}]
			};

			// add class
			$el.addClass('map-inited');

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
		},
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
		}
	};

	window.readyMap = function() {
		$('.acf-map').each(function(){
			var map = maps.render( $(this) );
			$(this).data('map', map);
		});
		$('html').removeClass('google-maps-loading').addClass('google-maps-ready');
	};

	function loadScript() {
	  	var script = document.createElement('script');
	  	script.type = 'text/javascript';
	  	script.src = 	'http://maps.google.com/maps/api/js?sensor=false&v=3.exp&callback=readyMap';
	  	document.body.appendChild(script);
	}

	if($('.acf-map').length !== 0) {
		window.onload = loadScript;
		$('html').addClass('google-maps-loading');
	}
})(jQuery); // Fully reference jQuery after this point.