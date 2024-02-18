<template>
    <div class="fv-TextField" :class="[$theme]">
        FvTextField
    </div>
</template>
        
<script>
import { textFieldProps } from "."
import { ClassBuilder, StyleBuilder, useTheme } from "@/utils/common"

export default {
    name: "FvTextField",
    props: {
        ...textFieldProps
    },
    computed: {
        $theme () {
            return useTheme(this.$props).theme.value;
        }
    }
}
</script>

