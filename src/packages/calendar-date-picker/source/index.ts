import { commonProps } from '@/packages/common/props';
import { computed, ExtractPropTypes, ref } from 'vue';
import { EmitFn } from '@/types/components';

export const calendarDatePickerProps = {
    ...commonProps,
}

export type CalendarDatePickerProps = ExtractPropTypes<typeof calendarDatePickerProps>;

export const calendarDatePickerEmits = {
}

export type CalendarDatePickerEmits = typeof calendarDatePickerEmits

export const useCalendarDatePicker = (props: CalendarDatePickerProps, emits: EmitFn<CalendarDatePickerEmits>) => {
    return {
    }
}
