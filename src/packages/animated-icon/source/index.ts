import { commonProps } from '@/packages/common/props';
import { computed, ExtractPropTypes, ref } from 'vue';
import { EmitFn } from '@/types/components';

export const animatedIconProps = {
    ...commonProps,
}

export type AnimatedIconProps = ExtractPropTypes<typeof animatedIconProps>;

export const animatedIconEmits = {
}

export type AnimatedIconEmits = typeof animatedIconEmits

export const useAnimatedIcon = (props: AnimatedIconProps, emits: EmitFn<AnimatedIconEmits>) => {
    return {
    }
}
