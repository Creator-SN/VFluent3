import { commonProps } from '@/packages/common/props';
import { computed, ExtractPropTypes, ref } from 'vue';
import { EmitFn } from '@/types/components';

export const calloutProps = {
    ...commonProps,
}

export type CalloutProps = ExtractPropTypes<typeof calloutProps>;

export const calloutEmits = {
}

export type CalloutEmits = typeof calloutEmits

export const useCallout = (props: CalloutProps, emits: EmitFn<CalloutEmits>) => {
    return {
    }
}
