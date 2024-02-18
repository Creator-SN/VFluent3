import { commonProps } from '@/packages/common/props';
import { computed, ExtractPropTypes, ref } from 'vue';
import { EmitFn } from '@/types/components';

export const navigationViewProps = {
    ...commonProps,
}

export type NavigationViewProps = ExtractPropTypes<typeof navigationViewProps>;

export const navigationViewEmits = {
}

export type NavigationViewEmits = typeof navigationViewEmits

export const useNavigationView = (props: NavigationViewProps, emits: EmitFn<NavigationViewEmits>) => {
    return {
    }
}
