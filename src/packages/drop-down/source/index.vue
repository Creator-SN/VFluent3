<template>
    <div
        class="fv-DropDown"
        :class="[$theme, isDisabled ? 'disabled' : '']"
        :style="styles.dropDown"
    >
        <div
            class="fv-drop-down-input-container"
            ref="input"
            @click="
                show.listContainer = !isDisabled ? !show.listContainer : false
            "
        >
            <slot
                name="drop-carrier"
                :value="choosenValue"
                :placeholoder="placeholder"
                :theme="$theme"
            >
                <drop-down-input
                    v-model="choosenValue"
                    :placeholder="placeholder"
                    :theme="$theme"
                    :disabled="isDisabled"
                    :borderWidth="borderWidth"
                    :borderRadius="borderRadius"
                    :inputForeground="inputForeground"
                    :inputBackground="inputBackground"
                    :inputBorderColor="inputBorderColor"
                    :dropDownIcon="dropDownIcon"
                    :dropDownIconForeground="dropDownIconForeground"
                    :class="{ error: showError }"
                >
                    <template v-slot:input="x">
                        <slot
                            name="input"
                            :placeholder="x.placeholder"
                            :value="x.value"
                            :valueTrigger="x.valueTrigger"
                        ></slot>
                    </template>
                </drop-down-input>
            </slot>
        </div>
        <p v-show="showError" class="err-msg">{{ errorMessage }}</p>
        <transition :name="`fv-drop-down-${dropDownListShowStatus.position}`">
            <list-container
                v-show="show.listContainer"
                v-model="choosenValue"
                :options="options"
                :multiple="multiple"
                :borderRadius="borderRadius"
                :checkBoxBackground="checkBoxBackground"
                :dropDownListForeground="dropDownListForeground"
                :dropDownListBackground="dropDownListBackground"
                :showStatus="dropDownListShowStatus"
                :theme="$theme"
                @chooseItem="onChange"
            >
                <template v-slot:options="item">
                    <slot
                        name="options"
                        :option="item.option"
                        :index="item.index"
                    ></slot>
                </template>
            </list-container>
        </transition>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { commonProps } from '@/packages/common/props';

const emits = defineEmits(['update:modelValue', 'change', 'visible-change']);

const props = defineProps({
    ...commonProps,
    modelValue: {
        default: () => []
    },
    options: {
        default: () => []
    },
    multiple: {
        default: false
    },
    borderWidth: {
        default: 1
    },
    borderRadius: {
        default: '6'
    },
    placeholder: {
        default: 'Dropdown'
    },
    maxHeight: {
        default: ''
    },
    inputForeground: {
        default: ''
    },
    inputBorderColor: {
        default: ''
    },
    checkBoxBackground: {
        default: ''
    },
    dropDownListForeground: {
        default: ''
    },
    dropDownListBackground: {
        default: ''
    },
    inputBackground: {
        default: ''
    },
    dropDownIcon: {
        default: 'ChevronDown'
    },
    dropDownIconForeground: {
        default: ''
    },
    showError: {
        default: false
    },
    errorMessage: {
        default: 'This dropdown has an error'
    },
    disabled: {
        default: false
    },
    setFocus: {
        default: false
    }
});
</script>

<script>
import dropDownInput from './input/input.vue';
import listContainer from './list/listContainer.vue';

import { useTheme } from '@/utils/common';

export default {
    name: 'FvDropDown',
    components: {
        dropDownInput,
        listContainer
    },

    data() {
        return {
            choosenValue: this.modelValue,
            topRemainHeight: window.innerHeight,
            bottomRemainHeight: window.innerHeight,
            timer: {},
            styles: {
                dropDown: {
                    zIndex: 0,
                    overflow: 'visible'
                }
            },
            show: {
                listContainer: false
            }
        };
    },
    watch: {
        modelValue(val) {
            this.choosenValue = val;
        },
        choosenValue(val) {
            this.$emit('update:modelValue', val);
        },
        setFocus(val) {
            this.show.listContainer = val;
        },
        'show.listContainer'(val) {
            if (val) {
                this.styles.dropDown.zIndex = 1;
            } else this.styles.dropDown.zIndex = 0;
            this.$emit('visible-change', val);
        }
    },
    computed: {
        $theme() {
            return useTheme(this.$props).theme.value;
        },
        isDisabled() {
            return (
                this.options.length == 0 ||
                this.disabled.toString() == 'true' ||
                this.disabled == 'disabled' ||
                this.disabled === ''
            );
        },
        dropDownListHeight() {
            return 36 * this.options.length;
        },
        dropDownListShowStatus() {
            if (this.dropDownListHeight < this.bottomRemainHeight)
                return {
                    position: 'bottom',
                    top: '100%',
                    bottom: '',
                    height: 'auto',
                    overflow: 'hidden'
                };
            if (this.dropDownListHeight < this.topRemainHeight)
                return {
                    position: 'top',
                    top: '',
                    bottom: '100%',
                    height: 'auto',
                    overflow: 'hidden'
                };
            if (this.topRemainHeight > this.bottomRemainHeight)
                return {
                    position: 'top',
                    top: '',
                    bottom: '100%',
                    height: `${this.topRemainHeight}px`,
                    overflow: 'auto'
                };
            return {
                position: 'bottom',
                top: '100%',
                bottom: '',
                height: `${this.bottomRemainHeight}px`,
                overflow: 'auto'
            };
        }
    },
    mounted() {
        this.outSideClickInit();
        this.heightSenseInit();
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
            if (!_self) this.show.listContainer = false;
        },
        heightSenseInit() {
            clearInterval(this.timer);
            this.timer = setInterval(() => {
                try {
                    this.topRemainHeight =
                        this.$refs.input.getBoundingClientRect().top;
                } catch (e) {
                    this.topRemainHeight = window.innerHeight;
                }
                try {
                    this.bottomRemainHeight =
                        window.innerHeight -
                        this.$refs.input.getBoundingClientRect().bottom;
                } catch (e) {
                    this.bottomRemainHeight = window.innerHeight;
                }
            }, 300);
        },
        onChange(event) {
            this.show.listContainer = this.multiple;
            this.$emit('change', event);
        }
    },
    beforeUnmount() {
        clearInterval(this.timer);
        window.removeEventListener('click', this.outSideClickEvent);
    }
};
</script>
