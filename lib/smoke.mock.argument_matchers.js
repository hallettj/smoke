/*extern Smoke */

Smoke.Mock.ArgumentMatchers = (function() {
    var matchers = {};

    function ArgMatcher(name, match) {
        this.match = match;
        this.toString = function() { return String(name); };
    }

    function matcher(name, match) {
        matchers[name] = new ArgMatcher(name, match);
    }

    function alias(matcher) {
        var aliases = Array.prototype.slice.call(arguments, 1), i;
        for (i = 0; i < aliases.length; i += 1) {
            matchers[aliases[i]] = matchers[matcher];
        }
    }

    matcher('any_args', function(actual) {
        return true;
    });

    matcher('anything', function(actual) {
        return true;
    });

    matcher('no_args', function(actual) {
        return actual instanceof Array && actual.length === 0;
    });

    matcher('a_function', function(actual) {
        return actual instanceof Function;
    });

    matcher('an_array', function(actual) {
        return actual instanceof Array;
    });

    matcher('an_object', function(actual) {
        return actual instanceof Object;
    });

    matchers.instance_of = function(type) {
        return new ArgMatcher('instance_of(' + type + ')', function(actual) {
            if (type == Number) {
                return Number(actual) === actual || actual instanceof Number;
            } else {
                return actual instanceof type;
            }
        });
    };
    alias('instance_of', 'an_instance_of', 'kind_of', 'a_kind_of');

    return matchers;
})();
