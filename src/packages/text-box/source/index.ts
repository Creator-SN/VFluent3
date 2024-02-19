import { commonProps } from '@/packages/common/props';
import { computed, ExtractPropTypes, ref } from 'vue';
import { EmitFn } from '@/types/components';

export const textBoxProps = {
    ...commonProps
};

export type TextBoxProps = ExtractPropTypes<typeof textBoxProps>;

export const textBoxEmits = {};

export type TextBoxEmits = typeof textBoxEmits;

export const useTextBox = (
    props: TextBoxProps,
    emits: EmitFn<TextBoxEmits>
) => {
    return {};
};
