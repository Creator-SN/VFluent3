<template>
    <button
        class="picker-btn day"
        :class="{
            range: isRange,
            current: isToday,
            choose: isChoose,
            'range-choose-fe': isRangeChooseFE,
            'range-choose-middle':
                multiple === 'range' && isChoose && !isRangeChooseFE
        }"
        :title="computedTitle"
    >
        {{ displayDate }}
    </button>
</template>

<script setup>
import { ref, computed } from 'vue';
const props = defineProps({
    modelValue: {
        default: new Date()
    },
    hightlight: {
        default: new Date()
    },
    choosenDates: {
        default: () => []
    },
    multiple: {
        default: 'single'
    }
});

const thisValue = ref(props.modelValue);
const displayDate = computed(() => {
    return thisValue.value.date.getDate();
});
const isRange = computed(() => {
    return (
        props.hightlight.getFullYear() == thisValue.value.date.getFullYear() &&
        props.hightlight.getMonth() == thisValue.value.date.getMonth()
    );
});
const computedTitle = computed(() => {
    return `${thisValue.value.date.getFullYear()}/${
        thisValue.value.date.getMonth() + 1
    }/${thisValue.value.date.getDate()}`;
});
const isToday = computed(() => {
    const today = new Date();
    return (
        thisValue.value.date.getFullYear() == today.getFullYear() &&
        thisValue.value.date.getMonth() == today.getMonth() &&
        thisValue.value.date.getDate() == today.getDate()
    );
});
const isChoose = computed(() => {
    const thisDate = [
        thisValue.value.date.getFullYear(),
        thisValue.value.date.getMonth(),
        thisValue.value.date.getDate()
    ];
    for (let choosen of props.choosenDates) {
        if (
            thisDate[0] == choosen[0] &&
            thisDate[1] == choosen[1] &&
            thisDate[2] == choosen[2]
        )
            return true;
    }
    return false;
});
const isRangeChooseFE = computed(() => {
    if (props.multiple !== 'range') return false;
    if (props.choosenDates.length == 0) return false;
    const thisDate = [
        thisValue.value.date.getFullYear(),
        thisValue.value.date.getMonth(),
        thisValue.value.date.getDate()
    ];
    const last = props.choosenDates.length - 1;
    const status =
        (thisDate[0] == props.choosenDates[0][0] &&
            thisDate[1] == props.choosenDates[0][1] &&
            thisDate[2] == props.choosenDates[0][2]) ||
        (thisDate[0] == props.choosenDates[last][0] &&
            thisDate[1] == props.choosenDates[last][1] &&
            thisDate[2] == props.choosenDates[last][2]);
    return status;
});
</script>
