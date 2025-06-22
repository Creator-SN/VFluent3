<script lang="ts" setup>

import { onBeforeUnmount, onMounted, onUnmounted } from 'vue';
import { calendarViewDateBoxProps, calendarViewDateBoxEmits, useCalendarViewDateBox } from './dateBox';

const emits = defineEmits(calendarViewDateBoxEmits)
const props = defineProps(calendarViewDateBoxProps)

const { weekdays, days, currentRange, nowMonth, nowYear, nowDate, isChoose, choose, FRInit, daysInit, scrollBottomToLoadInit, scrollTopToLoadInit, rangeTimerInit, uR, FR, timer, root, main, slide } = useCalendarViewDateBox(props, emits)

onMounted(() => {
    FRInit();
    daysInit();
    scrollBottomToLoadInit(80);
    scrollTopToLoadInit();
    rangeTimerInit();
})
onBeforeUnmount(() => {
    clearInterval(timer.value.updateRange);
    clearInterval(timer.value.scroller);
    uR.revealMaskedJs.destroy(FR);
})

defineExpose({
    slide
})
</script>

<template>
    <div ref="root" class="day-block">
        <div class="weekdays-block">
            <button v-for="(weekday, index) in weekdays[lang === 'zh' ? 'zh' : 'en']" class="weekday"
                :key="`weekday: ${index}`">{{ weekday }}</button>
        </div>
        <div class="picker-container" ref="main">
            <button v-for="(item, index) in days" :key="`day: ${index}`" class="picker-btn day"
                :class="{ range: item.year == currentRange.year && item.month == currentRange.month, current: item.year == nowYear && item.month == nowMonth && item.no == nowDate, choose: isChoose(item) }"
                :title="`${item.year}/${item.month + 1}/${item.no}`" @click="choose(item)">{{ item.no }}</button>
        </div>
    </div>
</template>