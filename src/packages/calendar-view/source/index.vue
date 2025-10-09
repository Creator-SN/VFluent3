<template>
    <div
        class="fv-CalendarView"
        :class="[$theme]"
        :style="{
            background: background,
            '--btn-border-radius': computedBorderRadius,
            '--highlight-background': nowDayColor ? nowDayColor : foreground,
            '--choosen-background': foreground,
            '--range-choose-background-fe': rangeChooseColorFE
                ? rangeChooseColorFE
                : foreground,
            '--range-choose-background-middle': rangeChooseColorMiddle
                ? rangeChooseColorMiddle
                : foreground
        }"
    >
        <div class="fv-calendar-control-block">
            <p class="calendar-switcher" @click="switchBack">
                <slot
                    name="statement"
                    :value="statement"
                    :dayRange="currentRange"
                >
                    {{ statement }}
                </slot>
            </p>
            <div class="slider-bar">
                <span class="slider-btn" @click="slideUp">
                    <i class="ms-Icon ms-Icon--CaretSolidUp"></i>
                </span>
                <span class="slider-btn" @click="slideDown">
                    <i class="ms-Icon ms-Icon--CaretSolidDown"></i>
                </span>
            </div>
        </div>
        <div class="container-block">
            <transition-group :name="transitionList[transitionStatus]">
                <year-selector
                    v-if="status == 'year'"
                    v-model="thisValue"
                    :theme="$theme"
                    ref="yearRef"
                    key="1"
                    :background="background"
                    @range-change="updateRange"
                    @chooseItem="chooseItem"
                ></year-selector>
                <month-selector
                    v-if="status == 'month'"
                    v-model="thisValue"
                    :theme="$theme"
                    ref="monthRef"
                    key="2"
                    :monthList="monthList"
                    :background="background"
                    @range-change="updateRange"
                    @chooseItem="chooseItem"
                ></month-selector>
                <date-selector
                    v-if="status == 'date'"
                    v-model="thisValue"
                    :theme="$theme"
                    :multiple="multiple"
                    :choosenDates="thisChoosenDates"
                    ref="dayRef"
                    key="3"
                    :weekdays="weekdays"
                    @range-change="updateRange"
                    @chooseItem="chooseItem"
                >
                    <template v-slot:weekday_content="x">
                        <slot name="weekday_content" :value="x.value">
                            {{ x.value.slice(0, 3) }}
                        </slot>
                    </template>
                </date-selector>
            </transition-group>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, computed, watch } from 'vue';
import { commonProps } from '@/packages/common/props';
import { useTheme } from '@/utils/common';
import yearSelector from './sub/yearSelector/index.vue';
import monthSelector from './sub/monthSelector/index.vue';
import dateSelector from './sub/dateSelector/index.vue';

defineOptions({
    name: 'FvCalendarView'
});

const emits = defineEmits([
    'update:modelValue',
    'update:choosenDates',
    'choose-year',
    'choose-month',
    'choose-date',
    'choosen-dates',
    'choosen-dates-obj'
]);

const props = defineProps({
    ...commonProps,
    modelValue: {
        default: () => new Date()
    },
    start: {
        default: 1900
    },
    weekdays: {
        default: () => ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
    },
    monthList: {
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
    multiple: {
        default: 'single'
    },
    choosenDates: {
        default: () => []
    },
    background: {
        default: ''
    },
    borderRadius: {
        default: ''
    },
    foreground: {
        default: ''
    },
    nowDayColor: {
        default: ''
    },
    rangeChooseColorFE: {
        default: ''
    },
    rangeChooseColorMiddle: {
        default: ''
    }
});

const $theme = computed(() => {
    return useTheme(props).theme.value;
});
const computedBorderRadius = computed(() => {
    if (props.borderRadius.includes('px', '%', 'rem'))
        return props.borderRadius;
    let val = parseFloat(props.borderRadius);
    if (val.toString() !== 'NaN') return `${val}px`;
    return '';
});
const status = ref('date');
const thisValue = ref(new Date(props.modelValue));
watch(
    () => props.modelValue,
    () => {
        thisValue.value = props.modelValue;
    }
);
const thisChoosenDates = ref(props.choosenDates);
watch(
    () => props.choosenDates,
    () => {
        thisChoosenDates.value = props.choosenDates;
    }
);
watch(
    thisChoosenDates,
    () => {
        emits('update:choosenDates', thisChoosenDates.value);
        emits('choosen-dates-obj', thisChoosenDates.value);
        let simpleObjs = [];
        for (let item of thisChoosenDates.value) {
            simpleObjs.push({
                year: item.getFullYear(),
                month: item.getMonth(),
                no: item.getDate()
            });
        }
        emits('choosen-dates', simpleObjs);
    },
    { deep: true }
);
const transitionList = ref({
    out: 'fv-calendar-scale-down',
    in: 'fv-calendar-scale-up'
});
const transitionStatus = ref('out');
const currentRange = ref({
    year: thisValue.value.getFullYear(),
    month: thisValue.value.getMonth()
});
const yearRef = ref(null);
const monthRef = ref(null);
const dayRef = ref(null);
const statement = computed(() => {
    if (status.value == 'date') {
        return `${props.monthList[currentRange.value.month]} ${
            currentRange.value.year
        }`;
    } else if (status.value == 'month') return `${currentRange.value.year}`;
    return `${parseInt(currentRange.value.year / 10) * 10} - ${
        parseInt(currentRange.value.year / 10) * 10 + 9
    }`;
});

const switchBack = () => {
    transitionStatus.value = 'out';
    if (status.value == 'date') status.value = 'month';
    else if (status.value == 'month') status.value = 'year';
};
const switchIn = () => {
    transitionStatus.value = 'in';
    if (status.value == 'year') status.value = 'month';
    else if (status.value == 'month') status.value = 'date';
};

const updateRange = (date) => {
    currentRange.value = {
        year: date.getFullYear(),
        month: date.getMonth()
    };
};

const getDateRange = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const result = [];

    const step = startDate <= endDate ? 1 : -1;
    let current = new Date(startDate);

    while (
        (step === 1 && current <= endDate) ||
        (step === -1 && current >= endDate)
    ) {
        result.push(new Date(current));
        current.setDate(current.getDate() + step);
    }

    return result;
};

const chooseItem = (cell) => {
    if (status.value === 'date') {
        emits('choose-date', cell.date);
        if (props.multiple == 'single')
            thisChoosenDates.value.splice(
                0,
                thisChoosenDates.value.length,
                cell.date
            );
        else if (props.multiple == 'multiple') {
            let exists = thisChoosenDates.value.findIndex(
                (it) =>
                    it.getFullYear() === cell.date.getFullYear() &&
                    it.getMonth() === cell.date.getMonth() &&
                    it.getDate() === cell.date.getDate()
            );
            if (exists > -1) thisChoosenDates.value.splice(exists, exists + 1);
            else thisChoosenDates.value.push(cell.date);
        } else if (props.multiple == 'range') {
            if (thisChoosenDates.value.length < 1)
                thisChoosenDates.value.push(cell.date);
            else {
                thisChoosenDates.value.sort((a, b) => {
                    return a.getTime() - b.getTime();
                });

                if (
                    cell.date <=
                    thisChoosenDates.value[thisChoosenDates.value.length - 1]
                )
                    thisChoosenDates.value.splice(
                        0,
                        thisChoosenDates.value.length,
                        cell.date
                    );
                else {
                    const range = getDateRange(
                        thisChoosenDates.value[0],
                        cell.date
                    );
                    thisChoosenDates.value.splice(
                        0,
                        thisChoosenDates.value.length,
                        ...range
                    );
                }
            }
        }
        emits('update:modelValue', thisValue.value);
    } else {
        thisValue.value = cell.date;
        if (status.value == 'year') {
            emits('choose-year', cell.date.getFullYear());
        } else emits('choose-month', cell.date.getMonth());
    }
    switchIn();
};

const slideUp = () => {
    if (status.value === 'date') {
        dayRef.value.slideUp();
    } else if (status.value === 'month') {
        monthRef.value.slideUp();
    } else if (status.value === 'year') {
        yearRef.value.slideUp();
    }
};

const slideDown = () => {
    if (status.value === 'date') {
        dayRef.value.slideDown();
    } else if (status.value === 'month') {
        monthRef.value.slideDown();
    } else if (status.value === 'year') {
        yearRef.value.slideDown();
    }
};
</script>
