<template>
    <div
        class="fv-tableview-spliter"
        @mousedown="forward"
        @mouseup="stop"
        @touchstart="forward"
        @touchend="stop"
    >
        <i></i>
    </div>
</template>

<script>
import { useTheme } from '@/utils/common';

export default {
    emits: [
        'mousemove',
        'mouseup',
        'touchstart',
        'touchmove',
        'touchend',
        'mousedown',
        'mouseup'
    ],
    props: {
        theme: {
            type: String,
            default: 'system'
        }
    },
    data() {
        return {
            moveable: false
        };
    },
    computed: {
        $theme() {
            return useTheme(this.$props).theme.value;
        }
    },
    mounted() {
        this.Init();
    },
    methods: {
        Init() {
            window.addEventListener('mousemove', (event) => {
                if (this.moveable) {
                    this.$emit('mousemove', event);
                }
            });
            window.addEventListener('mouseup', (event) => {
                if (this.moveable) {
                    this.stop();
                }
            });
            window.addEventListener('touchmove', (event) => {
                if (this.moveable) {
                    this.$emit('touchmove', event);
                }
            });
            window.addEventListener('touchend', (event) => {
                if (this.moveable) {
                    this.stop();
                }
            });
        },
        forward(event) {
            event.preventDefault();
            this.moveable = true;
            if (event.type === 'mousedown') this.$emit('mousedown', event);
            else this.$emit('touchstart', event);
        },
        stop(event) {
            this.moveable = false;
            if (!event) return;
            if (event.type === 'mouseup') this.$emit('mouseup', event);
            else this.$emit('touchend', event);
        }
    }
};
</script>
