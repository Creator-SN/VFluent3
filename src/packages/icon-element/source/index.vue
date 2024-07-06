<script setup lang="ts">
import { callFunction } from '@/utils/common';
import { iconElementEmits, iconElementProps, useIconElement } from '.';

defineOptions({
    name:"FvIconElement"
})

const props = defineProps(iconElementProps)
const emits = defineEmits(iconElementEmits)

const {theme,iconList} = useIconElement(props, emits)

</script>

<template>
    <div
        class="fv-IconElement"
        :class="[theme, {'icon-element-btn': iconButton}]"
        :style="{width: `${fontSize + paddingWidth / 1}px`, height: `${fontSize + paddingWidth / 1}px`, borderRadius: `${borderRadius}px`}"
        @click="$emit('click', $event)"
    >
        <div
            v-for="(item, index) in iconList"
            class="icon-element-item"
            :class="[callFunction(item.position)]"
            :key="index"
        >
            <i
                class="icon-element ms-Icon"
                :class="[`ms-Icon--${callFunction(item.name)}`]"
                :style="{fontSize: `${fontSize}px`,
                        color: callFunction(item.color),
                        'background-image': callFunction(item.color),
                        'background-clip': 'text',
                        '-webkit-background-clip': 'text',
                        '-webkit-text-fill-color': callFunction(item.color)
            }"
            ></i>
        </div>
    </div>
</template>
        


