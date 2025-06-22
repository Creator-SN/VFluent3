import { commonProps } from '@/packages/common/props';
import { computed, ExtractPropTypes, PropType, ref } from 'vue';
import { EmitFn } from '@/types/components';
import { isObject, isString, useTheme } from '@/utils/common';

export const iconElementProps = {
    ...commonProps,
    value: {
        type: [Object,String] as PropType<Item | string>,
        default: 'AppIconDefault'
    },
    fontSize: {
        type: Number,
        default: 32
    },
    paddingWidth: {
        type: Number,
        default: 2
    },
    iconButton: {
        type: Boolean,
        default: false
    },
    borderRadius: {
        type: Number,
        default: 6
    }
}

export type IconElementProps = ExtractPropTypes<typeof iconElementProps>;

export const iconElementEmits = {
    
}

export type IconElementEmits = typeof iconElementEmits

export type Item = {
    name?: string | Item
    color?: string
    position?: number
}

export const useIconElement = (props: IconElementProps, emits: EmitFn<IconElementEmits>) => {
    const {theme} = useTheme(props)
    const iconList = computed(()=>{
        let result:Array<string|Item> = []
        if (Array.isArray(props.value)) result = props.value
        else if (isString(props.value)) result = props.value.split(',')
        return result.map((item:Item|string)=>computeIconItem(item))
    })
    const computeIconItem = (item: Item|string)=>{
        let defaultItem: Item = {
            name: '',
            color: theme.value == 'dark' ? '#fff' : '#000',
            position: 0
        };
        if (isObject(item) && item.name) return Object.assign(defaultItem, item);
        defaultItem.name = item;
        return defaultItem;
    }
    return {
        theme,
        iconList,
        computeIconItem
    }
}
