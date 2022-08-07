import { commonProps } from '@/packages/common/props';
import { computed, ExtractPropTypes, ref, watchEffect } from 'vue';
import { EmitFn } from '@/types/components';

export const progressRingProps = {
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
    width: {
        type: [Number],
        default: 60,
    },
    borderWidth: {
        type: [Number],
        default: 5,
    },
};

export type ProgressRingProps = ExtractPropTypes<typeof progressRingProps>;

export const progressRingEmits = {
    change: (val: number) => true,
    loaded: (val: number) => true,
    'update:modelValue': (val: number) => true,
};

export type ProgressRingEmits = typeof progressRingEmits;

export const useProgressRing = (
    props: ProgressRingProps,
    emits: EmitFn<ProgressRingEmits>
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
