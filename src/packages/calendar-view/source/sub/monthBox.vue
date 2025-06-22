<script lang="ts" setup>
import { onBeforeUnmount, onMounted, onUnmounted } from 'vue';
import { calendarViewMonthBoxProps, calendarViewMonthBoxEmits, useCalendarViewMonthBox } from './monthBox';
const props = defineProps(calendarViewMonthBoxProps)
const emits = defineEmits(calendarViewMonthBoxEmits)

const { FRInit, monthsInit, scrollBottomToLoadInit, rangeTimerInit, scrollTopToLoadInit, timer, main, uR, FR, months, currentRange, nowYear, nowMonth, choose, slide } = useCalendarViewMonthBox(props, emits)

onMounted(() => {
    FRInit();
    monthsInit();
    scrollBottomToLoadInit(80);
    scrollTopToLoadInit();
    rangeTimerInit();
})
onBeforeUnmount(() => {
    clearInterval(timer.value.updateRange);
    uR.revealMaskedJs.destroy(FR);
})

defineExpose({
    slide
})

</script>

<template>
    <div class="picker-container" ref="main">
        <button v-for="(item, index) in months" :key="`year: ${index}`" class="picker-btn"
            :class="{ range: item.year === currentRange.year, current: item.year === nowYear && item.no === nowMonth }"
            @click="choose(item)">{{ item.name }}</button>
    </div>
</template>