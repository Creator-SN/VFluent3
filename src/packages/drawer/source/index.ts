import { commonProps } from '@/packages/common/props';
import { computed, ExtractPropTypes, ref } from 'vue';
import { EmitFn } from '@/types/components';

export const drawerProps = {
    ...commonProps,
}

export type DrawerProps = ExtractPropTypes<typeof drawerProps>;

export const drawerEmits = {
}

export type DrawerEmits = typeof drawerEmits

export const useDrawer = (props: DrawerProps, emits: EmitFn<DrawerEmits>) => {
    return {
    }
}
