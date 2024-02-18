<template>
    <transition name="fv-callout-fade">
        <div
            name="fv-callout"
            :style="[style.callout, popperStyle]"
            :class="['fv-Callout', $theme, popperClass, thisClass.callout]"
            v-show="popperShow"
        >
            <div class="fv-callout-bg"></div>
            <div
                class="beak"
                :style="style.beak"
            ></div>
            <div v-show="show || keepalive">
                <div
                    class="header"
                    v-show="true || nodes.header.length"
                    :key="header"
                >
                    <slot
                        name="header"
                        :props="$props"
                    ></slot>
                </div>
                <div
                    class="main"
                    v-show="true || nodes.main.length"
                    :key="main"
                >
                    <slot
                        name="main"
                        :props="$props"
                    ></slot>
                </div>
                <div
                    class="footer"
                    v-show="true || nodes.footer.length"
                    :key="footer"
                >
                    <slot
                        name="footer"
                        :props="$props"
                    ></slot>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import { ClassBuilder, StyleBuilder, useTheme } from '@/utils/common';

export default {
    name: 'FvOutsidePopper',
    props: {
        nodes: {
            type: Object,
            default: () => {
                return {
                    main: [],
                    header: [],
                    footer: []
                };
            }
        },
        popperStyle: {
            type: Object,
            default: () => {}
        },
        popperClass: {
            type: Array,
            default: () => []
        },
        show: {
            type: Boolean,
            default: false
        },
        theme: {
            type: String,
            default: 'light'
        },
        keepalive: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            style: {
                callout: {},
                beak: {}
            },
            class: {
                callout: []
            },
            transition: 'fv-callout-fade',
            target: null
        };
    },
    computed: {
        targetElement() {
            if (this.target == undefined) return this.target;
            return this.target.$el.firstElementChild || this.target.$el;
        },
        popperShow() {
            if (!this.targetElement) {
                return false;
            }
            // const rect = this.targetElement.getBoundingClientRect();
            if (this.target.disabled) {
                //  || rect.width == 0 || rect.height == 0) {
                return false;
            }
            return this.show;
        },
        thisClass() {
            return this.class;
        },
        $theme() {
            return useTheme(this.$props).theme.value;
        }
    }
};
</script>