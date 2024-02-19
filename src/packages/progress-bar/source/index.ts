import { commonProps } from '@/packages/common/props';
import { computed, ExtractPropTypes, ref } from 'vue';
import { EmitFn } from '@/types/components';

export const progressBarProps = {
    ...commonProps,
}

export type ProgressBarProps = ExtractPropTypes<typeof progressBarProps>;

export const progressBarEmits = {
}

export type ProgressBarEmits = typeof progressBarEmits

export const useProgressBar = (props: ProgressBarProps, emits: EmitFn<ProgressBarEmits>) => {
    return {
    }
}
