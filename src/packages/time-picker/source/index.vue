<template>
    <div
        class="fv-TimePicker"
        :class="[$theme, { disabled: disabled }]"
        :style="{ '--hover-color': hoverColor }"
    >
        <div
            class="fv-time-picker-input"
            :style="{ background: inputBackground }"
            @click="focus()"
        >
            <input
                :value="showTime(0)"
                readonly
                class="fv-time-picker-input-item"
            />
            <input
                :value="showTime(1)"
                readonly
                class="fv-time-picker-input-item"
                :style="{ borderColor: innerBorderColor }"
            />
            <input
                v-show="timeType == 12"
                :value="period[decodeTime(2)]"
                readonly
                :style="{ borderColor: innerBorderColor }"
                class="fv-time-picker-input-item"
            />
        </div>
        <transition name="fv-time-picker-options">
            <div
                v-show="show"
                class="fv-time-picker-options"
                :style="{ background: optionBackground }"
            >
                <div class="fv-time-picker-options-body">
                    <div
                        class="fv-time-picker-options-body-mask"
                        :style="{ background: selectedBackground }"
                    ></div>

                    <div
                        class="fv-time-picker-options-body-col"
                        :style="{ borderColor: innerBorderColor }"
                    >
                        <div
                            class="fv-time-picker-options-body-col-up"
                            :style="{ background: slideBtnBackground }"
                            @click="hourSwiper.slidePrev()"
                        >
                            <i class="ms-Icon ms-Icon--CaretUpSolid8"></i>
                        </div>
                        <div
                            class="fv-time-picker-options-body-items swiper"
                            ref="hour"
                        >
                            <div class="swiper-wrapper"></div>
                        </div>
                        <div
                            class="fv-time-picker-options-body-col-down"
                            :style="{ background: slideBtnBackground }"
                            @click="hourSwiper.slideNext()"
                        >
                            <i class="ms-Icon ms-Icon--CaretDownSolid8"></i>
                        </div>
                    </div>
                    <div
                        class="fv-time-picker-options-body-col"
                        :style="{ borderColor: innerBorderColor }"
                    >
                        <div
                            class="fv-time-picker-options-body-col-up"
                            :style="{ background: slideBtnBackground }"
                            @click="minuteSwiper.slidePrev()"
                        >
                            <i class="ms-Icon ms-Icon--CaretUpSolid8"></i>
                        </div>
                        <div
                            class="fv-time-picker-options-body-items swiper"
                            ref="minute"
                        >
                            <div class="swiper-wrapper">
                                <div
                                    v-for="(item, index) in minuteList"
                                    class="fv-time-picker-options-body-item swiper-slide"
                                >
                                    {{ showItem(item) }}
                                </div>
                            </div>
                        </div>
                        <div
                            class="fv-time-picker-options-body-col-down"
                            :style="{ background: slideBtnBackground }"
                            @click="minuteSwiper.slideNext()"
                        >
                            <i class="ms-Icon ms-Icon--CaretDownSolid8"></i>
                        </div>
                    </div>
                    <div
                        v-show="timeType == 12"
                        class="fv-time-picker-options-body-col"
                    >
                        <div
                            class="fv-time-picker-options-body-col-up"
                            :style="{ background: slideBtnBackground }"
                            @click="periodSwiper.slidePrev()"
                        >
                            <i class="ms-Icon ms-Icon--CaretUpSolid8"></i>
                        </div>
                        <div
                            class="fv-time-picker-options-body-items swiper"
                            ref="period"
                        >
                            <div class="swiper-wrapper">
                                <div
                                    v-for="(item, index) in period"
                                    class="fv-time-picker-options-body-item swiper-slide"
                                >
                                    {{ item }}
                                </div>
                            </div>
                        </div>
                        <div
                            class="fv-time-picker-options-body-col-down"
                            :style="{ background: slideBtnBackground }"
                            @click="periodSwiper.slideNext()"
                        >
                            <i class="ms-Icon ms-Icon--CaretDownSolid8"></i>
                        </div>
                    </div>
                </div>
                <div class="fv-time-picker-options-bar">
                    <button
                        class="fv-time-picker-options-bar-accept"
                        @click="accept"
                    >
                        <i class="ms-Icon ms-Icon--Accept"></i>
                    </button>
                    <button
                        class="fv-time-picker-options-bar-cancel"
                        @click="show = false"
                    >
                        <i class="ms-Icon ms-Icon--Cancel"></i>
                    </button>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { commonProps } from '@/packages/common/props';

const emits = defineEmits(['update:modelValue', 'change']);

const props = defineProps({
    ...commonProps,
    timeType: {
        type: Number,
        default: 12
    },
    modelValue: {
        type: Date,
        default: () => new Date()
    },
    period: {
        type: Array,
        default: () => ['A.M.', 'P.M.']
    },
    inputBackground: {
        default: ''
    },
    innerBorderColor: {
        type: String,
        default: 'rgba(200, 200, 200, 0.3)'
    },
    selectedBackground: {
        default: ''
    },
    optionBackground: {
        default: ''
    },
    slideBtnBackground: {
        default: ''
    },
    secondType: {
        default: 'same'
    },
    disabled: {
        type: Boolean,
        default: false
    },
    hoverColor: {
        type: String,
        default: undefined
    }
});
</script>

<script>
import Swiper, { Mousewheel } from 'swiper';
import '@/libs/swiper/swiper.min.css';

Swiper.use([Mousewheel]);

import { useTheme } from '@/utils/common';

export default {
    name: 'FvTimePicker',
    data() {
        return {
            show: false,
            thisValue: new Date(this.modelValue),
            hourSwiper: null,
            minuteSwiper: null,
            periodSwiper: null,
            timer: {
                debounce: null
            },
            scrollCount: {
                hour: 0,
                minute: 0
            }
        };
    },
    watch: {
        show(val) {
            if (val) {
                this.$nextTick(() => {
                    this.syncTime();
                });
            }
        },
        modelValue() {
            this.thisValue = this.modelValue;
        },
        thisValue() {
            this.$emit('update:modelValue', this.thisValue);
            this.$emit('change', new Date(this.thisValue));
        },
        timeType() {
            this.hourSwiper.virtual.cache = [];
            this.hourSwiper.virtual.slides = this.virtualHourList;
            this.hourSwiper.virtual.update();
            this.syncTime();
        }
    },
    computed: {
        $theme() {
            return useTheme(this.$props).theme.value;
        },
        hourList() {
            let result = [];
            if (this.timeType == 12) {
                for (let i = 0; i < 12; i++) result.push(i + 1);
                return result;
            }
            for (let i = 0; i < 24; i++) result.push(i);
            return result;
        },
        virtualHourList() {
            let result = [];
            for (let i = 0; i < 30; i++) {
                result = result.concat(this.hourList);
            }
            return result;
        },
        minuteList() {
            let result = [];
            for (let i = 0; i < 60; i++) result.push(i);
            return result;
        }
    },
    mounted() {
        this.init();
        this.outSideClickInit();
    },
    methods: {
        outSideClickInit() {
            window.addEventListener('click', this.outSideClickEvent);
            window.addEventListener('touchend', this.outSideClickEvent);
        },
        outSideClickEvent(event) {
            if (!event.composedPath().includes(this.$el)) this.show = false;
        },
        init() {
            const defaultConfig = {
                direction: 'vertical',
                slidesPerView: 9,
                centeredSlides: true,
                speed: 100,
                on: {
                    click(swiper, e) {
                        const index = swiper.clickedIndex;
                        const slide = swiper.clickedSlide;

                        if (index != null && slide) {
                            swiper.slideTo(index);
                        }
                    }
                }
            };
            this.hourSwiper = new Swiper(this.$refs.hour, {
                ...defaultConfig,
                initialSlide:
                    this.timeType == 12
                        ? this.decodeTime(0) - 1
                        : this.decodeTime(0),
                freeMode: {
                    momentum: true,
                    sticky: true
                },
                virtual: {
                    slides: this.virtualHourList,
                    renderSlide: (item, index) => {
                        return `<div class="fv-time-picker-options-body-item swiper-slide">
                ${this.showItem(item)}
              </div>`;
                    }
                }
            });
            this.minuteSwiper = new Swiper(this.$refs.minute, {
                ...defaultConfig,
                initialSlide: this.decodeTime(1),
                loop: true,
                loopAdditionalSlides: this.minuteList.length
            });
            this.periodSwiper = new Swiper(this.$refs.period, {
                ...defaultConfig,
                initialSlide: this.decodeTime(2),
                mousewheel: {
                    sensitivity: 0.4
                },
                resistanceRatio: 0
            });
            this.$refs.hour.addEventListener('wheel', (event) => {
                event.preventDefault();
                let deltaY = event.deltaY;
                deltaY = parseInt(deltaY / 100);
                this.scrollCount.hour += deltaY;
                this.scrollDispatch(this.hourSwiper, 'hour');
            });
            this.$refs.minute.addEventListener('wheel', (event) => {
                event.preventDefault();
                let deltaY = event.deltaY;
                deltaY = parseInt(deltaY / 100);
                this.scrollCount.minute += deltaY;
                this.scrollDispatch(this.minuteSwiper, 'minute');
            });
        },
        focus() {
            if (this.disabled) return;
            this.show = true;
        },
        decodeTime(pos) {
            if (pos === 0) {
                let mod = this.timeType == 12 ? 12 : 24;
                let hour = this.thisValue.getHours() % mod;
                if (this.timeType == 12 && hour === 0) return 12;
                return hour;
            } else if (pos === 1) {
                return this.thisValue.getMinutes();
            } else {
                if (this.thisValue.getHours() > 11) return 1;
                return 0;
            }
        },
        showTime(pos) {
            let val = this.decodeTime(pos);
            if (val < 10) return `0${val}`;
            return val;
        },
        showItem(val) {
            if (parseFloat(val).toString() === 'NaN') return val;
            if (val < 10) return `0${val}`;
            return val;
        },
        syncTime() {
            this.minuteSwiper.slideToLoop(this.decodeTime(1), 0);
            if (this.timeType == 12) {
                this.hourSwiper.slideToLoop(
                    15 * this.hourList.length + this.decodeTime(0) - 1,
                    0
                );
                this.periodSwiper.slideTo(this.decodeTime(2), 0);
            } else
                this.hourSwiper.slideToLoop(
                    15 * this.hourList.length + this.decodeTime(0),
                    0
                );
        },
        accept() {
            let hourVal = this.hourSwiper.realIndex % this.hourList.length;
            let minute = this.minuteSwiper.realIndex % this.minuteList.length;
            if (this.timeType === 12) {
                hourVal = hourVal + 1;
                let ispm = this.periodSwiper.realIndex == 1;
                if (ispm) {
                    if (hourVal !== 12) hourVal = (hourVal + 12) % 24;
                } else {
                    if (hourVal === 12) hourVal = 0;
                }
            }
            let sec =
                this.secondType == 'same'
                    ? this.thisValue.getSeconds()
                    : this.secondType == 'zero'
                    ? 0
                    : 59;
            let date = new Date(this.thisValue);
            date.setHours(hourVal);
            date.setMinutes(minute);
            date.setSeconds(sec);
            this.thisValue = new Date(date);
            this.show = false;
        },
        scrollDispatch(swiper, key) {
            clearTimeout(this.timer.debounce);
            this.timer.debounce = setTimeout(() => {
                this.scrollExec(swiper, key);
                this.scrollCount[key] = 0;
            }, 20);
        },
        scrollExec(swiper, key) {
            let offset = this.scrollCount[key];
            offset = offset > 3 ? 3 : offset;
            let current = swiper.realIndex;
            current = current + offset;
            swiper.slideToLoop(current);
        }
    },
    beforeUnmount() {
        window.removeEventListener('click', this.outSideClickEvent);
        window.removeEventListener('touchend', this.outSideClickEvent);
    }
};
</script>
