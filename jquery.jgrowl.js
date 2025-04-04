/**
 * jGrowl 1.4.5
 *
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Written by Stan Lemon <stosh1985@gmail.com>
 * Last updated: 2015.02.01
 *
 * jGrowl is a jQuery plugin implementing unobtrusive userland notifications.  These
 * notifications function similarly to the Growl Framework available for
 * Mac OS X (http://growl.info).
 *
 * To Do:
 * - Move library settings to containers and allow them to be changed per container
 *
 * Changes in 1.4.5
 * - Fixed arguement list for click callback, thanks @timotheeg
 *
 * Changes in 1.4.4
 * - Revert word-break changes, thanks @curtisgibby
 *
 * Changes in 1.4.3
 * - Fixed opactiy in LESS for older version of IE
 *
 * Changes in 1.4.2
 * - Added word-break to less/css
 *
 * Changes in 1.4.1
 * - Added appendTo option
 * - jQuery compatibility updates
 * - Add check for closing a notification before it opens
 *
 * Changes in 1.4.0
 * - Removed IE6 support
 * - Added LESS support
 *
 * Changes in 1.3.0
 * - Added non-vendor border-radius to stylesheet
 * - Added grunt for generating minified js and css
 * - Added npm package info
 * - Added bower package info
 * - Updates for jshint
 *
 * Changes in 1.2.13
 * - Fixed clearing interval when the container shuts down
 *
 * Changes in 1.2.12
 * - Added compressed versions using UglifyJS and Sqwish
 * - Improved README with configuration options explanation
 * - Added a source map
 *
 * Changes in 1.2.11
 * - Fix artifacts left behind by the shutdown method and text-cleanup
 *
 * Changes in 1.2.10
 * - Fix beforeClose to be called in click event
 *
 * Changes in 1.2.9
 * - Fixed BC break in jQuery 2.0 beta
 *
 * Changes in 1.2.8
 * - Fixes for jQuery 1.9 and the MSIE6 check, note that with jQuery 2.0 support
 *   jGrowl intends to drop support for IE6 altogether
 *
 * Changes in 1.2.6
 * - Fixed js error when a notification is opening and closing at the same time
 *
 * Changes in 1.2.5
 * - Changed wrapper jGrowl's options usage to "o" instead of $.jGrowl.defaults
 * - Added themeState option to control 'highlight' or 'error' for jQuery UI
 * - Ammended some CSS to provide default positioning for nested usage.
 * - Changed some CSS to be prefixed with jGrowl- to prevent namespacing issues
 * - Added two new options - openDuration and closeDuration to allow
 *   better control of notification open and close speeds, respectively
 *   Patch contributed by Jesse Vincet.
 * - Added afterOpen callback.  Patch contributed by Russel Branca.
 *
 * Changes in 1.2.4
 * - Fixed IE bug with the close-all button
 * - Fixed IE bug with the filter CSS attribute (special thanks to gotwic)
 * - Update IE opacity CSS
 * - Changed font sizes to use "em", and only set the base style
 *
 * Changes in 1.2.3
 * - The callbacks no longer use the container as context, instead they use the actual notification
 * - The callbacks now receive the container as a parameter after the options parameter
 * - beforeOpen and beforeClose now check the return value, if it's false - the notification does
 *   not continue.  The open callback will also halt execution if it returns false.
 * - Fixed bug where containers would get confused
 * - Expanded the pause functionality to pause an entire container.
 *
 * Changes in 1.2.2
 * - Notification can now be theme rolled for jQuery UI, special thanks to Jeff Chan!
 *
 * Changes in 1.2.1
 * - Fixed instance where the interval would fire the close method multiple times.
 * - Added CSS to hide from print media
 * - Fixed issue with closer button when div { position: relative } is set
 * - Fixed leaking issue with multiple containers.  Special thanks to Matthew Hanlon!
 *
 * Changes in 1.2.0
 * - Added message pooling to limit the number of messages appearing at a given time.
 * - Closing a notification is now bound to the notification object and triggered by the close button.
 *
 * Changes in 1.1.2
 * - Added iPhone styled example
 * - Fixed possible IE7 bug when determining if the ie6 class shoudl be applied.
 * - Added template for the close button, so that it's content could be customized.
 *
 * Changes in 1.1.1
 * - Fixed CSS styling bug for ie6 caused by a mispelling
 * - Changes height restriction on default notifications to min-height
 * - Added skinned examples using a variety of images
 * - Added the ability to customize the content of the [close all] box
 * - Added jTweet, an example of using jGrowl + Twitter
 *
 * Changes in 1.1.0
 * - Multiple container and instances.
 * - Standard $.jGrowl() now wraps $.fn.jGrowl() by first establishing a generic jGrowl container.
 * - Instance methods of a jGrowl container can be called by $.fn.jGrowl(methodName)
 * - Added glue preferenced, which allows notifications to be inserted before or after nodes in the container
 * - Added new log callback which is called before anything is done for the notification
 * - Corner's attribute are now applied on an individual notification basis.
 *
 * Changes in 1.0.4
 * - Various CSS fixes so that jGrowl renders correctly in IE6.
 *
 * Changes in 1.0.3
 * - Fixed bug with options persisting across notifications
 * - Fixed theme application bug
 * - Simplified some selectors and manipulations.
 * - Added beforeOpen and beforeClose callbacks
 * - Reorganized some lines of code to be more readable
 * - Removed unnecessary this.defaults context
 * - If corners plugin is present, it's now customizable.
 * - Customizable open animation.
 * - Customizable close animation.
 * - Customizable animation easing.
 * - Added customizable positioning (top-left, top-right, bottom-left, bottom-right, center)
 *
 * Changes in 1.0.2
 * - All CSS styling is now external.
 * - Added a theme parameter which specifies a secondary class for styling, such
 *   that notifications can be customized in appearance on a per message basis.
 * - Notification life span is now customizable on a per message basis.
 * - Added the ability to disable the global closer, enabled by default.
 * - Added callbacks for when a notification is opened or closed.
 * - Added callback for the global closer.
 * - Customizable animation speed.
 * - jGrowl now set itself up and tears itself down.
 *
 * Changes in 1.0.1:
 * - Removed dependency on metadata plugin in favor of .data()
 * - Namespaced all events
 */

 // Support for UMD style
// Based on UMDjs (https://github.com/umdjs/umd/blob/master/templates/jqueryPlugin.js)
(function (factory) {
    if ( typeof define === 'function' && define.amd ) {
        define(['jquery'], factory);
    } else if ( typeof module === 'object' && module.exports ) {
        module.exports = function( root, jQuery ) {
            if ( jQuery === undefined ) {
                if ( typeof window !== 'undefined' ) {
                    jQuery = require('jquery');
                }
                else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery);
            return jQuery;
        };
    } else {
        factory(jQuery);
    }
}(function ($) {

  let jGrowlNotificationIndex = 0;

  /** jGrowl Wrapper - Establish a base jGrowl Container for compatibility with older releases. **/
  $.jGrowl = function( m , o ) {
		// To maintain compatibility with older version that only supported one instance we'll create the base container.
		if ( $('#jGrowl').length === 0 )
			$('<div id="jGrowl"></div>').addClass( (o && o.position) ? o.position : $.jGrowl.defaults.position ).appendTo( (o && o.appendTo) ? o.appendTo : $.jGrowl.defaults.appendTo );

		// Create a notification on the container.
		$('#jGrowl').jGrowl(m,o);
	};

  const prefersReduced = window.matchMedia(`(prefers-reduced-motion: reduce)`) === true || window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;

  //function parameter func must include $(this).show() or .remove()/.hide() for use when prefersReduced is true.
  $.fn.jGrowlAnimate = function( properties, duration, easing, func, funcArgs ) {
    if ( prefersReduced ) {
      if ( typeof func === 'function' ) func.apply(this, funcArgs);
      return $(this);
    }
    else {
      return $(this).animate(properties, duration, easing, function() {
        if ( typeof func === 'function' ) func.apply(this, funcArgs);
      });
    }
  };

	/** Raise jGrowl Notification on a jGrowl Container **/
  $.fn.jGrowl = function( m , o ) {
		// Short hand for passing in just an object to this method
		if ( o === undefined && $.isPlainObject(m) ) {
			o = m;
			m = o.message;
		}

		if ( typeof this.each === 'function' ) {
			var args = arguments;

			return this.each(function() {
				/** Create a jGrowl Instance on the Container if it does not exist **/
				if ( $(this).data('jGrowl.instance') === undefined ) {
					$(this).data('jGrowl.instance', $.extend( new $.fn.jGrowl(), { notifications: [], element: null, interval: null } ));
					$(this).data('jGrowl.instance').startup( this );
				}

				/** Optionally call jGrowl instance methods, or just raise a normal notification **/
				if ( typeof $(this).data('jGrowl.instance')[m] === 'function' ) {
					$(this).data('jGrowl.instance')[m].apply( $(this).data('jGrowl.instance') , $.makeArray(args).slice(1) );
				} else {
					$(this).data('jGrowl.instance').create( m , o );
				}
			});
		}
	};

	$.extend( $.fn.jGrowl.prototype , {
		/** Default JGrowl Settings **/
		defaults: {
      //global options
			pool:				0,
			check:				250,
			ariaAssertive: false,
			position:			'top-right',
			appendTo:			'body',
			closer:				true,
			closerTemplate:		'<div>[ close all ]</div>',
			closerLabel: 'close all notifications',

      //individual notification options
			header:				'',
			group:				'',
			sticky:				false,
			glue:				'after',
			theme:				'default',
			themeState:			'highlight',
			corners:			'10px',
			life:				3000,
			closeDuration:		'normal',
			openDuration:		'normal',
			easing:				'swing',
			animateOpen:		{
				opacity:		'show'
			},
			animateClose:		{
				opacity:		'hide'
			},
			closeTemplate:		'&times;',
			closeLabel:	     	'close',
			log:				function() {},
			beforeOpen:			function() {},
			open:				function() {},
			afterOpen:			function() {},
			click:				function() {},
			beforeClose:		function() {},
			close:				function() {}
		},

		notifications: [],

		/** jGrowl Container Node **/
		element:				null,

		/** Interval Function **/
		interval:				null,

		/** Create a Notification **/
		create: function( message , options ) {
			var o = $.extend({}, this.defaults, options);

			/* To keep backward compatibility with 1.24 and earlier, honor 'speed' if the user has set it */
			if (typeof o.speed !== 'undefined') {
				o.openDuration = o.speed;
				o.closeDuration = o.speed;
			}

			this.notifications.push({ message: message , options: o });

			o.log.apply( this.element , [this.element,message,o] );
		},

		render: function( n ) {
			var self = this;
			var message = n.message;
			var o = n.options;
      var globalOptions = this.defaults;
      var idString = "jGrowl-notification-" + jGrowlNotificationIndex++;

      // Support for jQuery theme-states, if this is not used it displays a widget header
			o.themeState = (o.themeState === '') ? '' : 'ui-state-' + o.themeState;

			var notification = $('<div/>').attr("id", idString).attr("tabindex", 0)
				.addClass('jGrowl-notification alert ' + o.themeState + ' ui-corner-all' + ((o.group !== undefined && o.group !== '') ? ' ' + o.group : ''))
				.append($('<button/>').attr('aria-label', o.closeLabel).addClass('jGrowl-close').html(o.closeTemplate))
				.append($('<div/>').attr("id", idString + "-header").addClass('jGrowl-header').html(o.header))
				.append($('<div/>').attr("id", idString + "-message").addClass('jGrowl-message').html(message))
				.data("jGrowl", o).addClass(o.theme).children('.jGrowl-close').on("click.jGrowl", function() {
					$(this).parent().trigger('jGrowl.beforeClose');
					return false;
				})
				.parent();

      //direct screenreader to read message logically
      var headerExists = o.header && o.header.trim() !== '';
      $(notification).attr("aria-labelledby", idString + (headerExists ? "-header" : "-message"))
      if ( headerExists )
        $(notification).attr("aria-describedby", idString + "-message");

			/** Notification Actions **/
			$(notification).on("mouseover.jGrowl", function() {
				$('.jGrowl-notification', self.element).data("jGrowl.pause", true);
			}).on("mouseout.jGrowl", function() {
				$('.jGrowl-notification', self.element).data("jGrowl.pause", false);
			}).on('jGrowl.beforeOpen', function() {
				if ( typeof o.beforeOpen !== 'function' || o.beforeOpen.apply( notification , [notification,message,o,self.element] ) !== false ) {
					$(this).trigger('jGrowl.open');
				}
			}).on('jGrowl.open', function() {
				if ( typeof o.open !== 'function' || o.open.apply( notification , [notification,message,o,self.element] ) !== false ) {
					if ( o.glue == 'after' ) {
						$('.jGrowl-notification:last', self.element).after(notification);
					} else {
						$('.jGrowl-notification:first', self.element).before(notification);
					}

          $(this).jGrowlAnimate(o.animateOpen, o.openDuration, o.easing, function() {
            var options = $(this).data("jGrowl");

						// Fixes some anti-aliasing issues with IE filters.
						if ( $.support.opacity === false )
							this.style.removeAttribute('filter');

						if ( typeof options !== 'undefined' && options !== null ) // Happens when a notification is closing before it's open.
							$(this).data("jGrowl").created = new Date();

						$(this).show();
            $(this).trigger('jGrowl.afterOpen');
					});
				}
			}).on('jGrowl.afterOpen', function() {
				o.afterOpen.apply( notification , [notification,message,o,self.element] );
			}).on('click', function() {
				o.click.apply( notification, [notification,message,o,self.element] );
			}).on('jGrowl.beforeClose', function() {
				if ( typeof o.beforeClose !== 'function' || o.beforeClose.apply( notification , [notification,message,o,self.element] ) !== false )
					$(this).trigger('jGrowl.close');
			}).on('jGrowl.close', function() {
				// Pause the notification, lest during the course of animation another close event gets called.
				$(this).data('jGrowl.pause', true);

        $(this).jGrowlAnimate(o.animateClose, o.closeDuration, o.easing, function() {
					if ( typeof o.close !== 'function' || o.close.apply( notification , [notification,message,o,self.element] ) !== false )
						$(this).remove();
				});
			}).trigger('jGrowl.beforeOpen');

			/** Optional Corners Plugin **/
			if ( o.corners !== '' && $.fn.corner !== undefined ) $(notification).corner( o.corners );

			/** Add a Global Closer if more than one notification exists **/
      if ($('.jGrowl-notification:parent', self.element).length > 1 &&
				$('.jGrowl-closer', self.element).length === 0 && globalOptions.closer !== false ) {
				$(globalOptions.closerTemplate).attr('role', 'button').attr("tabIndex", "0").addClass('jGrowl-closer ' + globalOptions.themeState + ' ui-corner-all').addClass(globalOptions.theme)
        .appendTo(self.element).jGrowlAnimate(globalOptions.animateOpen, globalOptions.speed, globalOptions.easing, function() { $(this).show() })
				.on("click.jGrowl", function() {
					$(this).siblings().trigger("jGrowl.beforeClose");

					if ( typeof globalOptions.closer === 'function' ) {
						globalOptions.closer.apply( $(this).parent()[0] , [$(this).parent()[0]] );
					}
				});

        if ( globalOptions.closerLabel && globalOptions.closerLabel.trim() !== '' )
          $('.jGrowl-closer', self.element).attr('aria-label', globalOptions.closerLabel);
			}
		},

		/** Update the jGrowl Container, removing old jGrowl notifications **/
		update: function() {
			$(this.element).find('.jGrowl-notification:parent').each( function() {
				if ($(this).data("jGrowl") !== undefined && $(this).data("jGrowl").created !== undefined &&
					($(this).data("jGrowl").created.getTime() + parseInt($(this).data("jGrowl").life, 10))  < (new Date()).getTime() &&
					$(this).data("jGrowl").sticky !== true &&
					($(this).data("jGrowl.pause") === undefined || $(this).data("jGrowl.pause") !== true) ) {

					// Pause the notification, lest during the course of animation another close event gets called.
					$(this).trigger('jGrowl.beforeClose');
				}
			});

			if (this.notifications.length > 0 &&
				(this.defaults.pool === 0 || $(this.element).find('.jGrowl-notification:parent').length < this.defaults.pool) )
				this.render( this.notifications.shift() );

			if ($(this.element).find('.jGrowl-notification:parent').length < 2 ) {
        $('.jGrowl-closer', this.element).jGrowlAnimate(this.defaults.animateClose, this.defaults.speed, this.defaults.easing, function() { $(this).remove() });
			}
		},

		/** Setup the jGrowl Notification Container **/
		startup: function(e) {
			this.element = $(e).addClass('jGrowl').attr('role', "alert").attr('aria-live', this.defaults.ariaAssertive ? "assertive" : "polite").append('<div id="jGrowl-notification-' + jGrowlNotificationIndex++ + '" class="jGrowl-notification"></div>');
			this.interval = setInterval( function() {
				// some error in chage ^^
				var instance = $(e).data('jGrowl.instance');
				if (undefined !== instance) {
					try {
						instance.update();
					} catch (e) {
						instance.shutdown();
						throw e;
					}
				}
			}, parseInt(this.defaults.check, 10));
		},

		/** Shutdown jGrowl, removing it and clearing the interval **/
		shutdown: function() {
		    try {
			$(this.element).removeClass('jGrowl')
			    .find('.jGrowl-notification').trigger('jGrowl.close')
			    .parent().empty();
		    } catch (e) {
			throw e;
		    } finally {
			clearInterval(this.interval);
		    }
		},

		close: function() {
			$(this.element).find('.jGrowl-notification').each(function(){
				$(this).trigger('jGrowl.beforeClose');
			});
		}
	});

	/** Reference the Defaults Object for compatibility with older versions of jGrowl **/
	$.jGrowl.defaults = $.fn.jGrowl.prototype.defaults;

}));
