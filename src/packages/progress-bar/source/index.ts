import { commonProps } from '@/packages/common/props';
import { computed, ExtractPropTypes, ref, watchEffect } from 'vue';
import { EmitFn } from '@/types/components';

export const progressBarProps = {
    ...commonProps,
    indeterminate: {
        type: [Boolean],
    },
    modelValue: {
        type: [Number],
    },
    foreground: {
        type: [String],
    },
    background: {
        type: [String],
    },
    pauseForeground: {
        type: [String],
    },
    errorForeground: {
        type: [String],
    },
    max: {
        type: [Number],
        default: 100,
    },
    error: {
        type: [Boolean],
    },
    pause: {
        type: [Boolean],
    },
};

export type ProgressBarProps = ExtractPropTypes<typeof progressBarProps>;

export const progressBarEmits = {
    change: (val: number) => true,
    loaded: (val: number) => true,
    'update:modelValue': (val: number) => true,
};

export type ProgressBarEmits = typeof progressBarEmits;

export const useProgressBar = (
    props: ProgressBarProps,
    emits: EmitFn<ProgressBarEmits>
) => {
    const progress = ref<number>(0);
    const computedProgress = computed({
        get() {
            if (props.modelValue !== undefined) {
                return Math.max(Math.min(props.modelValue, props.max), 0);
            }
            return Math.max(Math.min(progress.value, props.max), 0);
        },
        set(val: number) {
            val = Math.max(Math.min(val, props.max), 0);
            progress.value = val;
            emits('update:modelValue', val);
            emits('change', val);
            if (val === props.max) {
                emits('loaded', val);
            }
        },
    });
    watchEffect(() => {
        if (props.modelValue !== undefined) {
            computedProgress.value = props.modelValue;
        }
    });
    const computedValue = computed(() => {
        return Math.round((computedProgress.value / props.max) * 100);
    });
    return {
        computedValue,
        computedProgress,
    };
};
