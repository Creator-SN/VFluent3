<template>
    <div :class="computedColorPickerClass" :style="computedColorPickerStyle">
        <div class="color-picker">
            <div
                ref="colorArea"
                draggable="false"
                class="color-area"
                :class="{
                    ring: type === 'ring',
                    box: type === 'box'
                }"
                @mousedown.stop="onMousedown"
                @touchstart.stop="onMousedown"
            >
                <div class="bg"></div>
                <div class="white-mask"></div>
                <button class="pointer"></button>
            </div>
            <div class="color">
                <div class="color-bg"></div>
            </div>
        </div>
        <div class="control vertical">
            <div
                class="color-value"
                ref="colorValue"
                draggable="false"
                @mousedown.stop="onValueMouseDown"
                @touchstart.stop="onValueMouseDown"
            >
                <div class="color-value-bg"></div>
                <div class="color-value-mask"></div>
                <div class="color-value-btn"></div>
            </div>
            <div
                class="color-alpha"
                ref="colorAlpha"
                draggable="false"
                @mousedown.stop="onAlphaMouseDown"
                @touchstart.stop="onAlphaMouseDown"
            >
                <div class="color-alpha-bg"></div>
                <div class="color-alpha-mask"></div>
                <div class="color-alpha-btn"></div>
            </div>
            <div class="fields">
                <div class="row">
                    <div class="cell">
                        <fv-combobox
                            v-model="colorMode"
                            placeholder="Color Mode"
                            :options="colorModeOptions"
                            :theme="$theme"
                            style="width: 118px"
                            min-width="118px"
                            :choosenSliderBackground="foreground"
                        ></fv-combobox>
                    </div>
                    <div class="cell">
                        <fv-text-box
                            placeholder="#FFFFFF"
                            v-model="computedText"
                            :maxlength="9"
                            :theme="$theme"
                            style="width: 130px"
                            min-width="130px"
                            underline
                            border-width="2"
                            border-color="rgba(120, 120, 120, 0.1)"
                            :focus-border-color="foreground"
                        >
                        </fv-text-box>
                    </div>
                </div>
                <div class="row">
                    <div class="cell">
                        <span class="fv-color-picker-text">{{
                            colorMode.key === 'RGB' ? 'Red' : 'Hue'
                        }}</span>
                        <fv-text-box
                            v-show="colorMode.key === 'RGB'"
                            placeholder="0"
                            :maxlength="3"
                            style="width: 118px"
                            min-width="118px"
                            v-model="computedR"
                            :theme="$theme"
                            underline
                            border-width="2"
                            border-color="rgba(120, 120, 120, 0.1)"
                            :focus-border-color="foreground"
                        >
                        </fv-text-box>
                        <fv-text-box
                            v-show="colorMode.key === 'HSV'"
                            placeholder="0"
                            :maxlength="3"
                            style="width: 118px"
                            min-width="118px"
                            v-model="computedH"
                            :theme="$theme"
                            underline
                            border-width="2"
                            border-color="rgba(120, 120, 120, 0.1)"
                            :focus-border-color="foreground"
                        >
                        </fv-text-box>
                    </div>
                </div>
                <div class="row">
                    <div class="cell">
                        <span class="fv-color-picker-text">{{
                            colorMode.key === 'RGB' ? 'Green' : 'Saturation'
                        }}</span>
                        <fv-text-box
                            v-show="colorMode.key === 'RGB'"
                            placeholder="0"
                            :maxlength="3"
                            style="width: 118px"
                            min-width="118px"
                            v-model="computedG"
                            :theme="$theme"
                            underline
                            border-width="2"
                            border-color="rgba(120, 120, 120, 0.1)"
                            :focus-border-color="foreground"
                        >
                        </fv-text-box>
                        <fv-text-box
                            v-show="colorMode.key === 'HSV'"
                            placeholder="0"
                            :maxlength="3"
                            style="width: 118px"
                            min-width="118px"
                            v-model="computedS"
                            :theme="$theme"
                            underline
                            border-width="2"
                            border-color="rgba(120, 120, 120, 0.1)"
                            :focus-border-color="foreground"
                        >
                        </fv-text-box>
                    </div>
                </div>
                <div class="row">
                    <div class="cell">
                        <span class="fv-color-picker-text">{{
                            colorMode.key === 'RGB' ? 'Blue' : 'Value'
                        }}</span>
                        <fv-text-box
                            v-show="colorMode.key === 'RGB'"
                            placeholder="0"
                            :maxlength="3"
                            style="width: 118px"
                            min-width="118px"
                            v-model="computedB"
                            :theme="$theme"
                            underline
                            border-width="2"
                            border-color="rgba(120, 120, 120, 0.1)"
                            :focus-border-color="foreground"
                        >
                        </fv-text-box>
                        <fv-text-box
                            v-show="colorMode.key === 'HSV'"
                            placeholder="0"
                            :maxlength="3"
                            style="width: 118px"
                            min-width="118px"
                            v-model="computedV"
                            :theme="$theme"
                            underline
                            border-width="2"
                            border-color="rgba(120, 120, 120, 0.1)"
                            :focus-border-color="foreground"
                        >
                        </fv-text-box>
                    </div>
                </div>
                <div class="row">
                    <div class="cell">
                        <span class="fv-color-picker-text">Opacity</span>
                        <fv-text-box
                            placeholder="0"
                            :maxlength="3"
                            style="width: 118px"
                            min-width="118px"
                            v-model="computedAlpha"
                            :theme="$theme"
                            underline
                            border-width="2"
                            border-color="rgba(120, 120, 120, 0.1)"
                            :focus-border-color="foreground"
                        >
                        </fv-text-box>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { commonProps } from '@/packages/common/props';

const emits = defineEmits(['update:modelValue']);

const props = defineProps({
    ...commonProps,
    modelValue: {
        type: String
    },
    foreground: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: 'box'
    }
});
</script>

<script>
import {
    Color,
    MouseMoveEvent,
    getBoundingClientRect,
    throttle,
    useTheme
} from '@/utils/common';
import { isMobile } from '@/utils/common/browser';

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
    'rgb(255, 0, 0)'
];

const colorModeOptions = [
    {
        key: 'HSV',
        text: 'HSV'
    },
    {
        key: 'RGB',
        text: 'RGB'
    }
];

export default {
    name: 'FvColorPicker',
    data() {
        return {
            colorModeOptions,
            colorMode: {
                key: 'RGB',
                text: 'RGB'
            },
            color: '#000000FF',
            r: '0',
            g: '0',
            b: '0',
            h: '0',
            s: '0',
            v: '0',
            alpha: '100%',
            colorObj: new Color('#000000FF'),
            colorLeft: 0,
            colorTop: 0,
            colorValueLeft: 0,
            colorAlphaLeft: 0,
            colorList: colors.map((item) => new Color(item)),
            updateCoordsThrottled: undefined,
            updateValueThrottled: undefined,
            updateAlphaThrottled: undefined,
            colorAreaMouseMoveEvent: undefined,
            colorValueMouseMoveEvent: undefined,
            colorAlphaMouseMoveEvent: undefined
        };
    },
    computed: {
        $theme() {
            return useTheme(this.$props).theme.value;
        },
        computedColorPickerClass() {
            return ['fv-color-picker'];
        },
        computedColorPickerStyle() {
            return {
                '--fv-color-picker--color-list': this.colorListStr,
                '--fv-color-picker--color': this.colorObj.cssrgba(),
                '--fv-color-picker--color-alpha': this.colorObj
                    .clone()
                    .cssrgb(),
                '--fv-color-picker--color-value': this.colorObj
                    .clone()
                    .value(100)
                    .cssrgb(),
                '--fv-color-picker--pointer-left': `${this.colorLeft}px`,
                '--fv-color-picker--pointer-top': `${this.colorTop}px`,
                '--fv-color-picker--color-value-left': `${this.colorValueLeft}px`,
                '--fv-color-picker--color-alpha-left': `${this.colorAlphaLeft}px`,
                '--fv-color-picker--color-value-empty': this.colorObj
                    .clone()
                    .hue(0)
                    .saturation(0)
                    .cssrgb()
            };
        },
        colorListStr() {
            return this.colorList.map((item) => item.cssrgb()).join(',');
        },
        computedText: {
            get() {
                if (this.modelValue === undefined) {
                    return this.color;
                }
                return this.modelValue;
            },
            set(val) {
                this.color = val;
                if (/^#[0-9a-fA-F]{6}([0-9a-fA-F]{2})?$/.test(val)) {
                    this.colorObj = this.colorObj.parse(this.color).clone();
                    this.syncHSV(this.colorObj);
                    this.syncRGB(this.colorObj);
                    this.syncAlpha(this.colorObj);
                }
                this.$emit('update:modelValue', val);
            }
        },
        computedR: {
            get() {
                return this.r;
            },
            set(val) {
                this.r = val;
                let number = parseInt(val);
                if (!isNaN(number)) {
                    this.colorObj = this.colorObj.red(number).clone();
                    this.syncText(this.colorObj);
                    this.syncHSV(this.colorObj);
                }
            }
        },
        computedG: {
            get() {
                return this.g;
            },
            set(val) {
                this.g = val;
                let number = parseInt(val);
                if (!isNaN(number)) {
                    this.colorObj = this.colorObj.green(number).clone();
                    this.syncText(this.colorObj);
                    this.syncHSV(this.colorObj);
                }
            }
        },
        computedB: {
            get() {
                return this.b;
            },
            set(val) {
                this.b = val;
                let number = parseInt(val);
                if (!isNaN(number)) {
                    this.colorObj = this.colorObj.blue(number).clone();
                    this.syncText(this.colorObj);
                    this.syncHSV(this.colorObj);
                }
            }
        },
        computedH: {
            get() {
                return this.h;
            },
            set(val) {
                this.h = val;
                let number = parseInt(val);
                if (!isNaN(number)) {
                    number = Math.min(359, Math.max(0, number));
                    this.colorObj = this.colorObj.hue(number).clone();
                    this.syncText(this.colorObj);
                    this.syncRGB(this.colorObj);
                    const { width, height } = getBoundingClientRect(
                        this.$refs.colorArea
                    );
                    if (this.type === 'ring') {
                        let angle = (number / 360) * Math.PI * 2;
                        let l =
                            ((width / 2) * this.colorObj.saturation()) / 100;
                        this.colorLeft = width / 2 + Math.cos(angle) * l;
                        this.colorTop = height / 2 + Math.sin(angle) * l;
                    } else {
                        this.colorLeft = (number / 359) * width;
                    }
                }
            }
        },
        computedS: {
            get() {
                return this.s;
            },
            set(val) {
                this.s = val;
                let number = parseInt(val);
                if (!isNaN(number)) {
                    number = Math.max(Math.min(100, number), 0);
                    this.colorObj = this.colorObj.saturation(number).clone();
                    this.syncText(this.colorObj);
                    this.syncRGB(this.colorObj);
                    const { width, height } = getBoundingClientRect(
                        this.$refs.colorArea
                    );
                    if (this.type === 'ring') {
                        let angle = (this.colorObj.hue() / 360) * Math.PI * 2;
                        let l = ((width / 2) * number) / 100;
                        this.colorLeft = width / 2 + Math.cos(angle) * l;
                        this.colorTop = height / 2 + Math.sin(angle) * l;
                    } else {
                        this.colorTop = (1 - number / 100) * height;
                    }
                }
            }
        },
        computedV: {
            get() {
                return this.v;
            },
            set(val) {
                this.v = val;
                let number = parseInt(val);
                if (!isNaN(number)) {
                    number = Math.max(Math.min(100, number), 0);
                    this.colorObj = this.colorObj.value(number).clone();
                    this.syncText(this.colorObj);
                    this.syncRGB(this.colorObj);
                    const { width } = getBoundingClientRect(
                        this.$refs.colorValue
                    );
                    this.colorValueLeft = width * 0.01 * number;
                    this.colorList = this.colorList.map((item) =>
                        item.clone().value(number)
                    );
                }
            }
        },
        computedAlpha: {
            get() {
                return this.alpha;
            },
            set(val) {
                this.alpha = val;
                let number = parseInt(val);
                if (!isNaN(number)) {
                    number = Math.max(Math.min(100, number), 0);
                    this.colorObj = this.colorObj.alpha(number / 100).clone();
                    this.syncText(this.colorObj);
                    const { width } = getBoundingClientRect(
                        this.$refs.colorAlpha
                    );
                    this.colorAlphaLeft = width * 0.01 * number;
                }
            }
        }
    },
    watch: {
        modelValue: {
            handler(val) {
                if (
                    typeof val === 'string' &&
                    /^#[0-9a-fA-F]{6}([0-9a-fA-F]{2})?$/.test(val)
                ) {
                    this.colorObj = new Color(val);
                    this.color = val;
                    this.syncHSV(this.colorObj);
                    this.syncRGB(this.colorObj);
                    this.syncAlpha(this.colorObj);
                }
            },
            immediate: true
        },
        type() {
            this.syncHSV(this.colorObj);
        }
    },
    created() {
        this.updateCoordsThrottled = throttle((mouse) => {
            this.handleUpdateCoords(mouse);
        });
        this.updateValueThrottled = throttle((mouse) => {
            this.handleUpdateValue(mouse);
        });
        this.updateAlphaThrottled = throttle((mouse) => {
            this.handleUpdateAlpha(mouse);
        });
        this.colorAreaMouseMoveEvent = new MouseMoveEvent((mouse) => {
            this.mousemoveEvent(mouse);
        });
        this.colorValueMouseMoveEvent = new MouseMoveEvent((mouse) => {
            this.valueMousemoveEvent(mouse);
        });
        this.colorAlphaMouseMoveEvent = new MouseMoveEvent((mouse) => {
            this.alphaMousemoveEvent(mouse);
        });
    },
    mounted() {
        this.colorObj = new Color(this.computedText);
        this.syncHSV(this.colorObj);
        this.syncRGB(this.colorObj);
        this.syncAlpha(this.colorObj);
    },
    methods: {
        syncText(clr) {
            this.color = clr.hexa();
            this.$emit('update:modelValue', this.color);
        },
        syncRGB(clr) {
            this.r = clr.red().toString();
            this.g = clr.green().toString();
            this.b = clr.blue().toString();
        },
        syncHSV(clr) {
            this.h = Math.round(clr.hue()).toString();
            this.s = Math.round(clr.saturation()).toString();
            this.v = Math.round(clr.value()).toString();
            this.colorList = this.colorList.map((item) =>
                item.clone().value(clr.value())
            );
            const { width, height } = getBoundingClientRect(
                this.$refs.colorArea
            );
            if (this.type === 'ring') {
                let angle = (clr.hue() / 360) * Math.PI * 2;
                let l = ((width / 2) * clr.saturation()) / 100;
                this.colorLeft = width / 2 + Math.cos(angle) * l;
                this.colorTop = height / 2 + Math.sin(angle) * l;
            } else {
                this.colorLeft = (clr.hue() / 359) * width;
                this.colorTop = (1 - clr.saturation() / 100) * height;
            }
            const colorValueRect = getBoundingClientRect(this.$refs.colorValue);
            this.colorValueLeft = colorValueRect.width * 0.01 * clr.value();
        },
        syncAlpha(clr) {
            this.alpha = `${Math.round(clr.alpha() * 100)}%`;
            const { width } = getBoundingClientRect(this.$refs.colorAlpha);
            this.colorAlphaLeft = clr.alpha() * width;
        },
        coorSync(left, top) {
            this.computedH = Math.round(left * 359).toString();
            this.computedS = Math.round(top * 100).toString();
        },
        handleUpdateCoords(mouse) {
            const { left, top, height, width } = getBoundingClientRect(
                this.$refs.colorArea
            );
            let cx = 0;
            let cy = 0;
            let mx = 0;
            let my = 0;
            if (mouse instanceof TouchEvent) {
                mx = mouse.touches[0].clientX;
                my = mouse.touches[0].clientY;
            } else {
                mx = mouse.clientX;
                my = mouse.clientY;
            }
            cx = Math.max(Math.min(mx - left, width), 0);
            cy = Math.max(Math.min(my - top, height), 0);
            if (this.type === 'ring') {
                const [x, y] = [width / 2, height / 2];
                let l = Math.sqrt(
                    Math.pow(Math.abs(cx - x), 2) +
                        Math.pow(Math.abs(cy - y), 2)
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
                this.coorSync(angle / (Math.PI * 2), l / (width / 2));
            } else {
                this.coorSync(cx / width, 1 - cy / height);
            }
        },
        mousemoveEvent(mouse) {
            this.updateCoordsThrottled(mouse);
        },
        onMousedown(mouse) {
            if (mouse instanceof MouseEvent && isMobile()) {
                return;
            } else if (mouse instanceof TouchEvent && !isMobile()) {
                return;
            }
            this.colorAreaMouseMoveEvent.listen();
            this.mousemoveEvent(mouse);
        },
        handleUpdateValue(mouse) {
            if (mouse !== undefined) {
                const { left, width } = getBoundingClientRect(
                    this.$refs.colorValue
                );
                let x = 0;
                if (mouse instanceof TouchEvent) {
                    x = mouse.touches[0].clientX;
                } else {
                    x = mouse.clientX;
                }
                const value = Math.min(Math.max(0, x - left), width);
                this.computedV = `${Math.round((value / width) * 100)}`;
            }
        },
        valueMousemoveEvent(mouse) {
            this.updateValueThrottled(mouse);
        },
        onValueMouseDown(mouse) {
            if (mouse instanceof MouseEvent && isMobile()) {
                return;
            } else if (mouse instanceof TouchEvent && !isMobile()) {
                return;
            }
            this.colorValueMouseMoveEvent.listen();
            this.valueMousemoveEvent(mouse);
        },
        handleUpdateAlpha(mouse) {
            if (mouse !== undefined) {
                const { left, width } = getBoundingClientRect(
                    this.$refs.colorAlpha
                );
                let x = 0;
                if (mouse instanceof TouchEvent) {
                    x = mouse.touches[0].clientX;
                } else {
                    x = mouse.clientX;
                }
                const alpha = Math.min(Math.max(0, x - left), width);
                this.computedAlpha = `${Math.round((alpha / width) * 100)}%`;
            }
        },
        alphaMousemoveEvent(mouse) {
            this.updateAlphaThrottled(mouse);
        },
        onAlphaMouseDown(mouse) {
            if (mouse instanceof MouseEvent && isMobile()) {
                return;
            } else if (mouse instanceof TouchEvent && !isMobile()) {
                return;
            }
            this.colorAlphaMouseMoveEvent.listen();
            this.alphaMousemoveEvent(mouse);
        }
    }
};
</script>
