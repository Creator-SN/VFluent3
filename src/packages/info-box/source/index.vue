<script setup lang="ts">
import { useTheme } from '@/utils/common';
import { infoBoxEmits, infoBoxProps, useInfoBox } from '.';

defineOptions({
    name:"FvInfoBox"
})

const props = defineProps(infoBoxProps)
const emits = defineEmits(infoBoxEmits)

const {iconList,confirm,close} = useInfoBox(props, emits)
const {theme} = useTheme(props)
</script>

<template>
    <div
        class="fv-InfoBox"
        :class="[theme, mode, {acrylic: acrylic}]"
    >
        <div
            class="sinfo-box-block"
            :class="[iconList[status].background]"
        >
            <div
                v-show="showTitleBar"
                class="title-bar"
            >
                <i
                    class="ms-Icon icon-block"
                    :class="[`ms-Icon--${iconList[status].icon}`]"
                ></i>
                <span class="title-content">{{title}}</span>
            </div>
            <span class="info-box-content-block">
                <slot name="msg">
                    <h3 v-show="!showTitleBar">{{title}}</h3>
                    <p>Info Box Content.</p>
                </slot>
            </span>
            <div class="info-box-control-block">
                <slot
                    name="control-panel"
                    :theme="theme"
                    :confirm="confirm"
                    :cancel="close"
                    :iconList="iconList"
                >
                    <fv-button
                        theme="dark"
                        :background="iconList[status].backgroundColor"
                        :isBoxShadow="true"
                        :borderRadius="6"
                        style="width: 50%; height: 35px; margin-right: 2.5px;"
                        @click="confirm"
                    >{{confirmTitle}}</fv-button>
                    <fv-button
                        :theme="theme"
                        :isBoxShadow="true"
                        :borderRadius="6"
                        style="width: 50%; height: 35px; margin-left: 2.5px;"
                        @click="close"
                    >{{cancelTitle}}</fv-button>
                </slot>
            </div>
        </div>
    </div>
</template>


