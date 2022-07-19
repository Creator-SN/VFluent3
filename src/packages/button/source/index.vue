<script lang="ts" setup>
import { useFvConfig } from "@/store/common"
import { computed } from "@vue/reactivity";
import { isNumber } from "@/utils/common/types";
import { buttonProps, buttonEmits } from "."

const config = useFvConfig()

// The defined name, which will be registered as the component name
defineOptions({
    name: "FvButton"
})

const emits = defineEmits(buttonEmits)

const props = defineProps(buttonProps)

// computed
const computedTheme = computed(() => {
    if (props.theme === "global") {
        return config.theme
    }
    return props.theme
})

const computedComponentClass = computed(() => {
    let obj: Record<string, boolean> = {}
    obj[`fv-${computedTheme.value}-button`] = true
    return obj
})

const computedButtonClass = computed(() => {
    return {
        'button-container': true,
        'disabled': props.disabled,
        'shadow': props.isBoxShadow
    }
})

const computedIconClass = computed(() => {
    const cls: Record<string, boolean> = {}
    cls['ms-Icon'] = true
    if (props.icon !== undefined) {
        cls[`ms-Icon--${props.icon}`] = true
    }
    return cls
})

const computedButtonStyle = computed(() => {
    let style: Record<string, string> = {}
    if (props.foreground) {
        style.color = props.foreground
    }
    if (props.background) {
        style.background = props.background
    }
    if (props.borderWidth) {
        if (isNumber(props.borderWidth)) {
            style["border-width"] = `${props.borderWidth}px`
        } else {
            style["border-width"] = props.borderWidth
        }
    }
    if (props.borderRadius) {
        if (isNumber(props.borderRadius)) {
            style["border-radius"] = `${props.borderRadius}px`
        } else {
            style["border-radius"] = props.borderRadius
        }
    }
    return style
})

const computedTextStyle = computed(() => {
    let style: Record<string, string> = {}
    if (props.fontSize) {
        if (isNumber(props.fontSize)) {
            style["font-size"] = `${props.fontSize}px`
        } else {
            style["font-size"] = props.fontSize;
        }
    }
    if (props.fontWeight) {
        if (isNumber(props.fontWeight)) {
            style["font-weight"] = `${props.fontWeight}`
        } else {
            style["font-weight"] = props.fontWeight
        }
    }
    return style
})



// methods
function handleClick(evt: Event) {
    // disabled click if disabled
    if (!props.disabled) {
        emits("click", evt)
    }
}
</script>

<template>
    <div :class="computedComponentClass" @click="handleClick">
        <button type="button" :class="computedButtonClass" :style="computedButtonStyle">
            <span class="content-block" :style="computedTextStyle">
                <i v-if="props.icon" :class="computedIconClass"></i>
                <slot>Button</slot>
            </span>
        </button>
    </div>
</template>