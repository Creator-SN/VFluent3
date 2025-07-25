<template>
    <div class="fv-ListView" :class="[$theme]" @click="focus = true">
        <div class="list-view-header">
            <slot name="header"></slot>
        </div>
        <div class="list-view-container" ref="container">
            <span
                v-show="valueTrigger(item.show) !== false"
                v-for="(item, index) in thisValue"
                :class="{
                    choose: valueTrigger(item.choosen),
                    header: valueTrigger(item.type) == 'header',
                    hr: valueTrigger(item.type) == 'divider',
                    normal:
                        valueTrigger(item.type) == 'default' ||
                        valueTrigger(item.type) == undefined,
                    disabled: valueTrigger(item.disabled),
                    selected: item.selected && showSelectedBorder
                }"
                class="list-view-item"
                :key="index"
                :style="{
                    height: _rowHeight,
                    background: valueTrigger(item.choosen)
                        ? choosenBackground
                        : '',
                    borderRadius: itemBorderRadius + 'px'
                }"
                :ref="`list_item_${index}`"
                @click="handlerClick($event, item)"
                @touchend="handlerClick($event, item)"
                @dragover="dragOver(event, item)"
                @dragleave="dragLeave(event, item)"
                @drop="dropItem(event, item)"
            >
                <fv-reveal-container
                    v-if="
                        (valueTrigger(item.type) == 'default' ||
                            valueTrigger(item.type) == undefined) &&
                        !valueTrigger(item.disabled)
                    "
                    :revealContainer="FR"
                    :parent="() => $refs[`list_item_${index}`][0]"
                    class="fv-listview-reveal-container"
                    :backgroundColor="backgroundLightColor"
                    :borderColor="borderLightColor"
                    :borderGradientSize="35"
                    :borderWidth="1"
                    :borderRadius="itemBorderRadius"
                ></fv-reveal-container>
                <div class="item-content" :style="{ padding: itemPadding }">
                    <slot
                        name="listItem"
                        :item="item"
                        :index="index"
                        :valueTrigger="valueTrigger"
                    >
                        <p
                            :style="{
                                color:
                                    valueTrigger(item.type) == 'header'
                                        ? headerForeground
                                        : ''
                            }"
                        >
                            {{ valueTrigger(item.name) }}
                        </p>
                    </slot>
                </div>
            </span>
        </div>
        <div class="list-view-footer">
            <slot name="footer"></slot>
        </div>
        <vertical-slider
            v-if="showSlider"
            :top="currentTop"
            :height="currentHeight"
            :background="headerForeground"
        ></vertical-slider>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { commonProps } from '@/packages/common/props';

const emits = defineEmits([
    'update:modelValue',
    'item-click',
    'chooseItem',
    'choosen-items',
    'selection-change',
    'item-drag-over',
    'item-drag-leave',
    'item-drop',
    'update:sliderTarget',
    'update:sliderIndex'
]);

const props = defineProps({
    ...commonProps,
    modelValue: {
        default: () => []
    },
    choosen: {
        default: () => []
    },
    multiple: {
        default: false
    },
    rowHeight: {
        default: ''
    },
    headerForeground: {
        default: ''
    },
    choosenBackground: {
        default: ''
    },
    itemPadding: {
        default: ''
    },
    itemBorderRadius: {
        default: 3
    },
    revealBorderColor: {
        default: false
    },
    revealBackgroundColor: {
        default: false
    },
    showSlider: {
        default: false
    },
    sliderTarget: {
        default: () => {}
    },
    sliderIndex: {
        default: -1
    }
});
</script>

<script>
import verticalSlider from './sub/verticalSlider.vue';

import { useTheme } from '@/utils/common';

export default {
    name: 'FvListView',
    components: {
        verticalSlider
    },

    data() {
        return {
            FR: {
                init: false,
                el: () => this.$el,
                revealHandlerList: []
            },
            thisValue: [],
            focus: false,
            showSelectedBorder: false,
            thisSliderTarget: null,
            thisSliderIndex: this.sliderIndex,
            currentTop: 0,
            currentHeight: 0,
            timer: {
                debounce: null
            }
        };
    },
    watch: {
        modelValue(val) {
            this.valueInit();
            this.setChoosen();
        },
        choosen(val) {
            this.setChoosen();
        },
        sliderTarget(val) {
            this.thisSliderTarget = val;
        },
        thisSliderTarget(val) {
            this.$emit('update:sliderTarget', val);
        },
        sliderIndex(val) {
            this.thisSliderIndex = val;
            this.setSliderTarget(val);
        },
        thisSliderIndex(val) {
            this.$emit('update:sliderIndex', val);
        }
    },
    computed: {
        borderLightColor() {
            if (this.revealBorderColor) return this.revealBorderColor;
            if (this.$theme == 'light') {
                return 'rgba(121, 119, 117, 0.6)';
            }
            if (this.$theme == 'dark' || this.$theme == 'custom') {
                return 'rgba(255, 255, 255, 0.6)';
            }
            return 'rgba(121, 119, 117, 0.6)';
        },
        backgroundLightColor() {
            if (this.revealBackgroundColor) return this.revealBackgroundColor;
            if (this.$theme == 'light') {
                return 'rgba(160, 160, 160, 0.2)';
            }
            if (this.$theme == 'dark' || this.$theme == 'custom') {
                return 'rgba(255, 255, 255, 0.1)';
            }
            return 'rgba(160, 160, 160, 0.2)';
        },
        currentChoosen() {
            let result = [];
            for (let i = 0; i < this.thisValue.length; i++) {
                if (this.thisValue[i].choosen && this.thisValue[i].show)
                    result.push(this.thisValue[i]);
            }
            return result;
        },
        currentChoosenAll() {
            for (let i = 0; i < this.thisValue.length; i++) {
                if (this.thisValue[i].choosen != true && this.thisValue[i].show)
                    return false;
            }
            return true;
        },
        currentChoosenNum() {
            let count = 0;
            for (let i = 0; i < this.thisValue.length; i++) {
                if (this.thisValue[i].choosen && this.thisValue[i].show)
                    count++;
            }
            return count;
        },
        _rowHeight() {
            if (isNaN(this.rowHeight)) return this.rowHeight;
            return this.rowHeight + 'px';
        },
        $theme() {
            return useTheme(this.$props).theme.value;
        }
    },
    mounted() {
        this.valueInit();
        this.setChoosen();
        this.outSideClickInit();
        this.keyDownEventInit();
        this.sliderRefreshInit();
        window.addEventListener('click', () => {
            this.showSelectedBorder = false;
        });
        setTimeout(() => {
            this.setSliderTarget();
        }, 300);
    },
    methods: {
        valueInit() {
            let model = {
                name: '',
                show: true,
                choosen: false,
                selected: false,
                disabled: false
            };

            let result = [];

            for (let item of this.modelValue) {
                let m = JSON.parse(JSON.stringify(model));
                result.push(Object.assign(m, item));
            }
            this.thisValue = result;
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
            if (!_self) this.focus = false;
        },
        keyDownEventInit() {
            window.addEventListener('keydown', (event) => {
                if (!this.focus) return;
                if (event.keyCode === 40) this.move(event, 1);
                else if (event.keyCode === 38) this.move(event, -1);
                if (event.keyCode === 13) this.enter(event);
            });
        },
        valueTrigger(val) {
            if (typeof val === 'function') return val();
            return val;
        },
        handlerClick($event, cur) {
            clearTimeout(this.timer.debounce);
            this.timer.debounce = setTimeout(() => {
                this.onChoosen($event, cur);
                if (this.valueTrigger(cur.disabled)) return;
                if (
                    this.valueTrigger(cur.type) === 'header' ||
                    this.valueTrigger(cur.type) == 'divider'
                )
                    return;
                let index = this.thisValue.indexOf(cur);
                this.$emit('item-click', {
                    item: cur,
                    index,
                    event: $event
                });
            }, 200);
        },
        onChoosen($event, cur) {
            if (this.valueTrigger(cur.disabled)) return 0;
            if (
                this.valueTrigger(cur.type) === 'header' ||
                this.valueTrigger(cur.type) == 'divider'
            )
                return 0;
            if (this.multiple) {
                let t = this.currentChoosen.find(
                    (item) => item.key === cur.key
                );
                if (t != undefined) {
                    cur.choosen = false;
                    this.thisValue[this.thisValue.indexOf(cur)] = cur;
                } else {
                    cur.choosen = true;
                    this.thisValue[this.thisValue.indexOf(cur)] = cur;
                }
            } else {
                for (let it of this.currentChoosen) {
                    it.choosen = false;
                    this.thisValue[this.thisValue.indexOf(it)] = it;
                }
                cur.choosen = true;
                this.thisValue[this.thisValue.indexOf(cur)] = cur;
            }

            this.selectionFormat(cur);
            this.scrollFormat($event.target);

            let index = this.thisValue.indexOf(cur);
            this.$emit('chooseItem', {
                item: cur,
                index,
                event: $event
            });
            this.setSliderTarget(index);

            this.$emit('choosen-items', this.currentChoosen);
        },
        setChoosen() {
            for (let cur of this.choosen) {
                if (this.valueTrigger(cur.disabled)) continue;
                if (
                    this.valueTrigger(cur.type) === 'header' ||
                    this.valueTrigger(cur.type) == 'divider'
                )
                    continue;
                let item = this.thisValue.find((it) => it.key === cur.key);
                if (item) {
                    if (!this.multiple) {
                        for (let it of this.currentChoosen) {
                            it.choosen = false;
                            this.thisValue[this.thisValue.indexOf(it)] = it;
                        }
                    }

                    item.choosen = true;
                    let index = this.thisValue.indexOf(item);
                    this.thisValue[index] = item;
                    this.setSliderTarget(index);
                }

                this.selectionFormat(item);
            }
        },
        move($event, direction) {
            $event.preventDefault();
            this.showSelectedBorder = true;
            let selectedItem = this.thisValue.find(
                (it) => it.selected === true
            );
            if (!selectedItem) {
                selectedItem = this.thisValue.find((it) => {
                    if (this.valueTrigger(it.disabled)) return false;
                    if (
                        this.valueTrigger(it.type) === 'header' ||
                        this.valueTrigger(it.type) == 'divider'
                    )
                        return false;
                    return true;
                });
                if (!selectedItem) return;
                let selectedItemIndex = this.thisValue.indexOf(selectedItem);
                this.selectionFormat(selectedItem);
                this.scrollFormat(
                    this.$refs[`list_item_${selectedItemIndex}`][0]
                );
                return;
            }
            let selectedItemIndex = this.thisValue.indexOf(selectedItem);
            if (direction == 1) {
                for (
                    let i = selectedItemIndex + 1;
                    i < this.thisValue.length;
                    i++
                ) {
                    if (this.valueTrigger(this.thisValue[i].disabled)) continue;
                    if (
                        this.valueTrigger(this.thisValue[i].type) ===
                            'header' ||
                        this.valueTrigger(this.thisValue[i].type) == 'divider'
                    )
                        continue;
                    selectedItem = this.thisValue[i];
                    selectedItemIndex = i;
                    break;
                }
            } else if (direction == -1) {
                for (let i = selectedItemIndex - 1; i >= 0; i--) {
                    if (this.valueTrigger(this.thisValue[i].disabled)) continue;
                    if (
                        this.valueTrigger(this.thisValue[i].type) ===
                            'header' ||
                        this.valueTrigger(this.thisValue[i].type) == 'divider'
                    )
                        continue;
                    selectedItem = this.thisValue[i];
                    selectedItemIndex = i;
                    break;
                }
            }
            this.selectionFormat(selectedItem);
            this.scrollFormat(this.$refs[`list_item_${selectedItemIndex}`][0]);
        },
        enter($event) {
            let cur = this.thisValue.find((it) => it.selected === true);
            if (!cur) return;
            if (this.multiple) {
                let t = this.currentChoosen.find(
                    (item) => item.key === cur.key
                );
                if (t != undefined) {
                    cur.choosen = false;
                    this.thisValue[this.thisValue.indexOf(cur)] = cur;
                } else {
                    cur.choosen = true;
                    this.thisValue[this.thisValue.indexOf(cur)] = cur;
                }
            } else {
                for (let it of this.currentChoosen) {
                    it.choosen = false;
                    this.thisValue[this.thisValue.indexOf(it)] = it;
                }
                cur.choosen = true;
                this.thisValue[this.thisValue.indexOf(cur)] = cur;
            }

            let index = this.thisValue.indexOf(cur);
            this.$emit('chooseItem', {
                item: cur,
                index,
                event: $event
            });
            this.setSliderTarget(index);

            this.$emit('choosen-items', this.currentChoosen);
        },
        scrollFormat(target) {
            let targetPos = target.getBoundingClientRect();
            let elPos = this.$refs.container.getBoundingClientRect();
            if (targetPos.top < elPos.top) {
                let dis = elPos.top - targetPos.top;
                this.$refs.container.scrollTop -= dis;
            }
            if (targetPos.bottom > elPos.bottom) {
                let dis = elPos.bottom - targetPos.bottom;
                this.$refs.container.scrollTop -= dis;
            }
        },
        selectionFormat(cur) {
            this.thisValue.forEach((el, idx) => {
                if (el.key === cur.key && el.name === cur.name) {
                    el.selected = true;
                    this.thisValue[idx] = el;
                    this.$emit('selection-change', el);
                } else {
                    el.selected = false;
                    this.thisValue[idx] = el;
                }
            });
        },
        setSliderTarget(index = null) {
            if (!index) {
                for (let i = 0; i < this.thisValue.length; i++) {
                    if (this.thisValue[i].choosen) {
                        index = i;
                        break;
                    }
                }
            }
            if (this.$refs[`list_item_${index}`]) {
                this.thisSliderTarget = this.$refs[`list_item_${index}`][0];
                this.thisSliderIndex = index;
            }
        },
        sliderRefreshInit() {
            this.timer.slider = setInterval(() => {
                if (this.thisSliderTarget) {
                    let target = this.thisSliderTarget;
                    let elTop = this.$el.getBoundingClientRect().top;
                    let targetTop = target.getBoundingClientRect().top;
                    this.currentTop = targetTop - elTop;
                } else this.currentTop = 0;
                if (this.thisSliderTarget) {
                    let target = this.thisSliderTarget;
                    this.currentHeight = target.clientHeight;
                } else this.currentHeight = 0;
            }, 30);
        },
        dragOver(event, item) {
            event.preventDefault();
            event.stopPropagation();
            if (this.valueTrigger(item.disabled)) return;
            this.$emit('item-drag-over', {
                drop: item,
                root: this.thisValue
            });
        },
        dragLeave(event, item) {
            event.preventDefault();
            event.stopPropagation();
            this.$emit('item-drag-leave', {
                drop: item,
                root: this.thisValue
            });
        },
        dropItem(event, item) {
            event.preventDefault();
            event.stopPropagation();
            if (this.valueTrigger(item.disabled)) return;
            this.$emit('item-drop', {
                drop: item,
                root: this.thisValue
            });
        },
        inspectItemAPI(cur) {
            let c = this.thisValue.find((it) => {
                return (
                    this.valueTrigger(it.name) ===
                        this.valueTrigger(cur.name) &&
                    this.valueTrigger(it.type) ===
                        this.valueTrigger(cur.type) &&
                    it.key === cur.key
                );
            });
            let index = this.thisValue.indexOf(c);
            if (index < 0) return 0;
            let items =
                this.$refs.container.querySelectorAll('.list-view-item');
            this.onChoosen({ target: items[index] }, cur);
        }
    },
    beforeUnmount() {
        clearInterval(this.timer.slider);
        window.removeEventListener('click', this.outSideClickEvent);
    }
};
</script>
