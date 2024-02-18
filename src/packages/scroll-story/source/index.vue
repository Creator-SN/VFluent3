<template>
    <div class="fv-ScrollStory" :class="[$theme]">
        FvScrollStory
    </div>
</template>
        
<script>
import { scrollStoryProps } from "."
import { ClassBuilder, StyleBuilder, useTheme } from "@/utils/common"

export default {
    name: "FvScrollStory",
    props: {
        ...scrollStoryProps
    },
    computed: {
        $theme () {
            return useTheme(this.$props).theme.value;
        }
    }
}
</script>

