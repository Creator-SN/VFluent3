<script lang="ts" setup>
import { isNumber, isString } from "@/utils/common/types";
import { comboBoxProps, comboBoxEmits, useComboBox } from "."
import { ClassBuilder, StyleBuilder, useTheme } from "@/utils/common"

defineOptions({
    name: "FvComboBox"
})

const emits = defineEmits(comboBoxEmits)

const props = defineProps(comboBoxProps)

const { theme } = useTheme(props)

const { optionsShow, input, root, computedValue,
    onBlur, onFocus, onInput, onKeydown, onKeypress, onKeyup, onInputClick, focus, hide, show,
    onChange, onInputIconClick, onSelectOption, onErrorInput, onWarningInput, options, optionsBottom, optionsHeight, option, optionsTop, effectPosition } = useComboBox(props, emits)

const { cls: computedComboBoxClass } = new ClassBuilder()
    .add("fv-combo-box")
    .add(`disabled`, () => props.disabled === true)
    .add(() => theme.value)
    .computed()

const { style: computedComboBoxStyle } = new StyleBuilder()
    .add("--fv-combo-box-height", () => `${optionsHeight.value}px`)
    .add("--fv-combo-box-top", () => `${optionsTop.value}px`, () => isNumber(optionsTop.value))
    .add("--fv-combo-box-top", () => optionsTop.value, () => isString(optionsTop.value))
    .add("--fv-combo-box-bottom", () => `${optionsBottom.value}px`, () => isNumber(optionsBottom.value))
    .add("--fv-combo-box-bottom", () => optionsBottom.value, () => isString(optionsBottom.value))
    .add("--fv-combo-box-effect-position", () => effectPosition.value)
    .computed()

const { cls: computedComboBoxOptionBgClass } = new ClassBuilder()
    .add("fv-combo-box--bg")
    .add("fv-combo-box--bg-down", () => props.editable === true && effectPosition.value === "flex-start")
    .add("fv-combo-box--bg-up", () => props.editable === true && effectPosition.value === "flex-end")
    .computed()

defineExpose({
    focus,
    hide,
    show
})

</script>
<template>
    <div ref="root" :class="computedComboBoxClass" :style="computedComboBoxStyle">
        <fv-text-box ref="input" :theme="theme" v-model="computedValue" rightIcon="ChevronDown"
            :readonly="props.editable === false" class="fv-combo-box--select-input" :placeholder="props.placeholder"
            @click="onInputClick" @blur="onBlur" @focus="onFocus" @change="onChange(computedValue)"
            @right-icon-click="onInputIconClick" :autofocus="props.autofocus" @input="onInput(computedValue)"
            @keydown="onKeydown(computedValue)" @keypress="onKeypress(computedValue)" @keyup="onKeyup(computedValue)"
            :required="props.required" :maxlength="props.maxlength" :minlength="props.minlength"
            :hover-border-color="props.hoverBorderColor" :error-border-color="props.errorBorderColor"
            :warning-border-color="props.warningBorderColor" :title="props.title" :input-rules="props.inputRules"
            :pattern="props.pattern" :disabled="props.disabled" @error-input="onErrorInput"
            @warning-input="onWarningInput" />
        <transition name="fv-combo-box--fade-in">
            <div class="fv-combo-box--options" v-show="optionsShow" ref="options">
                <div :class="computedComboBoxOptionBgClass">
                    <div class="fv-combo-box--options-wrapper">
                        <div class="fv-combo-box--option" ref="option" v-for="item in (props.options)" :key="item.key"
                            @click="onSelectOption(item)">
                            <div class="fv-combo-box--option-text" :class="{
                                active: item.key === computedValue
                            }">
                                {{ item.text === undefined ? item.key : item.text }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
