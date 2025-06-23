<template>
    <div class="fv-ResizeWatcher" :class="[$theme]"></div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { commonProps } from '@/packages/common/props';

const emits = defineEmits(['watch', 'watch-resize', 'watch-pos']);

const props = defineProps({
    ...commonProps,
    target: {
        default: null
    }
});
</script>

<script>
import { useTheme } from '@/utils/common';

export default {
    name: 'FvResizeWatcher',
    data() {
        return {
            thisTarget: null,
            resizeObserver: null,
            posObserver: null,
            timer: null
        };
    },
    watch: {
        target() {
            this.thisTarget = this.valueTrigger(this.target);
        },
        thisTarget: {
            handler() {
                this.resizeWatcherInit();
                this.posWatcherInit();
            },
            immediate: true
        }
    },
    computed: {
        $theme() {
            return useTheme(this.$props).theme.value;
        }
    },
    mounted() {
        this.init();
        this.resizeWatcherInit();
        this.posWatcherInit();
    },
    methods: {
        init() {
            this.timer = setInterval(() => {
                this.thisTarget = this.valueTrigger(this.target);
                if (this.thisTarget) {
                    const { left, top, right, bottom } =
                        this.thisTarget.getBoundingClientRect();
                    const width = right - left;
                    const height = bottom - top;
                    let data = {
                        type: 'init',
                        target: this.thisTarget,
                        left,
                        top,
                        right,
                        bottom,
                        width,
                        height
                    };
                    this.$emit('watch', data);
                    clearInterval(this.timer);
                } else {
                    this.resizeWatcherInit();
                    this.posWatcherInit();
                }
            }, 100);
        },
        resizeWatcherInit() {
            if (this.resizeObserver) {
                this.resizeObserver.disconnect();
                this.resizeObserver = null;
            }
            this.resizeObserver = new ResizeObserver((entries) => {
                for (let entry of entries) {
                    let target = entry.target;
                    const { left, top, right, bottom } =
                        target.getBoundingClientRect();
                    const width = right - left;
                    const height = bottom - top;
                    let data = {
                        type: 'resize',
                        target,
                        entry,
                        width,
                        height,
                        left,
                        top,
                        right,
                        bottom
                    };
                    this.$emit('watch', data);
                    this.$emit('watch-resize', data);
                }
            });
            if (this.thisTarget) this.resizeObserver.observe(this.thisTarget);
        },
        posWatcherInit() {
            if (this.posObserver) {
                this.posObserver.disconnect();
                this.posObserver = null;
            }
            this.posObserver = new MutationObserver((entries) => {
                for (let entry of entries) {
                    const { left, top, right, bottom } =
                        entry.target.getBoundingClientRect();
                    const width = right - left;
                    const height = bottom - top;
                    let data = {
                        type: 'position',
                        target: entry.target,
                        entry,
                        left,
                        top,
                        right,
                        bottom,
                        width,
                        height
                    };
                    this.$emit('watch', data);
                    this.$emit('watch-pos', data);
                }
            });
            if (this.thisTarget)
                this.posObserver.observe(this.thisTarget, {
                    attributes: true
                });
        },
        valueTrigger(val) {
            if (typeof val === 'function') return val();
            return val;
        }
    },
    beforeUnmount() {
        clearInterval(this.timer);
    }
};
</script>
