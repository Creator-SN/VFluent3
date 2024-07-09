<script setup lang="ts">
import { useTheme } from '@/utils/common';
import { infiniteScrollViewEmits, infiniteScrollViewProps, useInfiniteScrollView } from '.';
import { onBeforeUnmount, onMounted } from 'vue';

defineOptions({
    name:"FvInfiniteScrollView"
})

const props = defineProps(infiniteScrollViewProps)
const emits = defineEmits(infiniteScrollViewEmits)

const {theme} = useTheme(props)
const {thisValue, dynamicValue, init, lazyLoadInit, destroy, looper, root} = useInfiniteScrollView(props, emits)

onMounted(()=>{
    init()
    lazyLoadInit()
})

onBeforeUnmount(()=>{
    looper.value = false;
    destroy()
})

</script>

<template>
    <div ref="root" class="fv-InfiniteScrollView" :class="[theme]">
        <slot :thisValue="thisValue" :dynamicValue="dynamicValue">
            <p v-for="(item, index) in dynamicValue" :key="index">{{item}}</p>
        </slot>
    </div>
</template>
        

