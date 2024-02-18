import { commonProps } from '@/packages/common/props';
import { computed, ExtractPropTypes, ref } from 'vue';
import { EmitFn } from '@/types/components';

export const dropDownProps = {
    ...commonProps,
}

export type DropDownProps = ExtractPropTypes<typeof dropDownProps>;

export const dropDownEmits = {
}

export type DropDownEmits = typeof dropDownEmits

export const useDropDown = (props: DropDownProps, emits: EmitFn<DropDownEmits>) => {
    return {
    }
}
