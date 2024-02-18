import { commonProps } from '@/packages/common/props';
import { computed, ExtractPropTypes, ref } from 'vue';
import { EmitFn } from '@/types/components';

export const collapseProps = {
    ...commonProps,
}

export type CollapseProps = ExtractPropTypes<typeof collapseProps>;

export const collapseEmits = {
}

export type CollapseEmits = typeof collapseEmits

export const useCollapse = (props: CollapseProps, emits: EmitFn<CollapseEmits>) => {
    return {
    }
}
