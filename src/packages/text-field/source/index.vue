<template>
    <div
        class="fv-TextField"
        :class="[
            $theme,
            status,
            { focus: isFocus },
            { disabled: isDisabled },
            { underline: isUnderline },
            { shadow: isBoxShadow }
        ]"
        :style="[{ background: background, borderRadius: `${borderRadius}px` }]"
    >
        <fv-reveal-container
            :parent="() => $el"
            class="fv-text-field-reveal-container"
            :backgroundColor="backgroundLightColor"
            :borderColor="borderLightColor"
            :backgroundGradientSize="120"
            :borderGradientSize="60"
            :borderWidth="borderWidth"
            :borderRadius="borderRadius"
            :disabled="isDisabled || !revealBorder"
        ></fv-reveal-container>
        <div
            class="text-field-wrapper-container"
            :style="{
                borderWidth: `${borderWidth}px`,
                borderColor: isFocus ? focusBorderColor : borderColor,
                borderRadius: `${borderRadius}px`
            }"
        >
            <textarea
                v-model="thisValue"
                :placeholder="placeholder"
                class="fv-text-field-input"
                :readonly="isReadOnly"
                :disabled="isDisabled"
                :maxlength="maxlength"
                :style="{
                    'font-size': `${fontSize}px`,
                    'font-weight': fontWeight,
                    color: foreground,
                    'text-align': textAlign
                }"
                @keydown="$emit('keydown', $event)"
                @keyup="$emit('keyup', $event)"
                @change="$emit('change', $event)"
                @paste="$emit('paste', $event)"
                @focus="focus(true, $event)"
                @blur="focus(false, $event)"
            ></textarea>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { commonProps } from '@/packages/common/props';

const emits = defineEmits([
    'update:modelValue',
    'focus',
    'blur',
    'keydown',
    'keyup',
    'change',
    'paste'
]);

const props = defineProps({
    ...commonProps,
    modelValue: {
        default: ''
    },
    readonly: {
        default: false
    },
    placeholder: {
        default: ''
    },
    maxlength: {
        default: ''
    },
    disabled: {
        default: false
    },
    underline: {
        default: false
    },
    background: {
        default: ''
    },
    borderWidth: {
        default: 1
    },
    borderColor: {
        default: ''
    },
    focusBorderColor: {
        default: ''
    },
    fontSize: {
        default: 13.8
    },
    fontWeight: {
        default: 'normal'
    },
    foreground: {
        default: ''
    },
    textAlign: {
        default: 'left'
    },
    borderRadius: {
        default: 3
    },
    isBoxShadow: {
        default: false
    },
    revealBorder: {
        default: false
    },
    revealBorderColor: {
        default: false
    },
    revealBackgroundColor: {
        default: false
    },
    status: {
        default: ''
    }
});
</script>

<script>
import { useTheme } from '@/utils/common';

export default {
    name: 'FvTextField',

    data() {
        return {
            thisValue:
                (typeof this.modelValue).toString() == 'string'
                    ? this.modelValue
                    : '',
            isFocus: false
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
        $theme() {
            return useTheme(this.$props).theme.value;
        },
        isUnderline() {
            return (
                this.underline.toString() == 'true' ||
                this.underline == 'underline' ||
                this.underline === ''
            );
        },
        isReadOnly() {
            return (
                this.readonly.toString() == 'true' ||
                this.readonly == 'readonly' ||
                this.readonly === ''
            );
        },
        isDisabled() {
            return (
                this.disabled.toString() == 'true' ||
                this.disabled == 'disabled' ||
                this.disabled === ''
            );
        },
        borderLightColor() {
            if (this.revealBorderColor) return this.revealBorderColor;
            if (this.$theme == 'light') {
                return 'rgba(121, 119, 117, 0.6)';
            }
            if (this.$theme == 'dark' || this.$theme == 'custom') {
                return 'rgba(255, 255, 255, 0.6)';
            }
            return 'rgba(121, 119, 117, 0.6)';
        },
        backgroundLightColor() {
            if (this.revealBackgroundColor) return this.revealBackgroundColor;
            if (this.$theme == 'light') {
                return 'rgba(121, 119, 117, 0.3)';
            }
            if (this.$theme == 'dark' || this.$theme == 'custom') {
                return 'rgba(255, 255, 255, 0.3)';
            }
            return 'rgba(121, 119, 117, 0.3)';
        }
    },
    mounted() {},
    methods: {
        focus(status, event) {
            this.isFocus = status;
            if (status) this.$emit('focus', event);
            else this.$emit('blur', event);
        }
    }
};
</script>
