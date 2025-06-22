<script setup lang="ts">
import { useTheme } from '@/utils/common';
import { imageEmits, imageProps, useImage } from '.';
import { onBeforeUnmount, onMounted } from 'vue';

defineOptions({
    name:"FvImage"
})

const props = defineProps(imageProps)
const emits = defineEmits(imageEmits)

const {theme} = useTheme(props)

const {status,thisSrc,watchImgInit,lazy,lazyInit,lazyTimer,img,root} = useImage(props, emits)

onMounted(()=>{
    watchImgInit()
    if (lazy.value){
        lazyInit()
    }else{
        thisSrc.value = props.src
    }
})

onBeforeUnmount(()=>{
    clearInterval(lazyTimer.value)
})

</script>

<template>
    <div
        ref="root"
        class="fv-Image"
        :class="[theme]"
    >
        <transition name="fade-in">
            <img
                v-show="status"
                draggable="false"
                alt=""
                :src="thisSrc"
                ref="img"
            ></img>
        </transition>
    </div>
</template>
        


