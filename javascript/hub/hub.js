var Hub = (function() {
    var undefined;

    return {
    	channels: {},
    	on: function(type, func, obj) {
    		return this.getChannel(type).on(func, obj);
    	},
    	once: function(type, func, obj) {
    		return this.getChannel(type).once(func, obj);
    	},
    	un: function(type, guid) {
    		this.getChannel(type).un(guid);
    	},
    	fire: function(type) {
    		this.getChannel(type).fire();
    	},
    	getChannel: function(type) {
    		var c = this.channels[type];
    		if (c == undefined) {
    			c = this.channels[type] = new Channel();
    		}
    		return c;
    	}
    };
})();

var Channel = (function() {
    /**
     * The Channel class is a simple publish-subscribe class. An instance of a Channel
     * represents an action that functions can be subscribed to.
     * @param {string} [type] The type or name of the Channel.
     */
    var Channel = function(type) {
        this.type = type;
        this.handlers = {};
        this.guid = 0;
        this.fired = false;
        this.enabled = true;
    };

    /**
     * Calls the provided function only after all of the channels specified
     * have been fired.
     */
    Channel.join = function(h, c) {
        var i = c.length;
        var f = function() {
            if (!(--i)) h();
        };
        for (var j=0; j<i; j++) {
            (!c[j].fired?c[j].once(f):i--);
        }
        if (!i) h();
    };

    Channel.prototype = {
        /**
         * Subscribes the given function to the channel. Any time that 
         * Channel.fire is called so too will the function.
         * Optionally specify an execution context for the function
         * and a guid that can be used to stop subscribing to the channel.
         * Returns the guid.
         */
        on: function(f, c, g) {
            // need a function to call
            if (f == null) { return; }

            var func = f;
            if (typeof c == "object" && f instanceof Function) { func = close(c, f); }

            g = g || func.observer_guid || f.observer_guid || this.guid++;
            func.observer_guid = g;
            f.observer_guid = g;
            this.handlers[g] = func;
            return g;
        },

        /**
         * Like subscribe but the function is only called once and then it
         * auto-unsubscribes itself.
         */
        once: function(f, c) {
            var g = null;
            var _this = this;
            var m = function() {
                f.apply(c || null, arguments);
                _this.un(g);
            };
            if (this.fired) {
        	    if (typeof c == "object" && f instanceof Function) { f = close(c, f); }
                f.apply(this, this.fireArgs);
            } else {
                g = this.on(m);
            }
            return g;
        },

        /** 
         * Unsubscribes the function with the given guid from the channel.
         */
        un: function(g) {
            if (g instanceof Function) { g = g.observer_guid; }
            this.handlers[g] = null;
            delete this.handlers[g];
        },

        /** 
         * Calls all functions subscribed to this channel.
         */
        fire: function() {
            if (this.enabled) {
                var fail = false;
        		// TODO: change to ES5 Object.getOwnPropertyNames(obj).forEach
                for (var item in this.handlers) {
                    var handler = this.handlers[item];
                    if (handler instanceof Function) {
                        var rv = (handler.apply(this, arguments)==false);
                        fail = fail || rv;
                    }
                }
                this.fired = true;
                this.fireArgs = arguments;
                return !fail;
            }
            return true;
        }
    };

    return Channel;
})();