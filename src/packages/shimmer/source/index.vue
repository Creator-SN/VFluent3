<template>
    <div class="fv-Shimmer" :class="[$theme]">
        <div
            class="shimmer-container"
            ref="shimmer"
            :style="{
                'background-image': `radial-gradient(circle ${gradientSize}px at ${x}px ${y}px, ${backgroundLightColor}, rgba(255,255,255,0))`
            }"
        >
            <slot>
                <div
                    class="sample"
                    :style="{ 'background-image': `inherit` }"
                ></div>
            </slot>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { commonProps } from '@/packages/common/props';

const emits = defineEmits();

const props = defineProps({
    ...commonProps
});
</script>

<script>
import gsap from 'gsap';

import { useTheme } from '@/utils/common';

export default {
    name: 'FvShimmer',
    data() {
        return {
            gradientSize: 80,
            x: 0,
            y: 0,
            timer: {}
        };
    },
    computed: {
        $theme() {
            return useTheme(this.$props).theme.value;
        },
        backgroundLightColor() {
            if (this.$theme == 'light') {
                return 'rgba(121, 119, 117, 0.1)';
            }
            if (this.$theme == 'dark' || this.$theme == 'custom') {
                return 'rgba(255, 255, 255, 0.1)';
            }
            return 'rgba(121, 119, 117, 0.1)';
        }
    },
    mounted() {
        this.moveInit();
        this.timer = setInterval(() => {
            this.childrenInit();
        }, 30);
    },
    methods: {
        moveInit() {
            this.gradientSize = this.$el.clientWidth / 1.6;
            this.x = -this.gradientSize;
            this.y = this.$el.clientHeight / 2;
            gsap.to(this.$data, {
                x: this.$el.clientWidth + this.gradientSize + 100,
                duration: 2,
                delay: 0,
                repeat: -1,
                ease: 'power3.in'
            });
        },
        childrenInit() {
            try {
                let children = this.$refs.shimmer.querySelectorAll('*');
                children.forEach((item) => {
                    if (
                        item.getAttribute('style').indexOf('background-image') <
                        0
                    )
                        item.setAttribute(
                            'style',
                            `${item.getAttribute(
                                'style'
                            )} background-image: inherit;`
                        );
                });
            } catch (e) {}
        }
    },
    beforeUnmount() {
        clearInterval(this.timer);
    }
};
</script>
