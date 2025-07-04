<template>
    <div class="fv-Button" :class="[$theme]" @click="onClick">
        <div
            class="fv-button-main-container"
            :class="[{ disabled: isDisabled }, { shadow: isBoxShadow }]"
            :style="{ borderRadius: `${borderRadius}px` }"
        >
            <fv-reveal-container
                :parent="() => $el"
                class="fv-button-reveal-container"
                :backgroundColor="backgroundLightColor"
                :borderColor="borderLightColor"
                :borderGradientSize="80"
                :borderWidth="borderWidth"
                :borderRadius="borderRadius"
                :disabled="isDisabled"
            ></fv-reveal-container>
            <div
                :disabled="disabled"
                class="fv-button-container"
                :style="{
                    background: background,
                    'background-repeat': 'no-repeat',
                    'background-clip': 'content-box',
                    borderColor: borderColor,
                    borderWidth: `${borderWidth}px`,
                    borderRadius: `${borderRadius}px`
                }"
            >
                <span
                    class="fv-btn-content-block"
                    :style="{
                        color: foreground,
                        'font-size': `${fontSize}px`,
                        'font-weight': fontWeight
                    }"
                >
                    <i
                        class="ms-Icon"
                        :class="`ms-Icon--${icon}`"
                        :style="{ 'margin-right': icon != '' ? '5px' : '' }"
                    ></i>
                    <slot>Button</slot>
                </span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { commonProps } from '@/packages/common/props';

const emits = defineEmits(['click']);

const props = defineProps({
    ...commonProps,
    icon: {
        default: '',
        type: String
    },
    foreground: {
        default: '',
        type: String
    },
    background: {
        default: '',
        type: String
    },
    borderRadius: {
        default: 3
    },
    borderColor: {
        default: ''
    },
    fontSize: {
        default: 13.3
    },
    fontWeight: {
        default: 'normal',
        type: String
    },
    revealBorderColor: {
        default: false
    },
    revealBackgroundColor: {
        default: false
    },
    isBoxShadow: {
        default: false
    },
    disabled: {
        default: false
    },
    borderWidth: {
        default: 1
    }
});
</script>

<script>
import { useTheme } from '@/utils/common';

export default {
    name: 'FvButton',

    data() {
        return {};
    },
    watch: {},
    computed: {
        $theme() {
            return useTheme(this.$props).theme.value;
        },
        borderLightColor() {
            if (this.revealBorderColor) return this.revealBorderColor;
            if (this.$theme == 'light') {
                return 'rgba(121, 119, 117, 0.6)';
            }
            if (this.$theme == 'dark' || this.$theme == 'custom') {
                return 'rgba(255, 255, 255, 0.6)';
            }
        },
        backgroundLightColor() {
            if (this.revealBackgroundColor) return this.revealBackgroundColor;
            if (this.$theme == 'light') {
                return 'rgba(121, 119, 117, 0.1)';
            }
            if (this.$theme == 'dark' || this.$theme == 'custom') {
                return 'rgba(255, 255, 255, 0.1)';
            }
        },
        isDisabled() {
            return (
                this.disabled.toString() == 'true' ||
                this.disabled == 'disabled' ||
                this.disabled === ''
            );
        }
    },
    mounted() {},
    methods: {
        onClick(event) {
            event.preventDefault();
            if (this.isDisabled) return 0;
            this.$emit('click', event);
        }
    },
    beforeUnmount() {}
};
</script>
