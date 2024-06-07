import { commonProps } from '@/packages/common/props';
import { computed, ExtractPropTypes, PropType, ref, watch } from 'vue';
import { EmitFn } from '@/types/components';
import { SDate} from '@/utils/common/usual';
import { getLanguage } from '@/utils/common/browser';
import dateBox from './sub/dateBox.vue';
import monthBox from './sub/monthBox.vue';
import yearBox from './sub/yearBox.vue';

const monthList = {
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    zh: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
}

export const calendarViewProps = {
    ...commonProps,
    modelValue:{
        type: Object as PropType<Date>,
        default: ()=>new Date()
    },
    start: {
        type: Number,
        default: 1900
    },
    end: {
        type: Number,
        default: 3000
    },
    multiple: {
        type: String,
        default: "single"
    }
}

export type CalendarViewProps = ExtractPropTypes<typeof calendarViewProps>;

export const calendarViewEmits = {
    "update:modelValue":(val:Date)=>{
        return true;
    },
    "choose-year": (val: number)=>{
        return true
    },
    "choose-month": (val: Date)=>{
        return true
    },
    "choose-date": (val: Date)=>{
        return true
    },
    "choosen-dates": (val: Array<Date>)=>{
        return true;
    }
}

export type CalendarViewEmits = typeof calendarViewEmits

export const useCalendarView = (props: CalendarViewProps, emits: EmitFn<CalendarViewEmits>) => {
    const status = ref<'date' | 'month' | 'year'>('date')
    const thisValue = ref<Date>(props.modelValue)
    const yearRange = ref(new Date().getFullYear())
    const monthRange = ref({
        year: new Date().getFullYear(), 
        no: new Date().getMonth()
    })
    const dayRange = ref({
        year: new Date().getFullYear(), month: new Date().getMonth(), no: 1
    })
    const transitionName = ref<string>("fv-calendar-scale-down")
    watch(()=>props.modelValue, (newVal:Date, oldVal: Date)=>{
        if (SDate.IsSameDate(oldVal, newVal)){
            thisValue.value = SDate.Parse(SDate.DateToString(newVal))
        }
    })
    const year = ref<InstanceType<typeof yearBox>>();
    const month = ref<InstanceType<typeof monthBox>>();
    const day = ref<InstanceType<typeof dateBox>>();
    const statement = computed(()=>{
        const lang = props.lang==='global'? getLanguage():props.lang;
        if (status.value ==='date'){  
            if (lang === 'zh'){
                return `${dayRange.value.year}年${dayRange.value.month + 1}日`;
            }else{
                return `${monthList['en'][dayRange.value.month]} ${dayRange.value.year}`
            }
        }else if (status.value === 'month'){
            if (lang==='zh'){
                return `${monthRange.value.year}年`
            }else{
                return `${monthRange.value.year}`
            }
        }
        return `${yearRange.value} - ${yearRange.value + 9}`;
    })
    const daySlide = (a:number = 1)=>{
        let d = SDate.Parse(`${dayRange.value.year}-${dayRange.value.month + 1}-${dayRange.value.no} 0:0:0`)
        d.setDate(1);
        d.setMonth(d.getMonth() + a)
        day.value?.slide({
            year: d.getFullYear(),
            month: d.getMonth(),
            no: d.getDate()
        })
    }
    const slideUp = ()=>{
        if (status.value === 'year'){
            year.value?.slide(yearRange.value - 10)
        }else if (status.value === 'month'){
            monthRange.value.year +=1 
            month.value?.slide(monthRange.value)
        }else{
            daySlide(-1)
        }
    }
    const slideDown = ()=>{
        if (status.value === 'year'){
            year.value?.slide(yearRange.value + 10)
        }else if (status.value === 'month'){
            monthRange.value.year +=1;
            month.value?.slide(monthRange.value)
        }else{
            daySlide()
        }
    }
    const switchView = ()=>{
        transitionName.value = 'fv-calendar-scale-down'
        if (status.value === 'date'){
            status.value = 'month'
        }else if (status.value === 'month'){
            status.value = 'year'
        }
    }
    const chooseYear = (item:number)=>{
        transitionName.value = 'fv-calendar-scale-up'
        thisValue.value.setFullYear(item)
        status.value = 'month'
        emits("choose-year", item)
    }
    const chooseMonth = (item: typeof monthRange.value)=>{
        transitionName.value = 'fv-calendar-scale-up'
        thisValue.value.setDate(1)
        thisValue.value.setMonth(item.no)
        thisValue.value.setFullYear(item.year)
        status.value = 'date'
        emits("choose-month", thisValue.value)
    }
    const chooseDate = (item: typeof dayRange.value)=>{
        thisValue.value.setDate(item.no)
        thisValue.value.setMonth(item.month)
        thisValue.value.setFullYear(item.year)
        emits("choose-date", thisValue.value);
        emits("update:modelValue", SDate.Parse(SDate.DateToString(thisValue.value)))
    }
    return {
        status,
        thisValue,
        yearRange,
        monthRange,
        dayRange,
        transitionName,
        year,
        month,
        day,
        statement,
        daySlide,
        slideUp,
        slideDown,
        switchView,
        chooseYear,
        chooseMonth,
        chooseDate
    }
}
