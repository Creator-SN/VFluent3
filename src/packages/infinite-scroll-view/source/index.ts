import { commonProps } from '@/packages/common/props';
import { computed, ExtractPropTypes, ref } from 'vue';
import { EmitFn } from '@/types/components';

export const infiniteScrollViewProps = {
    ...commonProps,
}

export type InfiniteScrollViewProps = ExtractPropTypes<typeof infiniteScrollViewProps>;

export const infiniteScrollViewEmits = {
}

export type InfiniteScrollViewEmits = typeof infiniteScrollViewEmits

export const useInfiniteScrollView = (props: InfiniteScrollViewProps, emits: EmitFn<InfiniteScrollViewEmits>) => {
    return {
    }
}
