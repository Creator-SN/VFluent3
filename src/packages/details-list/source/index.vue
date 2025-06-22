<script lang='ts' setup>
import { callFunction } from '@/utils/common';
import { detailsListEmits, detailsListProps, useDetailsList } from '.';
import { onBeforeUnmount, onMounted } from 'vue';
import spliter from './sub/spliter.vue';
import selector from './sub/selector.vue';

defineOptions({
    name: "FvDetailsList"
})

const props = defineProps(detailsListProps)
const emits = defineEmits(detailsListEmits)

const { theme, styles, chooseAll, currentChoosenAll, currentExpandAll, expandAll, thisHead, colWidth, sortClick, sort, resizeDown, resizeMove, thisValue, thisGroup, drag, drop, rightClick, itemChooseClick, chooseCurrent, isGroupChooseAll, chooseGroup, expandGroup, show, posX, posY, currentChoosenNum, headInit, valueInit, groupInit, lazyLoadInit, rightMenuClearInit, listWidthRefreshInit, watchWindowResizeInit, filterValue, FRInit, stylesInit, timer, uR, FRTableHead, root, l1, l2, rightMenu, listHead } = useDetailsList(props, emits)

onMounted(() => {
    headInit()
    valueInit()
    groupInit()
    lazyLoadInit()
    rightMenuClearInit()
    listWidthRefreshInit()
    watchWindowResizeInit()
    filterValue()
    FRInit()
    stylesInit()
})

onBeforeUnmount(() => {
    for (let item in timer.value) {
        clearInterval(timer.value[item as keyof typeof timer.value])
    }
    uR.revealMaskedJs.destroy(FRTableHead)
})

</script>

<template>
    <div ref="root" class="fv-DetailsList" :class="[theme]">
        <div class="fv-details-list-head" :class="{ 'fv-custom-head': true }" ref="listHead">
            <span v-show="multiSelection" class="fv-details-list-icon-block" :style="styles.listHead"
                @click="chooseAll">
                <selector v-model="currentChoosenAll" :color="foreground"></selector>
            </span>
            <span v-show="showGroup" class="col" style="width: 36px; padding: 0px;" :style="styles.listHead">
                <span class="expand" :class="{ choose: currentExpandAll }" @click="expandAll">
                    <i class="ms-Icon ms-Icon--ChevronRight"></i>
                </span>
            </span>
            <span v-show="item.show && callFunction(item.visible)" v-for="(item, index) in thisHead" class="col"
                :key="`head: ${index}`"
                :style="{ 'min-width': colWidth[index], width: colWidth[index], background: styles.listHead.background }">
                <span class="col-content" @click="sortClick(item)">
                    <slot name="head" :item="item" :index="index">
                        <p class="default-title">{{ callFunction(item.content) }}</p>
                    </slot>
                    <i v-show="item.sortName === sort.name" class="ms-Icon sort"
                        :class="[`ms-Icon--${sort.desc ? 'Down' : 'Up'}`]"></i>
                </span>
                <spliter style="height: 100%;" @mousedown="resizeDown($event, index)"
                    @mousemove="resizeMove($event, index)" @touchstart="resizeDown($event.targetTouches[0], index)"
                    @touchmove="resizeMove($event.targetTouches[0], index)"></spliter>
            </span>
        </div>
        <div v-if="!showGroup" class="fv-details-list-content" ref="l1"
            :class="{ compact: compact, 'auto-height': autoHeight }">
            <transition-group name="details-list" tag="div">
                <div v-show="item.show" v-for="(item, index) in thisValue" class="content-row" :key="`row: ${index}`"
                    :draggable="allowDrag" :class="[{ choose: item.choosen, 'fv-custom-row': true }, rowCss]"
                    @drag="drag($event, item)" @dragover="$event.preventDefault()" @drop="drop(item)"
                    @contextmenu="rightClick($event, item)">
                    <span v-show="multiSelection" class="fv-details-list-icon-block" key="multi-col"
                        @click="itemChooseClick(item)">
                        <selector v-model="item.choosen" :color="foreground"></selector>
                    </span>
                    <span v-show="col.show && callFunction(col.visible)" v-for="(col, idx) in thisHead" class="col"
                        :key="`row: ${index} col: ${idx}`" :style="{ width: colWidth[idx] }"
                        @click="chooseCurrent(item)">
                        <slot :name="`column_${idx}`" :item="item" :row_index="index" :col_index="idx">
                            <p>{{ `row: ${index} col: ${idx}` }}</p>
                        </slot>
                    </span>
                    <slot name="row_expand" :item="item" :row_index="index"></slot>
                </div>
            </transition-group>
        </div>
        <div v-if="showGroup" class="fv-details-list-content" ref="l2"
            :class="{ compact: compact, 'auto-height': autoHeight }">
            <div v-for="(gi, i) in thisGroup" :key="`group: ${i}`">
                <div class="content-row" :class="{ choose: isGroupChooseAll(gi), 'fv-custom-group-row': true }">
                    <slot name="group" :item="gi" :index="i" :isMulti="multiSelection" :isChoose="isGroupChooseAll(gi)">
                        <span v-show="multiSelection" class="fv-details-list-icon-block" key="multi-col"
                            @click="chooseGroup(gi)">
                            <selector :value="isGroupChooseAll(gi)" :color="foreground"></selector>
                        </span>
                        <span class="expand" :class="{ choose: gi.expand }" @click="expandGroup(gi)">
                            <i class="ms-Icon ms-Icon--ChevronRight"></i>
                        </span>
                        <slot name="group_content" :item="gi" :index="i" :isMulti="multiSelection"
                            :isChoose="isGroupChooseAll(gi)">
                            <span class="col" style="min-width: 150px;">
                                <p>{{ gi.name }}</p>
                            </span>
                        </slot>
                    </slot>
                </div>
                <transition name="zoom-in-top">
                    <div v-show="gi.expand">
                        <div v-show="item.show" v-for="(item, index) in gi.data" class="content-row"
                            :key="`group: ${i} row: ${index}`"
                            :class="[{ choose: item.choosen, 'fv-custom-row': true }, rowCss]"
                            @contextmenu="rightClick($event, item)">
                            <span v-show="multiSelection" class="fv-details-list-icon-block" key="multi-col">
                                <selector v-model="item.choosen" @click.native="itemChooseClick(item)"
                                    :color="foreground"></selector>
                            </span>
                            <span class="col" style="width: 36px;" @click="chooseCurrent(item)"></span>
                            <span v-show="col.show && callFunction(col.visible)" v-for="(col, idx) in thisHead"
                                class="col" :key="`group: ${i} row: ${index} col: ${idx}`"
                                :style="{ width: colWidth[idx] }" @click="chooseCurrent(item)">
                                <slot :name="`column_${idx}`" :item="item" :row_index="index" :col_index="idx">
                                    <p>{{ `row: ${index} col: ${idx}` }}</p>
                                </slot>
                            </span>
                            <slot name="row_expand" :item="item" :row_index="index"></slot>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
        <transition name="zoom-in-top">
            <div v-show="show.rightMenu" class="fv-rightMenu" ref="rightMenu"
                :style="{ left: posX + 'px', top: posY + 'px', width: rightMenuWidth + 'px' }">
                <slot name="menu">
                    <div>
                        <span>
                            <p>{{ currentChoosenNum }} Selected</p>
                        </span>
                    </div>
                </slot>
            </div>
        </transition>
    </div>
</template>
