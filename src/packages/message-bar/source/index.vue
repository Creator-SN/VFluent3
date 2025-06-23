<template>
    <div
        class="fv-MessageBar"
        :class="[
            $theme,
            iconList[status].iconColor,
            { relative: mode == 'relative' }
        ]"
    >
        <span class="msg-bar-block">
            <i
                class="ms-Icon icon-block"
                :class="[
                    `ms-Icon--${iconList[status].icon}`,
                    iconList[status].iconColor
                ]"
            ></i>
            <span class="msg-content-block">
                <slot name="msg" :theme="$theme"> Message Bar. </slot>
            </span>
            <i
                v-show="showClose"
                class="ms-Icon ms-Icon--Cancel close-block"
                @click="destroySelf"
            ></i>
        </span>
        <span v-show="showControl" class="control-block">
            <slot name="control" :theme="$theme" :cancel="destroySelf">
                <fv-button>Yes</fv-button>
            </slot>
        </span>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { commonProps } from '@/packages/common/props';

const emits = defineEmits(['close']);

const props = defineProps({
    ...commonProps,
    status: {
        default: 'default'
    },
    showControl: {
        default: false
    },
    showClose: {
        default: true
    },
    mode: {
        default: 'relative'
    },
    destroy: {
        default: () => {}
    },
    autoClose: {
        default: 3000
    }
});
</script>

<script>
import gsap from 'gsap';

import { useTheme } from '@/utils/common';

export default {
    name: 'FvMessageBar',

    data() {
        return {
            iconList: {
                default: { icon: 'Info2', iconColor: 'normal' },
                warning: { icon: 'Info2', iconColor: 'warning' },
                correct: { icon: 'CheckMark', iconColor: 'correct' },
                blocked: { icon: 'Remove   ', iconColor: 'error' },
                error: { icon: 'ErrorBadge12', iconColor: 'error' }
            },
            timer: null
        };
    },
    watch: {
        autoClose() {
            this.autoDestroyInit();
        }
    },
    computed: {
        $theme() {
            return useTheme(this.$props).theme.value;
        }
    },
    mounted() {
        this.autoDestroyInit();
        this.enter();
    },
    methods: {
        enter() {
            this.$el.style.top = '-100%';
            gsap.to(this.$el, {
                top: 0,
                duration: 0.3
            });
        },
        autoDestroyInit() {
            if (this.mode !== 'relative' && this.autoClose > 0) {
                clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    this.destroySelf();
                }, this.autoClose);
            }
        },
        destroySelf() {
            if (this.mode == 'relative') this.$emit('close');
            else {
                gsap.to(this.$el, {
                    opacity: 0,
                    duration: 0.3,
                    onComplete: () => {
                        // this.$el.remove();
                        this.$emit('close');
                        this.destroy();
                    }
                });
            }
        }
    }
};
</script>
