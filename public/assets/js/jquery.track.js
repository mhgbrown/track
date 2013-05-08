(function( window, $, undefined ) {

  var ATTR_TRACK_WITH = 'data-track-with',
      ATTR_TRACK_ON   = 'data-track-on',
      ATTR_TRACK_INFO = 'data-track-info',
      ATTR_TRACK_TYPE = 'data-track-type',
      KEY_TRACK_WITH  = $.camelCase( ATTR_TRACK_WITH.substring( 5 ) ),
      KEY_TRACK_ON    = $.camelCase( ATTR_TRACK_ON.substring( 5 ) ),
      KEY_TRACK_INFO  = $.camelCase( ATTR_TRACK_INFO.substring( 5 ) ),
      KEY_TRACK_TYPE  = $.camelCase( ATTR_TRACK_TYPE.substring( 5 ) ),
      CLICK_SELECTOR  = '[' + ATTR_TRACK_ON + '="click"][' + ATTR_TRACK_WITH + '], [' + ATTR_TRACK_WITH +']:not([' + ATTR_TRACK_ON + '])',
      OTHER_SELECTOR  = '[' + ATTR_TRACK_WITH + '][' + ATTR_TRACK_ON + '][' + ATTR_TRACK_ON + '!="click"]';

  function Track( $element, onAction ) {

    /**
     * Set up the necessary callbacks to handle tracking events.
     **/
    function init() {
      var $others      = $(OTHER_SELECTOR, $element),
          thisOnEvent = $.proxy( onEvent, this );

      $element.on( 'click', CLICK_SELECTOR, thisOnEvent );

      // other event types
      $others.each(function() {
        var $target = $(this),
            data    = $target.data(),
            trackOn = data[ KEY_TRACK_ON ];

        $target.on( trackOn, thisOnEvent );
      });
    }

    /**
     * Perform an action when a tracking event has been fired.
     *
     * @param {jQuery.Event} event The event fired.
     **/
    function onEvent( event ) {
      var $target   = $(event.target),
          data      = $target.data(),
          trackWith = data[ KEY_TRACK_WITH ],
          trackOn   = data[ KEY_TRACK_ON ],
          trackInfo = data[ KEY_TRACK_INFO ],
          trackType = data[ KEY_TRACK_TYPE ];

      onAction( event, trackOn, trackWith, trackInfo, trackType );
    }

    init();

  }

  $.fn.extend({

    /**
     * A convenience method to attaching tracking to a
     * jQuery object.
     *
     * @param {Object} onAction a callback to be executed when a tracking event occurs
     **/
    track: function( onAction ) {
      return this.each(function( index, element ) {
        new Track( $(this), onAction );
      });
    }

  });

}( window, jQuery ));