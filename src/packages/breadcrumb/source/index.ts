import { commonProps } from '@/packages/common/props';
import { computed, ExtractPropTypes, ref,watch } from 'vue';
import { EmitFn } from '@/types/components';

export const breadcrumbProps = {
    ...commonProps,
    modelValue: {
        type: [String],
        default: "",
    },
    separator: {
        type: String,
        default: "/",
    },
    separatorChar: {
        type: String,
        default: "/",
    },
    showRoot: {
        type: Boolean,
        default: true,
    },
    rootIcon: {
        type: String,
        default: "FolderHorizontal",
    },
    readOnly: {
        type: Boolean,
        default: true,
    },
    borderColor: {
        type: String,
        default: "",
    },
    borderRadius: {
        type: [String, Number],
        default: "2",
    },
    disabled: {
        type: [String, Boolean],
        default: false,
    },
}

export type BreadcrumbProps = ExtractPropTypes<typeof breadcrumbProps>;

export const breadcrumbEmits = {
    "update:modelValue":(val:string)=>{
        return true;
    },
    "root-click":(obj: {path:string, pathList: Array<string>})=>{
        return true;
    },
    "item-click":(obj: {path:string, fullPath:string, pathList: Array<string>, current: string})=>{
        return true;
    }
}

export type BreadcrumbEmits = typeof breadcrumbEmits

export const useBreadcrumb = (props: BreadcrumbProps, emits: EmitFn<BreadcrumbEmits>) => {
    const thisValue = ref("")
    const computedValue = computed<string>({
        get(){
            if (props.modelValue!==''){
                return props.modelValue
            }
            return thisValue.value;
        },
        set(val:string) {
            thisValue.value = val;
            emits("update:modelValue", val)
        }
    })
    const mode = ref("default")
    const tempValue = ref(props.modelValue)
    watch(mode, async (oldMode:string, newMode:string)=>{
        if (newMode==='editor'){
            let route = computedValue.value;
            if (route[0] === props.separatorChar){
                route = route.slice(1, route.length)
            }
            tempValue.value = route
        }else{
            let route = tempValue.value
            if (route[0] === props.separatorChar)
                route = route.slice(1, route.length)
            if (computedValue.value[0] === props.separatorChar){
                computedValue.value = `${props.separatorChar}${route}`
            }else
                computedValue.value = route
        }
    })
    const separatorIcon = computed(()=>{
        return props.separator.length>1
    })
    const routeList= computed(()=>{
        let route = computedValue.value
        if (route[0]===props.separatorChar)
            route = route.slice(1, route.length)
        if (route==="") return []
        return route.split(props.separatorChar)
    })
    const isDisabled = computed(()=>{
        if (typeof props.disabled==='string'){
            if (props.disabled ==='true' || props.disabled==='disabled' || props.disabled===''){
                return true
            }
            return false;
        }
        return props.disabled
    })
    const root = ref<HTMLElement>();
    const outsideClickInit = ()=>{
        window.addEventListener("click", (evt:MouseEvent)=>{
            let x = evt.target as HTMLElement;
            let _self = false;
            while (x && x.tagName && x.tagName.toLowerCase() != "body") {
                if (x == root.value) {
                    _self = true;
                    break;
                }
                x = x.parentNode as HTMLElement
            }
            if (!_self) mode.value = "default";
        })
    }
    const main = ref<HTMLElement>()
    const editor = ref<HTMLInputElement>();
    const editorMode = (evt:Event)=>{
        if (isDisabled.value) return 0;
        if (props.readOnly) return 0;
        const target = (evt.target as HTMLElement).parentElement?.parentElement
        if (target !== main.value) return 0
        evt.preventDefault()
        evt.stopPropagation()
        mode.value = "editor"
        setTimeout(()=>{
            editor.value?.focus()
            editor.value?.select()
        }, 300)
    }
    const handleEnter = (evt:KeyboardEvent)=>{
        if (evt.code==="Enter") mode.value = "default"
        computedValue.value = tempValue.value
    }
    const routeClick = ()=>{
        if (isDisabled.value) return 0;
        emits("root-click",{
            path: computedValue.value,
            pathList: routeList.value
        })
    }
    const routeItemClick = (item:string, index:number)=>{
        if (isDisabled.value) return 0;
        let path = ""
        let pathList = []
        for (let i = 0; i <= index; i++) pathList.push(routeList.value[i]);
        pathList.forEach((el) => {
            if (path == "") path = el;
            else path += `${props.separatorChar}${el}`;
        });
        emits("item-click", {
            path: path,
            fullPath: `${props.separatorChar}${path}`,
            pathList: pathList,
            current: item,
        });
    }
    return {
        mode,
        root,
        main,
        editor,
        editorMode,
        tempValue,
        computedValue,
        separatorIcon,
        routeList,
        isDisabled,
        outsideClickInit,
        handleEnter,
        routeClick,
        routeItemClick
    }
}
