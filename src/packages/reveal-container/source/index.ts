import { commonProps } from '@/packages/common/props';
import { computed, ExtractPropTypes, ref } from 'vue';
import { EmitFn } from '@/types/components';

export const revealContainerProps = {
    ...commonProps,
}

export type RevealContainerProps = ExtractPropTypes<typeof revealContainerProps>;

export const revealContainerEmits = {
}

export type RevealContainerEmits = typeof revealContainerEmits

export const useRevealContainer = (props: RevealContainerProps, emits: EmitFn<RevealContainerEmits>) => {
    return {
    }
}
