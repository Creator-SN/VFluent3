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
import { isFunction, isString } from '@/utils/common';

export const textBoxProps = {
    ...commonProps,
    inputRules: {
        type: [Object, String, Function],
    },
    pattern: {
        type: [Object, String, Function],
    },
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
    hoverBorderColor: {
        type: [String],
    },
    errorBorderColor: {
        type: [String],
    },
    warningBorderColor: {
        type: [String],
    },
    rightIcon: {
        type: [String],
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
    input(val: string) {
        return true;
    },
    errorInput(val: string) {
        return true;
    },
    warningInput(val: string) {
        return true;
    },
    rightIconClick(val: string) {
        return true;
    },
};

export type TextBoxEmits = typeof textBoxEmits;

export const useTextBox = (
    props: TextBoxProps,
    emits: EmitFn<TextBoxEmits>
) => {
    const status = ref<'success' | 'error' | 'warning'>('success');
    const pre = ref<HTMLPreElement>();
    const input = ref<HTMLInputElement | HTMLTextAreaElement>();
    const value = ref<string>('');
    const old = ref<string>('');
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
    const showCustomIcon = computed(() => {
        if (props.rightIcon !== undefined) {
            return true;
        }
        return false;
    });
    const inputHeight = ref<number>(18);
    const inputWidth = ref<number>(80);
    const showPassword = ref<boolean>(false);
    const lockInput = ref<boolean>(false);
    function refreshWidthAndHeight({ h = 0, w = 0 } = {}) {
        lockInput.value = true;
        nextTick(() => {
            if (pre.value !== undefined) {
                let { width, height } = pre.value.getBoundingClientRect();
                width = Math.ceil(width);
                height = Math.ceil(height);
                if (width === w && height === h) {
                    lockInput.value = false;
                    return;
                }
                inputWidth.value = width;
                inputHeight.value = height;
                refreshWidthAndHeight({ h: height, w: width });
            }
        });
    }
    watch([computedValue], () => {
        refreshWidthAndHeight();
    });
    onMounted(() => {
        refreshWidthAndHeight();
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
        // fix old value
        old.value = '';
        focus();
    };
    const onClickIcon = () => {
        if (props.rightIcon === undefined) {
            if (props.password === true) {
                showPassword.value = !showPassword.value;
                focus();
            } else {
                clear();
            }
        } else {
            emits('rightIconClick', computedValue.value);
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
    const onInput = (val: string) => {
        const currentVal = val;
        status.value = 'success';
        // if not match input rules
        if (props.inputRules instanceof RegExp) {
            if (!props.inputRules.test(val)) {
                computedValue.value = old.value;
                val = old.value;
                status.value = 'warning';
                emits('warningInput', currentVal);
            } else {
                old.value = val;
            }
        } else if (isString(props.inputRules)) {
            if (props.inputRules !== val) {
                status.value = 'warning';
                computedValue.value = old.value;
                val = old.value;
                emits('warningInput', currentVal);
            } else {
                old.value = val;
            }
        } else if (isFunction(props.inputRules)) {
            if (!props.inputRules(val)) {
                status.value = 'warning';
                computedValue.value = old.value;
                val = old.value;
                emits('warningInput', currentVal);
            } else {
                old.value = val;
            }
        }
        if (props.pattern instanceof RegExp) {
            if (!props.pattern.test(val)) {
                status.value = 'error';
                emits('errorInput', currentVal);
            }
        } else if (isString(props.pattern)) {
            if (props.pattern !== val) {
                status.value = 'error';
                emits('errorInput', currentVal);
            }
        } else if (isFunction(props.pattern)) {
            if (props.pattern(val)) {
                status.value = 'error';
                emits('errorInput', currentVal);
            }
        }
        emits('input', val);
    };
    return {
        showCustomIcon,
        lockInput,
        showPassword,
        status,
        focus,
        clear,
        input,
        pre,
        inputHeight,
        inputWidth,
        computedType,
        computedValue,
        onInput,
        onClickIcon,
        onChange,
        onBlur,
        onFocus,
        onKeydown,
        onKeyup,
        onKeypress,
    };
};
