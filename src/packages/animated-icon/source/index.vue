<script lang="ts" setup>
import { useTheme } from "@/utils/common";
import { animatedIconEmits, animatedIconProps, useAnimatedIcon } from ".";
defineOptions({
    name: "FvAnimatedIcon"
})

const emits = defineEmits(animatedIconEmits)
const props = defineProps(animatedIconProps)

const { theme } = useTheme(props)
</script>

<template>
    <div class="fv-AnimatedIcon" :class="[theme]"
        :style="[{ width: `${fontSize * 1 + 3}px`, background: background, fontSize: `${fontSize}px` }]"
        @mousedown="down" @mouseup="up" @touchstart="down" @touchend="up" @mouseenter="enter" @mousemove="move"
        @touchmove="move" @mouseleave="leave">
        <div draggable="false" class="fv-animated-icon-container" :class="[{ hideContent }]" :style="[animatedStyle]">
            <slot>
                <i ref="a" class="ms-Icon" :class="[`ms-Icon--${icon}`]"></i>
            </slot>
        </div>
        <div v-show="!hideContent" class="fv-animated-content-block">
            <slot name="content"></slot>
        </div>
    </div>
</template>
