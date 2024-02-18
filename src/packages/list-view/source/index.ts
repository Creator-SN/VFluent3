import { commonProps } from '@/packages/common/props';
import { computed, ExtractPropTypes, ref } from 'vue';
import { EmitFn } from '@/types/components';

export const listViewProps = {
    ...commonProps,
}

export type ListViewProps = ExtractPropTypes<typeof listViewProps>;

export const listViewEmits = {
}

export type ListViewEmits = typeof listViewEmits

export const useListView = (props: ListViewProps, emits: EmitFn<ListViewEmits>) => {
    return {
    }
}
