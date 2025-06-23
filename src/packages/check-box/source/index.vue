<template>
    <div
        class="fv-CheckBox"
        :class="[$theme, boxSide == 'end' ? 'box-side-end' : '']"
        @click="Checked"
    >
        <div
            class="fv-checkbox-rec"
            :class="[
                { disabled: isDisabled, check: thisValue || Indeterminate }
            ]"
            :style="{
                background: thisValue || Indeterminate ? background : ''
            }"
        >
            <p
                class="fv-checkbox-border"
                :style="{
                    borderColor: Indeterminate ? 'transparent' : borderColor,
                    borderWidth: `${borderWidth}px`
                }"
            ></p>
            <transition name="font-clip-in">
                <div
                    v-show="thisValue && !Indeterminate"
                    class="fv-checkbox-content-block"
                >
                    <i
                        class="fv-checkbox-content ms-Icon ms-Icon--CheckMark"
                    ></i>
                </div>
            </transition>
            <transition name="font-clip-in">
                <div v-show="Indeterminate" class="fv-checkbox-content-block">
                    <i
                        class="fv-checkbox-content ms-Icon ms-Icon--CheckboxIndeterminate"
                    ></i>
                </div>
            </transition>
        </div>
        <span class="text-content-block" :style="{ color: foreground }">
            <slot></slot>
        </span>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { commonProps } from '@/packages/common/props';

const emits = defineEmits(['update:modelValue', 'click']);

const props = defineProps({
    ...commonProps,
    modelValue: {
        default: ''
    },
    borderWidth: {
        default: 1.5
    },
    borderColor: {
        type: String,
        default: ''
    },
    foreground: {
        default: ''
    },
    background: {
        type: String,
        default: 'rgba(0, 90, 158, 1)'
    },
    boxSide: {
        default: 'start'
    },
    disabled: {
        default: false
    }
});
</script>

<script>
import { useTheme } from '@/utils/common';

export default {
    name: 'FvCheckBox',

    data() {
        return {
            thisValue: this.modelValue
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
        Indeterminate() {
            if (this.thisValue === true || this.thisValue === false)
                return false;
            return true;
        },
        isDisabled() {
            return (
                this.disabled.toString() == 'true' ||
                this.disabled == 'disabled' ||
                this.disabled === ''
            );
        }
    },
    mounted() {
        this.thisValue = this.modelValue;
    },
    methods: {
        Checked(event) {
            event.preventDefault();
            if (this.isDisabled) return 0;
            this.thisValue = !this.thisValue;
            this.$emit('click', this.thisValue); //@event click//
        }
    }
};
</script>
