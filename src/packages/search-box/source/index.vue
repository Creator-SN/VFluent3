<template>
    <div class="fv-SearchBox" :class="[$theme]">
        FvSearchBox
    </div>
</template>
        
<script>
import { searchBoxProps } from "."
import { ClassBuilder, StyleBuilder, useTheme } from "@/utils/common"

export default {
    name: "FvSearchBox",
    props: {
        ...searchBoxProps
    },
    computed: {
        $theme () {
            return useTheme(this.$props).theme.value;
        }
    }
}
</script>

