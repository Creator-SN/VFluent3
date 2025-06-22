<script lang='ts' setup>
import { onBeforeUnmount, onMounted } from 'vue';
import { calendarViewYearBoxEmits, calendarViewYearBoxProps, useCalendarViewYearBox } from './yearBox';


const props = defineProps(calendarViewYearBoxProps)
const emits = defineEmits(calendarViewYearBoxEmits)

const { FRInit, FR, uR, yearsInit, scrollBottomToLoadInit, scrollTopToLoadInit, rangeTimerInit, timer, years, currentRange, nowYear, choose, slide } = useCalendarViewYearBox(props, emits)

onMounted(() => {
    FRInit();
    yearsInit();
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
        <button v-for="(item, index) in years" :key="`year: ${index}`" class="picker-btn"
            :class="{ range: item >= currentRange && item - currentRange < 10, current: item == nowYear }"
            @click="choose(item)">{{ item }}</button>
    </div>
</template>