import { commonProps } from "@/packages/common/props";
import { EmitFn } from "@/types/components";
import { ExtractPropTypes, ref, watch } from "vue";

export const selectorProps = {
    ...commonProps,
    modelValue:{
        type: Boolean,
        default: false,
    },
    color: {
        type: String,
        default: ""
    }
}

export type SelectorProps = ExtractPropTypes<typeof selectorProps>;

export const selectorEmits = {
}

export type SelectorEmits = typeof selectorEmits

export const useSelector = (props: SelectorProps, emits: EmitFn<SelectorEmits>)=>{
    const checked = ref(props.modelValue)
    watch(()=>props.modelValue, (newVal, oldVal)=>{
        checked.value = newVal
    })
    return {
        checked
    }
}