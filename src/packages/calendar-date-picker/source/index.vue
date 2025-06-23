<template>
    <div
        class="fv-CalendarDatePicker"
        :class="[$theme, { disabled: isDisabled }]"
    >
        <picker-input
            v-model="dates"
            :placeholder="placeholder"
            :theme="$theme"
            :disabled="isDisabled"
            :borderWidth="borderWidth"
            :borderRadius="borderRadius"
            :inputForeground="inputForeground"
            :inputBackground="inputBackground"
            :dropDownIcon="dropDownIcon"
            :dropDownIconForeground="dropDownIconForeground"
            @click.native="show.calendar = !isDisabled ? !show.calendar : false"
        ></picker-input>
        <transition name="fv-calendar-container">
            <div v-if="show.calendar" class="calendar-container">
                <fv-calendar-view
                    v-model="thisValue"
                    :multiple="multiple"
                    :start="start"
                    :end="end"
                    :lan="lan"
                    :theme="theme"
                    @choosen-dates="chooseDates"
                ></fv-calendar-view>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { commonProps } from '@/packages/common/props';

const emits = defineEmits(['update:modelValue']);

const props = defineProps({
    ...commonProps,
    modelValue: {
        default: () => new Date()
    },
    start: {
        default: 1900
    },
    end: {
        default: 3000
    },
    lan: {
        default: 'en'
    },
    borderWidth: {
        default: 2
    },
    placeholder: {
        default: 'Pick a day'
    },
    borderRadius: {
        default: '3'
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
    multiple: {
        default: 'single'
    },
    disabled: {
        default: false
    }
});
</script>

<script>
import pickerInput from './input/input.vue';

import { useTheme } from '@/utils/common';

export default {
    name: 'FvCalendarDatePicker',

    components: {
        pickerInput
    },

    data() {
        return {
            thisValue: this.$SDate.Parse(
                this.$SDate.DateToString(this.modelValue)
            ),
            dates: [],
            show: {
                calendar: false
            }
        };
    },
    watch: {
        value(val, from) {
            if (!this.$SDate.IsSameDate(val, from)) {
                this.thisValue = this.$SDate.Parse(
                    this.$SDate.DateToString(val)
                );
                if (this.multiple == 'single')
                    this.dates = [
                        {
                            year: val.getFullYear(),
                            month: val.getMonth(),
                            no: val.getDate()
                        }
                    ];
            }
        },
        thisValue(val, from) {
            this.$emit(
                'update:modelValue',
                this.$SDate.Parse(this.$SDate.DateToString(this.thisValue))
            );
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
        $theme() {
            return useTheme(this.$props).theme.value;
        }
    },
    mounted() {
        this.outSideClickInit();
    },
    methods: {
        outSideClickInit() {
            window.addEventListener('click', (event) => {
                let x = event.target;
                let _self = false;
                while (x && x.tagName && x.tagName.toLowerCase() != 'body') {
                    if (x == this.$el) {
                        _self = true;
                        break;
                    }
                    x = x.parentNode;
                }
                if (!_self) this.show.calendar = false;
            });
            window.addEventListener('touchend', (event) => {
                let x = event.target;
                let _self = false;
                while (x && x.tagName && x.tagName.toLowerCase() != 'body') {
                    if (x == this.$el) {
                        _self = true;
                        break;
                    }
                    x = x.parentNode;
                }
                if (!_self) this.show.calendar = false;
            });
        },
        chooseDates(val) {
            this.dates = val;
            this.$emit('choosen-dates', val);
            if (this.multiple == 'single') this.show.calendar = false;
        }
    }
};
</script>
