<script lang="ts" setup>
import { isBoolean, isNumber, isString } from "@/utils/common/types";
import { messageBarProps, messageBarEmits, useMessageBar } from "."
import { ClassBuilder, StyleBuilder, useTheme } from "@/utils/common"

defineOptions({
    name: "FvMessageBar"
})

const emits = defineEmits(messageBarEmits)

const props = defineProps(messageBarProps)

const { theme } = useTheme(props)

const { computedIcon, onClose,onConfirm,onCancel } = useMessageBar(props, emits)

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

const { cls: computedTextClass } = new ClassBuilder()
    .add("text")
    .add("close", () => props.showClose === true)
    .computed()
</script>
<template>
    <div :class="computedMessageBarClass">
        <div class="header">
            <i v-show="computedIcon !== undefined" :class="computedIconClass"></i>
            <div :class="computedTextClass">
                <slot>
                    Message Bar.
                </slot>
            </div>
            <i v-if="props.showClose" @click="onClose" class="ms-Icon ms-Icon--Cancel close-icon"></i>
        </div>
        <div class="control" v-if="showControl">
            <slot name="control">
                <div class="right-panel">
                    <fv-button @click.native.stop="onConfirm" background="transparent" is-box-shadow :theme="theme" class="button">{{props.confirmTitle}}</fv-button>
                    <fv-button @click.native.stop="onCancel" background="transparent" is-box-shadow :theme="theme" class="button">{{props.cancelTitle}}</fv-button>
                </div>
            </slot>
        </div>
    </div>
</template>
