<template>
    <div
        class="fv-IconElement"
        :class="[$theme, {'icon-element-btn': iconButton}]"
        :style="{width: `${fontSize + paddingWidth / 1}px`, height: `${fontSize + paddingWidth / 1}px`, borderRadius: `${borderRadius}px`}"
        @click="$emit('click', $event)"
    >
        <div
            v-for="(item, index) in iconList"
            class="icon-element-item"
            :class="[valueTrigger(item.position)]"
            :key="index"
        >
            <i
                class="icon-element ms-Icon"
                :class="[`ms-Icon--${valueTrigger(item.name)}`]"
                :style="{fontSize: `${fontSize}px`,
                        color: valueTrigger(item.color),
                        'background-image': valueTrigger(item.color),
                        'background-clip': 'text',
                        '-webkit-background-image': valueTrigger(item.color),
                        '-webkit-background-clip': 'text',
                        '-webkit-text-fill-color': valueTrigger(item.color)
            }"
            ></i>
        </div>
    </div>
</template>
        
<script>
import { iconElementProps } from '.';
import { ClassBuilder, StyleBuilder, useTheme } from '@/utils/common';

export default {
    name: 'FvIconElement',
    emits: ['click'],
    props: {
        ...iconElementProps,
        value: {
            default: 'AppIconDefault'
        },
        fontSize: {
            default: 32
        },
        paddingWidth: {
            default: 2
        },
        iconButton: {
            type: Boolean,
            default: false
        },
        borderRadius: {
            default: 6
        }
    },
    data() {
        return {};
    },
    computed: {
        iconList() {
            let result = [];
            if (Array.isArray(this.value)) result = this.value;
            else result = this.value.split(',');
            return result.map((item) => this.computeIconItem(item));
        },
        $theme() {
            return useTheme(this.$props).theme.value;
        }
    },
    methods: {
        computeIconItem(item) {
            let defaultItem = {
                name: '',
                color: this.$theme == 'dark' ? '#fff' : '#000',
                position: 0
            };
            if (item.name) return Object.assign(defaultItem, item);
            defaultItem.name = item;
            return defaultItem;
        },
        valueTrigger(val) {
            if (typeof val === 'function') return val();
            return val;
        }
    }
};
</script>

