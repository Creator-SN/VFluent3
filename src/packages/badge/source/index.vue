<script lang="ts" setup>
import { badgeProps, badgeEmits, useBadge } from "."
import { ClassBuilder, StyleBuilder, useTheme } from "@/utils/common"

defineOptions({
    name: "FvBadge"
})

const emits = defineEmits(badgeEmits)

const props = defineProps(badgeProps)

const { theme } = useTheme(props)

const { finalColor, finalValue } = useBadge(props, emits)
</script>

<template>
    <div class="fv-Badge" :class="[theme]">
        <slot>
            <p>Badge</p>
        </slot>
        <sup v-show="!hidden" class="fv-badge-container" :class="{ dot: isDot }" :style="{ background: finalColor }">
            <p class="badge-content">
                {{ finalValue }}
            </p>
        </sup>
    </div>
</template>