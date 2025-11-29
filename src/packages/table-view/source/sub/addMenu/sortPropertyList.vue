<template>
    <div class="fv-tableview-addmenu">
        <div class="addmenu-title-block">{{ i18n('Sort By') }}</div>
        <span
            v-for="(item, index) in modelValue"
            :key="index"
            :ref="`item-${index}`"
            style="height: 45px"
            @click="$event.stopPropagation()"
            :draggable="dragDown"
            @dragover="dragOver($event, index)"
            @dragleave="dragLeave"
            @drop="dropItem($event, item)"
            @dragstart="handleRowDrag($event, item)"
            @dragend="handleDragEnd"
        >
            <i
                class="onDrop"
                :style="{
                    background: dropHead === item ? dropBackground : ''
                }"
            ></i>
            <div class="addmenu-left-block">
                <i
                    class="ms-Icon ms-Icon--GripperDotsVertical"
                    @mousedown="dragDown = true"
                ></i>
                <fv-text-box
                    :model-value="item.head.name"
                    :border-radius="8"
                    icon="ChevronDown"
                    border-color="rgba(120, 120, 120, 0.1)"
                    font-size="12"
                    :reveal-border="true"
                    :is-box-shadow="true"
                    readonly
                    cursor="pointer"
                    style="width: 120px; height: 35px"
                    @click="showProperties($event, 'edit', item)"
                >
                    <template #left-icon>
                        <p style="width: 20px">{{ item.head.emoji }}</p>
                    </template>
                </fv-text-box>
                <fv-combobox
                    v-model="item.desc"
                    :options="sortOptions"
                    style="width: 80px"
                ></fv-combobox>
                <fv-button
                    class="no-margin"
                    :font-size="12"
                    :border-radius="8"
                    :is-box-shadow="true"
                    style="width: 35px; height: 35px"
                    @click="removeItem(index)"
                >
                    <i class="ms-Icon ms-Icon--Cancel"></i>
                </fv-button>
            </div>
            <div class="addmenu-right-block"></div>
        </span>
        <hr />
        <span @click="showProperties($event, 'add')">
            <i class="ms-Icon ms-Icon--Add"></i>
            <p>{{ i18n('New Property') }}</p>
        </span>
        <fv-right-menu
            v-model="show.add"
            ref="addMenu"
            :theme="theme"
            :rightMenuWidth="250"
            :background="rightMenuBackground"
            :fullExpandAnimation="true"
            style="z-index: 6"
        >
            <current-property
                :heads="sourceData.heads"
                :extensions="extensions"
                :i18n="i18n"
                :foreground="foreground"
                :showAdd="false"
                :showVisible="false"
                :showDrag="false"
                :theme="theme"
                @item-click="addSortHead"
            >
                <template #icon="{ item }">
                    <p style="width: 20px">{{ item.emoji }}</p>
                </template>
            </current-property>
        </fv-right-menu>
    </div>
</template>

<script>
import one from 'onecolor';
import currentProperty from './currentProperty.vue';

export default {
    components: {
        currentProperty
    },
    props: {
        modelValue: {
            type: Object,
            default: () => []
        },
        sourceData: {
            type: Object,
            default: () => []
        },
        extensions: {
            default: () => []
        },
        i18n: {
            type: Function,
            default: (key) => key
        },
        foreground: {
            default: 'rgba(0, 90, 158, 1)'
        },
        rightMenuBackground: {
            default: 'rgba(255, 255, 255, 1)'
        },
        theme: {
            default: 'light'
        }
    },
    data() {
        return {
            dropHead: null,
            dragDown: false,
            dragItem: null,
            sortOptions: [
                {
                    key: false,
                    text: this.i18n('Asc')
                },
                {
                    key: true,
                    text: this.i18n('Desc')
                }
            ],
            editMode: 'add',
            editItem: null,
            show: {
                add: false
            }
        };
    },
    computed: {
        computedProperty() {
            return (head) => {
                let current = this.extensions.find(
                    (it) => it.type === head.type
                );
                return current;
            };
        },
        computedIcon() {
            return (head) => {
                let current = this.extensions.find(
                    (it) => it.type === head.type
                );
                if (current) return current.icon;
                return 'Cancel';
            };
        },
        dropBackground() {
            try {
                let color = one(this.foreground);
                color = color.alpha(0.2);
                let result = color.cssa();
                return result;
            } catch (e) {
                return '';
            }
        }
    },
    methods: {
        handleRowDrag(event, item) {
            event.stopPropagation();
            this.dragItem = item;
        },
        handleDragEnd() {
            this.dragDown = false;
        },
        dragOver(event, index) {
            event.preventDefault();
            event.stopPropagation();
            let item = this.modelValue[index];
            let itemTarget = this.$refs[`item-${index}`][0];
            if (this.dragItem === item) return;
            const { clientY } = event;
            const { top, height } = itemTarget.getBoundingClientRect();
            if (clientY - top < height / 2) {
                this.dropHead = item;
            } else {
                this.dropHead = null;
            }
        },
        dragLeave(event) {
            event.preventDefault();
            event.stopPropagation();
            this.dropHead = null;
        },
        dropItem(event, item) {
            event.preventDefault();
            event.stopPropagation();
            this.sortHeads(item, this.dragItem);
            this.dropHead = null;
        },
        sortHeads(drop, drag) {
            let dragIndex = this.modelValue.findIndex((it) => it === drag);
            let dragItem = this.modelValue[dragIndex];
            this.modelValue.splice(dragIndex, 1);
            let dropIndex = this.modelValue.findIndex((it) => it === drop);
            this.modelValue.splice(dropIndex, 0, dragItem);
        },
        showProperties(event, mode, item = null) {
            event.preventDefault();
            event.stopPropagation();
            this.editMode = mode;
            this.editItem = item;
            this.$refs.addMenu.rightClick(event, document.body);
        },
        addSortHead(item) {
            if (this.editMode === 'add') {
                let findIndex = this.modelValue.findIndex(
                    (it) => it.head === item
                );
                if (findIndex !== -1) {
                    this.modelValue.splice(findIndex, 1);
                }
                let index =
                    findIndex === -1 ? this.modelValue.length : findIndex;
                this.modelValue.splice(index, 0, {
                    head: item,
                    desc: { key: false, text: this.i18n('Asc') }
                });
            } else {
                this.editItem.head = item;
            }
            this.show.add = false;
        },
        removeItem(index) {
            this.modelValue.splice(index, 1);
        }
    }
};
</script>
