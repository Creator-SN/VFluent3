<template>
    <div class="fv-RadioGroup" :class="[$theme]">
        FvRadioGroup
    </div>
</template>
        
<script>
import { radioGroupProps } from "."
import { ClassBuilder, StyleBuilder, useTheme } from "@/utils/common"

export default {
    name: "FvRadioGroup",
    props: {
        ...radioGroupProps
    },
    computed: {
        $theme () {
            return useTheme(this.$props).theme.value;
        }
    }
}
</script>

