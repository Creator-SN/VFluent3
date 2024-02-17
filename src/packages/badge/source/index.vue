<template>
    <div
        class="fv-Badge"
        :class="[$theme]"
    >
        <slot>
            <p>Badge</p>
        </slot>
        <sup
            v-show="!hidden"
            class="fv-badge-container"
            :class="{dot: isDot}"
            :style="{background: finalColor}"
        >
            <p class="badge-content">
                {{finalValue}}
            </p>
        </sup>
    </div>
</template>
        
<script>
import { badgeProps } from '.';
import { ClassBuilder, StyleBuilder, useTheme } from '@/utils/common';

export default {
    name: 'FvBadge',
    props: {
        ...badgeProps,
        modelValue: {
            default: ''
        },
        max: {
            default: Infinity
        },
        isDot: {
            default: false
        },
        hidden: {
            default: false
        },
        type: {
            default: 'default'
        }
    },
    data() {
        return {
            thisValue: this.modelValue,
            colorList: {
                default: '#f56c6c',
                primary: '#409eff',
                success: 'rgba(0, 204, 153, 1)',
                warning: '#e6a23c',
                danger: '#f56c6c',
                info: '#909399'
            }
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
        finalValue() {
            if (this.thisValue * 1 > this.max * 1) return `${this.max}+`;
            return this.thisValue;
        },
        finalColor() {
            if (!this.colorList[this.type]) return this.type;
            return this.colorList[this.type];
        },
        $theme() {
            return useTheme(this.$props).theme.value;
        }
    }
};
</script>

