import { commonProps } from '@/packages/common/props';
import { computed, ExtractPropTypes, ref, watch } from 'vue';
import { EmitFn } from '@/types/components';
import { Color } from '@/utils/common';

export const collapseProps = {
    ...commonProps,
    modelValue: {
        type: Boolean,
        default: false
    },
    icon: {
        type: String,
        default: 'Mail'
    },
    title: {
        type: String,
        default: 'Title of Collapse.'
    },
    content: {
        type: String,
        default: 'Content information of Collapse.'
    },
    background: {
        type: String,
        default: ''
    },
    defaultHeight: {
        type: [String, Number],
        default: 70
    },
    maxHeight: {
        type: [String, Number],
        default: 300
    },
    disabledCollapse: {
        type: Boolean,
        default: false
    },
    visibleOverflow: {
        type: Boolean,
        default: true
    }
}

export type CollapseProps = ExtractPropTypes<typeof collapseProps>;

export const collapseEmits = {
    "update:modelValue": (val: boolean) => {
        return true;
    },
    "item-click": (val: boolean) => {
        return true
    },
    "left-icon-click": (val: MouseEvent) => {
        return true
    },
    "description-click": (val: MouseEvent) => {
        return true
    },
    "icon-click": (val: MouseEvent) => {
        return true
    }
}

export type CollapseEmits = typeof collapseEmits

export const useCollapse = (props: CollapseProps, emits: EmitFn<CollapseEmits>) => {

    const thisValue = ref(props.modelValue)
    const hover = ref(false)
    watch(() => props.modelValue, (newVal, oldVal) => {
        thisValue.value = newVal
    })
    watch(() => thisValue.value, (newVal, oldVal) => {
        emits("update:modelValue", newVal)
    })
    const hoverBackground = computed(() => {
        try {
            if (props.background !== '') {
                let color = Color.new(props.background);
                let hue = color.hue();
                return color.hue(hue - 0.01).cssrgba()
            } else {
                return undefined;
            }
        } catch (e) {
            return undefined;
        }
    })
    const itemClick = () => {
        if (!props.disabledCollapse) {
            thisValue.value = !thisValue.value
        }
        emits("item-click", thisValue.value)
    }
    return {
        thisValue,
        hover,
        hoverBackground,
        itemClick
    }
}
