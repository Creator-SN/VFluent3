import { commonProps } from '@/packages/common/props';
import { computed, ExtractPropTypes, ref } from 'vue';
import { EmitFn } from '@/types/components';

export const checkBoxProps = {
    ...commonProps,
}

export type CheckBoxProps = ExtractPropTypes<typeof checkBoxProps>;

export const checkBoxEmits = {
}

export type CheckBoxEmits = typeof checkBoxEmits

export const useCheckBox = (props: CheckBoxProps, emits: EmitFn<CheckBoxEmits>) => {
    return {
    }
}
