import { commonProps } from '@/packages/common/props';
import { computed, ExtractPropTypes, PropType, ref } from 'vue';
import { EmitFn } from '@/types/components';

type Status = "default" | "warning" | "correct" | "blocked" | "error"

type Mode = "relative" | "absolute" | "fixed"

export const infoBoxProps = {
    ...commonProps,
    title: {
        type: String,
        default: 'Tip'
    },
    status: {
        type: String as PropType<Status>,
        default: 'default'
    },
    mode: {
        type: String as PropType<Mode>,
        default: 'relative'
    },
    confirmTitle: {
        type: String,
        default: '确定'
    },
    cancelTitle: {
        type: String,
        default: '取消'
    },
    showTitleBar: {
        type: Boolean,
        default: true
    },
    acrylic: {
        type: Boolean,
        default: false
    },
    destroy: {
        type: Function as PropType<()=>void>,
    }
}

export type InfoBoxProps = ExtractPropTypes<typeof infoBoxProps>;

export const infoBoxEmits = {
    "confirm"(){
        return true;
    },
    "close"(){
        return true;
    }
}

export type InfoBoxEmits = typeof infoBoxEmits

export const useInfoBox = (props: InfoBoxProps, emits: EmitFn<InfoBoxEmits>) => {
    const iconList = {
        default: {
            icon: 'Error',
            background: '',
            backgroundColor: 'rgba(0, 98, 158, 0.8)'
        },
        warning: {
            icon: 'Warning',
            background: 'brown',
            backgroundColor: 'rgba(234, 183, 2, 1)'
        },
        correct: {
            icon: 'Completed',
            background: 'green',
            backgroundColor: 'rgba(69, 172, 97, 1)'
        },
        blocked: {
            icon: 'Blocked12',
            background: 'red',
            backgroundColor: 'rgba(200, 50, 59, 1)'
        },
        error: {
            icon: 'ErrorBadge',
            background: 'red',
            backgroundColor: 'rgba(200, 50, 59, 1)'
        }
    }
    const confirm = ()=>{
        emits('confirm')
    }
    const close = ()=>{
        emits("close")
    }
    return {
        confirm,
        close,
        iconList
    }
}
