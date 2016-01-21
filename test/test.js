var Rows = require('../index.js'),
    assert = require('core-assert');

var timer = function (ms, v) {
	return new Promise(function (resolve, reject) {
		var to = setTimeout(function () {
				resolve(v);
			}, ms);
		return { cancel: function () {
			clearTimeout(to);
		}};
	});
};

suite('Rows', function () {

	suite('get_coords', function () {
		var samples = [
			'',
			'\n',
			'\n\n',
			'\n\n\n',
			'werwerewrwere',
			'rwerwerwer\nwerwerwerw',
			'\nwerwerwerwe',
			'werwerwer\n',
			'werwerw\nwerwerwerwer\nwrewerwerwer\nwerwerewr\nwerwerwer\n'
		];
		samples.forEach(function (sample, index) {
			test('get_coords/'+index, function (done) {
				var rows = new Rows(sample, 'name');
				var pss = [], row = 1, col = 1;
				for (var i = 0, n = sample.length; i < n; ++i, ++col) {
					var c = sample.charAt(i);
					assert.deepStrictEqual(rows.get_coords(i), [row, col]);
					if (c === '\n')
						++row, col = 0;
				}
				try {
					rows.get_coords(-1);
					return done(Error('passed a negative position'));
				} catch (e) {
				}
				try {
					rows.get_coords(sample.length);
					return done(Error('passed an after end position'));
				} catch (e) {
				}
				try {
					rows.get_coords(sample.length*2);
					return done(Error('passed far position'));
				} catch (e) {
				}
				done();
			});
		});
	});

	suite('get_label', function () {
		var samples = [
			'',
			'\n',
			'\n\n',
			'\n\n\n',
			'werwerewrwere',
			'rwerwerwer\nwerwerwerw',
			'\nwerwerwerwe',
			'werwerwer\n',
			'werwerw\nwerwerwerwer\nwrewerwerwer\nwerwerewr\nwerwerwer\n'
		];
		samples.forEach(function (sample, index) {
			test('get_coords/'+index, function (done) {
				var rows = new Rows(sample, 'name');
				var pss = [], row = 1, col = 1;
				for (var i = 0, n = sample.length; i < n; ++i, ++col) {
					var c = sample.charAt(i);
					assert.deepStrictEqual(rows.get_label(i), [ 'name(', row, ',', col, ')' ].join(''));
					if (c === '\n')
						++row, col = 0;
				}
				try {
					rows.get_coords(-1);
					return done(Error('passed a negative position'));
				} catch (e) {
				}
				try {
					rows.get_coords(sample.length);
					return done(Error('passed an after end position'));
				} catch (e) {
				}
				try {
					rows.get_coords(sample.length*2);
					return done(Error('passed far position'));
				} catch (e) {
				}
				done();
			});
		});
	});
});
