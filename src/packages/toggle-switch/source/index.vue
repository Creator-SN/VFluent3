<script lang="ts" setup>
import { isNumber, isString } from "@/utils/common/types";
import { toggleSwitchProps, toggleSwitchEmits, useToggleSwitch } from "."
import { ClassBuilder, StyleBuilder, useTheme } from "@/utils/common"

defineOptions({
    name: "FvToggleSwitch"
})

const emits = defineEmits(toggleSwitchEmits)

const props = defineProps(toggleSwitchProps)

const { theme } = useTheme(props)

const { computedValue, computedLabel, onClick, onBlur, onFocus, onChange } = useToggleSwitch(props, emits)

const { cls: computedToggleSwitchClass } = new ClassBuilder()
    .add(`fv-toggle-switch`)
    .add(`disabled`, () => props.disabled === true)
    .add(`active`, () => computedValue.value === true)
    .add(() => theme.value)
    .computed()

const { style: computedToggleSwitchStyle } = new StyleBuilder()
    .add("--fv-toggle-switch-on-color", () => props.onForeground, () => isString(props.onForeground))
    .add("--fv-toggle-switch-off-bgcolor", () => props.offForeground, () => isString(props.offForeground))
    .add("--fv-toggle-switch-on-bgcolor", () => props.onBackground, () => isString(props.onBackground))
    .add("--fv-toggle-switch-color", () => props.foreground, () => isString(props.foreground))
    .computed()

</script>
<template>
    <div :class="computedToggleSwitchClass" :style="computedToggleSwitchStyle">
        <label class="label" @click="onClick">
            <span v-show="computedLabel !== undefined" class="text" v-if="props.boxSide === 'end'">{{ computedLabel
            }}</span>
            <input v-model="computedValue" @change="onChange(computedValue)" @focus="onFocus" @blur="onBlur"
                type="checkbox" class="checkbox">
            <div class="bg">
                <div class="circle">
                </div>
            </div>
            <span class="text" v-show="computedLabel !== undefined" v-if="props.boxSide === 'start'">{{ computedLabel
            }}</span>
        </label>
    </div>
</template>
