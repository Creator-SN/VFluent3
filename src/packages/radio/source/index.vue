<template>
    <div
        class="fv-Radio"
        :class="[
            $theme,
            { 'with-icon': icon || image },
            { actived: isActived },
            { disabled: isDisabled }
        ]"
        @click="click"
        :style="{
            'border-color': isActived ? foreground : '',
            'border-radius': `${iconBlockBorderRadius}px`,
            'border-width': `${iconBlockBorderWidth}px`
        }"
    >
        <input
            type="radio"
            ref="button"
            class="fv-radio-button"
            :style="{
                background: isActived ? foreground : ''
            }"
            :class="[{ actived: isActived }, { disabled: isDisabled }]"
        />
        <label class="fv-radio-label" :style="{ color: color }">
            <template v-if="image">
                <img
                    :src="
                        isActived ? (activeImage ? activeImage : image) : image
                    "
                />
            </template>
            <i
                v-else-if="icon"
                class="with-icon ms-Icon"
                :class="'ms-Icon--' + icon"
            ></i>
            <span>
                <slot></slot>
            </span>
        </label>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { commonProps } from '@/packages/common/props';

const emits = defineEmits(['update:modelValue', 'click', 'actived']);

const props = defineProps({
    ...commonProps,
    modelValue: {
        type: [String, Number, Boolean],
        default: ''
    },
    label: {
        type: [String, Number],
        required: true
    },
    color: {
        type: String,
        default: ''
    },
    foreground: {
        type: String,
        default: 'rgba(0, 90, 158, 0.8)'
    },
    icon: {
        type: String,
        default: null
    },
    iconBlockBorderRadius: {
        type: Number,
        default: 6
    },
    iconBlockBorderWidth: {
        type: Number,
        default: 2
    },
    image: {
        type: String,
        default: null
    },
    activeImage: {
        type: String,
        default: null
    },
    disabled: {
        type: Boolean,
        default: false
    }
});
</script>

<script>
import { useTheme } from '@/utils/common';

export default {
    name: 'FvRadio',
    computed: {
        $theme() {
            return useTheme(this.$props).theme.value;
        },
        isActived() {
            // return !this.isDisabled && this.model==this.label;
            // [2020-5-13][fix] fix value display issue
            return this.model == this.label;
        },
        isDisabled() {
            return this.disabled;
        },
        model: {
            get() {
                return this.modelValue;
            },
            set(val) {
                this.$emit('update:modelValue', val);
            }
        }
    },
    methods: {
        click() {
            if (this.isDisabled) return;
            this.$emit('update:modelValue', this.label);
            if (this.isActived) {
                this.$emit('actived');
            }
            this.$emit('click');
        }
    }
};
</script>
