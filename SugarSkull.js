// --- LIBRARY CODE ----------------------------------------------

var APP = (typeof APP != "undefined") ? APP : {

	overrides: {},

	override: function(ns, plan) {
		overrides[ns] = plan;
	},

	exec: function(params) {

	    var strNS = params.ns;
		var ns = {};
	    var sectors = strNS.split('.');

	    for (var i = 0; i < sectors.length; i++) {
			var sector = sectors[i];

			if (i == 0 && !window[sector]) {
				window[sector] = {};
				ns = window[sector];
			}
			else {
				ns = ns[sector] = (ns[sector] ? ns[sector] : {});
			}
	    }
	
		delete this.Main;
		eval(params.ns + " = this;");

		var self = this;
		var methods = (typeof APP.overrides[ns] == "undefined") ? 
			params.plan : APP.overrides[ns];

		for(method in methods) {
			if(Object.prototype.toString.call(methods[method]) == "[object Array]") {
				self[methods[method][0]].call(self, methods[method].slice(1, methods[method].length));
			}
			else {
				self[methods[method]].call(self);			
			}
		}
	}
};

// --- APPLICATION CODE ----------------------------------------------

 (function() {

	/* private */

		/* code... */

	/* public */ return {

		Main: function() { /* the main entry point for the program, is fired automatically. */

			APP.exec.call(this, {
			/* some sugar to take care of namespacing, execution-context and code orginization. */

				ns: "myNS.foobar.bazz", /* the namespace that this code structure should be stored in. */

				plan: [ /* an array of names of functions that will be executed. */

					["UnitOne", "foo", 13, function() {}] /* sample parameters */
					,"UnitTwo"
					,"UnitThree"
				]
			});
		},

		UnitOne: function(args) {
			//console.log("asd")
			console.dir(myNS.foobar.bazz)
		},

		UnitTwo: function() {
			/* code... */
		},

		UnitThree: function() {
			/* code... */
		}					

	}
})().Main();