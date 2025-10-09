<template>
    <div class="picker-container" ref="main">
        <year-unit
            :model-value="cell"
            v-for="(cell, index) in prevList"
            :hightlight="hightlight"
            :key="`prev: ${index}`"
            :ref="(el) => setYearUnitRef(el, `prev: ${index}`)"
            @click="chooseItem(cell)"
        ></year-unit>
        <year-unit
            :model-value="cell"
            v-for="(cell, index) in currentList"
            :hightlight="hightlight"
            :key="`current: ${index}`"
            :ref="(el) => setYearUnitRef(el, `current: ${index}`)"
            @click="chooseItem(cell)"
        ></year-unit>
        <year-unit
            :model-value="cell"
            v-for="(cell, index) in nextList"
            :hightlight="hightlight"
            :key="`next: ${index}`"
            :ref="(el) => setYearUnitRef(el, `next: ${index}`)"
            @click="chooseItem(cell)"
        ></year-unit>
    </div>
</template>

<script setup>
import { ref, watch, computed, onMounted, nextTick } from 'vue';
import yearUnit from './yearUnit.vue';
import gsap from 'gsap';

const props = defineProps({
    modelValue: {
        type: Date,
        default: () => new Date()
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
const getFirstYear = () => {
    let firstYear = new Date(thisValue.value);
    let firstYearNum = parseInt(firstYear.getFullYear() / 10) * 10 - 3;
    firstYear.setFullYear(firstYearNum);
    return firstYear;
};
const getLastYear = () => {
    let lastYear = new Date(thisValue.value);
    let firstYearNum = parseInt(lastYear.getFullYear() / 10) * 10 - 3;
    lastYear.setFullYear(firstYearNum + GRID_NUM - 1);
    return lastYear;
};
const initGridList = (firstGridYear, num, offset = 0) => {
    let result = [];
    for (let i = 0; i < num; i++) {
        const date = new Date(firstGridYear);
        date.setFullYear(date.getFullYear() + i);
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
            el.date.setFullYear(el.date.getFullYear() + nearestInfo.offset)
        );
    });
    prevList.value.forEach((el) => {
        el.date = new Date(
            el.date.setFullYear(el.date.getFullYear() + nearestInfo.offset)
        );
    });
    nextList.value.forEach((el) => {
        el.date = new Date(
            el.date.setFullYear(el.date.getFullYear() + nearestInfo.offset)
        );
    });
    return nearestInfo.offsetScrollTop;
};

const dateUnitRefs = ref([]);
const main = ref(null);
const setYearUnitRef = (el, index) => {
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

const currentFirstYear = ref(getFirstYear());
const currentLastYear = ref(getLastYear());
const prevFirstYear = ref(
    new Date(currentFirstYear.value).setFullYear(
        currentFirstYear.value.getFullYear() - OFFSET_GRID_NUM
    )
);
const nextFirstYear = ref(
    new Date(currentLastYear.value).setFullYear(
        currentLastYear.value.getFullYear() + 1
    )
);
const currentList = ref(
    initGridList(currentFirstYear.value, GRID_NUM, OFFSET_GRID_NUM)
);
const prevList = ref(initGridList(prevFirstYear.value, OFFSET_GRID_NUM));
const nextList = ref(
    initGridList(
        nextFirstYear.value,
        OFFSET_GRID_NUM,
        OFFSET_GRID_NUM + GRID_NUM
    )
);
watch(thisValue, () => {
    currentFirstYear.value = getFirstYear();
    currentLastYear.value = getLastYear();
    prevFirstYear.value = new Date(currentFirstYear.value).setFullYear(
        currentFirstYear.value.getFullYear() - OFFSET_GRID_NUM
    );
    nextFirstYear.value = new Date(currentLastYear.value).setFullYear(
        currentLastYear.value.getFullYear() + 1
    );
    currentList.value = initGridList(
        currentFirstYear.value,
        GRID_NUM,
        OFFSET_GRID_NUM
    );
    prevList.value = initGridList(prevFirstYear.value, OFFSET_GRID_NUM);
    nextList.value = initGridList(
        nextFirstYear.value,
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
