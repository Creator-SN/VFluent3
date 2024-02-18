<template>
    <div class="fv-Shimmer" :class="[$theme]">
        FvShimmer
    </div>
</template>
        
<script>
import { shimmerProps } from "."
import { ClassBuilder, StyleBuilder, useTheme } from "@/utils/common"

export default {
    name: "FvShimmer",
    props: {
        ...shimmerProps
    },
    computed: {
        $theme () {
            return useTheme(this.$props).theme.value;
        }
    }
}
</script>

