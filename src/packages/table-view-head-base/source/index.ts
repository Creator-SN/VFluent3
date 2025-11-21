import { commonProps } from '@/packages/common/props';

export const tableViewHeadProps = {
    ...commonProps,
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
    wrapperWidth: {
        default: '220px'
    },
    formatFunction: {
        default: null
    },
    isUnder: {
        type: Boolean,
        default: false
    }
}

export type TableViewHeadProps = typeof tableViewHeadProps
