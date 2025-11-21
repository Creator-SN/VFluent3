import { markRaw } from 'vue';
import dateHead from './dateHead.vue';
import dateCell from './dateCell.vue';

export default {
    name: 'Date',
    type: 'date',
    icon: 'Calendar',
    emoji: '📅',
    headComponent: markRaw(dateHead),
    cellComponent: markRaw(dateCell),
    filter: ({ input, value }) => {
        if (!input) return true;
        return (
            input === value
        );
    },
    sortAsc: (a, b) => {
        if (a.start === b.start) return a.end - b.end;
        return a.start - b.start;
    },
    sortDesc: (a, b) => {
        if (a.start === b.start) return b.end - a.end;
        return b.start - a.start;
    }
}