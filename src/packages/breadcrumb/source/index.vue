<template>
    <div
        class="fv-Breadcrumb"
        :class="[
            $theme,
            {
                readOnly: readOnly,
                'editor-mode': mode === 'editor',
                disabled: isDisabled
            }
        ]"
        :style="{
            'border-radius': `${borderRadius}px`,
            'border-color': mode === 'editor' ? borderColor : '',
            'outline-color': mode === 'editor' ? borderColor : ''
        }"
    >
        <div class="fv-bc-route-list" ref="main" @click="editorMode">
            <div
                v-show="showRoot"
                class="fv-bc-route-item"
                :style="{ 'font-size': fontSize }"
                @click="routeClick"
            >
                <slot
                    name="root"
                    :rootIcon="rootIcon"
                    :separator="separator"
                    :separatorIcon="separatorIcon"
                >
                    <i
                        class="fv-bc-separator-content ms-Icon"
                        :class="[`ms-Icon--${rootIcon}`]"
                    ></i>
                </slot>
            </div>
            <div
                v-show="mode == 'default'"
                v-for="(item, index) in routeList"
                :key="index"
                class="fv-bc-route-item"
                :style="{ 'font-size': fontSize }"
                @dblclick="editorMode"
            >
                <slot name="route-item" :item="item" :index="index">
                    <p
                        v-show="item"
                        class="fv-bc-separator-content"
                        @click="routeItemClick(item, index, $event)"
                    >
                        {{ item }}
                    </p>
                    <i
                        v-show="index < routeList.length - 1"
                        class="fv-bc-separator-icon ms-Icon"
                        :class="[separatorIcon ? `ms-Icon--${separator}` : '']"
                        :style="{
                            'font-family': separatorIcon ? '' : 'Calibri'
                        }"
                        >{{ separatorIcon ? '' : separator }}</i
                    >
                </slot>
            </div>
            <input
                v-show="mode == 'editor'"
                v-model="tempValue"
                class="fv-bc-route-text-box"
                type="text"
                ref="editor"
                :style="{ 'font-size': fontSize }"
                @keyup="handleEnter"
            />
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { commonProps } from '@/packages/common/props';

const emits = defineEmits([
    'update:modelValue',
    'input-change',
    'debounce-input',
    'root-click',
    'item-click'
]);

const props = defineProps({
    ...commonProps,
    modelValue: {
        default: ''
    },
    separator: {
        type: String,
        default: '/'
    },
    separatorChar: {
        type: String,
        default: '/'
    },
    showRoot: {
        default: true
    },
    rootIcon: {
        default: 'FolderHorizontal'
    },
    readOnly: {
        default: true
    },
    fontSize: {
        default: '16px'
    },
    borderColor: {
        default: ''
    },
    disabled: {
        default: false
    },
    borderRadius: {
        default: 6
    },
    debounceDelay: {
        default: 300
    }
});
</script>

<script>
import { useTheme } from '@/utils/common';

export default {
    name: 'FvBreadcrumb',

    data() {
        return {
            mode: 'default',
            thisValue: this.modelValue,
            tempValue: '',
            timer: {
                debounce: null
            }
        };
    },
    watch: {
        modelValue(val) {
            this.thisValue = val;
            this.tempValue = val;
        },
        mode(val) {
            if (val == 'editor') {
                this.tempValue = this.thisValue;
            } else {
                this.thisValue = this.tempValue;
            }
        },
        thisValue(val) {
            this.$emit('update:modelValue', val);
        },
        tempValue(val) {
            this.$emit('input-change', val);
            if (this.timer.debounce) clearTimeout(this.timer.debounce);
            this.timer.debounce = setTimeout(() => {
                this.$emit('debounce-input', val);
            }, this.debounceDelay);
        }
    },
    computed: {
        separatorIcon() {
            if (this.separator.length > 1) return true;
            return false;
        },
        routeList() {
            let route = this.thisValue;
            if (route == '') return [];
            return route.split(this.separatorChar);
        },
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
        this.outSideClickInit();
    },
    methods: {
        outSideClickInit() {
            window.addEventListener('click', this.outSideClickEvent);
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
            if (!_self) this.mode = 'default';
        },
        editorMode(event) {
            if (this.isDisabled) return 0;
            if (this.readOnly) return 0;
            event.preventDefault();
            event.stopPropagation();
            if (this.mode !== 'editor') {
                this.mode = 'editor';
                this.$nextTick(() => {
                    this.$refs.editor.focus();
                    this.$refs.editor.select();
                });
            }
        },
        handleEnter(event) {
            if (event.keyCode === 13) this.mode = 'default';
        },
        routeClick(event) {
            if (this.isDisabled) return 0;
            event.stopPropagation();
            this.$emit('root-click', {
                path: this.thisValue,
                pathList: this.routeList
            });
        },
        routeItemClick(item, index, event) {
            if (this.isDisabled) return 0;
            event.stopPropagation();
            let path = '';
            let pathList = [];
            for (let i = 0; i <= index; i++) pathList.push(this.routeList[i]);
            pathList.forEach((el) => {
                if (path == '') path = el;
                else path += `${this.separatorChar}${el}`;
            });
            this.$emit('item-click', {
                path: path,
                fullPath: `${this.separatorChar}${path}`,
                pathList: pathList,
                current: item
            });
        }
    },
    beforeUnmount() {
        window.removeEventListener('click', this.outSideClickEvent);
    }
};
</script>
