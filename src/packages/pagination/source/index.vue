<template>
    <div class="fv-Pagination" :class="[$theme]">
        FvPagination
    </div>
</template>
        
<script>
import { paginationProps } from "."
import { ClassBuilder, StyleBuilder, useTheme } from "@/utils/common"

export default {
    name: "FvPagination",
    props: {
        ...paginationProps
    },
    computed: {
        $theme () {
            return useTheme(this.$props).theme.value;
        }
    }
}
</script>

