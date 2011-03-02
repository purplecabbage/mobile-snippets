Nitobi Mobile Snippets
======================

Put any useful mobile snippets in here!

hub.js
---------

A generic publish subscribe framework.

Unique feature is you can create auto-unsubscribing subscribers.

>
> var hub = new Hub(),
      guid = hub.on('incept', function() { alert('dream on'); } );
> hub.fire('incept'); // alerts 'dream on'
> hub.un(guid);
>
