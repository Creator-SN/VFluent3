<script lang="ts" setup>
import dateBox from './sub/dateBox.vue';
import monthBox from './sub/monthBox.vue';
import yearBox from './sub/yearBox.vue';
import { useTheme } from '@/utils/common';
import { calendarViewEmits, calendarViewProps, useCalendarView } from '.';
defineOptions({
    name: "FvCalendarView"
})

const emits = defineEmits(calendarViewEmits)
const props = defineProps(calendarViewProps)

const { theme } = useTheme(props)

const { switchView, statement, slideUp, slideDown, transitionName, status, thisValue, yearRange, monthRange, dayRange, chooseYear, chooseMonth, chooseDate, year, month, day } = useCalendarView(props, emits)

</script>

<template>
    <div class="fv-CalendarView" :class="[theme]">
        <div class="fv-calendar-control-block">
            <p class="calendar-switcher" @click="switchView">{{ statement }}</p>
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
            <transition-group :name="transitionName">
                <year-box v-if="status == 'year'" v-model="thisValue" :theme="theme" :lang="lang" ref="year" key="1"
                    @range-change="yearRange = $event" @choose="chooseYear"></year-box>
                <month-box v-if="status == 'month'" v-model="thisValue" :theme="theme" :lang="lang" ref="month" key="2"
                    @range-change="monthRange = $event" @choose="chooseMonth"></month-box>
                <date-box v-if="status == 'date'" v-model="thisValue" :theme="theme" :lang="lang" :multiple="multiple"
                    ref="day" key="3" @range-change="dayRange = $event" @choosen-dates="emits('choosen-dates', $event)"
                    @choose="chooseDate"></date-box>
            </transition-group>
        </div>
    </div>
</template>
