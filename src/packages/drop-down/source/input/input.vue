<script setup lang="ts">
import { inputEmits, inputProps, useInput } from './input';


const props = defineProps(inputProps)
const emits = defineEmits(inputEmits)

const {root,theme,backgroundLightColor,borderLightColor,inputValue} = useInput(props,emits)

</script>

<template>
<div ref="root" class="drop-down-box" :style="{'border-radius': `${borderRadius}px`}">
    <div class="drop-down-container" :style="{background: inputBackground, 'border-radius': `${borderRadius}px`}">
        <fv-reveal-container
            :parent="() => root"
            class="fv-dropdown-reveal-container"
            :backgroundColor="backgroundLightColor"
            :borderColor="borderLightColor"
            :backgroundGradientSize="120"
            :borderGradientSize="80"
            :borderWidth="borderWidth"
            :borderRadius="borderRadius"
            :disabled="disabled"
        ></fv-reveal-container>
        <slot name="input" :placeholder="placeholder" :value="inputValue">
            <input class="fv-drop-down-input" :placeholder="placeholder" readonly :value="inputValue" :style="{color: inputForeground, 'border-radius': `${borderRadius}px`, borderWidth: `${borderWidth}px`, borderColor: inputBorderColor}"></input>
            <i class="right-icon ms-Icon" :class="[`ms-Icon--${dropDownIcon}`]" :style="{color: dropDownIconForeground}"></i>
        </slot>
    </div>
</div>
</template>

