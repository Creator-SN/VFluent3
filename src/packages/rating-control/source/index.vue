<template>
    <div class="fv-RatingControl" :class="[$theme]">
        FvRatingControl
    </div>
</template>
        
<script>
import { ratingControlProps } from "."
import { ClassBuilder, StyleBuilder, useTheme } from "@/utils/common"

export default {
    name: "FvRatingControl",
    props: {
        ...ratingControlProps
    },
    computed: {
        $theme () {
            return useTheme(this.$props).theme.value;
        }
    }
}
</script>

