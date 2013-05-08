/**
 * Make sure the basics are functional
 **/
$(function() {
  var $simple = $('#simple'),
    $simpleExtra = $('#simple-extra'),
    $otherEvent = $('#other-event'),
    testFunctions = {
      'simple': function( event, trackOn, trackWith, trackInfo, trackType ) {
        console.assert( trackOn === undefined );
        console.assert( trackWith === 'simple' );
        console.assert( trackInfo === undefined );
        console.assert( trackType === undefined );
        $simple.css( 'background-color', 'green' );
      },

      'simple-extra': function( event, trackOn, trackWith, trackInfo, trackType ) {
        console.assert( trackOn === undefined );
        console.assert( trackWith === 'simple' );
        console.assert( trackInfo.foo === 'bar' );
        console.assert( trackType === 'complex' );
        $simpleExtra.css( 'background-color', 'green' );
      },

      'other-event': function( event, trackOn, trackWith, trackInfo, trackType ) {
        console.assert( trackOn === 'other-event' );
        console.assert( trackWith === 'simple' );
        console.assert( trackInfo.foo === 'bar' );
        console.assert( trackType === 'complex' );
        $otherEvent.css( 'background-color', 'green' );
      }
    };

  $('body').track(function( event, trackOn, trackWith, trackInfo, trackType ) {
    var $target = $(event.target);
    testFunctions[ $target.attr( 'id' ) ].apply( this, arguments );
  });

  setTimeout(function() {
    $simple.trigger( 'click' );
    $simpleExtra.trigger( 'click' );
    $otherEvent.trigger( 'other-event' );
  }, 100);

});