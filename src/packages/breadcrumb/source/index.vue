<script lang="ts" setup>
import { breadcrumbProps, breadcrumbEmits, useBreadcrumb } from "."
import { ClassBuilder, StyleBuilder, useTheme } from "@/utils/common"

defineOptions({
    name: "FvBreadcrumb"
})

const emits = defineEmits(breadcrumbEmits)

const props = defineProps(breadcrumbProps)

const { theme } = useTheme(props)

const { root, mode, main, isDisabled, editor, editorMode, routeClick, separatorIcon, routeList, routeItemClick, tempValue, handleEnter } = useBreadcrumb(props, emits)

</script>

<template>
    <div ref="root" class="fv-Breadcrumb"
        :class="[theme, { readOnly: readOnly, 'editor-mode': mode === 'editor', disabled: isDisabled }]"
        :style="{ 'border-radius': `${borderRadius}px`, 'border-color': mode === 'editor' ? borderColor : '', 'outline-color': mode === 'editor' ? borderColor : '' }">
        <div class="fv-bc-route-list" ref="main" @click="editorMode">
            <div v-show="showRoot" class="fv-bc-route-item" @click="routeClick">
                <slot name="root" :rootIcon="rootIcon" :separator="separator" :separatorIcon="separatorIcon">
                    <i class="fv-bc-separator-content ms-Icon" :class="[`ms-Icon--${rootIcon}`]"></i>
                    <i class="fv-bc-separator-icon ms-Icon" :class="[separatorIcon ? `ms-Icon--${separator}` : '']">{{
                        separatorIcon ? '' : separator }}</i>
                </slot>
            </div>
            <div v-show="mode == 'default'" v-for="(item, index) in routeList" :key="index" class="fv-bc-route-item"
                @click="routeItemClick(item, index)">
                <slot name="route-item" :item="item" :index="index">
                    <p class="fv-bc-separator-content">{{ item }}</p>
                    <i class="fv-bc-separator-icon ms-Icon" :class="[separatorIcon ? `ms-Icon--${separator}` : '']">{{
                        separatorIcon ? '' : separator }}</i>
                </slot>
            </div>
            <input v-show="mode == 'editor'" v-model="tempValue" class="fv-bc-route-text-box" type="text" ref="editor"
                @keyup="handleEnter">
        </div>
    </div>
</template>