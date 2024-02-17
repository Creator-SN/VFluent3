import { commonProps } from '@/packages/common/props';
import { computed, ExtractPropTypes, ref } from 'vue';
import { EmitFn } from '@/types/components';

export const toggleSwitchProps = {
    ...commonProps,
}

export type ToggleSwitchProps = ExtractPropTypes<typeof toggleSwitchProps>;

export const toggleSwitchEmits = {
}

export type ToggleSwitchEmits = typeof toggleSwitchEmits

export const useToggleSwitch = (props: ToggleSwitchProps, emits: EmitFn<ToggleSwitchEmits>) => {
    return {
    }
}
