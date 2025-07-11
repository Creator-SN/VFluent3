<template>
    <Slot ref="slotRef"></Slot>
    <Teleport to="body">
        <transition name="fv-callout-fade">
            <div ref="popper" :style="[callout as StyleValue, props.popperStyle]"
                :class="[`fv-Callout`, theme, props.popperClass, calloutClass]" name="fv-callout" v-show="popperShow">
                <div class="fv-callout-bg"></div>
                <div class="beak" :style="(beak as StyleValue)"></div>
                <div class="header">
                    <slot name="header"></slot>
                </div>
                <div class="main">
                    <slot name="main"></slot>
                </div>
                <div class="footer">
                    <slot name="footer"></slot>
                </div>
            </div>
        </transition>
    </Teleport>
</template>

<script lang="ts" setup>
import {
    ComponentInternalInstance,
    computed,
    onMounted,
    getCurrentInstance,
    onBeforeUnmount,
    ref,
    StyleValue,
    useSlots
} from 'vue';
import { commonProps } from '@/packages/common/props';
import { getBoundingClientRect } from '@/utils/common/dom';
import { useTheme, createRefSlot } from '@/utils/common';

defineOptions({
    name: 'FvCallout'
});

type Position =
    | 'bottomLeft'
    | 'bottomCenter'
    | 'bottomRight'
    | 'topLeft'
    | 'topCenter'
    | 'topRight'
    | 'leftTop'
    | 'leftCenter'
    | 'leftBottom'
    | 'rightTop'
    | 'rightCenter'
    | 'rightBottom';

const props = defineProps({
    ...commonProps,
    space: {
        type: Number,
        default: 0
    },
    beak: {
        type: Number,
        default: 0
    },
    position: {
        type: String as () => Position,
        default: 'bottomCenter'
    },
    lockScroll: {
        type: Boolean,
        default: true
    },
    focusTrap: {
        type: Boolean,
        default: false
    },
    delayClose: {
        type: Number,
        default: 0
    },
    effect: {
        type: String as () => 'hover' | 'click' | 'always',
        default: 'click'
    },
    popperStyle: {
        type: Object as () => Record<string, string>,
        default: () => ({})
    },
    popperClass: {
        type: Array as () => Array<string | Record<string, string>>,
        default: () => []
    },
    keepalive: {
        type: Boolean,
        default: false
    }
});

const { theme } = useTheme(props);

const emits = defineEmits([]);

const visible = defineModel<boolean | undefined>();

const slots = useSlots();
const slotRef = ref(null);
const Slot = createRefSlot(slots);

const callout = ref<Partial<CSSStyleDeclaration>>({});
const calloutClass = ref<Array<string>>([]);
const beak = ref<Partial<CSSStyleDeclaration>>({});
const popper = ref<HTMLElement>();
const cacheVisible = ref<boolean>(false);
const positionName: Array<Position> = [
    'topLeft',
    'topCenter',
    'topRight',
    'bottomLeft',
    'bottomCenter',
    'bottomRight',
    'leftTop',
    'leftCenter',
    'leftBottom',
    'rightTop',
    'rightCenter',
    'rightBottom'
];
const targetElement = ref<HTMLElement>();

const popperShow = computed({
    get() {
        if (props.disabled === true) return false;
        if (visible.value !== undefined) {
            return visible.value;
        }
        return cacheVisible.value;
    },
    set(val: boolean) {
        if (val === true) {
            // adjust location
            if (props.position !== undefined)
                adjustPopperPosition(props.position);
        }
        if (!props.disabled) {
            visible.value = val;
        }
        cacheVisible.value = val;
    }
});

const adjustPopperPosition = (position: Position) => {
    if (targetElement.value === undefined || popper.value === undefined) return;
    const rect = getBoundingClientRect(popper.value);
    const { width, height } = rect;
    let startIndex = positionName.indexOf(position);
    let positionPriority: [number, Position][] = [];
    for (let index = 0; index < positionName.length; ++index) {
        let endIndex = (startIndex + index) % positionName.length;
        let cur_position = positionName[endIndex];
        const offset =
            props.beak === undefined
                ? props.space === undefined
                    ? 0
                    : props.space
                : props.space === undefined
                    ? props.beak
                    : props.beak + props.space;
        let predictRect = locate(
            targetElement.value,
            offset,
            cur_position,
            height,
            width
        );
        // calculate the position priority
        let priority = isOutBody(predictRect);
        if (cur_position == position) {
            priority |= 1;
        }
        positionPriority.push([priority, cur_position]);
    }
    // sort by largest to smallest
    positionPriority = positionPriority.sort(
        (a: (number | Position)[], b: (number | Position)[]) => {
            return (b[0] as number) - (a[0] as number);
        }
    );
    // set first priority position
    setPopperPosition(positionPriority[0][1] as Position);
};

const isOutBody = (rect: {
    top: number;
    left: number;
    height: number;
    width: number;
}) => {
    // use binary flag to set priority
    // left > top > right > bottom
    let priority = 0;
    // left
    if (rect.left >= 0) {
        priority |= 16;
    }
    // top
    if (rect.top >= 0) {
        priority |= 8;
    }
    // right
    if (rect.width + rect.left <= window.innerWidth) {
        priority |= 4;
    }
    // bottom
    if (rect.height + rect.top <= window.innerHeight) {
        priority |= 2;
    }
    return priority;
};

const locate = (
    targetElement: HTMLElement,
    offset: number,
    position: Position,
    height: number,
    width: number
) => {
    const rect = getBoundingClientRect(targetElement);
    const el = { top: 0, left: 0, height, width };
    switch (position) {
        case 'bottomLeft':
            el.left = rect.left;
            el.top = rect.bottom + offset;
            break;
        case 'bottomCenter':
            el.left = rect.left + (rect.width - el.width) / 2.0;
            el.top = rect.bottom + offset;
            break;
        case 'bottomRight':
            el.left = rect.right - el.width;
            el.top = rect.bottom + offset;
            break;
        case 'topLeft':
            el.left = rect.left;
            el.top = rect.top - offset - el.height;
            break;
        case 'topCenter':
            el.left = rect.left + (rect.width - el.width) / 2.0;
            el.top = rect.top - offset - el.height;
            break;
        case 'topRight':
            el.left = rect.right - el.width;
            el.top = rect.top - offset - el.height;
            break;
        case 'leftTop':
            el.left = rect.left - offset - el.width;
            el.top = rect.top;
            break;
        case 'leftCenter':
            el.left = rect.left - offset - el.width;
            el.top = rect.top + (rect.height - el.height) / 2.0;
            break;
        case 'leftBottom':
            el.left = rect.left - offset - el.width;
            el.top = rect.bottom - el.height;
            break;
        case 'rightTop':
            el.left = rect.right + offset;
            el.top = rect.top;
            break;
        case 'rightCenter':
            el.left = rect.right + offset;
            el.top = rect.top + (rect.height - el.height) / 2.0;
            break;
        case 'rightBottom':
            el.left = rect.right + offset;
            el.top = rect.bottom - el.height;
            break;
    }
    return el;
};

const setPopperPosition = (position: Position) => {
    const target = getBoundingClientRect(targetElement.value);
    beak.value = {};
    if (props.beak === undefined || props.beak < 10) {
        beak.value.display = 'none';
    } else {
        beak.value.display = 'block';
        beak.value.width = `${props.beak}px`;
        beak.value.height = `${props.beak}px`;
    }
    const space =
        props.beak === undefined
            ? props.space === undefined
                ? 0
                : props.space
            : props.space === undefined
                ? props.beak
                : props.beak + props.space;
    //clear
    delete callout.value['right'];
    delete callout.value['left'];
    delete callout.value['top'];
    delete callout.value['bottom'];

    calloutClass.value = [position];

    switch (position) {
        case 'bottomLeft':
            callout.value.top = `${target.top + target.height + space}px`;
            callout.value.left = `${target.left}px`;
            beak.value.top = '0';
            beak.value.left = '0';
            beak.value.transform = `translate(50%, -50%) rotate(45deg)`;
            break;
        case 'bottomRight':
            callout.value.top = `${target.top + target.height + space}px`;
            callout.value.left = `${target.right}px`;
            beak.value.top = '0';
            beak.value.left = '100%';
            beak.value.transform = `translate(-140%, -50%) rotate(45deg)`;
            break;
        case 'bottomCenter':
            callout.value.top = `${target.top + target.height + space}px`;
            callout.value.left = `${target.left + target.width / 2}px`;
            beak.value.top = '0';
            beak.value.transform = `translate(-50%, -50%) rotate(45deg)`;
            break;
        case 'topLeft':
            callout.value.top = `${target.top - space}px`;
            callout.value.left = `${target.left}px`;
            beak.value.bottom = '0';
            beak.value.left = '0';
            beak.value.transform = `translate(50%, 50%) rotate(45deg)`;
            break;
        case 'topRight':
            callout.value.top = `${target.top - space}px`;
            callout.value.left = `${target.right}px`;
            beak.value.bottom = '0';
            beak.value.left = '100%';
            beak.value.transform = `translate(-140%, 50%) rotate(45deg)`;
            break;
        case 'topCenter':
            callout.value.top = `${target.top - space}px`;
            callout.value.left = `${target.left + target.width / 2}px`;
            beak.value.bottom = '0';
            beak.value.transform = `translate(-50%, 50%) rotate(45deg)`;
            break;
        case 'leftTop':
            callout.value.left = `${target.left - space}px`;
            callout.value.top = `${target.top}px`;
            beak.value.left = '100%';
            beak.value.top = '0';
            beak.value.transform = `translate(-50%, 50%) rotate(45deg)`;
            break;
        case 'leftBottom':
            callout.value.left = `${target.left - space}px`;
            callout.value.top = `${target.bottom}px`;
            beak.value.left = '100%';
            beak.value.bottom = '0';
            beak.value.transform = `translate(-50%, -80%) rotate(45deg)`;
            break;
        case 'leftCenter':
            callout.value.left = `${target.left - space}px`;
            callout.value.top = `${target.top + target.height / 2}px`;
            beak.value.left = '100%';
            beak.value.top = '50%';
            beak.value.transform = `translate(-50%, -50%) rotate(45deg)`;
            break;
        case 'rightTop':
            callout.value.left = `${target.right + space}px`;
            callout.value.top = `${target.top}px`;
            beak.value.left = '0';
            beak.value.top = '0';
            beak.value.transform = `translate(-50%, 50%) rotate(45deg)`;
            break;
        case 'rightBottom':
            callout.value.left = `${target.right + space}px`;
            callout.value.top = `${target.bottom}px`;
            beak.value.left = '0';
            beak.value.bottom = '0';
            beak.value.transform = `translate(-50%, -80%) rotate(45deg)`;
            break;
        case 'rightCenter':
            callout.value.left = `${target.right + space}px`;
            callout.value.top = `${target.top + target.height / 2}px`;
            beak.value.left = '0';
            beak.value.top = '50%';
            beak.value.transform = `translate(-50%, -50%) rotate(45deg)`;
            break;
    }
};

const windowEvents: Record<string, EventListenerOrEventListenerObject> = {
    resize: () => {
        adjustPopperPosition(
            props.position === undefined ? 'bottomCenter' : props.position
        );
    },
    scroll: () => {
        if (!props.lockScroll) {
            popperShow.value = false;
        } else {
            adjustPopperPosition(
                props.position === undefined ? 'bottomCenter' : props.position
            );
        }
    },
    click: (evt: Event) => {
        if (!popperShow.value) {
            return;
        }
        const isOutSide = (el: HTMLElement) => {
            let parent: HTMLElement | null = el;
            while (parent !== null) {
                if (parent === targetElement.value || parent === popper.value) {
                    return false;
                }
                parent = parent.parentElement;
            }
            return true;
        };
        if (!props.focusTrap && isOutSide(evt.target as HTMLElement)) {
            popperShow.value = false;
        }
    }
};

const targetEvents: Record<string, EventListenerOrEventListenerObject> = {};
const popperEvents: Record<string, EventListenerOrEventListenerObject> = {};
const timeout = ref<Record<string, NodeJS.Timeout | undefined>>({
    hoverClose: undefined
});
const lock = ref<Record<string, boolean>>({
    popper: false
});
const initTargetEvents = (currentInstance: ComponentInternalInstance) => {
    if (props.disabled) return;
    if (props.effect === 'click') {
        targetEvents.click = () => {
            popperShow.value = !popperShow.value;
        };
    } else if (props.effect === 'hover') {
        targetEvents.mouseenter = () => {
            lock.value.popper = true;
            clearInterval(timeout.value.hoverClose);
            popperShow.value = true;
        };
        targetEvents.mouseleave = () => {
            if (!lock.value.popper) return;
            lock.value.popper = false;
            timeout.value.hoverClose = setInterval(() => {
                popperShow.value = false;
                lock.value.popper = true;
                clearInterval(timeout.value.hoverClose);
            }, 300);
        };
        // for menuflyout
        popperEvents.mouseenter = () => {
            let el = currentInstance.parent;
            while (el) {
                if (el.type.name === 'FvCallout') {
                    if (el.exposed !== null && !el.exposed.popperShow.value) {
                        el.exposed.popperShow.value = true;
                    } else {
                        break;
                    }
                } else {
                    el = el.parent;
                }
            }
            lock.value.popper = true;
            popperShow.value = true;
            clearInterval(timeout.value.hoverClose);
        };
        popperEvents.mouseleave = () => {
            let el = currentInstance.parent;
            while (el) {
                if (
                    el.type.name === 'FvCallout' &&
                    el.props.effect === 'hover'
                ) {
                    if (el.exposed !== null && el.exposed.popperShow.value) {
                        el.exposed.popperShow.value = false;
                        el.exposed.popperEvents.mouseleave();
                    } else {
                        break;
                    }
                } else {
                    el = el.parent;
                }
            }
            popperShow.value = false;
        };
    }
};

onMounted(() => {
    const instance = getCurrentInstance();
    if (instance !== null) {
        if (slotRef.value !== null) {
            targetElement.value = (slotRef.value as any).$el;
            // fix target Element, Vue3 slot logic change
            if (targetElement.value?.nodeName == "#text") {
                targetElement.value = targetElement.value.nextElementSibling as HTMLElement
            }
        }
        // targetElement.value = slotVnode.value?.root
        initTargetEvents(instance);
        for (const evt in windowEvents) {
            window.addEventListener(evt, windowEvents[evt]);
        }
        if (targetElement.value !== undefined) {
            for (const evt in targetEvents) {
                targetElement.value.addEventListener(evt, targetEvents[evt]);
            }
        }
        if (popper.value !== undefined) {
            for (const evt in popperEvents) {
                popper.value.addEventListener(evt, popperEvents[evt]);
            }
        }
    }
});

onBeforeUnmount(() => {
    for (const evt in windowEvents) {
        window.removeEventListener(evt, windowEvents[evt]);
    }
    if (targetElement.value !== undefined) {
        for (const evt in targetEvents) {
            targetElement.value.removeEventListener(evt, targetEvents[evt]);
        }
    }
    if (popper.value !== undefined) {
        for (const evt in popperEvents) {
            popper.value.removeEventListener(evt, popperEvents[evt]);
        }
    }
});

defineExpose({ popperShow, popperEvents });
</script>
