import { commonProps } from '@/packages/common/props';
import { computed, ExtractPropTypes, nextTick, PropType, ref, watch } from 'vue';
import { EmitFn } from '@/types/components';
import { clickOutside, isDefined, isNotNull } from '@/utils/common';

export const datePickerProps = {
    ...commonProps,
    modelValue: {
        type: Object as PropType<Date>,
        default: () => new Date(1970, 0, 1)
    },
    disabled: {
        type: Boolean,
        default: false
    },
    hideMonth: {
        type: Boolean,
        default: false
    },
    hideDay: {
        type: Boolean,
        default: false
    },
    hideYear: {
        type: Boolean,
        default: false
    },
    showWeek: {
        type: Boolean,
        default: false
    },
    // Custom Month
    months: {
        type: Array as PropType<Array<string>>,
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
    // Custom Weeks
    weeks: {
        type: Array as PropType<Array<string>>,
        default: () => [
            'Sun.',
            'Mon.',
            'Tue.',
            'Wed.',
            'Thu.',
            'Fri.',
            'Sat.'
        ]
    },
    hoverColor: {
        type: String,
        default: undefined
    },
    inputBackground: {
        type: String,
        default: ''
    },
    selectedBackground: {
        type: String,
        default: ''
    },
    optionBackground: {
        type: String,
        default: ''
    },
    innerBorderColor: {
        type: String,
        default: '#cccccc'
    }
}

export type DatePickerProps = ExtractPropTypes<typeof datePickerProps>;

export const datePickerEmits = {
    "update:modelValue":(val:Date)=>{
        return true;
    },
    "change":(val: Date)=>{
        return true;
    },
    "focus":()=>{
        return true;
    }
}

export type DatePickerEmits = typeof datePickerEmits

export const useDatePicker = (props: DatePickerProps, emits: EmitFn<DatePickerEmits>) => {
    const popper = ref({
        show: false,
        month: true
    })
    const selected = ref<{
        date: Date
    }>({
        date: new Date(props.modelValue)
    })
    const options = ref<{
        month: number[],
        day: number[],
        year: number[]
    }>({
        month: [],
        day:[],
        year:[]
    })
    const optionsConfig = ref<{
        month:{
            slideLock: boolean
            scroll?: ()=>void
        },
        day:{
            slideLock: boolean,
            scroll?: ()=>void
        },
        year:{
            slideLock: boolean,
            scroll?: ()=>void
        }
    }>({
        month:{
            slideLock: false,
        },
        day:{
            slideLock: false,
        },
        year:{
            slideLock: false
        }
    })
    const config = ref({
        minDate: new Date(1970,0,1),
        maxDate: new Date(2099,12,31),
        buffer: 5,
        clickLock: false,
        scrollLock: false,

    })
    const style = ref({
        dayCol: {},
        monthCol: {},
        yearCol: {}
    })
    const root = ref<HTMLElement>();
    const windowEvent = {
        click: (evt:Event)=>{
            if (!popper.value.show || config.value.clickLock) return;
            if (clickOutside(evt.target as HTMLElement, root.value)){
                popper.value.show = false;
            }
        }
    }
    watch(()=>popper.value.show, (newVal, oldVal)=>{
        if (newVal){
            selected.value.date = new Date(props.modelValue)
            emits("focus")
        }
    })
    const dayElement = ref<HTMLElement>()
    const yearElement = ref<HTMLElement>()
    const monthElement = ref<HTMLElement>()
    const nPrev = (num: number, size: number, next = 1, offset = 1) => {
        let offsetSize = next * size;
        return ((num + offsetSize - offset - next) % size) + offset;
    }
    const nNext  = (num: number, size: number, next = 1, offset = 1) => {
        let offsetSize = offset * size;
        return ((num + offsetSize + next - offset) % size) + offset;
    }
    const dayRangeFunc = (date: Date) => {
        date = new Date(date);
        date.setDate(1);
        date.setMonth(date.getMonth() + 1);
        date.setDate(0);
        return date.getDate();
    }
    const slideCol = async (origin: number, element: HTMLElement | undefined, nxtCallback:()=>void, preCallback:()=>void) => {
        if (isDefined(element?.scrollTop)){
            if (Math.abs(element.scrollTop - origin) >= 20) {
                if (element.scrollTop > origin) {
                    nxtCallback();
                } else {
                    preCallback();
                }
                return await new Promise((resolve) =>
                    nextTick(() => {
                        element.scrollTop = origin;
                        resolve(0);
                    })
                );
            }
        }
    }
    const adjustDay = (from:Date, to:Date)=> {
        let range = dayRangeFunc(to);
        if (from.getDate() > range) {
            from.setDate(range);
        }
    }
    const adjustYear = (year: number) =>{
        if (
            year < config.value.minDate.getFullYear() ||
            year > config.value.maxDate.getFullYear()
        ) {
            return -year;
        }
        return year;
    }
    const setDayOptions = () => {
        let dayRange = dayRangeFunc(selected.value.date);
        let day = selected.value.date.getDate();
        let end = nNext(day, dayRange,config.value.buffer + 1);
        options.value.day = [];
        for (
            let i = nPrev(day, dayRange, config.value.buffer);
            i != end;
            i = nNext(i, dayRange)
        ) {
            options.value.day.push(i);
        }
        nextTick(() => {
            if (isDefined(dayElement.value)){
            let origin = (dayElement.value.scrollTop =
                40 * (config.value.buffer - 4));
            if (isDefined(optionsConfig.value.day.scroll)) {
                dayElement.value.removeEventListener(
                    'scroll',
                    optionsConfig.value.day.scroll
                );
            }
            optionsConfig.value.day.scroll = () => {
                if (optionsConfig.value.day.slideLock) return;
                slideCol(
                    origin,
                    dayElement.value,
                    () => {
                        options.value.day.shift();
                        let day = selected.value.date.getDate();
                        selected.value.date.setDate(
                            nNext(day, dayRange, 1)
                        );
                        options.value.day.push(
                            nNext(
                                day,
                                dayRange,
                                config.value.buffer + 1
                            )
                        );
                    },
                    () => {
                        options.value.day.pop();
                        let day = selected.value.date.getDate();
                        selected.value.date.setDate(
                            nPrev(day, dayRange, 1)
                        );
                        options.value.day.unshift(
                            nPrev(
                                day,
                                dayRange,
                                config.value.buffer + 1
                            )
                        );
                    }
                );
            };
            dayElement.value?.addEventListener(
                'scroll',
                optionsConfig.value.day.scroll
            );
        }
        });
    }
    const setYearOptions = () => {
        let year = selected.value.date.getFullYear() - config.value.buffer;
        let end = year + 2 * config.value.buffer + 1;
        options.value.year = [];
        for (let i = year; i < end; ++i) {
            options.value.year.push(adjustYear(i));
        }
        nextTick(() => {
            if (isDefined(yearElement.value)){
            let origin = (yearElement.value.scrollTop =
                (config.value.buffer - 4) * 40);
            if (optionsConfig.value.year.scroll) {
                yearElement.value.removeEventListener(
                    'scroll',
                    optionsConfig.value.year.scroll
                );
            }
            optionsConfig.value.year.scroll = async () => {
                if (optionsConfig.value.year.slideLock) {
                    return;
                }
                optionsConfig.value.year.slideLock = true;
                if (isDefined(yearElement.value)){
                if (yearElement.value.scrollTop - origin > 0) {
                    if (
                        adjustYear(
                            selected.value.date.getFullYear() + 1
                        ) < 0
                    ) {
                        yearElement.value.scrollTop = origin;
                        optionsConfig.value.year.slideLock = false;
                        return;
                    }
                } else {
                    if (
                        adjustYear(
                            selected.value.date.getFullYear() - 1
                        ) < 0
                    ) {
                        yearElement.value.scrollTop = origin;
                        optionsConfig.value.year.slideLock = false;
                        return;
                    }
                }
                await slideCol(
                    origin,
                    yearElement.value,
                    () => {
                        options.value.year.shift();
                        let year = selected.value.date.getFullYear();
                        adjustDay(
                            selected.value.date,
                            new Date(
                                year + 1,
                                selected.value.date.getMonth()
                            )
                        );
                        selected.value.date.setFullYear(year + 1);
                        options.value.year.push(
                            adjustYear(year + config.value.buffer + 1)
                        );
                    },
                    () => {
                        options.value.year.pop();
                        let year = selected.value.date.getFullYear();
                        adjustDay(
                            selected.value.date,
                            new Date(
                                year - 1,
                                selected.value.date.getMonth()
                            )
                        );
                        selected.value.date.setFullYear(year - 1);
                        options.value.year.unshift(
                            adjustYear(year - config.value.buffer - 1)
                        );
                    }
                );
                setDayOptions();
                optionsConfig.value.year.slideLock = false;
            }
            };
            yearElement.value.addEventListener(
                'scroll',
                optionsConfig.value.year.scroll
            );
        }
        });
    }
    const setMonthOptions = ()=>{
        let month = selected.value.date.getMonth()
        let end = nNext(month, 12, config.value.buffer + 1, 0);
        options.value.month = [];
        for (
            let i = nPrev(month, 12, config.value.buffer, 0);
            i != end;
            i = nNext(i, 12, 1, 0)
        ) {
            options.value.month.push(i);
        }
        nextTick(() => {
            if (isDefined(monthElement.value)){
                let origin = (monthElement.value.scrollTop =
                    (config.value.buffer - 4) * 40);
                if (optionsConfig.value.month.scroll) {
                    monthElement.value.removeEventListener(
                        'scroll',
                        optionsConfig.value.month.scroll
                    );
                }
                optionsConfig.value.month.scroll = () => {
                    if (optionsConfig.value.month.slideLock) return;
                    slideCol(
                        origin,
                        monthElement.value,
                        () => {
                            options.value.month.shift();
                            let month = selected.value.date.getMonth();
                            adjustDay(
                                selected.value.date,
                                new Date(
                                    selected.value.date.getFullYear(),
                                    nNext(month, 12, 1, 0)
                                )
                            );
                            selected.value.date.setMonth(
                                nNext(month, 12, 1, 0)
                            );
                            options.value.month.push(
                                nNext(month, 12, config.value.buffer + 1, 0)
                            );
                        },
                        () => {
                            options.value.month.pop();
                            let month = selected.value.date.getMonth();
                            adjustDay(
                                selected.value.date,
                                new Date(
                                    selected.value.date.getFullYear(),
                                    nPrev(month, 12, 1, 0)
                                )
                            );
                            selected.value.date.setMonth(
                                nPrev(month, 12, 1, 0)
                            );
                            options.value.month.unshift(
                                nPrev(month, 12, config.value.buffer + 1, 0)
                            );
                        }
                    );
                    setDayOptions();
                }
                monthElement.value?.addEventListener(
                    'scroll',
                    optionsConfig.value.month.scroll
                );
            } 
        })

    }
    const focus = ()=>{
        if (props.disabled) return;
        popper.value.show = true;
    }
    const confirm = () => {
        emits('update:modelValue', new Date(selected.value.date));
        emits('change', new Date(selected.value.date));
        popper.value.show = false;
    }
    const cancel = ()=> {
        popper.value.show = false;
    }
    const weekIndex = (day: number)=> {
        let date = new Date(selected.value.date);
        date.setDate(day);
        return date.getDay();
    }
    const clickItem = (col: HTMLElement | undefined, index: number)=>{
        if (config.value.clickLock) return;
        config.value.clickLock = true;
        // imitation scroll
        if (isDefined(col)){
            col.scrollTop = (config.value.buffer - 4) * 40;
            let origin = col.scrollTop;
            col.scrollTop += index - 5; // init important
            let count = Math.abs(index - 5);
            if (count > 0) {
                let timeout = setInterval(() => {
                    if (col.scrollTop == origin) {
                        --count;
                        if (!count) {
                            config.value.clickLock = false;
                            clearInterval(timeout);
                            return;
                        }
                    }
                    config.value.scrollLock = true;
                    col.scrollTop += (index - 5) * 3;
                }, 20);
            } else {
                config.value.clickLock = false;
            }
        }
    }
    const hover = (isHover: boolean, element:HTMLElement) => {
        const el = element as (HTMLElement & {
            hoverStatus?: boolean
            backgroundColor?: string 
        })
        if (props.hoverColor !== undefined) {
            if (isHover) {
                if (
                    el.hoverStatus === false ||
                    el.hoverStatus === undefined
                ) {
                    // store if inner style background is set
                    if (element.style.backgroundColor)
                        el.backgroundColor =
                            element.style.backgroundColor;
                    element.style.backgroundColor = props.hoverColor;
                }
            } else {
                // restore inner style background
                if (el.backgroundColor !== undefined)
                    element.style.backgroundColor = el.backgroundColor;
                // restore if inner style is not set, set null to use external css
                else element.style.backgroundColor = ''
            }
            el.hoverStatus = isHover;
        }
    }
    const hoverUpAndDown  =  (isHover: boolean, element:HTMLElement) =>{
        // find btn.fv-DatePicker__input-options-col-down or btn.fv-DatePicker__input-options-col-up
        let up = element.querySelector(
            '.fv-DatePicker__input-options-col-down'
        ) as (HTMLElement | null) & ({
            hoverStatus: boolean
            backgroundColor: string
        })
        let down = element.querySelector(
            '.fv-DatePicker__input-options-col-up'
        ) as (HTMLElement | null) & ({
            hoverStatus: boolean
            backgroundColor: string
        });
        if (isHover) {
            if (isNotNull(up)){
                if (up.hoverStatus === false || up.hoverStatus === undefined) {
                    // store if inner style background is set
                    if (up.style.backgroundColor)
                        up.backgroundColor = up.style.backgroundColor;
                    if (isDefined(props.hoverColor))
                        up.style.backgroundColor = props.hoverColor;
                }
                if (
                    down.hoverStatus === false ||
                    down.hoverStatus === undefined
                ) {
                    // store if inner style background is set
                    if (down.style.backgroundColor)
                        down.backgroundColor = down.style.backgroundColor;
                    if (isDefined(props.hoverColor))
                        down.style.backgroundColor = props.hoverColor;
                }
            }
        } else {
            // restore inner style background
            if (up.backgroundColor !== undefined)
                up.style.backgroundColor = up.backgroundColor;
            // restore if inner style is not set, set null to use external css
            else up.style.backgroundColor = ''
            if (down.backgroundColor !== undefined)
                down.style.backgroundColor = down.backgroundColor;
            // restore if inner style is not set, set null to use external css
            else down.style.backgroundColor = ''
        }
        up.hoverStatus = isHover;
        down.hoverStatus = isHover;
    }
    const init = ()=>{
        if (!props.hideMonth) setMonthOptions()
        if (!props.hideDay) setDayOptions()
        if (!props.hideYear) setYearOptions()
    }
    return {
        popper,
        selected,
        options,
        optionsConfig,
        config,
        style,
        windowEvent,
        init,
        nNext,
        nPrev,
        setMonthOptions,
        setDayOptions,
        setYearOptions,
        dayRangeFunc,
        slideCol,
        adjustDay,
        adjustYear,
        focus,
        confirm,
        cancel,
        clickItem,
        weekIndex,
        hover,
        hoverUpAndDown,
        dayElement,
        monthElement,
        yearElement,
        root
    }
}
