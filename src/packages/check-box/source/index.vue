<script lang="ts" setup>
import { ClassBuilder, isNumber, isString, StyleBuilder } from "@/utils/common";
import { useTheme } from "@/utils/common/theme"
import { checkboxProps, checkboxEmits, useCheckbox } from "."

const props = defineProps(checkboxProps);
const emits = defineEmits(checkboxEmits);

defineOptions({
    name: "FvCheckBox"
})

const { theme } = useTheme(props);

const { computedChecked, onClick, onChange, onFocus, onBlur } = useCheckbox(props, emits);

const { cls: computedCheckboxClass } = new ClassBuilder()
    .add("fv-checkbox")
    .add(() => theme.value)
    .add("active", () => computedChecked.value !== false)
    .add("disabled", () => props.disabled)
    .computed()

const { cls: computeIconClass } = new ClassBuilder()
    .add("ms-Icon")
    .add("ms-Icon--CheckMark", () => computedChecked.value === true)
    .add("ms-Icon--CheckboxIndeterminate", () => computedChecked.value === undefined)
    .computed()

const { style: computedIconStyle } = new StyleBuilder()
    .add("background", () => props.background, () => props.background !== undefined)
    .add("--fv-checkbox-bgcolor", () => props.hoverColor, () => props.hoverColor !== undefined)
    .add("borderWidth", () => props.borderWidth, () => isString(props.borderWidth))
    .add("borderWidth", () => `${props.borderWidth}px`, () => isNumber(props.borderWidth))
    .add("borderColor", () => props.borderColor, () => props.borderColor !== undefined)
    .computed()

const { style: computedTextStyle } = new StyleBuilder()
    .add("color", () => props.foreground, () => props.foreground !== undefined)
    .computed()

</script>

<template>
    <div :class="computedCheckboxClass">
        <label class="label" @click="onClick">
            <span v-if="props.boxSide === `end`" :style="computedTextStyle">
                <slot>
                </slot>
            </span>
            <input @change="onChange(computedChecked)" @focus="onFocus" @blur="onBlur" :disabled="props.disabled" type="checkbox"
                class="checkbox" v-model="computedChecked" />
            <div class="icon" :style="computedIconStyle">
                <transition name="font-clip-in">
                    <div class="icon-box" v-show="computedChecked !== false" />
                </transition>
                <i :class="computeIconClass" />
            </div>
            <span v-if="props.boxSide === `start`" :style="computedTextStyle">
                <slot>
                </slot>
            </span>
        </label>
    </div>
</template>