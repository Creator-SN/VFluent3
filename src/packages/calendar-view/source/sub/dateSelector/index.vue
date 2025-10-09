<template>
    <div class="day-block">
        <div class="weekdays-block">
            <button
                v-for="(weekday, index) in props.weekdays"
                class="weekday"
                :key="`weekday: ${index}`"
            >
                <slot name="weekday_content" :value="weekday">
                    {{ weekday }}
                </slot>
            </button>
        </div>
        <div class="picker-container" ref="main">
            <date-unit
                :model-value="cell"
                v-for="(cell, index) in prevList"
                :hightlight="hightlight"
                :key="`prev: ${index}`"
                :ref="(el) => setDateUnitRef(el, `prev: ${index}`)"
                :multiple="multiple"
                :choosenDates="ACChoosenDates"
                @click="chooseItem(cell)"
            ></date-unit>
            <date-unit
                :model-value="cell"
                v-for="(cell, index) in currentList"
                :hightlight="hightlight"
                :key="`current: ${index}`"
                :ref="(el) => setDateUnitRef(el, `current: ${index}`)"
                :multiple="multiple"
                :choosenDates="ACChoosenDates"
                @click="chooseItem(cell)"
            ></date-unit>
            <date-unit
                :model-value="cell"
                v-for="(cell, index) in nextList"
                :hightlight="hightlight"
                :key="`next: ${index}`"
                :ref="(el) => setDateUnitRef(el, `next: ${index}`)"
                :multiple="multiple"
                :choosenDates="ACChoosenDates"
                @click="chooseItem(cell)"
            ></date-unit>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, computed, onMounted, nextTick } from 'vue';
import dateUnit from './dateUnit.vue';
import gsap from 'gsap';

const props = defineProps({
    modelValue: {
        type: Date,
        default: () => new Date()
    },
    background: {
        default: ''
    },
    selectedBackground: {
        default: ''
    },
    selectedBorderColor: {
        default: ''
    },
    multiple: {
        default: 'single'
    },
    choosenDates: {
        default: () => []
    },
    weekdays: {
        default: () => ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
    }
});

const emit = defineEmits(['range-change', 'chooseItem']);

const GRID_NUM = 42;
const OFFSET_GRID_NUM = 42 * 2;
const thisValue = ref(
    new Date(
        props.modelValue.getFullYear(),
        props.modelValue.getMonth(),
        props.modelValue.getDate()
    )
);
watch(
    () => props.modelValue,
    () => {
        thisValue.value = new Date(
            props.modelValue.getFullYear(),
            props.modelValue.getMonth(),
            props.modelValue.getDate()
        );
    }
);
const ACChoosenDates = computed(() => {
    let results = [];
    let sortedDates = props.choosenDates;
    sortedDates.sort((a, b) => {
        return a.getTime() - b.getTime();
    });
    sortedDates.forEach((el) => {
        results.push([el.getFullYear(), el.getMonth(), el.getDate()]);
    });
    return results;
});
const getFirstDate = () => {
    let firstDate = new Date(thisValue.value);
    firstDate.setDate(1);
    let weekday = firstDate.getDay();
    firstDate.setDate(-weekday + 1);
    return firstDate;
};
const getLastDate = () => {
    let lastDate = new Date(thisValue.value);
    lastDate.setDate(1);
    let weekday = lastDate.getDay();
    lastDate.setDate(-weekday + GRID_NUM);
    return lastDate;
};
const initGridList = (firstGridDate, num, offset = 0) => {
    let result = [];
    for (let i = 0; i < num; i++) {
        const date = new Date(firstGridDate);
        date.setDate(date.getDate() + i);
        result.push({
            date,
            index: offset + i
        });
    }
    return result;
};
const offsetGridList = () => {
    const nearestInfo = getNearest();
    currentList.value.forEach((el) => {
        el.date = new Date(
            el.date.setDate(el.date.getDate() + nearestInfo.offset)
        );
    });
    prevList.value.forEach((el) => {
        el.date = new Date(
            el.date.setDate(el.date.getDate() + nearestInfo.offset)
        );
    });
    nextList.value.forEach((el) => {
        el.date = new Date(
            el.date.setDate(el.date.getDate() + nearestInfo.offset)
        );
    });
    return nearestInfo.offsetScrollTop;
};

const dateUnitRefs = ref([]);
const main = ref(null);
const setDateUnitRef = (el, index) => {
    if (el) dateUnitRefs.value[index] = el;
};
const scorllFormat = (offset = 0) => {
    if (!dateUnitRefs.value[`current: 0`] || !main) return;
    const current_0 =
        dateUnitRefs.value[`current: 0`].$el ||
        dateUnitRefs.value[`current: 0`];
    main.value.scrollTop =
        current_0.offsetTop -
        parseInt(getComputedStyle(current_0).margin) -
        offset;
};

const currentFirstDate = ref(getFirstDate());
const currentLastDate = ref(getLastDate());
const prevFirstDate = ref(
    new Date(currentFirstDate.value).setDate(
        currentFirstDate.value.getDate() - OFFSET_GRID_NUM
    )
);
const nextFirstDate = ref(
    new Date(currentLastDate.value).setDate(currentLastDate.value.getDate() + 1)
);
const currentList = ref(
    initGridList(currentFirstDate.value, GRID_NUM, OFFSET_GRID_NUM)
);
const prevList = ref(initGridList(prevFirstDate.value, OFFSET_GRID_NUM));
const nextList = ref(
    initGridList(
        nextFirstDate.value,
        OFFSET_GRID_NUM,
        OFFSET_GRID_NUM + GRID_NUM
    )
);
watch(thisValue, async () => {
    dateUnitRefs.value = [];
    currentList.value = [];
    prevList.value = [];
    nextList.value = [];
    await nextTick();
    currentFirstDate.value = getFirstDate();
    currentLastDate.value = getLastDate();
    prevFirstDate.value = new Date(currentFirstDate.value).setDate(
        currentFirstDate.value.getDate() - OFFSET_GRID_NUM
    );
    nextFirstDate.value = new Date(currentLastDate.value).setDate(
        currentLastDate.value.getDate() + 1
    );
    currentList.value = initGridList(
        currentFirstDate.value,
        GRID_NUM,
        OFFSET_GRID_NUM
    );
    prevList.value = initGridList(prevFirstDate.value, OFFSET_GRID_NUM);
    nextList.value = initGridList(
        nextFirstDate.value,
        OFFSET_GRID_NUM,
        OFFSET_GRID_NUM + GRID_NUM
    );
    await nextTick();
    emit('range-change', currentList.value[GRID_NUM / 2].date);
});
watch(
    currentList.value[GRID_NUM / 2],
    () => {
        emit('range-change', currentList.value[GRID_NUM / 2].date);
    },
    { immediate: true }
);
const hightlight = computed(() => {
    return currentList.value[GRID_NUM / 2].date;
});

onMounted(async () => {
    await nextTick();
    scorllFormat();
    scollEventInit();
});

const getNearest = () => {
    let allList = [...currentList.value, ...prevList.value, ...nextList.value];
    let leftGrids = [];
    for (let item of allList) {
        if (item.index % 7 == 0) leftGrids.push(item);
    }
    const getKey = (item) => {
        let index = item.index;
        if (index < OFFSET_GRID_NUM) return `prev: ${index}`;
        if (index < OFFSET_GRID_NUM + GRID_NUM)
            return `current: ${index - OFFSET_GRID_NUM}`;
        return `next: ${index - OFFSET_GRID_NUM - GRID_NUM}`;
    };
    leftGrids.sort((a, b) => {
        const aEl = dateUnitRefs.value[getKey(a)].$el;
        const bEl = dateUnitRefs.value[getKey(b)].$el;
        const scrollTop = main.value.scrollTop;
        return (
            Math.abs(aEl.offsetTop - scrollTop) -
            Math.abs(bEl.offsetTop - scrollTop)
        );
    });
    return {
        obj: leftGrids[0],
        offsetScrollTop:
            dateUnitRefs.value[getKey(leftGrids[0])].$el.offsetTop -
            main.value.scrollTop,
        offset: leftGrids[0].index - OFFSET_GRID_NUM
    };
};

const scollEventInit = () => {
    main.value.addEventListener(
        'wheel',
        async () => {
            scrollDispatch();
        },
        { passive: false }
    );
    main.value.addEventListener(
        'touchend',
        async () => {
            scrollDispatch();
        },
        { passive: false }
    );
    main.value.addEventListener('keydown', (event) => {
        if (
            [
                'ArrowUp',
                'ArrowDown',
                'PageUp',
                'PageDown',
                'Home',
                'End'
            ].includes(event.key)
        ) {
            event.preventDefault();
        }
    });
};

let scrollTimer = null;
const scrollDispatch = async () => {
    clearTimeout(scrollTimer);
    await new Promise((resolve) => {
        scrollTimer = setTimeout(async () => {
            await scrollExec();
            resolve(1);
        }, 200);
    });
};

const scrollExec = async () => {
    let offset = offsetGridList();
    await nextTick();
    await scorllFormat(offset);
};

const slideLock = ref(true);
const slideUp = () => {
    if (!slideLock.value) return;
    slideLock.value = false;
    const index = OFFSET_GRID_NUM - GRID_NUM;
    const targetGrid = dateUnitRefs.value[`prev: ${index}`];
    if (!targetGrid.$el || !main) return;
    gsap.to(main.value, {
        scrollTop: targetGrid.$el.offsetTop,
        duration: 0.3,
        onComplete: async () => {
            await scrollDispatch();
            slideLock.value = true;
        }
    });
};

const slideDown = () => {
    if (!slideLock.value) return;
    slideLock.value = false;
    const index = 0;
    const targetGrid = dateUnitRefs.value[`next: ${index}`];
    if (!targetGrid.$el || !main) return;
    gsap.to(main.value, {
        scrollTop: targetGrid.$el.offsetTop,
        duration: 0.3,
        onComplete: async () => {
            await scrollDispatch();
            slideLock.value = true;
        }
    });
};

defineExpose({
    slideUp,
    slideDown
});

const chooseItem = (cell) => {
    emit('chooseItem', {
        date: new Date(cell.date),
        index: cell.index
    });
};
</script>
