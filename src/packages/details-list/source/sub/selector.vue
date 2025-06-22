<script lang="ts"setup>
import { selectorEmits, selectorProps, useSelector } from './selector';

const props = defineProps(selectorProps)
const emits = defineEmits(selectorEmits)

const {checked} = useSelector(props, emits)
</script>

<template>
    <div
        class="fv-details-list-selector"
        :class="[{choosen: checked}]"
    >
        <div
            class="fv-details-list-icon-ring"
            :style="{background: checked ? color : ''}"
        >
            <i class="ms-Icon ms-Icon--StatusCircleCheckmark fv-details-list-icon-accept"></i>
        </div>
    </div>
</template>