<template>
    <fv-table-view-head-base
        v-bind="props"
        :wrapperWidth="'260px'"
        :dragItem="dragItem"
        :formatFunction="formatDateHead"
    >
        <template v-slot:menu>
            <div class="fv-tableview-default-edittool-row between">
                <span style="margin-left: 10px">{{ i18n('Date Format') }}</span>
                <fv-drop-down
                    v-model="currentDateFormats"
                    :options="dateFormatList"
                    :theme="theme"
                    :placeholder="i18n('Select Date Format')"
                    style="width: 120px"
                >
                    <template v-slot:options="x">
                        <p :title="i18n(x.option.text)" style="font-size: 12px">
                            {{ i18n(x.option.text) }}
                        </p>
                    </template>
                </fv-drop-down>
            </div>
            <div
                class="fv-tableview-default-edittool-row between"
                style="margin-top: 10px; margin-bottom: 10px"
            >
                <span style="margin-left: 10px">{{ i18n('Time Format') }}</span>
                <fv-drop-down
                    v-model="currentTimeFormats"
                    :options="timeFormatList"
                    :theme="theme"
                    :placeholder="i18n('Select Time Format')"
                    style="width: 120px"
                >
                    <template v-slot:options="x">
                        <p :title="i18n(x.option.text)" style="font-size: 12px">
                            {{ i18n(x.option.text) }}
                        </p>
                    </template>
                </fv-drop-down>
            </div>
        </template>
    </fv-table-view-head-base>
</template>

<script setup>
import { FvTableViewHeadProps } from '@/packages/table-view-head-base';

const props = defineProps(FvTableViewHeadProps);
</script>

<script>
export default {
    name: 'dateHead',
    data() {
        return {
            currentDateFormats: [],
            currentTimeFormats: [],
            dateFormatList: [
                { key: 'full', text: 'Full Date' },
                { key: 'mm/dd/YYYY', text: 'Month/Day/Year' },
                { key: 'dd/mm/YYYY', text: 'Day/Month/Year' },
                { key: 'YYYY/mm/dd', text: 'Year/Month/Day' },
                { key: 'relative', text: 'Relative' }
            ],
            timeFormatList: [
                { key: 'hidden', text: 'Hidden' },
                { key: '12', text: '12 Hour' },
                { key: '24', text: '24 Hour' }
            ]
        };
    },
    watch: {
        'modelValue.dateFormat'() {
            this.dateFormatInit();
        },
        'modelValue.timeFormat'() {
            this.timeFormatInit();
        },
        currentDateFormats() {
            let format = this.currentDateFormats[0].key;
            this.modelValue.dateFormat = format;
        },
        currentTimeFormats() {
            let format = this.currentTimeFormats[0].key;
            this.modelValue.timeFormat = format;
        }
    },
    computed: {},
    mounted() {
        this.dateFormatInit();
        this.timeFormatInit();
    },
    methods: {
        dateFormatInit() {
            let currentFormat = this.dateFormatList.find(
                (it) => it.key === this.modelValue.dateFormat
            );
            if (currentFormat) this.currentDateFormats = [currentFormat];
            else this.currentDateFormats = [];
        },
        timeFormatInit() {
            let currentFormat = this.timeFormatList.find(
                (it) => it.key === this.modelValue.timeFormat
            );
            if (currentFormat) this.currentTimeFormats = [currentFormat];
            else this.currentTimeFormats = [];
        },
        formatDateHead(modelValue) {
            let defaultHead = {
                key: 'number',
                name: '',
                emoji: '📅',
                type: 'number',
                minWidth: 60,
                width: 100,
                dateFormat: 'full',
                timeFormat: 'hidden',
                showEndDate: false,
                fixed: false,
                fixedSide: false,
                wrap: false,
                visible: true
            };
            for (let key in defaultHead) {
                if (!modelValue[key]) this.modelValue[key] = defaultHead[key];
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
