<script lang='ts' setup>
import { isDefined, useTheme } from '@/utils/common';
import { datePickerEmits, datePickerProps, useDatePicker } from '.';
import { vHover } from '@/utils/common/directive';
import { onBeforeUnmount, onMounted, onUnmounted } from 'vue';

defineOptions({
    name: "FvDatePicker"
})

const props = defineProps(datePickerProps)
const emits = defineEmits(datePickerEmits)

const { theme } = useTheme(props)

const { focus, popper, hoverUpAndDown, clickItem, monthElement, yearElement, dayElement, config, style, options, hover, weekIndex, confirm, cancel, init, windowEvent, optionsConfig, root } = useDatePicker(props, emits)

onMounted(() => {
    init()
    for (let key in windowEvent) {
        window.addEventListener(key as (keyof typeof windowEvent), windowEvent[key as keyof typeof windowEvent])
    }
})

onBeforeUnmount(() => {
    if (isDefined(dayElement.value) && isDefined(optionsConfig.value.day.scroll))
        dayElement.value.removeEventListener('scroll', optionsConfig.value.day.scroll)
    if (isDefined(monthElement.value) && isDefined(optionsConfig.value.month.scroll))
        monthElement.value.removeEventListener('scroll', optionsConfig.value.month.scroll)
    if (isDefined(yearElement.value) && isDefined(optionsConfig.value.year.scroll))
        yearElement.value.removeEventListener('scroll', optionsConfig.value.year.scroll)
    for (let key in windowEvent) {
        window.removeEventListener(key as keyof typeof windowEvent, windowEvent[key as keyof typeof windowEvent])
    }
})

defineExpose({
    focus
})

</script>

<template>
    <div ref="root" class="fv-DatePicker" :class="[theme, { disabled: disabled }]">
        <!-- Outside Box -->
        <div class="fv-DatePicker__input" :style="{ background: inputBackground }" @click="focus()">
            <button v-if="!hideMonth" class="fv-DatePicker__input-month">{{ months[modelValue.getMonth()] }}</button>
            <button v-if="!hideDay" class="fv-DatePicker__input-day" :style="{ borderColor: innerBorderColor }">
                {{ modelValue.getDate() }}
                <span v-if="showWeek">({{ weeks[modelValue.getDay()] }})</span>
            </button>
            <button v-if="!hideYear" :style="{ borderColor: innerBorderColor }" class="fv-DatePicker__input-year">{{
                modelValue.getFullYear()
            }}</button>
        </div>
        <!-- Popper Box -->
        <transition name="fv-DatePicker__options">
            <div v-show="popper.show" class="fv-DatePicker__input-options" :style="{ background: optionBackground }">
                <div class="fv-DatePicker__input-body">
                    <div class="fv-DatePicker__input-center-mask" :style="{ background: selectedBackground }"></div>
                    <!-- Month Column -->
                    <div v-if="!hideMonth" class="fv-DatePicker__input-options-col" v-hover="hoverUpAndDown" key="col1">
                        <div class="fv-DatePicker__input-options-col-up"
                            @click="clickItem(monthElement, config.buffer - 1)">
                            <i class="ms-Icon ms-Icon--CaretUpSolid8"></i>
                        </div>
                        <div ref="monthElement" :style="style.monthCol" class="fv-DatePicker__input-options-col-items">
                            <div class="fv-DatePicker__input-options-col-item" v-for="(item, index) in options.month"
                                v-hover="hover" :key="`month${item}${index}`" @click="clickItem(monthElement, index)">
                                {{ months[item] }}
                            </div>
                        </div>
                        <div class="fv-DatePicker__input-options-col-down"
                            @click="clickItem(monthElement, config.buffer + 1)">
                            <i class="ms-Icon ms-Icon--CaretDownSolid8"></i>
                        </div>
                    </div>
                    <!-- Day Column -->
                    <div v-if="!hideDay" class="fv-DatePicker__input-options-col" v-hover="hoverUpAndDown" key="col2">
                        <div class="fv-DatePicker__input-options-col-up"
                            @click="clickItem(dayElement, config.buffer - 1)">
                            <i class="ms-Icon ms-Icon--CaretUpSolid8"></i>
                        </div>
                        <div ref="dayElement" :style="style.dayCol" class="fv-DatePicker__input-options-col-items">
                            <div class="fv-DatePicker__input-options-col-item" v-hover="hover"
                                v-for="(item, index) in options.day" :key="`day${item}${index}`"
                                @click="clickItem(dayElement, index)">
                                {{ item > 0 ? item : '' }}
                                <span v-if="showWeek">({{ weeks[weekIndex(item)] }})</span>
                            </div>
                        </div>
                        <div class="fv-DatePicker__input-options-col-down"
                            @click="clickItem(dayElement, config.buffer + 1)">
                            <i class="ms-Icon ms-Icon--CaretDownSolid8"></i>
                        </div>
                    </div>
                    <!-- Year Column -->
                    <div v-if="!hideYear" class="fv-DatePicker__input-options-col" v-hover="hoverUpAndDown" key="col3">
                        <div class="fv-DatePicker__input-options-col-up"
                            @click="clickItem(yearElement, config.buffer - 1)">
                            <i class="ms-Icon ms-Icon--CaretUpSolid8"></i>
                        </div>
                        <div ref="yearElement" class="fv-DatePicker__input-options-col-items">
                            <div class="fv-DatePicker__input-options-col-item" v-for="(item, index) in options.year"
                                v-hover="hover" :key="`year${item}${index}`" @click="clickItem(yearElement, index)">
                                {{ item > 0 ? item : '' }}
                            </div>
                        </div>
                        <div class="fv-DatePicker__input-options-col-down"
                            @click="clickItem(yearElement, config.buffer + 1)">
                            <i class="ms-Icon ms-Icon--CaretDownSolid8"></i>
                        </div>
                    </div>
                </div>
                <div class="fv-DatePicker__input-options-bottom-bar">
                    <button class="fv-DatePicker__input-options-accept" v-hover="hover" @click="confirm">
                        <i class="ms-Icon ms-Icon--Accept" > </i>
                    </button>
                    <button class="fv-DatePicker__input-options-cancel" v-hover="hover" @click="cancel">
                        <i class="ms-Icon ms-Icon--Cancel"></i>
                    </button>
                </div>
            </div>
        </transition>
    </div>
</template>
