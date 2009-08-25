/*extern Smoke */

Smoke.Mock.ArgumentMatchers = (function() {
    var matchers = {
        any_args: {
            match: function(actual) {
                return true;
            }
        },

        anything: {
            match: function(actual) {
                return true;
            }
        },

        no_args: {
            match: function(actual) {
                return actual instanceof Array && actual.length === 0;
            }
        },

        instance_of: function(type) {
            return {
                match: function(actual) {
                    if (type == Number) {
                        return Number(actual) === actual || actual instanceof Number;
                    } else {
                        return actual instanceof type;
                    }
                }
            };
        },

        any_function: {
            match: function(actual) {
                return actual instanceof Function;
            }
        },

        any_object: {
            match: function(actual) {
                return actual instanceof Object;
            }
        }
    };

    function alias(matcher) {
        var aliases = Array.prototype.slice.call(arguments, 1), i;
        for (i = 0; i < aliases.length; i += 1) {
            matchers[aliases[i]] = matchers[matcher];
        }
    }

    alias('instance_of', 'an_instance_of', 'kind_of', 'a_kind_of');

    return matchers;
})();
