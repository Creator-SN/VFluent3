<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue';
import { drawerEmits, drawerProps, useDrawer } from '.';

defineOptions({
    name:"FvDrawer"
})

const props = defineProps(drawerProps)
const emits = defineEmits(drawerEmits)

const {initShow,style,close, drawer,init,destroy,setStyle} = useDrawer(props, emits)

onMounted(()=>{
    init()
    setStyle()
    initShow.value = true;
})

onBeforeUnmount(()=>{
    destroy()
})

defineExpose({
    close
})

</script>

<template>
    <Teleport to="body">
        <div
            v-show="initShow"
            ref="drawer"
            class="fv-Drawer"
            :class="[theme]"
            :style="[style.drawer, { background: background }]"
        >
            <slot></slot>
        </div>
    </Teleport>
</template>
        
