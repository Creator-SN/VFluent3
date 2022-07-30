<script lang="ts" setup>
import { ClassBuilder, isNumber, isString, StyleBuilder } from "@/utils/common";
import { useTheme } from "@/utils/common/theme"
import { radioEmits, radioProps, useRadio } from ".";

const props = defineProps(radioProps);
const emits = defineEmits(radioEmits);

defineOptions({
    name: "FvRadio"
})

const { computedChecked, computedValue, onClick, onBlur, onFocus, onChange } = useRadio(props, emits)

const { theme } = useTheme(props);


const { cls: computedRadioClass } = new ClassBuilder()
    .add("fv-radio")
    .add(() => theme.value)
    .add("active", () => computedChecked.value !== false)
    .add("disabled", () => props.disabled)
    .computed()

const { cls: computeIconClass } = new ClassBuilder()
    .add("dot")
    .computed()

const { style: computedIconStyle } = new StyleBuilder()
    .add("background", () => props.background, () => props.background !== undefined)
    .add("--fv-radio-bgcolor", () => props.hoverColor, () => props.hoverColor !== undefined)
    .add("borderWidth", () => props.borderWidth, () => isString(props.borderWidth))
    .add("borderWidth", () => `${props.borderWidth}px`, () => isNumber(props.borderWidth))
    .add("borderColor", () => props.borderColor, () => props.borderColor !== undefined)
    .computed()

const { style: computedTextStyle } = new StyleBuilder()
    .add("color", () => props.foreground, () => props.foreground !== undefined)
    .computed()

</script>

<template>
    <div :class="computedRadioClass">
        <label class="label" @click="onClick">
            <span class="text" v-if="props.boxSide === `end`" :style="computedTextStyle">
                <slot>
                </slot>
            </span>
            <input @change="onChange(computedValue)" @focus="onFocus" @blur="onBlur" :disabled="props.disabled" type="radio"
                class="radio" :value="props.label" :name="props.group" v-model="computedValue" />
            <div class="icon" :style="computedIconStyle">
                <div v-show="computedChecked" :class="computeIconClass" />
            </div>
            <span class="text" v-if="props.boxSide === `start`" :style="computedTextStyle">
                <slot>
                </slot>
            </span>
        </label>
    </div>
</template>