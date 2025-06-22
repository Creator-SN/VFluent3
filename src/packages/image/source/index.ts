import { commonProps } from '@/packages/common/props';
import { computed, ExtractPropTypes, ref, watch } from 'vue';
import { EmitFn } from '@/types/components';
import { isDefined } from '@/utils/common';

export const imageProps = {
    ...commonProps,
    src: {
        type: String,
        default: ''
    },
    onlazy: {
        type: Boolean,
        default: false
    }
}

export type ImageProps = ExtractPropTypes<typeof imageProps>;

export const imageEmits = {

}

export type ImageEmits = typeof imageEmits

export const useImage = (props: ImageProps, emits: EmitFn<ImageEmits>) => {
    const thisSrc = ref("")
    const status = ref(false)
    const lazy = ref(false)
    const lazyTimer = ref<number | NodeJS.Timeout>()
    watch(()=>props.src, (newVal, oldVal)=>{
        if (newVal!==oldVal){
            status.value = false;
        }
        if (!lazy.value){
            thisSrc.value = props.src
        }
    })
    watch(()=>lazy.value, (newVal, oldVal)=>{
        if (newVal === false) thisSrc.value = props.src;
    })
    watch(()=>props.onlazy, (newVal, oldVal)=>{
        lazy.value = newVal;
    })
    const img = ref<HTMLElement>();
    const watchImgInit = ()=>{
        if (isDefined(img.value)){
            img.value.onload = (event:Event)=>{
                status.value = true;
            }
        }
    }
    const root = ref<HTMLElement>()
    const lazyInit = ()=>{
        clearInterval(lazyTimer.value)
        lazyTimer.value = setInterval(()=>{
            window.requestAnimationFrame(()=>{
                if (isDefined(root.value)){
                    if (root.value.getBoundingClientRect().top < window.innerHeight){
                        lazy.value = false;
                        clearInterval(lazyTimer.value)
                    }
                }
            })
        }, 300)
    }
    return {
        thisSrc,
        status,
        lazy,
        lazyTimer,
        img,
        watchImgInit,
        root,
        lazyInit,
    }
}
