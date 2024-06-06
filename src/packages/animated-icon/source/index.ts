import { commonProps } from '@/packages/common/props';
import { computed, ExtractPropTypes, PropType, ref } from 'vue';
import { EmitFn } from '@/types/components';

const animations = {
    scaleDown: {
        down: {
            transform: 'scale(0.8)',
            transition: `transform 0.2s`
        },
        up: [
            {
                transform: 'scale(1.1)',
                transition: `transform 0.2s`
            },
            {
                transform: 'scale(1)',
                transition: `transform 0.05s ease-out`
            }
        ],
        leave: [
            {
                transform: 'scale(1)',
                transition: `transform 0.05s ease-out`
            }
        ]
    },
    scaleXDown: {
        down: {
            transform: 'scaleX(0.6)',
            transition: `transform 0.2s`
        },
        up: [
            {
                transform: 'scaleX(1.1)',
                transition: `transform 0.2s`
            },
            {
                transform: 'scaleX(1)',
                transition: `transform 0.05s ease-out`
            }
        ],
        leave: [
            {
                transform: 'scaleX(1)',
                transition: `transform 0.05s ease-out`
            }
        ]
    },
    scaleYDown: {
        down: {
            transform: 'scaleY(0.6)',
            transition: `transform 0.2s`
        },
        up: [
            {
                transform: 'scaleY(1.1)',
                transition: `transform 0.2s`
            },
            {
                transform: 'scaleY(1)',
                transition: `transform 0.05s ease-out`
            }
        ],
        leave: [
            {
                transform: 'scaleY(1)',
                transition: `transform 0.05s ease-out`
            }
        ]
    },
    backScale: {
        down: {
            transform: 'scale(0.8)',
            'transform-origin': '100% 50%',
            transition: `transform 0.2s`
        },
        up: [
            {
                transform: 'scale(1.1)',
                'transform-origin': '100% 50%',
                transition: `transform 0.2s`
            },
            {
                transform: 'scale(1)',
                'transform-origin': '100% 50%',
                transition: `transform 0.05s ease-out`
            }
        ],
        leave: [
            {
                transform: 'scale(1)',
                'transform-origin': '100% 50%',
                transition: `transform 0.05s ease-out`
            }
        ]
    },
    bounceRotate: {
        down: {
            transform: 'rotate(-15deg)',
            transition: `transform 0.1s`
        },
        up: [
            {
                transform: 'rotate(360deg)',
                transition: `transform 0.3s`
            },
            {
                transform: 'rotate(0deg)'
            }
        ],
        leave: [
            {
                transform: 'rotate(360deg)',
                transition: `transform 0.3s`
            },
            {
                transform: 'rotate(0deg)'
            }
        ]
    }
}

type animationsKey = keyof typeof animations
type animationsValueKey = keyof typeof animations[keyof typeof animations]

export const animatedIconProps = {
    ...commonProps,
    modelValue: {
        type: String as PropType<animationsKey>,
        default: 'scaleDown'
    },
    icon: {
        type: String,
        default: 'Search'
    },
    customizeAnimation: {
        type:  Object as PropType<Record<string,string> | Boolean>,
        default: false
    },
    background: {
        type: String,
        default: ''
    },
    fontSize: {
        type: Number,
        default: 16
    },
    hideContent: {
        type: Boolean,
        default: false
    }
}

export type AnimatedIconProps = ExtractPropTypes<typeof animatedIconProps>;

export const animatedIconEmits = {
    'click':(evt:Event)=>{
        return true;
    },
    'update:modelValue':(val:string)=>{
        return true
    }
}

export type AnimatedIconEmits = typeof animatedIconEmits

export const useAnimatedIcon = (props: AnimatedIconProps, emits: EmitFn<AnimatedIconEmits>) => {
    const thisValue = ref<animationsKey>(props.modelValue);
    const modelValue = computed<animationsKey>({
        get(){
            if (props.modelValue!==null){
                return props.modelValue;
            }
            return thisValue.value;
        },
        set(val:animationsKey){
            thisValue.value = val;
            emits("update:modelValue",val);
        }
    })
    // const animations = ref()
    const animatedStyle = ref<Record<string,any>>({})
    const animationsQueue = ref<Array<any>>([])
    const onClick = (evt:Event)=>{
        emits("click", evt);
    }
    const popAnimation = ()=>{
        if (animationsQueue.value.length === 0) return 0
        let first = animationsQueue.value[0]
        animatedStyle.value = first
        animationsQueue.value.splice(0,1)
    }
    const animationInit = (el:HTMLElement)=>{
        el.addEventListener("transitionend", (evt:TransitionEvent)=>{
            popAnimation()
        })
    }
    const getAnimation= (name: animationsValueKey) =>{
        if (props.customizeAnimation && typeof props.customizeAnimation!=='boolean') {
            if (!props.customizeAnimation[name]) return false;
            return props.customizeAnimation[name];
        }
        if (!animations[modelValue.value]) return false;
        let animation = animations[modelValue.value];
        if (!animation[name]) return false;
        return animation[name];
    }
    const enter = ()=>{
        return false;
        // let animation = getAnimation('enter');
        // if (!animation) return false;
        // animationsQueue.value = [];
        // animationsQueue.value = animationsQueue.value.concat(animation);
        // popAnimation();
    }
    const move = ()=>{
        return false;
        // const animation = getAnimation("move")
        // if (!animation) return false;
        // animationsQueue.value = [];
        // animationsQueue.value = animationsQueue.value.concat(animation);
        // popAnimation();
    }
    const down = (evt:Event)=>{
        evt.preventDefault();
        const animation = getAnimation('down');
        if (!animation) return false;
        animationsQueue.value = [];
        animationsQueue.value = animationsQueue.value.concat(animation);
        popAnimation();
    }
    const up = (evt:Event)=>{
        evt.preventDefault()
        onClick(evt);
    }
    const leave = (evt: Event)=>{
        const animation = getAnimation("leave")
        if (!animation) return false;
        animationsQueue.value = [];
        animationsQueue.value = animationsQueue.value.concat(animation);
        popAnimation();
    }
    return {
        onClick,
        animationInit,
        animations,
        animatedStyle,
        modelValue,
        enter,
        move,
        down,
        up,
        leave,
        getAnimation,
        popAnimation
    }
}
