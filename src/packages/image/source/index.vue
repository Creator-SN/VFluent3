<template>
    <div class="fv-Image" :class="[$theme]">
        <transition name="fade-in">
            <img
                v-show="status"
                draggable="false"
                alt=""
                :src="thisSrc"
                ref="img"
            />
        </transition>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { commonProps } from '@/packages/common/props';

const emits = defineEmits(['click']);

const props = defineProps({
    ...commonProps,
    src: {
        default: ''
    },
    onlazy: {
        default: false
    }
});
</script>

<script>
import { useTheme } from '@/utils/common';

export default {
    name: 'FvImage',
    data() {
        return {
            thisSrc: '',
            status: false,
            lazy: this.onlazy,
            lazyTimer: {}
        };
    },
    watch: {
        src(to, from) {
            if (to !== from) {
                this.status = false;
            }
            if (!this.lazy) {
                this.thisSrc = this.src;
            }
        },
        lazy(val) {
            if (val === false) this.thisSrc = this.src;
        },
        onlazy(val) {
            this.lazy = val;
        }
    },
    computed: {
        $theme() {
            return useTheme(this.$props).theme.value;
        }
    },
    mounted() {
        this.watchImgInit();
        if (this.lazy) this.lazyInit();
        else this.thisSrc = this.src;
    },
    methods: {
        watchImgInit() {
            this.$refs.img.onload = (event) => {
                this.status = true;
            };
        },
        lazyInit() {
            clearInterval(this.lazyTimer);
            this.lazyTimer = setInterval(() => {
                window.requestAnimationFrame(() => {
                    if (
                        this.$el.getBoundingClientRect().top <
                        window.innerHeight
                    ) {
                        this.lazy = false;
                        clearInterval(this.lazyTimer);
                    }
                });
            }, 300);
        }
    },
    beforeUnmount() {
        clearInterval(this.lazyTimer);
    }
};
</script>
