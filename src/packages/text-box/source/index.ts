import { commonProps } from '@/packages/common/props';
import {
    computed,
    ExtractPropTypes,
    ref,
    watch,
    nextTick,
    onMounted,
} from 'vue';
import { EmitFn } from '@/types/components';
import { isNumber } from '@/utils/common';

export const textBoxProps = {
    ...commonProps,
    modelValue: {
        type: [String],
    },
    required: {
        type: [Boolean],
    },
    readonly: {
        type: [Boolean],
    },
    placeholder: {
        type: [String],
    },
    multiline: {
        type: [Boolean],
    },
    fontSize: {
        type: [Number],
        default: 14,
    },
    title: {
        type: [String],
        default: 'input',
    },
    password: {
        type: [Boolean],
    },
    minWidth: {
        type: [String, Number],
        default: 80,
    },
    maxWidth: {
        type: [String, Number],
        default: '100%',
    },
    maxlength: {
        type: [Number],
    },
    minlength: {
        type: [Number],
    },
    size: {
        type: [Number],
    },
    autofocus: {
        type: [Boolean],
    },
};

export type TextBoxProps = ExtractPropTypes<typeof textBoxProps>;

export const textBoxEmits = {
    'update:modelValue': (val: string) => {
        return true;
    },
    change: (val: string) => {
        return true;
    },
    focus: (evt: FocusEvent) => {
        return true;
    },
    blur: (evt: FocusEvent) => {
        return true;
    },
    keydown: (val: string) => {
        return true;
    },
    keyup(val: string) {
        return true;
    },
    keypress(val: string) {
        return true;
    },
};

export type TextBoxEmits = typeof textBoxEmits;

export const useTextBox = (
    props: TextBoxProps,
    emits: EmitFn<TextBoxEmits>
) => {
    const pre = ref<HTMLPreElement>();
    const input = ref<HTMLInputElement | HTMLTextAreaElement>();
    const value = ref<string>('');
    const computedValue = computed<string>({
        get() {
            // if cols > size:
            if (props.modelValue === undefined) {
                return value.value;
            }
            return props.modelValue;
        },
        set(val: string) {
            value.value = val;
            emits('update:modelValue', val);
        },
    });
    const computedType = computed<'textarea' | 'text'>(() => {
        if (props.multiline === true) {
            return 'textarea';
        }
        return 'text';
    });
    const inputHeight = ref<number>(30);
    const inputWidth = ref<number>(80);
    const showPassword = ref<boolean>(false);
    function refreshWidthAndHeight(count: number = 1) {
        --count;
        if (count < 0) {
            return;
        }
        nextTick(() => {
            if (pre.value !== undefined) {
                const { width, height } = pre.value.getBoundingClientRect();
                inputWidth.value = Math.ceil(width);
                inputHeight.value = Math.ceil(height);
                refreshWidthAndHeight(count);
            }
        });
    }
    watch([computedValue], () => {
        refreshWidthAndHeight(3);
    });
    onMounted(() => {
        refreshWidthAndHeight(1);
    });
    const onChange = (val: string) => {
        emits('change', val);
    };
    const onBlur = (evt: FocusEvent) => {
        emits('blur', evt);
    };
    const onFocus = (evt: FocusEvent) => {
        emits('focus', evt);
    };
    const focus = () => {
        if (input.value !== undefined) {
            input.value.focus();
        }
    };
    const clear = () => {
        computedValue.value = '';
    };
    const onClickIcon = () => {
        if (props.password === true) {
            showPassword.value = !showPassword.value;
        } else {
            clear();
        }
    };
    const onKeydown = (val: string) => {
        emits('keydown', val);
    };
    const onKeyup = (val: string) => {
        emits('keyup', val);
    };
    const onKeypress = (val: string) => {
        emits('keypress', val);
    };
    return {
        showPassword,
        focus,
        clear,
        input,
        pre,
        inputHeight,
        inputWidth,
        computedType,
        computedValue,
        onClickIcon,
        onChange,
        onBlur,
        onFocus,
        onKeydown,
        onKeyup,
        onKeypress,
    };
};
