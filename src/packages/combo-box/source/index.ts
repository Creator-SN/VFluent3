import { commonProps } from '@/packages/common/props';
import {
    computed,
    ExtractPropTypes,
    onMounted,
    onUnmounted,
    PropType,
    ref,
    watch,
    nextTick,
    Component,
} from 'vue';
import { EmitFn } from '@/types/components';
import {
    clickOutside,
    getBoundingClientRect,
    outsideClientPosition,
    positionDiff,
} from '@/utils/common/dom';
import { isNumber, ItemOfArray } from '@/utils/common';

type ComboBoxPropsOptions = Array<{
    key: string;
    text?: string;
    type?: 'text' | 'divider';
}>;

export const comboBoxProps = {
    ...commonProps,
    options: {
        type: Array as PropType<ComboBoxPropsOptions>,
        default: () => [],
    },
    modelValue: {
        type: [String],
        default: undefined,
    },
    editable: {
        type: [Boolean],
    },
    placeholder: {
        type: [String],
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
    maxlength: {
        type: [Number],
    },
    minlength: {
        type: [Number],
    },
    title: {
        type: [String],
        default: 'input',
    },
    fontSize: {
        type: [Number],
        default: 14,
    },
    inputRules: {
        type: [Object, String, Function],
    },
    pattern: {
        type: [Object, String, Function],
    },
    required: {
        type: [Boolean],
    },
};

export type ComboBoxProps = ExtractPropTypes<typeof comboBoxProps>;

export const comboBoxEmits = {
    change: (val?: string) => {
        return true;
    },
    'update:modelValue': (val?: string) => {
        return true;
    },
    focus: (evt: FocusEvent) => {
        return true;
    },
    blur: (evt: FocusEvent) => {
        return true;
    },
    keydown: (val?: string) => {
        return true;
    },
    keyup(val?: string) {
        return true;
    },
    keypress(val?: string) {
        return true;
    },
    input(val?: string) {
        return true;
    },
    errorInput(val?: string) {
        return true;
    },
    warningInput(val?: string) {
        return true;
    },
};

export type ComboBoxEmits = typeof comboBoxEmits;

export const useComboBox = (
    props: ComboBoxProps,
    emits: EmitFn<ComboBoxEmits>
) => {
    const root = ref<HTMLElement>();
    const optionsShow = ref<boolean>(false);
    const value = ref<string>();
    const option = ref<Array<HTMLElement>>();
    const options = ref<HTMLElement>();
    const optionsHeight = ref<number>();
    const optionHeight = ref<number>();
    const optionsTop = ref<number | string>();
    const optionsBottom = ref<number | string>();
    const effectPosition = ref<'flex-start' | 'flex-end' | 'center'>('center');
    const input = ref();

    const hide = () => {
        optionsShow.value = false;
    };
    const clickOutsideEvent = (evt: MouseEvent) => {
        if (clickOutside(evt.target as HTMLElement | null, root.value)) {
            hide();
        }
    };
    const computedValue = computed<string | undefined>({
        get() {
            if (props.modelValue === undefined) {
                return value.value;
            }
            return props.modelValue;
        },
        set(val: string | undefined) {
            value.value = val;
            if (val !== undefined) emits('update:modelValue', val);
        },
    });
    const show = async () => {
        if (props.disabled === true) {
            return;
        }
        if (props.options.length === 0) {
            return;
        }
        if (props.editable === false) {
            let index = props.options.findIndex(
                (e) => e.key === computedValue.value
            );
            if (index == -1) {
                index = 0;
            }
            if (optionHeight.value !== undefined) {
                optionsTop.value = -optionHeight.value * index - 7.5;
            }
            optionsBottom.value = '';
            let diff: positionDiff;
            await nextTick(() => {
                diff = outsideClientPosition(
                    getBoundingClientRect(options.value)
                );
                if (diff.bottom < 0) {
                    if (isNumber(optionsTop.value)) {
                        optionsTop.value += diff.bottom - 7.5;
                    } else {
                        optionsTop.value = `calc( ${optionsTop.value} + ${diff.bottom}px - 7.5px)`;
                    }
                }
            });
            await nextTick(() => {
                diff = outsideClientPosition(
                    getBoundingClientRect(options.value)
                );
                if (diff.top < 0) {
                    if (isNumber(optionsTop.value)) {
                        optionsTop.value += -diff.top + 7.5;
                    } else {
                        optionsTop.value = `calc( ${optionsTop.value} - ${diff.bottom}px + 7.5px)`;
                    }
                }
            });

            if (index === 0) {
                effectPosition.value = 'flex-start';
            } else if (index == props.options.length - 1) {
                effectPosition.value = 'flex-end';
            } else {
                effectPosition.value = 'center';
            }
        } else {
            optionsTop.value = 'calc(100% - 4px)';
            optionsBottom.value = '';
            effectPosition.value = 'flex-start';
            let diff: positionDiff;
            await nextTick(async () => {
                diff = outsideClientPosition(
                    getBoundingClientRect(options.value)
                );
                if (diff.bottom < 0) {
                    optionsTop.value = '';
                    optionsBottom.value = '100%';
                    effectPosition.value = 'flex-end';
                }
            });
            await nextTick(() => {
                diff = outsideClientPosition(
                    getBoundingClientRect(options.value)
                );
                // check top
                if (diff.top < 0) {
                    optionsTop.value = 'calc(100% - 4px)';
                    optionsBottom.value = undefined;
                    effectPosition.value = 'flex-start';
                }
            });
        }
        await nextTick(() => {
            optionsShow.value = true;
        });
    };
    // events
    const onInputClick = () => {
        if (props.editable === true) return;
        show();
    };
    const onInputIconClick = () => {
        if (props.editable === false) return;
        if (optionsShow.value === true) {
            hide();
        } else {
            show();
        }
    };
    const onSelectOption = (option: ItemOfArray<ComboBoxPropsOptions>) => {
        computedValue.value = option.key;
        hide();
    };
    const onChange = (val?: string) => {
        emits('change', val);
    };
    const onBlur = (evt: FocusEvent) => {
        emits('blur', evt);
    };
    const onFocus = (evt: FocusEvent) => {
        emits('focus', evt);
    };
    const onKeydown = (val?: string) => {
        emits('keydown', val);
    };
    const onKeyup = (val?: string) => {
        emits('keyup', val);
    };
    const onKeypress = (val?: string) => {
        emits('keypress', val);
    };
    const onInput = (val?: string) => {
        emits('input', val);
    };
    const onErrorInput = (val?: string) => {
        emits('errorInput', val);
    };
    const onWarningInput = (val?: string) => {
        emits('warningInput', val);
    };
    // exposes
    const focus = () => {
        if (input.value !== undefined) {
            input.value.focus();
        }
    };

    watch(
        () => props.options,
        () => {
            const { height } = getBoundingClientRect(options.value);
            optionsHeight.value = height;
        }
    );
    onMounted(() => {
        if (window !== undefined) {
            window.addEventListener('click', clickOutsideEvent);
        }
        const { height } = getBoundingClientRect(options.value);
        optionsHeight.value = height;
        if (option.value !== undefined) {
            const { height } = getBoundingClientRect(option.value[0]);
            optionHeight.value = height;
        }
    });
    onUnmounted(() => {
        if (window !== undefined) {
            window.removeEventListener('click', clickOutsideEvent);
        }
    });
    return {
        input,
        effectPosition,
        optionsTop,
        optionsBottom,
        optionsHeight,
        options,
        option,
        computedValue,
        onSelectOption,
        onInputClick,
        onInputIconClick,
        onChange,
        onFocus,
        onBlur,
        onErrorInput,
        onWarningInput,
        optionsShow,
        root,
        hide,
        show,
        focus,
        onInput,
        onKeydown,
        onKeypress,
        onKeyup,
    };
};
