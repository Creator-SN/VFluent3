import { commonProps } from '@/packages/common/props';
import { computed, ExtractPropTypes, ref } from 'vue';
import { EmitFn } from '@/types/components';

export const sliderProps = {
    ...commonProps,
}

export type SliderProps = ExtractPropTypes<typeof sliderProps>;

export const sliderEmits = {
}

export type SliderEmits = typeof sliderEmits

export const useSlider = (props: SliderProps, emits: EmitFn<SliderEmits>) => {
    return {
    }
}
