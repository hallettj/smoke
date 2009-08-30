/*extern Smoke jQuery */

Smoke.Matcher = function(name, match) {
		this.match = match;
		this.toString = function() { return String(name); };
};

Smoke.Matcher.ArgumentMatchers = (function($) {
	var matchers = {};

	function matcher(name, match) {
		matchers[name] = new Smoke.Matcher(name, match);
	}

	function alias(matcher) {
		var aliases = Array.prototype.slice.call(arguments, 1), i;
		for (i = 0; i < aliases.length; i += 1) {
			matchers[aliases[i]] = matchers[matcher];
		}
	}

	function isArray(obj) {
		return Object.prototype.toString.call(obj) === "[object Array]";
	}

	matcher('any_args', function(actual) {
		return true;
	});

	matcher('anything', function(actual) {
		return true;
	});

	matcher('no_args', function(actual) {
		return isArray(actual) && actual.length === 0;
	});

	matcher('a_function', function(actual) {
		return $.isFunction(actual);
	});

	matcher('an_array', function(actual) {
		return isArray(actual);
	});

	matcher('an_object', function(actual) {
		return typeof(actual) == 'object' && actual !== null;
	});

	matcher('a_number', function(actual) {
		return Number(actual) === actual || actual instanceof Number;
	});

	matchers.instance_of = function(type) {
		return new Smoke.Matcher('instance_of(' + type + ')', function(actual) {
			if (type == Number) {
				return Number(actual) === actual || actual instanceof Number;
			} else {
				return actual instanceof type;
			}
		});
	};
	alias('instance_of', 'an_instance_of', 'kind_of', 'a_kind_of');

	return matchers;
})(jQuery);
