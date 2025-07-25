<template>
    <div class="day-block">
        <div class="weekdays-block">
            <button
                v-for="(weekday, index) in weekdays[lan]"
                class="weekday"
                :key="`weekday: ${index}`"
            >
                <slot name="weekday_content" :value="weekday">
                    {{ weekday }}
                </slot>
            </button>
        </div>
        <div class="picker-container" ref="main">
            <button
                v-for="(item, index) in days"
                :key="`day: ${index}`"
                class="picker-btn day"
                :class="{
                    range:
                        item.year == currentRange.year &&
                        item.month == currentRange.month,
                    current:
                        item.year == nowYear &&
                        item.month == nowMonth &&
                        item.no == nowDate,
                    choose: isChoosenFirstOrLast(item)
                }"
                :title="`${item.year}/${item.month + 1}/${item.no}`"
                :style="{
                    background: computedBackground(item),
                    'border-color': computedBorderColor(item)
                }"
                @click="choose(item)"
            >
                {{ item.no }}
            </button>
        </div>
    </div>
</template>

<script>
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
        multiple: {
            default: 'single'
        },
        size: {
            default: 41
        },
        lan: {
            default: 'en'
        },
        background: {
            default: ''
        },
        selectedBackground: {
            default: ''
        },
        selectedBorderColor: {
            default: ''
        },
        choosenDates: {
            default: () => []
        },
        theme: {
            default: "global",
        },
    },
    setup() {
        const uR = useRevealCache();
        uR.initRevealInstances();

        return {
            uR
        };
    },
    data() {
        return {
            FR: null,
            thisValue: this.$SDate.Parse(this.$SDate.DateToString(this.value)),
            days: [],
            weekdays: {
                en: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
                zh: ['日', '一', '二', '三', '四', '五', '六']
            },
            dayList: {
                leap: [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
                default: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
            },
            currentRange: 0,
            currentChoose: [],
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
        choosenDates: {
            handler(val) {
                this.currentChoose = JSON.parse(JSON.stringify(val));
            },
            immediate: true
        },
        currentRange(val) {
            this.$emit('range-change', val);
        },
        multiple(val) {
            if (val == 'single') this.currentChoose = [this.currentChoose[0]];
        }
    },
    computed: {
        $theme () {
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
                if (
                    item.year == this.nowYear &&
                    item.month == this.nowMonth &&
                    item.no == this.nowDate
                )
                    return this.background;
                if (this.isChoose(item)) return this.selectedBackground;
                return '';
            };
        },
        computedBorderColor() {
            return (item) => {
                if (this.isChoosenFirstOrLast(item))
                    return this.selectedBorderColor;
                return '';
            };
        }
    },
    mounted() {
        this.FRInit();
        this.daysInit();
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
        async daysInit() {
            this.thisValue = this.$SDate.Parse(
                this.$SDate.DateToString(this.value)
            );
            let d = [];
            let nowday = this.$SDate.Parse(
                this.$SDate.DateToString(this.thisValue)
            );
            nowday.setDate(1);

            let lastday = this.$SDate.Parse(this.$SDate.DateToString(nowday));
            lastday.setMonth(lastday.getMonth() - 1);
            let remain = nowday.getDay() + 14;
            for (
                let j =
                    this.dayList[this.leapYear(lastday.getFullYear())][
                        lastday.getMonth()
                    ] - remain;
                j <
                this.dayList[this.leapYear(lastday.getFullYear())][
                    lastday.getMonth()
                ];
                j++
            ) {
                d.push({
                    year: lastday.getFullYear(),
                    month: lastday.getMonth(),
                    no: j + 1
                });
            }
            for (let i = 0; i < 2; i++) {
                for (
                    let j = 0;
                    j <
                    this.dayList[this.leapYear(nowday.getFullYear())][
                        nowday.getMonth()
                    ];
                    j++
                ) {
                    d.push({
                        year: nowday.getFullYear(),
                        month: nowday.getMonth(),
                        no: j + 1
                    });
                }
                nowday.setMonth(nowday.getMonth() + 1);
            }
            this.days = d;
            await this.delay(50);
            this.$refs.main.scrollTop =
                this.$refs.main.scrollTop + this.size * 2;
            this.loadPrev();
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
                    scrollTop = (scrollTop / this.size) * 7;
                    scrollTop = Math.floor(scrollTop);
                    this.currentRange = this.days[scrollTop + 6];
                } catch (e) {
                    this.currentRange = { year: 0, month: 0, no: 0 };
                }
            }, 300);
        },
        async loadPrev() {
            let nowday = new Date();
            let count = 0;
            nowday.setDate(this.days[0].no);
            nowday.setMonth(this.days[0].month);
            nowday.setFullYear(this.days[0].year);
            if (nowday.getDate() != 1) {
                for (let j = nowday.getDate() - 2; j >= 0; j--) {
                    this.days.splice(0, 0, {
                        year: nowday.getFullYear(),
                        month: nowday.getMonth(),
                        no: j + 1
                    });
                    count++;
                }
            }
            if (nowday.getFullYear() == this.start && nowday.getMonth() == 0)
                return 0;
            nowday.setDate(1);
            nowday.setMonth(this.days[0].month - 1);
            for (
                let j =
                    this.dayList[this.leapYear(nowday.getFullYear())][
                        nowday.getMonth()
                    ] - 1;
                j >= 0;
                j--
            ) {
                this.days.splice(0, 0, {
                    year: nowday.getFullYear(),
                    month: nowday.getMonth(),
                    no: j + 1
                });
                count++;
            }

            let lastday = this.$SDate.Parse(this.$SDate.DateToString(nowday));
            lastday.setMonth(lastday.getMonth() - 1);
            let remain = nowday.getDay() + 14;
            for (
                let j =
                    this.dayList[this.leapYear(lastday.getFullYear())][
                        lastday.getMonth()
                    ] - 1;
                j >=
                this.dayList[this.leapYear(lastday.getFullYear())][
                    lastday.getMonth()
                ] -
                    remain;
                j--
            ) {
                this.days.splice(0, 0, {
                    year: lastday.getFullYear(),
                    month: lastday.getMonth(),
                    no: j + 1
                });
                count++;
            }

            count = Math.floor(count / 7);
            await this.delay(30);
            this.$refs.main.scrollTop =
                this.$refs.main.scrollTop + count * this.size;
        },
        async loadNext() {
            let nowday = new Date();
            nowday.setDate(1);
            nowday.setMonth(this.days[this.days.length - 1].month);
            nowday.setFullYear(this.days[this.days.length - 1].year);
            if (nowday.getFullYear() == this.end && nowday.getMonth() == 11)
                return 0;
            nowday.setMonth(this.days[this.days.length - 1].month + 1);
            for (
                let j = 0;
                j <
                this.dayList[this.leapYear(nowday.getFullYear())][
                    nowday.getMonth()
                ];
                j++
            ) {
                this.days.push({
                    year: nowday.getFullYear(),
                    month: nowday.getMonth(),
                    no: j + 1
                });
            }
            await this.delay(30);
        },
        async slide(val) {
            if (!this.lock.slide) return 0;
            this.lock.slide = false;
            let val_date = this.$SDate.Parse(
                `${val.year}-${val.month + 1}-1 0:0:0`
            );
            let current_date = this.$SDate.Parse(
                `${this.currentRange.year}-${this.currentRange.month + 1}-${
                    this.currentRange.no
                } 0:0:0`
            );
            clearInterval(this.timer.scroller);
            return await new Promise((resolve) => {
                this.timer.scroller = setInterval(() => {
                    let target = this.days.find(
                        (item) =>
                            item.year == val.year &&
                            item.month == val.month &&
                            item.no == 1
                    );
                    if (target == undefined) {
                        if (this.$SDate.DisTime(val_date, current_date) > 0)
                            this.loadPrev();
                        else this.loadNext();
                        return 0;
                    }
                    let index = this.days.indexOf(target);
                    let height = Math.floor(index / 7) * this.size;
                    let speed = -Math.floor(
                        (this.$refs.main.scrollTop - height) / 2
                    );
                    this.$refs.main.scrollTop =
                        this.$refs.main.scrollTop + speed;
                    if (speed == 0) {
                        this.$refs.main.scrollTop = height;
                        this.lock.slide = true;
                        resolve(0);
                        clearInterval(this.timer.scroller);
                    }
                }, 60);
            });
        },
        leapYear(num) {
            if (num % 4 == 0 && num % 100 != 0) return 'leap';
            else if (num % 400 == 0) return 'leap';
            else return 'default';
        },
        getDaysInMonth(month, year) {
            // month is 1 based
            return new Date(year, month, 0).getDate();
        },
        choose(item) {
            if (this.multiple == 'single') this.currentChoose = [item];
            else if (this.multiple == 'multiple') this.currentChoose.push(item);
            else if (this.multiple == 'range') {
                this.currentChoose.sort((a, b) => {
                    if (a.year != b.year) return a.year - b.year;
                    if (a.month != b.month) return a.month - b.month;
                    return a.no - b.no;
                });
                let result =
                    this.currentChoose.length > 0
                        ? [this.currentChoose[0]]
                        : [item];
                if (
                    new Date(result[0].year, result[0].month, result[0].no) >=
                        new Date(item.year, item.month, item.no) ||
                    this.currentChoose.length > 1
                ) {
                    result = [item];
                } else result.push(item);
                if (result.length === 1) {
                    this.currentChoose = result;
                } else {
                    let final = [];
                    for (let i = result[0].year; i <= result[1].year; i++) {
                        let start = 0;
                        let end = 11;
                        if (i == result[0].year) start = result[0].month;
                        if (i == result[1].year) end = result[1].month;
                        for (let j = start; j <= end; j++) {
                            let days = this.getDaysInMonth(j + 1, i);
                            for (let k = 1; k <= days; k++) {
                                let target = {
                                    year: i,
                                    month: j,
                                    no: k
                                };
                                if (
                                    i === result[0].year &&
                                    start === result[0].month &&
                                    k < result[0].no
                                )
                                    continue;
                                if (
                                    i === result[1].year &&
                                    end === result[1].month &&
                                    k > result[1].no
                                )
                                    continue;
                                final.push(target);
                            }
                        }
                    }
                    this.currentChoose = final;
                }
            }
            this.$emit('choosen-dates', this.currentChoose);
            this.$emit('choose', item);
            let cur_dates = this.currentChoose.map((it) => {
                return new Date(it.year, it.month, it.no);
            });
            this.$emit('choosen-dates-obj', cur_dates);
        },
        async delay(millionseconds) {
            return await new Promise((resolve) => {
                setTimeout(() => {
                    resolve(millionseconds);
                }, millionseconds);
            });
        },
        isEqualItem(item1, item2) {
            return (
                item1.year == item2.year &&
                item1.month == item2.month &&
                item1.no == item2.no
            );
        },
        isChoose(item) {
            return (
                this.currentChoose.findIndex(
                    (it) =>
                        it.year == item.year &&
                        it.month == item.month &&
                        it.no == item.no
                ) != -1
            );
        },
        isChoosenFirstOrLast(item) {
            if (this.multiple === 'range') {
                if (this.currentChoose.length == 0) return false;
                if (this.isEqualItem(this.currentChoose[0], item)) return true;
                if (
                    this.isEqualItem(
                        this.currentChoose[this.currentChoose.length - 1],
                        item
                    )
                )
                    return true;
                return false;
            } else return this.isChoose(item);
        }
    },
    beforeUnmount() {
        clearInterval(this.timer.updateRange);
        clearInterval(this.timer.scroller);
        this.uR.revealMaskedJs.destroy(this.FR);
    }
};
</script>
