<template>
    <div class="slider">
        <span
            class="fv-pivot-s"
            :style="{ 'margin-left': `${domLeft}px`, width: `${domWidth}px` }"
        >
            <p
                class="fv-pivot-s-item"
                :class="[{ 'is-boxshadow': sliderBoxshadow }]"
                :style="{
                    background: background,
                    borderRadius: sliderBorderRadius + 'px'
                }"
            ></p>
        </span>
    </div>
</template>

<script>
import gsap from 'gsap';
import { ClassBuilder, StyleBuilder, useTheme } from '@/utils/common';

export default {
    emits: ['update:modelValue'],
    props: {
        idx: {
            default: 0
        },
        els: {
            default: () => []
        },
        sliderBoxshadow: {
            default: false
        },
        background: {
            default: ''
        },
        sliderBorderRadius: {
            default: '3'
        },
        theme: {
            type: String,
            default: 'global'
        }
    },
    data() {
        return {
            width: 0,
            domLeft: 0,
            domWidth: 60,
            observer: null,
            styles: {
                slider: {
                    background: ''
                }
            }
        };
    },
    watch: {
        idx(val) {
            this.moveInit();
        },
        left(val) {
            this.moveInit();
        },
        width(val) {
            this.moveInit();
        },
        currnetEl() {
            this.watchSizeInit();
        }
    },
    computed: {
        left() {
            let els = this.els;
            let left = 0;
            if (els.length === 0) return 0;
            for (let i = 0; i < this.idx; i++) {
                let elItem = els[i];
                if (!elItem.show) left += 0;
                else {
                    let elWidth = elItem.el.clientWidth;
                    left += elWidth;
                }
            }
            return left;
        },
        currnetEl() {
            if (this.els && this.els[this.idx]) return this.els[this.idx];
            return null;
        },
        $theme() {
            return useTheme(this.$props).theme.value;
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.moveInit();
            this.watchSizeInit();
        });
    },
    methods: {
        moveInit() {
            let disLeft = this.left - this.domLeft;
            if (disLeft > 0) this.widthExpandToRight(disLeft);
            else this.widthExpandToLeft(disLeft);
        },
        watchSizeInit() {
            if (this.observer) {
                this.observer.disconnect();
            }
            if (!this.currnetEl || !this.currnetEl.el) return;
            this.observer = new ResizeObserver((entries) => {
                for (let entry of entries) {
                    this.width = this.currnetEl.el.clientWidth;
                    this.moveInit();
                }
            });
            this.observer.observe(this.currnetEl.el);
        },
        widthExpandToRight(disLeft) {
            let addWidth = Math.abs(disLeft) + this.width;
            gsap.to(this.$data, {
                domWidth: addWidth,
                duration: 0.3,
                delay: 0.08,
                ease: 'expo.inOut',
                onComplete: this.widthFormatToRight
            });
        },
        widthFormatToRight() {
            gsap.to(this.$data, {
                domLeft: this.left,
                domWidth: this.width,
                duration: 0.2,
                ease: 'power3.out'
            });
        },
        widthExpandToLeft(disLeft) {
            let addWidth = Math.abs(disLeft) + this.width;
            gsap.to(this.$data, {
                domLeft: this.left,
                domWidth: addWidth,
                duration: 0.3,
                delay: 0.08,
                ease: 'expo.inOut',
                onComplete: this.widthFormatToLeft
            });
        },
        widthFormatToLeft() {
            gsap.to(this.$data, {
                domWidth: this.width,
                duration: 0.2,
                ease: 'power3.out'
            });
        }
    },
    beforeUnmount() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
};
</script>
