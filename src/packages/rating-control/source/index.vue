<template>
    <div class="fv-RatingControl" :class="[$theme]">
        <div class="fv-rating-container">
            <div
                v-for="(item, index) in maxRate"
                :key="index"
                class="fv-rating-unit"
                @mousemove="handlerHover($event, index)"
                @touchmove="handlerHover($event, index)"
                @mouseleave="handlerLeave(index)"
                @touchend="handlerLeave(index)"
                @click="handlerClick($event, index)"
            >
                <i
                    class="ms-Icon background"
                    :class="[`ms-Icon--${defaultIcon}`]"
                    :style="{ color: borderColor }"
                ></i>
                <div
                    v-show="itemShow(index)"
                    class="fv-rating-mask"
                    :style="{ width: `${itemRatio(index)}%` }"
                >
                    <i
                        class="ms-Icon foreground"
                        :class="[`ms-Icon--${selectedIcon}`]"
                        :style="{ color: selectedColor }"
                    ></i>
                </div>
            </div>
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
        default: 0
    },
    maxRate: {
        default: 5
    },
    halfRate: {
        default: false
    },
    defaultIcon: {
        type: String,
        default: 'FavoriteStar'
    },
    selectedIcon: {
        type: String,
        default: 'FavoriteStarFill'
    },
    borderColor: {
        type: String,
        default: ''
    },
    selectedColor: {
        type: String,
        default: ''
    },
    isClear: {
        default: false
    },
    readonly: {
        default: false
    }
});
</script>

<script>
import { useTheme } from '@/utils/common';

export default {
    name: 'FvRatingControl',

    data() {
        return {
            thisValue: this.modelValue,
            hover: []
        };
    },
    watch: {
        modelValue(val) {
            this.thisValue = val;
        },
        thisValue(val) {
            this.$emit('update:modelValue', val);
            this.$emit('change', val);
        },
        maxRate(val) {
            this.hover = new Array(val).fill({
                status: false,
                ratio: 100
            });
        }
    },
    mounted() {
        this.thisValue = this.modelValue;
        this.hover = new Array(this.maxRate).fill({
            status: false,
            ratio: 100
        });
    },
    computed: {
        itemShow() {
            return (index) => {
                if (this.hoverIndex < 0) return index - this.thisValue < 0;
                return index <= this.hoverIndex;
            };
        },
        itemRatio() {
            return (index) => {
                if (this.hoverIndex < 0) {
                    if (index + 1 <= parseInt(this.thisValue)) return 100;
                    return (this.thisValue - parseInt(this.thisValue)) * 100;
                }
                return this.hoverIndex === index
                    ? this.hover[index].ratio
                    : 100;
            };
        },
        hoverIndex() {
            return this.hover.findIndex((item) => item.status);
        },
        isReadOnly() {
            return (
                this.readonly.toString() == 'true' ||
                this.readonly == 'readonly' ||
                this.readonly === ''
            );
        },
        $theme() {
            return useTheme(this.$props).theme.value;
        }
    },
    methods: {
        handlerHover(event, index) {
            if (this.isReadOnly) return;
            let elWidth = event.target.offsetWidth;
            let { left: elLeft } = event.target.getBoundingClientRect();
            let { clientX: mouseLeft } = event.targetTouches
                ? event.targetTouches[0]
                : event;
            let ratio = ((mouseLeft - elLeft) / elWidth) * 100;
            let finalRatio = ratio > 50 || !this.halfRate ? 100 : 50;
            this.$emit('hover', {
                index: index,
                ratio: finalRatio
            });
            this.hover[index] = {
                status: true,
                ratio: finalRatio
            };
        },
        handlerLeave(index) {
            if (this.isReadOnly) return;
            this.hover[index] = { status: false, ratio: 100 };
            this.$emit('leave', index);
        },
        handlerClick(event, index) {
            if (this.isReadOnly) return;
            if (!this.halfRate) {
                if (this.isClear && this.thisValue == index + 1) {
                    this.thisValue = 0;
                    this.clearHover();
                    return;
                }
                this.thisValue = index + 1;
                return;
            }
            let elWidth = event.target.offsetWidth;
            let { left: elLeft } = event.target.getBoundingClientRect();
            let { clientX: mouseLeft } = event.targetTouches
                ? event.targetTouches[0]
                : event;
            let ratio = ((mouseLeft - elLeft) / elWidth) * 100;
            if (
                this.isClear &&
                this.thisValue == index + 1 - (ratio > 50 ? 0 : 0.5)
            ) {
                this.thisValue = 0;
                this.clearHover();
                return;
            }
            this.thisValue = index + 1 - (ratio > 50 ? 0 : 0.5);
        },
        clearHover() {
            for (let i = 0; i < this.maxRate; i++) {
                this.hover[i] = {
                    status: false,
                    ratio: 100
                };
            }
        }
    }
};
</script>
