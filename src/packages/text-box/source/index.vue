<template>
    <div
        class="fv-TextBox"
        :class="[$theme, status, isFocus ? 'focus' : '', isDisabled ? 'disabled' : '', isUnderline ? 'underline': '', { shadow: isBoxShadow }]"
        :style="[{ background: background, borderRadius: `${borderRadius}px` }]"
        @click="isFocus = true"
    >
        <fv-reveal-container
            :parent="() => $el"
            class="fv-text-box-reveal-container"
            :backgroundColor="backgroundLightColor"
            :borderColor="borderLightColor"
            :backgroundGradientSize="120"
            :borderGradientSize="60"
            :borderWidth="borderWidth"
            :borderRadius="borderRadius"
            :disabled="isDisabled || !revealBorder"
        ></fv-reveal-container>
        <div
            class="fv-text-box-wrapper-container"
            :style="{borderWidth: `${borderWidth}px`, borderColor: isFocus ? focusBorderColor : borderColor, borderRadius: `${borderRadius}px`}"
        >
            <div
                v-show="prefix != ''"
                class="fix-block"
            >
                <p>{{prefix}}</p>
            </div>
            <i
                v-show="leftIcon != ''"
                class="ms-Icon icon-block"
                :class="[`ms-Icon--${leftIcon}`]"
                @click="$emit('left-icon-click', $event)"
            ></i>
            <core
                v-model="thisValue"
                ref="core"
                :mode="mode"
                :inputmode="inputmode"
                :type="type"
                :placeholder="placeholder"
                :mask="mask"
                :flag="flag"
                :pattern="pattern"
                :inputRules="inputRules"
                :readonly="readonly"
                :maxlength="maxlength"
                :disabled="disabled"
                :fontSize="fontSize"
                :fontWeight="fontWeight"
                :foreground="foreground"
                :textAlign="textAlign"
                v-model:focus="isFocus"
                @keydown="$emit('keydown', $event)"
                @keyup="$emit('keyup', $event)"
                @change="$emit('change', $event)"
                @paste="$emit('paste', $event)"
            ></core>
            <i
                v-show="icon != ''"
                class="ms-Icon icon-block"
                :class="[`ms-Icon--${icon}`]"
                @click="$emit('icon-click', $event)"
            ></i>
            <div
                v-show="suffix != ''"
                class="fix-block"
            >
                <p>{{suffix}}</p>
            </div>
        </div>
    </div>
</template>
        
<script>
import { textBoxProps } from '.';
import { ClassBuilder, StyleBuilder, useTheme } from '@/utils/common';
import core from './sub/core.vue';

export default {
    name: 'FvTextBox',
    components: {
        core
    },
    emits: [
        'update:modelValue',
        'debounce-input',
        'keydown',
        'keyup',
        'change',
        'paste',
        'left-icon-click',
        'icon-click',
        'click'
    ],
    props: {
        ...textBoxProps,
        modelValue: {
            default: ''
        },
        mode: {
            default: 'default'
        },
        inputmode: {
            default: 'text'
        },
        placeholder: {
            default: ''
        },
        type: {
            default: 'text'
        },
        mask: {
            type: String,
            default: 'mask:___'
        },
        flag: {
            type: String,
            default: '_'
        },
        pattern: {
            type: String,
            default: '[Ss]*'
        },
        inputRules: {
            type: String,
            default: '[\S\s]*'
        },
        readonly: {
            default: false
        },
        maxlength: {
            default: ''
        },
        prefix: {
            default: ''
        },
        suffix: {
            default: ''
        },
        leftIcon: {
            default: ''
        },
        icon: {
            default: ''
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
            default: 13.3
        },
        fontWeight: {
            default: 'normal'
        },
        foreground: {
            default: ''
        },
        borderRadius: {
            default: 3
        },
        textAlign: {
            default: 'left'
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
        },
        debounceDelay: {
            default: 300
        },
        disabled: {
            default: false
        }
    },
    data() {
        return {
            thisValue: this.modelValue,
            isFocus: false,
            timer: {
                debounce: null
            }
        };
    },
    watch: {
        modelValue(val) {
            this.thisValue = val;
        },
        thisValue(val) {
            clearTimeout(this.timer.debounce);
            this.timer.debounce = setTimeout(() => {
                this.$emit('debounce-input', this.thisValue);
            }, this.debounceDelay);
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
        focus() {
            this.$refs.core.focusInspect();
        }
    }
};
</script>

