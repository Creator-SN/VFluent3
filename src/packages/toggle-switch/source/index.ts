import { commonProps } from '@/packages/common/props';
import { computed, ExtractPropTypes, ref } from 'vue';
import { EmitFn } from '@/types/components';

export const toggleSwitchProps = {
    ...commonProps,
    modelValue: {
        type: [Boolean],
        default: undefined,
    },
    on: {
        type: [String],
    },
    off: {
        type: [String],
    },
    boxSide: {
        type: [String],
        default: 'start',
    },
    foreground: {
        type: [String],
    },
    offForeground: {
        type: [String],
    },
    onBackground: {
        type: [String],
    },
    onForeground: {
        type: [String],
    },
};

export type ToggleSwitchProps = ExtractPropTypes<typeof toggleSwitchProps>;

export const toggleSwitchEmits = {
    click: (val: boolean) => true,
    change: (val: boolean) => true,
    'update:modelValue': (val: boolean) => true,
    focus: (evt: FocusEvent) => true,
    blur: (evt: FocusEvent) => true,
};

export type ToggleSwitchEmits = typeof toggleSwitchEmits;

export const useToggleSwitch = (
    props: ToggleSwitchProps,
    emits: EmitFn<ToggleSwitchEmits>
) => {
    const value = ref<boolean>(false);
    const computedValue = computed<boolean>({
        get() {
            if (props.modelValue === undefined) {
                return value.value;
            }
            return props.modelValue;
        },
        set(val: boolean) {
            value.value = val;
            emits('update:modelValue', val);
        },
    });
    const computedLabel = computed<string | undefined>(() => {
        if (computedValue.value === true) {
            return props.on;
        }
        return props.off;
    });
    const onChange = (val: boolean) => {
        if (props.disabled === true) return;
        emits('change', val);
    };
    const onClick = (evt: MouseEvent) => {
        if (props.disabled === true) return;
        if (evt.target instanceof HTMLInputElement) {
            emits('click', !computedValue.value);
        }
    };
    const onFocus = (evt: FocusEvent) => {
        if (props.disabled === true) return;
        emits('focus', evt);
    };
    const onBlur = (evt: FocusEvent) => {
        if (props.disabled === true) return;
        emits('blur', evt);
    };
    return {
        computedValue,
        computedLabel,
        onClick,
        onFocus,
        onBlur,
        onChange,
    };
};
