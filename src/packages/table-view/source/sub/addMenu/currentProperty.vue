<template>
    <div class="fv-tableview-addmenu">
        <div class="addmenu-title-block">{{ i18n('Properties') }}</div>
        <div
            style="position: relative; padding: 0px 10px"
            @click="$event.stopPropagation()"
        >
            <fv-text-box
                v-model="filterValue"
                :placeholder="i18n('Search Property')"
                :theme="theme"
                underline
                icon="Filter"
                :background="theme === 'dark' ? 'rgba(0, 0, 0, 0.3)' : ''"
                border-color="rgba(120, 120, 120, 0.1)"
                :focus-border-color="foreground"
                :border-width="2"
                :is-box-shadow="true"
                style="width: 100%; height: 35px; margin-bottom: 5px"
            ></fv-text-box>
        </div>
        <span
            v-show="isShow(item)"
            v-for="(item, index) in heads"
            :key="index"
            :ref="`item-${index}`"
            @click="handleItemClick($event, item)"
            :draggable="dragDown"
            @dragover="dragOver($event, index)"
            @dragleave="dragLeave"
            @drop="dropItem($event, item)"
            @dragstart="handleRowDrag($event, item)"
            @dragend="handleDragEnd"
        >
            <i
                class="onDrop"
                :style="{ background: dropHead === item ? dropBackground : '' }"
            ></i>
            <div class="addmenu-left-block">
                <i
                    v-show="!filterValue && showDrag"
                    class="ms-Icon ms-Icon--GripperDotsVertical"
                    @mousedown="dragDown = true"
                ></i>
                <slot name="icon" :item="item">
                    <i
                        class="ms-Icon"
                        :class="[`ms-Icon--${computedIcon(item)}`]"
                        style="margin-left: 5px"
                    ></i>
                </slot>
                <p>{{ item.name }}</p>
            </div>
            <div v-if="showVisible" class="addmenu-right-block">
                <i
                    class="ms-Icon icon-block"
                    :class="[`ms-Icon--${item.visible ? 'View' : 'Hide'}`]"
                    @click="switchVisible(item)"
                ></i>
                <i class="ms-Icon ms-Icon--ChevronRight"></i>
            </div>
        </span>
        <hr v-show="showAdd" />
        <span
            v-show="showAdd"
            @click="
                $emit('add-click');
                $event.stopPropagation();
            "
        >
            <i class="ms-Icon ms-Icon--Add"></i>
            <p>{{ i18n('New Property') }}</p>
        </span>
    </div>
</template>

<script>
import one from 'onecolor';

export default {
    props: {
        heads: {
            type: Array,
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
        showAdd: {
            default: true
        },
        showDrag: {
            default: true
        },
        showVisible: {
            default: true
        },
        theme: {
            default: 'light'
        }
    },
    data() {
        return {
            filterValue: '',
            dropHead: null,
            dragDown: false,
            dragItem: null
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
        },
        isShow() {
            return (item) => {
                if (!this.filterValue) return true;
                return item.name
                    .toLowerCase()
                    .includes(this.filterValue.toLowerCase());
            };
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
            let item = this.heads[index];
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
            let dragIndex = this.heads.findIndex((it) => it === drag);
            let dragItem = this.heads[dragIndex];
            this.heads.splice(dragIndex, 1);
            let dropIndex = this.heads.findIndex((it) => it === drop);
            this.heads.splice(dropIndex, 0, dragItem);
        },
        switchVisible(item) {
            let visible = !item.visible;
            item.visible = visible;
        },
        handleItemClick($event, item) {
            $event.stopPropagation();
            this.$emit('item-click', item);
        }
    }
};
</script>
