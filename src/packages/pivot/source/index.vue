<template>
    <div
        class="fv-Pivot"
        :class="[$theme, tab ? 'tab' : '']"
        :style="{ background: background }"
    >
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
                :style="{ width: itemWidth(item) }"
                @click="itemClick(item)"
            >
                <slot name="container" :item="item" :index="index">
                    <p
                        :style="{
                            fontSize: `${fontSize}px`,
                            color: styles.container.color
                        }"
                    >
                        {{ valueTrigger(item.name) }}
                    </p>
                </slot>
            </span>
        </div>
        <slider
            v-if="thisItems.length > 0"
            :els="currentEls"
            :sliderBoxshadow="sliderBoxshadow"
            :background="styles.slider.background"
        ></slider>
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
    fontSize: {
        default: ''
    },
    foreground: {
        default: ''
    },
    sliderBackground: {
        default: ''
    },
    sliderBoxshadow: {
        default: false
    },
    background: {
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
                if (!item.width) return 0;
                if (isNaN(item.width)) {
                    return this.valueTrigger(item.width);
                }
                return `${item.width}px`;
            };
        },
        currentEls() {
            return () => {
                let index = -1;
                if (!this.thisValue) index = 0;
                else if (this.thisValue.key)
                    index = this.thisItems.findIndex(
                        (item) => item.key === this.thisValue.key
                    );
                else
                    index = this.thisItems.findIndex(
                        (item) =>
                            this.valueTrigger(item.name) ===
                            this.valueTrigger(this.thisValue.name)
                    );
                if (index < 0) index = 0;
                let result = [];
                for (let i = 0; i < this.thisItems.length; i++) {
                    result.push({
                        el: this.$refs[`item_${i}`]
                            ? this.$refs[`item_${i}`][0]
                            : null,
                        show: this.valueTrigger(this.thisItems[i].show)
                    });
                }
                return {
                    index: index,
                    els: result
                };
            };
        },
        $theme() {
            return useTheme(this.$props).theme.value;
        }
    },
    updated() {
        if (!this.thisValue || !this.valueTrigger(this.thisValue.show))
            this.thisValue = this.thisItems.find(
                (it) =>
                    this.valueTrigger(it.show) &&
                    !this.valueTrigger(it.disabled)
            );
    },
    mounted() {
        this.stylesInit();
        this.itemsInit();
    },
    methods: {
        itemsInit() {
            let model = {
                name: 'Pivot',
                width: 60,
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
        stylesInit() {
            this.styles.slider.background = this.sliderBackground;
            this.styles.container.color = this.foreground;
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
