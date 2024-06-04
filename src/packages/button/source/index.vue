<script lang="ts" setup>
import { ref } from "vue";
import { buttonProps, buttonEmits, useButton } from ".";

defineOptions({
    name: "FvButton"
})

const emits = defineEmits(buttonEmits);

const props = defineProps(buttonProps);

const { isDisabled, theme, onClick, backgroundLightColor, borderLightColor } = useButton(props, emits);

const root = ref<HTMLElement>();

</script>

<template>
    <div ref="root" class="fv-Button" :class="[theme]" @click="onClick">
        <div class="fv-button-main-container" :class="[{ disabled: isDisabled }, { shadow: isBoxShadow }]"
            :style="{ borderRadius: `${borderRadius}px` }">
            <fv-reveal-container :parent="() => root" class="fv-button-reveal-container"
                :backgroundColor="backgroundLightColor" :borderColor="borderLightColor" :borderGradientSize="80"
                :borderWidth="borderWidth" :borderRadius="borderRadius" :disabled="isDisabled"></fv-reveal-container>
            <div :disabled="disabled" class="fv-button-container"
                :style="{ background: background, 'background-repeat': 'no-repeat', 'background-clip': 'content-box', borderColor: borderColor, borderWidth: `${borderWidth}px`, borderRadius: `${borderRadius}px` }">
                <span class="fv-btn-content-block"
                    :style="{ color: foreground, 'font-size': `${fontSize}px`, 'font-weight': fontWeight }">
                    <i class="ms-Icon" :class="`ms-Icon--${icon}`"
                        :style="{ 'margin-right': icon != '' ? '5px' : '' }"></i>
                    <slot>Button</slot>
                </span>
            </div>
        </div>
    </div>
</template>
