<template>
    <div
        class="fv-MenuFlyout"
        :class="[$theme, { disabled: isDisabled }]"
        :style="{
            'z-index': status ? 30 : '',
            overflow: 'visible'
        }"
    >
        <slot name="input" :switch="switchStatus">
            <fv-text-box
                :model-value="computedValue"
                :placeholder="placeholder"
                :theme="$theme"
                readonly
                :background="inputBackground"
                :foreground="inputForeground"
                :border-radius="borderRadius"
                :icon="dropDownIcon"
                :icon-foreground="dropDownIconForeground"
                :reveal-background-color="revealBorderColor"
                :reveal-border-color="revealBackgroundColor"
                :reveal-border-width="borderWidth"
                :reveal-border="revealBorder"
                :is-box-shadow="isBoxShadow"
                :disabled="isDisabled"
                :cursor="'default'"
                @click="switchStatus"
                @mouseenter="switchStatus"
            ></fv-text-box>
        </slot>
        <menu-flyout-children-container
            v-show="status"
            :modelValue="options"
            :background="background"
            :choosenBackground="choosenBackground"
            :titleForeground="titleForeground"
            :triggerMode="triggerMode"
            :mobileMode="mobileMode"
            :menuWidth="menuWidth"
            :menuMaxHeight="menuMaxHeight"
            :parent-node="$el"
            :parent-wrapper="wrapperNode"
            :theme="$theme"
            :zIndex="2"
            @choose-item="Choose"
            @destroy-me="status = false"
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

const emits = defineEmits([
    'update:modelValue',
    'choose-item',
    'choose-item-path'
]);

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
        default: 1
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
    menuWidth: {
        default: 200
    },
    menuMaxHeight: {
        default: 350
    },
    rootTriggerMode: {
        default: 'click'
    },
    triggerMode: {
        default: 'enter'
    },
    wrapperNode: {
        default: null
    },
    revealBorder: {
        default: true
    },
    revealBorderColor: {
        default: false
    },
    revealBackgroundColor: {
        default: false
    },
    mobileMode: {
        default: false
    },
    isBoxShadow: {
        default: true
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
            if (!event.composedPath().includes(this.$el)) {
                this.status = false;
            }
        },
        valueTrigger(val) {
            if (typeof val === 'function') return val();
            return val;
        },
        Choose(event) {
            this.thisValue = event;
            this.$emit(
                'choose-item',
                this.thisValue[this.thisValue.length - 1]
            );
            this.$emit('choose-item-path', this.thisValue);
            this.status = false;
        },
        switchStatus(event) {
            if (this.rootTriggerMode === 'click' && event.type !== 'click')
                return;
            if (this.isDisabled) return;
            this.status = !this.status;
        }
    },
    beforeUnmount() {
        window.removeEventListener('click', this.outSideClickEvent);
        window.removeEventListener('touchend', this.outSideClickEvent);
    }
};
</script>
