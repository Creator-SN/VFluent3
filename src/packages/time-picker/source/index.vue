<template>
    <div class="fv-TimePicker" :class="[$theme]">
        FvTimePicker
    </div>
</template>
        
<script>
import { timePickerProps } from "."
import { ClassBuilder, StyleBuilder, useTheme } from "@/utils/common"

export default {
    name: "FvTimePicker",
    props: {
        ...timePickerProps
    },
    computed: {
        $theme () {
            return useTheme(this.$props).theme.value;
        }
    }
}
</script>

