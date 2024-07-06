<script setup lang="ts">
import { isDefined, useTheme } from '@/utils/common';
import { imgBoxEmits, imgBoxProps, useImgBox } from '.';
import { onBeforeUnmount, onMounted } from 'vue';

defineOptions({
    name:"FvImgBox"
})

const props = defineProps(imgBoxProps)
const emits = defineEmits(imgBoxEmits)

const {theme} = useTheme(props)

const {imgUri,loadingProgress,progressSize,lazy,loadingImg,widthHeightWatcher,formatTimer, lazyTimer} = useImgBox(props, emits)

onMounted(()=>{
    lazy.value = props.onlazy;
    if (props.url && !lazy.value) loadingImg()
    widthHeightWatcher();
})

onBeforeUnmount(()=>{
    clearInterval(formatTimer.value)
    clearInterval(lazyTimer.value)
})

</script>

<template>
    <div
        class="fv-ImgBox"
        :class="[theme]"
        :style="{background: onbackground && isDefined(imgUri
        ) ? 'url('+imgUri.data+') no-repeat' : ''}"
    >
        <div
            v-show="isDefined(imgUri) && imgUri.state!='done'"
            class="fv-img-box-content"
        >
            <fv-progress-ring
                v-show="isDefined(imgUri) && imgUri.state=='loading'"
                :value="loadingProgress"
                :loading="loadingProgress === 0"
                :color="loadingColor"
                :r="progressSize.r"
                :borderWidth="progressSize.borderWidth"
                background="transparent"
            ></fv-progress-ring>
        </div>
        <transition name="fade-in">
            <img
                v-if="(isDefined(imgUri) && imgUri.state=='done') && !onbackground"
                draggable="false"
                alt=""
                :src="imgUri.data"
            />
        </transition>
    </div>
</template>
        


