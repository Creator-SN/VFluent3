<template>
    <fv-table-view-cell-base
        v-bind="props"
        @drop-item="$emit('drop-item', $event)"
        @set-select="$emit('set-select', $event)"
    >
        <template v-slot:default>
            <a
                :href="'mailto:' + modelValue[head.key]"
                class="fv-tableview-default-content"
                style="width: 100%; text-align: right;"
            >
                {{ modelValue[head.key] }}
            </a>
        </template>
    </fv-table-view-cell-base>
</template>

<script setup>
import { FvTableViewCellProps } from '@/packages/table-view-cell-base';

const props = defineProps(FvTableViewCellProps);
</script>

<script>
export default {
    name: 'emailCell',
    data() {
        return {};
    },
    computed: {}
};
</script>
