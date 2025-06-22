import { commonProps } from "@/packages/common/props";
import { useRevealCache } from "@/store/reveal";
import { EmitFn } from "@/types/components";
import { sleep, useTheme } from "@/utils/common";
import { getLanguage } from "@/utils/common/browser";
import { SDate } from "@/utils/common/usual";
import { ExtractPropTypes, PropType, computed, ref, watch } from "vue";

const monthList = [
    { en: 'Jan', zh: '一月' },
    { en: 'Feb', zh: '二月' },
    { en: 'Mar', zh: '三月' },
    { en: 'Apr', zh: '四月' },
    { en: 'May', zh: '五月' },
    { en: 'Jun', zh: '六月' },
    { en: 'Jul', zh: '七月' },
    { en: 'Aug', zh: '八月' },
    { en: 'Set', zh: '九月' },
    { en: 'Oct', zh: '十月' },
    { en: 'Nov', zh: '十一月' },
    { en: 'Dec', zh: '十二月' }
];

export const calendarViewMonthBoxProps = {
    ...commonProps,
    value: {
        type: Object as PropType<Date>,
        default: () => new Date()
    },
    start: {
        type: Number,
        default: 1900
    },
    end: {
        type: Number,
        default: 3000
    },
    size: {
        type: Number,
        default: 72.5
    }
}

type RangeItem = {
    year: number,
    no: number,
    name?: string
}

export type CalendarViewMonthBoxProps = ExtractPropTypes<typeof calendarViewMonthBoxProps>

export const calendarViewMonthBoxEmits = {
    "range-change": (val: RangeItem) => {
        return true;
    },
    "choose": (val: RangeItem) => {
        return true;
    }
}

export type CalendarViewMonthBoxEmits = typeof calendarViewMonthBoxEmits

export const useCalendarViewMonthBox = (props: CalendarViewMonthBoxProps, emits: EmitFn<CalendarViewMonthBoxEmits>) => {
    const { theme } = useTheme(props)
    const FR = ref<any>();
    const uR = useRevealCache();
    uR.initRevealInstances()
    const thisValue = ref<Date>(SDate.Parse(SDate.DateToString(props.value)))
    const months = ref<Array<RangeItem>>([]);
    const currentRange = ref<RangeItem>({
        year: 0,
        no: 0
    })
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

    watch(() => currentRange.value, (val: RangeItem) => {
        emits("range-change", val)
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
    const main = ref<HTMLElement>()
    const FRInit = () => {
        FR.value = uR.revealMaskedJs.apply(main.value, {
            maskedSelector: main.value,
            selector: [],
            borderGradientSize: 90,
            backgroundGradientSize: 120,
            borderLighhtColor: borderLightColor.value,
            backgroundLightColor: backgroundLightColor.value
        })
    }
    const lang = computed(() => {
        if (props.lang === 'global') {
            return getLanguage()
        }
        return props.lang
    })
    const monthsInit = () => {
        let m = [];
        let num = year.value - 1;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < monthList.length; j++) {
                m.push({
                    year: num,
                    no: j,
                    name: monthList[j][lang.value === 'zh' ? 'zh' : 'en']
                });
            }
            num++;
        }
        months.value = m;
        setTimeout(() => {
            if (main.value?.scrollTop !== undefined) {
                main.value.scrollTop =
                    main.value.scrollTop + props.size * 3;
            }
        }, 50);
    }
    const loadPrev = async () => {
        let num = months.value[0].year;
        if (num == props.start) return 0;
        num--;
        for (let j = monthList.length - 1; j >= 0; j--) {
            months.value.splice(0, 0, {
                year: num,
                no: j,
                name: monthList[j][lang.value === 'zh' ? 'zh' : 'en']
            });
        }
        await sleep(30);
        if (main.value?.scrollTop !== undefined) {
            main.value.scrollTop =
                main.value.scrollTop + (12 / 4) * props.size;
        }
    }
    const loadNext = async () => {
        let num = months.value[months.value.length - 1].year;
        if (num == props.end) return 0;
        num++;
        for (let j = 0; j < monthList.length; j++) {
            months.value.push({
                year: num,
                no: j,
                name: monthList[j][lang.value === 'zh' ? 'zh' : 'en']
            });
        }
        await sleep(30);
    }
    const slide = async (val: RangeItem) => {
        if (!lock.value.slide) return 0;
        lock.value.slide = false;
        clearInterval(timer.value.scroller);
        return await new Promise((resolve) => {
            timer.value.scroller = setInterval(() => {
                let target = months.value.find(
                    (item) => item.year == val.year && item.no == 0
                );
                if (target == undefined) {
                    if (val.year < currentRange.value.year) {
                        loadPrev();
                    } else loadNext();
                    return 0;
                }
                let index = months.value.indexOf(target);
                let height = Math.floor(index / 4) * props.size;
                if (main.value?.scrollTop !== undefined) {
                    let speed = -Math.floor(
                        (main.value.scrollTop - height) / 7
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
            }, 30);
        });
    }
    const scrollBottomToLoadInit = (offset = 0) => {
        let target = main.value;
        target?.addEventListener('scroll', (event) => {
            if (
                target.scrollTop + offset >=
                target.scrollHeight - target.clientHeight
            )
                loadNext();
        });
    }
    const scrollTopToLoadInit = (offset = 0) => {
        let target = main.value;
        target?.addEventListener('scroll', (event) => {
            if (target.scrollTop <= 80) loadPrev();
        });
    }
    const rangeTimerInit = () => {
        clearInterval(timer.value.updateRange);
        timer.value.updateRange = setInterval(() => {
            try {
                if (main.value?.scrollTop !== undefined) {
                    let scrollTop = main.value.scrollTop;
                    scrollTop = scrollTop + props.size * 2;
                    scrollTop = (scrollTop / props.size) * 4;
                    scrollTop = Math.floor(scrollTop);
                    currentRange.value = months.value[scrollTop + 3];
                }
            } catch (e) {
                currentRange.value = {
                    year: 0,
                    no: 0,
                    name: monthList[0][lang.value === 'zh' ? 'zh' : 'en']
                };
            }
        }, 300);
    }
    const choose = (item: RangeItem) => {
        emits("choose", item)
    }

    return {
        theme,
        FR,
        uR,
        thisValue,
        months,
        currentRange,
        timer,
        lock,
        year,
        month,
        date,
        nowYear,
        nowMonth,
        nowDate,
        FRInit,
        main,
        monthsInit,
        slide,
        loadPrev,
        loadNext,
        scrollBottomToLoadInit,
        scrollTopToLoadInit,
        rangeTimerInit,
        choose
    }
}
