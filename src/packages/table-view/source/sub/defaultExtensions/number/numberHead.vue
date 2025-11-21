<template>
    <fv-table-view-head-base
        v-bind="props"
        :wrapperWidth="'260px'"
        :formatFunction="formatNumberHead"
    >
        <template v-slot:menu>
            <div class="fv-tableview-default-edittool-row between">
                <span style="margin-left: 10px">{{
                    i18n('Number Format')
                }}</span>
                <fv-drop-down
                    v-model="currentFormats"
                    :options="numberFormatList"
                    :theme="theme"
                    :placeholder="i18n('Select Number Format')"
                    style="width: 120px"
                >
                    <template v-slot:options="x">
                        <p :title="i18n(x.option.text)" style="font-size: 12px">
                            {{ i18n(x.option.text) }}
                        </p>
                    </template>
                </fv-drop-down>
            </div>
            <hr />
            <div
                class="fv-tableview-number-edittool-inside-block"
                :class="[{ dark: theme === 'dark' }]"
            >
                <span class="number-edittool-title">{{ i18n('Show as') }}</span>
                <div class="hor-block">
                    <div
                        v-for="(item, index) in showAsList"
                        :key="index"
                        class="hor-item"
                        :style="{
                            color:
                                modelValue.showAs === item.key
                                    ? foreground
                                    : '',
                            'border-color':
                                modelValue.showAs === item.key
                                    ? foreground
                                    : '',
                            'border-width':
                                modelValue.showAs === item.key ? '1px' : ''
                        }"
                        @click="modelValue.showAs = item.key"
                    >
                        <i
                            class="ms-Icon icon-block"
                            :class="[`ms-Icon--${item.icon}`]"
                        ></i>
                        <p class="title-block">{{ item.text }}</p>
                    </div>
                </div>
                <div class="show-as-config-block">
                    <div class="show-as-config-item">
                        <span>{{ i18n('Color') }}</span>
                        <fv-drop-down
                            v-model="currentColors"
                            :theme="theme"
                            :options="colorList"
                            style="width: 120px; margin-left: 5px"
                        >
                            <template v-slot:options="x">
                                <i
                                    class="color-block"
                                    :style="{ background: x.option.color }"
                                    style="flex-shrink: 0"
                                ></i>
                                <p style="margin-left: 5px; font-size: 12px">
                                    {{ i18n(getColorName(x.option.name)) }}
                                </p>
                            </template>
                            <template v-slot:drop-carrier="x">
                                <div class="show-as-config-custom-drop-down">
                                    <i
                                        class="color-block"
                                        :style="{
                                            background:
                                                x.value.length > 0
                                                    ? x.value[0].color
                                                    : ''
                                        }"
                                    ></i>
                                    <span>{{
                                        i18n(
                                            getColorName(
                                                x.value.length > 0
                                                    ? x.value[0].name
                                                    : ''
                                            )
                                        )
                                    }}</span>
                                    <i class="ms-Icon ms-Icon--ChevronDown"></i>
                                </div>
                            </template>
                        </fv-drop-down>
                    </div>
                    <div class="show-as-config-item">
                        <span>{{ i18n('Divide by') }}</span>
                        <fv-text-box
                            v-model="modelValue.divideBy"
                            :placeholder="i18n('Input value')"
                            :theme="theme"
                            underline
                            ref="text"
                            :background="
                                theme === 'dark' ? 'rgba(0, 0, 0, 0.3)' : ''
                            "
                            border-color="rgba(120, 120, 120, 0.1)"
                            :focus-border-color="foreground"
                            borderWidth="2"
                            is-box-shadow="true"
                            style="width: 120px; margin-left: 5px"
                            @click.native="$refs.text.focus()"
                        >
                        </fv-text-box>
                    </div>
                    <div class="show-as-config-item">
                        <span>{{ i18n('Show Number') }}</span>
                        <fv-toggle-switch
                            v-model="modelValue.showNumber"
                            :on="i18n('Yes')"
                            :off="i18n('No')"
                            :insideContent="true"
                            :switchOnBackground="foreground"
                            width="60"
                            style="margin-left: 15px"
                        ></fv-toggle-switch>
                    </div>
                </div>
            </div>
        </template>
    </fv-table-view-head-base>
</template>

<script setup>
import { FvTableViewHeadProps } from '@/packages/table-view-head-base';

const props = defineProps(FvTableViewHeadProps);
</script>

<script>
import { colorList, numberFormatList } from './utils/optionList.js';

export default {
    name: 'numberHead',
    data() {
        return {
            showAsList: [
                {
                    key: 'number',
                    text: 'Number',
                    icon: 'NumberField'
                },
                {
                    key: 'bar',
                    text: 'Bar',
                    icon: 'ChromeMinimizeContrast'
                },
                {
                    key: 'ring',
                    text: 'Ring',
                    icon: 'ProgressRingDots'
                }
            ],
            currentColors: [],
            currentFormats: [],
            colorList: colorList,
            numberFormatList: numberFormatList
        };
    },
    watch: {
        'modelValue.showColor'() {
            this.colorInit();
        },
        'modelValue.numberFormat'() {
            this.formatInit();
        },
        currentColors() {
            let color = this.currentColors[0].color;
            this.modelValue.showColor = color;
        },
        currentFormats() {
            let format = this.currentFormats[0].key;
            this.modelValue.numberFormat = format;
        }
    },
    computed: {
        getColorName() {
            return (item) => {
                return item.slice(0, 1).toUpperCase() + item.slice(1);
            };
        }
    },
    mounted() {
        this.colorInit();
        this.formatInit();
    },
    methods: {
        colorInit() {
            let currentColor = this.colorList.find(
                (it) => it.color === this.modelValue.showColor
            );
            if (currentColor) this.currentColors = [currentColor];
            else this.currentColors = [];
        },
        formatInit() {
            let currentFormat = this.numberFormatList.find(
                (it) => it.key === this.modelValue.numberFormat
            );
            if (currentFormat) this.currentFormats = [currentFormat];
            else this.currentFormats = [];
        },
        formatNumberHead(modelValue) {
            let defaultHead = {
                key: 'number',
                name: '',
                emoji: '🔢',
                type: 'number',
                minWidth: 60,
                width: 100,
                numberFormat: 'Number',
                showAs: 'number',
                showColor: '#958DF1',
                divideBy: 100,
                showNumber: true,
                fixed: false,
                fixedSide: false,
                wrap: false,
                visible: true
            };
            for (let key in defaultHead) {
                if (!modelValue[key]) modelValue[key] = defaultHead[key];
            }
            if (!modelValue.__guid) modelValue.__guid = this.GuidWithoutDash();
        },
        GuidWithoutDash() {
            function S4() {
                return (((1 + Math.random()) * 0x10000) | 0)
                    .toString(16)
                    .substring(1);
            }
            return S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4();
        }
    }
};
</script>

<style lang="scss">
.fv-tableview-number-edittool-inside-block {
    position: relative;
    width: calc(100% - 20px);
    height: auto;
    margin: 2px 0px;
    border-radius: 6px;
    flex-shrink: 0;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    user-select: none;

    .number-edittool-title {
        font-size: 12px;
        color: rgba(120, 120, 120, 1);
    }

    .hor-block {
        position: relative;
        width: 100%;
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .hor-item {
            position: relative;
            width: 75px;
            height: 55px;
            border: rgba(200, 200, 200, 1) solid thin;
            border-radius: 6px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            &:hover {
                background: rgba(200, 200, 200, 1);
            }

            &:active {
                background: rgba(180, 180, 180, 1);
            }

            .icon-block {
                height: 20px;
                margin: 0px;
                flex: 1;
                font-size: 20px;
                display: flex;
                align-items: center;
            }

            .title-block {
                height: 20px;
                margin: 0px;
                margin-top: 1.5px;
                font-size: 10px;
                display: flex;
                align-items: center;
            }
        }
    }

    .show-as-config-block {
        position: relative;
        width: 100%;
        margin-top: 10px;
        padding: 0px 10px;
        background: rgba(249, 249, 248, 1);
        border-radius: 12px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;

        .show-as-config-item {
            position: relative;
            width: 100%;
            height: 40px;
            font-size: 13.8px;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .show-as-config-custom-drop-down {
                position: relative;
                width: 100%;
                height: 35px;
                padding: 0px 5px;
                box-sizing: border-box;
                border-radius: 6px;
                display: flex;
                justify-content: space-between;
                align-items: center;

                &:hover {
                    background: rgba(200, 200, 200, 0.1);
                }

                &:active {
                    background: rgba(200, 200, 200, 0.2);
                }
            }

            .color-block {
                position: relative;
                width: 15px;
                height: 15px;
                border: rgba(120, 120, 120, 0.1) solid thin;
                border-radius: 6px;
            }
        }
    }

    &.dark {
        .number-edittool-title {
            color: rgba(120, 120, 120, 1);
        }

        .hor-block {
            .hor-item {
                border: rgba(90, 90, 90, 1) solid thin;

                &:hover {
                    background: rgba(50, 50, 50, 1);
                }

                &:active {
                    background: rgba(36, 36, 36, 1);
                }
            }
        }

        .show-as-config-block {
            background: rgba(20, 20, 20, 1);

            .show-as-config-item {
                .show-as-config-custom-drop-down {
                    &:hover {
                        background: rgba(200, 200, 200, 0.1);
                    }

                    &:active {
                        background: rgba(200, 200, 200, 0.2);
                    }
                }

                .color-block {
                    border: rgba(120, 120, 120, 0.1) solid thin;
                }
            }
        }
    }
}
</style>
