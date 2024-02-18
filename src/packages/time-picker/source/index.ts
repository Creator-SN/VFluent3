import { commonProps } from '@/packages/common/props';
import { computed, ExtractPropTypes, ref } from 'vue';
import { EmitFn } from '@/types/components';

export const timePickerProps = {
    ...commonProps,
}

export type TimePickerProps = ExtractPropTypes<typeof timePickerProps>;

export const timePickerEmits = {
}

export type TimePickerEmits = typeof timePickerEmits

export const useTimePicker = (props: TimePickerProps, emits: EmitFn<TimePickerEmits>) => {
    return {
    }
}
