<template>
    <fv-table-view-head-base
        :modelValue="modelValue"
        :index="index"
        :i18n="i18n"
        :foreground="foreground"
        :formatFunction="formatEmailHead"
        :fixedLeftWidth="fixedLeftWidth"
        :fixedRightWidth="fixedRightWidth"
        :theme="theme"
        :dragItem="dragItem"
        @duplicate-column="$emit('duplicate-column', $event)"
        @drop-item="$emit('drop-item', $event)"
        @delete-column="$emit('delete-column', $event)"
    >
    </fv-table-view-head-base>
</template>

<script>
export default {
    props: {
        modelValue: {
            type: Object,
            default: () => ({})
        },
        index: {
            type: Number,
            default: 0
        },
        i18n: {
            type: Function,
            default: (key) => key
        },
        foreground: {
            default: ''
        },
        dragItem: {
            type: Object,
            default: null
        },
        fixedLeftWidth: {
            default: 0
        },
        fixedRightWidth: {
            default: 0
        },
        theme: {
            type: String,
            default: 'system'
        }
    },
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
            if (!modelValue.__guid)
                modelValue.__guid = this.GuidWithoutDash();
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
