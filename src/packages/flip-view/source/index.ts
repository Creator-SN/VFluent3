import { commonProps } from '@/packages/common/props';
import { computed, ExtractPropTypes, ref } from 'vue';
import { EmitFn } from '@/types/components';

export const flipViewProps = {
    ...commonProps,
}

export type FlipViewProps = ExtractPropTypes<typeof flipViewProps>;

export const flipViewEmits = {
}

export type FlipViewEmits = typeof flipViewEmits

export const useFlipView = (props: FlipViewProps, emits: EmitFn<FlipViewEmits>) => {
    return {
    }
}
