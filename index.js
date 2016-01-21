"use strict";

function Rows(text, text_name) {
	this.s = text_name;
	this.l = text.length;
	var idx = this.i = [ 0 ];
	for (var re = /\n/g, pos; (pos = re.exec(text)); )
		idx.push(pos.index+1);
}

Rows.prototype = {
	get_coords: function (offset) { // returns [ row, col ] 1-based coords in the text
		if (offset >= this.l || offset < 0)
			throw Error('out of text');

		var idx = this.i, left = 0, right = idx.length;
		if (right < 2)
			return [ 1, offset+1 ];
		while (left < right - 1) {
			var middle = ((left+right) / 2) | 0,
			    pos = idx[middle];
			if (offset < pos)
				right = middle;
			else
				left = middle;
		}
		return [ left + 1, offset - idx[left] + 1 ];
	},
	get_label: function (ofs) {
		return [ this.s, '(', this.get_coords(ofs).join(','), ')' ].join('');
	}
};

module.exports = Rows;
