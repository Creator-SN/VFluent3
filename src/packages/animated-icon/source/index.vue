<template>
    <div
        ref="root"
        class="fv-AnimatedIcon"
        :class="[theme]"
        :style="[
            {
                width: `${computedFontSize * 1 + 3}px`,
                background: background,
                fontSize: `${fontSize}px`
            }
        ]"
        @mousedown="down"
        @mouseup="up"
        @touchstart="down"
        @touchend="up"
        @mouseenter="enter"
        @mousemove="move"
        @touchmove="move"
        @mouseleave="leave"
    >
        <div
            draggable="false"
            class="fv-animated-icon-container"
            :class="[{ hideContent }]"
            :style="[animatedStyle]"
        >
            <slot>
                <i ref="a" class="ms-Icon" :class="[`ms-Icon--${icon}`]"></i>
            </slot>
        </div>
        <div v-show="!hideContent" class="fv-animated-content-block">
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useTheme } from '@/utils/common';
import { commonProps } from '@/packages/common/props';
import { computed, ExtractPropTypes, PropType, onMounted, ref } from 'vue';

defineOptions({
    name: 'FvAnimatedIcon'
});

const emits = defineEmits({
    click: (evt: Event) => {
        return true;
    },
    'update:modelValue': (val: string) => {
        return true;
    }
});

type AnimatedIconEmits = typeof emits;

const props = defineProps({
    ...commonProps,
    modelValue: {
        type: String as PropType<string>,
        default: 'scaleDown'
    },
    icon: {
        type: String,
        default: 'Search'
    },
    customizeAnimation: {
        type: [Object, Boolean] as PropType<
            Record<animationsValueKey, string> | Boolean
        >,
        default: false
    },
    background: {
        type: String,
        default: ''
    },
    fontSize: {
        type: [Number, String],
        default: 16
    },
    hideContent: {
        type: Boolean,
        default: false
    }
});

type AnimatedIconProps = typeof props;

const { theme } = useTheme(props);

type animationsValueKey = 'enter' | 'move' | 'down' | 'up' | 'leave';
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
                transform: 'rotate(0deg)'
            }
        ]
    }
};

const thisValue = ref<string>(props.modelValue);
const modelValue = computed<string>({
    get() {
        if (props.modelValue !== null) {
            return props.modelValue;
        }
        return thisValue.value;
    },
    set(val: string) {
        thisValue.value = val;
        emits('update:modelValue', val);
    }
});
const animatedStyle = ref<Record<string, any>>({});
const animationsQueue = ref<Array<any>>([]);
const onClick = (evt: Event) => {
    emits('click', evt);
};
const popAnimation = () => {
    if (animationsQueue.value.length === 0) return 0;
    let first = animationsQueue.value[0];
    animatedStyle.value = first;
    animationsQueue.value.splice(0, 1);
};
const animationInit = (el: HTMLElement) => {
    el.addEventListener('transitionend', (evt: TransitionEvent) => {
        popAnimation();
    });
};

const root = ref<HTMLElement>();
onMounted(() => {
    if (!root.value) return;
    animationInit(root.value);
});

const getAnimation = (name: animationsValueKey) => {
    if (
        props.customizeAnimation &&
        typeof props.customizeAnimation !== 'boolean'
    ) {
        if (
            !(props.customizeAnimation as Record<animationsValueKey, string>)[
                name
            ]
        )
            return false;
        return (props.customizeAnimation as Record<animationsValueKey, string>)[
            name
        ];
    }
    if (!animations[modelValue.value]) return false;
    let animation = animations[modelValue.value];
    if (!animation[name]) return false;
    return animation[name];
};
const enter = () => {
    let animation = getAnimation('enter');
    if (!animation) return false;
    animationsQueue.value = [];
    animationsQueue.value = animationsQueue.value.concat(animation);
    popAnimation();
};
const move = () => {
    const animation = getAnimation('move');
    if (!animation) return false;
    animationsQueue.value = [];
    animationsQueue.value = animationsQueue.value.concat(animation);
    popAnimation();
};
const down = (evt: Event) => {
    evt.preventDefault();
    const animation = getAnimation('down');
    if (!animation) return false;
    animationsQueue.value = [];
    animationsQueue.value = animationsQueue.value.concat(animation);
    popAnimation();
};
const up = (evt: Event) => {
    evt.preventDefault();
    onClick(evt);
    let animation = getAnimation('up');
    if (!animation) return false;
    animationsQueue.value = [];
    animationsQueue.value = animationsQueue.value.concat(animation);
    popAnimation();
};
const leave = (evt: Event) => {
    const animation = getAnimation('leave');
    if (!animation) return false;
    animationsQueue.value = [];
    animationsQueue.value = animationsQueue.value.concat(animation);
    popAnimation();
};
const computedFontSize = computed<number>(() => {
    if (typeof props.fontSize === 'string') {
        return parseInt(props.fontSize);
    }
    return props.fontSize;
});
</script>
