import { commonProps } from '@/packages/common/props';
import { computed, ExtractPropTypes, PropType, ref, watch } from 'vue';
import { EmitFn } from '@/types/components';
import { clickOutside, isDefined } from '@/utils/common';

type PositionType = 'bottom' | 'left' | 'right' | 'top'

export const drawerProps = {
    ...commonProps,
    position: {
        type: String as PropType<PositionType>,
        default: 'bottom'
    },
    length: {
        type: [Number, String],
        default: 300
    },
    background: {
        type: String,
    },
    modelValue: {
        type: Boolean,
        default: undefined
    },
    zIndex: {
        type: Number,
        default: 10
    },
    focusTrap: {
        type: Boolean,
        default: false
    },
    appendBody: {
        type: Boolean,
        default: false
    }
}

export type DrawerProps = ExtractPropTypes<typeof drawerProps>;

export const drawerEmits = {
    "update:modelValue"(val: boolean){
        return true;
    }
}

export type DrawerEmits = typeof drawerEmits

export const useDrawer = (props: DrawerProps, emits: EmitFn<DrawerEmits>) => {
    const lock = ref(false)
    const style = ref<{
        drawer: Record<string,any>
    }>({
        drawer: {
            zIndex: props.zIndex
        }
    })
    const show = ref({
        drawer: isDefined(props.modelValue)?props.modelValue:false,
    })
    const computedVisible = computed({
        get(){
            return isDefined(props.modelValue)?props.modelValue:show.value.drawer;
        },
        set(val){
            show.value.drawer = val;
            emits("update:modelValue",val)
        }
    })
    const initShow = ref(computedVisible.value)
    const windowEvents = {
        click:(evt:Event)=>{
            if (!computedVisible.value || lock.value) return;
            if (props.focusTrap) return;
            if (clickOutside(evt.target as HTMLElement, drawer.value)){
                computedVisible.value = false;
            }
        }
    }
    watch(()=>computedVisible.value, ()=>{
        lock.value = true;
        setStyle();
        // Avoid Dumplite Touch
        setTimeout(() => {
            lock.value = false;
        }, 50);
    })
    const init = ()=>{
        for (let eventName in windowEvents){
            let key = eventName as keyof typeof windowEvents;
            window.addEventListener(key, windowEvents[key])
        }
    }
    const setStyle = ()=>{
        let length = props.length;
        // e.g. 100vw 100% 100 and so on.
        if (typeof props.length == 'number') {
            length += 'px';
        }
        switch (props.position){
            case "bottom":{
                style.value.drawer = {
                    left: '0',
                    bottom: '0',
                    height: length,
                    width: '100%',
                    zIndex: props.zIndex,
                    transform: ` ${
                        computedVisible.value
                            ? 'translateY(0%)'
                            : 'translateY(110%)'
                    }`
                }
                break;
            }
            case "top":{
                style.value.drawer = {
                    left: '0',
                    top: '0',
                    height: length,
                    width: '100%',
                    zIndex: props.zIndex,
                    transform: `${
                        computedVisible.value
                            ? 'translateY(0%)'
                            : 'translateY(-110%)'
                    }`
                };
                break
            }
            case "left":{
                style.value.drawer = {
                    left: '0',
                    top: '0',
                    width: length,
                    height: '100%',
                    zIndex: props.zIndex,
                    transform: `${
                        computedVisible.value
                            ? 'translateX(0%)'
                            : 'translateX(-110%)'
                    }`
                };
                break;
            }
            case "right":{
                style.value.drawer = {
                    right: '0',
                    top: '0',
                    width: length,
                    height: '100%',
                    zIndex: props.zIndex,
                    transform: `${
                    computedVisible.value
                        ? 'translateX(0%)'
                        : 'translateX(110%)'
                    }`
                }
            }
        }
    }
    const close = ()=>{
        computedVisible.value = false
    }
    const drawer = ref<HTMLElement>();
    const destroy = ()=>{
        for (let eventName in windowEvents){
            let key = eventName as keyof typeof windowEvents
            window.removeEventListener(key, windowEvents[key])
        }
    }
    return {
        drawer,
        style,
        close,
        destroy,
        init,
        initShow,
        setStyle,
        lock,
        show,
        computedVisible
    }
}
