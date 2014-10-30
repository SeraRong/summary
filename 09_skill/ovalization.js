var gd = require('gd');
var MAX_RADUIS = 30;

function getAlphaValue(raduis) {
	raduis = raduis || MAX_RADUIS;

	// 传入图片的宽、高和图片边角圆化处理的圆的半径范围
	function alphasArray(width, height, start, end) {
		var all = [null],
			img = gd.create(width, height);
		img.alphaBlending = false;
		img.filledRectangle(0, 0, width, height, 0x7fffffff);
		img.filledEllipse(width / 2, height / 2, width, height, 0xff0000);

		// 传入图片和边角圆化处理的圆的半径
		function alphaArray(img, r) {
			var a,
				b,
				c = [],
				d = 0;

			function filterLen(r) {
				if (r < 5) return 0;
				var h = Math.sqrt(r * r * 2) - r;
				return Math.floor(Math.sqrt(h * h * 2)) - 1;
			}

			d = filterLen(r);

			for (var i = 0; i < r; i++) {
				b = [];
				for (var j = 0; j < r; j++) {
					a = img.getPixel(i, j) >> 24;
					if (!a) continue;
					b[j] = a;

					if (a === 127 && j) {
						for (var q = 0; q < b.length; q++) {
							b[q] = 127;
						}
					}
				}
				if (b.length) {
					if (d > 0) {
						b = b.slice(d);
						d = d - 1;
					}
					c[i] = b;
				}
			}
			return c;
		}

		for (var r = start; r <= end; r++) {
			all[r] = alphaArray(img.resample(2 * r, 2 * r), r);
		}
		return all;
	}

	return alphasArray(1000, 1000, 1, raduis);
}

var alphavalue = alphavalue || getAlphaValue();
console.log(alphavalue);