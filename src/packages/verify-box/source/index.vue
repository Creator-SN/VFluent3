<template>
    <div class="fv-VerifyBox" :class="[$theme]">
        <div class="fv-verify-container" :style="{ position: 'relative' }">
            <input
                ref="proxyInput"
                v-model="thisValue"
                :inputmode="inputmode"
                :disabled="isDisabled"
                :maxlength="length"
                autocomplete="one-time-code"
                autocapitalize="off"
                spellcheck="false"
                class="fv-verify-proxy-input"
                @focus="handleInputFocus"
                @blur="handleInputBlur"
                @input="handleProxyInput"
                @click="syncActiveIndex()"
                @keydown="handleProxyKeyDown"
                @paste="handlePaste($event)"
            />
            <fv-text-box
                :modelValue="thisValue[idx] || ''"
                class="fv-verify-unit"
                :theme="theme"
                v-for="(i, idx) in length"
                :key="idx"
                :disabled="isDisabled"
                :maxlength="1"
                :readonly="true"
                :underline="underline"
                :background="background"
                :border-width="borderWidth"
                :border-color="boxBorderColor(idx)"
                :focus-border-color="boxBorderColor(idx)"
                :font-size="fontSize"
                :font-weight="fontWeight"
                :foreground="foreground"
                :textAlign="'center'"
                :border-radius="borderRadius"
                :is-box-shadow="isBoxShadow"
                :reveal-border="revealBorder"
                @click="focusInput(idx)"
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
        default: 'rgba(0, 153, 204, 0.6)'
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
            thisValue: '',
            activeIndex: -1
        };
    },
    watch: {
        modelValue(val) {
            const normalized = this.normalizeValue(val);
            if (normalized === this.thisValue) return;
            this.thisValue = normalized;
        },
        thisValue(val) {
            const normalized = this.normalizeValue(val);

            if (normalized !== val) {
                this.thisValue = normalized;
                return;
            }

            this.$emit('update:modelValue', normalized);

            if (normalized.length >= this.length) {
                this.$emit('confirm', normalized);
            }

            nextTick(() => {
                this.syncActiveIndex();
            });
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
        this.thisValue = this.normalizeValue(this.modelValue);
    },
    methods: {
        normalizeValue(value) {
            return value == null
                ? ''
                : value.toString().replace(/\s/g, '').slice(0, this.length);
        },
        getInputRef() {
            return this.$refs.proxyInput;
        },
        currentCursorIndex() {
            const input = this.getInputRef();
            if (!input || typeof input.selectionStart !== 'number') {
                return Math.min(this.thisValue.length, this.length - 1);
            }

            return Math.min(input.selectionStart, this.length - 1);
        },
        focusInput(idx = null) {
            if (this.isDisabled) return;

            const input = this.getInputRef();
            if (!input) return;

            input.focus();

            const cursor =
                typeof idx === 'number'
                    ? Math.min(idx, this.thisValue.length)
                    : this.thisValue.length;

            if (typeof input.setSelectionRange === 'function') {
                input.setSelectionRange(cursor, cursor);
            }

            this.syncActiveIndex(cursor);
        },
        boxBorderColor(idx) {
            if (this.activeIndex !== idx) return this.borderColor;
            return this.focusBorderColor || this.borderColor;
        },
        syncActiveIndex(cursor = null) {
            const input = this.getInputRef();
            if (!input || document.activeElement !== input) return;

            const currentCursor =
                typeof cursor === 'number' ? cursor : this.currentCursorIndex();

            this.activeIndex =
                this.thisValue.length >= this.length &&
                currentCursor >= this.length
                    ? this.length - 1
                    : Math.min(currentCursor, this.length - 1);
        },
        handleInputFocus() {
            this.syncActiveIndex(this.thisValue.length);
        },
        handleInputBlur() {
            this.activeIndex = -1;
        },
        handleProxyInput(event) {
            const normalized = this.normalizeValue(event.target.value);
            const cursor = Math.min(
                typeof event.target.selectionStart === 'number'
                    ? event.target.selectionStart
                    : normalized.length,
                normalized.length
            );

            if (normalized !== event.target.value) {
                event.target.value = normalized;
            }

            if (normalized !== this.thisValue) {
                this.thisValue = normalized;
            }

            nextTick(() => {
                if (typeof event.target.setSelectionRange === 'function') {
                    event.target.setSelectionRange(cursor, cursor);
                }
                this.syncActiveIndex(cursor);
            });
        },
        handleProxyKeyDown(event) {
            if (event.keyCode === 37) {
                event.preventDefault();
                this.focusInput(Math.max(this.currentCursorIndex() - 1, 0));
                return;
            }

            if (event.keyCode === 39) {
                event.preventDefault();
                this.focusInput(
                    Math.min(
                        this.currentCursorIndex() + 1,
                        this.thisValue.length
                    )
                );
                return;
            }

            if (event.keyCode === 13) {
                this.$emit('confirm', this.thisValue);
                return;
            }
        },
        handlePaste(event) {
            const data = event.clipboardData.getData('text/plain');
            this.thisValue = this.normalizeValue(data);
            nextTick(() => {
                this.focusInput();
            });
            event.preventDefault();
        }
    }
};
</script>
