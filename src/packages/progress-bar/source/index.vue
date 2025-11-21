<template>
    <div
        class="fv-ProgressBar"
        :class="[
            $theme,
            loading.toString() != 'true' ? 'normal' : '',
            isDisabled ? 'disabled' : ''
        ]"
        :style="{ background: background, borderRadius: borderRadius + 'px' }"
    >
        <p
            v-show="loading.toString() == 'true'"
            v-for="i in 5"
            class="unit"
            :style="{ background: foreground }"
            :key="i"
        ></p>
        <i
            v-show="loading.toString() != 'true'"
            :style="{
                width: (percent <= 100 ? percent : 100) + '%',
                background: foreground,
                borderRadius: borderRadius + 'px'
            }"
        ></i>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { commonProps } from '@/packages/common/props';

const emits = defineEmits([
    'update:modelValue',
    'progress-change',
    'progress-finished'
]);

const props = defineProps({
    ...commonProps,
    modelValue: {
        default: 0
    },
    foreground: {
        default: ''
    },
    background: {
        default: ''
    },
    borderRadius: {
        default: 2
    },
    loading: {
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
    name: 'FvProgressBar',

    data() {
        return {
            percent: this.modelValue
        };
    },
    watch: {
        modelValue(val) {
            this.percent = val;
        },
        percent(val) {
            this.$emit('update:modelValue', val);
            this.$emit('progress-change', val);
            if (val >= 100) this.$emit('progress-finished', val);
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
        }
    }
};
</script>
