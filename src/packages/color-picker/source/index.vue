<script lang="ts" setup>
import { isNumber, isString } from "@/utils/common/types";
import { colorPickerProps, colorPickerEmits, useColorPicker } from "."
import { ClassBuilder, StyleBuilder, useTheme } from "@/utils/common"

defineOptions({
    name: "FvColorPicker"
})

const emits = defineEmits(colorPickerEmits)

const props = defineProps(colorPickerProps)

const { theme } = useTheme(props)

const { colorMode, colorModeOptions } = useColorPicker(props, emits)

const { cls: computedColorPickerClass } = new ClassBuilder()
    .add(`fv-color-picker`)
    .computed()

</script>
<template>
    <div :class="computedColorPickerClass">
        <div class="color-picker">
            <div class="color-area ring">
                <div class="bg"></div>
                <div class="white-mask"></div>
                <button class="pointer"></button>
            </div>
            <div class="color"></div>
        </div>
        <div class="control vertical">
            <div class="color-value"></div>
            <div class="fields">
                <div class="row">
                    <div class="cell">
                        <fv-combo-box v-model="colorMode" :options="colorModeOptions" :theme="theme"
                            style="width:118px;" min-width="118px"></fv-combo-box>
                    </div>
                    <div class="cell">
                        <fv-text-box placeholder="#FFFFFF" :input-rules="/^#[0-9A-Fa-f]{0,8}$/" :theme="theme"
                            style="width:130px;" min-width="130px">
                        </fv-text-box>
                    </div>
                </div>
                <div class="row">
                    <div class="cell">
                        <fv-text-box placeholder="0" :input-rules="/^[0-9]{0,3}$/" style="width:118px;"
                            min-width="118px" :theme="theme">
                        </fv-text-box>
                        <span class="text">Red</span>
                    </div>
                </div>
                <div class="row">
                    <div class="cell">
                        <fv-text-box placeholder="0" :input-rules="/^[0-9]{0,3}$/" style="width:118px;"
                            min-width="118px" :theme="theme">
                        </fv-text-box>
                        <span class="text">Green</span>
                    </div>
                </div>
                <div class="row">
                    <div class="cell">
                        <fv-text-box placeholder="0" :input-rules="/^[0-9]{0,3}$/" style="width:118px;"
                            min-width="118px" :theme="theme">
                        </fv-text-box>
                        <span class="text">Blue</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
