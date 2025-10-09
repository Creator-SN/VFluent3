<template>
    <div
        class="fv-TextBox"
        :class="[
            $theme,
            status,
            isFocus ? 'focus' : '',
            isDisabled ? 'disabled' : '',
            isUnderline ? 'underline' : '',
            { shadow: isBoxShadow }
        ]"
        :style="[{ background: background, borderRadius: `${borderRadius}px` }]"
        @click="
            ($event) => {
                isFocus = true;
                $emit('click', $event);
            }
        "
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
            :style="{
                borderWidth: `${borderWidth}px`,
                borderColor: isFocus ? focusBorderColor : borderColor,
                borderRadius: `${borderRadius}px`
            }"
        >
            <div v-show="prefix != ''" class="fix-block">
                <p>{{ prefix }}</p>
            </div>
            <i
                v-show="leftIcon != ''"
                class="ms-Icon icon-block"
                :class="[`ms-Icon--${leftIcon}`]"
                :style="{ color: iconForeground }"
                @click="$emit('left-icon-click', $event)"
            ></i>
            <core-input
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
            ></core-input>
            <i
                v-show="icon != ''"
                class="ms-Icon icon-block"
                :class="[`ms-Icon--${icon}`]"
                :style="{ color: iconForeground }"
                @click="$emit('icon-click', $event)"
            ></i>
            <div v-show="suffix != ''" class="fix-block">
                <p>{{ suffix }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue';
import { commonProps } from '@/packages/common/props';

const emits = defineEmits([
    'update:modelValue',
    'debounce-input',
    'keydown',
    'keyup',
    'change',
    'paste',
    'left-icon-click',
    'icon-click',
    'click'
]);

const props = defineProps({
    ...commonProps,
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
    iconForeground: {
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
});

// If we use script setup, we must use defineExpose to expose methods.
const core = ref(null);
const focus = () => {
    core.value.focusInspect();
};

defineExpose({
    focus
});
</script>

<script>
import { useTheme } from '@/utils/common';
import coreInput from './sub/core.vue';

export default {
    name: 'FvTextBox',
    components: {
        coreInput
    },
    data() {
        return {
            thisValue: this.modelValue.toString(),
            isFocus: false,
            timer: {
                debounce: null
            }
        };
    },
    watch: {
        modelValue(val) {
            this.thisValue = val.toString();
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
