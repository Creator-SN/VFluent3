<template>
    <div class="fv-MenuFlyout" :class="[$theme]">
        FvMenuFlyout
    </div>
</template>
        
<script>
import { menuFlyoutProps } from "."
import { ClassBuilder, StyleBuilder, useTheme } from "@/utils/common"

export default {
    name: "FvMenuFlyout",
    props: {
        ...menuFlyoutProps
    },
    computed: {
        $theme () {
            return useTheme(this.$props).theme.value;
        }
    }
}
</script>

