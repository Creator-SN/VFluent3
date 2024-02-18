import { commonProps } from '@/packages/common/props';
import { computed, ExtractPropTypes, ref } from 'vue';
import { EmitFn } from '@/types/components';

export const swipeControlProps = {
    ...commonProps,
}

export type SwipeControlProps = ExtractPropTypes<typeof swipeControlProps>;

export const swipeControlEmits = {
}

export type SwipeControlEmits = typeof swipeControlEmits

export const useSwipeControl = (props: SwipeControlProps, emits: EmitFn<SwipeControlEmits>) => {
    return {
    }
}
