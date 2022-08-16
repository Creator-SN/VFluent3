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

const { computedValue, computedType, input, pre, inputHeight, inputWidth, onChange, onBlur, onFocus, focus, onKeypress, onKeydown, onKeyup } = useTextBox(props, emits)

const { cls: computedTextBoxClass } = new ClassBuilder()
    .add("fv-text-box")
    .add(() => theme.value)
    .add(`disabled`, () => props.disabled === true)
    .add(`readonly`, () => props.readonly === true)
    .computed()

const { style: computedTextBoxStyle } = new StyleBuilder()
    .add("--fv-text-box-height", () => `${inputHeight.value}px`, () => isNumber(inputHeight.value))
    .add("--fv-text-box-font-size", () => `${props.fontSize}px`, () => isNumber(props.fontSize))
    .add("--fv-text-box-width", () => `${inputWidth.value}px`, () => isNumber(inputWidth.value))
    .add("--fv-text-box-max-width", () => `${props.maxWidth}px`, () => isNumber(props.maxWidth))
    .add("--fv-text-box-max-width", () => props.maxWidth, () => isString(props.maxWidth))
    .add("--fv-text-box-min-width", () => `${props.minWidth}px`, () => isNumber(props.minWidth))
    .add("--fv-text-box-min-width", () => props.minWidth, () => isString(props.minWidth))
    .computed()

defineExpose({
    focus
})

</script>
<template>
    <div :class="computedTextBoxClass" :style="computedTextBoxStyle">
        <input :title="props.title" ref="input" v-if="computedType === 'text'" class="input"
            :placeholder="props.placeholder" :disabled="props.disabled" :type="props.password ? 'password' : 'text'"
            :readonly="readonly" v-model="computedValue" @change="onChange(computedValue)" :autofocus="autofocus"
            :size="props.size" :maxlength="props.maxlength" :minlength="props.minlength" @focus="onFocus" @blur="onBlur"
            @keydown="onKeydown(computedValue)" @keyup="onKeyup(computedValue)" @keypress="onKeypress(computedValue)" />
        <textarea :title="props.title" ref="input" class="input" :placeholder="props.placeholder"
            :disabled="props.disabled" :readonly="readonly" :cols="props.size" :maxlength="props.maxlength"
            :minlength="props.minlength" v-model="computedValue" @change="onChange(computedValue)"
            @keydown="onKeydown(computedValue)" @keyup="onKeyup(computedValue)" :autofocus="autofocus" @focus="onFocus"
            @blur="onBlur" @keypress="onKeypress(computedValue)" v-else></textarea>
        <!-- hidden text compute -->
        <pre ref="pre" class="pre-hidden">{{ computedValue + "0" }}</pre>
    </div>
</template>
