/*extern Screw Smoke describe before it expect equal mock */

Screw.Unit(function() {
	describe("matchers", function() {
		describe("Smoke.Matcher", function() {
			var matcher;

			before(function() {
				matcher = new Smoke.Matcher('test_matcher', function(actual) {
					return !!actual;
				});
			});

			it("should have a `match()` method", function() {
				expect(typeof(matcher.match)).to(equal, 'function');
			});

			it("should have its own `toString()` method", function() {
				expect(typeof(matcher.toString)).to(equal, 'function');
				expect(matcher.hasOwnProperty('toString')).to(equal, true);
			});

			it("should give its name as its string representation", function() {
				expect(matcher.toString()).to(equal, 'test_matcher');
			});
		});

		describe("checking expectations", function() {
			var obj, matcher;

			before(function() {
				matcher = mock(new Smoke.Matcher('test_matcher', function() { return true; }));
				obj = mock({ test_func: function() { } });
			});

			it("should convert `arguments` object to an array before testing matchers", function() {
				obj.should_receive('test_func').with_arguments(matcher);
				//matcher.should_receive('match').with_arguments(Smoke.Matcher.ArgumentMatchers.an_array);
				matcher.should_receive('match').with_arguments(Smoke.Matcher.ArgumentMatchers.an_array).exactly('once');;
				obj.test_func();
			});

			it("should test `match()` methods on matchers", function() {
				obj.should_receive('test_func').with_arguments(matcher);
				matcher.should_receive('match').exactly('once');
				obj.test_func('foo');
			});

			it("should recursively test object attributes that are matchers", function() {
				var a = mock(new Smoke.Matcher('matcher a', function() { }));
				var b = mock(new Smoke.Matcher('matcher b', function() { }));
				var c = mock(new Smoke.Matcher('matcher c', function() { }));
				obj.should_receive('test_func').with_arguments({ a: a, b: b, c: c });
				a.should_receive('match').exactly('once').and_return(true);
				b.should_receive('match').exactly('once').and_return(true);
				c.should_receive('match').exactly('once').and_return(true);
				obj.test_func({ a: 1, b: 2, c: 3 });
			});

			it("should test array items that are matchers", function() {
				var a = mock(new Smoke.Matcher('matcher a', function() { }));
				var b = mock(new Smoke.Matcher('matcher b', function() { }));
				var c = mock(new Smoke.Matcher('matcher c', function() { }));
				obj.should_receive('test_func').with_arguments([a, b, c]);
				a.should_receive('match').exactly('once').and_return(true);
				b.should_receive('match').exactly('once').and_return(true);
				c.should_receive('match').exactly('once').and_return(true);
				obj.test_func([1, 2, 3]);
			});
		});

		describe("predefined matchers", function() {
			var matchers = Smoke.Matcher.ArgumentMatchers;

			it("should match `any_args` with any arguments", function() {
				expect(matchers.any_args.match(['foo', 'bar'])).to(equal, true);
				expect(matchers.any_args.match(['foo'])).to(equal, true);
				expect(matchers.any_args.match([3])).to(equal, true);
				expect(matchers.any_args.match([])).to(equal, true);
			});

			it("should match `anything` with any argument", function() {
				expect(matchers.anything.match(['foo', 'bar'])).to(equal, true);
				expect(matchers.anything.match(function() {})).to(equal, true);
				expect(matchers.anything.match({ foo: 3 })).to(equal, true);
				expect(matchers.anything.match(undefined)).to(equal, true);
			});

			it("should only match `no_args` with empty argument lists", function() {
				expect(matchers.no_args.match([])).to(equal, true);
				expect(matchers.no_args.match(['foo', 'bar'])).to(equal, false);
				expect(matchers.no_args.match(function() {})).to(equal, false);
				expect(matchers.no_args.match({ foo: 3 })).to(equal, false);
				expect(matchers.no_args.match(undefined)).to(equal, false);
			});
		});
	});
});
