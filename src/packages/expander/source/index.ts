import { commonProps } from '@/packages/common/props';
import { computed, ExtractPropTypes, ref, watch } from 'vue';
import { EmitFn } from '@/types/components';
import { Color } from '@/utils/common';

export const expanderProps = {
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
        default: 'Title of Expander.'
    },
    content: {
        type: String,
        default: 'Content information of Expander.'
    },
    titleBackground: {
        type: String,
        default: ''
    },
    expandBackground: {
        type: String,
        default: ''
    },
    defaultHeight: {
        type: Number,
        default: 50
    },
    maxHeight: {
        type: Number,
        default: 300
    },
    visibleOverflow: {
        type: Boolean,
        default: true
    }
}

export type ExpanderProps = ExtractPropTypes<typeof expanderProps>;

export const expanderEmits = {
    "update:modelValue"(val: boolean){
        return true;
    },
    "item-click"(val: boolean){
        return true;
    },
    "description-click"(){
        return true;
    },
    "icon-click"(){
        return true;
    }
}

export type ExpanderEmits = typeof expanderEmits

export const useExpander = (props: ExpanderProps, emits: EmitFn<ExpanderEmits>) => {
    const thisValue = ref(props.modelValue)
    const hover = ref(false)
    watch(()=>props.modelValue, (newVal, oldVal)=>{
        thisValue.value = newVal
    })
    watch(()=>thisValue.value, (newVal, oldVal)=>{
        emits('update:modelValue', newVal)
    })
    const hoverBackground = ()=>{
        try {
            if (props.titleBackground !== '') {
                let color = Color.new(props.titleBackground);
                let hue = color.hue();
                return color.hue(hue - 0.01).cssrgba()
            } else {
                return undefined;
            }
        } catch (e) {
            return undefined;
        }
    }
    const itemClick = ()=>{
        if (props.disabled===false){
            thisValue.value = !thisValue.value
        }
        emits("item-click",thisValue.value)
    }
    return {
        thisValue,
        hover,
        hoverBackground,
        itemClick
    }
}
