<template>
    <div
        class="fv-Combobox"
        :class="[$theme, { disabled: isDisabled }]"
        :style="{
            background: background,
            padding: borderWidth,
            'border-radius': formatBorderRadiusSize(borderRadius),
            'z-index': status ? 5 : '',
            overflow: 'visible'
        }"
    >
        <div
            class="combobox-container"
            :class="{'is-box-shadow': isBoxShadow}"
            @click.stop="status = !isDisabled ? !status : false"
            :style="{
                background: inputBackground,
                'border-radius': formatBorderRadiusSize(borderRadius)
            }"
        >
            <fv-reveal-container
                :parent="() => $el"
                class="fv-combobox-reveal-container"
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
                :value="valueTrigger(thisValue.text)"
                :style="{
                    fontSize: formatFontSize(inputFontSize),
                    fontWeight: inputFontWeight,
                    color: inputForeground,
                    borderColor: borderColor,
                    'border-radius': formatBorderRadiusSize(borderRadius)
                }"
            />
            <i
                class="ms-Icon right-icon"
                :class="[`ms-Icon--${dropDownIcon}`]"
                :style="{ color: dropDownIconForeground }"
            ></i>
        </div>
        <transition name="fv-combobox">
            <div
                v-show="status"
                class="combobox-item-container"
                :style="{ background: background, overflow: 'auto' }"
                ref="co_items"
            >
                <div
                    v-for="(item, index) in options"
                    class="fv-combobox-item"
                    :class="{
                        hr: valueTrigger(item.type) == 'divider',
                        normal:
                            (valueTrigger(item.type) == 'default' ||
                                valueTrigger(item.type) == undefined) &&
                            !valueTrigger(item.disabled),
                        disabled: valueTrigger(item.disabled),
                        choose: item.key === thisValue.key,
                        title: valueTrigger(item.type) == 'header'
                    }"
                    :style="{
                        height: `${itemHeight}px`,
                        fontSize: formatFontSize(dropDownFontSize),
                        fontWeight: dropDownFontWeight,
                        background:
                            item.key === thisValue.key ? choosenBackground : '',
                        color:
                            valueTrigger(item.type) === 'header'
                                ? titleForeground
                                : ''
                    }"
                    @click.stop="Choose($event, item)"
                    :key="index"
                    :title="valueTrigger(item.text)"
                >
                    <slot :item="item">
                        <i
                            class="before-choosen"
                            :style="{ background: choosenSliderBackground }"
                        ></i>
                        {{
                            valueTrigger(item.type) !== 'divider'
                                ? valueTrigger(item.text)
                                : ''
                        }}
                    </slot>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { commonProps } from '@/packages/common/props';
import { formatFontSize, formatBorderRadiusSize } from '@/utils/common/css-size';

const emits = defineEmits();

const props = defineProps({
    ...commonProps,
    modelValue: {
        default: () => {
            return {};
        }
    },
    options: {
        default: () => []
    },
    borderWidth: {
        default: 1
    },
    placeholder: {
        default: 'Combobox'
    },
    borderColor: {
        default: ''
    },
    borderRadius: {
        default: 6
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
    inputFontSize: {
        default: ''
    },
    inputFontWeight: {
        default: ''
    },
    dropDownFontSize: {
        default: ''
    },
    dropDownFontWeight: {
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
    itemHeight: {
        default: 40
    },
    dropDownIcon: {
        default: 'ChevronDown'
    },
    dropDownIconForeground: {
        default: ''
    },
    revealBorderColor: {
        default: false
    },
    revealBackgroundColor: {
        default: false
    },
    isBoxShadow: {
        default: false
    },
    disabled: {
        default: false
    }
});
</script>

<script>
import { useTheme } from '@/utils/common';

export default {
    name: 'FvCombobox',

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
        Choose(event, item) {
            if (this.valueTrigger(item.disabled)) return 0;
            if (
                this.valueTrigger(item.type) == 'header' ||
                this.valueTrigger(item.type) == 'divider'
            )
                return 0;
            this.thisValue = item;
            let target = event.target;
            while (
                !target.getAttribute('class') ||
                target.getAttribute('class').indexOf('fv-combobox-item') < 0
            ) {
                target = target.parentNode;
            }
            this.$refs.co_items.scrollTop = target.offsetTop;
            this.status = false;
            this.$emit('choose-item', this.thisValue);
        }
    },
    beforeUnmount() {
        window.removeEventListener('click', this.outSideClickEvent);
        window.removeEventListener('touchend', this.outSideClickEvent);
    }
};
</script>
