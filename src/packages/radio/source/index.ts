import { commonProps } from '@/packages/common/props';
import { computed, ExtractPropTypes, ref } from 'vue';
import { EmitFn } from '@/types/components';

// subscribe https://github.com/vuejs/core/issues/4294
// see why not use typescript

// props
export const radioProps = {
    ...commonProps,
    modelValue: {
        type: [Boolean, Number, String],
        default: undefined,
    },
    borderWidth: {
        type: [Number, String],
        default: 1.5,
    },
    borderColor: {
        type: [String],
    },
    foreground: {
        type: [String],
    },
    background: {
        type: [String],
    },
    hoverColor: {
        type: [String],
    },
    boxSide: {
        type: [String],
        default: 'start',
    },
    group: {
        type: [String],
    },
    label: {
        type: [String, Number, Boolean],
        default: undefined
    },
};

export type RadioProps = ExtractPropTypes<typeof radioProps>;

// emits
export const radioEmits = {
    click(val?: string | number | boolean): boolean {
        return true;
    },
    'update:modelValue'(val?: boolean | number | string): boolean {
        return true;
    },
    change(val?: boolean | number | string): boolean {
        return true;
    },
    focus(evt: FocusEvent): boolean {
        return true;
    },
    blur(evt: FocusEvent): boolean {
        return true;
    },
};

export type RadioEmits = typeof radioEmits;

export function useRadio(
    props: Readonly<RadioProps>,
    emits: EmitFn<RadioEmits>
) {
    const computedChecked = computed(() => props.modelValue === props.label);
    const computedValue = computed({
        get() {
            return props.modelValue;
        },
        set(val?: string | number | boolean) {
            emits('update:modelValue', val);
        },
    });
    // events
    const onClick = (evt: MouseEvent) => {
        if (props.disabled) {
            return;
        }
        if (evt.target instanceof HTMLInputElement) {
            emits('click', props.label);
        }
    };
    const onChange = (val?: string | number | boolean) => {
        if (props.disabled) {
            return;
        }
        emits('change', val);
    };
    const onFocus = (evt: FocusEvent) => {
        if (props.disabled) {
            return;
        }
        emits('focus', evt);
    };
    const onBlur = (evt: FocusEvent) => {
        if (props.disabled) {
            return;
        }
        emits('blur', evt);
    };
    return {
        onClick,
        onChange,
        onFocus,
        onBlur,
        computedChecked,
        computedValue,
    };
}
