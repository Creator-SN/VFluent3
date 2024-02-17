import { commonProps } from '@/packages/common/props';
import { computed, ExtractPropTypes, ref } from 'vue';
import { EmitFn } from '@/types/components';

export const comboboxProps = {
    ...commonProps,
}

export type ComboboxProps = ExtractPropTypes<typeof comboboxProps>;

export const comboboxEmits = {
}

export type ComboboxEmits = typeof comboboxEmits

export const useCombobox = (props: ComboboxProps, emits: EmitFn<ComboboxEmits>) => {
    return {
    }
}
