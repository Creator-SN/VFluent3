<template>
    <transition name="fv-menu-flyout">
        <div
            class="menu-flyout-list-container"
            :class="[{ 'mobile-mode': mobileMode }]"
            :style="{
                left: computedLeft,
                right: computedRight,
                top: computedTop
            }"
        >
            <div
                class="menu-flyout-item-container"
                :style="{
                    width: computedWidth,
                    'max-height': computedMaxHeight,
                    background: background,
                    'overflow-y': 'auto',
                    'overflow-x': 'visible'
                }"
                ref="container"
            >
                <div v-if="mobileMode" class="fv-menu-flyout-mobile-control">
                    <fv-button
                        :theme="$theme"
                        :borderRadius="50"
                        background="transparent"
                        style="width: 30px; height: 30px"
                        @click="destroyMe"
                    >
                        <i class="ms-Icon ms-Icon--Back"></i>
                    </fv-button>
                </div>
                <div
                    v-for="(item, index) in thisValue"
                    class="fv-menu-flyout-item"
                    :class="{
                        hr: valueTrigger(item.type) == 'divider',
                        normal:
                            (valueTrigger(item.type) == 'default' ||
                                valueTrigger(item.type) == undefined) &&
                            !valueTrigger(item.disabled),
                        disabled: valueTrigger(item.disabled),
                        choose: isSelected(item),
                        title: valueTrigger(item.type) == 'header'
                    }"
                    :style="{
                        background: isSelected(item) ? choosenBackground : '',
                        color:
                            valueTrigger(item.type) === 'header'
                                ? titleForeground
                                : ''
                    }"
                    @mouseenter="Expand($event, item)"
                    @click="Choose($event, item)"
                    :key="`options: ${item.key ? item.key : index}`"
                    :title="valueTrigger(item.text)"
                >
                    <slot
                        :item="item"
                        :choosenSliderBackground="choosenSliderBackground"
                    >
                        <i
                            class="before-choosen"
                            :style="{ background: choosenSliderBackground }"
                        ></i>
                        {{
                            valueTrigger(item.type) !== 'divider'
                                ? valueTrigger(item.text)
                                : ''
                        }}
                        <i
                            v-show="item.children"
                            class="ms-Icon ms-Icon--ChevronRight after-expand"
                        ></i>
                    </slot>
                </div>
            </div>
            <fv-menu-flyout-children-container
                v-if="currentItem && currentItem.children"
                :model-value="currentItem.children"
                :background="background"
                :parent-node="thisParentNode"
                :parent-wrapper="thisParentWrapper"
                :menu-width="menuWidth"
                :menu-max-height="menuMaxHeight"
                :choosen-background="choosenBackground"
                :choosen-slider-background="choosenSliderBackground"
                :title-foreground="titleForeground"
                :trigger-mode="triggerMode"
                :mobile-mode="mobileMode"
                :zIndex="zIndex * 1 + 1"
                :theme="theme"
                @choose-item="addChooseItem"
                @destroy-me="currentItem = null"
            >
                <template v-slot:item="x">
                    <slot
                        :item="x"
                        :choosenSliderBackground="choosenSliderBackground"
                    >
                        <i
                            class="before-choosen"
                            :style="{ background: choosenSliderBackground }"
                        ></i>
                        {{
                            valueTrigger(x.type) !== 'divider'
                                ? valueTrigger(x.text)
                                : ''
                        }}
                        <i
                            v-show="x.children"
                            class="ms-Icon ms-Icon--ChevronRight after-expand"
                        ></i>
                    </slot>
                </template>
            </fv-menu-flyout-children-container>
        </div>
    </transition>
</template>

<script>
import { ClassBuilder, StyleBuilder, useTheme } from '@/utils/common';

export default {
    name: 'FvMenuFlyoutChildrenContainer',
    emits: ['choose-item'],
    props: {
        modelValue: {
            default: () => []
        },
        background: {
            default: ''
        },
        choosenBackground: {
            default: ''
        },
        choosenSliderBackground: {
            default: ''
        },
        titleForeground: {
            default: ''
        },
        parentNode: {
            default: null
        },
        parentWrapper: {
            default: null
        },
        triggerMode: {
            default: 'click'
        },
        mobileMode: {
            default: false
        },
        menuWidth: {
            default: 200
        },
        menuMaxHeight: {
            default: 350
        },
        zIndex: {
            default: 2
        },
        theme: {
            type: String,
            default: 'global'
        }
    },
    data() {
        return {
            thisValue: this.modelValue,
            currentItem: null,
            top: 0,
            showMode: 'right',
            thisParentNode: null,
            thisParentWrapper: null
        };
    },
    watch: {
        modelValue(val) {
            this.thisValue = val;
            this.currentItem = null;
            this.posInit();
        },
        parentWrapper(newVal, oldVal) {
            if (newVal) newVal.addEventListener('scroll', this.posInit);
            if (oldVal) oldVal.removeEventListener('scroll', this.posInit);
        }
    },
    computed: {
        computedLeft() {
            if (this.mobileMode) return 0;
            if (this.showMode == 'right') return '100%';
            return '';
        },
        computedRight() {
            if (this.mobileMode) return '';
            if (this.showMode == 'left') return '100%';
            return '';
        },
        computedTop() {
            if (this.mobileMode) return '';
            return `${this.top}px`;
        },
        computedWidth() {
            if (this.mobileMode) return '100%';
            return `${this.menuWidth}px`;
        },
        computedMaxHeight() {
            if (this.mobileMode) return '100%';
            return `${this.menuMaxHeight}px`;
        },
        $theme() {
            return useTheme(this.$props).theme.value;
        }
    },
    mounted() {
        this.eventInit();
        this.posInit();
    },
    methods: {
        eventInit() {
            if (this.parentWrapper)
                this.parentWrapper.addEventListener('scroll', this.posInit);
        },
        posInit() {
            if (this.parentNode) {
                let scrollTop = this.parentWrapper
                    ? this.parentWrapper.scrollTop
                    : 0;
                let top = this.parentNode.offsetTop;
                this.top = top - scrollTop;

                const right = this.parentNode.getBoundingClientRect().right;
                if (right + this.menuWidth > window.innerWidth)
                    this.showMode = 'left';
                else this.showMode = 'right';
            }
        },
        valueTrigger(val) {
            if (typeof val === 'function') return val();
            return val;
        },
        Expand(event, item) {
            if (this.triggerMode == 'click' && event.type !== 'click') return;
            if (this.valueTrigger(item.disabled)) return 0;
            if (
                this.valueTrigger(item.type) == 'header' ||
                this.valueTrigger(item.type) == 'divider'
            )
                return 0;
            this.currentItem = item;
            this.thisParentNode = event.target;
            this.thisParentWrapper = this.$refs.container;
        },
        Choose(event, item) {
            this.Expand(event, item);
            if (item.children) return;
            this.$emit('choose-item', [item]);
        },
        addChooseItem(event) {
            if (!this.currentItem) return;
            this.$emit('choose-item', [this.currentItem, ...event]);
            this.currentItem = null;
        },
        destroyMe() {
            this.$emit('destroy-me', this.thisValue);
        },
        isSelected(item) {
            return item == this.currentItem;
        }
    },
    beforeUnmount() {
        if (this.parentWrapper)
            this.parentWrapper.removeEventListener('scroll', this.posInit);
    }
};
</script>
