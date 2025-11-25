<template>
    <div class="fv-Pagination" :class="[$theme]">
        <div class="fv-pagination-container">
            <fv-button
                :disabled="thisValue == 1 || isDisabled"
                :class="{ small: small }"
                class="page-btn"
                :theme="theme"
                :background="background"
                :reveal-background-color="revealBackgroundColor"
                :reveal-border-color="revealBorderColor"
                :is-box-shadow="shadow"
                :borderRadius="borderRadius"
                @click="prev"
            >
                <i class="ms-Icon ms-Icon--ChevronLeft"></i>
            </fv-button>
            <template v-for="(item, index) in itemList">
                <fv-button
                    v-if="item.show"
                    :key="index"
                    :class="{ small: small }"
                    class="page-btn"
                    :theme="theme"
                    :disabled="isDisabled"
                    :background="background"
                    :reveal-background-color="revealBackgroundColor"
                    :reveal-border-color="revealBorderColor"
                    :foreground="thisValue == item.num ? foreground : ''"
                    :is-box-shadow="shadow"
                    :borderRadius="borderRadius"
                    fontWeight="bold"
                    @click="handleClick(item)"
                >
                    <p :class="[{ 'ms-Icon ms-Icon--More': item.num < 0 }]">
                        {{ item.num >= 0 ? item.num : '' }}
                    </p>
                </fv-button>
            </template>
            <fv-button
                :disabled="thisValue == total || isDisabled"
                :class="{ small: small }"
                class="page-btn"
                :theme="theme"
                :background="background"
                :reveal-background-color="revealBackgroundColor"
                :reveal-border-color="revealBorderColor"
                :is-box-shadow="shadow"
                :borderRadius="borderRadius"
                @click="next"
            >
                <i class="ms-Icon ms-Icon--ChevronRight"></i>
            </fv-button>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { commonProps } from '@/packages/common/props';

const emits = defineEmits([
    'update:modelValue',
    'next-click',
    'prev-click',
    'page-click'
]);

const props = defineProps({
    ...commonProps,
    emits: ['update:modelValue', 'next-click', 'prev-click', 'page-click'],
    modelValue: {
        default: 1
    },
    foreground: {
        default: 'rgba(0, 90, 158, 1)'
    },
    background: {
        default: 'transparent'
    },
    borderRadius: {
        default: 3
    },
    revealBackgroundColor: {
        default: ''
    },
    revealBorderColor: {
        default: ''
    },
    total: {
        default: 10
    },
    maxVisual: {
        default: 7
    },
    small: {
        default: false
    },
    shadow: {
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
    name: 'FvPagination',
    data() {
        return {
            thisValue: this.modelValue,
            itemList: []
        };
    },
    watch: {
        modelValue(val) {
            this.thisValue = val;
        },
        thisValue(val) {
            this.$emit('update:modelValue', val);
            this.pageItem();
        },
        total(val) {
            if (val <= 0) this.itemList = [];
            else this.pageItem();
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
        if (this.total <= 0) this.itemList = [];
        else this.pageItem();
    },
    methods: {
        pageItem() {
            let result = [];
            let l = (this.thisValue - 2) * 2 + 3 <= this.maxVisual;
            let r = (this.total - this.thisValue - 1) * 2 + 3 <= this.maxVisual;
            if (this.total <= this.maxVisual) l = r = true;
            let remain =
                this.thisValue == 1 || this.thisValue == this.total
                    ? this.maxVisual - 2
                    : this.maxVisual - 3;
            for (let i = 0; i < this.total; i++) {
                result.push({
                    num: i + 1,
                    index: i,
                    show: false
                });
            }
            result[0].show = true;
            result[result.length - 1].show = true;
            let cur_index = result.find(
                (item) => item.num === this.thisValue
            ).index;
            result[cur_index].show = true;
            for (
                let i = 1;
                cur_index + i < result.length || cur_index - i > 0;
                i++
            ) {
                if (cur_index - i > 0 && remain > 0) {
                    result[cur_index - i].show = true;
                    remain--;
                }
                if (cur_index + i < result.length - 1 && remain > 0) {
                    result[cur_index + i].show = true;
                    remain--;
                }
            }
            if (!l)
                result.splice(1, 0, {
                    num: -1,
                    index: -1,
                    show: true
                });
            if (!r)
                result.splice(this.total - 1, 0, {
                    num: -2,
                    index: -2,
                    show: true
                });
            this.itemList = result;
        },
        next() {
            this.thisValue++;
            this.$emit('next-click', this.thisValue);
        },
        prev() {
            this.thisValue--;
            this.$emit('prev-click', this.thisValue);
        },
        handleClick(item) {
            if (item.index >= 0) this.thisValue = item.num;
            else if (item.index == -1)
                this.thisValue =
                    this.thisValue - this.maxVisual + 2 >= 1
                        ? this.thisValue - this.maxVisual + 2
                        : 1;
            else if (item.index == -2)
                this.thisValue =
                    this.thisValue + this.maxVisual - 2 <= this.total
                        ? this.thisValue + this.maxVisual - 2
                        : this.total;
            this.$emit('page-click', this.thisValue);
        }
    }
};
</script>
