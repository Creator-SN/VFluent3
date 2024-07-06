import { commonProps } from "@/packages/common/props";
import { ExtractPropTypes, PropType, ref, watch } from "vue";
import { DropDownOption } from "..";
import { EmitFn } from "@/types/components";

export const listContainerProps = {
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
    maxHeight: {
        type: [String, Number],
        default: ''
    },
    borderRadius: {
        type: String,
        default: '3'
    },
    checkBoxBackground: {
        type: String,
        default: ""
    },
    dropDownListForeground: {
        type: String,
        default: "rgba(0, 120, 215, 0.9)"
    },
    dropDownListBackground: {
        type: String,
        default: "rgba(0, 90, 158, 1)"
    },
    showStatus: {
        type: Object as PropType<{
            position: string
            top: string
            bottom: string
            height: string
            overflow: string,
            maxHeight?: string
        }>,
        default: () => {
            return {
                position: "bottom",
                top: "100%",
                bottom: "",
                height: "auto",
                overflow: "hidden",
                maxHeight: undefined
            };
        }
    }
}

export type ListContainerProps = ExtractPropTypes<typeof listContainerProps>;

export const listContainerEmits = {
    "update:modelValue"(val: Array<DropDownOption>){
        return true;
    },
    "chooseItem"(val: {
        option: DropDownOption
        index: number
    }){
        return true;
    }
}

export type ListContainerEmits = typeof listContainerEmits;

export const useListContainer = (props: ListContainerProps, emits: EmitFn<ListContainerEmits>)=>{
    const choosenValue = ref(props.modelValue)
    const styles = ref({
        listContainer: {
            top: "100%",
            bottom: "",
            height: "auto",
            maxHeight: "",
            background: "",
            borderRadius: "",
            overflow: ""
        },
        title: {
            color: ""
        }
    })
    watch(()=>props.modelValue, (newVal, oldVal)=>{
        choosenValue.value = newVal;
    })
    watch(()=>choosenValue.value, (newVal, oldVal)=>{
        emits("update:modelValue", newVal);
    })
    watch(()=>props.maxHeight, ()=> {
        stylesInit();
    })
    watch(()=>props.borderRadius,()=> {
        stylesInit();
    })
    watch(()=>props.dropDownListForeground, ()=>{
        stylesInit();
    })
    watch(()=>props.dropDownListBackground, ()=>{
        stylesInit();
    })
    watch(()=>props.showStatus.top, ()=> {
        stylesInit();
    })
    watch(()=>props.showStatus.bottom, ()=> {
        stylesInit();
    })
    watch(()=>props.showStatus.height, ()=> {
        stylesInit();
    })
    watch(()=>props.showStatus.overflow, ()=> {
        stylesInit();
    })
    const stylesInit = ()=> {
        styles.value.listContainer.borderRadius = `${props.borderRadius}px`;
        styles.value.listContainer.background = props.dropDownListBackground;
        styles.value.listContainer.top = props.showStatus.top;
        styles.value.listContainer.bottom = props.showStatus.bottom;
        styles.value.listContainer.height = props.showStatus.height;
        styles.value.listContainer.maxHeight = `${props.showStatus.maxHeight}px`;
        styles.value.listContainer.overflow = props.showStatus.overflow;
        styles.value.title.color = props.dropDownListForeground;
    }
    const onClick = (cur: DropDownOption)=>{
        if (cur.disabled) return 0;
        if (cur.type === "header" || cur.type == "divider") return 0;
        if (props.multiple) {
            let t = choosenValue.value.find(item => item.key === cur.key);
            if (t != undefined) {
                cur.choosen = false;
                choosenValue.value.splice(choosenValue.value.indexOf(t), 1);
            } else {
                cur.choosen = true;
                choosenValue.value.push(cur);
            }
        } else {
            for (let it of choosenValue.value) {
                it.choosen = false;
            }
            cur.choosen = true;
            choosenValue.value = [];
            choosenValue.value.push(cur);
        }

        emits("chooseItem", {
            option: cur,
            index: props.options.indexOf(cur)
        });
    }
    return {
        onClick,
        stylesInit,
        choosenValue,
        styles,
    }
}