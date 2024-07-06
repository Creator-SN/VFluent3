<script setup lang="ts">
import { useTheme } from '@/utils/common';
import { expanderEmits, expanderProps, useExpander } from '.';

defineOptions({
    name:"FvExpander"
})

const props = defineProps(expanderProps)
const emits = defineEmits(expanderEmits)
const {theme} = useTheme(props)
const {hover,thisValue,hoverBackground,itemClick} = useExpander(props, emits)


</script>

<template>
    <div
        class="fv-Expander"
        :class="[theme, {visibleOverflow: disabled && visibleOverflow}]"
        :style="{height: !thisValue ? `${defaultHeight}px` : `${maxHeight}px`, 'max-height': `${maxHeight}px`}"
        @mouseenter="hover = true"
        @touchstart="hover = true"
        @mouseleave="hover = false"
        @touchend="hover = false"
    >
        <div
            class="expander-description-container"
            :style="{height: `${defaultHeight}px`, background: hover ? hoverBackground() : titleBackground}"
            @click="itemClick"
        >
            <div class="expander-description-box">
                <div
                    class="expander-description"
                    @click="emits('description-click')"
                >
                    <div class="expander-text">
                        <slot
                            name="content"
                            :title="title"
                            :contnet="content"
                        >
                            <div class="expander-title">{{ title }}</div>
                        </slot>
                    </div>
                </div>
                <div class="expander-description-extension-block">
                    <slot name="extension"></slot>
                </div>
            </div>
            <div
                class="expander-expand-icon-block"
                @click="$emit('icon-click')"
            >
                <slot
                    name="expand-icon"
                    :value="thisValue"
                    :disabledCollaspe="disabled"
                >
                    <i
                        v-show="thisValue"
                        class="ms-Icon ms-Icon--ChevronUpMed"
                    ></i>
                    <i
                        v-show="!thisValue && !disabled"
                        class="ms-Icon ms-Icon--ChevronDownMed"
                    ></i>
                    <i
                        v-show="!thisValue && disabled"
                        class="ms-Icon ms-Icon--ChevronRightMed"
                    ></i>
                </slot>
            </div>
        </div>
        <transition name="expander-expanded">
            <div
                v-show="thisValue"
                class="expander-detail"
                :style="{background: expandBackground}"
            >
                <slot></slot>
            </div>
        </transition>
    </div>
</template>
        

