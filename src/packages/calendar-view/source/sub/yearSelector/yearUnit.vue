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
    }
});

const thisValue = ref(props.modelValue);
const displayName = computed(() => {
    return thisValue.value.date.getFullYear();
});
const isRange = computed(() => {
    return (
        parseInt(props.hightlight.getFullYear() / 10) ==
        parseInt(thisValue.value.date.getFullYear() / 10)
    );
});
const computedTitle = computed(() => {
    return `${thisValue.value.date.getFullYear()}`;
});
const isToday = computed(() => {
    const today = new Date();
    return thisValue.value.date.getFullYear() == today.getFullYear();
});
</script>
