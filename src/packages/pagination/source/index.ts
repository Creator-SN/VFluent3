import { commonProps } from '@/packages/common/props';
import { computed, ExtractPropTypes, ref } from 'vue';
import { EmitFn } from '@/types/components';

export const paginationProps = {
    ...commonProps,
}

export type PaginationProps = ExtractPropTypes<typeof paginationProps>;

export const paginationEmits = {
}

export type PaginationEmits = typeof paginationEmits

export const usePagination = (props: PaginationProps, emits: EmitFn<PaginationEmits>) => {
    return {
    }
}
