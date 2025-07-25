<template>
    <div class="picker-container" ref="main">
        <button
            v-for="(item, index) in years"
            :key="`year: ${index}`"
            class="picker-btn"
            :class="{
                range: item >= currentRange && item - currentRange < 10,
                current: item == nowYear
            }"
            :style="{
                background: computedBackground(item)
            }"
            @click="choose(item)"
        >
            {{ item }}
        </button>
    </div>
</template>

<script>
import gsap from 'gsap';
import { useTheme } from '@/utils/common';
import { useRevealCache } from '@/store/reveal';

export default {
    props: {
        value: {
            default: () => new Date()
        },
        start: {
            default: 1900
        },
        end: {
            default: 3000
        },
        size: {
            default: 72.5
        },
        background: {
            default: ''
        },
        theme: {
            default: 'global'
        }
    },
    setup () {
        const uR = useRevealCache();
        uR.initRevealInstances();

        return {
            uR
        };
    },
    data() {
        return {
            thisValue: this.$SDate.Parse(this.$SDate.DateToString(this.value)),
            years: [],
            currentRange: 0,
            FR: null,
            timer: {
                updateRange: {},
                scroller: {}
            },
            lock: {
                slide: true
            }
        };
    },
    watch: {
        currentRange(val) {
            this.$emit('range-change', val);
        }
    },
    computed: {
        $theme() {
            return useTheme(this.$props).theme.value;
        },
        year() {
            return this.thisValue.getFullYear();
        },
        month() {
            return this.thisValue.getMonth();
        },
        date() {
            return this.thisValue.getDate();
        },
        nowYear() {
            return new Date().getFullYear();
        },
        nowMonth() {
            return new Date().getMonth();
        },
        nowDate() {
            return new Date().getDate();
        },
        borderLightColor() {
            return () => {
                if (this.$theme == 'light') {
                    return 'rgba(121, 119, 117, 0.3)';
                }
                if (this.$theme == 'dark' || this.$theme == 'custom') {
                    return 'rgba(255, 255, 255, 0.3)';
                }
                return 'rgba(121, 119, 117, 0.3)';
            };
        },
        backgroundLightColor() {
            return () => {
                if (this.$theme == 'light') {
                    return 'rgba(121, 119, 117, 0.1)';
                }
                if (this.$theme == 'dark' || this.$theme == 'custom') {
                    return 'rgba(255, 255, 255, 0.1)';
                }
                return 'rgba(121, 119, 117, 0.1)';
            };
        },
        computedBackground() {
            return (item) => {
                if (item == this.nowYear) return this.background;
                return '';
            };
        }
    },
    mounted() {
        this.FRInit();
        this.yearsInit();
        this.scrollBottomToLoadInit(80);
        this.scrollTopToLoadInit();
        this.rangeTimerInit();
    },
    methods: {
        FRInit() {
            this.FR = this.uR.revealMaskedJs.apply(this.$el, {
                maskedSelector: this.$refs.main,
                selector: [],
                borderGradientSize: 90,
                backgroundGradientSize: 120,
                borderLightColor: this.borderLightColor,
                backgroundLightColor: this.backgroundLightColor
            });
        },
        yearsInit() {
            let y = [];
            let num = this.year - 8;
            for (let i = 0; i < 28; i++) {
                y.push(num);
                num++;
            }
            this.years = y;
        },
        scrollBottomToLoadInit(offset = 0) {
            let target = this.$refs.main;
            target.addEventListener('scroll', (event) => {
                if (
                    target.scrollTop + offset >=
                    target.scrollHeight - target.clientHeight
                )
                    this.loadNext();
            });
        },
        scrollTopToLoadInit(offset = 0) {
            let target = this.$refs.main;
            target.addEventListener('scroll', (event) => {
                if (target.scrollTop <= 80) this.loadPrev();
            });
        },
        rangeTimerInit() {
            clearInterval(this.timer.updateRange);
            this.timer.updateRange = setInterval(() => {
                try {
                    let scrollTop = this.$refs.main.scrollTop;
                    scrollTop = scrollTop + this.size * 2;
                    scrollTop = (scrollTop / this.size) * 4;
                    scrollTop = Math.floor(scrollTop);
                    this.currentRange =
                        Math.floor(this.years[scrollTop] / 10) * 10;
                } catch (e) {
                    this.currentRange = 0;
                }
            }, 300);
        },
        async loadPrev() {
            let num = this.years[0];
            if (num == this.start) return 0;
            for (let i = 0; i < 16; i++) {
                if (num <= this.start) return 0;
                num--;
                this.years.splice(0, 0, num);
            }
            await this.delay(30);
            this.$refs.main.scrollTop =
                this.$refs.main.scrollTop + (16 / 4) * this.size;
        },
        async loadNext() {
            let num = this.years[this.years.length - 1];
            if (num == this.end) return 0;
            for (let i = 0; i < 16; i++) {
                if (num >= this.end) return 0;
                num++;
                this.years.push(num);
            }
            await this.delay(30);
        },
        async slide(val) {
            if (!this.lock.slide) return 0;
            this.lock.slide = false;
            clearInterval(this.timer.scroller);
            // return await new Promise(resolve => {
            //     this.timer.scroller = setInterval(() => {
            //         let index = this.years.indexOf(val);
            //         if(index == -1) {
            //             if(val < this.currentRange) {
            //                 this.loadPrev();
            //             }
            //             else
            //                 this.loadNext();
            //         }
            //         let height = Math.floor(index / 4) * this.size;
            //         console.log(index, height);
            //         let speed = -Math.floor((this.$refs.main.scrollTop - height) / 7);
            //         this.$refs.main.scrollTop = this.$refs.main.scrollTop + speed;
            //         if(speed == 0) {
            //             this.$refs.main.scrollTop = height;
            //             this.lock.slide = true;
            //             resolve(0);
            //             clearInterval(this.timer.scroller);
            //         }
            //     }, 30);
            // });
            let index = this.years.indexOf(val);
            if (index == -1) {
                if (val < this.currentRange) {
                    await this.loadPrev();
                } else await this.loadNext();
            }
            await new Promise((resolve) => {
                this.$nextTick(() => {
                    let index = this.years.indexOf(val);
                    let height = Math.floor(index / 4) * this.size;
                    gsap.to(this.$refs.main, {
                        scrollTop: height,
                        duration: 0.3,
                        onComplete: () => {
                            this.lock.slide = true;
                            resolve(0);
                        }
                    });
                });
            });
        },
        async delay(millionseconds) {
            return await new Promise((resolve) => {
                setTimeout(() => {
                    resolve(millionseconds);
                }, millionseconds);
            });
        },
        choose(item) {
            this.$emit('choose', item);
        }
    },
    beforeUnmount() {
        clearInterval(this.timer.updateRange);
        this.uR.revealMaskedJs.destroy(this.FR);
    }
};
</script>
