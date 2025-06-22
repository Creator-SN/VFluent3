<script setup lang="ts">
import { spliterEmits, spliterProps, useSpliter } from './spliter';

const props = defineProps(spliterProps)

const emits = defineEmits(spliterEmits)

const {forward, stop} = useSpliter(props, emits)

</script>

<template>
<div class="fv-details-list-spliter" @mousedown="forward" @mouseup="stop" @touchstart="forward" @touchend="stop">
    <i></i>
</div>
</template>