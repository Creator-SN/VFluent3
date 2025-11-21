<template>
    <div
        v-show="thisValue"
        draggable="false"
        class="fv-tableview-edit-wrapper-background"
        @click="
            thisValue = false;
            $event.stopPropagation();
        "
        @mousemove="$event.preventDefault()"
    >
        <fv-Affix
            :target="el"
            left="0"
            :top="isUnder ? '100%' : 0"
            :mode="thisValue ? 'fixed' : 'relative'"
        >
            <transition name="fv-tableview-edit-wrapper">
                <div
                    v-show="thisValue"
                    draggable="false"
                    class="fv-tableview-edit-wrapper-container"
                    :style="{ width: wrapperWidth }"
                    @dragstart="stopDragWrapper"
                    @click="$event.stopPropagation()"
                >
                    <slot></slot>
                </div>
            </transition>
        </fv-Affix>
    </div>
</template>

<script>
export default {
    emits: ['update:modelValue'],
    props: {
        modelValue: {
            default: false
        },
        el: {
            default: () => document.body
        },
        wrapperWidth: {
            default: '300px'
        },
        isUnder: {
            default: false
        }
    },
    data() {
        return {
            thisValue: this.modelValue
        };
    },
    watch: {
        modelValue() {
            this.thisValue = this.modelValue;
        },
        thisValue() {
            this.$emit('update:modelValue', this.thisValue);
        }
    },
    methods: {
        stopDragWrapper($event) {
            console.log(1)
            $event.stopPropagation();
        }
    }
};
</script>
