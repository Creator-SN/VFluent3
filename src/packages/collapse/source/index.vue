<script lang="ts" setup>
import { useTheme } from '@/utils/common';
import { collapseEmits, collapseProps, useCollapse } from '.';

defineOptions({
    name: "FvCollapse"
})

const props = defineProps(collapseProps)
const emits = defineEmits(collapseEmits)

const { theme } = useTheme(props)
const { thisValue, hover, hoverBackground, itemClick } = useCollapse(props, emits)
</script>

<template>
    <div class="fv-Collapse" :class="[theme, { visibleOverflow: disabledCollapse && visibleOverflow }]"
        :style="{ height: !thisValue ? `${defaultHeight}px` : `${maxHeight}px`, 'max-height': `${maxHeight}px`, background: hover ? hoverBackground : background }"
        @mouseenter="hover = true" @touchstart="hover = true" @mouseleave="hover = false" @touchend="hover = false">
        <div class="collapse-description-container" :style="{ height: `${defaultHeight}px` }" @click="itemClick">
            <div class="collapse-icon-box" @click="emits('left-icon-click', $event)">
                <slot name="icon">
                    <div class="collapse-icon-box-default">
                        <i class="ms-Icon" :class="[`ms-Icon--${icon}`]"></i>
                    </div>
                </slot>
            </div>
            <div class="collapse-description-box">
                <div class="collapse-description" @click="emits('description-click', $event)">
                    <div class="collapse-text">
                        <slot name="container" :title="title" :contnet="content">
                            <slot name="title" :title="title">
                                <div class="collapse-title">{{ title }}</div>
                            </slot>
                            <slot name="content" :content="content">
                                <div class="collapse-info">{{ content }}</div>
                            </slot>
                        </slot>
                    </div>
                </div>
                <div class="collapse-description-extension-block">
                    <slot name="extension"></slot>
                </div>
            </div>
            <div class="collapse-expand-icon-block" @click="emits('icon-click', $event)">
                <slot name="expand-icon" :value="thisValue" :disabledCollaspe="disabledCollapse">
                    <i v-show="thisValue" class="ms-Icon ms-Icon--ChevronUpMed"></i>
                    <i v-show="!thisValue && !disabledCollapse" class="ms-Icon ms-Icon--ChevronDownMed"></i>
                    <i v-show="!thisValue && disabledCollapse" class="ms-Icon ms-Icon--ChevronRightMed"></i>
                </slot>
            </div>
        </div>
        <transition name="collapse-expanded">
            <div class="collapse-detail" v-show="thisValue">
                <slot></slot>
            </div>
        </transition>
    </div>
</template>
