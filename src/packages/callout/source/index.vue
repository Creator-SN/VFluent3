<script lang="ts" setup>
import { CalloutProps, useCallout, CalloutEmits } from '.';
import { ClassBuilder, StyleBuilder, useTheme, createRefSlot } from '@/utils/common';
import { StyleValue, computed, onMounted, ref, useSlots, getCurrentInstance, onBeforeUnmount } from 'vue';

defineOptions({
    name:"FvCallout"
})

const props = withDefaults(defineProps<CalloutProps>(),{
    theme: 'global',
    disabled: false,
    space: 0,
    beak: 10,
    position: 'bottomCenter',
    lockScroll: false,
    focusTrap: false,
    delayClose: 0,
    effect: 'click',
    popperStyle: ()=>({}),
    popperClass: ()=>[],
    keepalive: false
})

const { theme } = useTheme(props)

const emits = defineEmits()

const visible = defineModel<boolean|undefined>()

const slots = useSlots()
const slotRef = ref(null)
const Slot = createRefSlot(slots)

const {popperShow, beak, callout, calloutClass, initTargetEvents, windowEvents, targetEvents, targetElement,popperEvents,popper } = useCallout(props, emits, visible)

onMounted(()=>{
    const instance = getCurrentInstance()
    if (instance!==null){
        if (slotRef.value!==null)
            targetElement.value = (slotRef.value as any).$el
        // targetElement.value = slotVnode.value?.root
        initTargetEvents(instance)
        for (const evt in windowEvents) {
            window.addEventListener(evt, windowEvents[evt])
        }
        if (targetElement.value!==undefined){
            for (const evt in targetEvents){
                targetElement.value.addEventListener(evt, targetEvents[evt])
            }
        }
        if (popper.value!==undefined){
            for (const evt in popperEvents){
                popper.value.addEventListener(evt, popperEvents[evt])
            }
        }
    }
})

onBeforeUnmount(()=>{
    for (const evt in windowEvents) {
        window.removeEventListener(evt, windowEvents[evt])
    }
    if (targetElement.value!==undefined){
        for (const evt in targetEvents){
            targetElement.value.removeEventListener(evt, targetEvents[evt])
        }
    }
    if (popper.value!==undefined){
        for (const evt in popperEvents){
            popper.value.removeEventListener(evt, popperEvents[evt])
        }
    }
})

defineExpose({popperShow, popperEvents})

</script>

<template>
    <Slot ref="slotRef"></Slot>
    <Teleport to="body">
        <transition name="fv-callout-fade">
            <div ref="popper" :style="[callout as StyleValue, props.popperStyle]" :class="[`fv-Callout`, theme, props.popperClass, calloutClass]" name="fv-callout" v-show="popperShow">
                <div class="fv-callout-bg" />
                <div class="beak" :style="(beak as StyleValue)" />
                <div class="header">
                    <slot name="header" />
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

