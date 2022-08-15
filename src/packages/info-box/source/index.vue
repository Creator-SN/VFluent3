<script lang="ts" setup>
import { isNumber, isString } from "@/utils/common/types";
import { infoBoxProps, infoBoxEmits, useInfoBox } from "."
import { ClassBuilder, StyleBuilder, useTheme } from "@/utils/common"

defineOptions({
    name: "FvInfoBox"
})

const emits = defineEmits(infoBoxEmits)

const props = defineProps(infoBoxProps)

const { theme } = useTheme(props)

const { computedButtonBackground, computedIcon, onCancel, onConfirm } = useInfoBox(props, emits)

const { cls: computedInfoBoxClass } = new ClassBuilder()
    .add("fv-info-box")
    .add(() => theme.value)
    .add(() => props.status, () => isString(props.status))
    .computed()


const { cls: computedIconClass } = new ClassBuilder()
    .add("icon")
    .add("ms-Icon")
    .add(() => `ms-Icon--${computedIcon.value}`, () => isString(computedIcon.value))
    .computed()

</script>
<template>
    <div :class="computedInfoBoxClass">
        <div class="title-bar">
            <i :class="computedIconClass"></i>
            <span class="text">{{ props.title }}</span>
        </div>
        <div class="content">
            <slot>
            </slot>
        </div>
        <div class="control-panel">
            <slot name="control">
                <fv-button :background="computedButtonBackground" foreground="white" @click.native.stop="onConfirm" :border-radius="6" class="button confirm" 
                    is-box-shadow :theme="theme">{{ props.confirmTitle }}</fv-button>
                <fv-button @click.native.stop="onCancel" :border-radius="6" class="button cancel"
                    is-box-shadow :theme="theme">{{ props.cancelTitle }}</fv-button>
            </slot>
        </div>
    </div>
</template>
