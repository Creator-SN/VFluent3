<template>
    <div class="fv-NavigationView" :class="[$theme]">
        FvNavigationView
    </div>
</template>
        
<script>
import { navigationViewProps } from "."
import { ClassBuilder, StyleBuilder, useTheme } from "@/utils/common"

export default {
    name: "FvNavigationView",
    props: {
        ...navigationViewProps
    },
    computed: {
        $theme () {
            return useTheme(this.$props).theme.value;
        }
    }
}
</script>

