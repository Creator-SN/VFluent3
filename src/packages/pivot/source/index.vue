<template>
    <div
        class="fv-Pivot"
        :class="[$theme, tab ? 'tab' : '']"
        :style="{
            padding: padding,
            background: background,
            borderRadius: borderRadius
        }"
    >
        <div class="pivot-wrapper">
            <div class="pivot-container">
                <span
                    v-show="valueTrigger(item.show)"
                    class="pivot-item"
                    v-for="(item, index) in thisItems"
                    :key="index"
                    :class="{
                        choose: eqal(item),
                        disabled: valueTrigger(item.disabled)
                    }"
                    :ref="`item_${index}`"
                    :style="{ width: itemWidth(item), padding: itemPadding }"
                    @click="itemClick(item)"
                >
                    <slot
                        name="container"
                        :item="item"
                        :index="index"
                        :eqal="eqal"
                        :valueTrigger="valueTrigger"
                    >
                        <p
                            :style="{
                                fontSize: `${fontSize}px`,
                                color: eqal(item)
                                    ? choosenForeground
                                    : foreground
                            }"
                        >
                            {{ valueTrigger(item.name) }}
                        </p>
                    </slot>
                </span>
            </div>
            <slider
                v-if="thisItems.length > 0"
                :idx="currentIdx"
                :els="currentEls"
                :sliderBoxshadow="sliderBoxshadow"
                :background="sliderBackground"
                :sliderBorderRadius="sliderBorderRadius"
            ></slider>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { commonProps } from '@/packages/common/props';

const emits = defineEmits(['update:modelValue', 'change']);

const props = defineProps({
    ...commonProps,
    modelValue: {
        default: () => {
            return null;
        }
    },
    items: {
        default: () => [{ name: 'Pivot', width: 80 }]
    },
    tab: {
        default: false
    },
    padding: {
        default: ''
    },
    itemPadding: {
        default: ''
    },
    fontSize: {
        default: ''
    },
    foreground: {
        default: ''
    },
    choosenForeground: {
        default: ''
    },
    sliderBackground: {
        default: ''
    },
    sliderBoxshadow: {
        default: false
    },
    sliderBorderRadius: {
        default: '3px'
    },
    background: {
        default: ''
    },
    borderRadius: {
        default: ''
    }
});
</script>

<script>
import slider from './sub/slider.vue';

import { useTheme } from '@/utils/common';

export default {
    name: 'FvPivot',
    components: {
        slider
    },

    data() {
        return {
            thisItems: [],
            thisValue: null,
            currentIdx: 0,
            currentEls: [],
            styles: {
                slider: {
                    background: ''
                },
                container: {
                    color: ''
                }
            }
        };
    },
    watch: {
        modelValue(val) {
            this.findCurrentValue();
        },
        items(val) {
            this.itemsInit();
        },
        thisValue(val) {
            this.$emit('update:modelValue', val);
            this.$emit('change', val);
            this.refreshIdx();
        },
        foreground(val) {
            this.stylesInit();
        },
        sliderBackground(val) {
            this.stylesInit();
        }
    },
    computed: {
        itemWidth() {
            return (item) => {
                if (!item.width) return 'auto';
                let val = this.valueTrigger(item.width);
                if (parseFloat(val).toString() === 'NaN') {
                    return val;
                }
                if (isNaN(val)) {
                    return val;
                }
                return `${val}px`;
            };
        },
        $theme() {
            return useTheme(this.$props).theme.value;
        }
    },
    mounted() {
        this.itemsInit();
        this.defaultItemInit();
    },
    methods: {
        itemsInit() {
            let model = {
                name: 'Pivot',
                show: true,
                disabled: false
            };
            let items = [];
            for (let item of this.items) {
                let m = JSON.parse(JSON.stringify(model));
                Object.assign(m, item);
                items.push(m);
            }
            this.thisItems = items;
            this.findCurrentValue();
            this.$nextTick(() => {
                this.refreshCurrentEls();
            });
        },
        findCurrentValue() {
            if (!this.modelValue) {
                let defaultItem = this.thisItems.find(
                    (it) =>
                        this.valueTrigger(it.show) &&
                        !this.valueTrigger(it.disabled)
                );
                if (defaultItem) this.thisValue = defaultItem;
                else {
                    this.thisValue = {};
                    console.warn('No visible item in ItemList.');
                }
                return;
            }
            if (this.modelValue.key) {
                let match = this.thisItems.find(
                    (item) => item.key === this.modelValue.key
                );
                if (match) this.thisValue = match;
                return;
            } else if (this.valueTrigger(this.modelValue.name)) {
                let match = this.thisItems.find(
                    (item) =>
                        this.valueTrigger(item.name) ===
                        this.valueTrigger(this.modelValue.name)
                );
                if (match) this.thisValue = match;
            }
        },
        defaultItemInit() {
            if (!this.thisValue || !this.valueTrigger(this.thisValue.show)) {
                this.thisValue = this.thisItems.find(
                    (it) =>
                        this.valueTrigger(it.show) &&
                        !this.valueTrigger(it.disabled)
                );
            }
        },
        refreshIdx() {
            if (!this.thisValue || !this.thisValue.key) {
                this.currentIdx = 0;
                return;
            }
            let index = this.thisItems.findIndex(
                (item) => item.key === this.thisValue.key
            );
            if (index < 0) index = 0;
            this.currentIdx = index;
        },
        refreshCurrentEls() {
            let result = [];
            for (let i = 0; i < this.thisItems.length; i++) {
                result.push({
                    el: this.$refs[`item_${i}`]
                        ? this.$refs[`item_${i}`][0]
                        : null,
                    show: this.valueTrigger(this.thisItems[i].show)
                });
            }
            this.currentEls = result;
        },
        itemClick(item) {
            if (item.disabled) return 0;
            this.thisValue = item;
        },
        eqal(item) {
            if (!this.thisValue) return false;
            if (this.thisValue['key'])
                return this.thisValue['key'] === item['key'];
            if (this.valueTrigger(this.thisValue['name']))
                return (
                    this.valueTrigger(this.thisValue['name']) ===
                    this.valueTrigger(item['name'])
                );
            return false;
        },
        valueTrigger(val) {
            if (typeof val === 'function') return val();
            return val;
        }
    }
};
</script>
