import { commonProps } from '@/packages/common/props';
import { computed, ExtractPropTypes, onMounted, ref, watch } from 'vue';
import { EmitFn } from '@/types/components';
import {
    getBoundingClientRect,
    MouseMoveEvent,
    throttle,
} from '@/utils/common';
import { Color } from '@/utils/common';
import { isMobile } from '@/utils/common/browser';

export const colorPickerProps = {
    ...commonProps,
    modelValue: {
        type: [String],
    },
    type: {
        type: [String],
        default: 'box',
    },
};

export type ColorPickerProps = ExtractPropTypes<typeof colorPickerProps>;

export const colorPickerEmits = {
    'update:modelValue'(val: string) {
        return true;
    },
};

export type ColorPickerEmits = typeof colorPickerEmits;

export const useColorPicker = (
    props: ColorPickerProps,
    emits: EmitFn<ColorPickerEmits>
) => {
    const colors = [
        'rgb(255, 0, 0)',
        'rgb(255, 153, 0)',
        'rgb(205, 255, 0)',
        'rgb(53, 255, 0)',
        'rgb(0, 255, 102)',
        'rgb(0, 255, 253)',
        'rgb(0, 102, 255)',
        'rgb(50, 0, 255)',
        'rgb(205, 0, 255)',
        'rgb(255, 0, 153)',
        'rgb(255, 0, 0)',
    ];
    const colorModeOptions = [
        {
            key: 'HSV',
        },
        {
            key: 'RGB',
        },
    ];
    const colorArea = ref<HTMLElement>();
    const colorValue = ref<HTMLElement>();
    const colorAlpha = ref<HTMLElement>();
    const colorMode = ref<'HSV' | 'RGB'>('RGB');
    const color = ref('#000000FF');
    const r = ref('0');
    const g = ref('0');
    const b = ref('0');
    const h = ref('0');
    const s = ref('0');
    const v = ref('0');
    const alpha = ref('100%');
    const colorObj = ref<Color>(new Color(color.value));
    const colorLeft = ref<number>(0);
    const colorTop = ref<number>(0);
    const colorValueLeft = ref<number>(0);
    const colorAlphaLeft = ref<number>(0);

    const colorList = ref<Array<Color>>(colors.map((e) => new Color(e)));
    const colorListStr = ref<string>(
        colorList.value.map((e) => e.cssrgb()).join(',')
    );

    const syncText = (clr: Color) => {
        color.value = clr.hexa();
        emits('update:modelValue', color.value);
    };
    const syncRGB = (clr: Color) => {
        r.value = clr.red().toString();
        g.value = clr.green().toString();
        b.value = clr.blue().toString();
    };
    const syncHSV = (clr: Color) => {
        h.value = Math.round(clr.hue()).toString();
        s.value = Math.round(clr.saturation()).toString();
        v.value = Math.round(clr.value()).toString();
        colorList.value = colorList.value.map((e) =>
            e.clone().value(clr.value())
        );
        colorListStr.value = colorList.value.map((e) => e.cssrgb()).join();
        {
            const { width, height } = getBoundingClientRect(colorArea.value);
            if (props.type === 'ring') {
                let angle = (clr.hue() / 360) * Math.PI * 2;
                let l = ((width / 2) * clr.saturation()) / 100;
                colorLeft.value = width / 2 + Math.cos(angle) * l;
                colorTop.value = height / 2 + Math.sin(angle) * l;
            } else {
                colorLeft.value = (clr.hue() / 359) * width;
                colorTop.value = (1 - clr.saturation() / 100) * height;
            }
        }
        {
            const { width } = getBoundingClientRect(colorValue.value);
            colorValueLeft.value = width * 0.01 * clr.value();
        }
    };
    const syncAlpha = (clr: Color) => {
        alpha.value = `${Math.round(clr.alpha() * 100)}%`;
        const { width } = getBoundingClientRect(colorAlpha.value);
        colorAlphaLeft.value = clr.alpha() * width;
    };
    const computedText = computed({
        get() {
            if (props.modelValue === undefined) {
                return color.value;
            }
            return props.modelValue;
        },
        set(val: string) {
            color.value = val;
            if (/^#[0-9a-fA-F]{6}([0-9a-fA-F]{2})?$/.test(val)) {
                colorObj.value = colorObj.value.parse(color.value).clone();
                syncHSV(colorObj.value);
                syncRGB(colorObj.value);
                syncAlpha(colorObj.value);
            }
            emits('update:modelValue', val);
        },
    });
    const computedR = computed({
        get() {
            return r.value;
        },
        set(val: string) {
            r.value = val;
            let number = parseInt(val);
            if (!isNaN(number)) {
                colorObj.value = colorObj.value.red(number).clone();
                syncText(colorObj.value);
                syncHSV(colorObj.value);
            }
        },
    });
    const computedG = computed({
        get() {
            return g.value;
        },
        set(val: string) {
            g.value = val;
            let number = parseInt(val);
            if (!isNaN(number)) {
                colorObj.value = colorObj.value.green(number).clone();
                syncText(colorObj.value);
                syncHSV(colorObj.value);
            }
        },
    });
    const computedB = computed({
        get() {
            return b.value;
        },
        set(val: string) {
            b.value = val;
            let number = parseInt(val);
            if (!isNaN(number)) {
                colorObj.value = colorObj.value.blue(number).clone();
                syncText(colorObj.value);
                syncHSV(colorObj.value);
            }
        },
    });
    const computedH = computed({
        get() {
            return h.value;
        },
        set(val: string) {
            h.value = val;
            let number = parseInt(val);
            if (!isNaN(number)) {
                number = Math.min(359, Math.max(0, number));
                colorObj.value = colorObj.value.hue(number).clone();
                syncText(colorObj.value);
                syncRGB(colorObj.value);
                const { width, height } = getBoundingClientRect(
                    colorArea.value
                );
                if (props.type === 'ring') {
                    let angle = (number / 360) * Math.PI * 2;
                    let l = ((width / 2) * colorObj.value.saturation()) / 100;
                    colorLeft.value = width / 2 + Math.cos(angle) * l;
                    colorTop.value = height / 2 + Math.sin(angle) * l;
                } else {
                    colorLeft.value = (number / 359) * width;
                }
            }
        },
    });
    const computedS = computed({
        get() {
            return s.value;
        },
        set(val: string) {
            s.value = val;
            let number = parseInt(val);
            if (!isNaN(number)) {
                number = Math.max(Math.min(100, number), 0);
                colorObj.value = colorObj.value.saturation(number).clone();
                syncText(colorObj.value);
                syncRGB(colorObj.value);
                const { width, height } = getBoundingClientRect(
                    colorArea.value
                );
                if (props.type === 'ring') {
                    let angle = (colorObj.value.hue() / 360) * Math.PI * 2;
                    let l = ((width / 2) * number) / 100;
                    colorLeft.value = width / 2 + Math.cos(angle) * l;
                    colorTop.value = height / 2 + Math.sin(angle) * l;
                } else {
                    colorTop.value = (1 - number / 100) * height;
                }
            }
        },
    });
    const computedV = computed({
        get() {
            return v.value;
        },
        set(val: string) {
            v.value = val;
            let number = parseInt(val);
            if (!isNaN(number)) {
                number = Math.max(Math.min(100, number), 0);
                colorObj.value = colorObj.value.value(number).clone();
                syncText(colorObj.value);
                syncRGB(colorObj.value);
                const { width } = getBoundingClientRect(colorValue.value);
                colorValueLeft.value = width * 0.01 * number;
                colorList.value = colorList.value.map((e) =>
                    e.clone().value(number)
                );
                colorListStr.value = colorList.value
                    .map((e) => e.cssrgb())
                    .join(',');
            }
        },
    });
    const computedAlpha = computed({
        get() {
            return alpha.value;
        },
        set(val: string) {
            alpha.value = val;
            let number = parseInt(val);
            if (!isNaN(number)) {
                number = Math.max(Math.min(100, number), 0);
                colorObj.value = colorObj.value.alpha(number / 100).clone();
                syncText(colorObj.value);
                const { width } = getBoundingClientRect(colorAlpha.value);
                colorAlphaLeft.value = width * 0.01 * number;
            }
        },
    });

    // color area
    const coorSync = (left: number, top: number) => {
        computedH.value = Math.round(left * 359).toString();
        computedS.value = Math.round(top * 100).toString();
    };
    const updateCoords = throttle((mouse: MouseEvent | TouchEvent) => {
        const { left, top, height, width } = getBoundingClientRect(
            colorArea.value
        );
        let cx = 0,
            cy = 0,
            mx = 0,
            my = 0;
        if (mouse instanceof TouchEvent) {
            mx = mouse.touches[0].clientX;
            my = mouse.touches[0].clientY;
        } else {
            mx = mouse.clientX;
            my = mouse.clientY;
        }
        cx = Math.max(Math.min(mx - left, width), 0);
        cy = Math.max(Math.min(my - top, height), 0);
        if (props.type === 'ring') {
            const [x, y] = [width / 2, height / 2];
            let l = Math.sqrt(
                Math.pow(Math.abs(cx - x), 2) + Math.pow(Math.abs(cy - y), 2)
            );
            if (l > width / 2) {
                let k = l / (width / 2);
                cx = x + (cx - x) / k;
                cy = y + (cy - y) / k;
                l = width / 2;
            }
            let angle = Math.atan2(cy - y, cx - x);
            if (angle < 0) {
                angle += Math.PI * 2;
            }
            coorSync(angle / (Math.PI * 2), l / (width / 2));
        } else {
            coorSync(cx / width, 1 - cy / height);
        }
    });
    const mousemoveEvent = (mouse?: MouseEvent | TouchEvent) => {
        updateCoords(mouse);
    };
    const colorAreaMouseMoveEvent = new MouseMoveEvent(mousemoveEvent);
    const onMousedown = (mouse: MouseEvent | TouchEvent) => {
        if (mouse instanceof MouseEvent && isMobile()) {
            return;
        } else if (mouse instanceof TouchEvent && !isMobile()) {
            return;
        }
        colorAreaMouseMoveEvent.listen();
        mousemoveEvent(mouse);
    };

    // color value
    const updateValue = throttle((mouse?: MouseEvent | TouchEvent) => {
        if (mouse !== undefined) {
            const { left, width } = getBoundingClientRect(colorValue.value);
            let x = 0;
            if (mouse instanceof TouchEvent) {
                x = mouse.touches[0].clientX;
            } else {
                x = mouse.clientX;
            }
            const value = Math.min(Math.max(0, x - left), width);
            computedV.value = `${Math.round((value / width) * 100)}`;
        }
    });
    const valueMousemoveEvent = (mouse?: MouseEvent | TouchEvent) => {
        updateValue(mouse);
    };
    const colorValueMouseMoveEvent = new MouseMoveEvent(valueMousemoveEvent);
    const onValueMouseDown = (mouse: MouseEvent | TouchEvent) => {
        if (mouse instanceof MouseEvent && isMobile()) {
            return;
        } else if (mouse instanceof TouchEvent && !isMobile()) {
            return;
        }
        colorValueMouseMoveEvent.listen();
        valueMousemoveEvent(mouse);
    };

    // color alpha
    const updateAlpha = throttle((mouse?: MouseEvent | TouchEvent) => {
        if (mouse !== undefined) {
            const { left, width } = getBoundingClientRect(colorValue.value);
            let x = 0;
            if (mouse instanceof TouchEvent) {
                x = mouse.touches[0].clientX;
            } else {
                x = mouse.clientX;
            }
            const alpha = Math.min(Math.max(0, x - left), width);
            computedAlpha.value = `${Math.round((alpha / width) * 100)}%`;
        }
    });
    const alphaMousemoveEvent = (mouse?: MouseEvent | TouchEvent) => {
        updateAlpha(mouse);
    };
    const colorAlphaMouseMoveEvent = new MouseMoveEvent(alphaMousemoveEvent);
    const onAlphaMouseDown = (mouse: MouseEvent | TouchEvent) => {
        if (mouse instanceof MouseEvent && isMobile()) {
            return;
        } else if (mouse instanceof TouchEvent && !isMobile()) {
            return;
        }
        colorAlphaMouseMoveEvent.listen();
        alphaMousemoveEvent(mouse);
    };

    onMounted(() => {
        colorObj.value = new Color(computedText.value);
        syncHSV(colorObj.value);
        syncAlpha(colorObj.value);
    });

    watch(
        () => props.type,
        () => {
            syncHSV(colorObj.value);
        }
    );

    return {
        colorArea,
        colorValue,
        colorAlpha,
        colorLeft,
        colorTop,
        colorValueLeft,
        colorAlphaLeft,
        colorObj,
        computedR,
        computedG,
        computedB,
        computedH,
        computedS,
        computedV,
        computedAlpha,
        computedText,
        colorModeOptions,
        colorMode,
        onMousedown,
        onValueMouseDown,
        onAlphaMouseDown,
        colorListStr,
    };
};
