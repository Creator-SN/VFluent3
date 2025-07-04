<template>
    <div
        class="fv-CommandBar"
        :class="[$theme]"
        :style="{ background: background }"
    >
        <div class="left-command-bar-container">
            <span
                v-show="valueTrigger(item.show)"
                v-for="(item, index) in thisOptions"
                class="command-bar-item"
                :class="[
                    valueTrigger(item.type) == 'divider' ? 'hr' : 'normal',
                    { not_disabled: !valueTrigger(item.disabled) },
                    { disabled: valueTrigger(item.disabled) }
                ]"
                :key="index"
                :title="valueTrigger(item.name)"
                @click="itemClick($event, item)"
            >
                <span
                    v-show="valueTrigger(item.type) !== 'more'"
                    class="s1-container"
                >
                    <fv-reveal-container
                        v-if="
                            valueTrigger(item.type) != 'divider' &&
                            !valueTrigger(item.disabled)
                        "
                        :parent="() => $el"
                        class="fv-command-bar-reveal-container"
                        :backgroundColor="backgroundLightColor"
                        :borderColor="borderLightColor"
                        :borderGradientSize="80"
                        :borderWidth="1"
                        :borderRadius="6"
                    ></fv-reveal-container>
                    <i
                        class="ms-Icon icon"
                        :class="[`ms-Icon--${valueTrigger(item.icon)}`]"
                        :style="{ color: valueTrigger(item.iconColor) }"
                    ></i>
                    <p v-show="!compact" class="name">
                        {{ valueTrigger(item.name) }}
                    </p>
                    <i
                        v-show="item.secondary.length > 0"
                        class="ms-Icon ms-Icon--ChevronDown icon"
                    ></i>
                </span>
                <span
                    v-show="valueTrigger(item.type) === 'more'"
                    class="s1-container"
                >
                    <i class="ms-Icon ms-Icon--More icon"></i>
                </span>
            </span>
        </div>
        <div class="right-command-bar-container">
            <slot name="right-space"></slot>
        </div>
        <transition :name="toward == 'down' ? 'zoom-in-top' : 'zoom-in-bottom'">
            <div
                v-show="showDropDown"
                class="command-bar-list-view-container"
                :class="{ 'toward-up': toward == 'up' }"
                :style="{ left: `${currentLeft}px`, background: background }"
            >
                <fv-list-view
                    v-model="thisValue.secondary"
                    style="height: auto"
                    @chooseItem="chooseItem"
                >
                    <template v-slot:listItem="x">
                        <i
                            v-show="valueTrigger(x.item.icon) !== undefined"
                            class="ms-Icon icon"
                            :class="[`ms-Icon--${valueTrigger(x.item.icon)}`]"
                            :style="{ color: valueTrigger(x.item.iconColor) }"
                            style="font-size: 12px"
                        ></i>
                        <p class="name" style="font-size: 12px">
                            {{ valueTrigger(x.item.name) }}
                        </p>
                    </template>
                </fv-list-view>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { commonProps } from '@/packages/common/props';

const emits = defineEmits(['update:modelValue', 'item-click']);

const props = defineProps({
    ...commonProps,
    modelValue: {
        default: () => {
            return {};
        }
    },
    options: {
        default: () => []
    },
    toward: {
        default: 'down'
    },
    background: {
        default: ''
    },
    compact: {
        default: false
    },
    revealBorderColor: {
        default: false
    },
    revealBackgroundColor: {
        default: false
    }
});
</script>

<script>
import { useTheme } from '@/utils/common';

export default {
    name: 'FvCommandBar',

    data() {
        return {
            thisValue: {},
            thisOptions: [],
            currentLeft: 0
        };
    },
    watch: {
        modelValue(val) {
            this.thisValue = val;
        },
        thisValue(val) {
            this.$emit('update:modelValue', val);
        },
        options(val) {
            this.optionsInit();
        }
    },
    computed: {
        showDropDown() {
            if (this.thisValue.choosen !== true) return false;
            if (this.thisValue.secondary === undefined) return false;
            if (this.thisValue.secondary.length > 0) return true;
            return false;
        },
        borderLightColor() {
            if (this.revealBorderColor) return this.revealBorderColor;
            if (this.$theme == 'light') {
                return 'rgba(121, 119, 117, 0.1)';
            }
            if (this.$theme == 'dark' || this.$theme == 'custom') {
                return 'rgba(255, 255, 255, 0.1)';
            }
            return 'rgba(121, 119, 117, 0.1)';
        },
        backgroundLightColor() {
            if (this.revealBackgroundColor) return this.revealBackgroundColor;
            if (this.$theme == 'light') {
                return 'rgba(121, 119, 117, 0.05)';
            }
            if (this.$theme == 'dark' || this.$theme == 'custom') {
                return 'rgba(255, 255, 255, 0.05)';
            }
            return 'rgba(121, 119, 117, 0.05)';
        },
        $theme() {
            return useTheme(this.$props).theme.value;
        }
    },
    mounted() {
        this.optionsInit();
        this.outSideClickInit();
    },
    methods: {
        optionsInit() {
            let model = {
                name: '',
                type: 'normal',
                icon: '',
                show: true,
                choosen: false,
                secondary: []
            };
            let result = [];
            for (let item of this.options) {
                let m = JSON.parse(JSON.stringify(model));
                m = Object.assign(m, item);
                result.push(m);
            }
            this.thisOptions = result;
        },
        valueTrigger(val) {
            if (typeof val === 'function') return val();
            return val;
        },
        outSideClickInit() {
            window.addEventListener('click', this.outSideClickEvent);
        },
        outSideClickEvent(event) {
            let x = event.target;
            let _self = false;
            while (x && x.tagName && x.tagName.toLowerCase() != 'body') {
                if (x == this.$el) {
                    _self = true;
                    break;
                }
                x = x.parentNode;
            }
            if (!_self) this.collapseAll();
        },
        collapseAll() {
            for (let i = 0; i < this.thisOptions.length; i++) {
                let t = this.thisOptions[i];
                t.choosen = false;
                this.thisOptions[i] = t;
            }
        },
        itemClick(event, item) {
            if (this.valueTrigger(item.disabled)) return 0;
            let status = !item.choosen;
            this.collapseAll();
            item.choosen = status;
            this.thisOptions[this.thisOptions.indexOf(item)] = item;
            this.thisValue = item;
            this.$emit('item-click', item);
            if (item.func !== undefined) item.func();
            this.leftFormat(event);
        },
        chooseItem(event) {
            let item = event.item;
            this.thisValue = item;
            if (item.func !== undefined) item.func();
            this.$emit('item-click', item);
            this.collapseAll();
        },
        leftFormat(event) {
            let x = event.target;
            while (
                !x.getAttribute('class') ||
                x.getAttribute('class').indexOf('command-bar-item') < 0
            )
                x = x.parentNode;
            let thisLeft = this.$el.getBoundingClientRect().left;
            let thisRight = this.$el.getBoundingClientRect().right;
            let targetLeft = x.getBoundingClientRect().left;
            let targetRight = x.getBoundingClientRect().right;
            let menuWidth = 200;
            if (targetLeft + menuWidth > thisRight)
                this.currentLeft = thisRight - thisLeft - menuWidth;
            else this.currentLeft = targetLeft - thisLeft;
        }
    },
    beforeUnmount() {
        window.removeEventListener('click', this.outSideClickEvent);
    }
};
</script>
