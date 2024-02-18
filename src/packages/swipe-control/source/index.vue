<template>
    <div class="fv-SwipeControl" :class="[$theme]">
        FvSwipeControl
    </div>
</template>
        
<script>
import { swipeControlProps } from "."
import { ClassBuilder, StyleBuilder, useTheme } from "@/utils/common"

export default {
    name: "FvSwipeControl",
    props: {
        ...swipeControlProps
    },
    computed: {
        $theme () {
            return useTheme(this.$props).theme.value;
        }
    }
}
</script>

