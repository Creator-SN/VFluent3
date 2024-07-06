import { commonProps } from '@/packages/common/props';
import { computed, ExtractPropTypes, PropType, ref, watch } from 'vue';
import { EmitFn } from '@/types/components';
import { clickOutside, isDefined } from '@/utils/common';

type DropDownType = 'header' | 'divider'

export type DropDownOption = {
    key?: string
    text?: string
    type?: DropDownType
    disabled?: boolean
    choosen?: boolean
}

export const dropDownProps = {
    ...commonProps,
    modelValue: {
        type: Array as PropType<Array<DropDownOption>>,
        default: () => []
    },
    options: {
        type: Array as PropType<Array<DropDownOption>>,
        default: () => []
    },
    multiple: {
        type: Boolean,
        default: false
    },
    borderWidth: {
        type: Number,
        default: 1
    },
    borderRadius: {
        type: String,
        default: "6"
    },
    placeholder: {
        default: 'Dropdown'
    },
    maxHeight: {
        type: [Number, String],
        default: ''
    },
    inputForeground: {
        type: String,
        default: ''
    },
    inputBorderColor: {
        type: String,
        default: ''
    },
    checkBoxBackground: {
        type: String,
        default: ''
    },
    dropDownListForeground: {
        type: String,
        default: ''
    },
    dropDownListBackground: {
        type: String,
        default: ''
    },
    inputBackground: {
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
    showError: {
        type: Boolean,
        default: false
    },
    errorMessage: {
        type: String,
        default: 'This dropdown has an error'
    },
    setFocus: {
        type: Boolean,
        default: false
    }
}

export type DropDownProps = ExtractPropTypes<typeof dropDownProps>;

export const dropDownEmits = {
    "update:modelValue"(val:Array<DropDownOption>){
        return true
    },
    "visible-change"(val: boolean){
        return true;
    },
    "change"(val:{option:DropDownOption,index: number}){
        return true;
    }
}

export type DropDownEmits = typeof dropDownEmits

export const useDropDown = (props: DropDownProps, emits: EmitFn<DropDownEmits>) => {
    const choosenValue = ref(props.modelValue)
    const topRemainHeight = ref(window.innerHeight)
    const bottomRemainHeight = ref(window.innerHeight)
    const timer = ref<number | NodeJS.Timeout>()
    const styles = ref({
        dropDown:{
            zIndex: 0,
            overflow: 'visible'
        }
    })
    const show = ref({
        listContainer: false
    })
    watch(()=>props.modelValue, (newVal, oldVal)=>{
        choosenValue.value = newVal
    })
    watch(()=>choosenValue.value, (newVal, oldVal)=>{
        emits("update:modelValue", newVal)
    })
    watch(()=>props.setFocus, (newVal, oldVal)=>{
        show.value.listContainer = newVal
    })
    watch(()=>show.value.listContainer, (newVal, oldVal)=>{
        if (newVal){
            styles.value.dropDown.zIndex = 1;
        }else{
            styles.value.dropDown.zIndex = 0;
        }
        emits("visible-change", newVal)
    })
    const dropDownListHeight = computed(()=>{
        return 36 * props.options.length
    })
    const dropDownListShowStatus = computed(()=> {
        if (dropDownListHeight.value < bottomRemainHeight.value)
            return {
                position: 'bottom',
                top: '100%',
                bottom: '',
                height: 'auto',
                overflow: 'hidden'
            };
        if (dropDownListHeight.value < topRemainHeight.value)
            return {
                position: 'top',
                top: '',
                bottom: '100%',
                height: 'auto',
                overflow: 'hidden'
            };
        if (topRemainHeight.value > bottomRemainHeight.value)
            return {
                position: 'top',
                top: '',
                bottom: '100%',
                height: `${topRemainHeight.value}px`,
                overflow: 'auto'
            };
        return {
            position: 'bottom',
            top: '100%',
            bottom: '',
            height: `${bottomRemainHeight.value}px`,
            overflow: 'auto'
        };
    })
    const root = ref<HTMLElement>()
    const events = {
        window: {
            click: (event:Event)=>{
                if (show.value.listContainer && clickOutside(event.target as HTMLElement, root.value)){
                    show.value.listContainer = false;
                }
            }
        }
    }
    const init = ()=>{
        for (let eventName in events.window){
            let key = eventName as keyof typeof events.window
            window.addEventListener(key, events.window[key])
        }
        heightSenseInit();
    }
    const input = ref<HTMLElement>();
    const heightSenseInit = ()=>{
        clearInterval(timer.value)
        timer.value = setInterval(()=>{
            try {
                if (isDefined(input.value)){
                topRemainHeight.value =
                    input.value.getBoundingClientRect().top;
                }
            } catch (e) {
                topRemainHeight.value = window.innerHeight;
            }
            try {
                if (isDefined(input.value))
                bottomRemainHeight.value =
                    window.innerHeight -
                    input.value.getBoundingClientRect().bottom;
            } catch (e) {
                bottomRemainHeight.value = window.innerHeight;
            }
        },300)
    }
    const destroy = ()=>{
        for (let eventName in events.window){
            let key = eventName as keyof typeof events.window
            window.removeEventListener(key, events.window[key])
        }
        clearInterval(timer.value)
    }
    const onChange = (event:{option:DropDownOption,index: number})=>{
        show.value.listContainer = props.multiple
        emits("change", event)
    }
    return {
        root, 
        input,
        choosenValue,
        styles,
        show,
        init, 
        destroy,
        heightSenseInit,
        dropDownListShowStatus,
        dropDownListHeight,
        onChange
    }
}
