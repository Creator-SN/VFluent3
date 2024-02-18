<template>
    <div class="fv-NavigationPanel" :class="[$theme]">
        FvNavigationPanel
    </div>
</template>
        
<script>
import { navigationPanelProps } from "."
import { ClassBuilder, StyleBuilder, useTheme } from "@/utils/common"

export default {
    name: "FvNavigationPanel",
    props: {
        ...navigationPanelProps
    },
    computed: {
        $theme () {
            return useTheme(this.$props).theme.value;
        }
    }
}
</script>

