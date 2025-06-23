<template>
    <div
        class="fv-ProgressRing"
        :class="[$theme]"
        :style="{ width: `${r * 2}px`, height: `${r * 2}px` }"
    >
        <svg
            v-show="!legacy"
            :width="`${r * 2}px`"
            :height="`${r * 2}px`"
            class="svg"
        >
            <circle
                :r="r - borderWidth"
                :cy="r"
                :cx="r"
                :stroke-width="borderWidth"
                :stroke="background"
                stroke-linejoin="round"
                stroke-linecap="round"
                fill="none"
            />
            <circle
                class="progress-rotate"
                :r="r - borderWidth"
                :cy="r"
                :cx="r"
                :stroke-width="borderWidth"
                :stroke="color"
                stroke-linejoin="round"
                stroke-linecap="round"
                fill="none"
                :stroke-dashoffset="`${
                    loading
                        ? l - (Loading.ratio / 100) * l
                        : l - (valueCache / 100) * l
                }px`"
                :stroke-dasharray="`${l}px`"
                :style="{
                    transform: `rotate(${loading ? Loading.rotate : -90}deg)`
                }"
            />
        </svg>
        <legacy v-show="legacy" :size="size" :color="color"></legacy>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { commonProps } from '@/packages/common/props';

const emits = defineEmits(['update:modelValue']);

const props = defineProps({
    ...commonProps,
    modelValue: {
        default: 0
    },
    size: {
        default: 'xs'
    },
    r: {
        default: 40
    },
    loading: {
        default: false
    },
    color: {
        default: 'rgba(0, 90, 158, 1)'
    },
    background: {
        default: 'rgba(204, 204, 204, 1)'
    },
    borderWidth: {
        default: 8
    },
    legacy: {
        default: false
    }
});
</script>

<script>
import gsap from 'gsap';
import legacy from './legacy.vue';

import { useTheme } from '@/utils/common';

export default {
    name: 'FvProgressRing',
    components: {
        legacy
    },
    data() {
        return {
            thisValue: this.modelValue,
            valueCache: this.modelValue,
            Loading: {
                ratio: 5,
                rotate: -90
            }
        };
    },
    watch: {
        modelValue(val) {
            this.thisValue = val;
        },
        async thisValue(val) {
            this.$emit('update:modelValue', val);
            await this.syncValue();
        }
    },
    computed: {
        l() {
            return (2 * Math.PI * (this.r - this.borderWidth)).toFixed(2);
        },
        $theme() {
            return useTheme(this.$props).theme.value;
        }
    },
    mounted() {
        this.loadingInit();
    },
    methods: {
        loadingInit() {
            gsap.to(this.$data.Loading, {
                ratio: 70,
                duration: 0.8,
                repeat: -1,
                yoyo: true,
                ease: 'linear'
            });

            gsap.to(this.$data.Loading, {
                rotate: 270,
                duration: 0.8,
                repeat: -1,
                ease: 'linear'
            });
        },
        async syncValue() {
            await new Promise((resolve) => {
                gsap.to(this.$data, {
                    valueCache: this.thisValue,
                    duration: 0.8,
                    ease: 'power3.out',
                    onComplete: () => {
                        resolve(0);
                    }
                });
            });
        }
    }
};
</script>
