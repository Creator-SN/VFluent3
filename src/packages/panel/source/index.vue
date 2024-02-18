<template>
    <div class="fv-Panel" :class="[$theme]">
        FvPanel
    </div>
</template>
        
<script>
import { panelProps } from "."
import { ClassBuilder, StyleBuilder, useTheme } from "@/utils/common"

export default {
    name: "FvPanel",
    props: {
        ...panelProps
    },
    computed: {
        $theme () {
            return useTheme(this.$props).theme.value;
        }
    }
}
</script>

