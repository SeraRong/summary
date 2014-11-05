var gd = require("gd");

var imgType = {
	jpg: gd.JPEG,
	png: gd.PNG,
	gif: gd.GIF
};

// 过滤器选择器
var urlFilter = {
	r: function(img, fn) {
		var w = img.width,
			h = img.height;
		if (w > 720 || h > 500) return;

		var r = fn.split("x"),
			len = r.length;
		if (!len || len > 4) return;

		var r1,
			r2,
			r3,
			r4;
		switch (len) {
			case 1:
				r2 = r3 = r4 = r1 = Number(r[0]);
				break;
			case 2:
				r4 = r2 = Number(r[1]);
				r3 = r1 = Number(r[0]);
				break;
			case 3:
				r1 = Number(r[0]);
				r4 = r2 = Number(r[1]);
				r3 = Number(r[2]);
				break;
			case 4:
				r1 = Number(r[0]);
				r2 = Number(r[1]);
				r3 = Number(r[2]);
				r4 = Number(r[3]);
				break;
		}
		if (isNaN(r1) || isNaN(r2) || isNaN(r3) || isNaN(r4) || (!r1 && !r2 && !r3 && !r4) || r1 < 0 || r2 < 0 || r3 < 0 || r4 < 0) return;
		return radius(img, [r1, r2, r3, r4]);
	}
}

// 对图片的四个角分别进行圆化处理
// img：源图片；c：四个角圆化处理的圆的半径
function radius(img, c) {
	var w = img.width - 1,
		h = img.height - 1;
	img.alphaBlending = false;

	function semi_circle(a, d, r) {
		function return_length(r, x) {
			if (r < 5) return 0;
			var h = Math.sqrt(r * r * 2) - r,
				l = Math.floor(Math.sqrt(h * h * 2)) - 1 - x;
			if (l <= 0) return 0;
			return l;
		}

		var x,
			y,
			b,
			l;

		for (var i = 0; i < a.length; i++) {
			b = a[i];
			l = return_length(r, i)
			for (var j = 0; j < b.length + l; j++) {
				switch (d) {
					case 0:
						x = i;
						y = j;
						break;
					case 1:
						x = w - j;
						y = i;
						break;
					case 2:
						x = w - i;
						y = h - j;
						break;
					case 3:
						x = j;
						y = h - i;
						break;
				}
				img.setPixel(x, y, ((j < l) ? 127 : b[j - l]) << 24 | img.getPixel(x, y) & 0xffffff);
			}
		}
	}

	for (var i = 0; i < c.length; i++) {
		var a = getAlphaValues(c[i]);
		if (a) semi_circle(a, i, c[i]);
	}

	return img;
}

// 获取圆化半径为r的透明度数组
function getAlphaValues(r) {
	if (r <= 0) {
		return [];
	}

	var width, height, diameter;
	width = height = 1000;
	diameter = 2 * r;
	var img = gd.create(width, height);
	img.alphaBlending = false;
	img.filledRectangle(0, 0, width, height, 0x7fffffff);
	img.filledEllipse(width / 2, height / 2, width, height, 0xff0000);
	img = img.resample(diameter, diameter);

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

// d：图片路径＋过滤器，形如：aaa/bbb/ccc.jsp.r10x60x30x70.jsp
function url2img(d) {
	var p = d.split(".");
	var k = p.shift();

	if (!k || (k.indexOf("/") > -1 && p.length < 2) || (k.indexOf("/") === -1 && p.length < 1)) {
		return;
	}

	var t = p.pop();
	if (!imgType[t]) {
		return;
	}

	var f, img;
	if (k.indexOf("/") > -1) {
		var path = k + "." + p.shift();
		try {
			f = fs.open(path);
		} catch (e) {
			return;
		}
		img = gd.load(f);
	}

	for (var i = 0; i < p.length; i++) {
		var n = p[i],
			fn = urlFilter[n] || urlFilter[n[0]];

		if (!fn) {
			return;
		} else {
			img = fn(img, n.substr(1));
			if (!img) {
				return;
			}
		}
	}
	return img.getData(imgType[t] || gd.JPEG);
}