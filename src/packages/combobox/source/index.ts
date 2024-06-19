import { commonProps } from '@/packages/common/props';
import { computed, ExtractPropTypes, PropType, ref, watch } from 'vue';
import { EmitFn } from '@/types/components';
import { callFunction, clickOutside, useTheme } from '@/utils/common';

type OptionType = 'divider' | 'default' | 'header'

type OptionItem = {
    key: string
    text: string | (()=>string)
    type?: OptionType | (()=>OptionType)
    disabled: boolean | (()=>boolean)
}

export const comboboxProps = {
    ...commonProps,
    modelValue: {
        type: Object as PropType<OptionItem>,
        default: () => ({})
    },
    options: {
        type: Array as PropType<Array<OptionItem>>,
        default: () => []
    },
    borderWidth: {
        type: Number,
        default: 1
    },
    placeholder: {
        type: String,
        default: 'Combobox'
    },
    borderRadius: {
        type: [Number, String],
        default: '3'
    },
    background: {
        type: String,
        default: ''
    },
    choosenBackground: {
        type: String,
        default: ''
    },
    choosenSliderBackground: {
        type: String,
        default: ''
    },
    inputForeground: {
        type: String,
        default: ''
    },
    inputBackground: {
        type: String,
        default: ''
    },
    titleForeground: {
        type: String,
        default: ''
    },
    itemHeight: {
        type: Number,
        default: 40
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

export type ComboboxProps = ExtractPropTypes<typeof comboboxProps>;

export const comboboxEmits = {
    "update:modelValue":(val: OptionItem)=>{
        return true;
    },
    "choose-item": (val: OptionItem)=>{
        return true;
    }
}

export type ComboboxEmits = typeof comboboxEmits

export const useCombobox = (props: ComboboxProps, emits: EmitFn<ComboboxEmits>) => {
    const thisValue = ref(props.modelValue)
    const {theme} = useTheme(props)
    watch(()=>thisValue.value, (newVal, oldVal)=>{
        emits("update:modelValue", newVal);
    }) 
    const borderLightColor = computed(()=>{
        if (props.revealBorderColor) return props.revealBorderColor;
        if (theme.value == 'light') {
            return 'rgba(121, 119, 117, 0.6)';
        }
        if (theme.value == 'dark' || theme.value == 'custom') {
            return 'rgba(255, 255, 255, 0.6)';
        }
        return 'rgba(121, 119, 117, 0.6)';
    })
    const backgroundLightColor = computed(()=>{
        if (props.revealBackgroundColor) return props.revealBackgroundColor;
            if (theme.value == 'light') {
                return 'rgba(121, 119, 117, 0.3)';
            }
            if (theme.value == 'dark' || theme.value == 'custom') {
                return 'rgba(255, 255, 255, 0.3)';
            }
            return 'rgba(121, 119, 117, 0.3)';
    })
    const root = ref<HTMLElement>();
    const status = ref(false);
    const outsideClickInit = ()=>{
        window.addEventListener("click", evt=>{
            if (clickOutside(evt.target as HTMLElement, root.value)){
                status.value = false;
            }
        })
        window.addEventListener("touchend", evt=>{
            if (clickOutside(evt.target as HTMLElement, root.value)){
                status.value = false;
            }
        })
    }
    const coItems = ref<HTMLElement>();
    const choose = (evt:Event, item: OptionItem)=>{
        if (callFunction(item.disabled)) return 0;
        if (callFunction(item.type)==='header' || callFunction(item.type)==='divider'){
            return 0;
        }
        thisValue.value = item
        let target = evt.target as HTMLElement | null
        while (
            target!= null
        ) {
            let cls = target.getAttribute('class')
            if (cls==null || cls.indexOf('fv-combobox-item')>-1) break;
            target = target.parentElement;
        }
        if (coItems.value!==undefined && target?.offsetTop!==undefined)
            coItems.value.scrollTop = target.offsetTop;
        status.value = false;
        emits('choose-item', thisValue.value);
    }
    return {
        thisValue,
        borderLightColor,
        backgroundLightColor,
        outsideClickInit,
        choose,
        root,
        coItems,
        status
    }
}
