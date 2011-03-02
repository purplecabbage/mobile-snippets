Tests.prototype.HubTests = function() {
    module('Hub');
	test('should exist', function() {
  		expect(1);
  		equal(typeof Hub, 'object', 'Hub should be an object.');
	});    
    
	module('Channel', {
	    setup: function() {
	    },
	    teardown: function() {
	    }
	});
	test('should exist', function() {
  		expect(1);
  		equal(typeof Channel, 'function', 'Channel should be a function.');
	});

	test('constructor should work', function() {
  		expect(1);
  		var c = new Channel();
  		equal(typeof c, 'object', 'new Channel() should work.');
	});

	test('constructor should accept and set a type', function() {
  		expect(1);
  		var c = new Channel('foo');
  		equal(c.type, 'foo', 'type should be foo');
	});

	test('handlers list should be empty by default', function() {
  		expect(1);
  		var c = new Channel();
  		equal(typeof c.handlers, 'object', 'handlers should be an empty object');
	});

	test('guid should be 0 by default', function() {
  		expect(1);
  		var c = new Channel();
  		equal(c.guid, 0, 'guid should be 0');
	});

	test('fired should be false by default', function() {
  		expect(1);
  		var c = new Channel();
  		equal(c.fired, false, 'fired should be false');
	});

	test('#on should exist', function() {
  		expect(1);
  		var c = new Channel();
  		equal(typeof c.on, 'function', 'on should be a function.');
	});

	test('#un should exist', function() {
  		expect(1);
  		var c = new Channel();
  		equal(typeof c.un, 'function', 'un should be a function.');
	});

	test('#fire should exist', function() {
  		expect(1);
  		var c = new Channel();
  		equal(typeof c.fire, 'function', 'fire should be a function.');
	});

    test('#join should call a function only after a set of events fire', function() {
        //event0.join( [ event1, event2 ] );
        expect(1);
    });

    test('#fork should call several functions only after a certain event fires', function() {
        //event0.fork( [ event1, event2 ] );
        expect(1);
    });

    test('#branch should call a certain function depending on some result or state after a certain event fires', function() {
        //event0.branch( { 'true': event1, 'false': event2 } );
        expect(1);
    });

    test('#merge should call a certain function when one of any number of events are fired', function() {
        //event0.merge( [ event1, event2 ] );
        expect(1);
    });

};