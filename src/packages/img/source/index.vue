<script lang="ts" setup>
import { isNumber, isString } from "@/utils/common/types";
import { imgProps, imgEmits, useImg } from "."
import { ClassBuilder, StyleBuilder, useTheme } from "@/utils/common"
import { h, render, ref, onMounted } from "vue";

defineOptions({
    name: "FvImg"
})

const emits = defineEmits(imgEmits)

const props = defineProps(imgProps)

const { theme } = useTheme(props)

const { container, loading, imgContainer } = useImg(props, emits)

const { cls: computedImgClass } = new ClassBuilder()
    .add(`fv-img`)
    .add(() => theme.value)
    .computed()

const { style: computedImgStyle } = new StyleBuilder()
    .add('--fv-img-fit', () => props.fit, () => isString(props.fit))
    .computed()

</script>
<template>
    <div ref="imgContainer" :class="computedImgClass" :style="computedImgStyle">
        <div class="loading-container" v-show="loading">
            <div class="bg"></div>
            <fv-progress-ring :theme="theme" indeterminate></fv-progress-ring>
        </div>
        <transition name="fv-img-fade-in">
            <div v-show="!loading" class="container" ref="container">
            </div>
        </transition>
    </div>
</template>
