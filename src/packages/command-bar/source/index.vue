<script lang="ts" setup>
import { callFunction } from '@/utils/common';
import { commandBarEmits, commandBarProps, useCommandBar } from '.';
import { onBeforeUnmount, onMounted, onUnmounted } from 'vue';

defineOptions({
    name: "FvCommandBar"
})

const props = defineProps(commandBarProps)
const emits = defineEmits(commandBarEmits)

const { theme, thisOptions, itemClick, backgroundLightColor, borderLightColor, showDropDown, currentLeft, thisValue, chooseItem, optionsInit, outsideClickDestroy, outsideClickInit, root } = useCommandBar(props, emits)

onMounted(() => {
    optionsInit()
    outsideClickInit()
})
onBeforeUnmount(() => {
    outsideClickDestroy()
})
</script>

<template>
    <div ref="root" class="fv-CommandBar" :class="[theme]" :style="{ background: background }">
        <div class="left-command-bar-container">
            <span
                v-show="valueTrigger(item.show)"
                v-for="(item, index) in thisOptions"
                class="command-bar-item"
                :class="[valueTrigger(item.type) == 'divider' ? 'hr' : 'normal', {not_disabled: !valueTrigger(item.disabled)}, {disabled: valueTrigger(item.disabled)}]"
                :key="index"
                :title="valueTrigger(item.name)"
                :style="{background: valueTrigger(item.background), color: valueTrigger(item.foreground)}"
                @click="itemClick($event, item)"
            >
                <span
                    v-show="valueTrigger(item.type) !== 'more'"
                    class="s1-container"
                >
                    <fv-reveal-container
                        v-if="valueTrigger(item.type) != 'divider' && !valueTrigger(item.disabled)"
                        :parent="() => $el"
                        class="fv-command-bar-reveal-container"
                        :backgroundColor="backgroundLightColor"
                        :borderColor="borderLightColor"
                        :borderGradientSize="80"
                        :borderWidth="1"
                        :borderRadius="6"
                    ></fv-reveal-container>
                    <i
                        class="ms-Icon icon"
                        :class="[`ms-Icon--${valueTrigger(item.icon)}`]"
                        :style="{color: valueTrigger(item.iconColor)}"
                    ></i>
                    <p
                        v-show="!compact"
                        class="name"
                        :style="{color: valueTrigger(item.foreground)}"
                    >
                        {{valueTrigger(item.name)}}
                    </p>
                    <i
                        v-show="item.secondary.length > 0"
                        class="ms-Icon ms-Icon--ChevronDown icon"
                        :style="{color: valueTrigger(item.foreground)}"
                    ></i>
                </span>
                <span v-show="callFunction(item.type) === 'more'" class="s1-container">
                    <i class="ms-Icon ms-Icon--More icon"></i>
                </span>
            </span>
        </div>
        <div class="right-command-bar-container">
            <slot name="right-space"></slot>
        </div>
        <transition :name="toward == 'down' ? 'zoom-in-top' : 'zoom-in-bottom'">
            <div v-show="showDropDown" class="command-bar-list-view-container" :class="{ 'toward-up': toward == 'up' }"
                :style="{ left: `${currentLeft}px`, background: background }">
                <fv-list-view v-model="thisValue.secondary" style="height: auto;" @chooseItem="chooseItem">
                    <template v-slot:listItem="x">
                        <i v-show="callFunction(x.item.icon) !== undefined" class="ms-Icon icon"
                            :class="[`ms-Icon--${callFunction(x.item.icon)}`]"
                            :style="{ color: callFunction(x.item.iconColor) }" style="font-size: 12px;"></i>
                        <p class="name" style="font-size: 12px;">{{ callFunction(x.item.name) }}</p>
                    </template>
                </fv-list-view>
            </div>
        </transition>
    </div>
</template>
