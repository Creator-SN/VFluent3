<template>
    <div
        class="fv-Expander"
        :class="[
            $theme,
            { visibleOverflow: disabledExpander && visibleOverflow }
        ]"
        :style="{
            height: !thisValue ? `${defaultHeight}px` : computedMaxHeight
        }"
        @mouseenter="hover = true"
        @touchstart="hover = true"
        @mouseleave="hover = false"
        @touchend="hover = false"
    >
        <div
            class="expander-description-container"
            :style="{
                height: `${defaultHeight}px`,
                background: hover ? hoverBackground : titleBackground
            }"
            @click="itemClick"
        >
            <div class="expander-description-box">
                <div
                    class="expander-description"
                    @click="$emit('description-click')"
                >
                    <div class="expander-text">
                        <slot name="content" :title="title" :contnet="content">
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
                    :disabledCollaspe="disabledExpander"
                >
                    <i
                        v-show="thisValue"
                        class="ms-Icon ms-Icon--ChevronUpMed"
                    ></i>
                    <i
                        v-show="!thisValue && !disabledExpander"
                        class="ms-Icon ms-Icon--ChevronDownMed"
                    ></i>
                    <i
                        v-show="!thisValue && disabledExpander"
                        class="ms-Icon ms-Icon--ChevronRightMed"
                    ></i>
                </slot>
            </div>
        </div>
        <transition name="expander-expanded">
            <div
                v-show="thisValue"
                class="expander-detail"
                ref="detail"
                :style="{ background: expandBackground }"
            >
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
        default: 'Title of Expander.'
    },
    content: {
        type: String,
        default: 'Content information of Expander.'
    },
    titleBackground: {
        default: ''
    },
    expandBackground: {
        default: ''
    },
    defaultHeight: {
        default: 50
    },
    maxHeight: {
        default: 300
    },
    disabledExpander: {
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
    name: 'FvExpander',

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
                let color = one(this.titleBackground);
                let hue = color.hue();
                return color.hue(hue - 0.01).cssa();
            } catch (e) {
                return '';
            }
        },
        computedMaxHeight() {
            if (parseFloat(this.maxHeight).toString() === 'NaN') {
                return this.maxHeight;
            }
            let hintUnits = ['px', '%', 'vw', 'vh', 'rem', 'em'];
            let maxHeight = this.maxHeight;
            for (let unit of hintUnits) {
                if (maxHeight.toString().includes(unit)) {
                    return maxHeight;
                }
            }

            return `${maxHeight}px`;
        },
        $theme() {
            return useTheme(this.$props).theme.value;
        }
    },
    methods: {
        itemClick() {
            !this.disabledExpander ? (this.thisValue ^= true) : '';
            this.$emit('item-click', this.thisValue);
        }
    }
};
</script>
