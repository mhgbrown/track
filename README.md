# Track
Track allows you to trigger events with metadata based only upon data attributes.  It was designed to deal with simple action tracking where you might have an action, a code, and some data you want to record.

The inspiration for Track comes from the desire to separate the responsilities of action tracking from the JavaScript modules that give "widgets" their functionality.  "Widgets" in different environments can require different tracking characteristics.  Track allows you to accommodate these different characteristics without hacking tracking hooks into your JavaScript modules.

## Usage
It's easy to set up click tracking in your markup:

	<button id="dialog-trigger" data-track-with="opened-dialog">Open</button>

Then in your JavaScript:

	$(function() {
		$('body').track(function( event, trackOn, trackWith, trackInfo, trackType ) {
			// send some data to the server about what happened
		});
	});

If you'd like to send more information with your click event, just further annotate your markup:

	<button id="dialog-trigger" data-track-with="opened-dialog" data-track-info='{"more": "information"}' data-track-type="dialog">Open</button>

Now you're track handler will receive more information about the event.  Really, you can treat any of these attributes as you like.

If you want to trigger an action on a different event, again, further annotate your markup:

	<button id="dialog-trigger" data-track-on="monkey-click" data-track-with="opened-dialog" data-track-info='{"more": "information"}' data-track-type="dialog">Open</button>

Now anytime the "monkey-event" is triggered for this element, it will be tracked.

## Notes

 * ```trackOn``` will be undefined for default click events
 * There is no support for multiple tracking events on single element