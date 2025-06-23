<template>
    <div class="fv-Tag" :class="[$theme]">
        <div
            v-for="(item, index) in thisValue"
            :key="index"
            class="fv-tag-item"
            :class="[
                item.type ? item.type : '',
                size,
                { disabled: item.disabled }
            ]"
            :style="{
                background: item.background
                    ? getColor(item.background)['background']
                    : '',
                borderColor: item.background
                    ? getColor(item.background)['borderColor']
                    : '',
                color: item.background ? getColor(item.background)['color'] : ''
            }"
            @click="$emit('tag-click', item)"
        >
            <span
                class="fv-tag-content"
                :style="{ 'font-size': fontSize + 'px' }"
            >
                <slot>
                    <p class="fv-tag-default-content">{{ item.text }}</p>
                </slot>
            </span>
            <div v-show="isDel && !item.disabled" class="fv-tag-icon">
                <i
                    class="ms-Icon ms-Icon--Cancel fv-tag-icon-btn"
                    @click="delTag(item)"
                ></i>
            </div>
        </div>
        <div
            v-show="isNewTag"
            ref="add"
            class="fv-tag-item controller"
            :class="[size]"
            :style="{
                background: newTagBackground
                    ? getColor(newTagBackground)['background']
                    : '',
                borderColor: newTagBackground
                    ? getColor(newTagBackground)['borderColor']
                    : '',
                color: newTagBackground
                    ? getColor(newTagBackground)['color']
                    : ''
            }"
            @click="editable"
        >
            <div v-show="!edit" class="fv-tag-icon">
                <i class="ms-Icon ms-Icon--Add fv-tag-icon-btn"></i>
            </div>
            <span v-show="!edit" class="fv-tag-content">
                <slot>
                    <p class="fv-tag-default-content">
                        {{ newTagPlaceholder }}
                    </p>
                </slot>
            </span>
            <fv-text-box
                v-show="edit"
                v-model="inputValue"
                ref="edit"
                background="transparent"
                border-color="transparent"
                focus-border-color="transparent"
                :placeholder="newTagPlaceholder"
                style="width: auto"
                @keydown.enter="addTag"
            ></fv-text-box>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { commonProps } from '@/packages/common/props';

const emits = defineEmits([
    'update:modelValue',
    'add-item',
    'del-item',
    'tag-click'
]);

const props = defineProps({
    ...commonProps,
    modelValue: {
        default: () => []
    },
    newTagPlaceholder: {
        default: 'New Tag'
    },
    size: {
        default: ''
    },
    newTagBackground: {
        default: null
    },
    fontSize: {
        default: ''
    },
    isNewTag: {
        default: false
    },
    isDel: {
        default: false
    }
});
</script>

<script>
import one from 'onecolor';

import { useTheme } from '@/utils/common';

export default {
    name: 'FvTag',

    data() {
        return {
            thisValue: this.modelValue,
            inputValue: '',
            edit: false
        };
    },
    watch: {
        modelValue(val) {
            this.thisValue = val;
        },
        thisValue(val) {
            this.$emit('update:modelValue', val);
        },
        edit() {
            if (this.inputValue !== '') this.addTag();
        }
    },
    computed: {
        $theme() {
            return useTheme(this.$props).theme.value;
        }
    },
    mounted() {
        this.outSideClickInit();
    },
    methods: {
        outSideClickInit() {
            window.addEventListener('click', this.outSideClickEvent);
            window.addEventListener('touchend', this.outSideClickEvent);
        },
        outSideClickEvent(event) {
            let x = event.target;
            let _self = false;
            while (x && x.tagName && x.tagName.toLowerCase() != 'body') {
                if (x == this.$refs.add) {
                    _self = true;
                    break;
                }
                x = x.parentNode;
            }
            if (!_self) {
                this.edit = false;
            }
        },
        editable() {
            this.edit = true;
            setTimeout(() => {
                this.$refs.edit.focus();
            }, 10);
        },
        addTag() {
            this.thisValue.push({
                text: this.inputValue
            });
            this.inputValue = '';
            this.$emit('add-item', {
                text: this.inputValue
            });
        },
        delTag(item) {
            let idx = this.thisValue.indexOf(item);
            this.thisValue.splice(idx, 1);
            this.$emit('del-item', item);
        },
        getColor(color) {
            color = one(color);
            if (this.$theme == 'dark')
                return {
                    background: color.alpha(1).cssa(),
                    borderColor: color.alpha(1).cssa(),
                    color: 'whitesmoke'
                };
            return {
                background: color.alpha(0.1).cssa(),
                borderColor: color.alpha(0.1).cssa(),
                color: color.alpha(1).cssa()
            };
        }
    },
    beforeUnmount() {
        window.removeEventListener('click', this.outSideClickEvent);
        window.removeEventListener('touchend', this.outSideClickEvent);
    }
};
</script>
