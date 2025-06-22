import { commonProps } from "@/packages/common/props";
import { useRevealCache } from "@/store/reveal";
import { EmitFn } from "@/types/components";
import { isDefined, sleep, useTheme } from "@/utils/common";
import { SDate } from "@/utils/common/usual";
import { ExtractPropTypes, PropType, computed, ref, watch } from "vue";

export const calendarViewYearBoxProps = {
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

export type CalendarViewYearBoxProps = ExtractPropTypes<typeof calendarViewYearBoxProps>

export const calendarViewYearBoxEmits = {
    "choose": (val: number) => {
        return true;
    },
    'range-change': (val: number) => {
        return true
    }
}

export type CalendarViewYearBoxEmits = typeof calendarViewYearBoxEmits;

export const useCalendarViewYearBox = (props: CalendarViewYearBoxProps, emits: EmitFn<CalendarViewYearBoxEmits>) => {
    const { theme } = useTheme(props)
    const FR = ref<any>();
    const uR = useRevealCache();
    uR.initRevealInstances();
    const thisValue = ref<Date>(SDate.Parse(SDate.DateToString(
        props.value
    )))
    const years = ref<Array<number>>([]);
    const currentRange = ref(0);
    watch(() => currentRange.value, (newVal: number, oldVal: number) => {
        emits("range-change", newVal)
    })
    const timer = ref<{
        updateRange?: number | NodeJS.Timeout
        scroller?: number | NodeJS.Timeout
    }>({
        updateRange: undefined,
        scroller: undefined
    })
    const lock = ref<{
        slide: boolean
    }>({
        slide: true
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
    const yearsInit = () => {
        const y = []
        let num = year.value - 8
        for (let i = 0; i < 28; ++i) {
            y.push(num)
            num++;
        }
        years.value = y
    }
    const loadPrev = async () => {
        let num = years.value[0];
        if (num == props.start) return 0;
        for (let i = 0; i < 16; i++) {
            if (num <= props.start) return 0;
            num--;
            years.value.splice(0, 0, num);
        }
        await sleep(30);
        if (main.value?.scrollTop !== undefined) {
            main.value.scrollTop =
                main.value.scrollTop + (16 / 4) * props.size;
        }
    }
    const loadNext = async () => {
        let num = years.value[years.value.length - 1];
        if (num == props.end) return 0;
        for (let i = 0; i < 16; i++) {
            if (num >= props.end) return 0;
            num++;
            years.value.push(num);
        }
        await sleep(30);
    }
    const slide = async (val: number) => {
        if (!lock.value.slide) return 0;
        lock.value.slide = false;
        clearInterval(timer.value.scroller);
        return await new Promise((resolve) => {
            timer.value.scroller = setInterval(() => {
                let index = years.value.indexOf(val);
                if (index == -1) {
                    if (val < currentRange.value) {
                        loadPrev();
                    } else loadNext();
                }
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
    const scrollBottomToLoadInit = (offset: number = 0) => {
        let target = main.value;
        if (target !== undefined) {
            target.addEventListener("scroll", (event) => {
                if (isDefined(target) && isDefined(target.scrollTop) && isDefined(target.scrollHeight) && isDefined(target.clientHeight) && 
                    target.scrollTop + offset >=
                    target.scrollHeight - target.clientHeight
                )
                    loadNext();
            })
        }
    }
    const scrollTopToLoadInit = (offset: number = 0) => {
        let target = main.value
        if (target !== undefined) {
            target.addEventListener('scroll', (event) => {
                if (target!==undefined && target.scrollTop <= 80) loadPrev();
            });
        }
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
                    currentRange.value =
                        Math.floor(years.value[scrollTop] / 10) * 10;
                }
            } catch (e) {
                currentRange.value = 0;
            }
        }, 300);
    }
    const choose = (item: number) => {
        emits("choose", item)
    }
    return {
        uR,
        thisValue,
        years,
        currentRange,
        timer,
        year,
        month,
        date,
        nowYear,
        nowMonth,
        nowDate,
        borderLightColor,
        backgroundLightColor,
        main,
        FRInit,
        loadNext,
        loadPrev,
        slide,
        scrollBottomToLoadInit,
        scrollTopToLoadInit,
        rangeTimerInit,
        choose,
        yearsInit,
        FR
    }
}