<template>
    <transition name="fv-panel-show">
        <div
            v-show="thisValue"
            class="fv-Panel"
            :class="[$theme]"
        >
            <div
                class="fv-panel-back-board"
                @click="isLightDismiss ? thisValue = false : 0"
            ></div>
            <transition :name="transitionInName">
                <div
                    v-show="thisValue"
                    class="fv-panel-container"
                    :class="[{'near-side': isNearSide, 'central-side': isCentralSide, 'acrylic-style': isAcrylic}]"
                    :style="{width: finalWidth, height: finalHeight, background: background}"
                >
                    <div
                        v-show="showTitleBar"
                        class="fv-panel-control-block"
                    >
                        <slot name="header">
                            <p
                                class="panel-title"
                                :style="{'font-size': `${titleSize}px`, 'font-weight': titleWeight, color: titleColor}"
                            >{{title}}</p>
                            <i
                                class="control-btn ms-Icon ms-Icon--Cancel"
                                @click="thisValue = !thisValue"
                            ></i>
                        </slot>
                    </div>
                    <div class="fv-panel-main-container">
                        <slot name="container">
                            Content Here
                        </slot>
                    </div>
                    <div
                        v-show="isFooter"
                        class="fv-panel-footer"
                    >
                        <slot name="footer">
                            <fv-button
                                theme="dark"
                                background="rgba(0, 90, 158, 1)"
                            >OK</fv-button>
                            <fv-button>Cancel</fv-button>
                        </slot>
                    </div>
                </div>
            </transition>
        </div>
    </transition>
</template>
        
<script>
import { panelProps } from '.';
import { ClassBuilder, StyleBuilder, useTheme } from '@/utils/common';

export default {
    name: 'FvPanel',
    emits: ['update:modelValue'],
    props: {
        ...panelProps,
        modelValue: {
            default: !false
        },
        title: {
            default: 'Sample Panel'
        },
        titleSize: {
            default: 20
        },
        titleWeight: {
            default: 600
        },
        titleColor: {
            default: ''
        },
        width: {
            default: '340'
        },
        height: {
            default: '100%'
        },
        background: {
            default: ''
        },
        isNearSide: {
            default: false
        },
        isCentralSide: {
            default: false
        },
        isLightDismiss: {
            default: false
        },
        showTitleBar: {
            default: true
        },
        isFooter: {
            default: false
        },
        isAcrylic: {
            default: false
        }
    },
    data() {
        return {
            thisValue: this.modelValue,
            screenWidth: window.innerWidth,
            timer: {
                widthTimer: {}
            }
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
        finalWidth() {
            if (isNaN(this.width)) {
                return this.width;
            } else {
                if (this.width > this.screenWidth)
                    return `${this.screenWidth}px`;
                return `${this.width}px`;
            }
        },
        finalHeight() {
            if (isNaN(this.height)) {
                return this.height;
            } else {
                if (this.height > this.screenHeight)
                    return `${this.screenHeight}px`;
                return `${this.height}px`;
            }
        },
        transitionInName() {
            if (this.isCentralSide)
                if (this.thisValue) return 'fv-panel-scale-up-to-up';
                else return 'fv-panel-scale-down-to-down';
            if (this.isNearSide)
                if (this.thisValue) return 'move-left-to-right';
                else return 'move-right-to-left';
            if (this.thisValue) return 'move-right-to-left';
            return 'move-left-to-right';
        },
        $theme() {
            return useTheme(this.$props).theme.value;
        }
    },
    mounted() {
        this.screenWidthInit();
    },
    methods: {
        screenWidthInit() {
            this.timer.widthTimer = setInterval(() => {
                this.screenWidth = window.innerWidth;
            }, 30);
        }
    },
    beforeUnmount() {
        clearInterval(this.timer.widthTimer);
    }
};
</script>

