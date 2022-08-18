<script lang="ts" setup>
import { isBoolean, isNumber, isString } from "@/utils/common/types";
import { textBoxProps, textBoxEmits, useTextBox } from "."
import { ClassBuilder, StyleBuilder, useTheme } from "@/utils/common"

defineOptions({
    name: "FvTextBox"
})

const emits = defineEmits(textBoxEmits)

const props = defineProps(textBoxProps)

const { theme } = useTheme(props)

const { computedValue, computedType, showPassword, input, pre, inputHeight, inputWidth,
    onChange, onBlur, onFocus, focus, clear, lockInput, onKeypress, onKeydown, onKeyup, onClickIcon, onInput, status } = useTextBox(props, emits)

const { cls: computedTextBoxClass } = new ClassBuilder()
    .add("fv-text-box")
    .add(() => theme.value)
    .add(`disabled`, () => props.disabled === true)
    .add(`readonly`, () => props.readonly === true)
    .add(`multiline`, () => props.multiline === true)
    .add(() => status.value)
    .computed()

const { style: computedTextBoxStyle } = new StyleBuilder()
    .add("--fv-text-box-height", () => `${inputHeight.value}px`, () => isNumber(inputHeight.value))
    .add("--fv-text-box-font-size", () => `${props.fontSize}px`, () => isNumber(props.fontSize))
    .add("--fv-text-box-width", () => `${inputWidth.value}px`, () => isNumber(inputWidth.value))
    .add("--fv-text-box-max-width", () => `${props.maxWidth}px`, () => isNumber(props.maxWidth))
    .add("--fv-text-box-max-width", () => props.maxWidth, () => isString(props.maxWidth))
    .add("--fv-text-box-min-width", () => `${props.minWidth}px`, () => isNumber(props.minWidth))
    .add("--fv-text-box-min-width", () => props.minWidth, () => isString(props.minWidth))
    .add("--fv-text-box-hover-border-color", () => props.hoverBorderColor, () => isString(props.hoverBorderColor))
    .add("--fv-text-box-error-border-color", () => props.errorBorderColor, () => isString(props.errorBorderColor))
    .add("--fv-text-box-warning-border-color", () => props.warningBorderColor, () => isString(props.warningBorderColor))
    .computed()

const { cls: computedTextIconClass } = new ClassBuilder()
    .add(`icon`)
    .add(`ms-Icon`)
    .add(`ms-Icon--Cancel`, () => props.password === false)
    .add(`ms-Icon--RedEye`, () => props.password === true && showPassword.value === false)
    .add(`ms-Icon--VisuallyImpaired`, () => props.password === true && showPassword.value === true)
    .computed()

defineExpose({
    focus,
    clear
})

</script>
<template>
    <div tabindex="-1" :class="computedTextBoxClass" :style="computedTextBoxStyle">
        <template v-if="computedType === 'text'">
            <input :title="props.title" ref="input" class="input text" :placeholder="props.placeholder"
                :disabled="props.disabled" :type="props.password ? showPassword ? 'text' : 'password' : 'text'"
                :readonly="readonly === true || lockInput === true" v-model="computedValue"
                @change="onChange(computedValue)" :autofocus="autofocus" :size="props.size" :maxlength="props.maxlength"
                :minlength="props.minlength" @focus="onFocus" @keydown="onKeydown(computedValue)"
                @keyup="onKeyup(computedValue)" @keypress="onKeypress(computedValue)" @input="onInput(computedValue)" />
            <i :class="computedTextIconClass" @click="onClickIcon"></i>
        </template>
        <textarea :title="props.title" ref="input" class="input textarea" :placeholder="props.placeholder"
            :disabled="props.disabled" :readonly="readonly === true || lockInput === true" :cols="props.size"
            :maxlength="props.maxlength" :minlength="props.minlength" v-model="computedValue"
            @change="onChange(computedValue)" @keydown="onKeydown(computedValue)" @keyup="onKeyup(computedValue)"
            :autofocus="autofocus" @focus="onFocus" @blur="onBlur" @keypress="onKeypress(computedValue)"
            @input="onInput(computedValue)" v-if="computedType === 'textarea'"></textarea>
        <!-- hidden text compute -->
        <pre ref="pre" class="pre-hidden">{{ computedValue + "0" }}</pre>
    </div>
</template>
