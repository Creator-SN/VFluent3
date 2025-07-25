<template>
    <div class="fv-DetailsList" :class="[$theme]">
        <div
            class="fv-details-list-head"
            :class="{ 'fv-custom-head': true }"
            ref="list_head"
        >
            <span
                v-show="multiSelection"
                class="fv-details-list-icon-block"
                :style="styles.listHead"
                @click="chooseAll"
            >
                <selector
                    v-model="currentChoosenAll"
                    :color="foreground"
                ></selector>
            </span>
            <span
                v-show="showGroup"
                class="col"
                style="width: 36px; padding: 0px"
                :style="styles.listHead"
            >
                <span
                    class="expand"
                    :class="{ choose: currentExpandAll }"
                    @click="expandAll"
                >
                    <i class="ms-Icon ms-Icon--ChevronRight"></i>
                </span>
            </span>
            <span
                v-show="item.show && valueTrigger(item.visible)"
                v-for="(item, index) in thisHead"
                class="col"
                :key="`head: ${index}`"
                :style="{
                    'min-width': colWidth[index],
                    width: colWidth[index],
                    background: styles.listHead.background
                }"
            >
                <span class="col-content" @click="sortClick(item)">
                    <slot name="head" :item="item" :index="index">
                        <p class="default-title">
                            {{ valueTrigger(item.content) }}
                        </p>
                    </slot>
                    <i
                        v-show="item.sortName === sort.name"
                        class="ms-Icon sort"
                        :class="[`ms-Icon--${sort.desc ? 'Down' : 'Up'}`]"
                    ></i>
                </span>
                <spliter
                    style="height: 100%"
                    @mousedown="resizeDown($event, index)"
                    @mousemove="resizeMove($event, index)"
                    @touchstart="resizeDown($event.targetTouches[0], index)"
                    @touchmove="resizeMove($event.targetTouches[0], index)"
                ></spliter>
            </span>
        </div>
        <div
            v-if="!showGroup"
            class="fv-details-list-content"
            ref="l1"
            :class="{ compact: compact, 'auto-height': autoHeight }"
        >
            <transition-group name="details-list" tag="div">
                <div
                    v-show="item.show"
                    v-for="(item, index) in thisValue"
                    class="content-row"
                    :key="`row: ${index}`"
                    :draggable="allowDrag"
                    :class="[
                        { choose: item.choosen, 'fv-custom-row': true },
                        rowCss
                    ]"
                    @drag="drag($event, item)"
                    @dragover="$event.preventDefault()"
                    @drop="drop(item)"
                    @contextmenu="rightClick($event, item)"
                >
                    <span
                        v-show="multiSelection"
                        class="fv-details-list-icon-block"
                        key="multi-col"
                        @click="itemChooseClick(item)"
                    >
                        <selector
                            v-model="item.choosen"
                            :color="foreground"
                        ></selector>
                    </span>
                    <span
                        v-show="col.show && valueTrigger(col.visible)"
                        v-for="(col, idx) in thisHead"
                        class="col"
                        :key="`row: ${index} col: ${idx}`"
                        :style="{ width: colWidth[idx] }"
                        @click="chooseCurrent(item)"
                    >
                        <slot
                            :name="`column_${idx}`"
                            :item="item"
                            :row_index="index"
                            :col_index="idx"
                        >
                            <p>{{ `row: ${index} col: ${idx}` }}</p>
                        </slot>
                    </span>
                    <slot
                        name="row_expand"
                        :item="item"
                        :row_index="index"
                    ></slot>
                </div>
            </transition-group>
        </div>
        <div
            v-if="showGroup"
            class="fv-details-list-content"
            ref="l2"
            :class="{ compact: compact, 'auto-height': autoHeight }"
        >
            <div v-for="(gi, i) in thisGroup" :key="`group: ${i}`">
                <div
                    class="content-row"
                    :class="{
                        choose: isGroupChooseAll(gi),
                        'fv-custom-group-row': true
                    }"
                >
                    <slot
                        name="group"
                        :item="gi"
                        :index="i"
                        :isMulti="multiSelection"
                        :isChoose="isGroupChooseAll(gi)"
                    >
                        <span
                            v-show="multiSelection"
                            class="fv-details-list-icon-block"
                            key="multi-col"
                            @click="chooseGroup(gi)"
                        >
                            <selector
                                :value="isGroupChooseAll(gi)"
                                :color="foreground"
                            ></selector>
                        </span>
                        <span
                            class="expand"
                            :class="{ choose: gi.expand }"
                            @click="expandGroup(gi)"
                        >
                            <i class="ms-Icon ms-Icon--ChevronRight"></i>
                        </span>
                        <slot
                            name="group_content"
                            :item="gi"
                            :index="i"
                            :isMulti="multiSelection"
                            :isChoose="isGroupChooseAll(gi)"
                        >
                            <span class="col" style="min-width: 150px">
                                <p>{{ gi.name }}</p>
                            </span>
                        </slot>
                    </slot>
                </div>
                <transition name="zoom-in-top">
                    <div v-show="gi.expand">
                        <div
                            v-show="item.show"
                            v-for="(item, index) in gi.data"
                            class="content-row"
                            :key="`group: ${i} row: ${index}`"
                            :class="[
                                { choose: item.choosen, 'fv-custom-row': true },
                                rowCss
                            ]"
                            @contextmenu="rightClick($event, item)"
                        >
                            <span
                                v-show="multiSelection"
                                class="fv-details-list-icon-block"
                                key="multi-col"
                            >
                                <selector
                                    v-model="item.choosen"
                                    @click.native="itemChooseClick(item)"
                                    :color="foreground"
                                ></selector>
                            </span>
                            <span
                                class="col"
                                style="width: 36px"
                                @click="chooseCurrent(item)"
                            ></span>
                            <span
                                v-show="col.show && valueTrigger(col.visible)"
                                v-for="(col, idx) in thisHead"
                                class="col"
                                :key="`group: ${i} row: ${index} col: ${idx}`"
                                :style="{ width: colWidth[idx] }"
                                @click="chooseCurrent(item)"
                            >
                                <slot
                                    :name="`column_${idx}`"
                                    :item="item"
                                    :row_index="index"
                                    :col_index="idx"
                                >
                                    <p>{{ `row: ${index} col: ${idx}` }}</p>
                                </slot>
                            </span>
                            <slot
                                name="row_expand"
                                :item="item"
                                :row_index="index"
                            ></slot>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
        <fv-right-menu
            ref="rightMenu"
            :theme="theme"
            :rightMenuWidth="rightMenuWidth"
            :background="rightMenuBackground"
            :fullExpandAnimation="rightMenuFullExpand"
        >
            <slot name="menu">
                <span>
                    <p>{{ currentChoosenNum }} Selected</p>
                </span>
            </slot>
        </fv-right-menu>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { commonProps } from '@/packages/common/props';

import { getCurrentInstance } from 'vue';

const { proxy } = getCurrentInstance();

const emits = defineEmits([
    'change-value',
    'choose-items',
    'lazyload',
    'rightclick',
    'drop-items'
]);

const props = defineProps({
    ...commonProps,
    modelValue: {
        default: () => []
    },
    head: {
        default: () => []
    },
    group: {
        default: () => []
    },
    filter: {
        default: () => {
            return {
                key: 'any',
                value: ''
            };
        }
    },
    showGroup: {
        default: false
    },
    autoHeight: {
        default: false
    },
    foreground: {
        default: ''
    },
    headBackground: {
        default: ''
    },
    compact: {
        default: false
    },
    multiSelection: {
        default: false
    },
    allowDrag: {
        default: false
    },
    showRightMenu: {
        default: true
    },
    rowCss: {
        default: ''
    },
    rightMenuWidth: {
        default: 200
    },
    rightMenuBackground: {
        default: ''
    },
    rightMenuFullExpand: {
        default: false
    }
});

defineExpose({
    headInit: (...args) => proxy.headInit(...args)
});
</script>

<script>
import { useTheme } from '@/utils/common';
import { useRevealCache } from '@/store/reveal';
import spliter from './sub/spliter.vue';
import selector from './sub/selector.vue';

export default {
    name: 'FvDetailsList',
    components: {
        spliter,
        selector
    },
    data() {
        return {
            thisValue: [],
            listWidth: 0,
            thisHead: [],
            thisGroup: [],
            posX: 0,
            posY: 0,
            rightMenuHeight: 0,
            windowResize: {
                trigger: false,
                width: 0
            },
            sort: {
                name: '',
                desc: false
            },
            dragTransfer: {},
            FR_Table_Head: null,
            show: {
                rightMenu: false
            },
            styles: {
                listHead: {
                    background: ''
                }
            },
            uR: null,
            timer: {
                width: {},
                resize: {}
            }
        };
    },
    watch: {
        modelValue(val) {
            this.valueInit();
            if (this.sort.name != '') {
                let col = this.thisHead.find(
                    (item) => item.sortName === this.sort.name
                );
                if (col != undefined) this.sortClick(col, false);
            }
            this.groupInit();
        },
        head: {
            deep: true,
            handler() {
                this.headInit();
                this.widthFormat(0);
            }
        },
        group(val) {
            this.groupInit();
        },
        filter(val) {
            this.filterValue();
        },
        'filter.value'(val) {
            this.filterValue();
        },
        thisGroup(val) {
            this.getGroupDataInit();
        },
        headBackground(val) {
            this.stylesInit();
        },
        multiSelection(val) {
            for (let i = 0; i < this.thisValue.length; i++) {
                let t = this.thisValue[i];
                t.choosen = false;
                this.thisValue[i] = t;
            }
        },
        listWidth(val) {
            this.widthFormat(0);
        }
    },
    computed: {
        $theme() {
            return useTheme(this.$props).theme.value;
        },
        colWidth() {
            let width = [];
            for (let item of this.thisHead) {
                width.push(`${item.width}px`);
            }
            return width;
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
        currentExpandAll() {
            for (let i = 0; i < this.thisGroup.length; i++) {
                if (this.thisGroup[i].expand != true) return false;
            }
            return true;
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
        }
    },
    beforeMount() {
        this.uR = useRevealCache();
        this.uR.initRevealInstances();
    },
    mounted() {
        this.headInit();
        this.valueInit();
        this.groupInit();
        this.lazyLoadInit();
        this.listWidthRefreshInit();
        this.watchWindowResizeInit();
        this.filterValue();
        this.FRInit();
        this.stylesInit();
    },
    methods: {
        FRInit() {
            this.FR_Table_Head = this.uR.revealMaskedJs.apply(this.$el, {
                maskedSelector: this.$refs.list_head,
                borderGradientSize: 80,
                borderLightColor: this.borderLightColor,
                backgroundLightColor: this.backgroundLightColor,
                selector: this.$el.querySelectorAll('.list-head .col')
            });
            // let FR_Right_Menu = new this.$RevealEffects(this.$el, {  // Follow the Windows 11, we temporarily disable the right menu reveal effect.
            //     selector: this.$el.querySelectorAll('.fv-rightMenu div span'),
            //     borderGradientSize: 38,
            //     borderLightColor: this.borderLightColor,
            //     backgroundGradientSize: 120,
            //     backgroundLightColor: this.backgroundLightColor
            // });
        },
        stylesInit() {
            this.styles.listHead.background = this.headBackground;
        },
        headInit() {
            let model = {
                content: '',
                minWidth: 60,
                width: 80,
                disX: 0,
                sortName: false,
                customSort: false,
                show: true,
                visible: true
            };
            this.thisHead = [];
            for (let item of this.head) {
                let m = JSON.parse(JSON.stringify(model));
                if (typeof item == 'string') m.content = item;
                else {
                    for (let iter in item) m[iter] = item[iter];
                }
                this.thisHead.push(m);
            }
        },
        valueInit() {
            let val = JSON.parse(JSON.stringify(this.modelValue));
            for (let i = 0; i < val.length; i++) {
                val[i].choosen =
                    val[i].choosen == undefined ? false : val[i].choosen;
                val[i].show = true;
            }
            this.thisValue = val;
            this.filterValue();
        },
        groupInit() {
            let model = {
                name: '',
                key: 60,
                value: 80,
                data: [],
                expand: true
            };
            this.thisGroup = [];
            for (let item of this.group) {
                let m = JSON.parse(JSON.stringify(model));
                if (typeof item == 'string') m.name = item;
                else {
                    for (let iter in item) m[iter] = item[iter];
                }
                this.thisGroup.push(m);
            }
        },
        getGroupDataInit() {
            let group = this.thisGroup;
            for (let i = 0; i < group.length; i++) {
                group[i].data = [];
                for (let item of this.thisValue) {
                    if (item[group[i].key] == group[i].value)
                        group[i].data.push(item);
                }
            }
        },
        listWidthRefreshInit() {
            this.timer.width = setInterval(() => {
                let w = this.$el.clientWidth;
                if (this.multiSelection) w -= 50;
                if (this.showGroup) w -= 36;
                this.listWidth = w;
            }, 30);
        },
        watchWindowResizeInit() {
            window.addEventListener('resize', () => {
                this.windowResize.trigger = true;
            });
            this.timer.resize = setInterval(() => {
                let currentWidth = document.body.clientWidth;
                if (this.windowResize.trigger) {
                    if (this.windowResize.width == currentWidth) {
                        this.headInit();
                        this.widthFormat(0);
                        this.windowResize.trigger = false;
                    }
                }
                this.windowResize.width = currentWidth;
            }, 350);
        },
        lazyLoadInit() {
            this.$SUtility.ScrollToLoadInit(this.$refs.l1, () => {
                this.$emit('lazyload', this.thisValue);
            });
            this.$SUtility.ScrollToLoadInit(this.$refs.l2, () => {
                this.$emit('lazyload', this.thisValue);
            });
        },
        filterValue() {
            let filter = this.filter;
            if (typeof this.filter == 'string')
                filter = {
                    key: 'any',
                    value: this.filter
                };
            if (filter.key == undefined || filter.value == undefined) {
                console.warn(this.filter, 'Invalid filter.');
                return 0;
            }
            if (filter.key == 'any') {
                for (let i = 0; i < this.thisValue.length; i++) {
                    let status = false;
                    let item = this.thisValue[i];
                    for (let it in this.thisValue[i]) {
                        if (typeof item[it] != 'string') continue;
                        if (
                            item[it]
                                .toLowerCase()
                                .indexOf(filter.value.toLowerCase()) > -1
                        ) {
                            status = true;
                            break;
                        }
                    }
                    item.show = status;
                }
            } else {
                for (let i = 0; i < this.thisValue.length; i++) {
                    let item = this.thisValue[i];
                    let status =
                        this.thisValue[i][this.filter.key]
                            .toLowerCase()
                            .indexOf(filter.value.toLowerCase()) > -1;
                    item.show = status;
                }
            }
            this.$emit('change-value', this.thisValue);
        },
        resizeDown(event, index) {
            let item = this.thisHead[index];
            item.disX = event.clientX;
            this.thisHead[index] = item;
        },
        resizeMove(event, index) {
            for (let i = this.thisHead.length - 1; i >= 0; i--) {
                if (this.thisHead[i].visible) {
                    if (i === index) return;
                    break;
                }
            }
            let item = this.thisHead[index];
            let dis = event.clientX - item.disX;
            item.disX = event.clientX;
            let t = item.width + dis;
            t = t < item.minWidth ? item.minWidth : t;
            let sum = 0;
            for (let i = 0; i < index; i++) sum += this.thisHead[i].width;
            t = t > this.listWidth - sum ? this.listWidth - sum : t;
            item.width = t;
            this.thisHead[index] = item;
            this.widthFormat(index);
        },
        widthFormat(index) {
            if (index < this.thisHead.length - 1) {
                let sum = 0;
                for (let i = 0; i <= index; i++) {
                    if (!this.thisHead[i].visible) continue;
                    sum += this.thisHead[i].width;
                }
                let remain = this.listWidth - sum;
                let r = remain;
                let need = 0;
                for (let i = index + 1; i < this.thisHead.length; i++) {
                    if (!this.thisHead[i].visible) continue;
                    need += this.thisHead[i].width;
                }
                for (let i = this.thisHead.length - 1; i > index; i--) {
                    if (!this.thisHead[i].visible) continue;
                    let n = need - this.thisHead[i].width;
                    if (n + this.thisHead[i].minWidth <= remain) {
                        let item = this.thisHead[i];
                        item.width = remain - n;
                        item.show = true;
                        break;
                    } else {
                        let item = this.thisHead[i];
                        item.show = false;
                    }
                    need -= this.thisHead[i].width;
                }
            }
        },
        itemChooseClick(item) {
            let index = this.thisValue.indexOf(item);
            let t = item;
            t.choosen = !t.choosen;
            this.$emit('change-value', this.thisValue);
            this.$emit('choose-items', this.currentChoosen);
        },
        chooseCurrent(item) {
            for (let i = 0; i < this.thisValue.length; i++) {
                let t = this.thisValue[i];
                t.choosen = false;
            }
            item.choosen = true;
            this.$emit('change-value', this.thisValue);
            this.$emit('choose-items', this.currentChoosen);
        },
        chooseAll() {
            let status = !this.currentChoosenAll;
            for (let i = 0; i < this.thisValue.length; i++) {
                let t = this.thisValue[i];
                t.choosen = status;
            }
            this.$emit('change-value', this.thisValue);
            this.$emit('choose-items', this.currentChoosen);
        },
        isGroupChooseAll(group) {
            for (let i = 0; i < group.data.length; i++) {
                let t = group.data[i];
                if (!t.choosen) return false;
            }
            return true;
        },
        chooseGroup(group) {
            let status = !this.isGroupChooseAll(group);
            for (let i = 0; i < group.data.length; i++) {
                let t = group.data[i];
                t.choosen = status;
            }
            this.$emit('change-value', this.thisValue);
            this.$emit('choose-items', this.currentChoosen);
        },
        expandGroup(group) {
            let index = this.thisGroup.indexOf(group);
            let g = group;
            g.expand = !g.expand;
            this.thisGroup[index] = g;
        },
        expandAll() {
            let status = !this.currentExpandAll;
            for (let i = 0; i < this.thisGroup.length; i++) {
                let g = this.thisGroup[i];
                g.expand = status;
            }
        },
        rightClick(event, item) {
            if (!this.showRightMenu) return;
            event.preventDefault();
            event.stopPropagation();
            this.$refs.rightMenu.rightClick(event, this.$el);

            this.$emit('rightclick', item);
        },
        sortClick(item, reverse = true) {
            /* 当要取消升降切换时将reverse设为false */
            let desc = this.sort.desc;
            if (item.sortName == false) return 0;
            if (this.sort.name != item.sortName) desc = false;
            else desc = reverse ? !this.sort.desc : this.sort.desc;
            this.sort.name = item.sortName;
            this.sort.desc = desc;
            desc = desc ? -1 : 1;
            if (item.customSort != false)
                this.thisValue.sort((a, b) => desc * item.customSort(a, b));
            else this.inteliSort(item.sortName, desc);
        },
        inteliSort(key = 0, desc = false) {
            let sortFunc = this.sortName;
            let timeReg = [
                /^\d{4}[-/]\d{1,2}[-/]\d{1,2} \d{1,2}:\d{1,2}:\d{1,2}$/,
                /^\d{1,2}[-/]\d{1,2}[-/]\d{4} \d{1,2}:\d{1,2}:\d{1,2}$/,
                /^\d{4}[-/]\d{1,2}[-/]\d{1,2}/,
                /^\d{1,2}[-/]\d{1,2}[-/]\d{4}/
            ];
            let ex = this.thisValue[0][key];
            if (!isNaN(ex)) sortFunc = this.sortNum;
            else {
                for (let reg of timeReg) {
                    if (!ex.toString().match(reg) == false)
                        sortFunc = this.sortTime;
                }
            }
            this.thisValue.sort((a, b) => desc * sortFunc(a[key], b[key]));
        },
        sortNum(item1, item2) {
            return parseFloat(item1) < parseFloat(item2) ? 1 : -1;
        },
        sortName(item1, item2) {
            return item1.localeCompare(item2);
        },
        sortTime(item1, item2) {
            return this.$SDate.Compare(
                this.$SDate.Parse(item1),
                this.$SDate.Parse(item2)
            );
        },
        drag(event, item) {
            if (this.currentChoosenNum == 0) this.dragTransfer = item;
            else if (!item.choosen) {
                this.chooseCurrent(item);
                this.dragTransfer = item;
            } else this.dragTransfer = this.currentChoosen;
        },
        drop(item) {
            let target = this.dragTransfer;
            let current = item;
            let c_index = this.thisValue.indexOf(current);
            if (this.currentChoosenNum > 0 && target[0].choosen) {
                for (let i = target.length - 1; i >= 0; i--)
                    this.thisValue.splice(this.thisValue.indexOf(target[i]), 1);
                if (current.choosen) this.thisValue.splice(0, 0, ...target);
                else {
                    c_index = this.thisValue.indexOf(current);
                    this.thisValue.splice(c_index, 0, ...target);
                }
            } else {
                let t_index = this.thisValue.indexOf(target);
                this.thisValue.splice(t_index, 1);
                this.thisValue.splice(c_index, 0, target);
            }
            this.$emit('drop-items', {
                transfer: target,
                value: this.thisValue
            });
        },
        valueTrigger(val) {
            if (typeof val === 'function') return val();
            return val;
        }
    },
    beforeUnmount() {
        for (let item in this.timer) {
            clearInterval(this.timer[item]);
        }

        this.uR.revealMaskedJs.destroy(this.FR_Table_Head);
    }
};
</script>
