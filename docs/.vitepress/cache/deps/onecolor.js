import {
  __commonJS
} from "./chunk-Y2F7D3TJ.js";

// node_modules/onecolor/lib/color.js
var require_color = __commonJS({
  "node_modules/onecolor/lib/color.js"(exports, module) {
    var installedColorSpaces = [];
    var undef = function(obj) {
      return typeof obj === "undefined";
    };
    var channelRegExp = /\s*(\.\d+|\d+(?:\.\d+)?)(%)?\s*/;
    var percentageChannelRegExp = /\s*(\.\d+|100|\d?\d(?:\.\d+)?)%\s*/;
    var alphaChannelRegExp = /\s*(\.\d+|\d+(?:\.\d+)?)\s*/;
    var cssColorRegExp = new RegExp(
      "^(rgb|hsl|hsv)a?\\(" + channelRegExp.source + "," + channelRegExp.source + "," + channelRegExp.source + "(?:," + alphaChannelRegExp.source + ")?\\)$",
      "i"
    );
    function color(obj) {
      if (Array.isArray(obj)) {
        if (typeof obj[0] === "string" && typeof color[obj[0]] === "function") {
          return new color[obj[0]](obj.slice(1, obj.length));
        } else if (obj.length === 4) {
          return new color.RGB(obj[0] / 255, obj[1] / 255, obj[2] / 255, obj[3] / 255);
        }
      } else if (typeof obj === "string") {
        var lowerCased = obj.toLowerCase();
        if (color.namedColors[lowerCased]) {
          obj = "#" + color.namedColors[lowerCased];
        }
        if (lowerCased === "transparent") {
          obj = "rgba(0,0,0,0)";
        }
        var matchCssSyntax = obj.match(cssColorRegExp);
        if (matchCssSyntax) {
          var colorSpaceName = matchCssSyntax[1].toUpperCase(), alpha = undef(matchCssSyntax[8]) ? matchCssSyntax[8] : parseFloat(matchCssSyntax[8]), hasHue = colorSpaceName[0] === "H", firstChannelDivisor = matchCssSyntax[3] ? 100 : hasHue ? 360 : 255, secondChannelDivisor = matchCssSyntax[5] || hasHue ? 100 : 255, thirdChannelDivisor = matchCssSyntax[7] || hasHue ? 100 : 255;
          if (undef(color[colorSpaceName])) {
            throw new Error("color." + colorSpaceName + " is not installed.");
          }
          return new color[colorSpaceName](
            parseFloat(matchCssSyntax[2]) / firstChannelDivisor,
            parseFloat(matchCssSyntax[4]) / secondChannelDivisor,
            parseFloat(matchCssSyntax[6]) / thirdChannelDivisor,
            alpha
          );
        }
        if (obj.length < 6) {
          obj = obj.replace(/^#?([0-9a-f])([0-9a-f])([0-9a-f])$/i, "$1$1$2$2$3$3");
        }
        var hexMatch = obj.match(/^#?([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])$/i);
        if (hexMatch) {
          return new color.RGB(
            parseInt(hexMatch[1], 16) / 255,
            parseInt(hexMatch[2], 16) / 255,
            parseInt(hexMatch[3], 16) / 255
          );
        }
        if (color.CMYK) {
          var cmykMatch = obj.match(new RegExp(
            "^cmyk\\(" + percentageChannelRegExp.source + "," + percentageChannelRegExp.source + "," + percentageChannelRegExp.source + "," + percentageChannelRegExp.source + "\\)$",
            "i"
          ));
          if (cmykMatch) {
            return new color.CMYK(
              parseFloat(cmykMatch[1]) / 100,
              parseFloat(cmykMatch[2]) / 100,
              parseFloat(cmykMatch[3]) / 100,
              parseFloat(cmykMatch[4]) / 100
            );
          }
        }
      } else if (typeof obj === "object" && obj.isColor) {
        return obj;
      }
      return false;
    }
    color.namedColors = {};
    color.installColorSpace = function(colorSpaceName, propertyNames, config) {
      color[colorSpaceName] = function(a1) {
        var args = Array.isArray(a1) ? a1 : arguments;
        propertyNames.forEach(function(propertyName2, i) {
          var propertyValue = args[i];
          if (propertyName2 === "alpha") {
            this._alpha = isNaN(propertyValue) || propertyValue > 1 ? 1 : propertyValue < 0 ? 0 : propertyValue;
          } else {
            if (isNaN(propertyValue)) {
              throw new Error("[" + colorSpaceName + "]: Invalid color: (" + propertyNames.join(",") + ")");
            }
            if (propertyName2 === "hue") {
              this._hue = propertyValue < 0 ? propertyValue - Math.floor(propertyValue) : propertyValue % 1;
            } else {
              this["_" + propertyName2] = propertyValue < 0 ? 0 : propertyValue > 1 ? 1 : propertyValue;
            }
          }
        }, this);
      };
      color[colorSpaceName].propertyNames = propertyNames;
      var prototype = color[colorSpaceName].prototype;
      ["valueOf", "hex", "hexa", "css", "cssa"].forEach(function(methodName) {
        prototype[methodName] = prototype[methodName] || (colorSpaceName === "RGB" ? prototype.hex : function() {
          return this.rgb()[methodName]();
        });
      });
      prototype.isColor = true;
      prototype.equals = function(otherColor, epsilon) {
        if (undef(epsilon)) {
          epsilon = 1e-10;
        }
        otherColor = otherColor[colorSpaceName.toLowerCase()]();
        for (var i = 0; i < propertyNames.length; i = i + 1) {
          if (Math.abs(this["_" + propertyNames[i]] - otherColor["_" + propertyNames[i]]) > epsilon) {
            return false;
          }
        }
        return true;
      };
      prototype.toJSON = function() {
        return [colorSpaceName].concat(propertyNames.map(function(propertyName2) {
          return this["_" + propertyName2];
        }, this));
      };
      for (var propertyName in config) {
        if (config.hasOwnProperty(propertyName)) {
          var matchFromColorSpace = propertyName.match(/^from(.*)$/);
          if (matchFromColorSpace) {
            color[matchFromColorSpace[1].toUpperCase()].prototype[colorSpaceName.toLowerCase()] = config[propertyName];
          } else {
            prototype[propertyName] = config[propertyName];
          }
        }
      }
      prototype[colorSpaceName.toLowerCase()] = function() {
        return this;
      };
      prototype.toString = function() {
        return "[" + colorSpaceName + " " + propertyNames.map(function(propertyName2) {
          return this["_" + propertyName2];
        }, this).join(", ") + "]";
      };
      propertyNames.forEach(function(propertyName2) {
        var shortName = propertyName2 === "black" ? "k" : propertyName2.charAt(0);
        prototype[propertyName2] = prototype[shortName] = function(value, isDelta) {
          if (typeof value === "undefined") {
            return this["_" + propertyName2];
          } else if (isDelta) {
            return new this.constructor(propertyNames.map(function(otherPropertyName) {
              return this["_" + otherPropertyName] + (propertyName2 === otherPropertyName ? value : 0);
            }, this));
          } else {
            return new this.constructor(propertyNames.map(function(otherPropertyName) {
              return propertyName2 === otherPropertyName ? value : this["_" + otherPropertyName];
            }, this));
          }
        };
      });
      function installForeignMethods(targetColorSpaceName, sourceColorSpaceName) {
        var obj = {};
        obj[sourceColorSpaceName.toLowerCase()] = function() {
          return this.rgb()[sourceColorSpaceName.toLowerCase()]();
        };
        color[sourceColorSpaceName].propertyNames.forEach(function(propertyName2) {
          var shortName = propertyName2 === "black" ? "k" : propertyName2.charAt(0);
          obj[propertyName2] = obj[shortName] = function(value, isDelta) {
            return this[sourceColorSpaceName.toLowerCase()]()[propertyName2](value, isDelta);
          };
        });
        for (var prop in obj) {
          if (obj.hasOwnProperty(prop) && color[targetColorSpaceName].prototype[prop] === void 0) {
            color[targetColorSpaceName].prototype[prop] = obj[prop];
          }
        }
      }
      installedColorSpaces.forEach(function(otherColorSpaceName) {
        installForeignMethods(colorSpaceName, otherColorSpaceName);
        installForeignMethods(otherColorSpaceName, colorSpaceName);
      });
      installedColorSpaces.push(colorSpaceName);
      return color;
    };
    color.pluginList = [];
    color.use = function(plugin) {
      if (color.pluginList.indexOf(plugin) === -1) {
        this.pluginList.push(plugin);
        plugin(color);
      }
      return color;
    };
    color.installMethod = function(name, fn) {
      installedColorSpaces.forEach(function(colorSpace) {
        color[colorSpace].prototype[name] = fn;
      });
      return this;
    };
    color.installColorSpace("RGB", ["red", "green", "blue", "alpha"], {
      hex: function() {
        var hexString = (Math.round(255 * this._red) * 65536 + Math.round(255 * this._green) * 256 + Math.round(255 * this._blue)).toString(16);
        return "#" + "00000".substr(0, 6 - hexString.length) + hexString;
      },
      hexa: function() {
        var alphaString = Math.round(this._alpha * 255).toString(16);
        return "#" + "00".substr(0, 2 - alphaString.length) + alphaString + this.hex().substr(1, 6);
      },
      css: function() {
        return "rgb(" + Math.round(255 * this._red) + "," + Math.round(255 * this._green) + "," + Math.round(255 * this._blue) + ")";
      },
      cssa: function() {
        return "rgba(" + Math.round(255 * this._red) + "," + Math.round(255 * this._green) + "," + Math.round(255 * this._blue) + "," + this._alpha + ")";
      }
    });
    module.exports = color;
  }
});

// node_modules/onecolor/lib/XYZ.js
var require_XYZ = __commonJS({
  "node_modules/onecolor/lib/XYZ.js"(exports, module) {
    module.exports = function XYZ(color) {
      color.installColorSpace("XYZ", ["x", "y", "z", "alpha"], {
        fromRgb: function() {
          var convert = function(channel) {
            return channel > 0.04045 ? Math.pow((channel + 0.055) / 1.055, 2.4) : channel / 12.92;
          }, r = convert(this._red), g = convert(this._green), b = convert(this._blue);
          return new color.XYZ(
            r * 0.4124564 + g * 0.3575761 + b * 0.1804375,
            r * 0.2126729 + g * 0.7151522 + b * 0.072175,
            r * 0.0193339 + g * 0.119192 + b * 0.9503041,
            this._alpha
          );
        },
        rgb: function() {
          var x = this._x, y = this._y, z = this._z, convert = function(channel) {
            return channel > 31308e-7 ? 1.055 * Math.pow(channel, 1 / 2.4) - 0.055 : 12.92 * channel;
          };
          return new color.RGB(
            convert(x * 3.2404542 + y * -1.5371385 + z * -0.4985314),
            convert(x * -0.969266 + y * 1.8760108 + z * 0.041556),
            convert(x * 0.0556434 + y * -0.2040259 + z * 1.0572252),
            this._alpha
          );
        },
        lab: function() {
          var convert = function(channel) {
            return channel > 8856e-6 ? Math.pow(channel, 1 / 3) : 7.787037 * channel + 4 / 29;
          }, x = convert(this._x / 95.047), y = convert(this._y / 100), z = convert(this._z / 108.883);
          return new color.LAB(
            116 * y - 16,
            500 * (x - y),
            200 * (y - z),
            this._alpha
          );
        }
      });
    };
  }
});

// node_modules/onecolor/lib/LAB.js
var require_LAB = __commonJS({
  "node_modules/onecolor/lib/LAB.js"(exports, module) {
    module.exports = function LAB(color) {
      color.use(require_XYZ());
      color.installColorSpace("LAB", ["l", "a", "b", "alpha"], {
        fromRgb: function() {
          return this.xyz().lab();
        },
        rgb: function() {
          return this.xyz().rgb();
        },
        xyz: function() {
          var convert = function(channel) {
            var pow = Math.pow(channel, 3);
            return pow > 8856e-6 ? pow : (channel - 16 / 116) / 7.87;
          }, y = (this._l + 16) / 116, x = this._a / 500 + y, z = y - this._b / 200;
          return new color.XYZ(
            convert(x) * 95.047,
            convert(y) * 100,
            convert(z) * 108.883,
            this._alpha
          );
        }
      });
    };
  }
});

// node_modules/onecolor/lib/HSV.js
var require_HSV = __commonJS({
  "node_modules/onecolor/lib/HSV.js"(exports, module) {
    module.exports = function HSV(color) {
      color.installColorSpace("HSV", ["hue", "saturation", "value", "alpha"], {
        rgb: function() {
          var hue = this._hue, saturation = this._saturation, value = this._value, i = Math.min(5, Math.floor(hue * 6)), f = hue * 6 - i, p = value * (1 - saturation), q = value * (1 - f * saturation), t = value * (1 - (1 - f) * saturation), red, green, blue;
          switch (i) {
            case 0:
              red = value;
              green = t;
              blue = p;
              break;
            case 1:
              red = q;
              green = value;
              blue = p;
              break;
            case 2:
              red = p;
              green = value;
              blue = t;
              break;
            case 3:
              red = p;
              green = q;
              blue = value;
              break;
            case 4:
              red = t;
              green = p;
              blue = value;
              break;
            case 5:
              red = value;
              green = p;
              blue = q;
              break;
          }
          return new color.RGB(red, green, blue, this._alpha);
        },
        hsl: function() {
          var l = (2 - this._saturation) * this._value, sv = this._saturation * this._value, svDivisor = l <= 1 ? l : 2 - l, saturation;
          if (svDivisor < 1e-9) {
            saturation = 0;
          } else {
            saturation = sv / svDivisor;
          }
          return new color.HSL(this._hue, saturation, l / 2, this._alpha);
        },
        fromRgb: function() {
          var red = this._red, green = this._green, blue = this._blue, max = Math.max(red, green, blue), min = Math.min(red, green, blue), delta = max - min, hue, saturation = max === 0 ? 0 : delta / max, value = max;
          if (delta === 0) {
            hue = 0;
          } else {
            switch (max) {
              case red:
                hue = (green - blue) / delta / 6 + (green < blue ? 1 : 0);
                break;
              case green:
                hue = (blue - red) / delta / 6 + 1 / 3;
                break;
              case blue:
                hue = (red - green) / delta / 6 + 2 / 3;
                break;
            }
          }
          return new color.HSV(hue, saturation, value, this._alpha);
        }
      });
    };
  }
});

// node_modules/onecolor/lib/HSL.js
var require_HSL = __commonJS({
  "node_modules/onecolor/lib/HSL.js"(exports, module) {
    module.exports = function HSL(color) {
      color.use(require_HSV());
      color.installColorSpace("HSL", ["hue", "saturation", "lightness", "alpha"], {
        hsv: function() {
          var l = this._lightness * 2, s = this._saturation * (l <= 1 ? l : 2 - l), saturation;
          if (l + s < 1e-9) {
            saturation = 0;
          } else {
            saturation = 2 * s / (l + s);
          }
          return new color.HSV(this._hue, saturation, (l + s) / 2, this._alpha);
        },
        rgb: function() {
          return this.hsv().rgb();
        },
        fromRgb: function() {
          return this.hsv().hsl();
        }
      });
    };
  }
});

// node_modules/onecolor/lib/CMYK.js
var require_CMYK = __commonJS({
  "node_modules/onecolor/lib/CMYK.js"(exports, module) {
    module.exports = function CMYK(color) {
      color.installColorSpace("CMYK", ["cyan", "magenta", "yellow", "black", "alpha"], {
        rgb: function() {
          return new color.RGB(
            1 - this._cyan * (1 - this._black) - this._black,
            1 - this._magenta * (1 - this._black) - this._black,
            1 - this._yellow * (1 - this._black) - this._black,
            this._alpha
          );
        },
        fromRgb: function() {
          var red = this._red, green = this._green, blue = this._blue, cyan = 1 - red, magenta = 1 - green, yellow = 1 - blue, black = 1;
          if (red || green || blue) {
            black = Math.min(cyan, Math.min(magenta, yellow));
            cyan = (cyan - black) / (1 - black);
            magenta = (magenta - black) / (1 - black);
            yellow = (yellow - black) / (1 - black);
          } else {
            black = 1;
          }
          return new color.CMYK(cyan, magenta, yellow, black, this._alpha);
        }
      });
    };
  }
});

// node_modules/onecolor/lib/plugins/namedColors.js
var require_namedColors = __commonJS({
  "node_modules/onecolor/lib/plugins/namedColors.js"(exports, module) {
    module.exports = function namedColors(color) {
      color.namedColors = {
        aliceblue: "f0f8ff",
        antiquewhite: "faebd7",
        aqua: "0ff",
        aquamarine: "7fffd4",
        azure: "f0ffff",
        beige: "f5f5dc",
        bisque: "ffe4c4",
        black: "000",
        blanchedalmond: "ffebcd",
        blue: "00f",
        blueviolet: "8a2be2",
        brown: "a52a2a",
        burlywood: "deb887",
        cadetblue: "5f9ea0",
        chartreuse: "7fff00",
        chocolate: "d2691e",
        coral: "ff7f50",
        cornflowerblue: "6495ed",
        cornsilk: "fff8dc",
        crimson: "dc143c",
        cyan: "0ff",
        darkblue: "00008b",
        darkcyan: "008b8b",
        darkgoldenrod: "b8860b",
        darkgray: "a9a9a9",
        darkgrey: "a9a9a9",
        darkgreen: "006400",
        darkkhaki: "bdb76b",
        darkmagenta: "8b008b",
        darkolivegreen: "556b2f",
        darkorange: "ff8c00",
        darkorchid: "9932cc",
        darkred: "8b0000",
        darksalmon: "e9967a",
        darkseagreen: "8fbc8f",
        darkslateblue: "483d8b",
        darkslategray: "2f4f4f",
        darkslategrey: "2f4f4f",
        darkturquoise: "00ced1",
        darkviolet: "9400d3",
        deeppink: "ff1493",
        deepskyblue: "00bfff",
        dimgray: "696969",
        dimgrey: "696969",
        dodgerblue: "1e90ff",
        firebrick: "b22222",
        floralwhite: "fffaf0",
        forestgreen: "228b22",
        fuchsia: "f0f",
        gainsboro: "dcdcdc",
        ghostwhite: "f8f8ff",
        gold: "ffd700",
        goldenrod: "daa520",
        gray: "808080",
        grey: "808080",
        green: "008000",
        greenyellow: "adff2f",
        honeydew: "f0fff0",
        hotpink: "ff69b4",
        indianred: "cd5c5c",
        indigo: "4b0082",
        ivory: "fffff0",
        khaki: "f0e68c",
        lavender: "e6e6fa",
        lavenderblush: "fff0f5",
        lawngreen: "7cfc00",
        lemonchiffon: "fffacd",
        lightblue: "add8e6",
        lightcoral: "f08080",
        lightcyan: "e0ffff",
        lightgoldenrodyellow: "fafad2",
        lightgray: "d3d3d3",
        lightgrey: "d3d3d3",
        lightgreen: "90ee90",
        lightpink: "ffb6c1",
        lightsalmon: "ffa07a",
        lightseagreen: "20b2aa",
        lightskyblue: "87cefa",
        lightslategray: "789",
        lightslategrey: "789",
        lightsteelblue: "b0c4de",
        lightyellow: "ffffe0",
        lime: "0f0",
        limegreen: "32cd32",
        linen: "faf0e6",
        magenta: "f0f",
        maroon: "800000",
        mediumaquamarine: "66cdaa",
        mediumblue: "0000cd",
        mediumorchid: "ba55d3",
        mediumpurple: "9370d8",
        mediumseagreen: "3cb371",
        mediumslateblue: "7b68ee",
        mediumspringgreen: "00fa9a",
        mediumturquoise: "48d1cc",
        mediumvioletred: "c71585",
        midnightblue: "191970",
        mintcream: "f5fffa",
        mistyrose: "ffe4e1",
        moccasin: "ffe4b5",
        navajowhite: "ffdead",
        navy: "000080",
        oldlace: "fdf5e6",
        olive: "808000",
        olivedrab: "6b8e23",
        orange: "ffa500",
        orangered: "ff4500",
        orchid: "da70d6",
        palegoldenrod: "eee8aa",
        palegreen: "98fb98",
        paleturquoise: "afeeee",
        palevioletred: "d87093",
        papayawhip: "ffefd5",
        peachpuff: "ffdab9",
        peru: "cd853f",
        pink: "ffc0cb",
        plum: "dda0dd",
        powderblue: "b0e0e6",
        purple: "800080",
        rebeccapurple: "639",
        red: "f00",
        rosybrown: "bc8f8f",
        royalblue: "4169e1",
        saddlebrown: "8b4513",
        salmon: "fa8072",
        sandybrown: "f4a460",
        seagreen: "2e8b57",
        seashell: "fff5ee",
        sienna: "a0522d",
        silver: "c0c0c0",
        skyblue: "87ceeb",
        slateblue: "6a5acd",
        slategray: "708090",
        slategrey: "708090",
        snow: "fffafa",
        springgreen: "00ff7f",
        steelblue: "4682b4",
        tan: "d2b48c",
        teal: "008080",
        thistle: "d8bfd8",
        tomato: "ff6347",
        turquoise: "40e0d0",
        violet: "ee82ee",
        wheat: "f5deb3",
        white: "fff",
        whitesmoke: "f5f5f5",
        yellow: "ff0",
        yellowgreen: "9acd32"
      };
    };
  }
});

// node_modules/onecolor/lib/plugins/clearer.js
var require_clearer = __commonJS({
  "node_modules/onecolor/lib/plugins/clearer.js"(exports, module) {
    module.exports = function clearer(color) {
      color.installMethod("clearer", function(amount) {
        return this.alpha(isNaN(amount) ? -0.1 : -amount, true);
      });
    };
  }
});

// node_modules/onecolor/lib/plugins/luminance.js
var require_luminance = __commonJS({
  "node_modules/onecolor/lib/plugins/luminance.js"(exports, module) {
    module.exports = function luminance(color) {
      function channelLuminance(value) {
        return value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
      }
      color.installMethod("luminance", function() {
        var rgb = this.rgb();
        return 0.2126 * channelLuminance(rgb._red) + 0.7152 * channelLuminance(rgb._green) + 0.0722 * channelLuminance(rgb._blue);
      });
    };
  }
});

// node_modules/onecolor/lib/plugins/contrast.js
var require_contrast = __commonJS({
  "node_modules/onecolor/lib/plugins/contrast.js"(exports, module) {
    module.exports = function contrast(color) {
      color.use(require_luminance());
      color.installMethod("contrast", function(color2) {
        var lum1 = this.luminance();
        var lum2 = color2.luminance();
        if (lum1 > lum2) {
          return (lum1 + 0.05) / (lum2 + 0.05);
        }
        return (lum2 + 0.05) / (lum1 + 0.05);
      });
    };
  }
});

// node_modules/onecolor/lib/plugins/darken.js
var require_darken = __commonJS({
  "node_modules/onecolor/lib/plugins/darken.js"(exports, module) {
    module.exports = function darken(color) {
      color.use(require_HSL());
      color.installMethod("darken", function(amount) {
        return this.lightness(isNaN(amount) ? -0.1 : -amount, true);
      });
    };
  }
});

// node_modules/onecolor/lib/plugins/desaturate.js
var require_desaturate = __commonJS({
  "node_modules/onecolor/lib/plugins/desaturate.js"(exports, module) {
    module.exports = function desaturate(color) {
      color.use(require_HSL());
      color.installMethod("desaturate", function(amount) {
        return this.saturation(isNaN(amount) ? -0.1 : -amount, true);
      });
    };
  }
});

// node_modules/onecolor/lib/plugins/grayscale.js
var require_grayscale = __commonJS({
  "node_modules/onecolor/lib/plugins/grayscale.js"(exports, module) {
    module.exports = function grayscale(color) {
      function gs() {
        var rgb = this.rgb(), val = rgb._red * 0.3 + rgb._green * 0.59 + rgb._blue * 0.11;
        return new color.RGB(val, val, val, rgb._alpha);
      }
      color.installMethod("greyscale", gs).installMethod("grayscale", gs);
    };
  }
});

// node_modules/onecolor/lib/plugins/isDark.js
var require_isDark = __commonJS({
  "node_modules/onecolor/lib/plugins/isDark.js"(exports, module) {
    module.exports = function isDark(color) {
      color.installMethod("isDark", function() {
        var rgb = this.rgb();
        var yiq = (rgb._red * 255 * 299 + rgb._green * 255 * 587 + rgb._blue * 255 * 114) / 1e3;
        return yiq < 128;
      });
    };
  }
});

// node_modules/onecolor/lib/plugins/isLight.js
var require_isLight = __commonJS({
  "node_modules/onecolor/lib/plugins/isLight.js"(exports, module) {
    module.exports = function isLight(color) {
      color.use(require_isDark());
      color.installMethod("isLight", function() {
        return !this.isDark();
      });
    };
  }
});

// node_modules/onecolor/lib/plugins/lighten.js
var require_lighten = __commonJS({
  "node_modules/onecolor/lib/plugins/lighten.js"(exports, module) {
    module.exports = function lighten(color) {
      color.use(require_HSL());
      color.installMethod("lighten", function(amount) {
        return this.lightness(isNaN(amount) ? 0.1 : amount, true);
      });
    };
  }
});

// node_modules/onecolor/lib/plugins/mix.js
var require_mix = __commonJS({
  "node_modules/onecolor/lib/plugins/mix.js"(exports, module) {
    module.exports = function mix(color) {
      color.installMethod("mix", function(otherColor, weight) {
        otherColor = color(otherColor).rgb();
        weight = 1 - (isNaN(weight) ? 0.5 : weight);
        var w = weight * 2 - 1, a = this._alpha - otherColor._alpha, weight1 = ((w * a === -1 ? w : (w + a) / (1 + w * a)) + 1) / 2, weight2 = 1 - weight1, rgb = this.rgb();
        return new color.RGB(
          rgb._red * weight1 + otherColor._red * weight2,
          rgb._green * weight1 + otherColor._green * weight2,
          rgb._blue * weight1 + otherColor._blue * weight2,
          rgb._alpha * weight + otherColor._alpha * (1 - weight)
        );
      });
    };
  }
});

// node_modules/onecolor/lib/plugins/negate.js
var require_negate = __commonJS({
  "node_modules/onecolor/lib/plugins/negate.js"(exports, module) {
    module.exports = function negate(color) {
      color.installMethod("negate", function() {
        var rgb = this.rgb();
        return new color.RGB(1 - rgb._red, 1 - rgb._green, 1 - rgb._blue, this._alpha);
      });
    };
  }
});

// node_modules/onecolor/lib/plugins/opaquer.js
var require_opaquer = __commonJS({
  "node_modules/onecolor/lib/plugins/opaquer.js"(exports, module) {
    module.exports = function opaquer(color) {
      color.installMethod("opaquer", function(amount) {
        return this.alpha(isNaN(amount) ? 0.1 : amount, true);
      });
    };
  }
});

// node_modules/onecolor/lib/plugins/rotate.js
var require_rotate = __commonJS({
  "node_modules/onecolor/lib/plugins/rotate.js"(exports, module) {
    module.exports = function rotate(color) {
      color.use(require_HSL());
      color.installMethod("rotate", function(degrees) {
        return this.hue((degrees || 0) / 360, true);
      });
    };
  }
});

// node_modules/onecolor/lib/plugins/saturate.js
var require_saturate = __commonJS({
  "node_modules/onecolor/lib/plugins/saturate.js"(exports, module) {
    module.exports = function saturate(color) {
      color.use(require_HSL());
      color.installMethod("saturate", function(amount) {
        return this.saturation(isNaN(amount) ? 0.1 : amount, true);
      });
    };
  }
});

// node_modules/onecolor/lib/plugins/toAlpha.js
var require_toAlpha = __commonJS({
  "node_modules/onecolor/lib/plugins/toAlpha.js"(exports, module) {
    module.exports = function toAlpha(color) {
      color.installMethod("toAlpha", function(color2) {
        var me = this.rgb(), other = color2(color2).rgb(), epsilon = 1e-10, a = new color2.RGB(0, 0, 0, me._alpha), channels = ["_red", "_green", "_blue"];
        channels.forEach(function(channel) {
          if (me[channel] < epsilon) {
            a[channel] = me[channel];
          } else if (me[channel] > other[channel]) {
            a[channel] = (me[channel] - other[channel]) / (1 - other[channel]);
          } else if (me[channel] > other[channel]) {
            a[channel] = (other[channel] - me[channel]) / other[channel];
          } else {
            a[channel] = 0;
          }
        });
        if (a._red > a._green) {
          if (a._red > a._blue) {
            me._alpha = a._red;
          } else {
            me._alpha = a._blue;
          }
        } else if (a._green > a._blue) {
          me._alpha = a._green;
        } else {
          me._alpha = a._blue;
        }
        if (me._alpha < epsilon) {
          return me;
        }
        channels.forEach(function(channel) {
          me[channel] = (me[channel] - other[channel]) / me._alpha + other[channel];
        });
        me._alpha *= a._alpha;
        return me;
      });
    };
  }
});

// node_modules/onecolor/index.js
var require_onecolor = __commonJS({
  "node_modules/onecolor/index.js"(exports, module) {
    module.exports = require_color().use(require_XYZ()).use(require_LAB()).use(require_HSV()).use(require_HSL()).use(require_CMYK()).use(require_namedColors()).use(require_clearer()).use(require_contrast()).use(require_darken()).use(require_desaturate()).use(require_grayscale()).use(require_isDark()).use(require_isLight()).use(require_lighten()).use(require_luminance()).use(require_mix()).use(require_negate()).use(require_opaquer()).use(require_rotate()).use(require_saturate()).use(require_toAlpha());
  }
});
export default require_onecolor();
//# sourceMappingURL=onecolor.js.map
