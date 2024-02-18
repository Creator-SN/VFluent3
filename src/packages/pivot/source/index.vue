<template>
    <div class="fv-Pivot" :class="[$theme]">
        FvPivot
    </div>
</template>
        
<script>
import { pivotProps } from "."
import { ClassBuilder, StyleBuilder, useTheme } from "@/utils/common"

export default {
    name: "FvPivot",
    props: {
        ...pivotProps
    },
    computed: {
        $theme () {
            return useTheme(this.$props).theme.value;
        }
    }
}
</script>

