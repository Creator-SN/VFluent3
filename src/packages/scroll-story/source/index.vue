<template>
    <div class="fv-ScrollStory" :class="[$theme]">
        <transition :name="name">
            <div v-if="!trueRender || show" v-show="show">
                <slot>
                    <p>Scroll Story</p>
                </slot>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { commonProps } from '@/packages/common/props';

const emits = defineEmits(['show-changed']);

const props = defineProps({
    ...commonProps,
    name: {
        default: ''
    },
    overCollapse: {
        default: false
    },
    infinite: {
        default: false
    },
    trueRender: {
        default: false
    }
});
</script>

<script>
import { useTheme } from '@/utils/common';

export default {
    name: 'FvScrollStory',

    data() {
        return {
            show: false,
            bounding: Infinity,
            event: () => {
                this.refreshBounding();
            },
            timer: {}
        };
    },
    watch: {
        show(val) {
            this.$emit('show-changed', val);
        }
    },
    computed: {
        $theme() {
            return useTheme(this.$props).theme.value;
        }
    },
    mounted() {
        this.timerInit();
    },
    methods: {
        timerInit() {
            clearInterval(this.timer);
            this.timer = setInterval(() => {
                this.refreshBounding();
            }, 30);
        },
        refreshBounding() {
            this.bounding = this.$el.getBoundingClientRect();
            if (this.bounding.top < window.innerHeight) this.show = true;
            if (this.bounding.top > window.innerHeight && this.infinite)
                this.show = false;
            if (this.bounding.bottom < 100 && this.overCollapse)
                this.show = false;
        }
    },
    beforeUnmount() {
        clearInterval(this.timer);
    }
};
</script>
