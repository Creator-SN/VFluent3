<template>
    <div
        class="fv-Collapse"
        :class="[
            $theme,
            { visibleOverflow: disabledCollapse && visibleOverflow }
        ]"
        :style="{
            height: !thisValue ? `${defaultHeight}px` : `${maxHeight}px`,
            'max-height': `${maxHeight}px`,
            background: hover ? hoverBackground : background
        }"
        @mouseenter="hover = true"
        @touchstart="hover = true"
        @mouseleave="hover = false"
        @touchend="hover = false"
    >
        <div
            class="collapse-description-container"
            :style="{ height: `${defaultHeight}px` }"
            @click="itemClick"
        >
            <div class="collapse-icon-box" @click="$emit('left-icon-click')">
                <slot name="icon">
                    <div class="collapse-icon-box-default">
                        <i class="ms-Icon" :class="[`ms-Icon--${icon}`]"></i>
                    </div>
                </slot>
            </div>
            <div class="collapse-description-box">
                <div
                    class="collapse-description"
                    @click="$emit('description-click')"
                >
                    <div class="collapse-text">
                        <slot
                            name="container"
                            :title="title"
                            :contnet="content"
                        >
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
            <div
                class="collapse-expand-icon-block"
                @click="$emit('icon-click')"
            >
                <slot
                    name="expand-icon"
                    :value="thisValue"
                    :disabledCollaspe="disabledCollapse"
                >
                    <i
                        v-show="thisValue"
                        class="ms-Icon ms-Icon--ChevronUpMed"
                    ></i>
                    <i
                        v-show="!thisValue && !disabledCollapse"
                        class="ms-Icon ms-Icon--ChevronDownMed"
                    ></i>
                    <i
                        v-show="!thisValue && disabledCollapse"
                        class="ms-Icon ms-Icon--ChevronRightMed"
                    ></i>
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

<script setup>
import { defineProps, defineEmits } from 'vue';
import { commonProps } from '@/packages/common/props';

const emits = defineEmits([
    'update:modelValue',
    'item-click',
    'left-icon-click',
    'description-click',
    'icon-click'
]);

const props = defineProps({
    ...commonProps,
    modelValue: {
        default: false
    },
    icon: {
        type: String,
        default: 'Mail'
    },
    title: {
        type: String,
        default: 'Title of Collapse.'
    },
    content: {
        type: String,
        default: 'Content information of Collapse.'
    },
    background: {
        default: ''
    },
    defaultHeight: {
        default: 70
    },
    maxHeight: {
        default: 300
    },
    disabledCollapse: {
        default: false
    },
    visibleOverflow: {
        default: true
    }
});
</script>

<script>
import one from 'onecolor';

import { useTheme } from '@/utils/common';

export default {
    name: 'FvCollapse',

    data() {
        return {
            thisValue: this.modelValue,
            hover: false
        };
    },
    watch: {
        modelValue(val) {
            this.thisValue = val;
        },
        thisValue(val) {
            this.$emit('update:modelValue', val);
        }
    },
    computed: {
        hoverBackground() {
            try {
                let color = one(this.background);
                let hue = color.hue();
                return color.hue(hue - 0.01).cssa();
            } catch (e) {
                return '';
            }
        },
        $theme() {
            return useTheme(this.$props).theme.value;
        }
    },
    methods: {
        itemClick() {
            !this.disabledCollapse ? (this.thisValue ^= true) : '';
            this.$emit('item-click', this.thisValue);
        }
    }
};
</script>
