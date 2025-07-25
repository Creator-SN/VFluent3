<template>
    <div
        class="fv-MenuFlyout"
        :class="[$theme, { disabled: isDisabled }]"
        :style="{
            background: background,
            padding: borderWidth,
            'border-radius': `${borderRadius}px`,
            'z-index': status ? 3 : '',
            overflow: 'visible'
        }"
    >
        <div
            class="menu-flyout-container"
            @click="status = !isDisabled ? !status : false"
            :style="{
                background: inputBackground,
                'border-radius': `${borderRadius}px`
            }"
        >
            <fv-reveal-container
                :parent="() => $el"
                class="fv-menu-flyout-reveal-container"
                :backgroundColor="backgroundLightColor"
                :borderColor="borderLightColor"
                :backgroundGradientSize="120"
                :borderGradientSize="80"
                :borderWidth="borderWidth"
                :borderRadius="borderRadius"
                :disabled="isDisabled"
            ></fv-reveal-container>
            <input
                class="input"
                :placeholder="placeholder"
                readonly
                :value="computedValue"
                :style="{
                    color: inputForeground,
                    'border-radius': `${borderRadius}px`
                }"
            />
            <i
                class="ms-Icon right-icon"
                :class="[`ms-Icon--${dropDownIcon}`]"
                :style="{ color: dropDownIconForeground }"
            ></i>
        </div>
        <menu-flyout-children-container
            v-show="status"
            :modelValue="thisValue"
            :options="options"
            :background="background"
            :choosenBackground="choosenBackground"
            :titleForeground="titleForeground"
            :theme="$theme"
            @choose-item="Choose"
        >
            <template v-slot:item="x">
                <slot
                    :item="x.item"
                    :choosenSliderBackground="x.choosenSliderBackground"
                >
                    <i
                        class="before-choosen"
                        :style="{ background: x.choosenSliderBackground }"
                    ></i>
                    {{
                        valueTrigger(x.item.type) !== 'divider'
                            ? valueTrigger(x.item.text)
                            : ''
                    }}
                    <i
                        v-show="x.item.children"
                        class="ms-Icon ms-Icon--ChevronRight after-expand"
                    ></i>
                </slot>
            </template>
        </menu-flyout-children-container>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { commonProps } from '@/packages/common/props';

const emits = defineEmits(['update:modelValue', 'choose-item']);

const props = defineProps({
    ...commonProps,
    modelValue: {
        default: () => {
            return [];
        }
    },
    options: {
        default: () => []
    },
    borderWidth: {
        default: 2
    },
    placeholder: {
        default: 'menuFlyout'
    },
    borderRadius: {
        default: '3'
    },
    background: {
        default: ''
    },
    choosenBackground: {
        default: ''
    },
    choosenSliderBackground: {
        default: ''
    },
    inputForeground: {
        default: ''
    },
    inputBackground: {
        default: ''
    },
    titleForeground: {
        default: ''
    },
    dropDownIcon: {
        default: 'ChevronDown'
    },
    dropDownIconForeground: {
        default: ''
    },
    pivotPlaceholder: {
        default: 'Please Choose'
    },
    revealBorderColor: {
        default: false
    },
    revealBackgroundColor: {
        default: false
    },
    disabled: {
        default: false
    }
});
</script>

<script>
import menuFlyoutChildrenContainer from './menuFlyoutChildrenContainer.vue';

import { useTheme } from '@/utils/common';

export default {
    name: 'FvMenuFlyout',

    components: {
        menuFlyoutChildrenContainer
    },

    data() {
        return {
            thisValue: this.modelValue,
            status: false
        };
    },
    watch: {
        modelValue(val) {
            this.thisValue = val;
        },
        thisValue(val) {
            this.$emit('update:modelValue', val);
        }
    },
    computed: {
        isDisabled() {
            return (
                this.options.length == 0 ||
                this.disabled.toString() == 'true' ||
                this.disabled == 'disabled' ||
                this.disabled === ''
            );
        },
        borderLightColor() {
            if (this.revealBorderColor) return this.revealBorderColor;
            if (this.$theme == 'light') {
                return 'rgba(121, 119, 117, 0.6)';
            }
            if (this.$theme == 'dark' || this.$theme == 'custom') {
                return 'rgba(255, 255, 255, 0.6)';
            }
            return 'rgba(121, 119, 117, 0.6)';
        },
        backgroundLightColor() {
            if (this.revealBackgroundColor) return this.revealBackgroundColor;
            if (this.$theme == 'light') {
                return 'rgba(121, 119, 117, 0.3)';
            }
            if (this.$theme == 'dark' || this.$theme == 'custom') {
                return 'rgba(255, 255, 255, 0.3)';
            }
            return 'rgba(121, 119, 117, 0.3)';
        },
        computedValue() {
            let finalText = [];
            for (let item of this.thisValue) {
                finalText.push(item.text);
            }
            return finalText.join(' / ');
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
            let x = event.target;
            let _self = false;
            while (x && x.tagName && x.tagName.toLowerCase() != 'body') {
                if (x == this.$el) {
                    _self = true;
                    break;
                }
                x = x.parentNode;
            }
            if (!_self) this.status = false;
        },
        valueTrigger(val) {
            if (typeof val === 'function') return val();
            return val;
        },
        Choose(event) {
            let { item, index } = event;
            if (index == -1) this.thisValue.push(item);
            else {
                this.thisValue.splice(index + 1);
                this.thisValue[index] = item;
            }
            if (!item.children) {
                this.status = false;
            }
            this.$emit('choose-item', this.thisValue);
        }
    },
    beforeUnmount() {
        window.removeEventListener('click', this.outSideClickEvent);
        window.removeEventListener('touchend', this.outSideClickEvent);
    }
};
</script>
