<template>
    <div class="fv-TimePicker" :class="[$theme, { disabled: disabled }]">
        <div
            class="fv-TimePicker__input"
            :style="{ background: inputBackground }"
            @click="focus()"
        >
            <button class="fv-TimePicker__input-item">
                {{ showTime(0, modelValue.getHours()) }}
            </button>
            <button
                class="fv-TimePicker__input-item"
                :style="{ borderColor: innerBorderColor }"
            >
                {{ showTime(1, modelValue.getMinutes()) }}
            </button>
            <button
                :style="{ borderColor: innerBorderColor }"
                class="fv-TimePicker__input-item"
                v-if="timeType == 12"
            >
                {{ showTime(2, Math.floor(modelValue.getHours() / 11.9)) }}
            </button>
        </div>
        <transition name="fv-TimePicker__options">
            <div
                v-show="show"
                class="fv-TimePicker__options"
                :style="{ background: optionBackground }"
            >
                <div class="fv-TimePicker__options-body">
                    <div
                        class="fv-TimePicker__options-body-mask"
                        :style="{ background: selectedBackground }"
                    ></div>
                    <div
                        v-for="(col, index1) in data"
                        :key="`options-col${index1}`"
                        class="fv-TimePicker__options-body-col"
                        v-hover="hoverUpAndDown"
                    >
                        <div
                            class="fv-TimePicker__options-body-col-up"
                            @click="clickItem(`col${index1}`, 4)"
                        >
                            <i class="ms-Icon ms-Icon--CaretUpSolid8"></i>
                        </div>
                        <div
                            class="fv-TimePicker__options-body-items"
                            :ref="`col${index1}`"
                        >
                            <div
                                class="fv-TimePicker__options-body-item"
                                v-hover="hover"
                                v-for="(item, index) in col"
                                :key="`options-col-item${index1}-${item}-${index}`"
                                @click="clickItem(`col${index1}`, index)"
                            >
                                {{ showTime(index1, item) }}
                            </div>
                        </div>
                        <div
                            class="fv-TimePicker__options-body-col-down"
                            @click="clickItem(`col${index1}`, 6)"
                        >
                            <i class="ms-Icon ms-Icon--CaretDownSolid8"></i>
                        </div>
                    </div>
                </div>
                <div class="fv-TimePicker__options-bar">
                    <button
                        class="fv-TimePicker__options-bar-accept"
                        v-hover="hover"
                        @click="accept"
                    >
                        <i class="ms-Icon ms-Icon--Accept"></i>
                    </button>
                    <button
                        class="fv-TimePicker__options-bar-cancel"
                        v-hover="hover"
                        @click="cancel"
                    >
                        <i class="ms-Icon ms-Icon--Cancel"></i>
                    </button>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { commonProps } from '@/packages/common/props';

const emits = defineEmits(['update:modelValue', 'change', 'focus']);

const props = defineProps({
    ...commonProps,
    timeType: {
        type: Number,
        default: 12
    },
    modelValue: {
        type: Date,
        default: () => new Date()
    },
    period: {
        type: Array,
        default: () => ['A.M.', 'P.M.']
    },
    inputBackground: {
        default: ''
    },
    innerBorderColor: {
        type: String,
        default: 'rgba(200, 200, 200, 0.3)'
    },
    selectedBackground: {
        default: ''
    },
    optionBackground: {
        default: ''
    },
    disabled: {
        type: Boolean,
        default: false
    },
    hoverColor: {
        type: String,
        default: undefined
    }
});
</script>

<script>
import { useTheme } from '@/utils/common';

export default {
    name: 'FvTimePicker',
    directives: {
        hover: {
            /**
             * @param {HTMLElement} el
             */
            bind(el, { value }) {
                if (value !== undefined && typeof value == 'function') {
                    el.enterFunction = () => {
                        value(true, el);
                    };
                    el.leaveFunction = () => {
                        value(false, el);
                    };
                    el.addEventListener('mouseover', el.enterFunction);
                    el.addEventListener('mouseleave', el.leaveFunction);
                }
            },
            unbind(el) {
                if (
                    el.enterFunction !== undefined &&
                    typeof el.enterFunction == 'function'
                ) {
                    el.removeEventListener('mouseover', el.hoverFunction);
                    el.removeEventListener('mouseleave', el.leaveFunction);
                }
            }
        }
    },
    data() {
        return {
            show: false,
            data: [
                // data 1st=>hours,2nd=>minutes,3rd=>period
                [],
                []
            ],
            window: {
                event: {
                    click: (evt) => {
                        let dom = evt.target;
                        let inside = false;
                        while (dom) {
                            if (dom == this.$el) {
                                inside = true;
                                break;
                            }
                            dom = dom.parentNode;
                        }
                        if (!inside) {
                            this.show = false;
                        }
                    }
                }
            },
            config: {
                optionCount: 9,
                buffer: 1
            },
            selected: {
                date: this.modelValue
            },
            options: {}
        };
    },
    watch: {
        show(val) {
            if (val) {
                this.selected.date = this.modelValue;
                this.init();
            } else {
                this.config.clickLock = false;
            }
        }
    },
    computed: {
        $theme() {
            return useTheme(this.$props).theme.value;
        }
    },
    mounted() {
        this.init();
        this.loadEvent();
    },
    beforeUnmount() {
        this.removeEvent();
    },
    methods: {
        focus() {
            if (this.disabled) return;
            this.show = true;
        },
        accept() {
            this.$emit('update:modelValue', new Date(this.selected.date));
            this.$emit('change', new Date(this.selected.date));
            this.show = false;
        },
        cancel() {
            this.show = false;
        },
        init() {
            this.data = [[], []];
            if (this.timeType == '12') {
                this.data.push([]);
            }
            this.size = [this.timeType == 12 ? 12 : 24, 60, 2];
            for (let i = 0; i < this.data.length; ++i) {
                let col = this.data[i];
                this.setOptions(col, this.size[i], i);
            }
        },
        nPrev(num, size, next = 1, offset = 1) {
            num = Math.round(num);
            let offsetSize = next * size;
            return ((num + offsetSize - offset - next) % size) + offset;
        },
        nNext(num, size, next = 1, offset = 1) {
            num = Math.round(num);
            let offsetSize = offset * size;
            return ((num + offsetSize + next - offset) % size) + offset;
        },
        loadEvent() {
            for (let key in this.window.event) {
                let event = this.window.event[key];
                window.addEventListener(key, event);
            }
        },
        setOptions(data, size, index) {
            let count = this.config.optionCount + this.config.buffer * 2;
            let num;
            let date = this.selected.date;
            switch (index) {
                case 0:
                    num = this.nPrev(
                        date.getHours(),
                        size,
                        Math.floor(count / 2),
                        0
                    );
                    break;
                case 1:
                    num = this.nPrev(
                        date.getMinutes(),
                        size,
                        Math.floor(count / 2),
                        0,
                        0
                    );
                    break;
                case 2:
                    num = this.nPrev(
                        Math.floor(date.getHours() / 11.9),
                        size,
                        Math.floor(count / 2),
                        0
                    );
                    break;
            }
            for (let i = 0; i < count; ++i) {
                if (index == 2) {
                    if (i != 5 && i - num != 5 && i - num != 4) {
                        data.push(num - 3);
                    } else {
                        data.push(num);
                    }
                } else {
                    data.push(num);
                }
                num = this.nNext(num, size, 1, index == 0 ? 1 : 0);
            }
            this.$nextTick(() => {
                this.loadSlide(size, index);
            });
        },
        loadSlide(size, index) {
            let refName = `col${index}`;
            let origin = (this.$refs[refName][0].scrollTop =
                40 * this.config.buffer);
            this.options[refName] = {};
            if (this.options[refName].scroll) {
                this.$refs[refName][0].removeEventListener(
                    'scroll',
                    this.options[refName].scroll
                );
            }
            this.options[refName].scroll = () => {
                if (index == 2) {
                    if (this.$refs[refName][0].scrollTop > origin) {
                        if (this.selected.date.getHours() > 11) {
                            this.$refs[refName][0].scrollTop = origin;
                            return;
                        }
                    } else {
                        if (this.selected.date.getHours() <= 11) {
                            this.$refs[refName][0].scrollTop = origin;
                            return;
                        }
                    }
                }
                this.slideCol(
                    origin,
                    refName,
                    () => {
                        this.data[index].shift();
                        let num;
                        let temp;
                        switch (index) {
                            case 0:
                                temp =
                                    this.timeType == 12
                                        ? this.selected.date.getHours() >= 12
                                            ? 12
                                            : 0
                                        : 1;
                                num = this.nNext(
                                    this.selected.date.getHours(),
                                    size,
                                    0
                                );
                                this.selected.date.setHours(
                                    this.nNext(num, size, 1, temp)
                                );
                                break;
                            case 1:
                                num = this.nNext(
                                    this.selected.date.getMinutes(),
                                    size,
                                    0,
                                    0
                                );
                                this.selected.date.setMinutes(
                                    this.nNext(num, size, 1, 0)
                                );
                                break;
                            case 2:
                                num = Math.floor(
                                    this.selected.date.getHours() / 11.9
                                );
                                if (num == 0)
                                    this.selected.date.setHours(
                                        this.selected.date.getHours() + 12
                                    );
                                break;
                        }
                        let next = this.nNext(
                            num,
                            size,
                            (this.config.optionCount - 1) / 2 +
                                this.config.buffer +
                                1,
                            0
                        );
                        if (index == 2) {
                            next = -1;
                        }
                        this.data[index].push(next);
                    },
                    () => {
                        this.data[index].pop();
                        let num, temp;
                        switch (index) {
                            case 0:
                                temp =
                                    this.timeType == 12
                                        ? this.selected.date.getHours() >= 12
                                            ? 12
                                            : 0
                                        : 1;
                                num = this.nNext(
                                    this.selected.date.getHours(),
                                    size,
                                    0
                                );
                                this.selected.date.setHours(
                                    this.nPrev(num, size, 1, temp)
                                );
                                break;
                            case 1:
                                num = this.nNext(
                                    this.selected.date.getMinutes(),
                                    size,
                                    0,
                                    0
                                );
                                this.selected.date.setMinutes(
                                    this.nPrev(num, size, 1, 0)
                                );
                                break;
                            case 2:
                                num = Math.floor(
                                    this.selected.date.getHours() / 12
                                );
                                if (num == 1)
                                    this.selected.date.setHours(
                                        this.selected.date.getHours() - 12
                                    );
                                break;
                        }
                        let next = this.nPrev(
                            num,
                            size,
                            (this.config.optionCount - 1) / 2 +
                                this.config.buffer +
                                1,
                            0
                        );
                        if (index == 2) {
                            next = -1;
                        }
                        this.data[index].unshift(next);
                    }
                );
            };
            this.$refs[refName][0].addEventListener(
                'scroll',
                this.options[refName].scroll
            );
        },
        removeEvent() {
            for (let key in this.window.event) {
                let event = this.window.event[key];
                window.removeEventListener(key, event);
            }
            for (let key in this.options) {
                this.$refs[key][0].removeEventListener(
                    'scroll',
                    this.options[key].scroll
                );
            }
        },
        slideCol(origin, refName, nxtCallback, preCallback) {
            if (Math.abs(this.$refs[refName][0].scrollTop - origin) >= 20) {
                if (this.$refs[refName][0].scrollTop > origin) {
                    nxtCallback();
                } else {
                    preCallback();
                }
                this.$nextTick(() => {
                    this.$refs[refName][0].scrollTop = origin;
                });
            }
        },
        async clickItem(colName, index) {
            if (this.config.clickLock) return;
            this.config.clickLock = true;
            // imitation scroll
            this.$refs[colName][0].scrollTop = this.config.buffer * 40;
            let origin = this.$refs[colName][0].scrollTop;
            this.$refs[colName][0].scrollTop += index - 5; // init important
            let count = Math.abs(index - 5);
            if (count > 0) {
                let timeout = setInterval(() => {
                    if (this.$refs[colName][0].scrollTop == origin) {
                        --count;
                        if (!count) {
                            clearInterval(timeout);
                            this.config.clickLock = false;
                            return;
                        }
                    }
                    this.config.scrollLock = true;
                    this.$refs[colName][0].scrollTop += (index - 5) * 3;
                }, 20);
            } else {
                this.config.clickLock = false;
            }
        },
        numberFixTwo(num) {
            if (num < 10) {
                return '0' + num;
            } else {
                return num;
            }
        },
        showTime(col, item) {
            if (col == 0) {
                return this.nNext(
                    item,
                    this.timeType == 12 ? 12 : 24,
                    0,
                    this.timeType == 12 ? 1 : 0
                );
            } else if (col == 1) {
                return this.numberFixTwo(this.nNext(item, 60, 0, 0));
            } else {
                return item >= 0 ? this.period[item] : '';
            }
        },
        hover(isHover, element) {
            if (this.hoverColor !== undefined) {
                if (isHover) {
                    if (
                        element.hoverStatus === false ||
                        element.hoverStatus === undefined
                    ) {
                        // store if inner style background is set
                        if (element.style.backgroundColor)
                            element.backgroundColor =
                                element.style.backgroundColor;
                        element.style.backgroundColor = this.hoverColor;
                    }
                } else {
                    // restore inner style background
                    if (element.backgroundColor !== undefined)
                        element.style.backgroundColor = element.backgroundColor;
                    // restore if inner style is not set, set null to use external css
                    else element.style.backgroundColor = null;
                }
                element.hoverStatus = isHover;
            }
        },
        hoverUpAndDown(isHover, element) {
            // find btn.fv-TimePicker__options-body-col-down or btn.fv-TimePicker__options-body-col-up
            let up = element.querySelector(
                '.fv-TimePicker__options-body-col-down'
            );
            let down = element.querySelector(
                '.fv-TimePicker__options-body-col-up'
            );
            if (isHover) {
                if (up.hoverStatus === false || up.hoverStatus === undefined) {
                    // store if inner style background is set
                    if (up.style.backgroundColor)
                        up.backgroundColor = up.style.backgroundColor;
                    up.style.backgroundColor = this.hoverColor;
                }
                if (
                    down.hoverStatus === false ||
                    down.hoverStatus === undefined
                ) {
                    // store if inner style background is set
                    if (down.style.backgroundColor)
                        down.backgroundColor = down.style.backgroundColor;
                    down.style.backgroundColor = this.hoverColor;
                }
            } else {
                // restore inner style background
                if (up.backgroundColor !== undefined)
                    up.style.backgroundColor = up.backgroundColor;
                // restore if inner style is not set, set null to use external css
                else up.style.backgroundColor = null;
                if (down.backgroundColor !== undefined)
                    down.style.backgroundColor = down.backgroundColor;
                // restore if inner style is not set, set null to use external css
                else down.style.backgroundColor = null;
            }
            up.hoverStatus = isHover;
            down.hoverStatus = isHover;
        }
    }
};
</script>
