import { commonProps } from '@/packages/common/props';
import { computed, ExtractPropTypes, ref } from 'vue';
import { EmitFn } from '@/types/components';

export const shimmerProps = {
    ...commonProps,
}

export type ShimmerProps = ExtractPropTypes<typeof shimmerProps>;

export const shimmerEmits = {
}

export type ShimmerEmits = typeof shimmerEmits

export const useShimmer = (props: ShimmerProps, emits: EmitFn<ShimmerEmits>) => {
    return {
    }
}
