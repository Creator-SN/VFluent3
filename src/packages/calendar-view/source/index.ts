import { commonProps } from '@/packages/common/props';
import { computed, ExtractPropTypes, ref } from 'vue';
import { EmitFn } from '@/types/components';

export const calendarViewProps = {
    ...commonProps,
}

export type CalendarViewProps = ExtractPropTypes<typeof calendarViewProps>;

export const calendarViewEmits = {
}

export type CalendarViewEmits = typeof calendarViewEmits

export const useCalendarView = (props: CalendarViewProps, emits: EmitFn<CalendarViewEmits>) => {
    return {
    }
}
