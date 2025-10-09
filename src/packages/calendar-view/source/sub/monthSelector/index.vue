<template>
    <div class="picker-container" ref="main">
        <month-unit
            :model-value="cell"
            v-for="(cell, index) in prevList"
            :hightlight="hightlight"
            :monthList="monthList"
            :key="`prev: ${index}`"
            :ref="(el) => setMonthUnitRef(el, `prev: ${index}`)"
            @click="chooseItem(cell)"
        ></month-unit>
        <month-unit
            :model-value="cell"
            v-for="(cell, index) in currentList"
            :hightlight="hightlight"
            :monthList="monthList"
            :key="`current: ${index}`"
            :ref="(el) => setMonthUnitRef(el, `current: ${index}`)"
            @click="chooseItem(cell)"
        ></month-unit>
        <month-unit
            :model-value="cell"
            v-for="(cell, index) in nextList"
            :hightlight="hightlight"
            :monthList="monthList"
            :key="`next: ${index}`"
            :ref="(el) => setMonthUnitRef(el, `next: ${index}`)"
            @click="chooseItem(cell)"
        ></month-unit>
    </div>
</template>

<script setup>
import { ref, watch, computed, onMounted, nextTick } from 'vue';
import monthUnit from './monthUnit.vue';
import gsap from 'gsap';

const props = defineProps({
    modelValue: {
        type: Date,
        default: () => new Date()
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

const emit = defineEmits(['range-change', 'chooseItem']);

const GRID_NUM = 16;
const OFFSET_GRID_NUM = 16 * 2;
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
const getFirstMonth = () => {
    let firstMonth = new Date(thisValue.value);
    firstMonth.setMonth(0);
    return firstMonth;
};
const getLastMonth = () => {
    let lastMonth = new Date(thisValue.value);
    lastMonth.setMonth(0);
    lastMonth.setMonth(lastMonth.getMonth() + GRID_NUM - 1);
    return lastMonth;
};
const initGridList = (firstGridMonth, num, offset = 0) => {
    let result = [];
    for (let i = 0; i < num; i++) {
        const date = new Date(firstGridMonth);
        date.setMonth(date.getMonth() + i);
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
            el.date.setMonth(el.date.getMonth() + nearestInfo.offset)
        );
    });
    prevList.value.forEach((el) => {
        el.date = new Date(
            el.date.setMonth(el.date.getMonth() + nearestInfo.offset)
        );
    });
    nextList.value.forEach((el) => {
        el.date = new Date(
            el.date.setMonth(el.date.getMonth() + nearestInfo.offset)
        );
    });
    return nearestInfo.offsetScrollTop;
};

const dateUnitRefs = ref([]);
const main = ref(null);
const setMonthUnitRef = (el, index) => {
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

const currentFirstMonth = ref(getFirstMonth());
const currentLastMonth = ref(getLastMonth());
const prevFirstMonth = ref(
    new Date(currentFirstMonth.value).setMonth(
        currentFirstMonth.value.getMonth() - OFFSET_GRID_NUM
    )
);
const nextFirstMonth = ref(
    new Date(currentLastMonth.value).setMonth(
        currentLastMonth.value.getMonth() + 1
    )
);
const currentList = ref(
    initGridList(currentFirstMonth.value, GRID_NUM, OFFSET_GRID_NUM)
);
const prevList = ref(initGridList(prevFirstMonth.value, OFFSET_GRID_NUM));
const nextList = ref(
    initGridList(
        nextFirstMonth.value,
        OFFSET_GRID_NUM,
        OFFSET_GRID_NUM + GRID_NUM
    )
);
watch(thisValue, () => {
    currentFirstMonth.value = getFirstMonth();
    currentLastMonth.value = getLastMonth();
    prevFirstMonth.value = new Date(currentFirstMonth.value).setMonth(
        currentFirstMonth.value.getMonth() - OFFSET_GRID_NUM
    );
    nextFirstMonth.value = new Date(currentLastMonth.value).setMonth(
        currentLastMonth.value.getMonth() + 1
    );
    currentList.value = initGridList(
        currentFirstMonth.value,
        GRID_NUM,
        OFFSET_GRID_NUM
    );
    prevList.value = initGridList(prevFirstMonth.value, OFFSET_GRID_NUM);
    nextList.value = initGridList(
        nextFirstMonth.value,
        OFFSET_GRID_NUM,
        OFFSET_GRID_NUM + GRID_NUM
    );
    scorllFormat();
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
        if (item.index % 4 == 0) leftGrids.push(item);
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
        duration: 0.2,
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
        duration: 0.2,
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
