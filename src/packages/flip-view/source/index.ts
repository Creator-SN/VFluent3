import { commonProps } from '@/packages/common/props';
import { computed, ExtractPropTypes, PropType, ref, watch } from 'vue';
import { EmitFn } from '@/types/components';

type Direction = 'horizontal' | 'vertial'
type Animation = 'move' | 'moveFade' | 'moveDifferent' | 'glue' | 'push' | 'fold'
type ShowControlPanel = '' | 'hover' | 'hidden'

export const flipViewProps = {
    ...commonProps,
    modelValue: {
        type: Array as PropType<Array<Record<string, any>>>,
        default: () => []
    },
    direction: {
        type: String as PropType<Direction>,
        default: 'horizontal'
    },
    animation: {
        type: String as PropType<Animation>,
        default: 'move'
    },
    duration: {
        type: Number,
        default: 800
    },
    autoPlay: {
        type: Boolean,
        default: true
    },
    autoPlayDuration: {
        type: Number,
        default: 5000
    },
    showControlPanel: {
        type: String as PropType<ShowControlPanel>,
        default: ''
    },
    mask: {
        type: String,
        default: ''
    }
}

export type FlipViewProps = ExtractPropTypes<typeof flipViewProps>;

export const flipViewEmits = {
    "update:modelValue"(val: Array<Record<string, any>>){
        return true;
    },
    "change"(val: {index:number, duration: number}){
        return true;
    }
}

export type FlipViewEmits = typeof flipViewEmits

export const useFlipView = (props: FlipViewProps, emits: EmitFn<FlipViewEmits>) => {
    const thisValue = ref(props.modelValue);
    const currentIndex = ref(0);
    const currentAnimation = ref<Animation | string>()
    const hoverTrigger = ref(false);
    const thisAutoPlay = ref(props.autoPlay)
    const animationMap = {
        move: 'move',
        moveFade: 'move-fade',
        moveDifferent: 'move-different',
        glue: 'rotate-glue',
        push: 'rotate-push',
        fold: 'rotate-fold'
    }
    const styles = ref({
        containerItem: {
            animationDuration: `0.8s`,
            animationTimingFunction: ''
        },
        controlPanel: {
            background: ''
        }
    })
    const timer = ref<{
        autoPlay?: number | NodeJS.Timeout
        dis?: number | NodeJS.Timeout
    }>({
        autoPlay: undefined,
        dis: undefined
    })
    const lock = ref({
        slide: true,
        slideIndex: true
    })
    watch(()=>props.modelValue, (newVal, oldVal)=>{
        thisValue.value = newVal
    })
    watch(()=>thisValue.value, (newVal, oldVal)=>{
        emits("update:modelValue", newVal)
    })
    watch(()=>props.autoPlay, (newVal, oldVal)=>{
        thisAutoPlay.value = newVal;
    })
    watch(()=>thisAutoPlay.value, (newVal, oldVal)=>{
        autoPlayInit()
    })
    watch(()=>props.duration, (newVal, oldVal)=>{
        durationInit()
    })
    watch(()=>props.mask, (newVal, oldVal)=>{
        stylesInit()
    })
    watch(()=>currentIndex.value, (newVal, oldVal)=>{
        emits("change",{
            index: newVal,
            duration: props.autoPlayDuration
        })
    })
    const firstButton = computed(()=>{
        if (props.direction === "horizontal") return 'CaretLeftSolid8';
        return 'CaretUpSolid8';
    })
    const secondButton = computed(()=>{
        if (props.direction === "horizontal") return 'CaretRightSolid8';
        return 'CaretDownSolid8';
    })
    const slideLeftAnimation = computed(()=>{
        return `${animationMap[props.animation]}-right-to-left`;
    })
    const slideRightAnimation = computed(()=>{
        return `${animationMap[props.animation]}-left-to-right`;
    })
    const slideTopAnimation = computed(()=>{
        return `${animationMap[props.animation]}-bottom-to-top`;
    })
    const slideBottomAnimation = computed(()=>{
        return `${animationMap[props.animation]}-top-to-bottom`;
    })
    const autoPlayInit = ()=>{
        clearInterval(timer.value.autoPlay);
        if (thisAutoPlay.value!==true) return 0;
        timer.value.autoPlay = setInterval(() => {
            slideNext();
        },props.autoPlayDuration);
    }
    const durationInit = ()=> {
        styles.value.containerItem.animationDuration = `${(
            parseFloat(`${props.duration}`) / 1000
        ).toFixed(2)}s`;
    }
    const stylesInit = () => {
        styles.value.controlPanel.background = props.mask;
    }
    const slideNext = ()=> {
        clearInterval(timer.value.autoPlay);
        if (!lock.value.slide) return 0;
        lock.value.slide = false;
        if (currentIndex.value < thisValue.value.length - 1)
            currentIndex.value++;
        else currentIndex.value = 0;
        if (props.direction == 'horizontal')
            currentAnimation.value = slideLeftAnimation.value;
        else currentAnimation.value = slideBottomAnimation.value;
        lock.value.slide = true;
        autoPlayInit();
    }
    const slidePrev = () => {
        clearInterval(timer.value.autoPlay);
        if (!lock.value.slide) return 0;
        lock.value.slide = false;
        if (currentIndex.value > 0) currentIndex.value--;
        else currentIndex.value = thisValue.value.length - 1;
        if (props.direction == 'horizontal')
            currentAnimation.value = slideRightAnimation.value;
        else currentAnimation.value = slideTopAnimation.value;
        lock.value.slide = true;
        autoPlayInit();
    }
    const slideDelay = async (direction = true, dis_duration:number) => {
        if (direction) slideNext();
        else slidePrev();
        return await new Promise((resolve) => {
            setTimeout(() => {
                resolve(dis_duration);
            }, dis_duration);
        });
    }
    const slideIndex = async (index:number) => {
        if (!lock.value.slideIndex) return 0;
        lock.value.slideIndex = false;
        clearInterval(timer.value.dis);
        let dis = index - currentIndex.value;
        if (dis == 0) return 0;
        let d = dis > 0;
        dis = Math.abs(dis);
        let t = props.duration.toString();
        let dis_duration = (parseFloat(t) / dis).toFixed(2);
        styles.value.containerItem.animationDuration = `${(parseFloat(
            dis_duration 
        )/ 1000).toFixed(2)}s`;
        styles.value.containerItem.animationTimingFunction = 'linear';
        for (let i = 0; i < dis; i++) {
            if (i == dis - 1)
                styles.value.containerItem.animationTimingFunction = '';
            await slideDelay(d, parseFloat(dis_duration))
        }
        await new Promise((resolve) => {
            setTimeout(() => {
                durationInit();
                resolve(50);
            }, 50);
        });
        lock.value.slideIndex = true;
    }
    return {
        thisValue,
        currentIndex,
        currentAnimation,
        hoverTrigger,
        thisAutoPlay,
        animationMap,
        styles,
        timer,
        lock,
        firstButton,
        secondButton,
        slideLeftAnimation,
        slideRightAnimation,
        slideTopAnimation,
        slideBottomAnimation,
        autoPlayInit,
        durationInit,
        stylesInit,
        slideNext,
        slidePrev,
        slideDelay,
        slideIndex
    }
}
