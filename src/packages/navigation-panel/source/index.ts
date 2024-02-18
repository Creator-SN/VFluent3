import { commonProps } from '@/packages/common/props';
import { computed, ExtractPropTypes, ref } from 'vue';
import { EmitFn } from '@/types/components';

export const navigationPanelProps = {
    ...commonProps,
}

export type NavigationPanelProps = ExtractPropTypes<typeof navigationPanelProps>;

export const navigationPanelEmits = {
}

export type NavigationPanelEmits = typeof navigationPanelEmits

export const useNavigationPanel = (props: NavigationPanelProps, emits: EmitFn<NavigationPanelEmits>) => {
    return {
    }
}
