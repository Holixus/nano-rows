[![Gitter][gitter-image]][gitter-url]
[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Dependency Status][david-image]][david-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

# nano-rows
Text rows indexer. Calculates text coords (row/col) by character index.


```js
var Rows = require('nano-rows');

var index = new Rows(fs.readFile('source.txt', 'utf8'), 'source.txt');

try {
	console.log(index.get_label(index.indexOf('blah')), '"blah" position');
} catch (e) {
	console.log('no "blah" found');
}
```

## API

### Constructor: Rows(text, name)

* text `String`
* name `String` -- text name

### rows.get_coords(offset)

Returns [ row, col ] for the character `offset`.

### rows.get_label(offset)

Returns text like "text-name(<row>,<col>)".


[gitter-image]: https://badges.gitter.im/Holixus/nano-rows.svg
[gitter-url]: https://gitter.im/Holixus/nano-rows
[npm-image]: https://img.shields.io/npm/v/nano-rows.svg
[npm-url]: https://npmjs.org/package/nano-rows
[github-tag]: http://img.shields.io/github/tag/Holixus/nano-rows.svg
[github-url]: https://github.com/Holixus/nano-rows/tags
[travis-image]: https://travis-ci.org/Holixus/nano-rows.svg?branch=master
[travis-url]: https://travis-ci.org/Holixus/nano-rows
[coveralls-image]: https://img.shields.io/coveralls/Holixus/nano-rows.svg
[coveralls-url]: https://coveralls.io/r/Holixus/nano-rows
[david-image]: http://img.shields.io/david/Holixus/nano-rows.svg
[david-url]: https://david-dm.org/Holixus/nano-rows
[license-image]: http://img.shields.io/npm/l/nano-rows.svg
[license-url]: LICENSE
[downloads-image]: http://img.shields.io/npm/dm/nano-rows.svg
[downloads-url]: https://npmjs.org/package/nano-rows
