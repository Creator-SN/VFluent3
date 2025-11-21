<template>
    <div
        v-if="modelValue.__guid"
        class="fv-tableview-head-item"
        :class="[{ onDrop: dropMode, fixed: modelValue.fixed }]"
        @dragstart="stopWrapper"
        @dragover="dragOver"
        @dragleave="dragLeave"
        @drop="dropItem"
        :style="{
            left:
                modelValue.fixed && !modelValue.fixedSide
                    ? fixedLeftWidth + 'px'
                    : '',
            right:
                modelValue.fixed && modelValue.fixedSide
                    ? fixedRightWidth + 'px'
                    : '',
            width: modelValue.width + 'px',
            'border-color': dropMode ? foreground : '',
            'z-index': show.edit ? 6 : ''
        }"
    >
        <div
            class="fv-tableview-head-content"
            @click="show.edit = true"
            @contextmenu="
                $event.preventDefault();
                show.edit = true;
            "
        >
            <slot>
                <p style="margin-left: 5px">{{ modelValue.emoji }}</p>
                <p style="margin-left: 5px">{{ modelValue.name }}</p>
            </slot>
        </div>
        <spliter
            style="height: 100%"
            @mousedown="resizeDown($event)"
            @mousemove="resizeMove($event)"
            @touchstart="resizeDown($event.targetTouches[0])"
            @touchmove="resizeMove($event.targetTouches[0])"
        ></spliter>
        <edit-wrapper
            v-model="show.edit"
            :el="() => $el"
            :wrapperWidth="wrapperWidth"
            :isUnder="isUnder"
            ref="edit_wrapper"
        >
            <slot name="entire" :modelValue="modelValue" :show="show.edit">
                <div
                    class="fv-tableview-default-edittool-row"
                    style="margin-top: 10px"
                >
                    <p class="fv-tableview-icon-block">
                        {{ modelValue.emoji }}
                    </p>
                    <fv-text-box
                        v-model="modelValue.name"
                        :placeholder="i18n('Column Name')"
                        :theme="theme"
                        underline
                        ref="text"
                        :background="
                            theme === 'dark' ? 'rgba(0, 0, 0, 0.3)' : ''
                        "
                        border-color="rgba(120, 120, 120, 0.1)"
                        :focus-border-color="foreground"
                        borderWidth="2"
                        is-box-shadow="true"
                        style="margin-left: 5px"
                    ></fv-text-box>
                </div>
                <div
                    class="fv-tableview-default-edittool-row lighter"
                    style="margin-top: 5px"
                    @click="switchEditKey"
                >
                    <i class="row-icon ms-Icon ms-Icon--Equalizer"></i>
                    <p class="row-title">
                        {{
                            show.editKey
                                ? i18n('Save Property Key')
                                : i18n('Edit Property Key')
                        }}
                    </p>
                </div>
                <div
                    v-show="show.editKey"
                    class="fv-tableview-default-edittool-row"
                    style="margin: 10px 0px"
                >
                    <fv-text-box
                        v-model="thisKeyValue"
                        :placeholder="
                            i18n('Key Name') +
                            ' ' +
                            i18n('(Press Enter to Confirm)')
                        "
                        ref="keyName"
                        left-icon="Link"
                        underline
                        :border-color="
                            !thisKeyValue
                                ? 'rgba(200, 38, 45, 1)'
                                : 'rgba(120, 120, 120, 0.1)'
                        "
                        :focus-border-color="
                            !thisKeyValue ? 'rgba(200, 38, 45, 1)' : foreground
                        "
                        :border-width="2"
                        :is-box-shadow="true"
                        style="width: 10px; height: 35px; flex: 1"
                        @keydown.enter="saveEditKey"
                    ></fv-text-box>
                </div>
                <slot name="menu"></slot>
                <hr />
                <div
                    class="fv-tableview-default-edittool-row lighter"
                    @click="
                        $emit('sort-asc', modelValue);
                        show.edit = false;
                    "
                >
                    <i class="row-icon ms-Icon ms-Icon--Ascending"></i>
                    <p class="row-title">{{ i18n('Sort Ascending') }}</p>
                </div>
                <div
                    class="fv-tableview-default-edittool-row lighter"
                    @click="
                        $emit('sort-desc', modelValue);
                        show.edit = false;
                    "
                >
                    <i class="row-icon ms-Icon ms-Icon--Descending"></i>
                    <p class="row-title">{{ i18n('Sort Descending') }}</p>
                </div>
                <div
                    class="fv-tableview-default-edittool-row lighter"
                    @click="
                        $emit('filter', modelValue);
                        show.edit = false;
                    "
                >
                    <i class="row-icon ms-Icon ms-Icon--Filter"></i>
                    <p class="row-title">{{ i18n('Filter') }}</p>
                </div>
                <hr />
                <div
                    class="fv-tableview-default-edittool-row lighter"
                    @click="switchHide"
                >
                    <i class="row-icon ms-Icon ms-Icon--Hide"></i>
                    <p class="row-title">{{ i18n('Hide in View') }}</p>
                </div>
                <div
                    class="fv-tableview-default-edittool-row lighter"
                    @click="switchFixed"
                >
                    <i
                        class="row-icon ms-Icon"
                        :class="[
                            `ms-Icon--${modelValue.fixed ? 'Unpin' : 'Pin'}`
                        ]"
                    ></i>
                    <p class="row-title">
                        {{
                            modelValue.fixed
                                ? i18n('Unfixed Column')
                                : i18n('Fixed Column')
                        }}
                    </p>
                </div>
                <div
                    v-show="modelValue.fixed"
                    class="fv-tableview-default-edittool-row"
                    style="margin-bottom: 10px"
                >
                    <p class="row-title">{{ i18n('Fixed Side') }}</p>
                    <fv-toggle-switch
                        v-model="modelValue.fixedSide"
                        :on="i18n('Right')"
                        :off="i18n('Left')"
                        :insideContent="true"
                        :switchOnBackground="foreground"
                        width="60"
                        style="margin-left: 15px"
                    ></fv-toggle-switch>
                </div>
                <div
                    class="fv-tableview-default-edittool-row lighter"
                    @click="
                        show.edit = false;
                        $emit('duplicate-column', index);
                    "
                >
                    <i class="row-icon ms-Icon ms-Icon--Copy"></i>
                    <p class="row-title">{{ i18n('Duplicate Column') }}</p>
                </div>
                <div
                    class="fv-tableview-default-edittool-row lighter"
                    @click="deleteColumn"
                >
                    <i class="row-icon ms-Icon ms-Icon--Delete"></i>
                    <p class="row-title">{{ i18n('Delete Column') }}</p>
                </div>
                <hr />
                <div
                    class="fv-tableview-default-edittool-row"
                    style="margin-bottom: 10px"
                >
                    <p class="row-title">{{ i18n('Wrap Column') }}</p>
                    <fv-toggle-switch
                        v-model="modelValue.wrap"
                        :on="i18n('Yes')"
                        :off="i18n('No')"
                        :insideContent="true"
                        :switchOnBackground="foreground"
                        width="60"
                        style="margin-left: 15px"
                    ></fv-toggle-switch>
                </div>
            </slot>
        </edit-wrapper>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { tableViewHeadProps } from './index.ts';

const emits = defineEmits([
    'show-edit',
    'delete-column',
    'duplicate-column',
    'drop-item',
    'sort-asc',
    'sort-desc',
    'filter'
]);

const props = defineProps(tableViewHeadProps);
</script>

<script>
import spliter from '../../table-view/source/sub/spliter.vue';
import editWrapper from '../../table-view/source/sub/editWrapper.vue';

export default {
    name: 'FvTableViewHeadBase',
    components: {
        spliter,
        editWrapper
    },
    data() {
        return {
            mouseDownPos: {
                disX: 0
            },
            dropMode: false,
            thisKeyValue: this.modelValue.key,
            show: {
                edit: false,
                editKey: false
            }
        };
    },
    watch: {
        modelValue() {
            this.formatHead();
            this.thisKeyValue = this.modelValue.key;
        },
        'show.edit'(val) {
            if (val) {
                this.$nextTick(() => {
                    if (this.$refs.text) this.$refs.text.focus();
                });
            }
            this.show.editKey = false;
            this.$emit('show-edit', val);
        }
    },
    mounted() {
        this.formatHead();
    },
    methods: {
        formatHead() {
            if (this.formatFunction) this.formatFunction(this.modelValue);
            else {
                let defaultHead = {
                    key: 'text',
                    name: '',
                    emoji: '📄',
                    type: 'text',
                    typeName: 'Text',
                    minWidth: 60,
                    width: 100,
                    fixed: false,
                    fixedSide: false,
                    wrap: false,
                    visible: true
                };
                for (let key in defaultHead) {
                    if (!this.modelValue[key])
                        this.modelValue[key] = defaultHead[key];
                }
                if (!this.modelValue.__guid)
                    this.modelValue.__guid = this.GuidWithoutDash();
            }
        },
        switchHide() {
            this.show.edit = false;
            let status = !this.modelValue.visible;
            this.modelValue.visible = status;
        },
        switchFixed() {
            this.show.edit = false;
            let status = !this.modelValue.fixed;
            this.modelValue.fixed = status;
        },
        deleteColumn() {
            this.show.edit = false;
            this.$emit('delete-column', this.modelValue);
        },
        resizeDown(event) {
            this.mouseDownPos.disX = event.clientX;
        },
        resizeMove(event) {
            let dis = event.clientX - this.mouseDownPos.disX;
            this.mouseDownPos.disX = event.clientX;
            let t = this.modelValue.width + dis;
            t = t < this.modelValue.minWidth ? this.modelValue.minWidth : t;
            this.modelValue.width = t;
        },
        stopWrapper(event) {
            if (this.show.edit) event.preventDefault();
        },
        dragOver(event) {
            event.preventDefault();
            event.stopPropagation();
            if (this.dragItem === this.modelValue) return;
            const { clientX } = event;
            const { left, width } = this.$el.getBoundingClientRect();
            if (clientX - left < width / 2) {
                this.dropMode = true;
            } else {
                this.dropMode = false;
            }
        },
        dragLeave(event) {
            event.preventDefault();
            event.stopPropagation();
            this.dropMode = false;
        },
        dropItem(event) {
            event.preventDefault();
            event.stopPropagation();
            if (this.dropMode && this.dragItem) {
                this.$emit('drop-item', {
                    drop: this.modelValue,
                    drag: this.dragItem
                });
            }
            this.dropMode = false;
        },
        switchEditKey() {
            if (this.show.editKey) {
                this.saveEditKey();
            } else {
                this.show.editKey = true;
                this.$nextTick(() => {
                    this.$refs.keyName.focus();
                });
            }
        },
        saveEditKey() {
            if (!this.thisKeyValue) return;
            this.modelValue.key = this.thisKeyValue;
            this.show.editKey = false;
        },
        GuidWithoutDash() {
            function S4() {
                return (((1 + Math.random()) * 0x10000) | 0)
                    .toString(16)
                    .substring(1);
            }
            return S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4();
        }
    }
};
</script>
