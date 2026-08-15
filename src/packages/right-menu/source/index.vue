<template>
    <teleport to="body">
        <transition
            :name="
                fullExpandAnimation
                    ? 'fv-rightMenu-full-zoom-in-top'
                    : 'fv-rightMenu-zoom-in-top'
            "
        >
            <div
                ref="rightMenuEl"
                class="fv-RightMenu"
                v-show="thisValue"
                :class="[$theme]"
                :style="{
                    left: posX + 'px',
                    top: posY + 'px',
                    width: rightMenuWidth + 'px',
                    background: background
                }"
            >
                <div class="right-menu-list">
                    <slot>
                        <span>
                            <p>Selected</p>
                        </span>
                    </slot>
                </div>
            </div>
        </transition>
    </teleport>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { commonProps } from '@/packages/common/props';
import { getCurrentInstance } from 'vue';

const { proxy } = getCurrentInstance();

const emits = defineEmits(['update:modelValue', 'update-height']);

const props = defineProps({
    ...commonProps,
    modelValue: {
        default: false
    },
    rightMenuWidth: {
        default: 200
    },
    background: {
        default: ''
    },
    fullExpandAnimation: {
        default: false
    }
});

defineExpose({
    rightClick: (...args) => proxy.rightClick(...args),
    hide: () => proxy.hide()
});
</script>

<script>
import { useTheme } from '@/utils/common';

export default {
    name: 'FvRightMenu',
    data() {
        return {
            thisValue: this.modelValue,
            posX: 0,
            posY: 0,
            rightMenuHeight: 0
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
        $theme() {
            return useTheme(this.$props).theme.value;
        }
    },
    mounted() {
        this.rightMenuClearInit();
        this.resizeInit();
    },
    methods: {
        rightMenuClearInit() {
            this.clickHandler = (event) => {
                let x = event.target;
                if (x && x !== this.$refs.rightMenuEl) this.thisValue = false;
            };
            window.addEventListener('click', this.clickHandler);
        },
        resizeInit() {
            this.resizeObserver = new ResizeObserver(() => {
                if (this.$refs.rightMenuEl) {
                    if (this.$refs.rightMenuEl.clientHeight > 0) {
                        this.rightMenuHeight =
                            this.$refs.rightMenuEl.clientHeight;
                        this.$emit('update-height', this.rightMenuHeight);
                    }
                }
            });
            this.resizeObserver.observe(this.$refs.rightMenuEl);
        },
        rightClick(event, el) {
            event.preventDefault();
            this.thisValue = true;
            let bounding = el.getBoundingClientRect();
            let targetPos = {};
            targetPos.x = event.x;
            targetPos.y = event.y;
            if (targetPos.x < bounding.left) targetPos.x = bounding.left;
            if (targetPos.x + this.rightMenuWidth > bounding.right)
                targetPos.x = bounding.right - this.rightMenuWidth;
            if (targetPos.y < bounding.top) targetPos.y = bounding.top;
            if (targetPos.y + this.rightMenuHeight > bounding.bottom)
                targetPos.y = bounding.bottom - this.rightMenuHeight;
            this.posX = targetPos.x;
            this.posY = targetPos.y;
        },
        hide() {
            this.thisValue = false;
        }
    },
    beforeUnmount() {
        window.removeEventListener('click', this.clickHandler);
        if (this.resizeObserver) this.resizeObserver.disconnect();
    }
};
</script>
