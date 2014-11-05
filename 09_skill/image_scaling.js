var gd = require("gd");

var imgType = {
	jpg: gd.JPEG,
	png: gd.PNG,
	gif: gd.GIF
};

// d：图片路径＋过滤器，形如：aaa/bbb/ccc.jsp.t300x200.jsp
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

// 过滤器选择器
var urlFilter = {
	t: function(img, fn) {
		var h_w = fn.split("x");
		if (h_w.length !== 2) return;

		var w = Number(h_w[0]) || 0,
			h = Number(h_w[1]) || 0;
		if (w <= 0 || h <= 0) return;

		var h1 = parseInt(w * img.height / img.width);
		if (h <= h1) {
			if (h1 === h) return img.resample(w, h);
			return thumbnail(img, w, h);
		}
	}
}

function thumbnail(img, nWidth, nHeight) {
	var iw = img.width,
		ih = img.height,
		h = 0,
		w = 0,
		l = 0,
		t = 0;

	if (nWidth * ih > nHeight * iw) {
		h = nHeight * iw / nWidth;
		w = iw;
		l = 0;
		t = (ih - h) / 4;
	} else {
		h = ih;
		w = nWidth * ih / nHeight;
		l = (iw - w) / 2;
		t = 0;
	}
	return img.crop(l, t, w, h).resample(nWidth, nHeight);
}