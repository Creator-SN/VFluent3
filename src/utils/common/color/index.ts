import { isString } from '../types';

type ColorChannel = [number, number, number];

type ColorMode = 'rgb' | 'hsv';

type ColorChannels = Record<ColorMode, ColorChannel>;

function minmax(number: number, min: number, max: number) {
    return Math.max(min, Math.min(number, max));
}

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

    public parse(color: string) {
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
            this.updateRGB2HSV();
        }
        // #FFFFFF RGBA mode #RRGGBBAA
        else if (/^#[0-9a-fA-F]{8}$/.test(color)) {
            let [r, g, b] = [
                parseInt(color.substring(1, 3), 16),
                parseInt(color.substring(3, 5), 16),
                parseInt(color.substring(5, 7), 16),
            ];
            this.channels.rgb = [r, g, b];
            this.updateRGB2HSV();
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
        }
        if (parseResult === false) {
            console.error(`color ${color} parse error`);
        }
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
}
