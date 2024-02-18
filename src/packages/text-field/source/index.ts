import { commonProps } from '@/packages/common/props';
import { computed, ExtractPropTypes, ref } from 'vue';
import { EmitFn } from '@/types/components';

export const textFieldProps = {
    ...commonProps,
}

export type TextFieldProps = ExtractPropTypes<typeof textFieldProps>;

export const textFieldEmits = {
}

export type TextFieldEmits = typeof textFieldEmits

export const useTextField = (props: TextFieldProps, emits: EmitFn<TextFieldEmits>) => {
    return {
    }
}
