<script lang="ts" setup>
import { isNumber, isString } from "@/utils/common/types";
import { progressRingProps, progressRingEmits, useProgressRing } from "."
import { ClassBuilder, StyleBuilder, useTheme } from "@/utils/common"

defineOptions({
    name: "FvProgressRing"
})

const emits = defineEmits(progressRingEmits)

const props = defineProps(progressRingProps)

const { theme } = useTheme(props)

const { computedProgress, computedValue } = useProgressRing(props, emits)

const { cls: computedProgressRingClass } = new ClassBuilder()
    .add("fv-progress-ring")
    .add(() => theme.value)
    .add("indeterminate", () => props.indeterminate === true)
    .add("determinate", () => props.indeterminate === false)
    .add("disabled", () => props.disabled === true)
    .add("running", () => props.pause === false && props.error === false)
    .add("pause", () => props.pause === true)
    .add("error", () => props.error === true)
    .computed()

const { style: computedProgressRingStyle } = new StyleBuilder()
    .add("--fv-progress-ring-value", () => `${computedValue.value * 0.01}`, () => props.indeterminate === false)
    .add("--fv-progress-ring-size", () => `${props.width}px`, () => isNumber(props.width))
    .add("--fv-progress-ring-border-width", () => `${props.borderWidth}px`, () => isNumber(props.borderWidth))
    .add("--fv-progress-ring-primary-color", () => props.foreground, () => isString(props.foreground))
    .add("--fv-progress-ring-pause-color", () => props.pauseForeground, () => isString(props.pauseForeground))
    .add("--fv-progress-ring-error-color", () => props.errorForeground, () => isString(props.errorForeground))
    .computed()

</script>

<template>
    <div :class="computedProgressRingClass" :style="computedProgressRingStyle">
        <label class="label">
            <progress class="progress" :value="computedProgress" :max="props.max"></progress>
            <svg class="svg">
                <circle cx="50%" cy="50%" :r="`calc(50% - ${props.borderWidth}px)`" class="bar">
                </circle>
            </svg>
        </label>
    </div>
</template>
