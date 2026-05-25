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
                @update:modelValue="handleInput($event, idx)"
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
import { nextTick } from 'vue';

export default {
    name: 'FvVerifyBox',
    data() {
        return {
            thisValue: []
        };
    },
    watch: {
        modelValue(val) {
            if (val === this.thisValue.join('')) return;
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
        getBoxRef(idx) {
            const target = this.$refs[`t${idx}`];
            return Array.isArray(target) ? target[0] : target;
        },
        focusBox(idx) {
            const target = this.getBoxRef(idx);
            if (!target) return;
            if (typeof target.focus === 'function') target.focus();
        },
        handleInput(value, idx) {
            const nextValue = value == null ? '' : value.toString();
            const current = nextValue.slice(-1);

            if (this.thisValue[idx] === current) return;

            this.thisValue[idx] = current;

            if (!current) return;

            if (idx < this.length - 1) {
                nextTick(() => {
                    this.focusBox(idx + 1);
                });
                return;
            }

            this.$emit('confirm', this.thisValue.join(''));
        },
        handleKeyDown(event, idx) {
            if (event.ctrlKey) {
                // Ctrl + V
                if (event.keyCode === 86 && event.ctrlKey) {
                    navigator.clipboard.readText().then((data) => {
                        this.pasteProcess(data);
                    });
                }
                return;
            }
            // Arrow Right
            if(event.keyCode === 39 && idx < this.length - 1) {
                event.preventDefault();
                this.focusBox(idx + 1);
            }
            // Arrow Left
            if(event.keyCode === 37 && idx > 0) {
                event.preventDefault();
                this.focusBox(idx - 1);
            }
            // Backspace
            if (event.keyCode === 8) {
                event.preventDefault();
                if (this.thisValue[idx]) {
                    this.thisValue[idx] = '';
                    return;
                }
                if (idx <= 0) return;
                this.thisValue[idx - 1] = '';
                nextTick(() => {
                    this.focusBox(idx - 1);
                });
                return;
            }
            if (event.keyCode === 13) {
                this.$emit('confirm', this.thisValue.join(''));
                return;
            }
        },
        handlePaste(event) {
            let data = event.clipboardData.getData('text/plain');
            this.pasteProcess(data);
        },
        pasteProcess(data) {
            for (let i = 0; i < this.thisValue.length; i++) {
                this.thisValue[i] = '';
            }
            for (let i = 0; i < this.length; i++) {
                if (data[i]) this.thisValue[i] = data[i];
                else this.thisValue[i] = '';
            }
            if (data.length >= this.length) {
                this.$emit('confirm', this.thisValue.join(''));
            }
            let focusIdx =
                data.length < this.length ? data.length : this.length;
            focusIdx = focusIdx == this.length ? focusIdx - 1 : focusIdx;
            nextTick(() => {
                this.focusBox(focusIdx);
            });
        }
    }
};
</script>
