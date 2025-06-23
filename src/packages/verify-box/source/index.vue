<template>
    <div class="fv-VerifyBox" :class="[$theme]">
        <div
            v-if="thisValue.length === length"
            class="fv-verify-container"
            @paste="handlePaste($event)"
        >
            <fv-text-box
                :modelValue="thisValue[idx]"
                :inputmode="inputmode"
                class="fv-verify-unit"
                :theme="theme"
                v-for="(i, idx) in length"
                :key="idx"
                :disabled="isDisabled"
                :maxlength="1"
                :underline="underline"
                :background="background"
                :border-width="borderWidth"
                :border-color="borderColor"
                :focus-border-color="focusBorderColor"
                :font-size="fontSize"
                :font-weight="fontWeight"
                :foreground="foreground"
                :textAlign="'center'"
                :border-radius="borderRadius"
                :is-box-shadow="isBoxShadow"
                :reveal-border="revealBorder"
                :ref="`t${idx}`"
                @keydown="handleKeyDown($event, idx)"
            ></fv-text-box>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { commonProps } from '@/packages/common/props';

const emits = defineEmits(['update:modelValue', 'confirm']);

const props = defineProps({
    ...commonProps,
    modelValue: {
        default: ''
    },
    length: {
        default: 4
    },
    inputmode: {
        default: 'numeric'
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
        default: 18
    },
    fontWeight: {
        default: 'bold'
    },
    foreground: {
        default: ''
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
    disabled: {
        default: false
    }
});
</script>

<script>
import { useTheme } from '@/utils/common';

export default {
    name: 'FvVerifyBox',
    data() {
        return {
            thisValue: []
        };
    },
    watch: {
        modelValue() {
            this.valueFormat();
        },
        thisValue: {
            deep: true,
            handler(val) {
                this.$emit('update:modelValue', val.join(''));
            }
        }
    },
    computed: {
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
        $theme() {
            return useTheme(this.$props).theme.value;
        }
    },
    mounted() {
        this.valueFormat();
    },
    methods: {
        valueFormat() {
            this.thisValue = [];
            for (let i = 0; i < this.length; i++) {
                if (this.modelValue[i]) this.thisValue.push(this.modelValue[i]);
                else this.thisValue.push('');
            }
        },
        handleKeyDown(event, idx) {
            event.preventDefault();
            console.log(event);
            if (event.key.length === 1 && !event.ctrlKey) {
                this.thisValue[idx] = event.key;
            }
            // Backspace
            if (event.keyCode === 8) {
                this.thisValue[idx] = '';
                if (idx > 0) {
                    let target = this.$refs[`t${idx - 1}`][0];
                    target.focus();
                }
                return;
            }
            // Ctrl + V
            if (event.keyCode === 86 && event.ctrlKey) {
                navigator.clipboard.readText().then((data) => {
                    for (let i = 0; i < this.length; i++) {
                        this.thisValue[i] = data[i];
                    }
                });
                return;
            }
            if (event.keyCode === 13) {
                this.$emit('confirm', this.thisValue.join(''));
            }
            if (
                idx < this.length - 1 &&
                (event.key.length === 1 || event.keyCode === 9)
            ) {
                let target = this.$refs[`t${idx + 1}`][0];
                target.focus();
            }
            if (idx === this.length - 1) {
                this.$emit('confirm', this.thisValue.join(''));
            }
        },
        handlePaste(event) {
            console.log(event);
            let data = event.clipboardData.getData('text/plain');
            for (let i = 0; i < this.length; i++) {
                this.thisValue[i] = data[i];
            }
        }
    }
};
</script>
