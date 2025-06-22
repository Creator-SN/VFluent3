import { commonProps } from '@/packages/common/props';
import { computed, ExtractPropTypes, PropType, ref, watch } from 'vue';
import { EmitFn } from '@/types/components';

export const checkBoxProps = {
    ...commonProps,
    modelValue: {
        type: [String, Boolean],
        default: ""
    },
    borderWidth: {
        type: [Number],
        default: 1.5
    },
    borderColor: {
        type: [String],
        default: ""
    },
    background: {
        type: String,
        default: "rgba(0, 90, 158, 1)",
    },
    foreground: {
        type: String,
        default: ""
    },
    boxSide: {
        type: String as PropType<'start' | 'end'>,
        default: "start",
    },
}

export type CheckBoxProps = ExtractPropTypes<typeof checkBoxProps>;

export const checkBoxEmits = {
    "update:modelValue": (val: string | boolean) => {
        return true
    },
    "click": (val: string | boolean) => {
        return true;
    }
}

export type CheckBoxEmits = typeof checkBoxEmits

export const useCheckBox = (props: CheckBoxProps, emits: EmitFn<CheckBoxEmits>) => {
    const thisValue = ref<string | boolean>(props.modelValue);
    watch(() => props.modelValue, (newVal, oldVal) => {
        thisValue.value = newVal
    })
    watch(() => thisValue.value, (newVal, oldVal) => {
        emits("update:modelValue", newVal)
    })
    const indeterminate = computed(() => {
        return !(typeof thisValue.value === 'boolean')
    })
    const checked = (evt: Event) => {
        evt.preventDefault()
        if (props.disabled) return 0;
        thisValue.value = !thisValue.value;
        emits("click", thisValue.value)
    }
    return {
        thisValue,
        indeterminate,
        checked
    }
}
