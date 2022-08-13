<script lang="ts" setup>
import { isNumber, isString } from "@/utils/common/types";
import { messageBarProps, messageBarEmits, useMessageBar } from "."
import { ClassBuilder, StyleBuilder, useTheme } from "@/utils/common"

defineOptions({
    name: "FvMessageBar"
})

const emits = defineEmits(messageBarEmits)

const props = defineProps(messageBarProps)

const { theme } = useTheme(props)

const { computedIcon,onClose } = useMessageBar(props, emits)

const { cls: computedMessageBarClass } = new ClassBuilder()
    .add("fv-message-bar")
    .add(() => theme.value)
    .add(() => props.status, () => isString(props.status))
    .computed()

const { cls: computedIconClass } = new ClassBuilder()
    .add(`ms-Icon`)
    .add(`icon`)
    .add(() => `ms-Icon--${computedIcon.value}`, () => isString(computedIcon.value))
    .computed()

</script>
<template>
    <div :class="computedMessageBarClass">
        <div class="header">
            <i v-show="computedIcon !== undefined" :class="computedIconClass"></i>
            <div class="text">
                <slot>
                    Message Bar.
                </slot>
            </div>
            <i v-if="props.showClose" @click="onClose" class="ms-Icon ms-Icon--Cancel close-icon"></i>
        </div>
    </div>
</template>
