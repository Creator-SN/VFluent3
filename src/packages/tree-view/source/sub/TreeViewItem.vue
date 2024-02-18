<template>
    <div
        v-if="isRender"
        v-show="valueTrigger(modelValue.show) !== false"
        class="fv-tree-view-item"
        :draggable="draggable"
        @dragstart="handleDrag"
        @dragend="dragMode = false"
    >
        <div
            class="fv-tree-view-item-container"
            :class="[{selected: modelValue.selected, disabled: valueTrigger(modelValue.disabled)}]"
            ref="item"
            :style="{height: `${itemHeight}px`, 'background-color': dropMode === 'enter' ? dropBackgroundColor : backgroundColor, 'border-top': dropMode === 'before' ? `${itemHeight}px solid transparent` : ''}"
            @dragover="dragOver"
            @dragleave="dragLeave"
            @drop="dropItem"
            @click="expandClick('normal', $event)"
            @mouseenter="switchCSSMode('hover')"
            @mouseleave="switchCSSMode('normal')"
            @mousedown="switchCSSMode('active')"
            @mouseup="switchCSSMode('hover')"
            @touchstart="switchCSSMode('active')"
            @touchend="switchCSSMode('normal')"
        >
            <i
                v-show="modelValue.selected && !checkable"
                class="fv-tree-view-item-choosen-bar"
                :style="{background: foreground}"
            ></i>
            <fv-check-box
                v-show="checkable"
                v-model="modelValue.selected"
                :theme="theme"
                :background="foreground"
                ref="check"
                style="margin-right: 10px;"
                @click="changeChildren"
            ></fv-check-box>
            <div
                class="fv-tree-view-item-container-main"
                :style="{'padding-left': `${deep * space}px`}"
            >
                <div
                    v-if="expandedIconPosition === 'left'"
                    class="fv-tree-view-item-expander"
                    style="margin-right: 10px;"
                >
                    <i
                        v-if="!valueTrigger(modelValue.loading) || !showLoading"
                        v-show="modelValue.children"
                        class="ms-Icon fv-tree-view-item-expander-icon"
                        :class="[`ms-Icon--${modelValue.expanded ? expandedIcon : unexpandedIcon}`]"
                        ref="expander"
                        @click="expandClick('icon', $event)"
                    ></i>
                    <fv-progress-ring
                        v-else
                        :loading="true"
                        :r="10"
                        borderWidth="2"
                        :color="foreground"
                        :background="'transparent'"
                    ></fv-progress-ring>
                </div>
                <div class="fv-tree-view-item-content">
                    <slot
                        :item="modelValue"
                        :deep="deep"
                    >
                        <i
                            v-show="modelValue.icon && !isURL(valueTrigger(modelValue.icon))"
                            class="ms-Icon fv-tree-view-item-std-icon"
                            :class="`ms-Icon--${valueTrigger(modelValue.icon)}`"
                        ></i>
                        <img
                            v-if="modelValue.icon && isURL(valueTrigger(modelValue.icon))"
                            class="fv-tree-view-item-std-icon"
                            :src="valueTrigger(modelValue.icon)"
                        />
                        <p
                            class="fv-tree-view-item-text"
                            :style="{'margin-left': modelValue.icon ? '10px' : ''}"
                        >{{valueTrigger(modelValue.label)}}</p>
                    </slot>
                </div>
                <div
                    v-if="expandedIconPosition === 'right'"
                    class="fv-tree-view-item-expander"
                >
                    <i
                        v-if="!valueTrigger(modelValue.loading) || !showLoading"
                        v-show="modelValue.children"
                        class="ms-Icon fv-tree-view-item-expander-icon"
                        :class="[`ms-Icon--${modelValue.expanded ? expandedIcon : unexpandedIcon}`]"
                        ref="expander"
                        @click="expandClick('icon', $event)"
                    ></i>
                    <fv-progress-ring
                        v-else
                        :loading="true"
                        :r="10"
                        borderWidth="2"
                        :color="foreground"
                        :background="'transparent'"
                    ></fv-progress-ring>
                </div>
            </div>
        </div>
        <transition name="fv-tree-view-children-list">
            <div
                v-if="modelValue.children"
                v-show="modelValue.expanded"
                class="fv-tree-view-item-children"
            >
                <tree-view-item
                    v-for="(item, index) in modelValue.children"
                    :key="`parent: ${kIndex}, self: ${index}`"
                    :modelValue="item"
                    :parent="modelValue"
                    :kIndex="index"
                    :deep="deep + 1"
                    :space="space"
                    :expandClickMode="expandClickMode"
                    :draggable="draggable"
                    :checkable="checkable"
                    :foreground="foreground"
                    :expandedIcon="expandedIcon"
                    :unexpandedIcon="unexpandedIcon"
                    :backgroundColorHover="backgroundColorHover"
                    :backgroundColorActive="backgroundColorActive"
                    :itemHeight="itemHeight"
                    :expandedIconPosition="expandedIconPosition"
                    :showLoading="showLoading"
                    :dragItem="dragItem"
                    :theme="theme"
                    @require-render="$emit('require-render', $event)"
                    @selected-change="$emit('selected-change', $event)"
                    @set-drag-item="$emit('set-drag-item', $event)"
                    @drop-item="$emit('drop-item', $event)"
                    @handle-click="$emit('handle-click', $event)"
                    @item-drag-over="$emit('item-drag-over', $event)"
                    @item-drag-leave="$emit('item-drag-leave', $event)"
                    @item-drop="$emit('item-drop', $event)"
                >
                    <template v-slot:default="x">
                        <slot
                            :item="x.item"
                            :deep="x.deep"
                        ></slot>
                    </template>
                </tree-view-item>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'TreeViewItem',
    emits: [
        'require-render',
        'selected-change',
        'set-drag-item',
        'drop-item',
        'handle-click',
        'item-drag-over',
        'item-drag-leave',
        'item-drop'
    ],
    props: {
        modelValue: {
            type: Object,
            default: () => ({})
        },
        parent: {
            type: Object,
            default: () => ({})
        },
        kIndex: {
            default: 0
        },
        deep: {
            default: 0
        },
        space: {
            default: 20
        },
        expandClickMode: {
            default: 'icon'
        },
        backgroundColorHover: {
            default: ''
        },
        backgroundColorActive: {
            default: ''
        },
        foreground: {
            default: 'rgba(0, 90, 158, 1)'
        },
        dropBackgroundColor: {
            default: 'rgba(0, 90, 158, 0.1)'
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
        itemHeight: {
            default: 30
        },
        showLoading: {
            default: false
        },
        expandedIconPosition: {
            default: 'left'
        },
        dragItem: {
            default: () => ({
                item: null,
                parent: null
            })
        },
        theme: {
            type: String,
            default: 'system'
        }
    },
    data() {
        return {
            isRender: false,
            cssMode: 'normal',
            dropMode: 'none',
            dragMode: false,
            timer: {
                drop: null,
                delayExpand: null,
                requireRender: null
            }
        };
    },
    watch: {},
    computed: {
        backgroundColor() {
            if (this.cssMode === 'hover') {
                return this.backgroundColorHover;
            } else if (this.cssMode === 'active') {
                return this.backgroundColorActive;
            }
            return '';
        }
    },
    mounted() {
        this.requireRenderInit();
    },
    methods: {
        requireRenderInit() {
            clearInterval(this.timer.requireRender);
            this.timer.requireRender = setInterval(() => {
                if (this.isRender) {
                    clearInterval(this.timer.requireRender);
                    return;
                }
                if (!this.parent || this.parent.expanded) {
                    this.$emit('require-render', async () => {
                        this.isRender = true;
                        while (!this.$el.style) {
                            await new Promise((resolve) => {
                                setTimeout(() => {
                                    resolve(1);
                                }, 30);
                            });
                        }
                    });
                    clearInterval(this.timer.requireRender);
                }
            }, 100);
        },
        expandClick(mode = 'icon', event) {
            if (this.valueTrigger(this.modelValue.disabled)) return;
            let x = event.target;
            let _self = false;
            while (x && x.tagName && x.tagName.toLowerCase() != 'body') {
                if (x === this.$refs.expander || x === this.$refs.check.$el) {
                    _self = true;
                    break;
                }
                x = x.parentNode;
            }
            if (!_self) {
                this.$emit('selected-change', this.modelValue);
                this.modelValue.selected = true;
                this.$emit('handle-click', this.modelValue);
            }
            x = event.target;
            if (mode === 'icon' && this.expandClickMode === 'icon') {
                event.stopPropagation();
                if (x === this.$refs.expander)
                    this.modelValue.expanded = !this.modelValue.expanded;
            } else if (mode === 'normal' && this.expandClickMode === 'normal') {
                _self = false;
                while (x && x.tagName && x.tagName.toLowerCase() != 'body') {
                    if (x === this.$refs.check.$el) {
                        _self = true;
                        break;
                    }
                    x = x.parentNode;
                }
                if (!_self)
                    this.modelValue.expanded = !this.modelValue.expanded;
            }
        },
        switchCSSMode(mode) {
            if (this.valueTrigger(this.modelValue.disabled)) return;
            this.cssMode = mode;
        },
        handleDrag(event) {
            event.stopPropagation();
            this.modelValue.expanded = false;
            console.log('expanded');
            this.$emit('set-drag-item', {
                item: this.modelValue,
                parent: this.parent
            });
            this.dragMode = true;
        },
        isURL(url) {
            if (
                url.startsWith('http') ||
                url.startsWith('.') ||
                url.startsWith('/')
            ) {
                return true;
            }
            return false;
        },
        changeChildren(val) {
            if (this.modelValue.children) {
                let children = this.modelValue.children;
                for (let i = 0; i < children.length; i++) {
                    let item = children[i];
                    item.selected = val;
                    if (item.children) {
                        children = children.concat(item.children);
                    }
                }
            }
        },
        valueTrigger(val) {
            if (typeof val === 'function') return val();
            return val;
        },
        dragOver(event) {
            event.preventDefault();
            event.stopPropagation();
            if (this.valueTrigger(this.modelValue.disabled)) return;
            if (this.dragItem.item === this.modelValue) return;
            this.$emit('item-drag-over', {
                drop: this.modelValue,
                dropParent: this.parent
            });
            const { clientY } = event;
            const { top, height } = this.$refs.item.getBoundingClientRect();
            if (clientY - top < height / 2) {
                this.dropMode = 'before';
                clearTimeout(this.timer.delayExpand);
            } else if (
                this.valueTrigger(this.modelValue.dropInside) === false
            ) {
                this.dropMode = 'before';
                clearTimeout(this.timer.delayExpand);
            } else {
                this.dropMode = 'enter';
                this.timer.delayExpand = setTimeout(() => {
                    this.modelValue.expanded = true;
                }, 500);
            }
            clearTimeout(this.timer.drop);
        },
        dragLeave(event) {
            event.preventDefault();
            event.stopPropagation();
            this.$emit('item-drag-leave', {
                drop: this.modelValue,
                dropParent: this.parent
            });
            clearTimeout(this.timer.drop);
            this.timer.drop = setTimeout(() => {
                this.dropMode = 'leave';
            }, 100);
        },
        dropItem(event) {
            event.preventDefault();
            event.stopPropagation();
            if (this.valueTrigger(this.modelValue.disabled)) {
                this.dropMode = 'leave';
                return;
            }
            this.$emit('item-drop', {
                drop: this.modelValue,
                dropParent: this.parent
            });
            if (this.dragItem) {
                this.$emit('drop-item', {
                    drop: this.modelValue,
                    dropParent: this.parent,
                    drag: this.dragItem.item,
                    dragParent: this.dragItem.parent,
                    mode: this.dropMode
                });
            }
            this.dropMode = 'leave';
        }
    },
    beforeDestroy() {
        clearInterval(this.timer.requireRender);
    }
};
</script>