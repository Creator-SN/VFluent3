import { commonProps } from '@/packages/common/props';
import { computed, ExtractPropTypes, ref } from 'vue';
import { EmitFn } from '@/types/components';

export const radioGroupProps = {
    ...commonProps,
}

export type RadioGroupProps = ExtractPropTypes<typeof radioGroupProps>;

export const radioGroupEmits = {
}

export type RadioGroupEmits = typeof radioGroupEmits

export const useRadioGroup = (props: RadioGroupProps, emits: EmitFn<RadioGroupEmits>) => {
    return {
    }
}
