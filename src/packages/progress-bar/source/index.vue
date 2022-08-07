<script lang="ts" setup>
import { isNumber, isString } from "@/utils/common/types";
import { progressBarProps, progressBarEmits, useProgressBar } from "."
import { ClassBuilder, StyleBuilder, useTheme } from "@/utils/common"

defineOptions({
    name: "FvProgressBar"
})

const emits = defineEmits(progressBarEmits)

const props = defineProps(progressBarProps)

const { theme } = useTheme(props)

const { computedProgress, computedValue } = useProgressBar(props, emits)

const { cls: computedProgressBarClass } = new ClassBuilder()
    .add(`fv-progress-bar`)
    .add(() => theme.value)
    .add(`disabled`, () => props.disabled === true)
    .computed()

const { cls: computedBarContainerClass } = new ClassBuilder()
    .add(`container`)
    .add(`indeterminate`, () => props.indeterminate === true)
    .add(`determinate`, () => props.indeterminate === false)
    .add(`running`, () => props.pause === false && props.error === false)
    .add(`pause`, () => props.pause === true)
    .add(`error`, () => props.error === true)
    .computed()

const { style: computeProgressBarStyle } = new StyleBuilder()
    .add(`--fv-progress-value`, () => `${-100 + computedValue.value}%`, () => computedValue.value !== undefined)
    .add(`--fv-progress-bar-normal-color`, () => props.foreground, () => props.foreground !== undefined)
    .add(`--fv-progress-bar-warning-color`, () => props.pauseForeground, () => props.pauseForeground !== undefined)
    .add(`--fv-progress-bar-error-color`, () => props.errorForeground, () => props.errorForeground !== undefined)
    .add(`--fv-progress-bgcolor`, () => props.background, () => props.background !== undefined)
    .computed()

</script>

<template>
    <div :class="computedProgressBarClass" :style="computeProgressBarStyle">
        <label class="label">
            <progress class="progress" :value="computedProgress" :max="props.max" />
            <div :class="computedBarContainerClass">
                <div class="bg">
                    <div class="bg-bar"></div>
                </div>
                <div class="bar"></div>
            </div>
        </label>
    </div>
</template>
