<template>
    <div
        class="fv-TreeView"
        :class="[$theme]"
    >
        <tree-view-item
            v-for="(item, index) in thisValue"
            :key="`parent: root, self: ${index}`"
            :modelValue="item"
            :parent="null"
            :kIndex="index"
            :deep="0"
            :space="space"
            :draggable="draggable"
            :checkable="checkable"
            :expandClickMode="expandClickMode"
            :foreground="foreground"
            :expandedIcon="expandedIcon"
            :unexpandedIcon="unexpandedIcon"
            :backgroundColorHover="backgroundColorHover"
            :backgroundColorActive="backgroundColorActive"
            :itemHeight="itemHeight"
            :expandedIconPosition="expandedIconPosition"
            :showLoading="showLoading"
            :dragItem="dragItem"
            :theme="$theme"
            @require-render="pushRender"
            @selected-change="clearSelected"
            @set-drag-item="dragItem = $event"
            @drop-item="$emit('drop-item', {root: thisValue, ...$event})"
            @handle-click="$emit('click', $event)"
            @item-drag-over="$emit('item-drag-over', {root: thisValue, ...$event})"
            @item-drag-leave="$emit('item-drag-leave', {root: thisValue, ...$event})"
            @item-drop="$emit('item-drop', {root: thisValue, ...$event})"
        >
            <template v-slot:default="x">
                <slot
                    :item="x.item"
                    :deep="x.deep"
                ></slot>
            </template>
        </tree-view-item>
    </div>
</template>
        
<script>
import { treeViewProps } from '.';
import { ClassBuilder, StyleBuilder, useTheme } from '@/utils/common';
import TreeViewItem from './sub/TreeViewItem.vue';

export default {
    name: 'FvTreeView',
    components: {
        TreeViewItem
    },
    emits: [
        'click',
        'drop-item',
        'item-drag-over',
        'item-drag-leave',
        'item-drop'
    ],
    props: {
        ...treeViewProps,
        modelValue: {
            type: Array,
            default: () => []
        },
        space: {
            default: 20
        },
        draggable: {
            default: false
        },
        checkable: {
            default: false
        },
        expandedIcon: {
            default: 'ChevronDownSmall'
        },
        unexpandedIcon: {
            default: 'ChevronRightSmall'
        },
        foreground: {
            default: 'rgba(0, 90, 158, 1)'
        },
        backgroundColorHover: {
            default: ''
        },
        backgroundColorActive: {
            default: ''
        },
        expandClickMode: {
            default: 'normal'
        },
        expandedIconPosition: {
            default: 'left'
        },
        itemHeight: {
            default: 30
        },
        showLoading: {
            default: false
        }
    },
    data() {
        return {
            thisValue: this.modelValue,
            dragItem: {
                item: null,
                parent: null
            },
            queueFunction: [],
            lock: {
                isQueueRunning: true
            }
        };
    },
    watch: {
        modelValue() {
            this.thisValue = this.value;
        },
        async 'queueFunction.length'() {
            if (this.queueFunction.length === 0) return;
            if (!this.lock.isQueueRunning) return;
            this.lock.isQueueRunning = false;
            while (this.queueFunction.length > 0) {
                let func = this.queueFunction.shift();
                try {
                    await func();
                } catch (e) {
                    console.log(e);
                }
            }
            this.lock.isQueueRunning = true;
        }
    },
    computed: {
        $theme() {
            return useTheme(this.$props).theme.value;
        }
    },
    methods: {
        clearSelected(target) {
            let children = this.thisValue;
            for (let i = 0; i < children.length; i++) {
                let item = children[i];
                if (item !== target) {
                    item.selected = false;
                }
                if (item.children) {
                    children = children.concat(item.children);
                }
            }
        },
        pushRender(item) {
            this.queueFunction.push(item);
        }
    }
};
</script>

