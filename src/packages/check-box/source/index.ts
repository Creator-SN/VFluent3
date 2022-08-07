import { commonProps } from '@/packages/common/props';
import { computed, ExtractPropTypes, ref } from 'vue';
import { EmitFn } from '@/types/components';

// subscribe https://github.com/vuejs/core/issues/4294
// see why not use typescript

// props
export const checkBoxProps = {
    ...commonProps,
    modelValue: {
        type: [Boolean],
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
};

export type CheckBoxProps = ExtractPropTypes<typeof checkBoxProps>;

// emits
export const checkBoxEmits = {
    click(val?: boolean | null): boolean {
        return true;
    },
    'update:modelValue'(val?: boolean): boolean {
        return true;
    },
    change(val?: boolean | null): boolean {
        return true;
    },
    focus(evt: FocusEvent): boolean {
        return true;
    },
    blur(evt: FocusEvent): boolean {
        return true;
    },
};

export type CheckboxEmits = typeof checkBoxEmits;

export function useCheckbox(
    props: Readonly<CheckBoxProps>,
    emits: EmitFn<CheckboxEmits>
) {
    const checked = ref<boolean>();
    const computedChecked = computed({
        get: () => {
            if (props.modelValue === undefined) {
                return checked.value;
            } else if (props.modelValue === null) {
                return undefined;
            }
            return props.modelValue;
        },
        set: (val) => {
            checked.value = val;
            emits('update:modelValue', val);
        },
    });
    // events
    const onClick = (evt: MouseEvent) => {
        if (props.disabled) {
            return;
        }
        if (evt.target instanceof HTMLInputElement) {
            // next status
            emits(
                'click',
                computedChecked.value !== undefined
                    ? !computedChecked.value
                    : true
            );
        }
    };
    const onChange = (val?: boolean) => {
        if (props.disabled) {
            return;
        }
        emits('change', val === undefined ? null : val);
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
    };
}
