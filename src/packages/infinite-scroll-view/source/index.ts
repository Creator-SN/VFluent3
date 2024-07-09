import { commonProps } from '@/packages/common/props';
import { computed, ExtractPropTypes, PropType, ref, watch } from 'vue';
import { EmitFn } from '@/types/components';
import { isDefined } from '@/utils/common';

export const infiniteScrollViewProps = {
    ...commonProps,
    modelValue: {
        type: Array as PropType<Array<any>>,
        default: () => []
    },
    batchSize: {
        type: Number,
        default: 30
    },
    offset: {
        type: Number,
        default: 100
    },
    static: {
        type: Boolean,
        default: false
    },
}

export type InfiniteScrollViewProps = ExtractPropTypes<typeof infiniteScrollViewProps>;

export const infiniteScrollViewEmits = {
    "update:modelValue"(val:Array<any>){
        return true;
    },
    "init-start"(){
        return true;
    },
    "init-end"(){
        return true;
    },
    "lazyload"(val?: boolean){
        return true;
    }
}

export type InfiniteScrollViewEmits = typeof infiniteScrollViewEmits

export const useInfiniteScrollView = (props: InfiniteScrollViewProps, emits: EmitFn<InfiniteScrollViewEmits>) => {
    const thisValue = ref(props.modelValue)
    const dynamicValue = ref<typeof props.modelValue>([])
    const lock = ref(true)
    const looper = ref(true)
    watch(()=>props.modelValue, (newVal, oldVal)=>{
        thisValue.value = newVal
    })
    watch(()=>thisValue.value, (newVal, oldVal)=>{
        emits("update:modelValue",newVal)
        dataChange()
    })
    watch(()=>props.static, ()=>{
        loadMore()
    })
    const root = ref<HTMLElement>()
    const init = async ()=>{
        while(looper.value) {
            if(isDefined(root.value) && root.value.scrollHeight <= root.value.clientHeight && thisValue.value.length > dynamicValue.value.length) {
                loadMore();
                emits('init-start');
            }
            else
                emits('init-end'); 
            await new Promise(resolve => {
                requestAnimationFrame(()=>{
                    resolve(1)
                })
            });
        }
    }
    const loadMore = ()=>{
        if(props.static) {
            dynamicValue.value = thisValue.value;
            return ;
        }
        if(!lock.value) return;
        lock.value = false;
        let item = dynamicValue.value[dynamicValue.value.length - 1];
        let index = thisValue.value.indexOf(item);
        let addition = thisValue.value.slice(index + 1, index + props.batchSize + 1);
        dynamicValue.value = dynamicValue.value.concat(addition);
        lock.value = true;
        return addition.length > 0;
    }
    const dataChange = ()=>{
        let size = dynamicValue.value.length;
        dynamicValue.value = thisValue.value.slice(0, size)
    }
    const scrollEvent = (event:Event)=>{
        if (isDefined(root.value)){
            if (root.value.scrollHeight - root.value.scrollTop - root.value.clientHeight < props.offset){
                emits("lazyload", loadMore())
            }
        }
    }
    const lazyLoadInit = ()=>{
        root.value?.addEventListener("scroll", scrollEvent)
    }
    const destroy = ()=>{
        root.value?.removeEventListener("scroll", scrollEvent)
    }
    return {
        thisValue,
        dynamicValue,
        looper,
        lock,
        root,
        init,
        loadMore,
        dataChange,
        destroy,
        lazyLoadInit,
    }
}
