import { commonProps } from '@/packages/common/props';
import { computed, ExtractPropTypes, ref } from 'vue';
import { EmitFn } from '@/types/components';

export const pivotProps = {
    ...commonProps,
}

export type PivotProps = ExtractPropTypes<typeof pivotProps>;

export const pivotEmits = {
}

export type PivotEmits = typeof pivotEmits

export const usePivot = (props: PivotProps, emits: EmitFn<PivotEmits>) => {
    return {
    }
}
