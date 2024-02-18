import { commonProps } from '@/packages/common/props';
import { computed, ExtractPropTypes, ref } from 'vue';
import { EmitFn } from '@/types/components';

export const menuFlyoutProps = {
    ...commonProps,
}

export type MenuFlyoutProps = ExtractPropTypes<typeof menuFlyoutProps>;

export const menuFlyoutEmits = {
}

export type MenuFlyoutEmits = typeof menuFlyoutEmits

export const useMenuFlyout = (props: MenuFlyoutProps, emits: EmitFn<MenuFlyoutEmits>) => {
    return {
    }
}
