import { commonProps } from '@/packages/common/props';
import { computed, ExtractPropTypes, ref } from 'vue';
import { EmitFn } from '@/types/components';

export const panelProps = {
    ...commonProps,
}

export type PanelProps = ExtractPropTypes<typeof panelProps>;

export const panelEmits = {
}

export type PanelEmits = typeof panelEmits

export const usePanel = (props: PanelProps, emits: EmitFn<PanelEmits>) => {
    return {
    }
}
