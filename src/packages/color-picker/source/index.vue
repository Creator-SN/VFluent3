<script lang="ts" setup>
import { isNumber, isString } from '@/utils/common/types';
import { colorPickerProps, colorPickerEmits, useColorPicker } from '.';
import { ClassBuilder, StyleBuilder, useTheme } from '@/utils/common';

defineOptions({
    name: 'FvColorPicker'
});

const emits = defineEmits(colorPickerEmits);

const props = defineProps(colorPickerProps);

const { theme } = useTheme(props);

const {
    colorMode,
    colorListStr,
    colorLeft,
    colorTop,
    colorObj,
    colorValueLeft,
    colorAlphaLeft,
    colorModeOptions,
    computedText,
    computedR,
    computedB,
    computedG,
    computedAlpha,
    computedH,
    computedS,
    computedV,
    colorArea,
    colorValue,
    colorAlpha,
    onMousedown,
    onValueMouseDown,
    onAlphaMouseDown
} = useColorPicker(props, emits);

const { cls: computedColorPickerClass } = new ClassBuilder()
    .add(`fv-color-picker`)
    .computed();

const { style: computedColorPickerStyle } = new StyleBuilder()
    .add('--fv-color-picker--color-list', () => colorListStr.value)
    .add('--fv-color-picker--color', () => colorObj.value.cssrgba())
    .add('--fv-color-picker--color-alpha', () =>
        colorObj.value.clone().cssrgb()
    )
    .add('--fv-color-picker--color-value', () =>
        colorObj.value.clone().value(100).cssrgb()
    )
    .add(
        '--fv-color-picker--pointer-left',
        () => `${colorLeft.value}px`,
        () => isNumber(colorLeft.value)
    )
    .add(
        '--fv-color-picker--pointer-top',
        () => `${colorTop.value}px`,
        () => isNumber(colorTop.value)
    )
    .add(
        '--fv-color-picker--color-value-left',
        () => `${colorValueLeft.value}px`,
        () => isNumber(colorValueLeft.value)
    )
    .add(
        '--fv-color-picker--color-alpha-left',
        () => `${colorAlphaLeft.value}px`,
        () => isNumber(colorAlphaLeft.value)
    )
    .add('--fv-color-picker--color-value-empty', () =>
        colorObj.value.clone().hue(0).saturation(0).cssrgb()
    )
    .computed();
</script>
<template>
    <div
        :class="computedColorPickerClass"
        :style="computedColorPickerStyle"
    >
        <div class="color-picker">
            <div
                ref="colorArea"
                draggable="false"
                class="color-area"
                :class="{
                ring: props.type === 'ring',
                box: props.type === 'box'
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
                            :theme="theme"
                            style="width:118px;"
                            min-width="118px"
                            :choosenSliderBackground="props.foreground"
                        ></fv-combobox>
                    </div>
                    <div class="cell">
                        <fv-text-box
                            placeholder="#FFFFFF"
                            v-model="computedText"
                            :maxlength="9"
                            :theme="theme"
                            style="width:130px;"
                            min-width="130px"
                            underline
                            border-width="2"
                            border-color="rgba(120, 120, 120, 0.1)"
                            :focus-border-color="props.foreground"
                        >
                        </fv-text-box>
                    </div>
                </div>
                <div class="row">
                    <div class="cell">
                        <span class="fv-color-picker-text">{{ colorMode.key === "RGB" ? "Red" : "Hue" }}</span>
                        <fv-text-box
                            v-show="colorMode.key === 'RGB'"
                            placeholder="0"
                            :maxlength="3"
                            style="width:118px;"
                            min-width="118px"
                            v-model="computedR"
                            :theme="theme"
                            underline
                            border-width="2"
                            border-color="rgba(120, 120, 120, 0.1)"
                            :focus-border-color="props.foreground"
                        >
                        </fv-text-box>
                        <fv-text-box
                            v-show="colorMode.key === 'HSV'"
                            placeholder="0"
                            :maxlength="3"
                            style="width:118px;"
                            min-width="118px"
                            v-model="computedH"
                            :theme="theme"
                            underline
                            border-width="2"
                            border-color="rgba(120, 120, 120, 0.1)"
                            :focus-border-color="props.foreground"
                        >
                        </fv-text-box>
                    </div>
                </div>
                <div class="row">
                    <div class="cell">
                        <span class="fv-color-picker-text">{{ colorMode.key === "RGB" ? "Green" : "Saturation" }}</span>
                        <fv-text-box
                            v-show="colorMode.key === 'RGB'"
                            placeholder="0"
                            :maxlength="3"
                            style="width:118px;"
                            min-width="118px"
                            v-model="computedG"
                            :theme="theme"
                            underline
                            border-width="2"
                            border-color="rgba(120, 120, 120, 0.1)"
                            :focus-border-color="props.foreground"
                        >
                        </fv-text-box>
                        <fv-text-box
                            v-show="colorMode.key === 'HSV'"
                            placeholder="0"
                            :maxlength="3"
                            style="width:118px;"
                            min-width="118px"
                            v-model="computedS"
                            :theme="theme"
                            underline
                            border-width="2"
                            border-color="rgba(120, 120, 120, 0.1)"
                            :focus-border-color="props.foreground"
                        >
                        </fv-text-box>
                    </div>
                </div>
                <div class="row">
                    <div class="cell">
                        <span class="fv-color-picker-text">{{ colorMode.key === "RGB" ? "Blue" : "Value" }}</span>
                        <fv-text-box
                            v-show="colorMode.key === 'RGB'"
                            placeholder="0"
                            :maxlength="3"
                            style="width:118px;"
                            min-width="118px"
                            v-model="computedB"
                            :theme="theme"
                            underline
                            border-width="2"
                            border-color="rgba(120, 120, 120, 0.1)"
                            :focus-border-color="props.foreground"
                        >
                        </fv-text-box>
                        <fv-text-box
                            v-show="colorMode.key === 'HSV'"
                            placeholder="0"
                            :maxlength="3"
                            style="width:118px;"
                            min-width="118px"
                            v-model="computedV"
                            :theme="theme"
                            underline
                            border-width="2"
                            border-color="rgba(120, 120, 120, 0.1)"
                            :focus-border-color="props.foreground"
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
                            style="width:118px;"
                            min-width="118px"
                            v-model="computedAlpha"
                            :theme="theme"
                            underline
                            border-width="2"
                            border-color="rgba(120, 120, 120, 0.1)"
                            :focus-border-color="props.foreground"
                        >
                        </fv-text-box>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
