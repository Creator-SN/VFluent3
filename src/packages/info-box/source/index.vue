<template>
    <div class="fv-InfoBox" :class="[$theme, mode, { acrylic: acrylic }]">
        <div class="sinfo-box-block" :class="[iconList[status].background]">
            <div v-show="showTitleBar" class="title-bar">
                <i
                    class="ms-Icon icon-block"
                    :class="[`ms-Icon--${iconList[status].icon}`]"
                ></i>
                <span class="title-content">{{ title }}</span>
            </div>
            <span class="info-box-content-block">
                <slot name="msg">
                    <h3 v-show="!showTitleBar">{{ title }}</h3>
                    <p>Info Box Content.</p>
                </slot>
            </span>
            <div class="info-box-control-block">
                <slot
                    name="control-panel"
                    :theme="$theme"
                    :confirm="confirm"
                    :cancel="close"
                    :iconList="iconList"
                >
                    <fv-button
                        :theme="'dark'"
                        :background="iconList[status].backgroundColor"
                        :isBoxShadow="true"
                        :borderRadius="6"
                        style="width: 50%; height: 35px; margin-right: 2.5px"
                        @click="confirm"
                        >{{ confirmTitle }}</fv-button
                    >
                    <fv-button
                        :theme="$theme"
                        :isBoxShadow="true"
                        :borderRadius="6"
                        style="width: 50%; height: 35px; margin-left: 2.5px"
                        @click="close"
                        >{{ cancelTitle }}</fv-button
                    >
                </slot>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { commonProps } from '@/packages/common/props';

const emits = defineEmits(['confirm', 'close']);

const props = defineProps({
    ...commonProps,
    title: {
        default: 'Tip'
    },
    status: {
        default: 'default'
    },
    mode: {
        default: 'relative'
    },
    confirmTitle: {
        default: '确定'
    },
    cancelTitle: {
        default: '取消'
    },
    showTitleBar: {
        default: true
    },
    acrylic: {
        default: false
    },
    destroy: {
        type: [Boolean, Function],
        default: false
    }
});
</script>

<script>
import { useTheme } from '@/utils/common';

export default {
    name: 'FvInfoBox',

    data() {
        return {
            iconList: {
                default: {
                    icon: 'Error',
                    background: '',
                    backgroundColor: 'rgba(0, 98, 158, 0.8)'
                },
                warning: {
                    icon: 'Warning',
                    background: 'brown',
                    backgroundColor: 'rgba(234, 183, 2, 1)'
                },
                correct: {
                    icon: 'Completed',
                    background: 'green',
                    backgroundColor: 'rgba(69, 172, 97, 1)'
                },
                blocked: {
                    icon: 'Blocked12   ',
                    background: 'red',
                    backgroundColor: 'rgba(200, 50, 59, 1)'
                },
                error: {
                    icon: 'ErrorBadge',
                    background: 'red',
                    backgroundColor: 'rgba(200, 50, 59, 1)'
                }
            }
        };
    },
    computed: {
        $theme() {
            return useTheme(this.$props).theme.value;
        }
    },
    methods: {
        confirm() {
            this.$emit('confirm');
        },
        close() {
            this.$emit('close');
        }
    }
};
</script>
