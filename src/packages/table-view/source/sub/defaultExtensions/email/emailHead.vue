<template>
    <fv-table-view-head-base v-bind="props" :formatFunction="formatEmailHead">
    </fv-table-view-head-base>
</template>

<script setup>
import { FvTableViewHeadProps } from '@/packages/table-view-head-base';

const props = defineProps(FvTableViewHeadProps);
</script>

<script>
export default {
    name: 'emailHead',
    data() {
        return {};
    },
    watch: {},
    computed: {},
    mounted() {},
    methods: {
        formatEmailHead(modelValue) {
            let defaultHead = {
                key: 'email',
                name: '',
                emoji: '@',
                type: 'email',
                minWidth: 60,
                width: 100,
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
