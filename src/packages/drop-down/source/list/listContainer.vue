<template>
    <div class="list-container" :style="styles.listContainer">
        <div
            v-for="(item, index) in options"
            :key="`item: ${index}`"
            @click="onClick(item)"
        >
            <div
                class="list-item"
                :class="{
                    hr: valueTrigger(item.type) == 'divider',
                    normal:
                        valueTrigger(item.type) == 'default' ||
                        valueTrigger(item.type) == undefined,
                    disabled: valueTrigger(item.disabled),
                    choose: item.choosen
                }"
            >
                <p
                    v-show="valueTrigger(item.type) == 'header'"
                    class="title"
                    :style="[styles.title, fontStyle]"
                >
                    {{ valueTrigger(item.text) }}
                </p>
                <slot
                    name="options"
                    :option="item"
                    :index="index"
                    :valueTrigger="valueTrigger"
                >
                    <fv-check-box
                        v-model="item.choosen"
                        v-show="
                            valueTrigger(item.type) == 'default' ||
                            (valueTrigger(item.type) == undefined && multiple)
                        "
                        :disabled="valueTrigger(item.disabled)"
                        :foreground="dropDownListForeground"
                        :background="checkBoxBackground"
                        :theme="theme"
                        :title="valueTrigger(item.text)"
                        ><span :style="fontStyle">{{ valueTrigger(item.text) }}</span></fv-check-box
                    >
                    <slot
                        name="option-content"
                        :option="item"
                        :index="index"
                        :valueTrigger="valueTrigger"
                    >
                        <p
                            v-show="
                                valueTrigger(item.type) == 'default' ||
                                (valueTrigger(item.type) == undefined &&
                                    !multiple)
                            "
                            class="common-content"
                            :style="fontStyle"
                        >
                            {{ valueTrigger(item.text) }}
                        </p>
                    </slot>
                </slot>
            </div>
        </div>
    </div>
</template>

<script>
import { ClassBuilder, StyleBuilder, useTheme } from '@/utils/common';
import { formatFontSize, formatBorderRadiusSize } from '@/utils/common/css-size';

export default {
    emits: ['update:modelValue', 'chooseItem'],
    props: {
        modelValue: {
            default: () => []
        },
        options: {
            default: () => []
        },
        multiple: {
            default: false
        },
        maxHeight: {
            default: ''
        },
        borderRadius: {
            default: '3'
        },
        dropDownFontSize: {
            default: ''
        },
        dropDownFontWeight: {
            default: ''
        },
        checkBoxBackground: {
            default: ''
        },
        dropDownListForeground: {
            default: 'rgba(0, 120, 215, 0.9)'
        },
        dropDownListBackground: {
            default: 'rgba(0, 90, 158, 1)'
        },
        showStatus: {
            default: () => {
                return {
                    position: 'bottom',
                    top: '100%',
                    bottom: '',
                    height: 'auto',
                    overflow: 'hidden'
                };
            }
        },
        theme: {
            default: 'global'
        }
    },
    data() {
        return {
            choosenValue: this.modelValue,
            styles: {
                listContainer: {
                    top: '100%',
                    bottom: '',
                    height: 'auto',
                    maxHeight: '',
                    background: '',
                    borderRadius: ''
                },
                title: {
                    color: ''
                }
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
        maxHeight() {
            this.stylesInit();
        },
        borderRadius() {
            this.stylesInit();
        },
        dropDownListForeground() {
            this.stylesInit();
        },
        dropDownListBackground() {
            this.stylesInit();
        },
        'showStatus.top'() {
            this.stylesInit();
        },
        'showStatus.bottom'() {
            this.stylesInit();
        },
        'showStatus.height'() {
            this.stylesInit();
        },
        'showStatus.overflow'() {
            this.stylesInit();
        }
    },
    computed: {
        fontStyle() {
            return {
                fontSize: formatFontSize(this.dropDownFontSize),
                fontWeight: this.dropDownFontWeight
            };
        },
        $theme() {
            return useTheme(this.$props).theme.value;
        }
    },
    mounted() {
        this.stylesInit();
    },
    methods: {
        stylesInit() {
            const hasMaxHeight =
                this.maxHeight !== '' &&
                this.maxHeight !== undefined &&
                this.maxHeight !== null;
            this.styles.listContainer.borderRadius = formatBorderRadiusSize(this.borderRadius);
            this.styles.listContainer.background = this.dropDownListBackground;
            this.styles.listContainer.top = this.showStatus.top;
            this.styles.listContainer.bottom = this.showStatus.bottom;
            this.styles.listContainer.height = this.showStatus.height;
            this.styles.listContainer.maxHeight = this.maxHeight;
            this.styles.listContainer.overflow = hasMaxHeight
                ? 'auto'
                : this.showStatus.overflow;
            this.styles.title.color = this.dropDownListForeground;
        },
        valueTrigger(val) {
            if (typeof val === 'function') return val();
            return val;
        },
        onClick(cur) {
            if (cur.disabled) return 0;
            if (cur.type === 'header' || cur.type == 'divider') return 0;
            if (this.multiple) {
                let t = this.choosenValue.find((item) => item.key === cur.key);
                if (t != undefined) {
                    cur.choosen = false;
                    this.choosenValue.splice(this.choosenValue.indexOf(t), 1);
                } else {
                    cur.choosen = true;
                    this.choosenValue.push(cur);
                }
            } else {
                for (let it of this.choosenValue) {
                    it.choosen = false;
                }
                cur.choosen = true;
                this.choosenValue = [];
                this.choosenValue.push(cur);
            }

            this.$emit('chooseItem', {
                option: cur,
                index: this.options.indexOf(cur)
            });
        }
    }
};
</script>
