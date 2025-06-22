import { commonProps } from '@/packages/common/props';
import { computed, ExtractPropTypes, ref } from 'vue';
import { EmitFn } from '@/types/components';

export const badgeProps = {
    ...commonProps,
    value:{
        type:[String, Number],
        default:''
    },
    modelValue: {
        type: [String, Number],
        default: ''
    },
    max: {
        type: [Number,String],
        default: Infinity
    },
    isDot: {
        type: [Boolean],
        default: false
    },
    hidden: {
        type: [Boolean],
        default: false
    },
    type: {
        type: [String],
        default: 'default'
    }
}

export type BadgeProps = ExtractPropTypes<typeof badgeProps>;

export const badgeEmits = {
    "update:modelValue":(val:string|number)=>{
        return true;
    }
}

export type BadgeEmits = typeof badgeEmits

const colorList:Record<string, string> = {
    default: '#f56c6c',
    primary: '#409eff',
    success: 'rgba(0, 204, 153, 1)',
    warning: '#e6a23c',
    danger: '#f56c6c',
    info: '#909399'
}

export const useBadge = (props: BadgeProps, emits: EmitFn<BadgeEmits>) => {
    const thisValue = ref<string|number>("")
    const computedValue = computed<string|number>({
        get(){
            if (props.modelValue!==''){
                return props.modelValue;
            }
            if (props.value!==''){
                return props.value;
            }
            return thisValue.value;
        },
        set(val:string|number){
            thisValue.value = val;
            emits("update:modelValue", val)
        }
    })
    const finalValue = computed(()=>{
        const value = typeof computedValue.value==='string'?parseInt(computedValue.value):computedValue.value
        const max = typeof props.max==='string'?parseInt(props.max):props.max
        if (!Number.isNaN(value) && value > max){
            return `${max}+`;
        }
        return computedValue.value;
    })
    const finalColor = computed(()=>{
        if (!colorList[props.type]) return props.type;
        return colorList[props.type]
    })
    return {
        computedValue,
        finalColor,
        finalValue
    }
}
