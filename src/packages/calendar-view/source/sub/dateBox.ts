import { commonProps } from '@/packages/common/props';
import { useRevealCache } from '@/store/reveal';
import { EmitFn } from '@/types/components';
import { sleep, useTheme, isLeapYear } from '@/utils/common';
import { SDate } from '@/utils/common/usual';
import { ExtractPropTypes, PropType, computed, ref, watch } from 'vue';

type RangeItem = {
    year: number,
    month: number,
    no: number
}

export const calendarViewDateBoxProps = {
    ...commonProps,
    value: {
        type: Object as PropType<Date>,
        default: () => new Date()
    },
    start: {
        type: Number,
        default: 1900,
    },
    end: {
        type: Number,
        default: 3000
    },
    multiple: {
        type: String,
        default: 'single'
    },
    size: {
        type: Number,
        default: 41
    }
}

export type CalendarViewDateBoxProps = ExtractPropTypes<typeof calendarViewDateBoxProps>

export const calendarViewDateBoxEmits = {
    "range-change": (val: RangeItem) => {
        return true;
    },
    "choose-dates": (val: Array<RangeItem>) => {
        return true;
    },
    "choose": (val: RangeItem) => {
        return true;
    }
}

export type CalendarViewDateBoxEmits = typeof calendarViewDateBoxEmits

const dayList = {
    leap: [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    default: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
}


export const useCalendarViewDateBox = (props: CalendarViewDateBoxProps, emits: EmitFn<CalendarViewDateBoxEmits>) => {
    const { theme } = useTheme(props)
    const FR = ref<any>();
    const uR = useRevealCache();
    uR.initRevealInstances()
    const thisValue = ref<Date>(SDate.Parse(SDate.DateToString(props.value)))
    const days = ref<Array<RangeItem>>([])
    const currentRange = ref<RangeItem>({
        year: 0,
        month: 0,
        no: 0
    })
    const currentChoose = ref<Array<RangeItem>>([])
    const timer = ref<{
        updateRange?: number | NodeJS.Timeout,
        scroller?: number | NodeJS.Timeout
    }>({
        updateRange: undefined,
        scroller: undefined
    })
    const lock = ref({
        slide: true
    })
    watch(() => currentRange.value, (newVal: RangeItem, oldVal: RangeItem) => {
        emits("range-change", newVal)
    })

    watch(() => props.multiple, (newVal: string, oldVal: string) => {
        if (newVal === 'single') {
            if (currentChoose.value !== undefined)
                currentChoose.value = [currentChoose.value[0]]
        }
    })

    const year = computed(() => {
        return thisValue.value.getFullYear()
    })

    const month = computed(() => {
        return thisValue.value.getMonth()
    })
    const date = computed(() => {
        return thisValue.value.getDate()
    })
    const nowYear = computed(() => {
        return new Date().getFullYear()
    })
    const nowMonth = computed(() => {
        return new Date().getMonth()
    })
    const nowDate = computed(() => {
        return new Date().getDate()
    })
    const borderLightColor = computed(() => {
        if (theme.value === "light") {
            return "rgba(121, 119, 117, 0.3)";
        }
        if (theme.value === "dark" || theme.value === "custom") {
            return "rgba(255, 255, 255, 0.3)";
        }
        return "rgba(121, 119, 117, 0.3)";
    })
    const backgroundLightColor = computed(() => {
        if (theme.value === "light") {
            return "rgba(121, 119, 117, 0.1)";
        }
        if (theme.value === "dark" || theme.value === "custom") {
            return "rgba(255, 255, 255, 0.1)";
        }
        return "rgba(121, 119, 117, 0.1)";
    })
    const root = ref<HTMLElement>()
    const main = ref<HTMLElement>()
    const FRInit = () => {
        FR.value = uR.revealMaskedJs.apply(root.value, {
            maskedSelector: main.value,
            selector: [],
            borderGradientSize: 90,
            backgroundGradientSize: 120,
            borderLighhtColor: borderLightColor.value,
            backgroundLightColor: backgroundLightColor.value
        })
    }
    const loadPrev = async () => {
        const nowday = new Date()
        let count = 0;
        nowday.setDate(days.value[0].no)
        nowday.setMonth(days.value[0].month)
        nowday.setFullYear(days.value[0].year)
        if (nowday.getDate() != 1) {
            for (let j = nowday.getDate() - 2; j >= 0; j--) {
                days.value.splice(0, 0, {
                    year: nowday.getFullYear(),
                    month: nowday.getMonth(),
                    no: j + 1,
                });
                count++;
            }
        }
        if (nowday.getFullYear() == props.start && nowday.getMonth() == 0)
            return 0;
        nowday.setDate(1);
        nowday.setMonth(days.value[0].month - 1);
        for (
            let j =
                dayList[isLeapYear(nowday) ? "leap" : "default"][
                nowday.getMonth()
                ] - 1;
            j >= 0;
            j--
        ) {
            days.value.splice(0, 0, {
                year: nowday.getFullYear(),
                month: nowday.getMonth(),
                no: j + 1,
            });
            count++;
        }

        let lastday = SDate.Parse(SDate.DateToString(nowday));
        lastday.setMonth(lastday.getMonth() - 1);
        let remain = nowday.getDay() + 14;
        for (
            let j =
                dayList[isLeapYear(lastday) ? "leap" : "default"][
                lastday.getMonth()
                ] - 1;
            j >=
            dayList[isLeapYear(lastday) ? "leap" : "default"][
            lastday.getMonth()
            ] -
            remain;
            j--
        ) {
            days.value.splice(0, 0, {
                year: lastday.getFullYear(),
                month: lastday.getMonth(),
                no: j + 1,
            });
            count++;
        }

        count = Math.floor(count / 7);
        await sleep(30);
        if (main.value?.scrollTop !== undefined) {
            main.value.scrollTop =
                main.value.scrollTop + count * props.size;
        }
    }
    const loadNext = async () => {
        const nowday = new Date();
        nowday.setDate(1);
        nowday.setMonth(days.value[days.value.length - 1].month);
        nowday.setFullYear(days.value[days.value.length - 1].year);
        if (nowday.getFullYear() == props.end && nowday.getMonth() == 11)
            return 0;
        nowday.setMonth(days.value[days.value.length - 1].month + 1);
        for (
            let j = 0;
            j <
            dayList[isLeapYear(nowday) ? "leap" : "default"][
            nowday.getMonth()
            ];
            j++
        ) {
            days.value.push({
                year: nowday.getFullYear(),
                month: nowday.getMonth(),
                no: j + 1,
            });
        }
        await sleep(30);
    }
    const slide = async (val: RangeItem) => {
        if (!lock.value.slide) return 0
        lock.value.slide = false;
        let valDate = SDate.Parse(
            `${val.year}-${val.month + 1}-1 0:0:0`
        )
        let currentDate = SDate.Parse(
            `${currentRange.value.year}-${currentRange.value.month + 1}-${currentRange.value.no
            } 0:0:0`
        )
        clearInterval(timer.value.scroller)
        return await new Promise((resolve) => {
            timer.value.scroller = setInterval(() => {
                let target = days.value.find(
                    (item) =>
                        item.year == val.year &&
                        item.month == val.month &&
                        item.no == 1
                );
                if (target == undefined) {
                    if (SDate.DisTime(valDate, currentDate) > 0)
                        loadPrev();
                    else loadNext();
                    return 0;
                }
                let index = days.value.indexOf(target);
                let height = Math.floor(index / 7) * props.size;
                if (main.value?.scrollTop !== undefined) {
                    let speed = -Math.floor(
                        (main.value.scrollTop - height) / 2
                    );
                    main.value.scrollTop =
                        main.value.scrollTop + speed;
                    if (speed == 0) {
                        main.value.scrollTop = height;
                        lock.value.slide = true;
                        resolve(0);
                        clearInterval(timer.value.scroller);
                    }
                }
            }, 60);
        })
    }
    const daysInit = async () => {
        const d = []
        const nowday = SDate.Parse(SDate.DateToString(thisValue.value))
        nowday.setDate(1)

        let lastday = SDate.Parse(SDate.DateToString(nowday))
        lastday.setMonth(lastday.getMonth() - 1)
        let remain = nowday.getDay() + 14
        for (
            let j =
                dayList[isLeapYear(lastday) ? "leap" : "default"][
                lastday.getMonth()
                ] - remain;
            j <
            dayList[isLeapYear(lastday) ? "leap" : "default"][
            lastday.getMonth()
            ];
            j++
        ) {
            d.push({
                year: lastday.getFullYear(),
                month: lastday.getMonth(),
                no: j + 1,
            });
        }
        for (let i = 0; i < 2; i++) {
            for (
                let j = 0;
                j <
                dayList[isLeapYear(nowday) ? "leap" : "default"][
                nowday.getMonth()
                ];
                j++
            ) {
                d.push({
                    year: nowday.getFullYear(),
                    month: nowday.getMonth(),
                    no: j + 1,
                });
            }
            nowday.setMonth(nowday.getMonth() + 1);
        }
        days.value = d;
        await sleep(50);
        if (main.value?.scrollTop !== undefined) {
            main.value.scrollTop =
                main.value.scrollTop + props.size * 2;
        }
        loadPrev();
    }
    const scrollBottomToLoadInit = (offset: number = 0) => {
        let target = main.value;
        if (target !== undefined) {
            target.addEventListener("scroll", (event) => {
                if (
                    target.scrollTop + offset >=
                    target.scrollHeight - target.clientHeight
                )
                    loadNext();
            });
        }
    }
    const scrollTopToLoadInit = (offset: number = 0) => {
        let target = main.value;
        if (target !== undefined) {
            target.addEventListener("scroll", (event) => {
                if (target.scrollTop <= 80) loadPrev();
            });
        }
    }
    const rangeTimerInit = () => {
        clearInterval(timer.value.updateRange)
        timer.value.updateRange = setInterval(() => {
            try {
                let scrollTop = main.value?.scrollTop;
                if (scrollTop !== undefined) {
                    scrollTop = scrollTop + props.size * 2;
                    scrollTop = (scrollTop / props.size) * 7;
                    scrollTop = Math.floor(scrollTop);
                    currentRange.value = days.value[scrollTop + 6];
                }
            } catch (e) {
                currentRange.value = { year: 0, month: 0, no: 0 };
            }
        }, 300)
    }
    const choose = (item: RangeItem) => {
        if (props.multiple === 'single') {
            currentChoose.value = [item]
        } else if (props.multiple === 'multiple') currentChoose.value?.push(item)
        else if (props.multiple === 'range') {
            let item_index = days.value.indexOf(item);
            let last_index = days.value.indexOf(
                currentChoose.value[currentChoose.value.length - 1]
            );
            if (currentChoose.value.length == 0) currentChoose.value = [item];
            else if (item_index >= last_index) {
                for (let i = last_index + 1; i <= item_index; i++) {
                    currentChoose.value.push(days.value[i]);
                }
            } else currentChoose.value = [item];
        }
    }
    const isChoose = (item: RangeItem) => {
        return currentChoose.value.indexOf(item) > -1;
    }
    const weekdays = {
        en: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        zh: ["日", "一", "二", "三", "四", "五", "六"],
    }
    return {
        root,
        main,
        theme,
        uR,
        FR,
        thisValue,
        days,
        currentRange,
        currentChoose,
        year,
        month,
        date,
        nowYear,
        nowMonth,
        nowDate,
        borderLightColor,
        backgroundLightColor,
        FRInit,
        daysInit,
        loadPrev,
        loadNext,
        scrollBottomToLoadInit,
        scrollTopToLoadInit,
        rangeTimerInit,
        slide,
        choose,
        isChoose,
        weekdays,
        timer
    }
}