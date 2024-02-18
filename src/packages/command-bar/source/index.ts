import { commonProps } from '@/packages/common/props';
import { computed, ExtractPropTypes, ref } from 'vue';
import { EmitFn } from '@/types/components';

export const commandBarProps = {
    ...commonProps,
}

export type CommandBarProps = ExtractPropTypes<typeof commandBarProps>;

export const commandBarEmits = {
}

export type CommandBarEmits = typeof commandBarEmits

export const useCommandBar = (props: CommandBarProps, emits: EmitFn<CommandBarEmits>) => {
    return {
    }
}
