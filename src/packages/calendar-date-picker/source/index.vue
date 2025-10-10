<template>
    <div
        class="fv-CalendarDatePicker"
        :class="[$theme, { disabled: isDisabled }]"
        :style="{ zIndex: show.calendar ? 5 : '' }"
    >
        <slot
            :displayContent="displayContent"
            :showCalendar="showCalendar"
            :disabled="isDisabled"
        >
            <fv-text-box
                v-model="displayContent"
                :placeholder="placeholder"
                :theme="$theme"
                :disabled="isDisabled"
                :borderWidth="borderWidth"
                :borderRadius="dropDownBorderRadius"
                :foreground="inputForeground"
                :background="inputBackground"
                :readonly="!editable"
                :icon="dropDownIcon"
                :icon-foreground="dropDownIconForeground"
                :reveal-border="dropDownRevealBorder"
                :is-box-shadow="dropDownIsBoxShadow"
                :title="displayContent"
                :cursor="!editable ? 'default' : ''"
                style="width: 100%"
                :style="{
                    ...dropDownStyles
                }"
                @keydown.enter="parseContent"
                @click="showCalendar"
            ></fv-text-box>
        </slot>
        <transition name="fv-calendar-container">
            <div v-if="show.calendar" class="calendar-container">
                <fv-calendar-view
                    :modelValue="computedDate"
                    :multiple="multiple"
                    v-model:choosen-dates="thisValue"
                    :foreground="foreground"
                    :background="background"
                    :borderRadius="borderRadius"
                    :nowDayColor="nowDayColor"
                    :rangeChooseColorFE="rangeChooseColorFE"
                    :rangeChooseColorMiddle="rangeChooseColorMiddle"
                    :theme="theme"
                    ref="calendar"
                    @choosen-dates="$emit('choosen-dates', $event)"
                    @choosen-dates-obj="$emit('choosen-dates-obj', $event)"
                >
                    <template v-slot:statement="x">
                        <slot
                            name="statement"
                            :value="x.value"
                            :dayRange="x.dayRange"
                        >
                            {{ x.value }}
                        </slot>
                    </template>
                    <template v-slot:weekday_content="x">
                        <slot name="weekday_content" :value="x.value">
                            {{ x.value }}
                        </slot>
                    </template>
                </fv-calendar-view>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { commonProps } from '@/packages/common/props';

const emits = defineEmits([
    'update:modelValue',
    'choosen-dates',
    'choosen-dates-obj'
]);

const props = defineProps({
    ...commonProps,
    modelValue: {
        default: () => []
    },
    borderWidth: {
        default: 1
    },
    placeholder: {
        default: 'Pick a day'
    },
    dropDownBorderRadius: {
        default: 6
    },
    inputForeground: {
        default: ''
    },
    inputBackground: {
        default: ''
    },
    dropDownIcon: {
        default: 'CalendarDay'
    },
    dropDownIconForeground: {
        default: ''
    },
    dropDownRevealBorder: {
        default: true
    },
    dropDownIsBoxShadow: {
        default: true
    },
    dropDownStyles: {
        default: () => ({})
    },
    editable: {
        default: false
    },
    multiple: {
        default: 'single'
    },
    choosenDates: {
        default: () => []
    },
    background: {
        default: ''
    },
    borderRadius: {
        default: ''
    },
    foreground: {
        default: ''
    },
    nowDayColor: {
        default: ''
    },
    rangeChooseColorFE: {
        default: ''
    },
    rangeChooseColorMiddle: {
        default: ''
    },
    disabled: {
        default: false
    }
});
</script>

<script>
import { useTheme } from '@/utils/common';

export default {
    name: 'FvCalendarDatePicker',

    data() {
        return {
            thisValue: this.modelValue,
            displayContent: '',
            show: {
                calendar: false
            }
        };
    },
    watch: {
        modelValue() {
            this.thisValue = this.modelValue;
        },
        thisValue: {
            handler() {
                if (this.multiple === 'single') this.show.calendar = false;
                this.$emit('update:modelValue', this.thisValue);
            },
            deep: true
        },
        computedContent: {
            handler() {
                this.displayContent = this.computedContent;
            },
            immediate: true
        }
    },
    computed: {
        isDisabled() {
            return (
                this.disabled.toString() == 'true' ||
                this.disabled == 'disabled' ||
                this.disabled === ''
            );
        },
        computedDate() {
            if (this.thisValue.length === 0) return new Date();
            return new Date(this.thisValue[0]);
        },
        computedContent() {
            let result = [];
            this.thisValue.forEach((el) => {
                result.push(this.$SDate.Format('YYYY-mm-dd', el));
            });
            return result.join(',');
        },
        $theme() {
            return useTheme(this.$props).theme.value;
        }
    },
    mounted() {
        this.outSideClickInit();
    },
    methods: {
        outSideClickInit() {
            window.addEventListener('click', this.outSideClickEvent);
            window.addEventListener('touchend', this.outSideClickEvent);
        },
        outSideClickEvent(event) {
            if (!event.composedPath().includes(this.$el))
                this.show.calendar = false;
        },
        showCalendar() {
            if (this.isDisabled) return;
            if (this.editable) {
                this.show.calendar = true;
            } else {
                this.show.calendar = !this.show.calendar;
            }
        },
        parseContent() {
            let resultDates = [];
            let results = this.displayContent.split(/[,，;；\.]/);
            for (let resultItem of results) {
                resultItem = resultItem.split(/[-\/]/);
                if (resultItem.length === 0 || resultItem.length > 3) return;
                for (let i = 0; i < resultItem.length; i++) {
                    let val = parseInt(resultItem[i]);
                    if (val.toString() === 'NaN' || val < 0 || val > 9999)
                        return;
                    if (i == 1) resultItem[i] = val - 1;
                    else resultItem[i] = val;
                }
                resultDates.push(new Date(...resultItem));
            }
            this.thisValue = resultDates;
        }
    },
    beforeUnmount() {
        window.removeEventListener('click', this.outSideClickEvent);
        window.removeEventListener('touchend', this.outSideClickEvent);
    }
};
</script>
