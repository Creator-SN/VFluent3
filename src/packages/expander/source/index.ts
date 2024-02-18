import { commonProps } from '@/packages/common/props';
import { computed, ExtractPropTypes, ref } from 'vue';
import { EmitFn } from '@/types/components';

export const expanderProps = {
    ...commonProps,
}

export type ExpanderProps = ExtractPropTypes<typeof expanderProps>;

export const expanderEmits = {
}

export type ExpanderEmits = typeof expanderEmits

export const useExpander = (props: ExpanderProps, emits: EmitFn<ExpanderEmits>) => {
    return {
    }
}
