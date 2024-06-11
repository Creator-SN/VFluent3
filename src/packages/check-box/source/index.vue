<script lang="ts" setup>
import { useTheme } from '@/utils/common';
import { checkBoxEmits, checkBoxProps, useCheckBox } from '.';

defineOptions({
    name: "FvCheckBox"
})

const emits = defineEmits(checkBoxEmits)
const props = defineProps(checkBoxProps)
const { theme } = useTheme(props)
const { checked, thisValue, indeterminate } = useCheckBox(props, emits)
</script>

<template>
    <div class="fv-CheckBox" :class="[theme, boxSide == 'end' ? 'box-side-end' : '']" @click="checked">
        <div class="fv-checkbox-rec" :class="[{ disabled, check: thisValue || indeterminate }]"
            :style="{ background: thisValue || indeterminate ? background : '' }">
            <p class="fv-checkbox-border"
                :style="{ borderColor: indeterminate ? 'transparent' : borderColor, borderWidth: `${borderWidth}px` }">
            </p>
            <transition name="font-clip-in">
                <div v-show="thisValue && !indeterminate" class="fv-checkbox-content-block">
                    <i class="fv-checkbox-content ms-Icon ms-Icon--CheckMark"></i>
                </div>
            </transition>
            <transition name="font-clip-in">
                <div v-show="indeterminate" class="fv-checkbox-content-block">
                    <i class="fv-checkbox-content ms-Icon ms-Icon--CheckboxIndeterminate"></i>
                </div>
            </transition>
        </div>
        <span class="text-content-block" :style="{ color: foreground }">
            <slot></slot>
        </span>
    </div>
</template>