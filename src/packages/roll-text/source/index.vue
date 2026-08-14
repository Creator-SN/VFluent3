<template>
    <div
        ref="content"
        class="fv-RollText"
        :class="[
            $theme,
            directionInfo.axis,
            directionInfo.movement,
            { manual }
        ]"
        @mouseenter="hoverTriggerEnter"
        @mouseleave="hoverTriggerLeave"
    >
        <slot>RollText</slot>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { commonProps } from '@/packages/common/props';

const emits = defineEmits(['start', 'iteration', 'end']);

const props = defineProps({
    ...commonProps,
    forward: {
        type: String,
        default: 'right'
    },
    mode: {
        type: String,
        default: 'once'
    },
    trigger: {
        type: String,
        default: 'auto'
    },
    duration: {
        type: Number,
        default: 3000
    },
    delay: {
        type: Number,
        default: 0
    },
    interval: {
        type: Number,
        default: 1000
    },
    offset: {
        type: [Number, String],
        default: null
    },
    ease: {
        type: String,
        default: 'power1.inOut'
    },
    manual: {
        type: Boolean,
        default: false
    }
});
</script>

<script>
import gsap from 'gsap';

import { useTheme } from '@/utils/common';

export default {
    name: 'FvRollText',

    data() {
        return {
            animation: null,
            resizeObserver: null,
            initTimer: null,
            wheelEvent: null,
            touchMoveEvent: null,
            keydownEvent: null,
            hovered: false
        };
    },

    watch: {
        forward() {
            this.scheduleInit();
        },
        mode() {
            this.scheduleInit();
        },
        trigger() {
            if (this.trigger === 'hover') {
                this.hovered = false;
                this.killAnimation();
            } else {
                this.scheduleInit();
            }
        },
        duration() {
            this.scheduleInit();
        },
        delay() {
            this.scheduleInit();
        },
        interval() {
            this.scheduleInit();
        },
        offset() {
            this.scheduleInit();
        },
        ease() {
            this.scheduleInit();
        },
        disabled() {
            this.animationInit();
        }
    },

    computed: {
        $theme() {
            return useTheme(this.$props).theme.value;
        },

        directionInfo() {
            const value = String(this.forward || 'right').toLowerCase();
            if (value === 'horizontal') return { axis: 'horizontal', movement: 'right' };
            if (value === 'vertical') return { axis: 'vertical', movement: 'down' };
            if (value === 'right') return { axis: 'horizontal', movement: 'right' };
            if (value === 'left') return { axis: 'horizontal', movement: 'left' };
            if (value === 'down') return { axis: 'vertical', movement: 'down' };
            if (value === 'up') return { axis: 'vertical', movement: 'up' };
            return { axis: 'horizontal', movement: 'right' };
        },

        isHorizontal() {
            return this.directionInfo.axis === 'horizontal';
        },

        movement() {
            return this.directionInfo.movement;
        },

        isDisabled() {
            return (
                this.disabled.toString() === 'true' ||
                this.disabled === 'disabled' ||
                this.disabled === ''
            );
        },

        manualLocked() {
            if (this.isDisabled || !this.manual) return true;
            if (this.animation) return true;
            return false;
        },

        scrollDistance() {
            const content = this.$refs.content;
            if (!content) return 0;
            if (this.isHorizontal) {
                return Math.max(0, content.scrollWidth - content.clientWidth);
            }
            return Math.max(0, content.scrollHeight - content.clientHeight);
        },

        animationOffset() {
            if (this.offset === null || this.offset === undefined || this.offset === '') {
                return this.scrollDistance;
            }
            const value = parseFloat(this.offset);
            if (Number.isNaN(value) || value < 0) return this.scrollDistance;
            return value;
        },

        scrollPositions() {
            const maxDistance = this.scrollDistance;
            const offset = Math.min(this.animationOffset, maxDistance);

            if (this.movement === 'left' || this.movement === 'up') {
                return {
                    start: maxDistance - offset,
                    end: maxDistance
                };
            }

            return {
                start: offset,
                end: 0
            };
        }
    },

    mounted() {
        this.$nextTick(() => {
            if (this.trigger !== 'hover') {
                this.animationInit();
            }
            this.resizeObserverInit();
            this.manualEventInit();
        });
    },

    beforeUnmount() {
        clearTimeout(this.initTimer);
        this.killAnimation();
        this.manualEventDispose();
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }
    },

    methods: {
        resizeObserverInit() {
            if (this.resizeObserver) {
                this.resizeObserver.disconnect();
            }
            if (!this.$refs.content) return;

            this.resizeObserver = new ResizeObserver(() => {
                this.scheduleInit();
            });
            this.resizeObserver.observe(this.$refs.content);
        },

        manualEventInit() {
            const content = this.$refs.content;
            if (!content) return;

            this.wheelEvent = (event) => this.manualScrollEvent(event);
            this.touchMoveEvent = (event) => this.manualScrollEvent(event);
            this.keydownEvent = (event) => this.manualKeydownEvent(event);

            content.addEventListener('wheel', this.wheelEvent, {
                passive: false
            });
            content.addEventListener('touchmove', this.touchMoveEvent, {
                passive: false
            });
            content.addEventListener('keydown', this.keydownEvent);
        },

        hoverTriggerEnter() {
            if (this.trigger !== 'hover' || this.isDisabled) return;
            this.hovered = true;
            this.animationInit();
        },

        hoverTriggerLeave() {
            if (this.trigger !== 'hover') return;
            this.hovered = false;
            this.killAnimation();
        },

        manualEventDispose() {
            const content = this.$refs.content;
            if (!content) return;

            if (this.wheelEvent) {
                content.removeEventListener('wheel', this.wheelEvent);
                this.wheelEvent = null;
            }
            if (this.touchMoveEvent) {
                content.removeEventListener('touchmove', this.touchMoveEvent);
                this.touchMoveEvent = null;
            }
            if (this.keydownEvent) {
                content.removeEventListener('keydown', this.keydownEvent);
                this.keydownEvent = null;
            }
        },

        manualScrollEvent(event) {
            if (this.manualLocked) {
                event.preventDefault();
            }
        },

        manualKeydownEvent(event) {
            if (
                this.manualLocked &&
                [
                    'ArrowUp',
                    'ArrowDown',
                    'ArrowLeft',
                    'ArrowRight',
                    'PageUp',
                    'PageDown',
                    'Home',
                    'End',
                    'Space'
                ].includes(event.key)
            ) {
                event.preventDefault();
            }
        },

        scheduleInit() {
            clearTimeout(this.initTimer);
            this.initTimer = setTimeout(() => {
                this.animationInit();
            }, 0);
        },

        animationInit() {
            const content = this.$refs.content;
            if (!content) return;
            if (this.trigger === 'hover' && !this.hovered) return;

            this.killAnimation();
            this.applyScroll(content, 0);

            if (this.isDisabled) return;

            const offset = this.animationOffset;
            if (offset <= 0) return;

            const duration = this.parseSeconds(this.duration);
            if (duration <= 0) return;

            const positions = this.scrollPositions;
            const mode = String(this.mode || 'once').toLowerCase();
            if (mode === 'none') return;

            const vars = {
                duration,
                delay: this.parseSeconds(this.delay),
                ease: this.ease || 'power1.inOut',
                onStart: () => this.$emit('start'),
                onRepeat: () => this.$emit('iteration'),
                onComplete: () => {
                    this.animation = null;
                    this.$emit('end');
                }
            };

            if (mode === 'repeat') {
                vars.repeat = -1;
                vars.repeatDelay = this.parseSeconds(this.interval);
            } else if (mode === 'bounce') {
                vars.repeat = 1;
                vars.yoyo = true;
                vars.repeatDelay = this.parseSeconds(this.interval);
            } else if (mode === 'loop') {
                vars.repeat = -1;
                vars.yoyo = true;
                vars.repeatDelay = this.parseSeconds(this.interval);
            }

            if (this.isHorizontal) {
                gsap.set(content, { scrollLeft: positions.start });
                vars.scrollLeft = positions.end;
            } else {
                gsap.set(content, { scrollTop: positions.start });
                vars.scrollTop = positions.end;
            }

            this.animation = gsap.to(content, vars);
        },

        applyScroll(content, value) {
            if (this.isHorizontal) {
                content.scrollLeft = value;
            } else {
                content.scrollTop = value;
            }
        },

        killAnimation() {
            if (this.animation) {
                this.animation.kill();
                this.animation = null;
            }
        },

        parseSeconds(value) {
            const parsed = parseFloat(value);
            if (!Number.isFinite(parsed) || parsed < 0) return 0;
            return parsed / 1000;
        }
    }
};
</script>
