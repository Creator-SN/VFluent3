<template>
    <div class="fv-NavigationView" :class="[$theme, { compact: !thisExpand }]">
        <fv-NavigationPanel
            :title="title"
            v-model:expand="thisExpand"
            :expandMode="expandMode"
            :expandWidth="expandWidth"
            :expandDisplay="expandDisplay"
            :compactWidth="compactWidth"
            :flyoutDisplay="flyoutDisplay"
            :fullSizeDisplay="fullSizeDisplay"
            :mobileDisplay="mobileDisplay"
            :showBack="showBack"
            :showNav="showNav"
            :showSearch="showSearch"
            :settingTitle="settingTitle"
            :showSetting="false"
            :background="background"
            :theme="theme"
            ref="panel"
            @back="$emit('back', $event)"
            @expand-click="$emit('expand-click', $event)"
            @expand-change="expandChange"
            @setting-click="settingClick"
        >
            <template v-slot:title="{ show }">
                <slot name="title" :show="show">
                    <p v-show="show" class="name title">{{ title }}</p>
                </slot>
            </template>
            <template v-slot:navIcon>
                <slot name="navIcon">
                    <i class="ms-Icon ms-Icon--GlobalNavButton icon"></i>
                </slot>
            </template>
            <template v-slot:backIcon>
                <slot name="backIcon">
                    <i class="ms-Icon ms-Icon--Back icon"></i>
                </slot>
            </template>
            <template v-slot:searchBlock>
                <slot name="searchBlock" :options="options">
                    <fv-search-box
                        :options="options"
                        icon="Search"
                        :placeholder="searchPlaceholder"
                        :theme="theme"
                        class="nav-search"
                        :revealBorder="true"
                        borderRadius="3"
                        :isBoxShadow="true"
                        style="width: 95%"
                        @choose-result="onChooseSearch"
                    ></fv-search-box>
                </slot>
            </template>
            <template v-slot:panel>
                <fv-list-view
                    :modelValue="options"
                    class="navigation-list"
                    ref="listView"
                    :theme="theme"
                    :headerForeground="foreground"
                    choosenBackground="transparent"
                    v-model:sliderTarget="currentTarget"
                    :showSlider="true"
                    @chooseItem="itemClick"
                    @item-click="$emit('item-click', $event.item)"
                >
                    <template v-slot:listItem="x">
                        <slot
                            name="listItem"
                            :item="x.item"
                            :index="x.index"
                            :valueTrigger="x.valueTrigger"
                        >
                            <i
                                v-show="
                                    x.valueTrigger(x.item.icon) !== undefined
                                "
                                class="ms-Icon icon"
                                :class="[
                                    `ms-Icon--${x.valueTrigger(x.item.icon)}`
                                ]"
                            ></i>
                            <p
                                class="name"
                                :style="{
                                    color:
                                        x.valueTrigger(x.item.type) == 'header'
                                            ? foreground
                                            : ''
                                }"
                            >
                                {{ x.valueTrigger(x.item.name) }}
                            </p>
                        </slot>
                    </template>
                    <template v-slot:footer>
                        <fv-animated-icon
                            v-show="showSetting"
                            ref="setting"
                            modelValue="bounceRotate"
                            class="fv-nav-default-item"
                            :hideContent="!thisExpand"
                            style="width: calc(100% - 10px)"
                            @click="settingClick({ event: $event })"
                        >
                            <i class="ms-Icon ms-Icon--Settings icon"></i>
                            <template v-slot:content>
                                <p class="name">{{ settingTitle }}</p>
                            </template>
                        </fv-animated-icon>
                    </template>
                </fv-list-view>
            </template>
        </fv-NavigationPanel>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { commonProps } from '@/packages/common/props';

const emits = defineEmits([
    'update:modelValue',
    'expand-change',
    'setting-click',
    'item-click',
    'back',
    'expand-click',
    'update:expand'
]);

const props = defineProps({
    ...commonProps,
    emits: [
        'update:modelValue',
        'expand-change',
        'setting-click',
        'item-click',
        'back',
        'expand-click',
        'update:expand'
    ],
    modelValue: {
        default: () => {
            return {};
        }
    },
    options: {
        default: () => []
    },
    title: {
        default: 'NavigationView'
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
        default: 46
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
    searchPlaceholder: {
        default: 'Search'
    },
    foreground: {
        default: ''
    },
    background: {
        default: ''
    }
});
</script>

<script>
import { useTheme } from '@/utils/common';
import { title } from 'process';

export default {
    name: 'FvNavigationView',
    data() {
        return {
            thisValue: {},
            thisExpand: this.expand,
            currentTarget: {},
            currentTop: 0,
            currentHeight: 0,
            timer: {
                slider: {}
            }
        };
    },
    watch: {
        modelValue(val, from) {
            this.valueInit();
        },
        thisValue(val, from) {
            if (!(val.name === from.name && val.key === from.key)) {
                this.$nextTick(() => {
                    this.onChooseSearch(val);
                });
                this.$emit('update:modelValue', val);
            }
        },
        expand(val) {
            this.thisExpand = val;
        },
        thisExpand(val) {
            this.$emit('update:expand', val);
        }
    },
    computed: {
        $theme() {
            return useTheme(this.$props).theme.value;
        }
    },
    mounted() {
        this.valueInit();
    },
    methods: {
        valueInit() {
            if (this.modelValue.type === 'setting') {
                this.thisValue = this.modelValue;
                return 0;
            }
            let thisValue = this.options.find(
                (item) =>
                    item.name === this.modelValue.name &&
                    item.key === this.modelValue.key
            );
            if (thisValue !== undefined) this.thisValue = thisValue;
            else
                this.thisValue = this.options.find(
                    (item) => item.type !== 'header' && item.type !== 'divider'
                );
        },
        itemClick(event) {
            this.thisValue = event.item;
        },
        settingClick(item) {
            this.currentTarget = this.$refs.setting.$el;
            this.thisValue = {
                key: '>setting',
                name: '>setting',
                type: 'setting'
            };
            this.$emit('setting-click', item);
        },
        expandChange(status) {
            this.$emit('expand-change', status);
        },
        onChooseSearch(item) {
            if (item.type === 'setting') {
                this.currentTarget = this.$refs.setting.$el;
                this.thisValue = {
                    key: '>setting',
                    name: '>setting',
                    type: 'setting'
                };
                return 0;
            }
            let c = this.options.find((it) => {
                return it.name === item.name && it.key === item.key;
            });
            let index = this.options.indexOf(c);
            if (index < 0) return 0;
            this.currentTarget =
                this.$refs.listView.$refs[`list_item_${index}`][0];
            this.thisValue = c;
        }
    },
    beforeUnmount() {
        clearInterval(this.timer);
    }
};
</script>
