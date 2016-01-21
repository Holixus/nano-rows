var Rows = require('../index.js'),
    assert = require('core-assert'),
    clone = require('clone'),
    jso = require('nano-json');

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

var svg_arrows ='\
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 15 15">\n\
	<symbol viewBox="0 0 15 15" id="arrow-up">\n\
		<path d="M7.5 1c-.12 0-.24.053-.332.16L3.375 6.6c-.182.215-.1.39.18.39H5.14c.28 0 .51.23.51.51l.004 1.666v4.314l-.002.012c0 .28.238.508.518.508h2.678c.28 0 .51-.23.51-.51L9.35 7.5c0-.28.23-.51.51-.51h1.585c.28 0 .362-.175.18-.388L7.832 1.16C7.742 1.053 7.62 1 7.5 1z"/>\n\
	</symbol>\n\
	<symbol viewBox="0 0 15 15" id="arrow-left-up">\n\
		<use xlink:href="#arrow-up" transform="rotate(-45 7.5 7.5)" />\n\
	</symbol>\n\
	<symbol viewBox="0 0 15 15" id="arrow-left">\n\
		<use xlink:href="#arrow-up" transform="rotate(-90 7.5 7.5)" />\n\
	</symbol>\n\
	<symbol viewBox="0 0 15 15" id="arrow-left-down">\n\
		<use xlink:href="#arrow-up" transform="rotate(-135 7.5 7.5)" />\n\
	</symbol>\n\
	<symbol viewBox="0 0 15 15" id="arrow-right-up">\n\
		<use xlink:href="#arrow-up" transform="rotate(45 7.5 7.5)" />\n\
	</symbol>\n\
	<symbol viewBox="0 0 15 15" id="arrow-right">\n\
		<use xlink:href="#arrow-up" transform="rotate(90 7.5 7.5)" />\n\
	</symbol>\n\
	<symbol viewBox="0 0 15 15" id="arrow-right-down">\n\
		<use xlink:href="#arrow-up" transform="rotate(135 7.5 7.5)" />\n\
	</symbol>\n\
	<symbol viewBox="0 0 15 15" id="arrow-down">\n\
		<use xlink:href="#arrow-up" transform="rotate(180 7.5 7.5)" />\n\
	</symbol>\n\
	<symbol viewBox="0 0 15 15" id="arrows-horizon">\n\
		<path d="M5.752 3.29c-.046.013-.097.04-.15.087v-.004L.16 7.168c-.213.182-.213.48 0 .662l5.442 3.793c.213.182.388.1.388-.18V9.857c0-.274.22-.495.492-.505L8.5 9.348c.28 0 .51.23.51.51v1.585c0 .28.175.362.388.18v.004l5.442-3.795c.213-.182.213-.48 0-.662L9.398 3.377c-.213-.182-.388-.1-.388.18v1.586c0 .274-.22.495-.492.505L6.5 5.652c-.28 0-.51-.23-.51-.51V3.558c0-.21-.1-.31-.238-.268z"/>\n\
	</symbol>\n\
</svg>\n',
    svg_storage = '\
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">\n\
	<defs>\n\
		<filter id="folder-shadow-blur" width="1.234" height="1.255" x="-.117" y="-.128">\n\
			<feGaussianBlur stdDeviation=".585"/>\n\
		</filter>\n\
		<linearGradient id="folder-back-gradient" gradientUnits="userSpaceOnUse" x1="11.5" y1="11" x2="11" y2="4">\n\
			<stop stop-color="#0062ff" offset="0"/>\n\
			<stop stop-color="#b4d0ff" offset="1"/>\n\
		</linearGradient>\n\
		<linearGradient id="folder-paper-gradient" gradientUnits="userSpaceOnUse" x1="4.268" y1="5.732" x2="4.509" y2="7.652">\n\
			<stop stop-color="#fff" offset="0"/>\n\
			<stop stop-color="#dcdcdc" offset=".584"/>\n\
			<stop stop-color="#a9a9a9" offset="1"/>\n\
		</linearGradient>\n\
		<linearGradient id="folder-front-gradient" gradientUnits="userSpaceOnUse" x1="10" y1="4" x2="6" y2="18">\n\
			<stop stop-color="#0062ff" offset="0"/>\n\
			<stop stop-color="#87b4ff" offset=".446"/>\n\
			<stop stop-color="#fff" stop-opacity="1" offset="1"/>\n\
		</linearGradient>\n\
		<linearGradient id="linearGradient6557" gradientUnits="userSpaceOnUse" x1="11" y1="18" y2="-3">\n\
			<stop stop-color="#001138" offset="0"/>\n\
			<stop stop-color="#edf3ff" offset="1"/>\n\
		</linearGradient>\n\
		<linearGradient id="linearGradient6557-93" gradientUnits="userSpaceOnUse" x1="14.5" y1="12.5" x2="-.5" y2="4">\n\
			<stop stop-color="#001138" offset="0"/>\n\
			<stop stop-color="#e9f0ff" offset="1"/>\n\
		</linearGradient>\n\
		<linearGradient id="linearGradient6701" gradientUnits="userSpaceOnUse" x1="8" y1="17" x2="5" y2="2">\n\
			<stop stop-color="#dfe3ea" offset="0"/>\n\
			<stop stop-color="#fff" offset="1"/>\n\
		</linearGradient>\n\
	</defs>\n\
	<symbol id="ic-up" viewBox="0 0 16 16">\n\
		<path stroke-linejoin="round" d="m7.5 2-5 5.5 3.5-1v7h6.5l1.5-2.5h-5v-4.5l3.5 1z" stroke="#001138" stroke-width="0.4" fill="url(#folder-back-gradient)"/>\n\
	</symbol>\n\
	<symbol id="ic-folder" viewBox="0 0 16 16">\n\
		<g stroke-linejoin="round" stroke="#001138" stroke-width=".4">\n\
			<path d="M1.76 4.07l1-1h4l1 1h5l1 1v9h-12v-10z" opacity=".806" filter="url(#folder-shadow-blur)" fill="#000"/>\n\
			<path d="M1.5 3.5l1-1h4l1 1h5l1 1v9h-12v-10z" fill="url(#folder-back-gradient)"/>\n\
			<rect x="2.723" y="4.679" width="9.554" height="7.777" ry="0" fill="url(#folder-paper-gradient)"/>\n\
			<path d="M1.5 13.5c.688-2.333.34-3.667 2-6l12-1c-1.66 2.604-1.54 4.723-2 7h-12z" fill="url(#folder-front-gradient)"/>\n\
		</g>\n\
	</symbol>\n\
	<symbol id="ic-file" viewBox="0 0 16 16">\n\
		<g stroke-linejoin="round" stroke-width="0.4">\n\
			<path d="m2.5 1 0.5-0.5h7.5l3 3v11.5l-0.5 0.5h-10l-0.5-0.5v-14z" stroke="url(#linearGradient6557)" fill="url(#linearGradient6701)"/>\n\
			<path d="m10.5 0.5v3h3l-3-3z" stroke="url(#linearGradient6557)" fill="#fff"/>\n\
			<path d="m11.5 13.5h-7m7-2h-7m7-2h-7m7-2h-7m7-2h-7" stroke="url(#linearGradient6557-93)" stroke-linecap="square" stroke-width=".5" fill="none"/>\n\
		</g>\n\
	</symbol>\n\
	<symbol id="ic-cross" viewBox="0 0 16 16">\n\
		<path stroke-linejoin="round" d="m5 3-2 2 3 3-3 3 2 2 3-3 3 3 2-2l-3-3 3-3-2-2-3 3-3-3z" stroke="url(#linearGradient6557)" stroke-width=".5" fill="url(#linearGradient6701)"/>\n\
	</symbol>\n\
	<symbol id="ic-volume" viewBox="0 0 16 16">\n\
		<g stroke-linejoin="round" stroke="url(#linearGradient6557)" fill="url(#linearGradient6701)" stroke-width=".4">\n\
			<path d="M2 1l.5-.5h11l.5.5v14l-.5.5h-11L2 15z"/>\n\
			<circle cx="8" cy="7" r="4.5"/>\n\
			<circle opacity=".652" cx="8" cy="7" r=".809" stroke-width=".8"/>\n\
			<path d="M2 14l.5-.5h11l.5.5v1l-.5.5h-11L2 15z"/>\n\
			<path d="M13.5.5v13M2.5.5v13" stroke-width=".2"/>\n\
		</g>\n\
		<path stroke-linejoin="round" d="M4.184 10.976c-.29.175-.382.55-.208.84.175.29.55.382.84.208.026-.016.045-.036.058-.045l3.474-2.81-4.092 1.777c-.015.006-.044.013-.072.03z" stroke="url(#linearGradient6557)" stroke-width=".4" fill="url(#linearGradient6557)"/>\n\
		<path opacity=".5" d="M9 14.5l.5-.5H12l.5.5-.5.5H9.5l-.5-.5z" fill="url(#linearGradient6557)"/>\n\
	</symbol>\n\
</svg>\n\
';


function massive(name, fn, pairs) {
	suite(name, function () {
		for (var i = 0, n = pairs.length; i < n; i += 3)
			(function (name, args, ret) {
				test(name, function (done) {
					(args instanceof Array ? fn.apply(null, args) : fn.call(null, args)).then(function (result) {
						try {
							assert.deepStrictEqual(ret, result);
							done();
						} catch (e) {
							console.error(jso.jsml2str(result));
							return done(e);
						}
					}, done)
				});
			})(pairs[i], pairs[i+1], pairs[i+2]);
	});
}



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
