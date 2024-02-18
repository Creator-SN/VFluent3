import { commonProps } from '@/packages/common/props';
import { computed, ExtractPropTypes, ref } from 'vue';
import { EmitFn } from '@/types/components';

export const treeViewProps = {
    ...commonProps,
}

export type TreeViewProps = ExtractPropTypes<typeof treeViewProps>;

export const treeViewEmits = {
}

export type TreeViewEmits = typeof treeViewEmits

export const useTreeView = (props: TreeViewProps, emits: EmitFn<TreeViewEmits>) => {
    return {
    }
}
