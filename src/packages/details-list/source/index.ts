import { commonProps } from '@/packages/common/props';
import { computed, ExtractPropTypes, ref } from 'vue';
import { EmitFn } from '@/types/components';

export const detailsListProps = {
    ...commonProps,
}

export type DetailsListProps = ExtractPropTypes<typeof detailsListProps>;

export const detailsListEmits = {
}

export type DetailsListEmits = typeof detailsListEmits

export const useDetailsList = (props: DetailsListProps, emits: EmitFn<DetailsListEmits>) => {
    return {
    }
}
