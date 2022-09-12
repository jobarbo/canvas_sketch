// make a class object that can be used to convert hex to hsb values
export default class HexToHsb {
	constructor(hex) {
		this.hex = hex;
		this.hsb = this.convert(this.hex);
	}
	// convert hex to hsb
	convert(hex) {
		let colorArray = [];
		for (let i = 0; i < hex.length; i++) {
			let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex[i]);
			let r1 = parseInt(result[1], 16);
			let g1 = parseInt(result[2], 16);
			let b1 = parseInt(result[3], 16);
			let r = r1 / 255;
			let g = g1 / 255;
			let b = b1 / 255;
			let max = Math.max(r, g, b);
			let min = Math.min(r, g, b);
			let h = (max + min) / 2;
			let l = (max + min) / 2;
			let s = (max + min) / 2;
			// If max and min are the same, the hue is undefined
			if (max === min) {
				h = 0;
			} else {
				// Calculate hue
				if (max === r) {
					h = (g - b) / (max - min);
				} else if (max === g) {
					h = 2 + (b - r) / (max - min);
				} else if (max === b) {
					h = 4 + (r - g) / (max - min);
				}
				h = h * 60;
				if (h < 0) {
					h += 360;
				}
			}
			// Calculate lightness
			l = ((max + min) / 2) * 100;
			// Calculate saturation
			s = 0;
			if (l > 0 && l < 50) {
				s = ((max - min) / (max + min)) * 100;
			} else if (l >= 50 && l < 100) {
				s = ((max - min) / (2 - max - min)) * 100;
			}
			h = int(h);
			s = int(s);
			l = int(l);
			colorArray.push([h, s, l]);
		}
		return colorArray;
	}
}
