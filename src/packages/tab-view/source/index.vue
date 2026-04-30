<template>
    <div
        class="fv-TabView"
        :class="[$theme, { disabled: isDisabled }]"
        :style="{
            padding: padding,
            background: background,
            borderRadius: formatSize(borderRadius),
            '--tab-view-hover-background': hoverBackground || '',
            '--tab-view-active-background': activeBackground || ''
        }"
    >
        <div class="tab-view-wrapper">
            <div class="tab-view-container">
                <div class="tab-view-list">
                    <div
                        v-show="valueTrigger(item.show)"
                        class="tab-view-item"
                        v-for="(item, index) in thisItems"
                        :key="item._tabViewKey"
                        :class="{
                            choose: eqal(item),
                            disabled: valueTrigger(item.disabled),
                            dragging: isDragging(item),
                            'drop-before': isDropPosition(item, 'before'),
                            'drop-after': isDropPosition(item, 'after')
                        }"
                        :style="{
                            width: formatSize(itemWidth),
                            minWidth: formatSize(itemWidth),
                            maxWidth: formatSize(itemWidth),
                            height: formatSize(itemHeight),
                            color: eqal(item)
                                ? choosenForeground || ''
                                : foreground || '',
                            background: eqal(item)
                                ? chooseBackground || ''
                                : ''
                        }"
                        :draggable="tabDraggable(item)"
                        @click="itemClick(item)"
                        @dragstart="handleDragStart($event, index, item)"
                        @dragover="handleDragOver($event, index, item)"
                        @drop="handleDrop($event, index, item)"
                        @dragend="clearDragState"
                    >
                        <slot
                            name="item"
                            :item="item"
                            :index="index"
                            :eqal="eqal"
                            :valueTrigger="valueTrigger"
                        >
                            <img
                                v-if="itemImage(item)"
                                class="tab-view-item-icon tab-view-item-image"
                                :src="itemImage(item)"
                                :alt="itemTitle(item)"
                                :style="{
                                    borderRadius: formatSize(imgBorderRadius)
                                }"
                                draggable="false"
                            />
                            <i
                                v-else-if="valueTrigger(item.icon)"
                                class="ms-Icon tab-view-item-icon"
                                :class="`ms-Icon--${valueTrigger(item.icon)}`"
                                :style="{ fontSize: '16px' }"
                            ></i>
                            <p
                                class="tab-view-item-title"
                                :style="{ fontSize: formatSize(fontSize) }"
                            >
                                {{ itemTitle(item) }}
                            </p>
                        </slot>
                        <div
                            v-if="tabClosable(item)"
                            class="tab-view-item-close"
                            :style="{ color: closeButtonForeground || '' }"
                            @click.stop="closeItem($event, index, item)"
                        >
                            <slot
                                name="close-button"
                                :item="item"
                                :index="index"
                            >
                                <i
                                    class="ms-Icon"
                                    :class="`ms-Icon--${closeButtonIcon}`"
                                    :style="{
                                        fontSize: formatSize(closeIconSize)
                                    }"
                                ></i>
                            </slot>
                        </div>
                    </div>
                </div>
            </div>
            <div
                v-if="showAddButton"
                class="tab-view-add-button"
                :class="{ disabled: isDisabled }"
                :style="{
                    width: formatSize(itemHeight),
                    minWidth: formatSize(itemHeight),
                    height: formatSize(itemHeight),
                    color: addButtonForeground || '',
                    background: addButtonBackground || ''
                }"
                @click="addClick"
            >
                <slot name="add-button">
                    <i
                        class="ms-Icon"
                        :class="`ms-Icon--${addButtonIcon}`"
                        :style="{ fontSize: '16px' }"
                    ></i>
                </slot>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { commonProps } from '@/packages/common/props';

const emits = defineEmits([
    'update:modelValue',
    'update:items',
    'change',
    'add',
    'reorder',
    'close'
]);

const props = defineProps({
    ...commonProps,
    modelValue: {
        default: () => {
            return null;
        }
    },
    items: {
        default: () => [{ name: 'Tab' }]
    },
    itemWidth: {
        default: 180
    },
    itemHeight: {
        default: 38
    },
    padding: {
        default: ''
    },
    borderRadius: {
        default: 8
    },
    foreground: {
        default: ''
    },
    choosenForeground: {
        default: ''
    },
    chooseBackground: {
        default: ''
    },
    background: {
        default: ''
    },
    hoverBackground: {
        default: ''
    },
    activeBackground: {
        default: ''
    },
    fontSize: {
        default: 13
    },
    imgBorderRadius: {
        default: 4
    },
    draggable: {
        default: true
    },
    closable: {
        default: true
    },
    showAddButton: {
        default: false
    },
    addButtonIcon: {
        default: 'Add'
    },
    addButtonBackground: {
        default: ''
    },
    addButtonForeground: {
        default: ''
    },
    closeButtonIcon: {
        default: 'ChromeClose'
    },
    closeIconSize: {
        default: 10
    },
    closeButtonForeground: {
        default: ''
    }
});
</script>

<script>
import { useTheme } from '@/utils/common';

export default {
    name: 'FvTabView',

    data() {
        return {
            thisItems: [],
            thisValue: null,
            itemKeySeed: 0,
            dragState: {
                dragKey: null,
                dragIndex: -1,
                dropKey: null,
                dropPosition: 'after'
            }
        };
    },
    watch: {
        modelValue() {
            this.findCurrentValue();
        },
        items() {
            this.itemsInit();
        },
        thisValue(val) {
            this.$emit('update:modelValue', this.publicItem(val));
            this.$emit('change', this.publicItem(val));
        }
    },
    computed: {
        isDisabled() {
            return (
                this.disabled.toString() == 'true' ||
                this.disabled == 'disabled' ||
                this.disabled === ''
            );
        },
        $theme() {
            return useTheme(this.$props).theme.value;
        }
    },
    mounted() {
        this.itemsInit();
        this.defaultItemInit();
    },
    methods: {
        itemsInit() {
            let model = {
                name: 'Tab',
                title: '',
                show: true,
                disabled: false,
                draggable: true,
                closable: true,
                icon: '',
                img: ''
            };
            let items = [];
            for (let item of this.items) {
                let m = Object.assign({}, model, item);
                m._tabViewKey = this.generateItemKey(m);
                items.push(m);
            }
            this.thisItems = items;
            this.findCurrentValue();
            this.defaultItemInit();
        },
        generateItemKey(item) {
            this.itemKeySeed += 1;
            if (item.key !== undefined && item.key !== null) {
                return `key_${item.key}`;
            }
            return `tab_${this.itemKeySeed}`;
        },
        findCurrentValue() {
            if (!this.modelValue) {
                this.defaultItemInit();
                return;
            }
            let match = this.thisItems.find((item) =>
                this.sameItem(item, this.modelValue)
            );
            if (match) this.thisValue = match;
        },
        defaultItemInit() {
            if (
                this.thisValue &&
                this.valueTrigger(this.thisValue.show) &&
                !this.valueTrigger(this.thisValue.disabled)
            ) {
                return;
            }
            let defaultItem = this.thisItems.find(
                (item) =>
                    this.valueTrigger(item.show) &&
                    !this.valueTrigger(item.disabled)
            );
            if (defaultItem) this.thisValue = defaultItem;
        },
        sameItem(a, b) {
            if (!a || !b) return false;
            if (a.key !== undefined && b.key !== undefined) {
                return a.key === b.key;
            }
            return this.itemTitle(a) === this.itemTitle(b);
        },
        itemClick(item) {
            if (
                this.isDisabled ||
                !this.valueTrigger(item.show) ||
                this.valueTrigger(item.disabled)
            ) {
                return;
            }
            this.thisValue = item;
        },
        tabDraggable(item) {
            return (
                this.draggable &&
                !this.isDisabled &&
                !this.valueTrigger(item.disabled) &&
                this.valueTrigger(item.draggable) !== false
            );
        },
        tabClosable(item) {
            return (
                this.closable &&
                !this.isDisabled &&
                this.valueTrigger(item.disabled) !== true &&
                this.valueTrigger(item.closable) !== false
            );
        },
        handleDragStart(event, index, item) {
            if (!this.tabDraggable(item)) {
                event.preventDefault();
                return;
            }
            this.dragState.dragKey = item._tabViewKey;
            this.dragState.dragIndex = index;
            if (event.dataTransfer) {
                event.dataTransfer.effectAllowed = 'move';
                event.dataTransfer.setData('text/plain', item._tabViewKey);
            }
        },
        handleDragOver(event, index, item) {
            if (!this.canDrop(index, item)) return;
            event.preventDefault();
            event.stopPropagation();
            this.dragState.dropKey = item._tabViewKey;
            this.dragState.dropPosition = this.computeDropPosition(event);
            if (event.dataTransfer) {
                event.dataTransfer.dropEffect = 'move';
            }
        },
        handleDrop(event, index, item) {
            if (!this.canDrop(index, item)) return;
            event.preventDefault();
            event.stopPropagation();
            let dropPosition = this.computeDropPosition(event);
            this.reorderItems(index, dropPosition);
            this.clearDragState();
        },
        canDrop(index, item) {
            if (this.dragState.dragIndex < 0) return false;
            if (!this.valueTrigger(item.show)) return false;
            if (this.valueTrigger(item.disabled)) return false;
            return true;
        },
        computeDropPosition(event) {
            const { left, width } = event.currentTarget.getBoundingClientRect();
            if (event.clientX - left < width / 2) {
                return 'before';
            }
            return 'after';
        },
        reorderItems(targetIndex, dropPosition) {
            let items = [...this.thisItems];
            let from = this.dragState.dragIndex;
            let to = dropPosition === 'after' ? targetIndex + 1 : targetIndex;
            let [dragItem] = items.splice(from, 1);
            if (!dragItem) return;
            if (from < to) to -= 1;
            if (from === to) return;
            items.splice(to, 0, dragItem);
            this.thisItems = items;
            let current = items.find(
                (item) =>
                    this.thisValue &&
                    item._tabViewKey === this.thisValue._tabViewKey
            );
            if (current) this.thisValue = current;
            let result = this.publicItems(items);
            this.$emit('update:items', result);
            this.$emit('reorder', {
                item: this.publicItem(dragItem),
                items: result,
                from,
                to
            });
        },
        addClick(event) {
            if (this.isDisabled) return;
            this.$emit('add', event);
        },
        closeItem(event, index, item) {
            if (!this.tabClosable(item)) return;
            let items = [...this.thisItems];
            let [removedItem] = items.splice(index, 1);
            if (!removedItem) return;
            this.thisItems = items;
            if (this.thisValue && this.sameItem(this.thisValue, removedItem)) {
                this.thisValue =
                    items[index] ||
                    items[index - 1] ||
                    items.find(
                        (it) =>
                            this.valueTrigger(it.show) &&
                            !this.valueTrigger(it.disabled)
                    ) ||
                    null;
            }
            let result = this.publicItems(items);
            this.$emit('update:items', result);
            this.$emit('close', {
                event,
                item: this.publicItem(removedItem),
                items: result,
                index
            });
        },
        isDragging(item) {
            return this.dragState.dragKey === item._tabViewKey;
        },
        isDropPosition(item, position) {
            return (
                this.dragState.dropKey === item._tabViewKey &&
                this.dragState.dropPosition === position &&
                this.dragState.dragKey !== item._tabViewKey
            );
        },
        itemImage(item) {
            let img = item.img || item.image || item.src;
            if (img) return this.valueTrigger(img);
            let icon = this.valueTrigger(item.icon);
            if (icon && this.isURL(icon)) return icon;
            return '';
        },
        itemTitle(item) {
            if (!item) return '';
            let title = item.title;
            if (
                title === undefined ||
                title === null ||
                this.valueTrigger(title) === ''
            ) {
                title = item.name;
            }
            return this.valueTrigger(title);
        },
        isURL(url) {
            if (!url || typeof url !== 'string') return false;
            if (
                url.startsWith('http') ||
                url.startsWith('.') ||
                url.startsWith('/') ||
                url.startsWith('data:image')
            ) {
                return true;
            }
            return false;
        },
        publicItem(item) {
            if (!item) return item;
            let result = Object.assign({}, item);
            delete result._tabViewKey;
            return result;
        },
        publicItems(items = []) {
            return items.map((item) => this.publicItem(item));
        },
        eqal(item) {
            return this.sameItem(item, this.thisValue);
        },
        valueTrigger(val) {
            if (typeof val === 'function') return val();
            return val;
        },
        formatSize(value) {
            if (value === '' || value === null || value === undefined) {
                return '';
            }
            if (parseFloat(value).toString() === 'NaN') {
                return value;
            }
            if (isNaN(value)) {
                return value;
            }
            return `${value}px`;
        },
        clearDragState() {
            this.dragState.dragKey = null;
            this.dragState.dragIndex = -1;
            this.dragState.dropKey = null;
            this.dragState.dropPosition = 'after';
        }
    },
    beforeUnmount() {
        this.clearDragState();
    }
};
</script>
