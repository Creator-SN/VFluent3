<script lang="ts" setup>
import { isNumber, isString } from "@/utils/common/types";
import { buttonProps, buttonEmits, useButton } from "."
import { ClassBuilder, StyleBuilder, useTheme } from "@/utils/common"

// The defined name, which will be registered as the component name
defineOptions({
    name: "FvButton"
})

const emits = defineEmits(buttonEmits)

const props = defineProps(buttonProps)

const { theme } = useTheme(props)

const { cls: computedComponentClass } = new ClassBuilder()
    .add(`fv-button`)
    .add(() => theme.value)
    .computed()

const { cls: computedButtonClass } = new ClassBuilder()
    .add(`button-container`)
    .add(`disabled`, () => props.disabled)
    .add(`shadow`, () => props.isBoxShadow)
    .computed()

const { cls: computedIconClass } = new ClassBuilder()
    .add("ms-Icon")
    .add(() => `ms-Icon--${props.icon}`, () => isString(props.icon))
    .computed()

const { style: computedButtonStyle } = new StyleBuilder()
    .add('color', () => props.foreground, () => isString(props.foreground))
    .add('background', () => props.background, () => isString(props.background))
    .add('borderWidth', () => props.borderWidth, () => isString(props.borderWidth))
    .add("borderWidth", () => `${props.borderWidth}px`, () => isNumber(props.borderWidth))
    .add("borderRadius", () => props.borderRadius, () => isString(props.borderRadius))
    .add("borderRadius", () => `${props.borderRadius}px`, () => isNumber(props.borderRadius))
    .computed()

const { style: computedTextStyle } = new StyleBuilder()
    .add('fontSize', () => props.fontSize, () => isString(props.fontSize))
    .add('fontSize', () => `${props.fontSize}px`, () => isNumber(props.fontSize))
    .add('fontWeight', () => `${props.fontWeight}px`, () => isNumber(props.fontWeight))
    .add('fontWeight', () => props.fontWeight, () => isString(props.fontWeight))
    .computed()

// methods
const { onClick } = useButton(props, emits)

</script>

<template>
    <div :class="computedComponentClass" @click="onClick">
        <button type="button" :class="computedButtonClass" :style="computedButtonStyle">
            <span class="content-block" :style="computedTextStyle">
                <i v-if="props.icon" :class="computedIconClass"></i>
                <slot>Button</slot>
            </span>
        </button>
    </div>
</template>