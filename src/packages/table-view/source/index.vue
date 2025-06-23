<template>
    <div class="fv-TableView" :class="[$theme]">
        <div class="fv-tableview-main-wrapper">
            <div
                class="fv-tableview-head-row"
                :style="{ width: sumWidth + 'px' }"
            >
                <div class="fv-tableview-head-item check-box">
                    <fv-check-box
                        :modelValue="currentChoosenAll"
                        :background="foreground"
                        :theme="$theme"
                        @click="chooseAll"
                    ></fv-check-box>
                </div>
                <component
                    :is="computedHeadComponent(item.type)"
                    v-show="item.visible"
                    :modelValue="item"
                    v-for="(item, index) in modelValue.heads"
                    :key="index"
                    :index="index"
                    :i18n="i18n"
                    :foreground="foreground"
                    :fixedLeftWidth="fixedLeftWidth[index]"
                    :fixedRightWidth="fixedRightWidth[index]"
                    :theme="$theme"
                    :dragItem="drag.columnItem"
                    draggable="true"
                    @duplicate-column="duplicateColumn"
                    @dragstart.native="handleColumnDrag($event, item)"
                    @dragend="drag.columnItem = null"
                    @drop-item="swapColumn($event.drag, item)"
                    @delete-column="thisDeleteColumn($event, index)"
                ></component>
                <div class="fv-tableview-head-item op-tools">
                    <i
                        class="ms-Icon ms-Icon--Add fv-tableview-icon-block fade"
                        @click="addMenuClick($event)"
                    ></i>
                    <i
                        class="ms-Icon ms-Icon--More fv-tableview-icon-block fade"
                        @click="addMenuClick($event, false)"
                    ></i>
                </div>
            </div>
            <table-row
                v-for="(row, i) in modelValue.rows"
                :key="i"
                :modelValue="modelValue"
                :row="row"
                :row_index="i"
                :i18n="i18n"
                :selectPos="selectPos"
                :foreground="foreground"
                :theme="$theme"
                :extensions="thisExtensions"
                :dragItem="drag.rowItem"
                :style="{ width: sumWidth + 'px' }"
                @update-drag-item="drag.rowItem = $event"
                @drop-item="swapRow($event.drag, row)"
                @add-row="addRow(i)"
                @set-select="setSelectPos"
                @rightclick="rowRightClick"
            >
            </table-row>
            <div
                class="fv-tableview-data-row newline"
                :style="{ width: sumWidth + 'px' }"
                @click="addRow()"
            >
                <i class="ms-Icon ms-Icon--Add"></i>
                <p class="new-line-title">{{ i18n('New Line') }}</p>
            </div>
        </div>
        <fv-right-menu
            ref="rightMenu"
            :theme="$theme"
            :rightMenuWidth="220"
            :background="rightMenuBackground"
            :fullExpandAnimation="true"
            style="z-index: 5"
        >
            <slot name="menu">
                <span @click="thisDeleteRows()">
                    <i class="ms-Icon ms-Icon--Delete"></i>
                    <p>{{ i18n('Delete') }}</p>
                </span>
                <span @click="duplicateRows()">
                    <i class="ms-Icon ms-Icon--Copy"></i>
                    <p>{{ i18n('Duplicate') }}</p>
                </span>
            </slot>
        </fv-right-menu>
        <fv-right-menu
            ref="addMenu"
            :theme="$theme"
            :rightMenuWidth="220"
            :background="rightMenuBackground"
            :fullExpandAnimation="true"
            style="z-index: 5"
        >
            <slot name="menu">
                <new-property
                    v-show="show.addMenu"
                    :extensions="thisExtensions"
                    :i18n="i18n"
                    :foreground="foreground"
                    :theme="$theme"
                    @add-column="addColumn"
                ></new-property>
                <current-property
                    v-show="show.editMenu"
                    :modelValue="modelValue"
                    :heads="modelValue.heads"
                    :extensions="thisExtensions"
                    :i18n="i18n"
                    :foreground="foreground"
                    :theme="$theme"
                    @add-click="
                        show.editMenu = false;
                        show.addMenu = true;
                    "
                ></current-property>
            </slot>
        </fv-right-menu>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { commonProps } from '@/packages/common/props';

const emits = defineEmits([
    'choose-items',
    'rightclick',
    'update:modelValue',
    'update:selectPos',
    'update:dragItem'
]);

const props = defineProps({
    ...commonProps,
    modelValue: {
        type: Object,
        default: () => ({})
    },
    i18n: {
        type: Function,
        default: (key) => key
    },
    foreground: {
        default: 'rgba(0, 90, 158, 1)'
    },
    deleteColumnFunc: {
        type: Function,
        default: null
    },
    deleteRowsFunc: {
        type: Function,
        default: null
    },
    copyTableFunc: {
        type: Function,
        default: null
    },
    pastedTableFunc: {
        type: Function,
        default: null
    },
    syncRowsFunc: {
        type: Function,
        default: null
    },
    rightMenuBackground: {
        default: ''
    },
    extensions: {
        default: () => []
    }
});
</script>

<script>
import { useTheme } from '@/utils/common';

import tableRow from './sub/tableRow.vue';
import newProperty from './sub/addMenu/newProperty.vue';
import currentProperty from './sub/addMenu/currentProperty.vue';
import textHead from '../../table-view-head-base/source/index.vue';
import textCell from '../../table-view-cell-base/source/index.vue';
import numberExtension from './sub/defaultExtensions/number';
import dateExtension from './sub/defaultExtensions/date';
import emailExtension from './sub/defaultExtensions/email';

export default {
    name: 'FvTableView',
    components: {
        tableRow,
        newProperty,
        currentProperty
    },
    data() {
        return {
            thisExtensions: [],
            selectPos: {
                active: false,
                syncActive: false,
                start_row: -1,
                start_col: -1,
                end_row: -1,
                end_col: -1
            },
            drag: {
                columnItem: null,
                rowItem: null
            },
            show: {
                addMenu: false,
                editMenu: true
            }
        };
    },
    computed: {
        sumWidth() {
            let count = 0;
            this.modelValue.heads.forEach((el) => {
                count += el.width;
            });
            return count + 30 + 60;
        },
        fixedLeftWidth() {
            let result = [];
            let count = 0;
            this.modelValue.heads.forEach((el) => {
                result.push(count);
                if (el.fixed && !el.fixedSide) count += el.width;
            });
            return result;
        },
        fixedRightWidth() {
            let result = [];
            let count = 0;
            this.modelValue.heads.forEach((el) => {
                result.push(count);
                if (el.fixed && el.fixedSide) count += el.width;
            });
            return result;
        },
        currentChoosen() {
            return this.modelValue.rows.filter((row) => row.choosen);
        },
        currentChoosenAll() {
            return this.currentChoosen.length === this.modelValue.rows.length;
        },
        currentChoosenNum() {
            return this.currentChoosen.length;
        },
        choosenBackground() {
            try {
                let color = one(this.foreground);
                color = color.alpha(0.1);
                let result = color.cssa();
                return result;
            } catch (e) {
                return '';
            }
        },
        computedHeadComponent() {
            return (type) => {
                let current = this.thisExtensions.find(
                    (it) => it.type === type
                );
                if (current) return current.headComponent;
                return null;
            };
        },
        $theme() {
            return useTheme(this.$props).theme.value;
        }
    },
    mounted() {
        this.eventInit();
        this.extensionsInit();
    },
    methods: {
        eventInit() {
            window.addEventListener('click', this.outSideClickEvent);
            window.addEventListener('mouseup', this.cellSelectReleaseEvent);
            window.addEventListener('touchend', this.cellSelectReleaseEvent);
            window.addEventListener('keydown', this.cellCopyEvent);
            window.addEventListener('keydown', this.cellPasteEvent);
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
            if (!_self) {
                this.selectPos.start_row = -1;
                this.selectPos.start_col = -1;
                this.selectPos.end_row = -1;
                this.selectPos.end_col = -1;
            }
        },
        cellSelectReleaseEvent() {
            if (this.selectPos.syncActive) {
                if (this.syncRowsFunc) this.syncRowsFunc(this.selectPos);
                else {
                    let start = this.selectPos.start_row;
                    let end = this.selectPos.end_row;
                    let col = this.selectPos.start_col;
                    let key = this.modelValue.heads[col].key;
                    let startValue = this.modelValue.rows[start][key];
                    if (start > end) {
                        let temp = start;
                        start = end;
                        end = temp;
                    }
                    for (let i = start; i <= end; i++) {
                        this.modelValue.rows[i][key] = startValue;
                    }
                }
            }
            this.selectPos.active = false;
            this.selectPos.syncActive = false;
        },
        cellCopyEvent(event) {
            if (event.keyCode === 67 && event.ctrlKey) {
                if (this.copyTableFunc) {
                    this.copyTableFunc(this.selectPos);
                }
            }
        },
        cellPasteEvent(event) {
            if (event.keyCode === 86 && event.ctrlKey) {
                if (this.pastedTableFunc) {
                    this.pastedTableFunc(this.selectPos);
                }
            }
        },
        extensionsInit() {
            let defaultText = {
                name: 'Text',
                type: 'text',
                icon: 'List',
                emoji: '📝',
                headComponent: textHead,
                cellComponent: textCell,
                filter: ({ input, value }) => {
                    if (!input) return true;
                    return (
                        value.toLowerCase().indexOf(input.toLowerCase()) !== -1
                    );
                },
                sortAsc: (a, b) => {
                    return a.localeCompare(b);
                },
                sortDesc: (a, b) => {
                    return b.localeCompare(a);
                }
            };
            this.thisExtensions = [
                defaultText,
                numberExtension,
                dateExtension,
                emailExtension,
                ...this.extensions
            ];
        },
        duplicateColumn(index) {
            let column = JSON.parse(
                JSON.stringify(this.modelValue.heads[index])
            );
            let ori = this.modelValue.heads[index];
            column.__guid = this.GuidWithoutDash();
            column.key = ori.key + column.__guid;
            column.name = ori.name + ' Copy';
            this.modelValue.heads.splice(index + 1, 0, column);
            this.modelValue.rows.forEach((row) => {
                row[column.key] = row[ori.key];
            });
        },
        swapColumn(from, to) {
            let fromIndex = this.modelValue.heads.findIndex(
                (item) => item.__guid === from.__guid
            );
            if (fromIndex === -1) return;
            let fromItem = this.modelValue.heads[fromIndex];
            this.modelValue.heads.splice(fromIndex, 1);
            let toIndex = this.modelValue.heads.findIndex(
                (item) => item.__guid === to.__guid
            );
            if (toIndex === -1) return;
            this.modelValue.heads.splice(toIndex, 0, fromItem);
        },
        duplicateRows() {
            let choosen = this.currentChoosen;
            if (choosen.length === 0) return;
            let lastIndex = this.currentChoosen[this.currentChoosen.length - 1];
            let result = [];
            choosen.forEach((row) => {
                let newRow = JSON.parse(JSON.stringify(row));
                newRow.__guid = this.GuidWithoutDash();
                result.push(newRow);
            });
            this.clearChooseAll();
            this.modelValue.rows.splice(
                this.modelValue.rows.indexOf(lastIndex) + 1,
                0,
                ...result
            );
        },
        addColumn(ext) {
            let column = {
                key: ext.name,
                name: ext.name,
                emoji: ext.emoji,
                type: ext.type
            };
            this.modelValue.heads.push(column);
        },
        addRow(index = null) {
            let row = {};
            this.modelValue.heads.forEach((head) => {
                row[head.key] = '';
            });
            if (index === null) {
                this.modelValue.rows.push(row);
            } else {
                this.modelValue.rows.splice(index + 1, 0, row);
            }
        },
        swapRow(from, to) {
            let fromIndex = this.modelValue.rows.findIndex(
                (item) => item === from
            );
            if (fromIndex === -1) return;
            let fromItem = this.modelValue.rows[fromIndex];
            this.modelValue.rows.splice(fromIndex, 1);
            let toIndex = this.modelValue.rows.findIndex((item) => item === to);
            if (toIndex === -1) return;
            this.modelValue.rows.splice(toIndex, 0, fromItem);
        },
        chooseAll() {
            let status = !this.currentChoosenAll;
            this.modelValue.rows.forEach((row) => {
                row.choosen = status;
            });
            this.$emit('choose-items', this.currentChoosen);
        },
        clearChooseAll(excpet = null) {
            this.modelValue.rows.forEach((row) => {
                if (excpet && row === excpet) return;
                this.row.choosen = false;
            });
        },
        setSelectPos(pos) {
            const { event_type, row_index, col_index } = pos;
            if (event_type === 'down') {
                this.selectPos.start_row = row_index;
                this.selectPos.start_col = col_index;
                this.selectPos.end_row = row_index;
                this.selectPos.end_col = col_index;
                this.selectPos.active = true;
            } else if (event_type === 'enter') {
                if (this.selectPos.active) {
                    this.selectPos.end_row = row_index;
                    if (!this.selectPos.syncActive)
                        this.selectPos.end_col = col_index;
                }
            } else if (event_type === 'sync-down') {
                this.selectPos.start_row = row_index;
                this.selectPos.start_col = col_index;
                this.selectPos.end_row = row_index;
                this.selectPos.end_col = col_index;
                this.selectPos.active = true;
                this.selectPos.syncActive = true;
            }
        },
        thisDeleteColumn(item, index) {
            if (this.deleteColumnFunc) this.deleteColumnFunc(item, index);
            else {
                this.modelValue.heads.splice(index, 1);
            }
        },
        thisDeleteRows() {
            if (this.deleteRowsFunc) this.deleteRowsFunc(this.currentChoosen);
            let choosen = this.currentChoosen;
            if (choosen.length === 0) return;
            choosen.forEach((row) => {
                this.modelValue.rows.splice(
                    this.modelValue.rows.indexOf(row),
                    1
                );
            });
        },
        handleColumnDrag(event, item) {
            event.stopPropagation();
            this.drag.columnItem = item;
        },
        rowRightClick(obj) {
            const { event, row, clearChoosenAll } = obj;
            event.preventDefault();
            event.stopPropagation();
            if (clearChoosenAll) this.clearChooseAll(row);
            this.$refs.rightMenu.rightClick(event, document.body);
            this.$emit('rightclick', row);
        },
        addMenuClick(event, mode = true) {
            event.preventDefault();
            event.stopPropagation();
            this.$refs.addMenu.rightClick(event, document.body);
            this.show.addMenu = mode;
            this.show.editMenu = !mode;
        },
        handleSort(type, desc = false) {
            let extension = this.thisExtensions.find((it) => it.type === type);
            if (!extension) return;
            if (!desc) {
                this.modelValue.sort(this.extension.sortAsc);
            } else this.modelValue.sort(this.extension.sortDesc);
        },
        GuidWithoutDash() {
            function S4() {
                return (((1 + Math.random()) * 0x10000) | 0)
                    .toString(16)
                    .substring(1);
            }
            return S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4();
        }
    },
    beforeUnmount() {
        window.removeEventListener('click', this.outSideClickEvent);
        window.removeEventListener('mouseup', this.cellSelectReleaseEvent);
        window.removeEventListener('touchend', this.cellSelectReleaseEvent);
        window.removeEventListener('keydown', this.cellCopyEvent);
        window.removeEventListener('keydown', this.cellPasteEvent);
    }
};
</script>
