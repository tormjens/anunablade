
;(function ( $, window, document, undefined ) {

	"use strict";

		var pluginName = "map",
			defaults = {
				map: {}, // overwrite map settings (google object not availiable)
				icon: null,
		};

		function Plugin ( element, options ) {
				this.element = element;
				this.$element = $(element);
				this.settings = $.extend( {}, defaults, options );
				this._defaults = defaults;
				this._name = pluginName;
				this.map_settings = null;
				this.map = null;
				this.markers = [];
				this.init();
		}

		window.customMap = {};
		window.customMap.ready = function() {
			window.customMap.Tooltip = function(options) {
			    this.marker_ = options.marker;
			    this.content_ = options.content;
			    this.map_ = options.marker.get('map');
				this.cssClass_ = options.cssClass||null;

			    this.div_ = null;

			    this.setMap(this.map_);
				var me = this;

				google.maps.event.addListener(me.marker_, 'mouseover', function() {
					me.show();
				});

				google.maps.event.addListener(me.marker_, 'mouseout', function() {
					me.hide();
				});
			}

			window.customMap.Tooltip.prototype = new google.maps.OverlayView();

			window.customMap.Tooltip.prototype.onAdd = function() {
				var div = document.createElement('DIV');
			    div.style.position = "absolute";
				// Hide tooltip
				div.style.visibility = "hidden";
				if(this.cssClass_) {
					div.className += " "+this.cssClass_;
				}

				//Attach content to the DIV.
			    div.innerHTML = this.content_;

			    // Set the overlay's div_ property to this DIV
			    this.div_ = div;

			    // We add an overlay to a map via one of the map's panes.
			    // We'll add this overlay to the floatPane pane.
			    var panes = this.getPanes();
			  	panes.floatPane.appendChild(this.div_);
			};

			window.customMap.Tooltip.prototype.draw = function() {
			    var overlayProjection = this.getProjection();
			    var ne = overlayProjection.fromLatLngToDivPixel(this.marker_.getPosition());

			    var div = this.div_;
			    div.style.left = ne.x + 'px';
			    div.style.top = ne.y + 'px';

			};

			window.customMap.Tooltip.prototype.onRemove = function() {
			    this.div_.parentNode.removeChild(this.div_);
			};

			window.customMap.Tooltip.prototype.hide = function() {
			    if (this.div_) {
			      this.div_.style.visibility = "hidden";
			    }
			};

			window.customMap.Tooltip.prototype.show = function() {
			    if (this.div_) {
			      this.div_.style.visibility = "visible";
			    }
			};
			$(window).trigger('anuna-maps-api-loaded');
		};
		window.customMap.load = function() {
			if(typeof google === 'object' && typeof google.maps === 'object') {
				return false;
			}
			var script 		= document.createElement('script');
		  	script.type 	= 'text/javascript';
		  	script.src 		= 'http://maps.google.com/maps/api/js?sensor=false&v=3.exp&callback=customMap.ready';
		  	document.body.appendChild(script);
		};

		$.extend(Plugin.prototype, {
			init: function () {
				var me = this;
				$(window).on('anuna-maps-api-loaded', function() {
					me.$element.addClass('api-ready');
					$('html').addClass('anuna-maps-api-ready');
					me.map_settings = $.extend({}, {
						zoom				: 14,
						center				: new google.maps.LatLng(0, 0),
						mapTypeId			: google.maps.MapTypeId.ROADMAP,
						scrollwheel			: false,
						panControl			: false,
						zoomControl			: true,
						zoomControlOptions	: {
					        style: google.maps.ZoomControlStyle.LARGE,
					        position: google.maps.ControlPosition.LEFT_CENTER
					    },
						mapTypeControl		: false,
						scaleControl		: false,
						streetViewControl	: false,
						overviewMapControl	: false,
						styles 				: [{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}]
					}, me.settings.map);
					me.render(me);
				});
			},
			render: function(me) {

				var $markers = me.$element.find('.marker');

				me.map = new google.maps.Map( me.$element.get(0), me.map_settings);

				me.$element.addClass('map-rendered');

				$markers.each(function() {
					me.addMarker($(this), me);
				});
			},
			addMarker: function($marker, me) {
				// var
				var latlng = new google.maps.LatLng( $marker.attr('data-lat'), $marker.attr('data-lng') );

				// create marker
				var marker = new google.maps.Marker({
					position	: latlng,
					icon 		: me.settings.icon,
					map			: map
				});

				// add to array
				map.markers.push( marker );

				// if marker contains HTML, add it to an infoWindow


				// show info window when marker is clicked
				google.maps.event.addListener(marker, 'click', function() {

					window.location.href = $marker.data('url');

				});

				var t = $marker.html();
				var tooltipOptions={ marker:marker, content: $marker.html(), cssClass:'tooltip' };
				// create the tooltip
				var tooltip = new Tooltip(tooltipOptions);
			},
			centerMap: function(me) {

				var map = me.map;

				// vars
				var bounds = new google.maps.LatLngBounds();

				// loop through all markers and create bounds
				$.each( me.markers, function( i, marker ){

					var latlng = new google.maps.LatLng( marker.position.lat(), marker.position.lng() );

					bounds.extend( latlng );

				});

				// only 1 marker?
				if( me.markers.length === 1 )
				{
					// set center of map
				    map.setCenter( bounds.getCenter() );
				    map.setZoom( 14 );
				}
				else
				{
					// fit to bounds
					map.fitBounds( bounds );
				}
			}

		});

		$.fn[ pluginName ] = function ( options ) {

				if(this.length !== 0) {
					customMap.load();
				}
				return this.each(function() {
						if ( !$.data( this, "plugin_" + pluginName ) ) {
								$.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
						}
				});
		};

})( jQuery, window, document );