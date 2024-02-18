<template>
    <div class="fv-Tag" :class="[$theme]">
        FvTag
    </div>
</template>
        
<script>
import { tagProps } from "."
import { ClassBuilder, StyleBuilder, useTheme } from "@/utils/common"

export default {
    name: "FvTag",
    props: {
        ...tagProps
    },
    computed: {
        $theme () {
            return useTheme(this.$props).theme.value;
        }
    }
}
</script>

