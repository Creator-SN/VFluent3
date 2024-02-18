<template>
    <div class="fv-Persona" :class="[$theme]">
        FvPersona
    </div>
</template>
        
<script>
import { personaProps } from "."
import { ClassBuilder, StyleBuilder, useTheme } from "@/utils/common"

export default {
    name: "FvPersona",
    props: {
        ...personaProps
    },
    computed: {
        $theme () {
            return useTheme(this.$props).theme.value;
        }
    }
}
</script>

