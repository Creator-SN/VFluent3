<script setup lang="ts">
import { useTheme } from '@/utils/common';
import { flipViewEmits, flipViewProps, useFlipView } from '.';
import { onMounted } from 'vue';

defineOptions({
    name:"FvFlipView"
})

const props = defineProps(flipViewProps)
const emits = defineEmits(flipViewEmits)
const {theme} = useTheme(props)
const {hoverTrigger,styles,slidePrev, firstButton,slideNext, secondButton, thisValue,currentIndex, slideIndex, thisAutoPlay, currentAnimation, durationInit, autoPlayInit, stylesInit} = useFlipView(props, emits)

onMounted(()=>{
    durationInit()
    autoPlayInit()
    stylesInit()
})

</script>

<template>
    <div
        class="fv-FlipView"
        :class="[theme]"
        @mouseenter="hoverTrigger = true"
        @mouseleave="hoverTrigger = false"
        @touchstart="hoverTrigger = true"
        @touchend="hoverTrigger = false"
    >
        <transition name="fade-in">
            <div
                v-show="showControlPanel !== 'hidden' && hoverTrigger"
                class="control-panel"
                :style="styles.controlPanel"
            >
                <span
                    class="slidebtn fst"
                    :class="[direction]"
                    @click="slidePrev"
                >
                    <p
                        class="icon"
                        :class="[`ms-Icon ms-Icon--${firstButton}`]"
                    ></p>
                </span>
                <span
                    class="slidebtn sec"
                    :class="[direction]"
                    @click="slideNext"
                >
                    <p
                        class="icon"
                        :class="[`ms-Icon ms-Icon--${secondButton}`]"
                    ></p>
                </span>
                <span
                    class="bottom-controller"
                    :class="[direction]"
                >
                    <div
                        v-for="(item, index) in thisValue"
                        :key="`ring: ${index}`"
                        class="flip-view-ring"
                        :class="[{choosen: currentIndex == index}]"
                        @click="slideIndex(index)"
                    >
                        <i></i>
                    </div>
                    <p
                        class="sec ms-Icon"
                        :class="[thisAutoPlay.toString() == 'true' ? 'ms-Icon--PauseBold' : 'ms-Icon--PlaySolid']"
                        @click="thisAutoPlay = !thisAutoPlay"
                    ></p>
                </span>
            </div>
        </transition>
        <div class="container-panel">
            <transition-group
                :name="currentAnimation"
                tag="div"
                class="container-panel"
            >
                <div
                    v-show="currentIndex === index"
                    v-for="(item, index) in thisValue"
                    :key="`flipview: ${index}`"
                    class="container-item"
                    :style="styles.containerItem"
                >
                    <slot
                        name="item"
                        :data="item"
                        :index="index"
                    >
                        <p style="font-size: 36px;">{{index + 1}}</p>
                    </slot>
                </div>
            </transition-group>
        </div>
    </div>
</template>
        


