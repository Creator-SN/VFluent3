<template>
    <div
        class="fv-ToggleSwitch"
        :class="[$theme, isDisabled ? 'disabled' : '']"
        @mouseup="toggle"
    >
        <div
            class="fv-toggle-border"
            :class="{ 'toggle-on': thisValue }"
            ref="border"
            :style="[
                {
                    width: finalWidth,
                    height: finalHeight,
                    background: thisValue ? switchOnBackground : '',
                    borderColor: thisValue ? '' : borderColor
                }
            ]"
        >
            <toggle-ring
                :value="thisValue"
                :left="toggleLeft"
                :ringBackground="ringBackground"
                :theme="$theme"
                ref="toggle"
                @mousedown="toggleDown"
                @touchstart="toggleDown"
                @mousemove="toggleMove"
                @touchmove="toggleMove"
                @mouseup="toggleUp"
                @touchend="toggleUp"
            ></toggle-ring>
            <p
                v-show="insideContent"
                class="fv-toggle-inside-content"
                :style="{
                    left: thisValue ? '10px' : '',
                    right: !thisValue ? '10px' : '',
                    color: thisValue ? 'white' : offForeground
                }"
            >
                {{ thisValue ? on : off }}
            </p>
        </div>
        <p
            v-show="!insideContent"
            class="fv-toggle-content"
            :style="{ color: thisValue ? onForeground : offForeground }"
        >
            {{ thisValue ? on : off }}
        </p>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { commonProps } from '@/packages/common/props';

const emits = defineEmits();

const props = defineProps({
    ...commonProps,
    modelValue: {
        default: false
    },
    on: {
        default: 'On'
    },
    off: {
        default: 'Off'
    },
    onForeground: {
        default: ''
    },
    offForeground: {
        default: ''
    },
    width: {
        default: 40
    },
    height: {
        default: 20
    },
    borderColor: {
        default: ''
    },
    ringBackground: {
        default: ''
    },
    switchOnBackground: {
        default: ''
    },
    insideContent: {
        default: false
    },
    disabled: {
        default: false
    }
});
</script>

<script>
import toggleRing from './toggleRing.vue';

import { useTheme } from '@/utils/common';

export default {
    name: 'FvToggleSwitch',
    components: {
        toggleRing
    },

    data() {
        return {
            thisValue: this.modelValue,
            disX: 0, // record mouseX - offsetLeft   // so that left = mouseXNew - mouseX + offsetLeft, when mouseXNew == mouseX, the result is offsetLeft than 0.
            mouseMove: false,
            currentLeft: 0,
            toggleLeft: ''
        };
    },
    watch: {
        modelValue(val) {
            this.thisValue = val;
        },
        thisValue(val) {
            this.$emit('update:modelValue', val);
        },
        currentLeft() {
            this.toggleLeft = this.computedLeft;
        }
    },
    computed: {
        $theme() {
            return useTheme(this.$props).theme.value;
        },
        isDisabled() {
            return (
                this.disabled.toString() == 'true' ||
                this.disabled == 'disabled' ||
                this.disabled === ''
            );
        },
        computedLeft() {
            if (!this.$refs.border) return 5;
            if (this.currentLeft < 5) return 5;
            if (this.currentLeft > this.$refs.border.clientWidth - 17)
                return this.$refs.border.clientWidth - 17;
            return this.currentLeft;
        },
        finalWidth() {
            if (isNaN(this.width)) {
                return this.width;
            } else return `${this.width}px`;
        },
        finalHeight() {
            if (isNaN(this.height)) {
                return this.height;
            } else return `${this.height}px`;
        }
    },
    methods: {
        toggleDown(event) {
            if (this.isDisabled) return;
            if (event.type.indexOf('mouse') < 0) event = event.targetTouches[0];
            this.disX = event.clientX - this.$refs.toggle.$el.offsetLeft;
        },
        toggleMove(event) {
            if (this.isDisabled) return;
            if (event.type.indexOf('mouse') < 0) event = event.targetTouches[0];
            this.mouseMove = true;
            this.currentLeft = event.clientX - this.disX;
        },
        toggleUp(event) {
            event.stopPropagation();
            if (this.isDisabled) return;
            if (this.mouseMove) {
                if (
                    this.$refs.toggle.$el.offsetLeft +
                        this.$refs.toggle.$el.clientWidth / 2 >
                    this.$refs.border.clientWidth / 2
                )
                    this.thisValue = true;
                else this.thisValue = false;
            } else this.thisValue = !this.thisValue;
            this.mouseMove = false;
            this.$emit('toggle', this.thisValue);
            this.currentLeft = this.$refs.toggle.$el.offsetLeft;
            this.disX = 0;
        },
        toggle(event) {
            if (this.isDisabled) return;
            this.thisValue = !this.thisValue;
            this.$emit('toggle', this.thisValue);
        }
    }
};
</script>
