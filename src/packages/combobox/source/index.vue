<script lang="ts" setup>
import { callFunction } from '@/utils/common';
import { comboboxEmits, comboboxProps, useCombobox } from '.';
import { onBeforeMount, onMounted, onUnmounted } from 'vue';

defineOptions({
    name: "FvCombobox"
})

const emits = defineEmits(comboboxEmits)
const props = defineProps(comboboxProps)

const { choose, thisValue, status, backgroundLightColor, borderLightColor, root, coItems, outsideClickInit, outsideClickDestroy } = useCombobox(props, emits)

onMounted(() => {
    outsideClickInit()
})

onBeforeMount(() => {
    outsideClickDestroy()
})

</script>

<template>
    <div ref="root" class="fv-Combobox" :class="[theme, { disabled: props.disabled }]"
        :style="{ background: background, padding: borderWidth, 'border-radius': `${borderRadius}px`, 'z-index': status ? 3 : '', overflow: 'visible' }">
        <div class="combobox-container" @click="status = !props.disabled ? !status : false"
            :style="{ background: inputBackground, 'border-radius': `${borderRadius}px` }">
            <fv-reveal-container :parent="() => $el" class="fv-combobox-reveal-container"
                :backgroundColor="backgroundLightColor" :borderColor="borderLightColor" :backgroundGradientSize="120"
                :borderGradientSize="80" :borderWidth="borderWidth" :borderRadius="borderRadius"
                :disabled="props.disabled"></fv-reveal-container>
            <input class="input" :placeholder="placeholder" readonly :value="callFunction(thisValue.text)"
                :style="{ color: inputForeground, 'border-radius': `${borderRadius}px` }" />
            <i class="ms-Icon right-icon" :class="[`ms-Icon--${dropDownIcon}`]"
                :style="{ color: dropDownIconForeground }"></i>
        </div>
        <transition name="fv-combobox">
            <div v-show="status" class="combobox-item-container" :style="{ background: background, overflow: 'auto' }"
                ref="coItems">
                <div v-for="(item, index) in options" class="fv-combobox-item"
                    :class="{ hr: callFunction(item.type) == 'divider', normal: (callFunction(item.type) == 'default' || callFunction(item.type) == undefined) && !callFunction(item.disabled), disabled: callFunction(item.disabled), choose: item.key === thisValue.key, title: callFunction(item.type) == 'header' }"
                    :style="{ height: `${itemHeight}px`, background: item.key === thisValue.key ? choosenBackground : '', color: callFunction(item.type) === 'header' ? titleForeground : '' }"
                    @click="choose($event, item)" :key="index" :title="callFunction(item.text)">
                    <slot :item="item">
                        <i class="before-choosen" :style="{ background: choosenSliderBackground }"></i>
                        {{ callFunction(item.type) !== 'divider' ? callFunction(item.text) : '' }}
                    </slot>
                </div>
            </div>
        </transition>
    </div>
</template>
