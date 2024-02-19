import { commonProps } from '@/packages/common/props';
import { computed, ExtractPropTypes, ref } from 'vue';
import { EmitFn } from '@/types/components';

export const radioProps = {
    ...commonProps,
}

export type RadioProps = ExtractPropTypes<typeof radioProps>;

export const radioEmits = {
}

export type RadioEmits = typeof radioEmits

export const useRadio = (props: RadioProps, emits: EmitFn<RadioEmits>) => {
    return {
    }
}
