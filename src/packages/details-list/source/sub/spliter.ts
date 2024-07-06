import { commonProps } from "@/packages/common/props";
import { sliderProps } from "@/packages/slider/source";
import { EmitFn } from "@/types/components";
import { isDefined } from "@/utils/common";
import { ExtractPropTypes, ref } from "vue";

export const spliterProps = {
    ...commonProps,
}

export type SpliterProps = ExtractPropTypes<typeof sliderProps>

export const spliterEmits = {
    "mousedown":(event:MouseEvent)=>{
        return true;
    },
    "mouseup":(event: MouseEvent)=>{
        return true;
    },
    "mousemove":(event: MouseEvent)=>{
        return true;
    },
    "touchstart":(event: TouchEvent)=>{
        return true;
    },
    "touchend":(event:TouchEvent)=>{
        return true;
    },
    "touchmove":(event: TouchEvent)=>{
        return true;
    }
}

export type SpliterEmits = typeof spliterEmits

export const useSpliter = (props: SpliterProps, emits: EmitFn<SpliterEmits>)=>{
    const moveable = ref(false);
    const forward = (event: MouseEvent | TouchEvent)=>{
        event.preventDefault()
        moveable.value = true;
        if (event.type==='mousedown'){
            emits("mousedown",event as MouseEvent)
        }else{
            emits("touchstart", event as TouchEvent)
        }
    }
    const stop = (event?: MouseEvent | TouchEvent)=>{
        moveable.value = false;
        if (!isDefined(event)) return;
        if (event.type === 'mouseup'){
            emits("mouseup", event as MouseEvent)
        }else{
            emits("touchend", event as TouchEvent)
        }

    }
    const events = {
        window: {
            mousemove: (event: Event)=>{
                if (moveable.value){
                    emits("mousemove", event as MouseEvent)
                }
            },
            mouseup: (event: Event)=>{
                if (moveable.value){
                    stop()
                }
            },
            touchmove: (event: Event)=>{
                if (moveable.value){
                    emits("touchmove", event as TouchEvent)
                }
            },
            touchend: (event: Event)=>{
                if (moveable.value){
                    stop()
                }
            }
        }
    }
    const init = ()=>{
        for (let event in events.window){
            let key = event as keyof typeof events.window
            window.addEventListener(key, events.window[key])
        }
    }
    const destroy = ()=>{
        for (let event in events.window){
            let key = event as keyof typeof events.window
            window.removeEventListener(key, events.window[key])
        }
    }
    return {
        init,
        destroy,
        moveable,
        forward,
        stop
    }
}