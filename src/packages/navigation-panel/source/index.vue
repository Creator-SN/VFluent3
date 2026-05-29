<template>
    <div
        v-show="isMobile && !thisExpand"
        ref="mc"
        class="fv-NavigationPanel-container-mobile"
        :class="[
            $theme,
            { blur: mobileControlAcrylic },
            { column: mobileControlDirection === 'column' }
        ]"
        :style="{
            left: mobileControlLeft,
            top: mobileControlTop,
            background: !thisExpand ? mobileControlBackground : ''
        }"
    >
        <fv-animated-icon
            v-show="showBack"
            modelValue="backScale"
            class="fv-nav-default-item"
            :hideContent="true"
            :style="{ width: `${compactWidth}px` }"
            @click="$emit('back', $event)"
        >
            <slot name="backIcon">
                <i class="ms-Icon ms-Icon--Back icon"></i>
            </slot>
        </fv-animated-icon>
        <fv-animated-icon
            v-show="showNav"
            modelValue="scaleXDown"
            class="fv-nav-default-item"
            :hideContent="true"
            :style="{ width: `${compactWidth}px` }"
            @click="expandClick"
        >
            <slot name="navIcon">
                <i class="ms-Icon ms-Icon--GlobalNavButton icon"></i>
            </slot>
        </fv-animated-icon>
    </div>
    <div
        ref="panel"
        class="fv-NavigationPanel"
        :class="[
            $theme,
            { compact: !thisExpand },
            { flyout: isFlyout },
            { mobile: isMobile }
        ]"
        :style="{
            position:
                screenWidth <= fullSizeDisplay && thisExpand ? 'static' : '',
            width: panelWidth
        }"
    >
        <div
            class="panel-container"
            :style="{ width: navWidth, background: background }"
        >
            <slot name="banner"></slot>
            <fv-animated-icon
                v-show="showBack"
                modelValue="backScale"
                class="fv-nav-default-item control"
                :hideContent="!thisExpand"
                style="width: calc(100% - 10px)"
                @click="$emit('back', $event)"
            >
                <slot name="backIcon">
                    <i class="ms-Icon ms-Icon--Back icon"></i>
                </slot>
                <template v-slot:content>
                    <slot name="title" :show="showBack">
                        <p class="name title">{{ title }}</p>
                    </slot>
                </template>
            </fv-animated-icon>
            <fv-animated-icon
                v-show="showNav"
                modelValue="scaleXDown"
                class="fv-nav-default-item control"
                :hideContent="!thisExpand"
                style="width: calc(100% - 10px)"
                @click="expandClick"
            >
                <slot name="navIcon">
                    <i class="ms-Icon ms-Icon--GlobalNavButton icon"></i>
                </slot>
                <template v-slot:content>
                    <slot name="title" :show="!showBack">
                        <p v-show="!showBack" class="name title">{{ title }}</p>
                    </slot>
                </template>
            </fv-animated-icon>
            <span v-show="showSearch && thisExpand" class="search">
                <slot name="searchBlock">
                    <fv-search-box
                        icon="Search"
                        placeholder="Search"
                        class="nav-search"
                        :theme="theme"
                        :revealBorder="true"
                        borderWidth="2"
                        borderRadius="6"
                        :isBoxShadow="true"
                        style="width: 95%"
                    ></fv-search-box>
                </slot>
            </span>
            <div class="template">
                <slot name="panel"></slot>
            </div>
            <slot name="setting">
                <fv-animated-icon
                    v-show="showSetting"
                    modelValue="bounceRotate"
                    ref="setting"
                    class="fv-nav-default-item"
                    :hideContent="!thisExpand"
                    style="width: calc(100% - 10px)"
                    @click="$emit('setting-click', { event: $event })"
                >
                    <i class="ms-Icon ms-Icon--Settings icon"></i>
                    <template v-slot:content>
                        <p class="name">{{ settingTitle }}</p>
                    </template>
                </fv-animated-icon>
            </slot>
        </div>
        <slot name="mask"></slot>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { commonProps } from '@/packages/common/props';

const emits = defineEmits([
    'back',
    'setting-click',
    'expand-change',
    'expand-click',
    'update:expand'
]);

const props = defineProps({
    ...commonProps,
    title: {
        default: 'NavigationPanel'
    },
    expand: {
        default: true
    },
    expandMode: {
        default: 'relative'
    },
    expandWidth: {
        default: 350
    },
    expandDisplay: {
        default: 1024
    },
    compactWidth: {
        default: 50
    },
    flyoutDisplay: {
        default: 0
    },
    fullSizeDisplay: {
        default: 800
    },
    mobileDisplay: {
        default: 0
    },
    showBack: {
        default: true
    },
    showNav: {
        default: true
    },
    showSearch: {
        default: true
    },
    settingTitle: {
        default: 'Settings'
    },
    showSetting: {
        default: true
    },
    background: {
        default: ''
    },
    mobileControlBackground: {
        default: ''
    },
    mobileControlAcrylic: {
        default: false
    },
    mobileControlDirection: {
        default: 'column'
    },
    mobileControlLeft: {
        default: `0px`
    },
    mobileControlTop: {
        default: `12px`
    }
});
</script>

<script>
import { useRevealCache } from '@/store/reveal';

import { useTheme } from '@/utils/common';

export default {
    name: 'FvNavigationPanel',

    beforeMount() {
        this.uR = useRevealCache();
        this.uR.initRevealInstances();
    },

    data() {
        return {
            FR: null,
            uR: null,
            thisExpand: this.expand,
            thisExpandBackup: this.expand,
            screenWidth: window.innerWidth,
            timer: {
                widthTimer: {}
            }
        };
    },
    watch: {
        expand(val) {
            this.thisExpand = val;
        },
        thisExpand(val) {
            this.$emit('update:expand', val);
            this.$emit('expand-change', val);
        },
        screenWidth(val) {
            if (this.expandDisplay < this.screenWidth) {
                if (!this.isFlyout) this.thisExpand = this.thisExpandBackup;
                else this.thisExpand = false;
            } else this.thisExpand = false;
        }
    },
    computed: {
        panelWidth() {
            if (this.isFlyout) return `${this.compactWidth}px`;
            if (this.thisExpand)
                return this.screenWidth <= this.fullSizeDisplay
                    ? '100%'
                    : `${this.expandWidth}px`;
            return `${this.compactWidth}px`;
        },
        navWidth() {
            let size =
                this.screenWidth <= this.fullSizeDisplay
                    ? '100%'
                    : `${this.expandWidth}px`;
            if (this.thisExpand) return size;
            return `${this.compactWidth}px`;
        },
        isFlyout() {
            if (this.expandMode == 'flyout') return true;
            if (this.flyoutDisplay > this.screenWidth) return true;
            return false;
        },
        isMobile() {
            if (this.mobileDisplay > this.screenWidth) return true;
            return false;
        },
        borderLightColor() {
            return () => {
                if (this.$theme == 'light') {
                    return 'rgba(121, 119, 117, 0.6)';
                }
                if (this.$theme == 'dark' || this.$theme == 'custom') {
                    return 'rgba(255, 255, 255, 0.6)';
                }
                return 'rgba(121, 119, 117, 0.6)';
            };
        },
        backgroundLightColor() {
            return () => {
                if (this.$theme == 'light') {
                    return 'rgba(121, 119, 117, 0.3)';
                }
                if (this.$theme == 'dark' || this.$theme == 'custom') {
                    return 'rgba(255, 255, 255, 0.3)';
                }
                return 'rgba(121, 119, 117, 0.3)';
            };
        },
        $theme() {
            return useTheme(this.$props).theme.value;
        }
    },
    mounted() {
        this.screenWidthInit();
        this.outSideClickInit();
    },
    methods: {
        screenWidthInit() {
            this.timer.widthTimer = setInterval(() => {
                this.screenWidth = window.innerWidth;
            }, 30);
        },
        outSideClickInit() {
            window.addEventListener('click', this.outSideClickEvent);
        },
        outSideClickEvent(event) {
            if (
                !event.composedPath().includes(this.$refs.mc) &&
                !event.composedPath().includes(this.$refs.panel)
            ) {
                if (this.isFlyout || this.isMobile) this.thisExpand = false;
            }
        },
        expandClick() {
            this.thisExpandBackup = !this.thisExpand;
            this.thisExpand = !this.thisExpand;
            this.$emit('expand-click', this.thisExpand);
        }
    },
    beforeUnmount() {
        clearInterval(this.timer.widthTimer);

        this.uR.revealDirectJs.destroy(this.FR);
        window.removeEventListener('click', this.outSideClickEvent);
    }
};
</script>
