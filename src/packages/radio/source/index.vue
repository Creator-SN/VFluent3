<template>
    <div
        class="fv-Radio"
        :class="[$theme, {'with-icon':icon || image},{actived:isActived},{disabled:isDisabled}]"
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
                'background': isActived ? foreground : ''
            }"
            :class="[{actived:isActived},{disabled:isDisabled}]"
        />
        <label
            class="fv-radio-label"
            :style="{color: color}"
        >
            <template v-if="image">
                <img :src="isActived?activeImage?activeImage:image:image" />
            </template>
            <i
                v-else-if="icon"
                class="with-icon ms-Icon"
                :class="'ms-Icon--'+icon"
            ></i>
            <span>
                <slot></slot>
            </span>
        </label>
    </div>
</template>

<script setup>
import {defineProps} from 'vue';
import { commonProps } from '@/packages/common/props';

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
    emits: ['update:modelValue', 'click', 'actived'],
    computed: {
        $theme() {
            return useTheme(this.$props).theme.value;
        },
        isActived() {
            // return !this.isDisabled && this.model==this.label;
            // [2020-5-13][fix] fix value display issue
            return this.model == this.label;
        },
        isGroup() {
            let parent = this.$parent;
            while (parent) {
                if (parent.$options.name != 'FvRadioGroup') {
                    parent = parent.$parent;
                } else {
                    this.setGroup(parent);
                    return true;
                }
            }
            return false;
        },
        isDisabled() {
            return this.isGroup
                ? this._group.disabled || this.disabled
                : this.disabled;
        },
        model: {
            get() {
                return this.isGroup ? this._group.value : this.modelValue;
            },
            set(val) {
                if (this.isGroup) {
                    this._group.$emit('update:modelValue', val);
                } else {
                    this.$emit('update:modelValue', val);
                }
            }
        }
    },
    mounted() {},
    methods: {
        click() {
            if (this.isDisabled) return;
            if (!this.isGroup) {
                this.$emit('update:modelValue', this.label);
            } else {
                this._group.$emit('update:modelValue', this.label);
                this._group.change(this.label);
            }
            if (this.isActived) {
                this.$emit('actived');
            }
            this.$emit('click');
        },
        setGroup(parent) {
            this._group = parent;
        }
    }
};
</script>

