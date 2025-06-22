import { isString } from '../types';

type ColorChannel = [number, number, number];

type ColorMode = 'rgb' | 'hsv';

type ColorChannels = Record<ColorMode, ColorChannel>;

function minmax(number: number, min: number, max: number) {
    return Math.max(min, Math.min(number, max));
}

const colorsMappers: { [key: string]: string } = {
    aliceblue: "#f0f8ff",
    antiquewhite: "#faebd7",
    aqua: "#00ffff",
    aquamarine: "#7fffd4",
    azure: "#f0ffff",
    beige: "#f5f5dc",
    bisque: "#ffe4c4",
    black: "#000000",
    blanchedalmond: "#ffebcd",
    blue: "#0000ff",
    blueviolet: "#8a2be2",
    brown: "#a52a2a",
    burlywood: "#deb887",
    cadetblue: "#5f9ea0",
    chartreuse: "#7fff00",
    chocolate: "#d2691e",
    coral: "#ff7f50",
    cornflowerblue: "#6495ed",
    cornsilk: "#fff8dc",
    crimson: "#dc143c",
    cyan: "#00ffff",
    darkblue: "#00008b",
    darkcyan: "#008b8b",
    darkgoldenrod: "#b8860b",
    darkgray: "#a9a9a9",
    darkgreen: "#006400",
    darkkhaki: "#bdb76b",
    darkmagenta: "#8b008b",
    darkolivegreen: "#556b2f",
    darkorange: "#ff8c00",
    darkorchid: "#9932cc",
    darkred: "#8b0000",
    darksalmon: "#e9967a",
    darkseagreen: "#8fbc8f",
    darkslateblue: "#483d8b",
    darkslategray: "#2f4f4f",
    darkturquoise: "#00ced1",
    darkviolet: "#9400d3",
    deeppink: "#ff1493",
    deepskyblue: "#00bfff",
    dimgray: "#696969",
    dodgerblue: "#1e90ff",
    firebrick: "#b22222",
    floralwhite: "#fffaf0",
    forestgreen: "#228b22",
    fuchsia: "#ff00ff",
    gainsboro: "#dcdcdc",
    ghostwhite: "#f8f8ff",
    gold: "#ffd700",
    goldenrod: "#daa520",
    gray: "#808080",
    green: "#008000",
    greenyellow: "#adff2f",
    honeydew: "#f0fff0",
    hotpink: "#ff69b4",
    indianred: "#cd5c5c",
    indigo: "#4b0082",
    ivory: "#fffff0",
    khaki: "#f0e68c",
    lavender: "#e6e6fa",
    lavenderblush: "#fff0f5",
    lawngreen: "#7cfc00",
    lemonchiffon: "#fffacd",
    lightblue: "#add8e6",
    lightcoral: "#f08080",
    lightcyan: "#e0ffff",
    lightgoldenrodyellow: "#fafad2",
    lightgray: "#d3d3d3",
    lightgreen: "#90ee90",
    lightpink: "#ffb6c1",
    lightsalmon: "#ffa07a",
    lightseagreen: "#20b2aa",
    lightskyblue: "#87cefa",
    lightslategray: "#778899",
    lightsteelblue: "#b0c4de",
    lightyellow: "#ffffe0",
    lime: "#00ff00",
    limegreen: "#32cd32",
    linen: "#faf0e6",
    magenta: "#ff00ff",
    maroon: "#800000",
    mediumaquamarine: "#66cdaa",
    mediumblue: "#0000cd",
    mediumorchid: "#ba55d3",
    mediumpurple: "#9370db",
    mediumseagreen: "#3cb371",
    mediumslateblue: "#7b68ee",
    mediumspringgreen: "#00fa9a",
    mediumturquoise: "#48d1cc",
    mediumvioletred: "#c71585",
    midnightblue: "#191970",
    mintcream: "#f5fffa",
    mistyrose: "#ffe4e1",
    moccasin: "#ffe4b5",
    navajowhite: "#ffdead",
    navy: "#000080",
    oldlace: "#fdf5e6",
    olive: "#808000",
    olivedrab: "#6b8e23",
    orange: "#ffa500",
    orangered: "#ff4500",
    orchid: "#da70d6",
    palegoldenrod: "#eee8aa",
    palegreen: "#98fb98",
    paleturquoise: "#afeeee",
    palevioletred: "#db7093",
    papayawhip: "#ffefd5",
    peachpuff: "#ffdab9",
    peru: "#cd853f",
    pink: "#ffc0cb",
    plum: "#dda0dd",
    powderblue: "#b0e0e6",
    purple: "#800080",
    rebeccapurple: "#663399",
    red: "#ff0000",
    rosybrown: "#bc8f8f",
    royalblue: "#4169e1",
    saddlebrown: "#8b4513",
    salmon: "#fa8072",
    sandybrown: "#f4a460",
    seagreen: "#2e8b57",
    seashell: "#fff5ee",
    sienna: "#a0522d",
    silver: "#c0c0c0",
    skyblue: "#87ceeb",
    slateblue: "#6a5acd",
    slategray: "#708090",
    snow: "#fffafa",
    springgreen: "#00ff7f",
    steelblue: "#4682b4",
    tan: "#d2b48c",
    teal: "#008080",
    thistle: "#d8bfd8",
    tomato: "#ff6347",
    turquoise: "#40e0d0",
    violet: "#ee82ee",
    wheat: "#f5deb3",
    whitesmoke: "#f5f5f5",
    yellow: "#ffff00",
    yellowgreen: "#9acd32"
};


export class Color {
    public channels: ColorChannels = {
        rgb: [0, 0, 0],
        hsv: [0, 0, 0],
    };

    public valpha: number = 1.0;

    constructor(color?: string | Color) {
        if (isString(color)) {
            this.parse(color);
        }
    }

    static new(color?: string | Color) {
        const obj = new Color(color)
        return obj
    }

    clone() {
        const color = new Color();
        for (let channel in this.channels) {
            color.channels[channel as ColorMode] = [
                ...this.channels[channel as ColorMode],
            ];
        }
        color.valpha = this.valpha;
        return color;
    }

    public parse(color: string): Color {
        color = color.trim();
        let parseResult = true;
        // #FFFFFF RGB mode #RRGGBB
        if (/^#[0-9a-fA-F]{6}$/.test(color)) {
            let [r, g, b] = [
                parseInt(color.substring(1, 3), 16),
                parseInt(color.substring(3, 5), 16),
                parseInt(color.substring(5, 7), 16),
            ];
            this.channels.rgb = [r, g, b];
            this.valpha = 1.0;
        }
        // #FFFFFF RGBA mode #RRGGBBAA
        else if (/^#[0-9a-fA-F]{8}$/.test(color)) {
            let [r, g, b] = [
                parseInt(color.substring(1, 3), 16),
                parseInt(color.substring(3, 5), 16),
                parseInt(color.substring(5, 7), 16),
            ];
            this.channels.rgb = [r, g, b];
            this.valpha = parseInt(color.substring(7, 9), 16) / 255;
        } else if (color.startsWith('rgb(')) {
            color = color.substring(4, color.length - 1);
            const channels = color.split(',');
            if (channels.length === 3) {
                this.channels.rgb = channels.map((e) =>
                    parseInt(e)
                ) as ColorChannel;
            } else {
                parseResult = false;
            }
        } else if (color.startsWith('rgba(')) {
            color = color.substring(5, color.length - 1);
            const channels = color.split(',');
            if (channels.length === 4) {
                let [r, g, b, a] = channels.map((e) => parseFloat(e)) as [
                    number,
                    number,
                    number,
                    number
                ];
                this.channels.rgb = [r, g, b];
                this.valpha = a;
            } else {
                parseResult = false;
            }
        } else if (color.toLowerCase() in colorsMappers) {
            color = colorsMappers[color.toLowerCase()]
            return this.parse(color)
        }
        if (parseResult === false) {
            console.error(`color ${color} parse error`);
        }
        this.updateRGB2HSV();
        return this;
    }

    public updateRGB2HSV() {
        let [r, g, b] = this.channels.rgb;
        r /= 255;
        g /= 255;
        b /= 255;
        let maxv = Math.max(r, g, b);
        let minv = Math.min(r, g, b);
        let [h, s, v] = this.channels.hsv;
        if (maxv === minv) {
            h = 0;
        } else if (minv === b) {
            h = (60 * (g - r)) / (maxv - minv) + 60;
        } else if (minv === r) {
            h = (60 * (b - g)) / (maxv - minv) + 180;
        } else {
            h = (60 * (r - b)) / (maxv - minv) + 300;
        }
        if (maxv == 0) {
            s = 0;
        } else {
            s = ((maxv - minv) / maxv) * 100;
        }
        v = maxv * 100;
        h = minmax(h, 0, 359);
        s = minmax(s, 0, 100);
        v = minmax(v, 0, 100);
        this.channels.hsv = [h, s, v];
        return this;
    }

    public updateHSV2RGB() {
        let [h, s, v] = this.channels.hsv;
        s /= 100;
        v /= 100;
        let c = s,
            h_ = h / 60,
            x = c * (1 - Math.abs((h_ % 2) - 1));
        let [r, g, b] = [v - c, v - c, v - c];
        let adds = [
            [c, x, 0],
            [x, c, 0],
            [0, c, x],
            [0, x, c],
            [x, 0, c],
            [c, 0, x],
        ];
        let [r_, g_, b_] = adds[Math.floor(h_)];
        r += r_;
        g += g_;
        b += b_;
        r = minmax(r, 0, 1);
        g = minmax(g, 0, 1);
        b = minmax(b, 0, 1);
        r *= 255;
        g *= 255;
        b *= 255;
        r = Math.round(r);
        b = Math.round(b);
        g = Math.round(g);
        this.channels.rgb = [r, g, b];
        return this;
    }

    public red(red: number): Color;
    public red(): number;
    public red(red?: number): Color | number {
        if (red !== undefined) {
            this.channels.rgb[0] = Math.round(minmax(red, 0, 255));
            return this.updateRGB2HSV();
        } else {
            return this.channels.rgb[0];
        }
    }

    public green(green: number): Color;
    public green(): number;
    public green(green?: number): Color | number {
        if (green !== undefined) {
            this.channels.rgb[1] = Math.round(minmax(green, 0, 255));
            return this.updateRGB2HSV();
        } else {
            return this.channels.rgb[1];
        }
    }

    public blue(blue: number): Color;
    public blue(): number;
    public blue(blue?: number): Color | number {
        if (blue !== undefined) {
            this.channels.rgb[2] = Math.round(minmax(blue, 0, 255));
            return this.updateRGB2HSV();
        } else {
            return this.channels.rgb[2];
        }
    }

    public hue(hue: number): Color;
    public hue(): number;
    public hue(hue?: number): number | Color {
        if (hue !== undefined) {
            this.channels.hsv[0] = minmax(hue, 0, 359);
            return this.updateHSV2RGB();
        } else {
            return this.channels.hsv[0];
        }
    }

    public saturation(saturation: number): Color;
    public saturation(): number;
    public saturation(saturation?: number): Color | number {
        if (saturation !== undefined) {
            this.channels.hsv[1] = minmax(saturation, 0, 100);
            return this.updateHSV2RGB();
        } else {
            return this.channels.hsv[1];
        }
    }

    public value(value: number): Color;
    public value(): number;
    public value(value?: number): Color | number {
        if (value !== undefined) {
            this.channels.hsv[2] = minmax(value, 0, 100);
            return this.updateHSV2RGB();
        } else {
            return this.channels.hsv[2];
        }
    }

    public alpha(alpha: number): Color;
    public alpha(): number;
    public alpha(alpha?: number): Color | number {
        if (alpha !== undefined) {
            this.valpha = minmax(alpha, 0, 1);
            return this;
        } else {
            return this.valpha;
        }
    }

    hex() {
        let [r, g, b] = this.channels.rgb;
        return `#${r.toString(16).padStart(2, '0')}${g
            .toString(16)
            .padStart(2, '0')}${b.toString(16).padStart(2, '0')}`.toUpperCase();
    }

    hexa() {
        return `${this.hex()}${Math.round(this.valpha * 255)
            .toString(16)
            .padStart(2, '0')}`.toUpperCase();
    }

    cssrgb() {
        let [r, g, b] = this.channels.rgb;
        return `rgb(${r}, ${g}, ${b})`;
    }

    cssrgba() {
        let [r, g, b] = this.channels.rgb;
        return `rgba(${r}, ${g}, ${b}, ${this.alpha()})`;
    }

    isDark() {
        const [r, g, b] = this.channels.rgb;
        let luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        return luma < 128;
    }

    isLight() {
        const [r, g, b] = this.channels.rgb;
        let luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        return luma >= 128;
    }
}
