<template>
    <div class="fv-VerifyBox" :class="[$theme]">
        FvVerifyBox
    </div>
</template>
        
<script>
import { verifyBoxProps } from "."
import { ClassBuilder, StyleBuilder, useTheme } from "@/utils/common"

export default {
    name: "FvVerifyBox",
    props: {
        ...verifyBoxProps
    },
    computed: {
        $theme () {
            return useTheme(this.$props).theme.value;
        }
    }
}
</script>

