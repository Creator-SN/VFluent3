import { commonProps } from '@/packages/common/props';
import { computed, ExtractPropTypes, ref } from 'vue';
import { EmitFn } from '@/types/components';

export const verifyBoxProps = {
    ...commonProps,
}

export type VerifyBoxProps = ExtractPropTypes<typeof verifyBoxProps>;

export const verifyBoxEmits = {
}

export type VerifyBoxEmits = typeof verifyBoxEmits

export const useVerifyBox = (props: VerifyBoxProps, emits: EmitFn<VerifyBoxEmits>) => {
    return {
    }
}
