<template>
    <div class="fv-InfiniteScrollView" :class="[$theme]">
        FvInfiniteScrollView
    </div>
</template>
        
<script>
import { infiniteScrollViewProps } from "."
import { ClassBuilder, StyleBuilder, useTheme } from "@/utils/common"

export default {
    name: "FvInfiniteScrollView",
    props: {
        ...infiniteScrollViewProps
    },
    computed: {
        $theme () {
            return useTheme(this.$props).theme.value;
        }
    }
}
</script>

