import { commonProps } from '@/packages/common/props';
import { computed, ExtractPropTypes, ref } from 'vue';
import { EmitFn } from '@/types/components';

export const datePickerProps = {
    ...commonProps,
}

export type DatePickerProps = ExtractPropTypes<typeof datePickerProps>;

export const datePickerEmits = {
}

export type DatePickerEmits = typeof datePickerEmits

export const useDatePicker = (props: DatePickerProps, emits: EmitFn<DatePickerEmits>) => {
    return {
    }
}
