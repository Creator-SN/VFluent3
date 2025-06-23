<template>
    <div class="fv-InfiniteScrollView" :class="[$theme]">
        <slot :thisValue="thisValue" :dynamicValue="dynamicValue">
            <p v-for="(item, index) in dynamicValue" :key="index">{{ item }}</p>
        </slot>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { commonProps } from '@/packages/common/props';

const emits = defineEmits([
    'update:modelValue',
    'init-start',
    'init-end',
    'lazyload'
]);

const props = defineProps({
    ...commonProps,
    modelValue: {
        default: () => []
    },
    batchSize: {
        default: 30
    },
    offset: {
        default: 100
    },
    static: {
        default: false
    }
});
</script>

<script>
import { useTheme } from '@/utils/common';

export default {
    name: 'FvInfiniteScrollView',
    data() {
        return {
            thisValue: this.modelValue,
            dynamicValue: [],
            lock: true,
            looper: true
        };
    },
    watch: {
        modelValue(val) {
            this.thisValue = val;
        },
        thisValue(val) {
            this.$emit('update:modelValue', val);
            this.dataChange();
        },
        static() {
            this.loadMore();
        }
    },
    computed: {
        $theme() {
            return useTheme(this.$props).theme.value;
        }
    },
    mounted() {
        this.init();
        this.lazyLoadInit();
    },
    methods: {
        async init() {
            while (this.looper) {
                if (
                    this.$el.scrollHeight <= this.$el.clientHeight &&
                    this.thisValue.length > this.dynamicValue.length
                ) {
                    this.loadMore();
                    this.$emit('init-start');
                } else this.$emit('init-end');
                await new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(1);
                    }, 100);
                });
            }
        },
        loadMore() {
            if (this.static) {
                this.dynamicValue = this.thisValue;
                return;
            }
            if (!this.lock) return;
            this.lock = false;
            let item = this.dynamicValue[this.dynamicValue.length - 1];
            let index = this.thisValue.indexOf(item);
            let addition = this.thisValue.slice(
                index + 1,
                index + this.batchSize + 1
            );
            this.dynamicValue = this.dynamicValue.concat(addition);
            this.lock = true;
            return addition > 0;
        },
        dataChange() {
            let size = this.dynamicValue.length;
            this.dynamicValue = this.thisValue.slice(0, size);
        },
        lazyLoadInit() {
            this.$el.addEventListener('scroll', (event) => {
                if (
                    this.$el.scrollHeight -
                        this.$el.scrollTop -
                        this.$el.clientHeight <
                    this.offset
                )
                    this.$emit('lazyload', this.loadMore());
            });
        }
    },
    beforeUnmount() {
        this.looper = false;
    }
};
</script>
