import { markRaw } from 'vue';
import numberHead from './numberHead.vue';
import numberCell from './numberCell.vue';

export default {
    name: 'Number',
    type: 'number',
    icon: 'NumberField',
    emoji: '🔢',
    headComponent: markRaw(numberHead),
    cellComponent: markRaw(numberCell),
    filter: ({ input, value }) => {
        if (!input) return true;
        return (
            input === value
        );
    },
    sortAsc: (a, b) => {
        return a - b;
    },
    sortDesc: (a, b) => {
        return b - a;
    }
}