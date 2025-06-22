import { commonProps } from '@/packages/common/props';
import { computed, ExtractPropTypes, PropType, ref, watch } from 'vue';
import { EmitFn } from '@/types/components';
import { callFunction, clickOutside, useTheme } from '@/utils/common';

export type OptionType = 'divider' | 'normal' | 'more'

export type OptionItem = {
    name?: string | (()=>string)
    icon?: string | (()=>string)
    iconColor?: string | (()=>string)
    type?: OptionType | (()=>OptionType)
    disabled?: boolean | (()=>boolean),
    func?: ((...args:any[])=>void),
    show?: boolean | (()=>boolean),
    secondary?: Array<OptionItem>,
    choosen?: boolean,
    background?:string,
    foreground?:string
}

export const commandBarProps = {
    ...commonProps,
    modelValue: {
        type: Object as PropType<OptionItem>,
        default: () => ({})
    },
    options: {
        type: Array as PropType<Array<OptionItem>>,
        default: () => []
    },
    toward: {
        type: String as PropType<'down' | 'up'>,
        default: 'down'
    },
    background: {
        type: String,
        default: ''
    },
    compact: {
        type: Boolean,
        default: false
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

export type CommandBarProps = ExtractPropTypes<typeof commandBarProps>;

export const commandBarEmits = {
    "update:modelValue":(val:OptionItem)=>{
        return true;
    },
    "item-click": (val:OptionItem)=>{
        return true;
    }
}

export type CommandBarEmits = typeof commandBarEmits

export const useCommandBar = (props: CommandBarProps, emits: EmitFn<CommandBarEmits>) => {
    const thisValue = ref(props.modelValue)
    const thisOptions = ref<Array<OptionItem>>([])
    const currentLeft = ref(0)
    watch(()=>props.modelValue, (newVal, oldVal)=>{
        thisValue.value = newVal
    })
    watch(()=>thisValue.value,(newVal, oldVal)=>{
        emits("update:modelValue", newVal)
    })
    const optionsInit = ()=>{
        const model:OptionItem = {
            name: '',
            type: 'normal',
            icon: '',
            show: true,
            choosen: false,
            secondary: []
        }
        const result  = []
        for (let item of props.options) {
            let m = JSON.parse(JSON.stringify(model));
            m = Object.assign(m, item);
            result.push(m);
        }
        thisOptions.value = result;
    }
    watch(()=>props.options, ()=>{
        optionsInit()
    })
    const showDropDown = computed(()=>{
        if (thisValue.value.choosen !== true) return false;
        if (thisValue.value.secondary === undefined) return false;
        if (thisValue.value.secondary.length >0) return true;
        return false;
    })
    const {theme} = useTheme(props)
    const borderLightColor = computed(()=> {
        if (props.revealBorderColor) return props.revealBorderColor;
        if (theme.value == 'light') {
            return 'rgba(121, 119, 117, 0.1)';
        }
        if (theme.value == 'dark' || theme.value == 'custom') {
            return 'rgba(255, 255, 255, 0.1)';
        }
        return 'rgba(121, 119, 117, 0.1)';
    })
    const backgroundLightColor = computed(()=> {
        if (props.revealBackgroundColor) return props.revealBackgroundColor;
        if (theme.value == 'light') {
            return 'rgba(121, 119, 117, 0.05)';
        }
        if (theme.value == 'dark' || theme.value == 'custom') {
            return 'rgba(255, 255, 255, 0.05)';
        }
        return 'rgba(121, 119, 117, 0.05)';
    })
    const root = ref<HTMLElement>();
    const collapseAll = ()=>{
        for (let i = 0; i < thisOptions.value.length; i++) {
            let t = thisOptions.value[i];
            t.choosen = false;
            thisOptions.value[i] = t;
        }
    }
    const outsideEvent = (evt: Event)=>{
        if (clickOutside(evt.target as HTMLElement, root.value)){
            collapseAll()
        }
    }
    const outsideClickInit = ()=>{
        window.addEventListener('click', outsideEvent)
    }
    const outsideClickDestroy = ()=>{
        window.removeEventListener('click', outsideEvent)
    }
    const leftFormat=(event:Event) =>{
        let x = event.target as HTMLElement | null
        while (
            x!=null
        ){
            let cls = x.getAttribute("class")
            if (cls==null || cls.indexOf('command-bar-item') >-1) break;
            x = x.parentElement
        }
        if (root.value!==undefined && x!==null){
            let thisLeft = root.value.getBoundingClientRect().left;
            let thisRight = root.value.getBoundingClientRect().right;
            let targetLeft = x.getBoundingClientRect().left;
            let targetRight = x.getBoundingClientRect().right;
            let menuWidth = 200;
            if (targetLeft + menuWidth > thisRight)
                currentLeft.value = thisRight - thisLeft - menuWidth;
            else currentLeft.value = targetLeft - thisLeft;
     }
    }
    const  itemClick = (event: Event, item: OptionItem)=>{
        if (callFunction(item.disabled)) return 0;
        let status = !item.choosen;
        collapseAll();
        item.choosen = status;
        thisOptions.value[thisOptions.value.indexOf(item)] = item;
        thisValue.value = item;
        emits('item-click', item);
        if (item.func !== undefined) item.func();
        leftFormat(event);
    }
    const chooseItem = (event:{item:OptionItem})=> {
        let item = event.item;
        thisValue.value = item;
        if (item.func !== undefined) item.func();
        emits('item-click', item);
        collapseAll();
    }
    return {
        thisValue,
        thisOptions,
        currentLeft,
        itemClick,
        optionsInit,
        outsideClickInit,
        outsideClickDestroy,
        collapseAll,
        theme,
        showDropDown,
        backgroundLightColor,
        borderLightColor,
        root,
        chooseItem,
        callFunction
    }
}
