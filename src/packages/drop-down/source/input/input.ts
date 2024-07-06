import { commonProps } from "@/packages/common/props";
import { computed, ExtractPropTypes, PropType, ref, watch } from "vue";
import { DropDownOption } from "..";
import { EmitFn } from "@/types/components";
import { callFunction, useTheme } from "@/utils/common";

export const inputProps = {
    ...commonProps,
    modelValue: {
        type: Array as PropType<Array<DropDownOption>>,
        default: () => []
    },
    borderWidth: {
        type: Number,
        default: 1
    },
    placeholder: {
        type: String,
        default: 'Dropdown'
    },
    borderRadius: {
        type: String,
        default: '3'
    },
    inputForeground: {
        type: String,
        default: ''
    },
    inputBackground: {
        type: String,
        default: ''
    },
    inputBorderColor: {
        type: String,
        default: ''
    },
    dropDownIcon: {
        type: String,
        default: 'ChevronDown'
    },
    dropDownIconForeground: {
        type: String,
        default: ''
    },
    revealBorderColor: {
        type: Boolean,
        default: false
    },
    revealBackgroundColor: {
        type: Boolean,
        default: false
    }
}

export type InputProps = ExtractPropTypes<typeof inputProps>

export const inputEmits = {
    "update:modelValue"(val:Array<DropDownOption>){
        return true;
    }
}

export type InputEmits = typeof inputEmits;

export const useInput = (props: InputProps, emits: EmitFn<InputEmits>)=>{
    const choosenValue = ref(props.modelValue)
    const {theme} = useTheme(props)
    watch(()=>props.modelValue, (newVal,oldVal)=>{
        choosenValue.value = newVal;
    })
    watch(()=>choosenValue.value, (newVal, oldVal)=>{
        emits("update:modelValue", newVal)
    })
    const inputValue = computed(()=>{
        let result = '';
            for(let item of choosenValue.value) {
                if(result == '')
                    result += callFunction(item.text);
                else
                    result += `,${callFunction(item.text)}`;
            }
            return result;
    })
    const borderLightColor = computed(()=> {
        if(props.revealBorderColor) return props.revealBorderColor;
        if(theme.value == 'light') {
            return 'rgba(121, 119, 117, 0.6)';
        }
        if (theme.value == 'dark' || theme.value == 'custom') {
            return 'rgba(255, 255, 255, 0.6)';
        }
        return 'rgba(121, 119, 117, 0.6)';
    })
    const backgroundLightColor = computed(()=> {
        if(props.revealBackgroundColor) return props.revealBackgroundColor;
        if (theme.value == 'light') {
            return 'rgba(121, 119, 117, 0.3)';
        }
        if(theme.value == 'dark' || theme.value == 'custom') {
            return 'rgba(255, 255, 255, 0.3)';
        }
        return 'rgba(121, 119, 117, 0.3)';
    })
    const root = ref<HTMLElement>()
    return {
        root,
        theme,
        choosenValue,
        inputValue,
        borderLightColor,
        backgroundLightColor
    }
}