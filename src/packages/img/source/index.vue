<script setup lang="ts">
import { imageEmits } from '@/packages/image/source';
import { imgProps, useImg } from '.';
import { useTheme } from '@/utils/common';

defineOptions({
    name:"FvImg"
})

const props = defineProps(imgProps)
const emits = defineEmits(imageEmits)
const {theme} = useTheme(props)
const {status} = useImg(props, emits)
</script>

<template>
    <div
        class="fv-Img"
        :class="[theme]"
    >
        <fv-ImgBox
            v-if="status == 'imgBox'"
            :url="src"
            :onlazy="onlazy"
            :loadingColor="loadingColor"
            :onbackground="onbackground"
            style="width: 100%; height: 100%;"
            @error="status = 'image'"
        ></fv-ImgBox>
        <fv-Image
            v-if="status == 'image'"
            :src="src"
            :onlazy="onlazy"
            style="width: 100%; height: 100%;"
        ></fv-Image>
    </div>
</template>
        


