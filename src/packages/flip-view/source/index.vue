<template>
    <div
        class="fv-FlipView"
        :class="[$theme]"
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
                        :class="[`ms-Icon ms-Icon--${firstBtn}`]"
                    ></p>
                </span>
                <span
                    class="slidebtn sec"
                    :class="[direction]"
                    @click="slideNext"
                >
                    <p
                        class="icon"
                        :class="[`ms-Icon ms-Icon--${secondBtn}`]"
                    ></p>
                </span>
                <span class="bottom-controller" :class="[direction]">
                    <div
                        v-for="(item, index) in thisValue"
                        :key="`ring: ${index}`"
                        class="flip-view-ring"
                        :class="[{ choosen: currentIndex == index }]"
                        @click="slideIndex(index)"
                    >
                        <i></i>
                    </div>
                    <p
                        class="sec ms-Icon"
                        :class="[
                            thisAutoPlay.toString() == 'true'
                                ? 'ms-Icon--PauseBold'
                                : 'ms-Icon--PlaySolid'
                        ]"
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
                    <slot name="item" :data="item" :index="index">
                        <p style="font-size: 36px">{{ index + 1 }}</p>
                    </slot>
                </div>
            </transition-group>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { commonProps } from '@/packages/common/props';

const emits = defineEmits(['update:modelValue', 'change']);

const props = defineProps({
    ...commonProps,
    modelValue: {
        default: () => []
    },
    direction: {
        default: 'horizontal'
    },
    animation: {
        default: 'move'
    },
    duration: {
        default: 800
    },
    autoPlay: {
        default: true
    },
    autoPlayDuration: {
        default: 5000
    },
    showControlPanel: {
        default: ''
    },
    mask: {
        default: ''
    }
});
</script>

<script>
import { useTheme } from '@/utils/common';

export default {
    name: 'FvFlipView',

    data() {
        return {
            thisValue: this.modelValue,
            currentIndex: 0,
            currentAnimation: '',
            hoverTrigger: false,
            thisAutoPlay: this.autoPlay,
            animationMap: {
                move: 'move',
                moveFade: 'move-fade',
                moveDifferent: 'move-different',
                glue: 'rotate-glue',
                push: 'rotate-push',
                fold: 'rotate-fold'
            },
            styles: {
                containerItem: {
                    animationDuration: `0.8s`,
                    animationTimingFunction: ''
                },
                controlPanel: {
                    background: ''
                }
            },
            timer: {
                autoPlay: {},
                dis: {}
            },
            lock: {
                slide: true,
                slideIndex: true
            }
        };
    },
    watch: {
        modelValue(val) {
            this.thisValue = val;
        },
        thisValue(val) {
            this.$emit('update:modelValue', val);
        },
        autoPlay(val) {
            this.thisAutoPlay = val;
        },
        thisAutoPlay() {
            this.autoPlayInit();
        },
        duration() {
            this.durationInit();
        },
        mask() {
            this.stylesInit();
        },
        currentIndex(val) {
            this.$emit('change', {
                index: val,
                duration: this.autoPlayDuration
            });
        }
    },
    computed: {
        $theme() {
            return useTheme(this.$props).theme.value;
        },
        firstBtn() {
            if (this.direction == 'horizontal') return 'CaretLeftSolid8';
            return 'CaretUpSolid8';
        },
        secondBtn() {
            if (this.direction == 'horizontal') return 'CaretRightSolid8';
            return 'CaretDownSolid8';
        },
        slideLeftAnimation() {
            return `${this.animationMap[this.animation]}-right-to-left`;
        },
        slideRightAnimation() {
            return `${this.animationMap[this.animation]}-left-to-right`;
        },
        slideTopAnimation() {
            return `${this.animationMap[this.animation]}-bottom-to-top`;
        },
        slideBottomAnimation() {
            return `${this.animationMap[this.animation]}-top-to-bottom`;
        }
    },
    mounted() {
        this.durationInit();
        this.autoPlayInit();
        this.stylesInit();
    },
    methods: {
        autoPlayInit() {
            clearInterval(this.timer.autoPlay);
            if (this.thisAutoPlay.toString() != 'true') return 0;
            this.timer.autoPlay = setInterval(() => {
                this.slideNext();
            }, this.autoPlayDuration);
        },
        durationInit() {
            this.styles.containerItem.animationDuration = `${(
                parseFloat(this.duration.toString()) / 1000
            ).toFixed(2)}s`;
        },
        stylesInit() {
            this.styles.controlPanel.background = this.mask;
        },
        slideNext() {
            clearInterval(this.timer.autoPlay);
            if (!this.lock.slide) return 0;
            this.lock.slide = false;
            if (this.currentIndex < this.thisValue.length - 1)
                this.currentIndex++;
            else this.currentIndex = 0;
            if (this.direction == 'horizontal')
                this.currentAnimation = this.slideLeftAnimation;
            else this.currentAnimation = this.slideBottomAnimation;
            this.lock.slide = true;
            this.autoPlayInit();
        },
        slidePrev() {
            clearInterval(this.timer.autoPlay);
            if (!this.lock.slide) return 0;
            this.lock.slide = false;
            if (this.currentIndex > 0) this.currentIndex--;
            else this.currentIndex = this.thisValue.length - 1;
            if (this.direction == 'horizontal')
                this.currentAnimation = this.slideRightAnimation;
            else this.currentAnimation = this.slideTopAnimation;
            this.lock.slide = true;
            this.autoPlayInit();
        },
        async slideDelay(direction = true, dis_duration) {
            if (direction) this.slideNext();
            else this.slidePrev();
            return await new Promise((resolve) => {
                setTimeout(() => {
                    resolve(dis_duration);
                }, dis_duration);
            });
        },
        async slideIndex(index) {
            if (!this.lock.slideIndex) return 0;
            this.lock.slideIndex = false;
            clearInterval(this.timer.dis);
            let dis = index - this.currentIndex;
            if (dis == 0) return 0;
            let d = dis > 0;
            dis = Math.abs(dis);
            let t = this.duration.toString();
            let dis_duration = (parseFloat(t) / dis).toFixed(2);
            this.styles.containerItem.animationDuration = `${(
                dis_duration / 1000
            ).toFixed(2)}s`;
            this.styles.containerItem.animationTimingFunction = 'linear';
            for (let i = 0; i < dis; i++) {
                if (i == dis - 1)
                    this.styles.containerItem.animationTimingFunction = '';
                await this.slideDelay(d, dis_duration);
            }
            await new Promise((resolve) => {
                setTimeout(() => {
                    this.durationInit();
                    resolve(50);
                }, 50);
            });
            this.lock.slideIndex = true;
        }
    }
};
</script>
