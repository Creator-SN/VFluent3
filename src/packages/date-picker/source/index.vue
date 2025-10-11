<template>
    <div
        class="fv-DatePicker"
        :class="[$theme, { disabled: disabled }]"
        :style="{ '--hover-color': hoverColor }"
    >
        <div
            class="fv-date-picker-input"
            :class="[{ reverse: reverseLayout }]"
            :style="{
                background: inputBackground
            }"
            @click="focus()"
        >
            <input
                v-show="!hideMonth"
                :value="showDate(0)"
                readonly
                class="fv-date-picker-input-item"
                style="flex: 2"
            />
            <input
                v-show="!hideDay"
                :value="showDate(1)"
                readonly
                class="fv-date-picker-input-item"
                :style="{ borderColor: innerBorderColor }"
            />
            <input
                v-show="!hideYear"
                :value="showDate(2)"
                readonly
                :style="{ borderColor: innerBorderColor }"
                class="fv-date-picker-input-item"
            />
        </div>
        <transition name="fv-date-picker-options">
            <div
                v-show="show"
                class="fv-date-picker-options"
                :style="{ background: optionBackground }"
            >
                <div
                    class="fv-date-picker-options-body"
                    :class="[{ reverse: reverseLayout }]"
                >
                    <div
                        class="fv-date-picker-options-body-mask"
                        :style="{ background: selectedBackground }"
                    ></div>

                    <div
                        v-show="!hideMonth"
                        class="fv-date-picker-options-body-col"
                        style="flex: 2"
                        :style="{ borderColor: innerBorderColor }"
                    >
                        <div
                            class="fv-date-picker-options-body-col-up"
                            :style="{ background: slideBtnBackground }"
                            @click="monthSwiper.slidePrev()"
                        >
                            <i class="ms-Icon ms-Icon--CaretUpSolid8"></i>
                        </div>
                        <div
                            class="fv-date-picker-options-body-items swiper"
                            ref="month"
                        >
                            <div class="swiper-wrapper"></div>
                        </div>
                        <div
                            class="fv-date-picker-options-body-col-down"
                            :style="{ background: slideBtnBackground }"
                            @click="monthSwiper.slideNext()"
                        >
                            <i class="ms-Icon ms-Icon--CaretDownSolid8"></i>
                        </div>
                    </div>
                    <div
                        v-show="!hideDay"
                        class="fv-date-picker-options-body-col"
                        :style="{ borderColor: innerBorderColor }"
                    >
                        <div
                            class="fv-date-picker-options-body-col-up"
                            :style="{ background: slideBtnBackground }"
                            @click="daySwiper.slidePrev()"
                        >
                            <i class="ms-Icon ms-Icon--CaretUpSolid8"></i>
                        </div>
                        <div
                            class="fv-date-picker-options-body-items swiper"
                            ref="day"
                        >
                            <div class="swiper-wrapper"></div>
                        </div>
                        <div
                            class="fv-date-picker-options-body-col-down"
                            :style="{ background: slideBtnBackground }"
                            @click="daySwiper.slideNext()"
                        >
                            <i class="ms-Icon ms-Icon--CaretDownSolid8"></i>
                        </div>
                    </div>
                    <div
                        v-show="!hideYear"
                        class="fv-date-picker-options-body-col"
                    >
                        <div
                            class="fv-date-picker-options-body-col-up"
                            :style="{ background: slideBtnBackground }"
                            @click="yearSwiper.slidePrev()"
                        >
                            <i class="ms-Icon ms-Icon--CaretUpSolid8"></i>
                        </div>
                        <div
                            class="fv-date-picker-options-body-items swiper"
                            ref="year"
                        >
                            <div class="swiper-wrapper"></div>
                        </div>
                        <div
                            class="fv-date-picker-options-body-col-down"
                            :style="{ background: slideBtnBackground }"
                            @click="yearSwiper.slideNext()"
                        >
                            <i class="ms-Icon ms-Icon--CaretDownSolid8"></i>
                        </div>
                    </div>
                </div>
                <div class="fv-date-picker-options-bar">
                    <button
                        class="fv-date-picker-options-bar-accept"
                        @click="accept"
                    >
                        <i class="ms-Icon ms-Icon--Accept"></i>
                    </button>
                    <button
                        class="fv-date-picker-options-bar-cancel"
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
    modelValue: {
        type: Date,
        default: () => new Date()
    },
    months: {
        default: () => [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ]
    },
    weeks: {
        default: () => ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.']
    },
    hideYear: {
        default: false
    },
    hideMonth: {
        default: false
    },
    hideDay: {
        default: false
    },
    showWeek: {
        default: false
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
    reverseLayout: {
        default: false
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
import Swiper, { Virtual, Mousewheel } from 'swiper';
import '@/libs/swiper/swiper.min.css';

Swiper.use([Virtual, Mousewheel]);

import { useTheme } from '@/utils/common';

export default {
    name: 'FvDatePicker',
    data() {
        return {
            show: false,
            thisValue: new Date(this.modelValue),
            dayList: [],
            monthSwiper: null,
            daySwiper: null,
            yearSwiper: null,
            timer: {
                debounce: null
            },
            scrollCount: {
                month: 0,
                day: 0,
                year: 0
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
        }
    },
    computed: {
        $theme() {
            return useTheme(this.$props).theme.value;
        },
        yearList() {
            let result = [];
            for (let i = 1900; i <= 9999; i++) {
                result.push(i);
            }
            return result;
        },
        virtualDayList() {
            let result = [];
            for (let i = 0; i < 30; i++) {
                result = result.concat(this.dayList);
            }
            return result;
        },
        virtualMonthList() {
            let result = [];
            for (let i = 0; i < 30; i++) {
                result = result.concat(this.months);
            }
            return result;
        }
    },
    mounted() {
        this.init();
        this.outSideClickInit();
        this.getDayList();
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
            this.monthSwiper = new Swiper(this.$refs.month, {
                ...defaultConfig,
                initialSlide: this.decodeDate(0),
                freeMode: {
                    momentum: true,
                    sticky: true
                },
                virtual: {
                    slides: this.virtualMonthList,
                    renderSlide: (item, index) => {
                        return `<div class="fv-date-picker-options-body-item swiper-slide">
                ${this.showItem(item)}
              </div>`;
                    }
                }
            });
            this.daySwiper = new Swiper(this.$refs.day, {
                ...defaultConfig,
                initialSlide: this.decodeDate(1),
                freeMode: {
                    momentum: true,
                    sticky: true
                },
                virtual: {
                    slides: this.virtualDayList,
                    renderSlide: (item, index) => {
                        return `<div class="fv-date-picker-options-body-item swiper-slide">
                ${this.showItem(item, this.showWeek)}
              </div>`;
                    }
                }
            });
            this.yearSwiper = new Swiper(this.$refs.year, {
                ...defaultConfig,
                initialSlide: this.decodeDate(2),
                freeMode: {
                    momentum: true,
                    sticky: true
                },
                virtual: {
                    slides: this.yearList,
                    renderSlide: (item, index) => {
                        return `<div class="fv-date-picker-options-body-item swiper-slide">
                ${this.showItem(item)}
              </div>`;
                    }
                }
            });
            this.monthSwiper.on('sliderMove', () => {
                this.getDayList();
            });
            this.yearSwiper.on('sliderMove', () => {
                this.getDayList();
            });
            this.$refs.month.addEventListener('wheel', (event) => {
                event.preventDefault();
                let deltaY = event.deltaY;
                deltaY = parseInt(deltaY / 100);
                this.scrollCount.month += deltaY;
                this.scrollDispatch(this.monthSwiper, 'month');
            });
            this.$refs.day.addEventListener('wheel', (event) => {
                event.preventDefault();
                let deltaY = event.deltaY;
                deltaY = parseInt(deltaY / 100);
                this.scrollCount.day += deltaY;
                this.scrollDispatch(this.daySwiper, 'day');
            });
            this.$refs.year.addEventListener('wheel', (event) => {
                event.preventDefault();
                let deltaY = event.deltaY;
                deltaY = parseInt(deltaY / 100);
                this.scrollCount.year += deltaY;
                this.scrollDispatch(this.yearSwiper, 'year');
            });
        },
        focus() {
            if (this.disabled) return;
            this.show = true;
        },
        getDayList() {
            let result = [];
            let monthVal = this.thisValue.getMonth();
            let yearVal = this.thisValue.getFullYear();
            if (this.monthSwiper && this.yearSwiper) {
                monthVal = this.monthSwiper.realIndex % this.months.length;
                yearVal = this.yearSwiper.realIndex + 1900;
            }

            let dayCount = new Date(yearVal, monthVal + 1, 0).getDate();
            for (let i = 1; i <= dayCount; i++) {
                result.push(i);
            }
            let dayVal = this.daySwiper.realIndex % this.dayList.length;
            this.dayList = result;
            this.daySwiper.virtual.cache = [];
            this.daySwiper.virtual.slides = this.virtualDayList;
            this.daySwiper.virtual.update();
            this.daySwiper.slideToLoop(15 * this.dayList.length + dayVal, 0);
        },
        decodeDate(pos) {
            if (pos === 0) {
                return this.thisValue.getMonth();
            } else if (pos === 1) {
                return this.thisValue.getDate();
            } else {
                return this.thisValue.getFullYear();
            }
        },
        showDate(pos) {
            let val = this.decodeDate(pos);
            if (pos === 0) return this.months[val];
            if (pos === 1) {
                if (val < 10) return `0${val}`;
                return val;
            }
            return val;
        },
        showItem(val, addWeek = false) {
            if (parseFloat(val).toString() === 'NaN') return val;
            if (addWeek) {
                let monthVal = this.monthSwiper.realIndex % this.months.length;
                let yearVal = this.yearSwiper.realIndex + 1900;
                let cur = new Date(yearVal, monthVal, val);
                let dateStr = this.weeks[cur.getDay() % 7];
                if (val < 10) return `0${val} (${dateStr})`;
                return `${val} (${dateStr})`;
            }
            if (val < 10) return `0${val}`;
            return val;
        },
        syncTime() {
            this.daySwiper.slideToLoop(
                15 * this.dayList.length + this.decodeDate(1) - 1,
                0
            );
            this.monthSwiper.slideToLoop(
                15 * this.months.length + this.decodeDate(0),
                0
            );
            this.yearSwiper.slideToLoop(this.decodeDate(2) - 1900, 0);
        },
        accept() {
            let monthVal = this.monthSwiper.realIndex % this.months.length;
            let dayVal = (this.daySwiper.realIndex % this.dayList.length) + 1;
            let yearVal = this.yearSwiper.realIndex + 1900;
            let date = new Date(this.thisValue);
            date.setMonth(monthVal);
            date.setDate(dayVal);
            date.setFullYear(yearVal);
            this.thisValue = new Date(date);
            this.show = false;
        },
        scrollDispatch(swiper, key) {
            if (!swiper) return;
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
            if (key.includes('month', 'year')) this.getDayList();
        }
    },
    beforeUnmount() {
        window.removeEventListener('click', this.outSideClickEvent);
        window.removeEventListener('touchend', this.outSideClickEvent);
    }
};
</script>
