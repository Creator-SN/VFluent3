import { commonProps } from '@/packages/common/props';
import { computed, ExtractPropTypes, ref } from 'vue';
import { EmitFn } from '@/types/components';

export const colorPickerProps = {
    ...commonProps,
};

export type ColorPickerProps = ExtractPropTypes<typeof colorPickerProps>;

export const colorPickerEmits = {};

export type ColorPickerEmits = typeof colorPickerEmits;

export const useColorPicker = (
    props: ColorPickerProps,
    emits: EmitFn<ColorPickerEmits>
) => {
    const colorModeOptions = [
        {
            key: 'HSV',
        },
        {
            key: 'RGB',
        },
    ];
    const colorMode = ref<'HSV' | 'RGB'>('RGB');
    return {
        colorModeOptions,
        colorMode,
    };
};
