<script lang="ts" setup>
import { ref } from "vue"

defineOptions({
    name: "FvButton"
})

function test() {
    alert("click this button!")
}


</script>

<template>
    <div>
        <button @click="test">
            <slot>Button</slot>
        </button>
    </div>
</template>

<style lang="scss" scoped>
</style>