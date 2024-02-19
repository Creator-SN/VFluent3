<template>
    <div
        class="fv-RadioGroup"
        :class="[$theme, {inline}]"
    >
        <label v-if="label">{{label}}</label>
        <slot></slot>
    </div>
</template>
        
<script>
import { radioGroupProps } from '.';
import { ClassBuilder, StyleBuilder, useTheme } from '@/utils/common';

export default {
    name: 'FvRadioGroup',
    emits: ['change'],
    props: {
        ...radioGroupProps,
        modelValue: {
            required: true
        },
        disabled: {
            type: Boolean,
            default: false
        },
        label: {
            type: String,
            default: ''
        },
        inline: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {};
    },
    computed: {
        $theme() {
            return useTheme(this.$props).theme.value;
        }
    },
    methods: {
        change(val) {
            this.$emit('change', val);
        }
    }
};
</script>

