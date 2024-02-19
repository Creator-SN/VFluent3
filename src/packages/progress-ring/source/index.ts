import { commonProps } from '@/packages/common/props';
import { computed, ExtractPropTypes, ref } from 'vue';
import { EmitFn } from '@/types/components';

export const progressRingProps = {
    ...commonProps,
}

export type ProgressRingProps = ExtractPropTypes<typeof progressRingProps>;

export const progressRingEmits = {
}

export type ProgressRingEmits = typeof progressRingEmits

export const useProgressRing = (props: ProgressRingProps, emits: EmitFn<ProgressRingEmits>) => {
    return {
    }
}
