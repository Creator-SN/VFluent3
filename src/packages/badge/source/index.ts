import { commonProps } from '@/packages/common/props';
import { computed, ExtractPropTypes, ref } from 'vue';
import { EmitFn } from '@/types/components';

export const badgeProps = {
    ...commonProps,
}

export type BadgeProps = ExtractPropTypes<typeof badgeProps>;

export const badgeEmits = {
}

export type BadgeEmits = typeof badgeEmits

export const useBadge = (props: BadgeProps, emits: EmitFn<BadgeEmits>) => {
    return {
    }
}
