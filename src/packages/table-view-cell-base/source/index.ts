import { commonProps } from '@/packages/common/props';

export const tableViewCellProps = {
    ...commonProps,
    modelValue: {
        type: Object,
        default: () => ({})
    },
    head: {
        type: Object,
        default: () => ({})
    },
    i18n: {
        type: Function,
        default: (key) => key
    },
    selectPos: {
        type: Object,
        default: () => ({})
    },
    foreground: {
        default: ''
    },
    fixedLeftWidth: {
        default: 0
    },
    fixedRightWidth: {
        default: 0
    },
    wrapperWidth: {
        default: '220px'
    },
    formatFunction: {
        type: Function,
        default: null
    },
    row_index: {
        type: Number,
        default: 0
    },
    col_index: {
        type: Number,
        default: 0
    },
    isUnder: {
        type: Boolean,
        default: false
    }
}

export type TableViewCellProps = typeof tableViewCellProps