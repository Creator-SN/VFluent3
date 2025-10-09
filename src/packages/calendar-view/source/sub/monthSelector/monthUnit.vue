<template>
    <button
        class="picker-btn"
        :class="{
            range: isRange,
            current: isToday
        }"
        :title="computedTitle"
    >
        {{ displayName }}
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
    monthList: {
        default: () => [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Set',
            'Oct',
            'Nov',
            'Dec'
        ]
    }
});

const thisValue = ref(props.modelValue);
const displayName = computed(() => {
    return props.monthList[thisValue.value.date.getMonth()].slice(0,3);
});
const isRange = computed(() => {
    return props.hightlight.getFullYear() == thisValue.value.date.getFullYear();
});
const computedTitle = computed(() => {
    return `${thisValue.value.date.getFullYear()}/${
        thisValue.value.date.getMonth() + 1
    }`;
});
const isToday = computed(() => {
    const today = new Date();
    return (
        thisValue.value.date.getFullYear() == today.getFullYear() &&
        thisValue.value.date.getMonth() == today.getMonth()
    );
});
</script>
